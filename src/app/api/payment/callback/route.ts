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
        const formData   = await req.formData();
        const encResp    = formData.get('encResp') as string | null;
        const workingKey = process.env.CCAVENUE_WORKING_KEY;

        if (!encResp || !workingKey) {
            console.error('[CCAvenue] callback: missing encResp or working key');
            return NextResponse.redirect(
                new URL('/membership/register/form-a?payment=error', req.url)
            );
        }

        const decrypted = decrypt(encResp, workingKey);
        const params    = new URLSearchParams(decrypted);

        const orderStatus = params.get('order_status') ?? 'Invalid';
        const orderId     = params.get('order_id')     ?? '';
        const trackingId  = params.get('tracking_id')  ?? '';
        const amount      = params.get('amount')        ?? '';
        const bankRefNo   = params.get('bank_ref_no')  ?? '';

        console.log('[CCAvenue] callback:', { orderStatus, orderId, trackingId, amount, bankRefNo });

        // ── Database update (add your Supabase / Frappe call here) ──────────────
        // Example:
        //   await supabase.from('payments').insert({
        //       order_id: orderId, tracking_id: trackingId,
        //       status: orderStatus, amount, bank_ref_no: bankRefNo,
        //   });
        // ────────────────────────────────────────────────────────────────────────

        const successBase = `/membership/payment/success`;
        const failedBase  = `/membership/payment/failed`;

        switch (orderStatus) {
            case 'Success':
                return NextResponse.redirect(
                    new URL(
                        `${successBase}?orderId=${orderId}&trackingId=${trackingId}&amount=${amount}`,
                        req.url
                    )
                );

            case 'Aborted':
                return NextResponse.redirect(
                    new URL(`${failedBase}?reason=aborted&orderId=${orderId}`, req.url)
                );

            case 'Failure':
                return NextResponse.redirect(
                    new URL(`${failedBase}?reason=failed&orderId=${orderId}`, req.url)
                );

            default: // 'Invalid' or unexpected
                return NextResponse.redirect(
                    new URL(`${failedBase}?reason=invalid&orderId=${orderId}`, req.url)
                );
        }

    } catch (error) {
        console.error('[CCAvenue] callback error:', error);
        return NextResponse.redirect(
            new URL('/membership/payment/failed?reason=error', req.url)
        );
    }
}
