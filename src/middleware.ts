import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-for-dev'
);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  const { pathname } = request.nextUrl;

  // Protect dashboard routes
  if (pathname.startsWith('/membership/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/membership/launching-soon', request.url));
    }
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL('/membership/launching-soon', request.url));
    }
  }

  // Protect API routes (except auth and public registration steps)
  const isPublicApi = pathname.endsWith('/register') || pathname.endsWith('/form-b') || pathname.includes('/resume');
  
  if (pathname.startsWith('/api/membership') && !isPublicApi) {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/membership/dashboard/:path*', '/api/membership/:path*'],
};
