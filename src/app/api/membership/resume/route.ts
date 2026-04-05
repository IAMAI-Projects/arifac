
import { NextResponse } from 'next/server';
import { WorkflowService } from '@/services/workflow.service';
import { setAuthCookie, createToken } from '@/lib/server-auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }

  try {
    const user = await WorkflowService.resumeFlow(token);

    // After resuming, the user is authenticated for the next steps
    const authToken = await createToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      isActive: false
    });

    await setAuthCookie(authToken);

    // Redirect to the post-approval form page
    const domain = process.env.NEXT_PUBLIC_APP_URL || '';
    return NextResponse.redirect(`${domain}/membership/register/post-approval?userId=${user.id}`);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
