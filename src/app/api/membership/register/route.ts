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

      // Auto-login for pre-approved members
      if (result.success && result.user) {
        const token = await createToken({
          userId: result.user.id,
          email: result.user.email,
          name: result.user.name,
          orgId: result.user.orgId
        });
        await setAuthCookie(token);

        // Send membership confirmation email (admin notification + user confirmation with credentials)
        EmailService.sendMembershipConfirmationEmail({
          orgName: data.orgName,
          email: result.user.email,
          membershipId: result.applicationId,
          entityType: data.entityType,
          username: data.username,
          password: data.password,
          name: result.user.name,
          designation: data.designation,
          mobile: data.mobile,
        }).catch((err: unknown) => console.error('[Membership Email Error]', err));
      }

      return NextResponse.json(result);
    } else if (formType === 'B') {
      const result = await MembershipService.registerFormB(data);

      // Send application received email (admin notification + user acknowledgement)
      if (result.success) {
        EmailService.sendApplicationReceivedEmail({
          orgName: data.orgName,
          email: data.email,
          name: data.fullName || data.name,
          designation: data.designation,
          mobile: data.mobile,
          salutation: data.salutation,
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
          orgId: result.user.orgId
        });
        await setAuthCookie(token);

        // Send registration confirmation email (admin notification + user confirmation with credentials)
        EmailService.sendRegistrationConfirmationEmail({
          orgName: data.orgName,
          email: result.user.email,
          registrationId: result.applicationId,
          entityType: data.entityType,
          username: data.username,
          password: data.password,
          name: result.user.name,
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
