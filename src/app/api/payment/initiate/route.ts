import { NextRequest, NextResponse } from 'next/server';
import { encrypt } from '@/lib/ccavutil';

export const dynamic = 'force-dynamic';

/**
 * POST /api/payment/initiate
 *
 * Accepts order details, builds the CCAvenue parameter string, encrypts it,
 * and returns a self-submitting HTML form that redirects the user straight to
 * the CCAvenue sandbox payment page.
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { amount, billingName, billingAddress, billingEmail, billingTel, billingCity, billingState, billingZip, billingCountry } = body;

        console.log('[CCAvenue] initiate: received request', {
            amount,
            billingName: billingName || '(empty)',
            billingEmail: billingEmail || '(empty)',
            billingTel: billingTel || '(empty)',
        });

        const merchantId  = process.env.CCAVENUE_MERCHANT_ID;
        const accessCode  = process.env.CCAVENUE_ACCESS_CODE;
        const workingKey  = process.env.CCAVENUE_WORKING_KEY;
        const gatewayUrl  = process.env.CCAVENUE_POST_URL ||
            'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction';

        console.log('[CCAvenue] initiate: env check', {
            hasMerchantId: !!merchantId,
            hasAccessCode: !!accessCode,
            hasWorkingKey: !!workingKey,
            gatewayUrl,
        });

        if (!merchantId || !accessCode || !workingKey) {
            console.error('[CCAvenue] initiate: MISSING ENV VARS', {
                CCAVENUE_MERCHANT_ID: merchantId ? 'SET' : 'MISSING',
                CCAVENUE_ACCESS_CODE: accessCode ? 'SET' : 'MISSING',
                CCAVENUE_WORKING_KEY: workingKey ? 'SET' : 'MISSING',
            });
            return NextResponse.json(
                { error: 'CCAvenue server configuration is incomplete.' },
                { status: 500 }
            );
        }

        const origin = req.nextUrl.origin;
        const orderId = `ARIFAC-${Date.now()}`;

        // For local dev: CCAvenue cannot POST back to localhost.
        // Set CCAVENUE_CALLBACK_BASE_URL to an ngrok/tunnel URL for full callback testing.
        // e.g. CCAVENUE_CALLBACK_BASE_URL=http://awardsbackend.local:3000
        const callbackBase = process.env.CCAVENUE_CALLBACK_BASE_URL || origin;
        const redirectUrl = `${callbackBase}/api/payment/callback`;
        const cancelUrl   = `${callbackBase}/api/payment/callback`;

        console.log('[CCAvenue] initiate: building params', {
            orderId,
            origin,
            callbackBase,
            redirectUrl,
        });

        // Build the pipe-delimited merchant parameter string exactly as CCAvenue expects.
        const params = [
            `merchant_id=${merchantId}`,
            `order_id=${orderId}`,
            `currency=INR`,
            `amount=${parseFloat(amount).toFixed(2)}`,
            `redirect_url=${redirectUrl}`,
            `cancel_url=${cancelUrl}`,
            `language=EN`,
            `billing_name=${billingName      || ''}`,
            `billing_address=${billingAddress || ''}`,
            `billing_city=${billingCity       || ''}`,
            `billing_state=${billingState     || ''}`,
            `billing_zip=${billingZip         || ''}`,
            `billing_country=${billingCountry || 'India'}`,
            `billing_tel=${billingTel         || ''}`,
            `billing_email=${billingEmail     || ''}`,
            `merchant_param1=${body.applicationId || ''}`,
        ].join('&');

        const encRequest = encrypt(params, workingKey);

        console.log('[CCAvenue] initiate: encryption complete', {
            orderId,
            encRequestLength: encRequest.length,
            gatewayUrl,
        });

        // Return a self-submitting HTML form — the browser executes this to
        // navigate directly to the CCAvenue hosted payment page.
        const html = `<!DOCTYPE html>
<html>
<head><title>Redirecting to CCAvenue…</title></head>
<body>
  <p style="font-family:sans-serif;text-align:center;padding-top:80px;">
    Redirecting to secure payment gateway, please wait…
  </p>
  <form id="ccaForm" method="POST" action="${gatewayUrl}">
    <input type="hidden" name="encRequest"   value="${encRequest}" />
    <input type="hidden" name="access_code"  value="${accessCode}" />
  </form>
  <script>document.getElementById('ccaForm').submit();</script>
</body>
</html>`;

        return new NextResponse(html, {
            headers: { 'Content-Type': 'text/html' },
        });

    } catch (error) {
        console.error('[CCAvenue] initiate error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
