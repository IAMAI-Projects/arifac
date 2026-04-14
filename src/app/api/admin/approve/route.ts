
import { NextResponse } from 'next/server';
import { WorkflowService } from '@/services/workflow.service';
import { EmailService } from '@/lib/email';
import { getUserFromToken } from '@/lib/server-auth';
import { AdminApprovalValidation } from '@/lib/validations/workflow';
import { UserStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getBaseUrl } from '@/utils/url';

export async function POST(req: Request) {
  try {
    const adminSession = await getUserFromToken();
    if (!adminSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = AdminApprovalValidation.parse(body);

    const user = await prisma.user.findUnique({
      where: { id: validated.userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log(`Approving user ${user.id} with status ${user.status}. Action: ${validated.status}`);

    const isFormBApproval = (user.status === UserStatus.UNDER_ADMIN_REVIEW || user.status === UserStatus.FORM_B_SUBMITTED) && validated.status === 'APPROVED';

    if (isFormBApproval) {
      const { user: updatedUser, token } = await WorkflowService.approveFormB(user.id, adminSession.userId, validated.remarks);
      
      // Get orgName from Form B
      const formB = await prisma.formB.findUnique({ where: { userId: user.id } });
      const orgName = formB?.organisationName || 'Your Organisation';

      // Send Standardized Approval Email (Action Required)
      const domain = getBaseUrl();
      const loginLink = `${domain}/api/resume?token=${token}`; // Using resume link to direct them back to onboarding
      
      await EmailService.sendRegistrationApprovedActionRequiredEmail({
        orgName,
        email: updatedUser.email,
        loginLink
      });

      return NextResponse.json({ success: true, message: 'Form B Approved. Standardized Activation email sent.' });
    }

    const isFinalApproval = (user.status === UserStatus.POST_FORM_SUBMITTED) && validated.status === 'APPROVED';

    if (isFinalApproval) {
      await WorkflowService.finalActivation(user.id, adminSession.userId, validated.remarks);
      
      // Send Membership Activated Email
      const formB = await prisma.formB.findUnique({ where: { userId: user.id } });
      const orgName = formB?.organisationName || 'Your Organisation';
      const domain = getBaseUrl();
      
      // Fetch the newly created membership record to get the ID
      const dbUserSet1 = await prisma.users.findUnique({ where: { email: user.email } });
      const membership = await prisma.memberships.findUnique({
        where: { application_id: (await prisma.membership_applications.findFirst({ where: { user_id: dbUserSet1?.id } }))?.id || '' }
      });

      await EmailService.sendMembershipActivatedEmail({
        orgName,
        email: user.email,
        membershipId: (membership as any)?.membership_id_ref || 'ARF-M-PENDING',
        loginLink: `${domain}/login`
      });

      return NextResponse.json({ success: true, message: 'Final Activation Successful. Activation email sent.' });
    }

    if (validated.status === 'REJECTED') {
      const updatedUser = await WorkflowService.rejectApplication(user.id, adminSession.userId, validated.remarks);
      
      // Send Rejection Email
      await EmailService.sendRejectionEmail(updatedUser.email, updatedUser.name, validated.remarks);

      return NextResponse.json({ success: true, message: 'Request Rejected. Email sent.' });
    }

    return NextResponse.json({ 
      error: 'Invalid state or action', 
      details: `User status is ${user.status}, but trying to approve Stage 1 or 2.` 
    }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
