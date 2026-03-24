import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/ccavenue';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const encResp = formData.get('encResp') as string;
        const workingKey = process.env.CCAVENUE_WORKING_KEY;

        if (!encResp || !workingKey) {
            console.error('Missing response or working key');
            return NextResponse.redirect(new URL('/membership/dashboard?status=error', req.url));
        }

        const decryptedResp = decrypt(encResp, workingKey);
        const params = new URLSearchParams(decryptedResp);
        const orderStatus = params.get('order_status');
        const orderId = params.get('order_id');

        console.log(`Payment status for order ${orderId}: ${orderStatus}`);

        // In a real app, update the database here.
        // For demonstration, we just redirect.
        if (orderStatus === 'Success') {
            return NextResponse.redirect(new URL('/membership/dashboard?status=success&orderId=' + orderId, req.url));
        } else {
            return NextResponse.redirect(new URL('/membership/dashboard?status=failed&orderId=' + orderId, req.url));
        }

    } catch (error) {
        console.error('Error handling CCAvenue response:', error);
        return NextResponse.redirect(new URL('/membership/dashboard?status=internal_error', req.url));
    }
}
