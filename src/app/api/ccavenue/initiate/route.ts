import { NextRequest, NextResponse } from 'next/server';
import { encrypt } from '@/lib/ccavenue';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { amount, orderId, billingName, billingAddress, billingEmail, billingTel } = body;

        const merchantId = process.env.CCAVENUE_MERCHANT_ID;
        const accessCode = process.env.CCAVENUE_ACCESS_CODE;
        const workingKey = process.env.CCAVENUE_WORKING_KEY;
        const postUrl = process.env.CCAVENUE_POST_URL;

        if (!merchantId || !accessCode || !workingKey) {
            return NextResponse.json({ error: 'CCAvenue configuration missing' }, { status: 500 });
        }

        const origin = req.nextUrl.origin;
        const redirectUrl = `${origin}/api/ccavenue/response`;
        const cancelUrl = `${origin}/api/ccavenue/response`;

        // Construct parameter string
        const params = [
            `merchant_id=${merchantId}`,
            `order_id=${orderId}`,
            `currency=INR`,
            `amount=${amount}`,
            `redirect_url=${encodeURIComponent(redirectUrl)}`,
            `cancel_url=${encodeURIComponent(cancelUrl)}`,
            `language=EN`,
            `billing_name=${encodeURIComponent(billingName || '')}`,
            `billing_address=${encodeURIComponent(billingAddress || '')}`,
            `billing_email=${encodeURIComponent(billingEmail || '')}`,
            `billing_tel=${encodeURIComponent(billingTel || '')}`,
        ].join('&');

        const encRequest = encrypt(params, workingKey);

        return NextResponse.json({
            encRequest,
            accessCode,
            merchantId,
            postUrl
        });

    } catch (error) {
        console.error('Error initiating CCAvenue payment:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
