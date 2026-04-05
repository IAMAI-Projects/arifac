
import { prisma } from '@/lib/prisma';
import { UserStatus, FormBStatus, ApprovalStage, ApprovalStatus } from '@prisma/client';
import crypto from 'crypto';
import { hashPassword } from '@/lib/server-auth';
import { MAP_IDENTIFIER_TYPE } from '@/lib/constants';
import { EmailService } from '@/lib/email';

export class WorkflowService {
  static async submitFormB(data: { email: string; name: string; organisationName: string; details: any }) {
    let hashedPassword: string | undefined;
    if (data.details.password) {
      hashedPassword = await hashPassword(data.details.password);
    }

    const user = await prisma.$transaction(async (tx) => {
      // Create or Update User
      const user = await tx.user.upsert({
        where: { email: data.email },
        update: { 
          name: data.name,
          status: UserStatus.UNDER_ADMIN_REVIEW,
          ...(hashedPassword ? { password: hashedPassword } : {})
        },
        create: {
          email: data.email,
          name: data.name,
          status: UserStatus.UNDER_ADMIN_REVIEW,
          ...(hashedPassword ? { password: hashedPassword } : {})
        }
      });

      // Prevent duplicate Form B if already approved or pending?
      // For now, upsert Form B
      await tx.formB.upsert({
        where: { userId: user.id },
        update: {
          organisationName: data.organisationName,
          details: data.details,
          status: FormBStatus.PENDING,
          submittedAt: new Date()
        },
        create: {
          userId: user.id,
          organisationName: data.organisationName,
          details: data.details,
          status: FormBStatus.PENDING
        }
      });

      await tx.approval.create({
        data: {
          userId: user.id,
          stage: ApprovalStage.FORM_B,
          status: ApprovalStatus.PENDING,
          remarks: 'Initial Form B Submission'
        }
      });

      return user;
    }, { maxWait: 20000, timeout: 60000 });

    // Send emails after successful DB transaction
    const emailDetails = {
      ...data.details,
      name: data.name,
      organisationName: data.organisationName,
      email: data.email
    };

    // 1. Notify Admins
    try {
      const admins = await prisma.admin.findMany({ select: { email: true } });
      if (admins.length > 0) {
        const emailPromises = admins.map(admin =>
          EmailService.sendAdminNotificationEmail(admin.email, emailDetails)
        );
        await Promise.allSettled(emailPromises);
      } else {
        // Always notify the primary admin inbox even if no admin records exist
        await EmailService.sendAdminNotificationEmail('help.arifac@iamai.in', emailDetails);
      }
    } catch (emailError) {
      console.error('[WorkflowService] Failed to notify admins:', emailError);
    }

    // 2. Send Form B user acknowledgement email (under-review template)
    try {
      await EmailService.sendFormBEmail({
        name: data.name,
        email: data.email,
        organisation: data.organisationName,
        designation: data.details?.designation,
        mobile: data.details?.countryCode
          ? `${data.details.countryCode} ${data.details.mobile || ''}`
          : data.details?.mobile,
        salutation: data.details?.salutation,
      });
    } catch (emailError) {
      console.error('[WorkflowService] Failed to send Form B user acknowledgement:', emailError);
    }

    return user;
  }

