import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Edmingle JWT SSO API Route
 * Handles user authentication/redirection to Edmingle LMS.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const edmingleRedirectUrl = searchParams.get('edmingle_redirect_url') || process.env.EDMINGLE_REDIRECT_URL || '';

    // NOTE: In a production environment, you should retrieve the user data from your session management system
    // (e.g., NextAuth.js, iron-session, or secure server-side cookies).
    // The current implementation uses placeholders as specified in the requirements.
    const user = {
      first_name: searchParams.get('first_name') || 'John',
      last_name: searchParams.get('last_name') || 'Doe',
      email: searchParams.get('email') || 'john.doe@example.com',
      contact_number: searchParams.get('contact_number') || '1234567890',
    };

    const apiToken = process.env.EDMINGLE_API_TOKEN;
    const lmsDomain = process.env.EDMINGLE_LMS_DOMAIN;

    if (!apiToken || !lmsDomain) {
      return NextResponse.json(
        { error: 'EDMINGLE_API_TOKEN or EDMINGLE_LMS_DOMAIN not configured' },
        { status: 500 }
      );
    }

    const secret = new TextEncoder().encode(apiToken);
    const alg = 'HS256';

    const jwt = await new SignJWT({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      contact_number: user.contact_number,
    })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('2m') // 120 seconds as per requirement
      .sign(secret);

    const ssoUrl = `https://${lmsDomain}/sso/jwt/login?jwt=${jwt}&edmingle_redirect_url=${encodeURIComponent(edmingleRedirectUrl)}`;

    return NextResponse.redirect(ssoUrl);
  } catch (error) {
    console.error('SSO Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
