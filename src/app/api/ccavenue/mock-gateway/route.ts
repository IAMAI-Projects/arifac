import { NextRequest, NextResponse } from 'next/server';
import { decrypt, encrypt } from '@/lib/ccavenue';

export const dynamic = 'force-dynamic';

/**
 * Mock CCAvenue Gateway — simulates the CCAvenue hosted payment page.
 * Receives the same encRequest + access_code POST that real CCAvenue expects,
 * decrypts it, renders a payment simulation page, and on submit posts an
 * encrypted response back to /api/ccavenue/response (just like the real gateway).
 */
export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const encRequest = formData.get('encRequest') as string;
    const workingKey = process.env.CCAVENUE_WORKING_KEY || '';

    let orderDetails: Record<string, string> = {};
    try {
        const decrypted = decrypt(encRequest, workingKey);
        const params = new URLSearchParams(decrypted);
        params.forEach((value, key) => {
            orderDetails[key] = decodeURIComponent(value);
        });
    } catch {
        orderDetails = { error: 'Could not decrypt request' };
    }

    const orderId = orderDetails.order_id || 'UNKNOWN';
    const amount = orderDetails.amount || '0.00';
    const billingName = orderDetails.billing_name || '';
    const billingEmail = orderDetails.billing_email || '';
    const redirectUrl = orderDetails.redirect_url || '/api/ccavenue/response';

    // Build the encrypted success and failure responses (mimicking CCAvenue)
    const successParams = [
        `order_id=${orderId}`,
        `tracking_id=MOCK-${Date.now()}`,
        `bank_ref_no=MOCK-REF-${Math.floor(Math.random() * 1000000)}`,
        `order_status=Success`,
        `payment_mode=Mock_Gateway`,
        `card_name=MockCard`,
        `currency=INR`,
        `amount=${amount}`,
        `billing_name=${billingName}`,
        `billing_email=${billingEmail}`,
        `mer_amount=${amount}`,
        `status_message=Transaction+Successful`,
    ].join('&');

    const failureParams = successParams.replace('order_status=Success', 'order_status=Failure')
        .replace('Transaction+Successful', 'Transaction+Failed');

    const encSuccess = encrypt(successParams, workingKey);
    const encFailure = encrypt(failureParams, workingKey);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CCAvenue Mock Payment Gateway</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f0f2f5;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.1);
            max-width: 480px;
            width: 100%;
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
            color: white;
            padding: 24px 32px;
            text-align: center;
        }
        .header h1 {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 4px;
        }
        .header .badge {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            color: #ffeb3b;
            font-size: 11px;
            font-weight: 600;
            padding: 4px 12px;
            border-radius: 20px;
            margin-top: 8px;
            letter-spacing: 0.5px;
        }
        .body { padding: 32px; }
        .order-box {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 24px;
        }
        .order-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            font-size: 14px;
            color: #495057;
        }
        .order-row:not(:last-child) { border-bottom: 1px solid #e9ecef; }
        .order-row .label { font-weight: 500; color: #6c757d; }
        .order-row .value { font-weight: 600; color: #212529; }
        .amount-highlight {
            font-size: 28px;
            font-weight: 700;
            color: #1a237e;
            text-align: center;
            padding: 16px 0;
        }
        .amount-highlight span { font-size: 16px; color: #6c757d; }
        .card-section {
            margin-bottom: 24px;
        }
        .card-section label {
            display: block;
            font-size: 12px;
            font-weight: 600;
            color: #6c757d;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
        }
        .card-section input {
            width: 100%;
            padding: 12px 16px;
            border: 1.5px solid #dee2e6;
            border-radius: 8px;
            font-size: 15px;
            color: #495057;
            background: #f8f9fa;
            outline: none;
        }
        .card-row { display: flex; gap: 12px; margin-top: 12px; }
        .card-row > div { flex: 1; }
        .btn-group { display: flex; gap: 12px; margin-top: 28px; }
        .btn {
            flex: 1;
            padding: 14px;
            border: none;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn-pay {
            background: linear-gradient(135deg, #2e7d32 0%, #43a047 100%);
            color: white;
        }
        .btn-pay:hover { box-shadow: 0 4px 12px rgba(46,125,50,0.4); transform: translateY(-1px); }
        .btn-cancel {
            background: #f5f5f5;
            color: #757575;
            border: 1.5px solid #e0e0e0;
        }
        .btn-cancel:hover { background: #eeeeee; }
        .footer {
            text-align: center;
            padding: 16px;
            font-size: 11px;
            color: #9e9e9e;
            background: #fafafa;
            border-top: 1px solid #f0f0f0;
        }
        .secure-badge {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-size: 12px;
            color: #66bb6a;
            margin-bottom: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>CCAvenue Payment Gateway</h1>
            <div class="badge">⚠ MOCK / DEV MODE</div>
        </div>
        <div class="body">
            <div class="amount-highlight">
                <span>INR</span> ₹${amount}
            </div>
            <div class="order-box">
                <div class="order-row">
                    <span class="label">Order ID</span>
                    <span class="value">${orderId}</span>
                </div>
                <div class="order-row">
                    <span class="label">Name</span>
                    <span class="value">${billingName || '—'}</span>
                </div>
                <div class="order-row">
                    <span class="label">Email</span>
                    <span class="value">${billingEmail || '—'}</span>
                </div>
            </div>

            <div class="secure-badge">
                🔒 Secure Mock Payment
            </div>

            <div class="card-section">
                <label>Card Number</label>
                <input type="text" value="4111 1111 1111 1111" readonly />
                <div class="card-row">
                    <div>
                        <label>Expiry</label>
                        <input type="text" value="12/30" readonly />
                    </div>
                    <div>
                        <label>CVV</label>
                        <input type="text" value="123" readonly />
                    </div>
                </div>
            </div>

            <div class="btn-group">
                <form method="POST" action="${redirectUrl}" style="flex:1;display:flex;">
                    <input type="hidden" name="encResp" value="${encSuccess}" />
                    <button type="submit" class="btn btn-pay" style="flex:1;">Pay ₹${amount}</button>
                </form>
                <form method="POST" action="${redirectUrl}" style="flex:1;display:flex;">
                    <input type="hidden" name="encResp" value="${encFailure}" />
                    <button type="submit" class="btn btn-cancel" style="flex:1;">Cancel</button>
                </form>
            </div>
        </div>
        <div class="footer">
            This is a mock gateway for development only. No real payment will be processed.
        </div>
    </div>
</body>
</html>`;

    return new NextResponse(html, {
        headers: { 'Content-Type': 'text/html' },
    });
}
