import { z } from 'zod';

export const MembershipFormASchema = z.object({
  // Authorised Representative Details
  salutation: z.string().min(1, 'Salutation is required'),
  fullName: z.string().min(2, 'Full name is required'),
  designation: z.string().min(1, 'Designation is required'),
  countryCode: z.string().default('+91'),
  mobile: z.string().regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
  email: z.string().email('Invalid official email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),

  // Organisation Details
  orgName: z.string().min(1, 'Organisation name is required'),
  registeredAddress: z.string().min(5, 'Registered address must be at least 5 characters'),
  orgWebsite: z.string().url('Invalid website URL (e.g. https://example.com)').optional().or(z.literal('')),
  primarySector: z.string().min(1, 'Primary sector is required'),
  entityType: z.string().min(1, 'Entity type is required'),
  isRegulated: z.string().min(1, 'Please select if you are a regulated entity').refine(val => val === 'Yes' || val === 'No', 'Invalid selection'),

  // Regulatory & Company Identifier
  registeredWithFiu: z.string().min(1, 'Please select if registered with FIU-IND').refine(val => val === 'Yes' || val === 'No', 'Invalid selection'),
  fiuRegNumber: z.string().optional(),
  identifierType: z.string().min(1, 'Identifier type is required'),
  identifierNumber: z.string().min(1, 'Identifier number is required'),

  // Existing Industry Memberships
  industryMemberships: z.array(z.string()).min(1, 'Please select at least one membership option (or "None")'),
  iamaiCertificateUrl: z.string().optional(),
  ibaCertificateUrl: z.string().optional(),
  ibaMembershipId: z.string().optional(),
  turnoverOrAum: z.string().optional(),

  // Amounts
  baseAmount: z.number().optional(),
  taxAmount: z.number().optional(),
  totalAmount: z.number().optional(),

  declarationAccepted: z.boolean().refine(val => val === true, 'You must accept the declaration to proceed'),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  }
});

export const MembershipFormBSchema = z.object({
  // Basic Details
  salutation: z.string().min(1, 'Salutation is required'),
  fullName: z.string().min(2, 'Full name is required'),
  designation: z.string().min(1, 'Designation is required'),
  mobile: z.string().regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
  countryCode: z.string().default('+91'),
  email: z.string().email('Invalid official email address'),
  
  // Organisation Details
  orgName: z.string().min(1, 'Organisation name is required'),
  orgWebsite: z.string().url('Invalid website URL (e.g. https://example.com)').optional().or(z.literal('')),
  registeredAddress: z.string().min(5, 'Registered address must be at least 5 characters'),
  isRegulated: z.string().min(1, 'Please select if you are a regulated entity').refine(val => val === 'Yes' || val === 'No', 'Invalid selection'),
  
  // Account Credentials
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  
  remarks: z.string().optional(),
  declarationAccepted: z.boolean().refine(val => val === true, 'You must accept the declaration to proceed'),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  }
});

export const MembershipFormCSchema = MembershipFormASchema;

export const PostApprovalFormSchema = z.object({
  primarySector: z.string().min(1, 'Primary sector is required'),
  entityType: z.string().min(1, 'Entity type is required'),
  registeredWithFiu: z.string().min(1, 'Please select if registered with FIU-IND'),
  fiuRegNumber: z.string().optional(),
  identifierType: z.string().min(1, 'Identifier type is required'),
  identifierNumber: z.string().min(1, 'Identifier number is required'),
  industryMemberships: z.array(z.string()).min(1, 'Please select at least one membership option (or "None")'),
  ibaMembershipId: z.string().optional(),
  turnoverOrAum: z.string().optional(),
  declarationAccepted: z.boolean().refine(val => val === true, 'You must accept the declaration to proceed'),
});
