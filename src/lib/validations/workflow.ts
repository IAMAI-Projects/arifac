
import { z } from 'zod';

export const FormBValidation = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  organisationName: z.string().min(2, 'Organisation Name must be at least 2 characters'),
  details: z.object({
    sector: z.string().optional(),
    entityType: z.string().optional(),
    turnover: z.string().optional(),
    contactPerson: z.string().optional(),
    // Add more as needed
  }).catchall(z.any()),
});

export const AdminLoginValidation = z.object({
  email: z.string().email('Invalid admin email'),
  password: z.string().min(6, 'Password is too short'),
});

export const AdminApprovalValidation = z.object({
  userId: z.string().uuid('Invalid user ID'),
  status: z.enum(['APPROVED', 'REJECTED']),
  remarks: z.string().optional(),
});

export const PostApprovalValidation = z.object({
  userId: z.string().uuid('Invalid user ID'),
  additionalDetails: z.any(),
});
