/**
 * CCAvenue AES-128-CBC Cryptography Utilities
 *
 * CCAvenue uses AES-128-CBC with the following key derivation:
 *   key  = MD5(workingKey)   → 16 bytes
 *   IV   = fixed 16-byte sequence [0x00..0x0f]
 *
 * Both encrypt and decrypt use the native Node.js `crypto` module — no
 * third-party dependencies required.
 */
import crypto from 'crypto';

/** Derive the 16-byte AES key by MD5-hashing the 32-char working key. */
function deriveKey(workingKey: string): Buffer {
    return crypto.createHash('md5').update(workingKey).digest();
}

/** Fixed IV required by CCAvenue. */
const IV = Buffer.from([
    0x00, 0x01, 0x02, 0x03,
    0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b,
    0x0c, 0x0d, 0x0e, 0x0f,
]);

/**
 * Encrypt a plain-text string for CCAvenue.
 * @param plainText  URL-encoded parameter string (e.g. "merchant_id=…&amount=…")
 * @param workingKey 32-character working key from CCAvenue dashboard
 * @returns          Hex-encoded ciphertext ready for the `encRequest` field
 */
export function encrypt(plainText: string, workingKey: string): string {
    const cipher = crypto.createCipheriv('aes-128-cbc', deriveKey(workingKey), IV);
    return cipher.update(plainText, 'utf8', 'hex') + cipher.final('hex');
}

/**
 * Decrypt the CCAvenue response payload.
 * @param encText    Hex-encoded ciphertext received in the `encResp` field
 * @param workingKey 32-character working key from CCAvenue dashboard
 * @returns          Decrypted URL-encoded string (parse with URLSearchParams)
 */
export function decrypt(encText: string, workingKey: string): string {
    const decipher = crypto.createDecipheriv('aes-128-cbc', deriveKey(workingKey), IV);
    return decipher.update(encText, 'hex', 'utf8') + decipher.final('utf8');
}
