import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/ccavutil';

export const dynamic = 'force-dynamic';

/**
 * POST /api/payment/callback
 *
 * CCAvenue posts the encrypted response here after the user completes (or
 * cancels / fails) payment. This handler:
 *   1. Extracts `encResp` from the form-POST body.
 *   2. Decrypts it with the working key.
 *   3. Parses order_status, order_id, tracking_id, etc.
 *   4. Saves the result to the database (stub — add your DB call here).
 *   5. Redirects the user to the appropriate frontend page.
 *
 * Possible order_status values from CCAvenue:
 *   Success | Aborted | Failure | Invalid
 */
export async function POST(req: NextRequest) {
    try {
        console.log('[CCAvenue] callback: received POST from CCAvenue');
        console.log('[CCAvenue] callback: request URL:', req.url);

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
                new URL('/membership/register/form-a?payment=error', req.url)
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
                new URL('/membership/register/form-a?payment=error&reason=decryption_failed', req.url)
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

        console.log('[CCAvenue] callback: parsed response', {
            orderStatus,
            orderId,
            trackingId,
            amount,
            bankRefNo,
            statusMsg,
            paymentMode,
        });

        // ── Database update (add your Supabase / Frappe call here) ──────────────
        // Example:
        //   await supabase.from('payments').insert({
        //       order_id: orderId, tracking_id: trackingId,
        //       status: orderStatus, amount, bank_ref_no: bankRefNo,
        //   });
        // ────────────────────────────────────────────────────────────────────────

        switch (orderStatus) {
            case 'Success':
                console.log('[CCAvenue] callback: SUCCESS — redirecting to dashboard');
                return NextResponse.redirect(
                    new URL(
                        `/membership/dashboard?status=success&orderId=${orderId}&trackingId=${trackingId}`,
                        req.url
                    )
                );

            case 'Aborted':
                console.log('[CCAvenue] callback: ABORTED — redirecting to form-a');
                return NextResponse.redirect(
                    new URL(
                        `/membership/register/form-a?payment=aborted&orderId=${orderId}`,
                        req.url
                    )
                );

            case 'Failure':
                console.log('[CCAvenue] callback: FAILURE — redirecting to form-a');
                return NextResponse.redirect(
                    new URL(
                        `/membership/register/form-a?payment=failed&orderId=${orderId}`,
                        req.url
                    )
                );

            default: // 'Invalid' or unexpected
                console.log('[CCAvenue] callback: INVALID/UNKNOWN status:', orderStatus, '— redirecting to form-a');
                return NextResponse.redirect(
                    new URL(
                        `/membership/register/form-a?payment=invalid&orderId=${orderId}`,
                        req.url
                    )
                );
        }

    } catch (error) {
        console.error('[CCAvenue] callback error:', error);
        return NextResponse.redirect(
            new URL('/membership/register/form-a?payment=error', req.url)
        );
    }
}
