
import { NextResponse } from 'next/server';
import { WorkflowService } from '@/services/workflow.service';
import { getUserFromToken } from '@/lib/server-auth';

export async function POST(req: Request) {
  try {
    const userSession = await getUserFromToken();
    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { additionalDetails } = await req.json();
    
    const { user, application } = await WorkflowService.submitPostApproval(userSession.userId, additionalDetails);

    return NextResponse.json({ 
      success: true, 
      message: 'Post-approval form submitted. Awaiting final review.',
      user,
      application    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
