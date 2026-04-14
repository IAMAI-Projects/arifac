import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { MembershipService } from '@/services/membership.service';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/server-auth';

const mockPrismaClient = {
  $transaction: jest.fn((callback: any) => callback(mockPrismaClient)),
  users: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
  organisations: {
    findFirst: jest.fn(),
    create: jest.fn(),
    upsert: jest.fn(),
  },
  membership_applications: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  application_details: {
    create: jest.fn(),
  },
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => mockPrismaClient),
  Prisma: {
    TransactionClient: jest.fn(),
  },
}));

// We still need to mock @/lib/prisma because it exports the instance
jest.mock('@/lib/prisma', () => ({
  prisma: mockPrismaClient,
}));

jest.mock('@/lib/server-auth', () => ({
  hashPassword: jest.fn(() => Promise.resolve('hashed_password')),
}));

describe('MembershipService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerFormB', () => {
    it('should create an organisation, user, and application successfully', async () => {
      const mockData = {
        salutation: 'Mr.',
        fullName: 'Test User',
        designation: 'Manager',
        mobile: '1234567890',
        email: 'test@example.com',
        orgName: 'New Org',
        registeredAddress: '123 Street',
        isRegulated: 'No',
        username: 'testuser',
        password: 'password123',
        declarationAccepted: true,
      };

      (prisma.users.findFirst as any).mockResolvedValue(null);
      (prisma.organisations.create as any).mockResolvedValue({ id: 'org_id' });
      (prisma.users.create as any).mockResolvedValue({ id: 'user_id' });
      (prisma.membership_applications.create as any).mockResolvedValue({ id: 'app_id' });

      const result = await MembershipService.registerFormB(mockData);

      expect(result).toEqual({ success: true, applicationId: 'app_id', userId: 'user_id' });
      expect(prisma.organisations.create).toHaveBeenCalled();
      expect(prisma.users.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          email: 'test@example.com',
          password_hash: 'hashed_password',
        }),
      }));
    });

    it('should throw an error if user already exists', async () => {
      const mockData = {
        salutation: 'Mr.',
        fullName: 'Test User',
        designation: 'Manager',
        mobile: '1234567890',
        email: 'exists@example.com',
        orgName: 'New Org',
        registeredAddress: '123 Street',
        isRegulated: 'No',
        username: 'exists',
        password: 'password123',
        declarationAccepted: true,
      };

      (prisma.users.findFirst as any).mockResolvedValue({ id: 'existing_user' });

      await expect(MembershipService.registerFormB(mockData as any))
        .rejects.toThrow('User with this email or username already exists');
    });
  });

  describe('registerFormA', () => {
    it('should waive fee and set status to UNDER_REVIEW if IAMAI member', async () => {
      const mockData = {
        salutation: 'Mr.',
        fullName: 'Member User',
        designation: 'CEO',
        mobile: '1234567890',
        email: 'member@example.com',
        username: 'memberuser',
        password: 'password123',
        orgName: 'Member Org',
        registeredAddress: '456 Street',
        primarySector: 'Banking',
        entityType: 'Private Limited Company',
        isRegulated: 'Yes',
        registeredWithFiu: 'No',
        identifierType: 'PAN — Permanent Account Number',
        identifierNumber: 'ABCDE1234F',
        industryMemberships: ['IAMAI'],
        iamaiCertificateUrl: '/uploads/cert.pdf',
        totalAmount: 118000,
        declarationAccepted: true,
      };

      (prisma.users.findFirst as any).mockResolvedValue(null);
      (prisma.organisations.findFirst as any).mockResolvedValue(null);
      (prisma.organisations.create as any).mockResolvedValue({ id: 'org_id' });
      (prisma.users.create as any).mockResolvedValue({ id: 'user_id', email: 'member@example.com', full_name: 'Member User', organisation_id: 'org_id' });
      (prisma.membership_applications.create as any).mockResolvedValue({ id: 'app_id', user_id: 'user_id' });
      (prisma.application_details.create as any).mockResolvedValue({ id: 'detail_id' });

      const result = await MembershipService.registerFormA(mockData);

      expect(result.success).toBe(true);
      expect(prisma.membership_applications.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          status: 'UNDER_REVIEW',
          fee_waived: true,
          is_iamai_member: true,
        })
      }));
      expect(prisma.application_details.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          iamai_certificate_url: '/uploads/cert.pdf',
        })
      }));
    });

    it('should waive fee and set status to UNDER_REVIEW if IBA member (no certificate required)', async () => {
      const mockData = {
        salutation: 'Ms.',
        fullName: 'IBA User',
        designation: 'Manager',
        mobile: '9876543210',
        email: 'iba@example.com',
        username: 'ibauser',
        password: 'password123',
        orgName: 'IBA Org',
        registeredAddress: '789 Road',
        primarySector: 'NBFC',
        entityType: 'Private Limited Company',
        isRegulated: 'Yes',
        registeredWithFiu: 'No',
        identifierType: 'CIN — Company Identification Number (MCA)',
        identifierNumber: 'U12345MH2023PLC123456',
        industryMemberships: ['IBA'],
        ibaMembershipId: 'IBA-12345',
        totalAmount: 59000,
        declarationAccepted: true,
      };

      (prisma.users.findFirst as any).mockResolvedValue(null);
      (prisma.organisations.findFirst as any).mockResolvedValue(null);
      (prisma.organisations.create as any).mockResolvedValue({ id: 'org_iba' });
      (prisma.users.create as any).mockResolvedValue({ id: 'user_iba', email: 'iba@example.com', full_name: 'IBA User', organisation_id: 'org_iba' });
      (prisma.membership_applications.create as any).mockResolvedValue({ id: 'app_iba', user_id: 'user_iba' });
      (prisma.application_details.create as any).mockResolvedValue({ id: 'detail_iba' });

      const result = await MembershipService.registerFormA(mockData);

      expect(result.success).toBe(true);
      expect(prisma.membership_applications.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          status: 'UNDER_REVIEW',
          fee_waived: true,
          is_iba_member: true,
        })
      }));
      expect(prisma.application_details.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          iba_membership_id: 'IBA-12345',
          iba_certificate_url: undefined, // Explicitly check it's not sent if not needed
        })
      }));
    });
  });
});
