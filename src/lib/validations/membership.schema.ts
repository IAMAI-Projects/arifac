import { z } from 'zod';
import { validatePAN } from '@/utils/panValidator';
import { MAP_IDENTIFIER_TYPE } from '@/lib/constants';

export const MembershipFormASchema = z.object({
  // Authorised Representative Details
  salutation: z.string().min(1, 'Salutation is required'),
  fullName: z.string().min(2, 'Full name is required'),
  designation: z.string().min(1, 'Designation is required'),
  countryCode: z.string().default('+91'),
  mobile: z.string().regex(/^\d{10}$/, 'Mobile must be 10 digits'),
  email: z.string().email('Invalid official email'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),

  // Organisation Details
  orgName: z.string().min(1, 'Organisation name is required'),
  registeredAddress: z.string().min(5, 'Registered address must be at least 5 characters'),
  orgWebsite: z.string().url('Invalid website URL'),
  primarySector: z.string().min(1, 'Primary sector is required'),
  entityType: z.string().min(1, 'Entity type is required'),
  isRegulated: z.enum(['Yes', 'No']),

  // Regulatory & Company Identifier
  registeredWithFiu: z.enum(['Yes', 'No']).optional().default('No'),
  fiuRegNumber: z.string().optional().default(''),
  identifierType: z.string().min(1, 'Identifier type is required'),
  identifierNumber: z.string().min(1, 'Identifier number is required'),

  // Existing Industry Memberships
  industryMemberships: z.array(z.string()),
  iamaiCertificateUrl: z.string().optional(),
  ibaCertificateUrl: z.string().optional(),
  ibaMembershipId: z.string().optional(),
  turnoverOrAum: z.string().optional(),

  // Amounts
  baseAmount: z.number().optional(),
  taxAmount: z.number().optional(),
  totalAmount: z.number().optional(),

  declarationAccepted: z.literal(true, {
    message: 'You must accept the declaration',
  }),
}).superRefine((data, ctx) => {
  const mappedType = MAP_IDENTIFIER_TYPE[data.identifierType];
  if (mappedType === 'PAN') {
    const panResult = validatePAN(data.identifierNumber, data.entityType);
    if (!panResult.isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: panResult.message,
        path: ['identifierNumber'],
      });
    }
  }

  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  }
});

export const MembershipFormBSchema = z.object({
  // Basic Details
  salutation: z.string().min(1),
  fullName: z.string().min(2),
  designation: z.string().min(1),
  mobile: z.string().regex(/^\d{10}$/),
  countryCode: z.string().default('+91'),
  email: z.string().email(),
  
  // Organisation Details
  orgName: z.string().min(1),
  orgWebsite: z.string().url().optional().or(z.literal('')),
  registeredAddress: z.string().min(5),
  isRegulated: z.enum(['Yes', 'No']),
  
  // Account Credentials
  username: z.string().min(3),
  password: z.string().min(6),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  
  remarks: z.string().optional(),
  declarationAccepted: z.literal(true),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  }
});

export const MembershipFormCSchema = MembershipFormASchema;

export const PostApprovalFormSchema = z.object({
  primarySector: z.string().min(1, 'Primary sector is required'),
  entityType: z.string().min(1, 'Entity type is required'),
  registeredWithFiu: z.enum(['Yes', 'No']).optional().default('No'),
  fiuRegNumber: z.string().optional().default(''),
  identifierType: z.string().min(1, 'Identifier type is required'),
  identifierNumber: z.string().min(1, 'Identifier number is required'),
  industryMemberships: z.array(z.string()),
  ibaMembershipId: z.string().optional(),
  turnoverOrAum: z.string().optional(),
  declarationAccepted: z.literal(true, {
    message: 'You must accept the declaration',
  }),
}).superRefine((data, ctx) => {
  const mappedType = MAP_IDENTIFIER_TYPE[data.identifierType];
  if (mappedType === 'PAN') {
    const panResult = validatePAN(data.identifierNumber, data.entityType);
    if (!panResult.isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: panResult.message,
        path: ['identifierNumber'],
      });
    }
  }
});
