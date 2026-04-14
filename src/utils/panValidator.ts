/**
 * PAN Card Number Verification Utility
 */

export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

// 4th character represents PAN holder type
export const PAN_ENTITY_TYPES: Record<string, string> = {
  'P': 'Individual',
  'C': 'Company',
  'H': 'HUF (Hindu Undivided Family)',
  'F': 'Firm',
  'A': 'Association of Persons (AOP)',
  'T': 'Trust',
  'B': 'Body of Individuals (BOI)',
  'L': 'Local Authority',
  'J': 'Artificial Juridical Person',
  'G': 'Government'
};

/**
 * Maps ARIFAC Entity Types to PAN 4th Character codes
 */
export const ARIFAC_ENTITY_TO_PAN_TYPE: Record<string, string> = {
  // Banking & Financial
  "Scheduled Commercial Bank (Public, Private & Foreign)": 'C',
  "Urban, Rural & Co-operative Bank": 'C',
  "Stock Exchange": 'C',
  "Clearing Corporation": 'C',
  "Depository": 'C',
  "Stock Broker": 'C',
  "AMC": 'C',
  "Mutual Fund": 'T',
  "AIF": 'T',
  "Portfolio Manager": 'C',
  "Investment Adviser": 'C',
  "Research Analyst": 'C',
  "Payment Aggregator": 'C',
  "Payment Gateway": 'C',
  "Payment Operator": 'C',
  "PPI Issuers": 'C',
  "Business Correspondent": 'C',
  "Cross-border remittance provider": 'C',
  "Authorised Dealer & Money Changer": 'C',
  "Life Insurer": 'C',
  "NBFCs": 'C',
  "Housing Finance Company": 'C',
  "Microfinance Institution": 'C',
  "Regulated fintech platform": 'C',
  "General Insurer": 'C',
  "Health Insurer": 'C',
  "Reinsurance Company": 'C',
  "Insurance Intermediary": 'C',
  "Insurance Broker & Corporate Agent": 'C',
  "Regulated Fintech Platforms": 'C',
  "Account Aggregators": 'C',
  "Regulated data-sharing intermediary": 'C',
  "Technology-enabled financial service provider": 'C',
  "DNFBP- Real estate developer, dealer or broker": 'C',
  "DNFBP- Dealer in precious metals, stones & bullion": 'C',
  "Trustee": 'T',
  "Fiduciary service providers": 'C',
  "Custodial & escrow service provider": 'C',
  "Credit Information Company": 'C',
  "Credit Bureau": 'C',
  "Virtual Digital Asset Service Provider (VDASP)": 'C',
  "Virtual asset exchange": 'C',
  "Custodial wallet provider": 'C',
  "AML/KYC, transaction monitoring or fraud-detection technology service providers": 'C',
  "RegTech": 'C',
  "SupTech": 'C',
  "Data Analytics firm": 'C',
  "Legal Firm": 'F',
  "Audit Firm": 'F',
  "Advisory firms specialising in AML/CFT": 'C',

  // Post-Approval / Form B Entity Types
  "Public Limited Company": 'C',
  "Private Limited Company": 'C',
  "Limited Liability Partnership (LLP)": 'F',
  "Partnership Firm": 'F',
  "Proprietorship": 'P',
  "Trust": 'T',
  "Society": 'A',
  "Co-operative Society": 'A',
};

export interface PANValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Validates a PAN card number
 * @param pan The PAN string to validate
 * @param arifacEntityType The entity type selected in the form
 */
export function validatePAN(pan: string, arifacEntityType?: string): PANValidationResult {
  if (!pan) {
    return { isValid: false, message: 'PAN number is required' };
  }

  const upperPAN = pan.toUpperCase();

  // 1. Length Check
  if (upperPAN.length !== 10) {
    return { isValid: false, message: 'PAN must be exactly 10 characters long' };
  }

  // 2. Format Check (Regex)
  if (!PAN_REGEX.test(upperPAN)) {
    return { 
      isValid: false, 
      message: 'Invalid PAN format. Expected: AAAAA9999A' 
    };
  }

  // 3. Entity Type Validation (4th character)
  const fourthChar = upperPAN.charAt(3);
  if (!PAN_ENTITY_TYPES[fourthChar]) {
    return { 
      isValid: false, 
      message: `Invalid 4th character '${fourthChar}'. It represents the entity type.` 
    };
  }

  // 4. Match with ARIFAC Entity Type if provided
  if (arifacEntityType) {
    const expectedChar = ARIFAC_ENTITY_TO_PAN_TYPE[arifacEntityType];
    if (expectedChar && fourthChar !== expectedChar) {
      const entityName = PAN_ENTITY_TYPES[expectedChar];
      return { 
        isValid: false, 
        message: `Entity mismatch: For '${arifacEntityType}', the 4th character should be '${expectedChar}' (${entityName}). Found '${fourthChar}'.` 
      };
    }
  }

  return { isValid: true };
}
