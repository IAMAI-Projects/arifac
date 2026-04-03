import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/server-auth';
import { MembershipFormASchema, MembershipFormBSchema } from '@/lib/validations/membership.schema';

import { MAP_IDENTIFIER_TYPE } from '@/lib/constants';

export class MembershipService {
  static async registerFormA(data: any) {
    const validatedData = MembershipFormASchema.parse(data);
    const idenType = (MAP_IDENTIFIER_TYPE[validatedData.identifierType] || 'OTHER') as any;

    return await prisma.$transaction(async (tx) => {
      // 1. Create or Update Organisation
      const organisation = await tx.organisations.upsert({
        where: {
          identifier_type_identifier_value: {
            identifier_type: idenType,
            identifier_value: validatedData.identifierNumber,
          }
        },
        update: {
          name: validatedData.orgName,
          website: validatedData.orgWebsite || '',
          sector: validatedData.primarySector,
          entity_type: validatedData.entityType,
          registered_address: validatedData.registeredAddress,
          regulated_entity: validatedData.isRegulated === 'Yes',
        },
        create: {
          name: validatedData.orgName,
          website: validatedData.orgWebsite || '',
          sector: validatedData.primarySector,
          entity_type: validatedData.entityType,
          registered_address: validatedData.registeredAddress,
          regulated_entity: validatedData.isRegulated === 'Yes',
          identifier_type: idenType,
          identifier_value: validatedData.identifierNumber,
        }
      });

      // 2. Create or Update User
      const hashedPassword = await hashPassword(validatedData.password);
      const user = await tx.users.upsert({
        where: { email: validatedData.email },
        update: {
          full_name: validatedData.fullName,
          designation: validatedData.designation,
          mobile: validatedData.mobile,
          username: validatedData.username,
          password_hash: hashedPassword,
          organisation_id: organisation.id,
        },
        create: {
          full_name: validatedData.fullName,
          designation: validatedData.designation,
          email: validatedData.email,
          mobile: validatedData.mobile,
          username: validatedData.username,
          password_hash: hashedPassword,
          organisation_id: organisation.id,
          is_active: false,
          is_primary: true
        }
      });

      // 3. Create Membership Application
      const application = await tx.membership_applications.create({
        data: {
          application_type: 'NON_PRE_APPROVED',
          organisation_id: organisation.id,
          user_id: user.id,
          status: 'INIT',
          fee_amount: validatedData.totalAmount || 0,
          fee_waived: false,
          is_iamai_member: validatedData.industryMemberships.includes('IAMAI'),
          is_iba_member: validatedData.industryMemberships.includes('IBA'),
        }
      });

      // 4. Create Application Details
      await tx.application_details.create({
        data: {
          application_id: application.id,
          sector: validatedData.primarySector,
          entity_type: validatedData.entityType,
          identifier_type: idenType,
          identifier_value: validatedData.identifierNumber,
          iamai_certificate_url: validatedData.iamaiCertificateUrl,
          iba_membership_id: validatedData.ibaMembershipId,
        }
      });

      console.log('[Service] Registration completed with Application ID:', application.id);
      return {
        success: true,
        applicationId: application.id,
        userId: user.id,
        user: {
          id: user.id,
          email: user.email,
          name: user.full_name,
          orgId: organisation.id
        }
      };
    });
  }

  static async registerFormB(data: any) {
    const validatedData = MembershipFormBSchema.parse(data);

    return await prisma.$transaction(async (tx) => {
      // Create User (Set 2)
      const hashedPassword = await hashPassword(validatedData.password);
      const user = await tx.user.upsert({
        where: { email: validatedData.email },
        update: {
          name: validatedData.fullName,
          status: 'UNDER_ADMIN_REVIEW',
          password: hashedPassword
        },
        create: {
          email: validatedData.email,
          name: validatedData.fullName,
          status: 'UNDER_ADMIN_REVIEW',
          password: hashedPassword
        }
      });

      // Create Form B record
      const formB = await tx.formB.upsert({
        where: { userId: user.id },
        update: {
          organisationName: validatedData.orgName,
          details: validatedData as any,
          status: 'PENDING',
          submittedAt: new Date()
        },
        create: {
          userId: user.id,
          organisationName: validatedData.orgName,
          details: validatedData as any,
          status: 'PENDING'
        }
      });

      // Create Approval Record
      await tx.approval.create({
        data: {
          userId: user.id,
          stage: 'FORM_B',
          status: 'PENDING',
          remarks: 'Initial Form B Submission'
        }
      });

      console.log('[Service] Form B registration completed for:', user.id);
      return { 
        success: true, 
        applicationId: formB.id, 
        userId: user.id 
      };
    });
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
