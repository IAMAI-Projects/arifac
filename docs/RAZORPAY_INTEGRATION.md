# Razorpay Payment Integration

## Overview

This document describes the Razorpay payment gateway integration for ARIFAC membership registration and payments. The integration enables secure payment processing in INR (Indian Rupees) using Razorpay's order-based payment flow.

## Prerequisites

- Razorpay account with live or test credentials
- Node.js environment variables configured
- Client-side Razorpay Checkout script integration

## Environment Setup

Configure the following environment variables in your `.env.local`:

```
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

**Note:** Use test credentials during development and switch to live credentials in production.

## API Endpoints

### 1. Create Order Endpoint
**POST** `/api/razorpay/create-order`

Creates a Razorpay order before payment checkout.

**Request Body:**
```json
{
  "amount": 5000,
  "billingName": "John Doe",
  "billingEmail": "john@example.com",
  "billingTel": "+91-9876543210"
}
```

**Response:**
```json
{
  "orderId": "order_1234567890abcd",
  "amount": 500000,
  "currency": "INR",
  "keyId": "your_key_id"
}
```

**Important:** Amounts are sent in rupees but converted to paise internally (1 rupee = 100 paise).

### 2. Verify Payment Endpoint
**POST** `/api/razorpay/verify`

Verifies the payment signature after successful checkout.

**Request Body:**
```json
{
  "razorpay_order_id": "order_1234567890abcd",
  "razorpay_payment_id": "pay_1234567890abcd",
  "razorpay_signature": "signature_hash"
}
```

**Response (Success):**
```json
{
  "success": true,
  "orderId": "order_1234567890abcd",
  "paymentId": "pay_1234567890abcd"
}
```

## Implementation Flow

### Server-Side Steps

1. **Create Order:** Client requests order creation with amount and billing details
2. **Generate Order ID:** Backend creates Razorpay order and returns order ID + key
3. **Verify Signature:** After payment, verify HMAC SHA256 signature using: `HMAC-SHA256(order_id|payment_id, key_secret)`

### Client-Side Integration

Use Razorpay Checkout script to handle payment UI:

```javascript
const options = {
  key: response.keyId,
  amount: response.amount,
  currency: response.currency,
  name: "ARIFAC",
  order_id: response.orderId,
  handler: async (response) => {
    // Send verification request to /api/razorpay/verify
    const result = await fetch('/api/razorpay/verify', {
      method: 'POST',
      body: JSON.stringify(response)
    });
  }
};

new Razorpay(options).open();
```

## Security Considerations

- **Signature Verification:** Always verify the HMAC SHA256 signature server-side before processing payments
- **Key Management:** Store API keys securely as environment variables, never commit to version control
- **HTTPS Only:** All payment endpoints require HTTPS in production
- **Amount Validation:** Verify requested amount matches order amount to prevent tampering

## Error Handling

The API returns appropriate HTTP status codes:

- **500:** Configuration missing (missing API keys)
- **400:** Verification failed (invalid signature)
- **500:** Internal server error (processing exceptions)

Error responses include detailed messages for debugging.

## Production Checklist

- [ ] Switch to live Razorpay credentials
- [ ] Implement database persistence for payment records
- [ ] Update membership status upon successful verification
- [ ] Configure webhook handlers for payment updates
- [ ] Set up email confirmations for successful payments
- [ ] Enable audit logging for all payment transactions
- [ ] Test end-to-end payment flow with live credentials
- [ ] Configure rollback procedures for failed payments

## Support

For Razorpay API documentation, visit: https://razorpay.com/docs/
