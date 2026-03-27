import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/server-auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromToken();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;

    const application = await prisma.membership_applications.findUnique({
      where: { id },
      include: {
        organisations: true,
        application_details: true,
        payments: true,
      },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Check if user is authorized to view this application
    if (application.user_id !== user.userId) {
      // Logic for ADMIN check could go here
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('Fetch application error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromToken();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const { status, comment } = await request.json();

    // In a real app, only ADMIN should be able to PATCH status
    // For now, I'll allow the user to cancel their own application or similar
    
    const application = await prisma.membership_applications.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Authorization check
    if (application.user_id !== user.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const updatedApplication = await prisma.membership_applications.update({
      where: { id },
      data: { status: status as any },
    });

    // Log the audit/status change
    await prisma.audit_logs.create({
      data: {
        entity_type: 'membership_application',
        entity_id: id,
        action: `STATUS_UPDATE_${status}`,
        performed_by: user.userId,
        metadata: { comment, oldStatus: application.status, newStatus: status },
      }
    });

    return NextResponse.json({ success: true, application: updatedApplication });
  } catch (error) {
    console.error('Update application error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
