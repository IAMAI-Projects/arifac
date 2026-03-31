
import { NextResponse } from 'next/server';
import { WorkflowService } from '@/services/workflow.service';
import { EmailService } from '@/lib/email';
import { getUserFromToken } from '@/lib/server-auth';
import { AdminApprovalValidation } from '@/lib/validations/workflow';
import { UserStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';

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
      
      // Send Email with Resume Link
      await EmailService.sendResumeEmail(updatedUser.email, updatedUser.name, token);

      return NextResponse.json({ success: true, message: 'Form B Approved. Email sent.' });
    }

    const isFinalApproval = (user.status === UserStatus.POST_FORM_SUBMITTED) && validated.status === 'APPROVED';

    if (isFinalApproval) {
      await WorkflowService.finalActivation(user.id, adminSession.userId, validated.remarks);
      return NextResponse.json({ success: true, message: 'Final Activation Successful.' });
    }

    if (validated.status === 'REJECTED') {
      // Rejection logic could be added here
      return NextResponse.json({ success: true, message: 'Request Rejected.' });
    }

    return NextResponse.json({ 
      error: 'Invalid state or action', 
      details: `User status is ${user.status}, but trying to approve Stage 1 or 2.` 
    }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
