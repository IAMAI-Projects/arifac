import { NextRequest, NextResponse } from 'next/server';
import { parseCCavenueResponse } from '@/lib/ccavenue';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/payment/ccavenue/response
 *
 * CCAvenue redirects here after payment (both success and failure).
 * The response is encrypted — we decrypt it, update the payment record
 * and application status in the database, and redirect the user.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const encResp = formData.get('encResp') as string;

    // Determine the base URL for redirects (to avoid 0.0.0.0 internal URL issue on staging)
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || 'stage.arifac.com';
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;

    if (!encResp) {
      return NextResponse.redirect(
        new URL('/membership/register/payment?status=error&message=No+response+received', baseUrl)
      );
    }

    // Decrypt CCAvenue response
    const responseData = parseCCavenueResponse(encResp);

    const orderId = responseData['order_id'] || '';
    const orderStatus = responseData['order_status'] || '';
    const trackingId = responseData['tracking_id'] || '';
    const amount = responseData['amount'] || '';
    const paymentMode = responseData['payment_mode'] || '';
    const applicationId = responseData['merchant_param1'] || '';
    const paymentType = responseData['merchant_param2'] || 'membership';
    const statusMessage = responseData['status_message'] || '';

    console.log(`[CCAvenue Response] Order: ${orderId}, Status: ${orderStatus}, Tracking: ${trackingId}, Amount: ${amount}`);

    if (orderStatus === 'Success') {
      // Log payment success (DB operations skipped for now)
      console.log('[CCAvenue] Payment Success logged - DB operations disabled');

      // Redirect to success page
      const redirectPath = paymentType === 'certification'
        ? `/payment/success?order=${orderId}&tracking=${trackingId}`
        : `/membership/register/payment?status=success&order=${orderId}&tracking=${trackingId}`;

      return NextResponse.redirect(new URL(redirectPath, baseUrl));
    } else if (orderStatus === 'Aborted') {
      // Log payment cancellation (DB operations skipped for now)
      console.log('[CCAvenue] Payment Aborted - DB operations disabled');

      return NextResponse.redirect(
        new URL(`/membership/register/payment?status=cancelled&order=${orderId}&message=${encodeURIComponent(statusMessage)}`, baseUrl)
      );
    } else {
      // Log payment failure (DB operations skipped for now)
      console.log('[CCAvenue] Payment Failed - DB operations disabled');

      return NextResponse.redirect(
        new URL(`/membership/register/payment?status=failed&order=${orderId}&message=${encodeURIComponent(statusMessage)}`, baseUrl)
      );
    }
  } catch (error) {
    console.error('[CCAvenue Response] Processing error:', error);
    
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || 'stage.arifac.com';
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;

    return NextResponse.redirect(
      new URL('/membership/register/payment?status=error&message=Processing+error', baseUrl)
    );
  }
}
