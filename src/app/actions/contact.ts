'use server';

import nodemailer from 'nodemailer';
import { headers } from 'next/headers';

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (timestamps.length >= RATE_LIMIT_MAX) return false;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return true;
}

const generateEmailHTML = (title: string, greeting: string, mainText: string, contentBox: string, footerText: string = "") => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #2b2b2b; color: #ffffff; padding: 0; margin: 0; width: 100%; max-width: 650px; margin: 0 auto; border-top: 4px solid #e32029; box-sizing: border-box;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 25px 30px; border-bottom: 1px solid #444; width: 100%;">
    <tr>
      <td style="text-align: left; vertical-align: middle;">
        <div style="font-weight: 900; font-size: 22px; color: #000; text-shadow: -1px -1px 0 #4aa3df, 1px -1px 0 #4aa3df, -1px 1px 0 #4aa3df, 1px 1px 0 #4aa3df; letter-spacing: 4px; margin-bottom: 2px;">
          A R I F A C
        </div>
        <div style="font-size: 10px; color: #4aa3df; letter-spacing: 0.5px; font-weight: bold;">Building Partnerships in AML/CFT</div>
      </td>
      <td style="font-size: 12px; font-weight: 600; letter-spacing: 1.5px; color: #a0a0a0; text-align: right; text-transform: uppercase; vertical-align: middle;">
        ${title}
      </td>
    </tr>
  </table>

  <div style="padding: 40px 30px; line-height: 1.6;">
    <p style="font-size: 18px; font-weight: 700; margin-top: 0; color: #ffffff;">${greeting}</p>
    <p style="font-size: 15px; color: #d0d0d0; margin-bottom: 30px;">${mainText}</p>

    <div style="background-color: #525252; border: 1px solid #cccccc; padding: 30px; margin: 30px 0; text-align: left;">
      <p style="margin: 0; font-size: 15px; color: #ffffff; line-height: 1.8;">
        ${contentBox}
      </p>
    </div>

    ${footerText ? `<p style="font-size: 14px; color: #888888; margin-bottom: 0;">${footerText}</p>` : ''}
  </div>

  <div style="background-color: #555555; padding: 25px; text-align: center;">
    <p style="margin: 0; font-size: 12px; color: #aaaaaa; margin-bottom: 8px;">ARIFAC — Alliance of Reporting Entities in India for AML/CFT</p>
    <p style="margin: 0; font-size: 11px; color: #cccccc;">This is an automated communication from the ARIFAC portal. Kindly do not reply to this email.</p>
  </div>
</div>
`;

export async function submitContactForm(formData: FormData) {
  const name = ((formData.get('name') as string) || '').trim();
  const email = ((formData.get('email') as string) || '').trim();
  const phone = ((formData.get('phone') as string) || '').trim();
  const subject = ((formData.get('subject') as string) || '').trim();
  const message = ((formData.get('message') as string) || '').trim();

  if (!name || !email || !message) {
    return { success: false, error: 'Missing required fields' };
  }

  if (!EMAIL_RE.test(email)) {
    return { success: false, error: 'Invalid email address' };
  }

  const h = await headers();
  const ip =
    h.get('x-forwarded-for')?.split(',')[0].trim() ||
    h.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return { success: false, error: 'Too many requests. Please try again later.' };
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass) {
    console.error('SMTP credentials not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: smtpUser, pass: smtpPass },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

    const adminHtml = generateEmailHTML(
      "CONTACT PORTAL",
      "New Contact Submission,",
      "You have received a new message from the contact form on the ARIFAC website.",
      `<strong>Name:</strong> ${safeName}<br/>
       <strong>Email:</strong> ${safeEmail}<br/>
       <strong>Phone:</strong> ${safePhone || 'N/A'}<br/>
       <strong>Subject:</strong> ${safeSubject || 'N/A'}<br/><br/>
       <strong>Message:</strong><br/>
       ${safeMessage}`,
      "Please respond to the user using the email provided above."
    );

    const adminMailOptions = {
      from: { name, address: smtpUser },
      replyTo: email,
      to: 'help.arifac@iamai.in',
      subject: subject ? `Contact Form: ${subject}` : `New Contact Submission from ${name}`,
      html: adminHtml,
    };

    const userHtml = generateEmailHTML(
      "CONTACT PORTAL",
      `Hi ${safeName},`,
      "Thank you for contacting ARIFAC. We have received your message and our team will get back to you shortly. Below is a copy of the message you submitted.",
      `<strong>Your Message:</strong><br/><br/>${safeMessage}`,
      "If you did not request this, you can safely ignore this email."
    );

    const userMailOptions = {
      from: { name: 'ARIFAC Support', address: smtpUser },
      to: email,
      subject: "Thank you for contacting ARIFAC",
      html: userHtml,
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
