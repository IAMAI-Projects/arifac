
import { NextResponse } from 'next/server';
import { WorkflowService } from '@/services/workflow.service';
import { createToken, setAuthCookie } from '@/lib/server-auth';

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
      
      // 1. Generate JWT for the user
      const authToken = await createToken({
        userId: user.id,
        email: user.email,
        name: user.name,
        orgId: null // User model doesn't have orgId directly
      });

      // 2. Set HTTP-only cookie
      await setAuthCookie(authToken);

      // Successfully resumed
      // Redirect to Dedicated Post-Approval Form instead of General Form A
      const redirectUrl = new URL('/membership/register/post-approval', req.url);
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
