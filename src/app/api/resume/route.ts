
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
      // Use process.env.NEXT_PUBLIC_APP_URL if available, otherwise fallback to req.url (carefully)
      const protocol = req.headers.get('x-forwarded-proto') || 'https';
      const host = req.headers.get('host') || 'http://arifac-uat-alb-1423683250.ap-south-1.elb.amazonaws.com/';
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;

      const redirectUrl = new URL('/membership/register/post-approval', baseUrl);
      redirectUrl.searchParams.set('resumed', 'true');

      return NextResponse.redirect(redirectUrl);
    } catch (error: any) {
      // Token invalid, expired or already used
      console.error('Token validation failed:', error.message);

      const protocol = req.headers.get('x-forwarded-proto') || 'https';
      const host = req.headers.get('host') || 'http://arifac-uat-alb-1423683250.ap-south-1.elb.amazonaws.com/';
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;

      const errorUrl = new URL('/login', baseUrl);
      errorUrl.searchParams.set('error', error.message || 'invalid_token');
      return NextResponse.redirect(errorUrl);
    }

  } catch (error: any) {
    console.error('Resume API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
