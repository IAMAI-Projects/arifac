import { validatePAN } from './src/utils/panValidator';

function testPAN(pan: string, entityType?: string) {
  const result = validatePAN(pan, entityType);
  console.log(`PAN: ${pan}, Entity: ${entityType || 'N/A'} => ${result.isValid ? '✅ VALID' : '❌ INVALID: ' + result.message}`);
}

console.log('--- Additional PAN Validation Tests ---');

testPAN('ABCDE1234F', 'Public Limited Company'); // Mismatch (F vs C)
testPAN('ABC P 1111 A'.replace(/\s/g, ''), 'Proprietorship'); // Match (P vs P)
testPAN('ABCT0000Z', 'Trust'); // Match (T vs T)
testPAN('ABCA9999M', 'Society'); // Match (A vs A)

console.log('--- End of Tests ---');
