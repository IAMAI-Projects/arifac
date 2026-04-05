import { NextResponse } from 'next/server';
import { MembershipService } from '@/services/membership.service';
import { createToken, setAuthCookie } from '@/lib/server-auth';
import { EmailService } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { formType } = data;

    if (formType === 'A') {
      const result = await MembershipService.registerFormA(data);

      const isIamai = data.industryMemberships?.includes('IAMAI');
      const isIba = data.industryMemberships?.includes('IBA');
      const skipPayment = isIamai || isIba;

      // Auto-login ONLY for pre-approved / fee-waived members
      if (result.success && result.user && skipPayment) {
        const token = await createToken({
          userId: result.user.id,
          email: result.user.email,
          name: result.user.name,
          orgId: result.user.orgId,
          isActive: true
        });
        await setAuthCookie(token);

        // Send membership emails (admin notification + user acknowledgement)
        EmailService.sendMembershipEnquiryEmail({
          name: result.user.name,
          email: result.user.email,
          organisation: data.orgName,
          designation: data.designation,
          mobile: data.mobile,
        }).catch((err: unknown) => console.error('[Membership Email Error]', err));
      }

      return NextResponse.json(result);
    } else if (formType === 'B') {
      const result = await MembershipService.registerFormB(data);

      // Send membership emails (admin notification + user acknowledgement)
      if (result.success) {
        EmailService.sendMembershipEnquiryEmail({
          name: data.fullName || data.name,
          email: data.email,
          organisation: data.orgName,
          designation: data.designation,
          mobile: data.mobile,
        }).catch((err: unknown) => console.error('[Membership Email Error - Form B]', err));
      }

      return NextResponse.json(result);
    } else if (formType === 'C') {
      const result = await MembershipService.registerFormC(data);

      // Auto-login for Form C (Free)
      if (result.success && result.user) {
        const token = await createToken({
          userId: result.user.id,
          email: result.user.email,
          name: result.user.name,
          orgId: result.user.orgId,
          isActive: true
        });
        await setAuthCookie(token);

        // Send membership emails (admin notification + user acknowledgement)
        EmailService.sendMembershipEnquiryEmail({
          name: result.user.name,
          email: result.user.email,
          organisation: data.orgName,
          designation: data.designation,
          mobile: data.mobile,
        }).catch((err: unknown) => console.error('[Membership Email Error - Form C]', err));
      }

      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid form type' }, { status: 400 });
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.name === 'ZodError' || error instanceof Error && 'issues' in error) {
      const issues = error.issues || (error as any).errors;
      return NextResponse.json(
        { error: issues?.[0]?.message || 'Validation failed' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
