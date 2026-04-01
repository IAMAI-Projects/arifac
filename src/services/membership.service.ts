import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/server-auth';
import { MembershipFormASchema, MembershipFormBSchema } from '@/lib/validations/membership.schema';

import { MAP_IDENTIFIER_TYPE } from '@/lib/constants';

export class MembershipService {
  static async registerFormA(data: any) {
    const validatedData = MembershipFormASchema.parse(data);

    return await prisma.$transaction(async (tx: any) => {
      console.log('[Service] Starting registerFormA transaction');
      // 1. Check if user already exists
      const existingUser = await tx.users.findFirst({
        where: {
          OR: [
            { email: validatedData.email },
            { username: validatedData.username }
          ]
        }
      });

      if (existingUser) {
        console.log('[Service] User already exists:', validatedData.email);
        throw new Error('User with this email or username already exists');
      }

      // 2. Find or Create Organisation
      let organisation = await tx.organisations.findFirst({
        where: { name: validatedData.orgName }
      });

      if (!organisation) {
        console.log('[Service] Creating new organisation:', validatedData.orgName);
        organisation = await tx.organisations.create({
          data: {
            name: validatedData.orgName,
            website: validatedData.orgWebsite,
            sector: validatedData.primarySector,
            entity_type: validatedData.entityType,
            registered_address: validatedData.registeredAddress,
            regulated_entity: validatedData.isRegulated === 'Yes',
            identifier_type: (MAP_IDENTIFIER_TYPE[validatedData.identifierType] || 'OTHER') as any,
            identifier_value: validatedData.identifierNumber,
            fiu_registration_number: validatedData.fiuRegNumber,
          }
        });
      } else {
        console.log('[Service] Using existing organisation:', organisation.id);
      }

      // 3. Create User
      console.log('[Service] Creating user:', validatedData.email);
      const hashedPassword = await hashPassword(validatedData.password);
      const user = await tx.users.create({
        data: {
          organisation_id: organisation.id,
          full_name: validatedData.fullName,
          designation: validatedData.designation,
          email: validatedData.email,
          mobile: validatedData.mobile,
          username: validatedData.username,
          password_hash: hashedPassword,
          is_active: true,
        }
      });
      console.log('[Service] User created with ID:', user.id);

      // 4. Create Application
      console.log('[Service] Creating membership application');
      const isIamaiMember = validatedData.industryMemberships.includes('IAMAI');
      const isIbaMember = validatedData.industryMemberships.includes('IBA');
      
      // If either IAMAI or IBA is selected, waive the fee
      const feeWaived = isIamaiMember || isIbaMember;

      const application = await tx.membership_applications.create({
        data: {
          application_type: 'PRE_APPROVED',
          organisation_id: organisation.id,
          user_id: user.id,
          status: feeWaived ? 'UNDER_REVIEW' : 'INIT',
          fee_amount: validatedData.totalAmount || 0,
          fee_waived: feeWaived,
          aum_range: validatedData.turnoverOrAum,
          is_iamai_member: isIamaiMember,
          is_iba_member: isIbaMember,
        }
      });
      console.log('[Service] Application created with ID:', application.id);

      // 5. Create Application Details
      console.log('[Service] Creating application details');
      await tx.application_details.create({
        data: {
          application_id: application.id,
          sector: validatedData.primarySector,
          entity_type: validatedData.entityType,
          identifier_type: (MAP_IDENTIFIER_TYPE[validatedData.identifierType] || 'OTHER') as any,
          identifier_value: validatedData.identifierNumber,
          fiu_registration_number: validatedData.fiuRegNumber,
          iamai_certificate_url: validatedData.iamaiCertificateUrl,
          iba_certificate_url: validatedData.ibaCertificateUrl,
          iba_membership_id: validatedData.ibaMembershipId,
        }
      });

      console.log('[Service] registerFormA transaction completed successfully');
      return { 
        success: true, 
        applicationId: application.id, 
        userId: user.id,
        user: {
          id: user.id,
          email: user.email,
          name: user.full_name,
          orgId: user.organisation_id
        }
      };
    });
  }

  static async registerFormB(data: any) {
    const validatedData = MembershipFormBSchema.parse(data);

    return await prisma.$transaction(async (tx: any) => {
      console.log('[Service] Starting registerFormB transaction');
      // 1. Check if user already exists
      const existingUser = await tx.users.findFirst({
        where: {
          OR: [
            { email: validatedData.email },
            { username: validatedData.username }
          ]
        }
      });

      if (existingUser) {
        console.log('[Service] User already exists:', validatedData.email);
        throw new Error('User with this email or username already exists');
      }

      // 2. Find or Create Organisation for Form B
      console.log('[Service] Finding or creating organisation for Form B');
      // For Form B, we use a more unique pending value if we can't find by name
      const pendingIdenValue = `PENDING_${validatedData.email}`;
      
      let organisation = await tx.organisations.findFirst({
        where: { name: validatedData.orgName }
      });

      if (!organisation) {
        organisation = await tx.organisations.create({
          data: {
            name: validatedData.orgName,
            website: validatedData.orgWebsite,
            registered_address: validatedData.registeredAddress,
            regulated_entity: validatedData.isRegulated === 'Yes',
            sector: 'Unknown',
            entity_type: 'Unknown',
            identifier_type: 'OTHER',
            identifier_value: pendingIdenValue,
          }
        });
      }

      // 3. Create User
      console.log('[Service] Creating user for Form B:', validatedData.email);
      const hashedPassword = await hashPassword(validatedData.password);
      const user = await tx.users.create({
        data: {
          organisation_id: organisation.id,
          full_name: validatedData.fullName,
          designation: validatedData.designation,
          email: validatedData.email,
          mobile: validatedData.mobile,
          username: validatedData.username,
          password_hash: hashedPassword,
          is_active: false,
        }
      });

      // 4. Create Application
      console.log('[Service] Creating membership application for Form B');
      const application = await tx.membership_applications.create({
        data: {
          application_type: 'NON_PRE_APPROVED',
          organisation_id: organisation.id,
          user_id: user.id,
          status: 'BASIC_SUBMITTED',
        }
      });

      console.log('[Service] registerFormB transaction completed successfully');
      return { success: true, applicationId: application.id, userId: user.id };
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
