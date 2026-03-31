
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, createToken, setAuthCookie } from '@/lib/server-auth';
import { AdminLoginValidation } from '@/lib/validations/workflow';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = AdminLoginValidation.parse(body);

    const admin = await prisma.admin.findUnique({
      where: { email: validated.email },
    });

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await comparePassword(validated.password, admin.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create token
    const token = await createToken({
      userId: admin.id,
      email: admin.email,
      name: 'ARIFAC Admin',
    });

    // Set cookie
    await setAuthCookie(token);

    return NextResponse.json({ success: true, admin: { email: admin.email } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