  /**
   * Admin Review Form B
   */
  static async approveFormB(userId: string, adminId: string, remarks?: string) {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      const isValidStatus = user?.status === UserStatus.UNDER_ADMIN_REVIEW || user?.status === UserStatus.FORM_B_SUBMITTED;
      
      if (!user || !isValidStatus) {
        throw new Error(`User not in a valid Form B submission stage (Current: ${user?.status})`);
      }

      // Update Form B status
      await tx.formB.update({
        where: { userId: userId },
        data: { status: FormBStatus.APPROVED }
      });

      // Update User status
      await tx.user.update({
        where: { id: userId },
        data: { status: UserStatus.APPROVED_STAGE1 }
      });

      // Record Approval
      await tx.approval.updateMany({
        where: { userId: userId, stage: ApprovalStage.FORM_B, status: ApprovalStatus.PENDING },
        data: {
          status: ApprovalStatus.APPROVED,
          reviewedBy: adminId,
          remarks: remarks || 'Approved by Admin'
        }
      });

      // Generate Resume Token
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      await tx.resumeToken.upsert({
        where: { userId: userId },
        update: {
          token,
          expiresAt,
          used: false
        },
        create: {
          userId: userId,
          token,
          expiresAt,
          used: false
        }
      });

      return { user, token };
    }, { maxWait: 20000, timeout: 60000 });
  }

  /**
   * Validate Resume Token
   */
  static async validateResumeToken(token: string) {
    const record = await prisma.resumeToken.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!record) {
      console.error(`[WorkflowService] Resume token not found: ${token}`);
      return null;
    }

    // We relaxed the .used check to support multiple clicks/email scanners
    const now = new Date();
    if (record.expiresAt < now) {
      console.error(`[WorkflowService] Resume token expired: ${token}. Expires at ${record.expiresAt}, now is ${now}`);
      return null;
    }

    return record.user;
  }

  /**
   * STEP 3: Resume Flow
   */
  static async resumeFlow(token: string) {
    const user = await this.validateResumeToken(token);
    if (!user) throw new Error('Invalid or expired token');

    await prisma.$transaction(async (tx) => {
      // Mark token as used
      await tx.resumeToken.update({
        where: { token },
        data: { used: true }
      });

      // Update user status
      await tx.user.update({
        where: { id: user.id },
        data: { status: UserStatus.RESUME_PENDING }
      });
    }, { maxWait: 20000, timeout: 60000 });

    return user;
  }

  /**
   * STEP 4: Post-Approval Submission
   */
  static async submitPostApproval(userId: string, additionalDetails: any) {
    // Determine password hash outside transaction if needed
    const userForHash = await prisma.user.findUnique({ 
      where: { id: userId },
      select: { password: true, email: true }
    });
    
    // We might need to hash if it's not present
    let hashedPassword = userForHash?.password;
    // Actually, check if we need to hash something from formB
    // This is getting complex, but let's at least pre-calculate what we can.
    
    return await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.findUnique({ 
        where: { id: userId },
        include: { formB: true }
      });
      if (!user) throw new Error('User not found');

      // 1. Update Set 2 user status
      await tx.user.update({
        where: { id: userId },
        data: { status: UserStatus.POST_FORM_SUBMITTED }
      });

      // 2. Create Final Approval Record (Set 2)
      await tx.approval.create({
        data: {
          userId: userId,
          stage: ApprovalStage.FINAL,
          status: ApprovalStatus.PENDING,
          remarks: 'Post-Approval Form Submitted'
        }
      });

      // 3. INTEGRATION: Create Set 1 Records for Dashboard Visibility
      const formBDetails = user.formB?.details as any || {};
      const idenType = (MAP_IDENTIFIER_TYPE[additionalDetails.identifierType] || 'OTHER') as any;
      const idenValue = additionalDetails.identifierNumber || 'Pending';
      
      // A. Create Organisation (Set 1) if not exists
      let organisation = await tx.organisations.findUnique({
        where: {
          identifier_type_identifier_value: {
            identifier_type: idenType,
            identifier_value: idenValue,
          }
        }
      });

      if (!organisation) {
        organisation = await tx.organisations.create({
          data: {
            name: user.formB?.organisationName || 'Unknown',
            website: formBDetails.orgWebsite || '',
            sector: additionalDetails.primarySector || 'Other',
            entity_type: additionalDetails.entityType || 'Others',
            registered_address: formBDetails.registeredAddress || 'Pending',
            regulated_entity: formBDetails.isRegulated === 'Yes',
            identifier_type: idenType, 
            identifier_value: idenValue,
          }
        });
      }

      // B. Create User (Set 1) if not exists
      let dbUser = await tx.users.findUnique({
        where: { email: user.email }
      });

      if (!dbUser) {
        // If password needs hashing, it might be slow. 
        // But in resume flow, we usually already have it or it's 'RESUMED_USER'
        const finalPasswordHash = user.password || (formBDetails.password ? 'PENDING_HASH' : 'RESUMED_USER');

        dbUser = await tx.users.create({
          data: {
            organisation_id: organisation.id,
            full_name: user.name,
            designation: formBDetails.designation || 'Member',
            email: user.email,
            mobile: formBDetails.mobile || '0000000000',
            username: formBDetails.username || user.email.split('@')[0], 
            password_hash: finalPasswordHash, 
            is_active: false,
          }
        });
        
        // If it was PENDING_HASH, we'd have a problem. But formB.password is usually hashed at step 1.
      }

      // C. Create Membership Application (Set 1) if not exists
      let application = await tx.membership_applications.findFirst({
        where: { organisation_id: organisation.id, user_id: dbUser.id }
      });

      if (!application) {
        application = await tx.membership_applications.create({
          data: {
            application_type: 'NON_PRE_APPROVED',
            organisation_id: organisation.id,
            user_id: dbUser.id,
            status: 'UNDER_REVIEW',
            fee_amount: additionalDetails.totalAmount || 0,
            fee_waived: false,
          }
        });
      }

      // D. Create Application Details (Set 1) if not exists
      const existingDetails = await tx.application_details.findFirst({
        where: { application_id: application.id }
      });

      if (!existingDetails) {
        await tx.application_details.create({
          data: {
            application_id: application.id,
            sector: additionalDetails.primarySector,
            entity_type: additionalDetails.entityType,
            identifier_type: idenType,
            identifier_value: idenValue,
            iamai_certificate_url: additionalDetails.iamaiCertificateUrl,
          }
        });
      }

      return { user, application };
    }, { maxWait: 20000, timeout: 60000 });
  }

  /**
   * Final Admin Review
   */
  static async finalActivation(userId: string, adminId: string, remarks?: string) {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user || user.status !== UserStatus.POST_FORM_SUBMITTED) {
        throw new Error('User not ready for final activation');
      }

      // Record Final Approval
      await tx.approval.updateMany({
        where: { userId: userId, stage: ApprovalStage.FINAL, status: ApprovalStatus.PENDING },
        data: {
          status: ApprovalStatus.APPROVED,
          reviewedBy: adminId,
          remarks: remarks || 'Final Approval'
        }
      });

      // Activate User
      await tx.user.update({
        where: { id: userId },
        data: { status: UserStatus.ACTIVE }
      });

      return user;
    }, { maxWait: 20000, timeout: 60000 });
  }

  /**
   * Reject Application
   */
  static async rejectApplication(userId: string, adminId: string, remarks?: string) {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error('User not found');

      // Update Form B status if it exists
      await tx.formB.updateMany({
        where: { userId: userId },
        data: { status: FormBStatus.REJECTED }
      });

      // Update Approval records status to REJECTED for this user that are currently PENDING
      await tx.approval.updateMany({
        where: { userId: userId, status: ApprovalStatus.PENDING },
        data: {
          status: ApprovalStatus.REJECTED,
          reviewedBy: adminId,
          remarks: remarks || 'Rejected by Admin'
        }
      });

      return user;
    }, { maxWait: 20000, timeout: 60000 });
  }
}
