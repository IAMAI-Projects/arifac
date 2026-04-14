import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/server-auth';
import { PostApprovalFormSchema } from '@/lib/validations/membership.schema';

export async function POST(request: Request) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user.userId || (user as any).id;
    const body = await request.json();

    // Validate the submitted data
    const validatedData = PostApprovalFormSchema.parse(body);

    // 1. Find the existing application
    const existingApp = await prisma.membership_applications.findFirst({
      where: { user_id: userId },
      include: { application_details: true }
    });

    if (!existingApp) {
      return NextResponse.json({ error: 'No membership application found to upgrade' }, { status: 404 });
    }

    // 2. Perform the upgrade transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update the main application record
      const updatedApp = await tx.membership_applications.update({
        where: { id: existingApp.id },
        data: {
          status: 'UNDER_REVIEW', // Similar to Form B, wait for admin review
          is_iamai_member: validatedData.industryMemberships.includes('IAMAI'),
          is_iba_member: validatedData.industryMemberships.includes('IBA'),
          turnover_range: validatedData.turnoverOrAum,
          updated_at: new Date(),
        }
      });

      // Handle application details (Upsert)
      if (existingApp.application_details.length > 0) {
        await tx.application_details.update({
          where: { id: existingApp.application_details[0].id },
          data: {
            sector: validatedData.primarySector,
            entity_type: validatedData.entityType,
            identifier_type: validatedData.identifierType as any,
            identifier_value: validatedData.identifierNumber,
            fiu_registration_number: validatedData.registeredWithFiu === 'Yes' ? validatedData.fiuRegNumber : null,
            iba_membership_id: validatedData.ibaMembershipId || null,
            iamai_certificate_url: body.iamaiCertificateUrl || null,
            turnover_range: validatedData.turnoverOrAum,
          }
        });
      }

      // 3. Create a pending payment record if amount > 0
      if (body.totalAmount > 0) {
        await tx.payments.create({
          data: {
            application_id: existingApp.id,
            amount: body.totalAmount,
            currency: 'INR',
            status: 'INITIATED',
            provider: 'CCAVENUE',
          }
        });
      }

      // 4. Create an audit log entry for the upgrade
      await tx.audit_logs.create({
        data: {
          entity_type: 'MEMBERSHIP_APPLICATION',
          entity_id: existingApp.id,
          action: 'UPGRADE_SUBMITTED',
          performed_by: userId,
          metadata: {
            previous_status: existingApp.status,
            previous_fee_waived: existingApp.fee_waived,
            amount: body.totalAmount,
            is_iamai_iba: (validatedData.industryMemberships.includes('IAMAI') || validatedData.industryMemberships.includes('IBA')),
            submitted_data: body
          }
        }
      });

      return updatedApp;
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Upgrade application submitted successfully',
      applicationId: result.id 
    });

  } catch (error: any) {
    console.error('Membership Upgrade Error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: error.errors 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      error: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}
