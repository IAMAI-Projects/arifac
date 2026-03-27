import { NextResponse } from 'next/server';
import { MembershipService } from '@/services/membership.service';
import { createToken, setAuthCookie } from '@/lib/server-auth';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { formType } = data;

    if (formType === 'A') {
      const result = await MembershipService.registerFormA(data);
      
      // Auto-login for pre-approved members
      if (result.success && result.user) {
        const token = await createToken({
          userId: result.user.id,
          email: result.user.email,
          name: result.user.name,
          orgId: result.user.orgId
        });
        await setAuthCookie(token);
      }
      
      return NextResponse.json(result);
    } else if (formType === 'B') {
      const result = await MembershipService.registerFormB(data);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid form type' }, { status: 400 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
