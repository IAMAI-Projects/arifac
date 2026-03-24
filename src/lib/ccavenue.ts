import crypto from 'crypto';

/**
 * Encrypts the data string using AES-128-CBC as required by CCAvenue.
 * @param data The plaintext string to encrypt.
 * @param workingKey The 32-character working key provided by CCAvenue.
 * @returns The encrypted string in hex format.
 */
export function encrypt(data: string, workingKey: string): string {
    const m = crypto.createHash('md5');
    m.update(workingKey);
    const key = m.digest();
    const iv = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encoded = cipher.update(data, 'utf8', 'hex');
    encoded += cipher.final('hex');
    return encoded;
}

/**
 * Decrypts the encrypted string using AES-128-CBC as required by CCAvenue.
 * @param encText The hex-encoded encrypted string.
 * @param workingKey The 32-character working key provided by CCAvenue.
 * @returns The decrypted plaintext string.
 */
export function decrypt(encText: string, workingKey: string): string {
    const m = crypto.createHash('md5');
    m.update(workingKey);
    const key = m.digest();
    const iv = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decoded = decipher.update(encText, 'hex', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
}
