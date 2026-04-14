import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const userSession = await getUserFromToken();

    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the user and their Form B data from the database
    const user = await prisma.user.findUnique({
      where: { id: userSession.userId },
      include: {
        formB: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        status: user.status,
        formB: user.formB ? {
          organisationName: user.formB.organisationName,
          details: user.formB.details
        } : null
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
