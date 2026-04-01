import crypto from 'crypto';

/**
 * CCAvenue Payment Gateway - Encryption & Decryption Utility
 *
 * CCAvenue uses AES-128-CBC encryption with an MD5-hashed working key.
 * All request/response data is encrypted before transmission.
 */

const CCAVENUE_MERCHANT_ID = process.env.CCAVENUE_MERCHANT_ID!;
const CCAVENUE_ACCESS_CODE = process.env.CCAVENUE_ACCESS_CODE!;
const CCAVENUE_WORKING_KEY = process.env.CCAVENUE_WORKING_KEY!;
const CCAVENUE_POST_URL = process.env.CCAVENUE_POST_URL!;

/**
 * Encrypt plaintext using CCAvenue's AES-128-CBC scheme.
 * Key is MD5 hash of working key (16 bytes), IV is first 16 bytes of key.
 */
export function encrypt(plainText: string): string {
  const key = crypto.createHash('md5').update(CCAVENUE_WORKING_KEY).digest();
  const iv = Buffer.alloc(16, 0); // CCAvenue uses a zero IV
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

/**
 * Decrypt ciphertext returned by CCAvenue.
 */
export function decrypt(encryptedText: string): string {
  const key = crypto.createHash('md5').update(CCAVENUE_WORKING_KEY).digest();
  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/**
 * Generate a unique order ID for the transaction.
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(4).toString('hex');
  return `ARIFAC-${timestamp}-${random}`.toUpperCase();
}

/**
 * Build the encrypted request data for CCAvenue form submission.
 */
export function buildCCavenueRequest(params: {
  orderId: string;
  amount: number;
  currency?: string;
  redirectUrl: string;
  cancelUrl: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  billingAddress?: string;
  billingCity?: string;
  billingState?: string;
  billingZip?: string;
  billingCountry?: string;
  merchantParam1?: string; // Custom param (e.g., application ID)
  merchantParam2?: string; // Custom param (e.g., payment type)
}): { encRequest: string; accessCode: string; postUrl: string } {
  const orderData = [
    `merchant_id=${CCAVENUE_MERCHANT_ID}`,
    `order_id=${params.orderId}`,
    `currency=${params.currency || 'INR'}`,
    `amount=${params.amount.toFixed(2)}`,
    `redirect_url=${params.redirectUrl}`,
    `cancel_url=${params.cancelUrl}`,
    `language=EN`,
    `billing_name=${params.customerName}`,
    `billing_email=${params.customerEmail}`,
    `billing_tel=${params.customerPhone}`,
    `billing_address=${params.billingAddress || ''}`,
    `billing_city=${params.billingCity || ''}`,
    `billing_state=${params.billingState || ''}`,
    `billing_zip=${params.billingZip || ''}`,
    `billing_country=${params.billingCountry || 'India'}`,
    `merchant_param1=${params.merchantParam1 || ''}`,
    `merchant_param2=${params.merchantParam2 || ''}`,
  ].join('&');

  return {
    encRequest: encrypt(orderData),
    accessCode: CCAVENUE_ACCESS_CODE,
    postUrl: CCAVENUE_POST_URL,
  };
}

/**
 * Parse CCAvenue's encrypted response into a key-value object.
 */
export function parseCCavenueResponse(encResponse: string): Record<string, string> {
  const decrypted = decrypt(encResponse);
  const params: Record<string, string> = {};
  decrypted.split('&').forEach((pair) => {
    const [key, ...valueParts] = pair.split('=');
    if (key) {
      params[key.trim()] = valueParts.join('=').trim();
    }
  });
  return params;
}

export { CCAVENUE_MERCHANT_ID, CCAVENUE_ACCESS_CODE, CCAVENUE_POST_URL };
