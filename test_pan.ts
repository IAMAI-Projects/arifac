import { validatePAN, ARIFAC_ENTITY_TO_PAN_TYPE } from './src/utils/panValidator';

// Mocking console for the script
const console = { log: (msg: string, ...args: any[]) => process.stdout.write(msg + ' ' + args.join(' ') + '\n') };

function testPAN(pan: string, entityType?: string) {
  const result = validatePAN(pan, entityType);
  console.log(`PAN: ${pan}, Entity: ${entityType || 'N/A'} => ${result.isValid ? '✅ VALID' : '❌ INVALID: ' + result.message}`);
}

console.log('--- PAN Validation Tests ---');

// Format tests
testPAN('ABCDE1234F'); // Valid format
testPAN('abcde1234f'); // Valid (case insensitive, converted by helper)
testPAN('ABCD1234F');  // Too short
testPAN('ABCDE12345'); // Last char not alpha
testPAN('1BCDE1234F'); // First char not alpha
testPAN('ABCDE123A');  // Too short

// Entity Match tests
const companyEntity = "Scheduled Commercial Bank (Public, Private & Foreign)"; // Should be 'C'
const trustEntity = "Mutual Fund"; // Should be 'T'
const firmEntity = "Legal Firm"; // Should be 'F'

testPAN('ABCDE1234F', companyEntity); // Mismatch (F vs C)
testPAN('ABCC1111A', companyEntity);  // Match (C vs C)
testPAN('ABCT0000Z', trustEntity);    // Match (T vs T)
testPAN('ABCF9999M', firmEntity);     // Match (F vs F)
testPAN('ABCP4444X', companyEntity);  // Mismatch (P vs C)

console.log('--- End of Tests ---');
