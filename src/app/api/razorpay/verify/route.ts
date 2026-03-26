import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = body;

        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keySecret) {
            return NextResponse.json(
                { error: 'Razorpay configuration missing' },
                { status: 500 }
            );
        }

        // Verify signature: HMAC SHA256 of "order_id|payment_id" with key_secret
        const expectedSignature = crypto
            .createHmac('sha256', keySecret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        const isValid = expectedSignature === razorpay_signature;

        if (isValid) {
            // Payment verified successfully
            // In production: save to DB, update membership status, etc.
            return NextResponse.json({
                success: true,
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
            });
        } else {
            return NextResponse.json(
                { success: false, error: 'Payment verification failed' },
                { status: 400 }
            );
        }
    } catch (error: unknown) {
        console.error('Error verifying Razorpay payment:', error);
        const message = error instanceof Error ? error.message : 'Internal server error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
