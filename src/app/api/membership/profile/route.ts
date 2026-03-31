import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/server-auth';
import { z } from 'zod';

const updateProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  designation: z.string().min(2, "Designation must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 characters"),
  organisationName: z.string().min(2, "Organisation name must be at least 2 characters"),
});

export async function PATCH(request: Request) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateProfileSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: validatedData.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const { fullName, designation, email, mobile, organisationName } = validatedData.data;

    // Fetch existing user to get organisation_id
    const dbUser = await prisma.users.findUnique({
      where: { id: user.userId },
      include: { organisations: true }
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update User
    const updatedUser = await prisma.users.update({
      where: { id: user.userId },
      data: {
        full_name: fullName,
        designation: designation,
        email: email,
        mobile: mobile,
      },
    });

    // Update Organisation
    if (dbUser.organisation_id) {
      await prisma.organisations.update({
        where: { id: dbUser.organisation_id },
        data: {
          name: organisationName,
        },
      });
    }

    // Log the update
    await prisma.audit_logs.create({
      data: {
        entity_type: 'user_profile',
        entity_id: user.userId,
        action: 'PROFILE_UPDATE',
        performed_by: user.userId,
        metadata: { 
            oldDetails: { 
                fullName: dbUser.full_name, 
                email: dbUser.email, 
                organisationName: dbUser.organisations?.name 
            }, 
            newDetails: validatedData.data 
        },
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Profile updated successfully',
      user: {
        fullName: updatedUser.full_name,
        email: updatedUser.email,
        designation: updatedUser.designation,
        mobile: updatedUser.mobile,
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
