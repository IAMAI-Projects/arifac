
import { prisma } from '@/lib/prisma';
import { UserStatus, FormBStatus, ApprovalStage, ApprovalStatus } from '@prisma/client';
import crypto from 'crypto';

export class WorkflowService {
  /**
   * STEP 1: Form B Submission
   */
  static async submitFormB(data: { email: string; name: string; organisationName: string; details: any }) {
    return await prisma.$transaction(async (tx) => {
      // Create or Update User
      const user = await tx.user.upsert({
        where: { email: data.email },
        update: { 
          name: data.name,
          status: UserStatus.UNDER_ADMIN_REVIEW 
        },
        create: {
          email: data.email,
          name: data.name,
          status: UserStatus.UNDER_ADMIN_REVIEW
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

      // Create Approval Record
      await tx.approval.create({
        data: {
          userId: user.id,
          stage: ApprovalStage.FORM_B,
          status: ApprovalStatus.PENDING,
          remarks: 'Initial Form B Submission'
        }
      });

      return user;
    });
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
    });
  }

  /**
   * Validate Resume Token
   */
  static async validateResumeToken(token: string) {
    const record = await prisma.resumeToken.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!record || record.used || record.expiresAt < new Date()) {
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
    });

    return user;
  }

  /**
   * STEP 4: Post-Approval Submission
   */
  static async submitPostApproval(userId: string, additionalDetails: any) {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error('User not found');

      // Update user status
      await tx.user.update({
        where: { id: userId },
        data: { status: UserStatus.POST_FORM_SUBMITTED }
      });

      // Create Final Approval Record
      await tx.approval.create({
        data: {
          userId: userId,
          stage: ApprovalStage.FINAL,
          status: ApprovalStatus.PENDING,
          remarks: 'Post-Approval Form Submitted'
        }
      });

      return user;
    });
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
    });
  }
}
