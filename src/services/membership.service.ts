import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/server-auth';
import { MembershipFormASchema, MembershipFormBSchema } from '@/lib/validations/membership.schema';

import { MAP_IDENTIFIER_TYPE } from '@/lib/constants';

export class MembershipService {
  static async registerFormA(data: any) {
    const validatedData = MembershipFormASchema.parse(data);

    // For now, skip database operations - return mock success
    console.log('[Service] Skipping database transaction (DB disabled for testing)');

    // Generate mock IDs
    const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const userId = `USER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log('[Service] Mock registration completed with Application ID:', applicationId);
    return {
      success: true,
      applicationId: applicationId,
      userId: userId,
      user: {
        id: userId,
        email: validatedData.email,
        name: validatedData.fullName,
        orgId: null
      }
    };
  }

  static async registerFormB(data: any) {
    const validatedData = MembershipFormBSchema.parse(data);

    // For now, skip database operations - return mock success
    console.log('[Service] Skipping database transaction (DB disabled for testing)');

    // Generate mock IDs
    const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const userId = `USER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log('[Service] Mock registration completed with Application ID:', applicationId);
    return { success: true, applicationId: applicationId, userId: userId };
  }

  static async getApplicationsByUser(userId: string, email?: string) {
    console.log(`[Service] getApplicationsByUser called with ID: ${userId}, Email: ${email}`);
    const applications = await prisma.membership_applications.findMany({
      where: {
        OR: [
          { user_id: userId },
          { users: { email: email } }
        ]
      },
      include: {
        application_details: true,
        payments: true,
        users: {
          include: {
            organisations: true
          }
        },
      },
      orderBy: { created_at: 'desc' },
    });

    // Map organisations back to top level for compatibility with existing frontend
    return applications.map((app: any) => ({
      ...app,
      organisations: app.users?.organisations
    }));
  }
}
