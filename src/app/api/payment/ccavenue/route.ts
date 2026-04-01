import { NextRequest, NextResponse } from 'next/server';
import { buildCCavenueRequest, generateOrderId } from '@/lib/ccavenue';

/**
 * POST /api/payment/ccavenue
 *
 * Initiates a CCAvenue payment transaction.
 * Receives payment details, encrypts them, and returns the form data
 * needed to POST to CCAvenue's payment gateway.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      amount,
      customerName,
      customerEmail,
      customerPhone,
      billingAddress,
      billingCity,
      billingState,
      billingZip,
      applicationId,
      paymentType, // 'membership' or 'certification'
    } = body;

    if (!amount || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, customerName, customerEmail, customerPhone' },
        { status: 400 }
      );
    }

    const orderId = generateOrderId();
    const baseUrl = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const { encRequest, accessCode, postUrl } = buildCCavenueRequest({
      orderId,
      amount: parseFloat(amount),
      redirectUrl: `${baseUrl}/api/payment/ccavenue/response`,
      cancelUrl: `${baseUrl}/api/payment/ccavenue/response`,
      customerName,
      customerEmail,
      customerPhone,
      billingAddress,
      billingCity,
      billingState,
      billingZip,
      merchantParam1: applicationId || '',
      merchantParam2: paymentType || 'membership',
    });

    return NextResponse.json({
      orderId,
      encRequest,
      accessCode,
      postUrl,
    });
  } catch (error) {
    console.error('CCAvenue initiation error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}
