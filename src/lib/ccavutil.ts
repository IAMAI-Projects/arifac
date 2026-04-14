import crypto from 'crypto';

/**
 * CCAvenue AES-128-CBC encrypt/decrypt utilities.
 *
 * Unlike the legacy ccavenue.ts (which reads the working key from env),
 * these functions accept the key as an explicit argument so they can be
 * used safely from any server context (API routes, edge functions, etc.)
 * without relying on module-level env-var reads.
 *
 * CCAvenue spec:
 *   - Key   : first 16 bytes of MD5( workingKey )
 *   - IV    : fixed 16-byte sequence [0x00..0x0f]
 *   - Cipher: AES-128-CBC
 *   - Encoding: hex
 */

/**
 * Fixed 16-byte Initialization Vector required by CCAvenue.
 * This matches the official CCAvenue Node.js integration kit.
 * NEVER change this — CCAvenue expects this exact IV.
 */
const IV = Buffer.from([
    0x00, 0x01, 0x02, 0x03,
    0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b,
    0x0c, 0x0d, 0x0e, 0x0f,
]);

/**
 * Encrypt a plain-text string for CCAvenue.
 */
export function encrypt(plainText: string, workingKey: string): string {
    const key = crypto.createHash('md5').update(workingKey).digest();
    const cipher = crypto.createCipheriv('aes-128-cbc', key, IV);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

/**
 * Decrypt a hex-encoded CCAvenue response string.
 */
export function decrypt(encryptedText: string, workingKey: string): string {
    const key = crypto.createHash('md5').update(workingKey).digest();
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, IV);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
