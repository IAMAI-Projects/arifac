import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

        // Configure transporter — uses env vars for credentials
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.office365.com',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"ARIFAC Contact Form" <${process.env.SMTP_USER}>`,
            replyTo: `"${name}" <${email}>`,
            to: 'help.arifac@iamai.in',
            subject: `[ARIFAC Contact] ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #1a1a2e; padding: 24px 32px; border-radius: 8px 8px 0 0;">
                        <h2 style="color: #ffffff; margin: 0; font-size: 20px;">New Contact Form Submission</h2>
                        <p style="color: #9ca3af; margin: 4px 0 0; font-size: 13px;">via ARIFAC website</p>
                    </div>
                    <div style="background: #f9fafb; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; width: 130px;">
                                    <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Name</span>
                                </td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-size: 14px; color: #111827;">${name}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Email</span>
                                </td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                                    <a href="mailto:${email}" style="font-size: 14px; color: #2563eb;">${email}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Organisation</span>
                                </td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-size: 14px; color: #111827;">${organisation || '—'}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Subject</span>
                                </td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-size: 14px; color: #111827; font-weight: 600;">${subject}</span>
                                </td>
                            </tr>
                        </table>
                        <div style="margin-top: 24px;">
                            <p style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin: 0 0 10px;">Message</p>
                            <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px 20px;">
                                <p style="font-size: 14px; color: #374151; margin: 0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                            </div>
                        </div>
                        <p style="font-size: 11px; color: #9ca3af; margin-top: 24px; margin-bottom: 0;">
                            This message was sent via the ARIFAC contact form at arifac.in. Reply directly to this email to respond to ${name}.
                        </p>
                    </div>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[Contact API Error]', err);
        return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 });
    }
}
