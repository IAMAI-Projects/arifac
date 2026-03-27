import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { MembershipService } from '@/services/membership.service';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

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

jest.mock('@/lib/auth', () => ({
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
});
