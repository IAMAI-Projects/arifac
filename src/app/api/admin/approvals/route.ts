
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/server-auth';

export async function GET(req: Request) {
  try {
    const adminSession = await getUserFromToken();
    if (!adminSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch pending Form B approvals
    const pendingFormB = await prisma.approval.findMany({
      where: { 
        stage: 'FORM_B', 
        status: 'PENDING' 
      },
      include: { 
        user: {
          include: { formB: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Fetch pending Final approvals
    const pendingFinal = await prisma.approval.findMany({
      where: { 
        stage: 'FINAL', 
        status: 'PENDING' 
      },
      include: { 
        user: {
          include: { formB: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Fetch approved records
    const approvedList = await prisma.approval.findMany({
      where: { 
        status: 'APPROVED' 
      },
      include: { 
        user: {
          include: { formB: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ 
      pendingFormB, 
      pendingFinal,
      approvedList
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
