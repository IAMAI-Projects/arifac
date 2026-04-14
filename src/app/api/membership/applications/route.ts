import { NextResponse } from 'next/server';
import { MembershipService } from '@/services/membership.service';
import { getUserFromToken } from '@/lib/server-auth';

export async function GET() {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Support both userId and id keys just in case, and use email as fallback
    const userId = user.userId || (user as any).id;
    const email = user.email;

    console.log(`[API] Fetching applications for UserID: ${userId}, Email: ${email}`);

    const applications = await MembershipService.getApplicationsByUser(userId, email);
    
    return NextResponse.json({ 
      success: true, 
      applications,
      debug: {
        userId: user.userId,
        foundCount: applications.length
      }
    });
  } catch (error) {
    console.error('Fetch applications error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
