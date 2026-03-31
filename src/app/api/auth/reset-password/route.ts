import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/server-auth';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    // 1. Find the token
    const resetToken = await prisma.password_reset_tokens.findUnique({
      where: { token },
      include: { user: true },
    });

    // 2. Validate token
    if (!resetToken) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 404 }
      );
    }

    if (new Date() > resetToken.expires_at) {
      // Delete expired token
      await prisma.password_reset_tokens.delete({
        where: { id: resetToken.id },
      });
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 404 }
      );
    }

    // 3. Hash new password
    const hashedPassword = await hashPassword(password);

    // 4. Update user password
    await prisma.users.update({
      where: { id: resetToken.user_id },
      data: { password_hash: hashedPassword },
    });

    // 5. Delete used token
    await prisma.password_reset_tokens.delete({
      where: { id: resetToken.id },
    });

    return NextResponse.json({
      message: 'Password reset successful',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
