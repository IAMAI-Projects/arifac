import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, createToken, setAuthCookie } from '@/lib/server-auth';
import { LoginSchema } from '@/lib/validations/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Validation
    const result = LoginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.format() },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // 2. Check if user exists
    const user = await prisma.users.findUnique({
      where: { email },
      include: {
        membership_applications: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please register yourself first.' },
        { status: 404 }
      );
    }

    // 3. Compare password
    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if any application has fee waived or is IAMAI/IBA member
    const isFeeWaived = user.membership_applications.some(app => 
      app.is_iamai_member || app.is_iba_member || app.fee_waived
    );

    // 4. Generate JWT
    const token = await createToken({ 
      userId: user.id, 
      email: user.email,
      name: user.full_name,
      orgId: user.organisation_id,
      isActive: !!user.is_active || isFeeWaived
    });

    // 5. Set HTTP-only cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
      },
    });

    await setAuthCookie(token);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
