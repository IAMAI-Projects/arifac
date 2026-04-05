import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/ccavutil';

export const dynamic = 'force-dynamic';

/**
 * The base URL for frontend redirects after payment.
 * CCAvenue posts back to awardsbackend.local (mapped via /etc/hosts),
 * but the user's browser must be redirected to localhost:3000.
 */
function getFrontendBase(): string {
    return process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
}

/**
 * POST /api/payment/callback
 *
 * CCAvenue posts the encrypted response here after the user completes (or
 * cancels / fails) payment. This handler:
 *   1. Extracts `encResp` from the form-POST body.
 *   2. Decrypts it with the working key.
 *   3. Parses order_status, order_id, tracking_id, etc.
 *   4. Saves the result to the database (stub — add your DB call here).
 *   5. Redirects the user to http://localhost:3000/membership/register/payment
 */
export async function POST(req: NextRequest) {
    const frontendBase = getFrontendBase();

    try {
        console.log('[CCAvenue] callback: received POST from CCAvenue');
        console.log('[CCAvenue] callback: request URL:', req.url);
        console.log('[CCAvenue] callback: frontend redirect base:', frontendBase);

        const formData   = await req.formData();
        const encResp    = formData.get('encResp') as string | null;
        const workingKey = process.env.CCAVENUE_WORKING_KEY;

        console.log('[CCAvenue] callback: encResp present:', !!encResp, '| workingKey present:', !!workingKey);
        if (encResp) {
            console.log('[CCAvenue] callback: encResp length:', encResp.length, '| first 50 chars:', encResp.substring(0, 50));
        }

        if (!encResp || !workingKey) {
            console.error('[CCAvenue] callback: MISSING DATA', {
                encResp: encResp ? `present (${encResp.length} chars)` : 'MISSING',
                workingKey: workingKey ? 'SET' : 'MISSING',
            });
            return NextResponse.redirect(
                `${frontendBase}/membership/register/payment?status=error&message=Missing+response+data`
            );
        }

        let decrypted: string;
        try {
            decrypted = decrypt(encResp, workingKey);
            console.log('[CCAvenue] callback: decryption successful, length:', decrypted.length);
            console.log('[CCAvenue] callback: decrypted response:', decrypted);
        } catch (decryptErr) {
            console.error('[CCAvenue] callback: DECRYPTION FAILED:', decryptErr);
            return NextResponse.redirect(
                `${frontendBase}/membership/register/payment?status=error&message=Decryption+failed`
            );
        }

        const params    = new URLSearchParams(decrypted);

        const orderStatus = params.get('order_status') ?? 'Invalid';
        const orderId     = params.get('order_id')     ?? '';
        const trackingId  = params.get('tracking_id')  ?? '';
        const amount      = params.get('amount')        ?? '';
        const bankRefNo   = params.get('bank_ref_no')  ?? '';
        const statusMsg   = params.get('status_message') ?? '';
        const paymentMode = params.get('payment_mode')  ?? '';
        const applicationId = params.get('merchant_param1');

        console.log('[CCAvenue] callback: parsed response', {
            orderStatus, orderId, trackingId, amount, bankRefNo, statusMsg, paymentMode, applicationId
        });

        // Update database if applicationId is present
        if (applicationId) {
            try {
                const { prisma } = await import('@/lib/prisma');
                
                await prisma.$transaction(async (tx) => {
                    // 1. Create or Update Payment record
                    await tx.payments.upsert({
                        where: { provider_payment_id: trackingId || orderId },
                        update: {
                            status: orderStatus === 'Success' ? 'SUCCESS' : 'FAILED',
                            paid_at: orderStatus === 'Success' ? new Date() : null,
                            provider_order_id: orderId,
                        },
                        create: {
                            application_id: applicationId,
                            amount: parseFloat(amount) || 0,
                            currency: 'INR',
                            status: orderStatus === 'Success' ? 'SUCCESS' : 'FAILED',
                            provider: 'CCAVENUE',
                            provider_payment_id: trackingId || orderId,
                            provider_order_id: orderId,
                            paid_at: orderStatus === 'Success' ? new Date() : null,
                        }
                    });

                    // 2. Update Application Status and Activate User
                    if (orderStatus === 'Success') {
                        const application = await tx.membership_applications.update({
                            where: { id: applicationId },
                            data: { status: 'ACTIVE' },
                            include: { users: true }
                        });

                        if (application.user_id) {
                            // Activate standard User (Set 1)
                            await tx.users.update({
                                where: { id: application.user_id },
                                data: { is_active: true }
                            });
                        }

                        // 2b. Synchronize Set 2 Workflow User status
                        if (application.users?.email) {
                            try {
                                const { UserStatus } = await import('@prisma/client');
                                const updatedSet2 = await tx.user.updateMany({
                                    where: { email: application.users.email },
                                    data: { status: 'ACTIVE' as any }
                                });
                                console.log(`[CCAvenue] callback: Set 2 user status updated for ${application.users.email}:`, updatedSet2.count);
                            } catch (err) {
                                console.error('[CCAvenue] callback: Failed to update Set 2 User status:', err);
                            }
                        }
                    } else if (orderStatus === 'Aborted' || orderStatus === 'Failure') {
                        // Current status might already be INIT or PAYMENT_PENDING
                        // Maybe dont mark it as FAILED application, just payment failure
                    }
                }, { maxWait: 10000, timeout: 30000 });
                console.log('[CCAvenue] callback: DB update successful for application:', applicationId);

                // 3. Trigger Post-Payment Confirmation Email
                if (orderStatus === 'Success') {
                    try {
                        const { EmailService } = await import('@/lib/email');
                        const { prisma: prismaClient } = await import('@/lib/prisma');
                        
                        const application = await prismaClient.membership_applications.findUnique({
                            where: { id: applicationId },
                            include: {
                                users: true,
                                organisations: true
                            }
                        });

                        if (application && application.users) {
                            // 3a. Trigger Post-Payment Confirmation Email
                            await EmailService.sendPaymentSuccessEmail({
                                email: application.users.email,
                                fullName: application.users.full_name,
                                organisationName: application.organisations?.name || 'Organisation',
                                amount: parseFloat(amount) || 0,
                                orderId: orderId,
                                trackingId: trackingId || undefined,
                                paymentDate: new Date(),
                                address: application.organisations?.registered_address || undefined
                            });
                            console.log('[CCAvenue] callback: Payment success email triggered for:', application.users.email);

                            // 3b. Trigger Membership Confirmation Email (Official Welcome)
                            // This is the "Option 2" the user wanted only after payment.
                            await EmailService.sendMembershipConfirmationEmail({
                                orgName: application.organisations?.name || 'Organisation',
                                email: application.users.email,
                                membershipId: application.id,
                                entityType: application.organisations?.entity_type || 'Institution',
                                username: application.users.username,
                                name: application.users.full_name,
                                designation: application.users.designation || undefined,
                                mobile: application.users.mobile || undefined,
                            }).catch((err: unknown) => console.error('[CCAvenue callback] Registration email error:', err));
                            console.log('[CCAvenue] callback: Registration confirmation email triggered for:', application.users.email);

                            // 4. Issue Session Cookie (JWT) for the newly paid member
                            try {
                                const { createToken, setAuthCookie } = await import('@/lib/server-auth');
                                const token = await createToken({
                                    userId: application.users.id,
                                    email: application.users.email,
                                    name: application.users.full_name,
                                    orgId: application.users.organisation_id,
                                    isActive: true
                                });
                                await setAuthCookie(token);
                                console.log('[CCAvenue] callback: Session created for user:', application.users.email);
                            } catch (authErr) {
                                console.error('[CCAvenue] callback: Failed to create session cookie:', authErr);
                            }
                        } else {
                            console.warn('[CCAvenue] callback: Could not find user details for email notification', { applicationId });
                        }
                    } catch (emailErr) {
                        // We log but don't throw, so the user still gets redirected to the success page
                        console.error('[CCAvenue] callback: Failed to send payment confirmation email:', emailErr);
                    }
                }
            } catch (dbErr) {
                console.error('[CCAvenue] callback: DB UPDATE FAILED:', dbErr);
                // Continue with redirect even if DB update fails so user doesn't see blank page
            }
        } else {
            console.warn('[CCAvenue] callback: missing applicationId (merchant_param1)');
        }

        // Build redirect to localhost:3000/membership/register/payment
        const redirectUrl = new URL('/membership/register/payment', frontendBase);
        redirectUrl.searchParams.set('status', orderStatus.toLowerCase());
        redirectUrl.searchParams.set('orderId', orderId);
        if (trackingId) redirectUrl.searchParams.set('trackingId', trackingId);
        if (amount) redirectUrl.searchParams.set('amount', amount);
        if (statusMsg) redirectUrl.searchParams.set('message', statusMsg);

        console.log('[CCAvenue] callback: redirecting to', redirectUrl.toString());

        return NextResponse.redirect(redirectUrl.toString());

    } catch (error) {
        console.error('[CCAvenue] callback error:', error);
        return NextResponse.redirect(
            `${frontendBase}/membership/register/payment?status=error&message=Processing+error`
        );
    }
}
