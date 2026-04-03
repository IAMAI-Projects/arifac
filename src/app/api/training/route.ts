import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { type, firstName, lastName, email, mobile, topics, agreement } = await req.json();

    if (!firstName || !lastName || !email || !mobile || !topics) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Validate configuration
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('[Training API Error] Missing SMTP configuration');
      return NextResponse.json({
        error: 'Server email configuration is missing. Please check your environment variables.'
      }, { status: 500 });
    }

    // Send training form emails (admin notification + user acknowledgement)
    // type can be 'volunteer' or 'topic'
    await EmailService.sendTrainingFormEmail({
      type: (type === 'volunteer' ? 'volunteer' : 'topic') as 'volunteer' | 'topic',
      firstName,
      lastName,
      email,
      mobile,
      topics,
      agreement: Boolean(agreement),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Training API Error]', err);
    return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 });
  }
}
