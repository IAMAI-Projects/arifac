
import { NextResponse } from 'next/server';
import { WorkflowService } from '@/services/workflow.service';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // Validate and consume the token
    try {
      const user = await WorkflowService.resumeFlow(token);
      
      // Successfully resumed
      // Redirect the user to the registration/dashboard page
      // In a real app, this should also set a session cookie or redirect to a login with the token context
      const redirectUrl = new URL('/dashboard', req.url); // Use dashboard or appropriate step
      redirectUrl.searchParams.set('resumed', 'true');
      
      return NextResponse.redirect(redirectUrl);
    } catch (error: any) {
      // Token invalid, expired or already used
      const errorUrl = new URL('/login', req.url);
      errorUrl.searchParams.set('error', error.message || 'invalid_token');
      return NextResponse.redirect(errorUrl);
    }

  } catch (error: any) {
    console.error('Resume API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
