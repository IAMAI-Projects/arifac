import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const application = await prisma.membership_applications.findUnique({
      where: { id },
      include: {
        organisations: {
            select: {
                name: true,
                website: true,
            }
        },
        users: {
            select: {
                full_name: true,
                designation: true,
            }
        },
      },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Prepare public response
    const status = application.status;
    const isVerified = status === 'ACTIVE' || status === 'VERIFIED';
    const membershipId = `ARI-2024-${application.id.toString().substring(0, 8).toUpperCase()}`;

    return NextResponse.json({ 
      success: true, 
      isVerified,
      membership: {
        id: id,
        membershipId,
        memberName: application.users?.full_name,
        organisation: application.organisations?.name,
        designation: application.users?.designation,
        registeredOn: application.created_at,
        status: application.status,
      },
      verificationUrl: `${process.env.NEXT_PUBLIC_APP_URL || ''}/membership/verify/${id}`,
    });
  } catch (error) {
    console.error('Fetch verification record error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
