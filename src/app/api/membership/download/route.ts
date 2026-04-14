import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/server-auth';
import { jsPDF } from 'jspdf';

export async function GET() {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const application = await prisma.membership_applications.findFirst({
      where: { user_id: user.userId },
      include: {
        organisations: true,
        users: true,
      },
      orderBy: { created_at: 'desc' }
    });

    if (!application) {
      return NextResponse.json({ error: 'No membership found' }, { status: 404 });
    }

    // Create PDF
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Background border
    doc.setDrawColor(197, 160, 89); // #c5a059
    doc.setLineWidth(5);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
    doc.setLineWidth(1);
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

    // Header
    doc.setTextColor(197, 160, 89);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(25);
    doc.text('ARIFAC', pageWidth / 2, 40, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('OFFICIAL CERTIFICATE OF MEMBERSHIP', pageWidth / 2, 50, { align: 'center' });

    // Content
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(16);
    doc.text('This is to certify that', pageWidth / 2, 75, { align: 'center' });

    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(30);
    doc.text(application.users?.full_name || 'Member', pageWidth / 2, 95, { align: 'center' });

    doc.setTextColor(197, 160, 89);
    doc.setFontSize(20);
    doc.text(application.organisations?.name || 'Organisation', pageWidth / 2, 115, { align: 'center' });

    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    const text = 'Has successfully registered as an Industry Member for the year 2024-25, demonstrating excellence and commitment to the industry standards.';
    const splitText = doc.splitTextToSize(text, 200);
    doc.text(splitText, pageWidth / 2, 135, { align: 'center' });

    // Footer
    const membershipId = `ARI-2024-${application.id.toString().substring(0, 8).toUpperCase()}`;
    const dateStr = application.created_at ? new Date(application.created_at).toLocaleDateString() : new Date().toLocaleDateString();

    doc.setFontSize(10);
    doc.text(`Membership ID: ${membershipId}`, 40, 175);
    doc.text(`Date of Issue: ${dateStr}`, pageWidth - 40, 175, { align: 'right' });

    doc.setDrawColor(200, 200, 200);
    doc.line(30, 170, 80, 170);
    doc.line(pageWidth - 80, 170, pageWidth - 30, 170);

    // Official Seal Placeholder
    doc.setDrawColor(197, 160, 89);
    doc.circle(pageWidth / 2, 170, 15);
    doc.setFontSize(8);
    doc.text('OFFICIAL SEAL', pageWidth / 2, 172, { align: 'center' });

    const pdfBuffer = doc.output('arraybuffer');

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ARIFAC-Membership-${membershipId}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
