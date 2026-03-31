
import { NextResponse } from 'next/server';
import { WorkflowService } from '@/services/workflow.service';
import { FormBValidation } from '@/lib/validations/workflow';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = FormBValidation.parse(body);

    const user = await WorkflowService.submitFormB(validated);

    return NextResponse.json({ 
      success: true, 
      message: 'Form B submitted successfully. Your request is under review.',
      userId: user.id 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
