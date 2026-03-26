import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { amount, billingName, billingEmail, billingTel } = body;

        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret) {
            return NextResponse.json(
                { error: 'Razorpay configuration missing' },
                { status: 500 }
            );
        }

        const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });

        // Amount is in paise (₹5000 = 500000 paise)
        const amountInPaise = Math.round(parseFloat(amount) * 100);

        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`,
            notes: {
                billing_name: billingName || '',
                billing_email: billingEmail || '',
                billing_tel: billingTel || '',
                purpose: 'ARIFAC Membership Registration',
            },
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId,
        });
    } catch (error: unknown) {
        console.error('Error creating Razorpay order:', error);
        const message = error instanceof Error ? error.message : 'Internal server error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
