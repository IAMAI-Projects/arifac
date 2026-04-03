import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { name, email, organisation, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Validate configuration
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('[Contact API Error] Missing SMTP configuration');
      return NextResponse.json({
        error: 'Server email configuration is missing. Please check your environment variables.'
      }, { status: 500 });
    }

    // Send contact form emails (admin notification + user acknowledgement)
    await EmailService.sendContactFormEmail({
      name,
      email,
      organisation,
      subject,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API Error]', err);
    return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 });
  }
}
