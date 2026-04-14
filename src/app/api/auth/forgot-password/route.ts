import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EmailService } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // 1. Check if user exists
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      // For security reasons, don't reveal if the user exists or not
      return NextResponse.json({
        message: 'If an account exists with that email, a reset link has been sent.',
      });
    }

    // 2. Generate token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

    // 3. Store token in database (using upsert or just create)
    await prisma.password_reset_tokens.create({
      data: {
        user_id: user.id,
        token: token,
        expires_at: expiresAt,
      },
    });

    // 4. Send email
    try {
      await EmailService.sendPasswordResetEmail(user.email, user.full_name, token);
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      // We still return success to the user to avoid enumeration
    }

    return NextResponse.json({
      message: 'If an account exists with that email, a reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
