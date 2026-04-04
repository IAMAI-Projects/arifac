import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

/* ─── Transporter ─── */

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.error('[EmailService] CRITICAL: SMTP_USER or SMTP_PASS is not defined.');
} else {
  console.log('[EmailService] Initialising with SMTP User:', process.env.SMTP_USER);
}

export const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.office365.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',   // false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { ciphers: 'SSLv3' },                    // required for Office 365
});

/* ─── Shared send helper with retry ─── */

async function sendEmail(mailOptions: Parameters<Transporter['sendMail']>[0], retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await transporter.sendMail(mailOptions);
      console.log(`[EmailService] Email sent to ${mailOptions.to} (attempt ${i + 1})`);
      return;
    } catch (error) {
      console.error(`[EmailService] Failed (attempt ${i + 1}):`, error);
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

/* ─── Shared template helpers ─── */

const ADMIN_INBOX = 'help.arifac@iamai.in';

const HEADER = (title: string) => `
  <div style="background:#1a1a2e;padding:24px 32px;border-radius:8px 8px 0 0;">
    <h2 style="color:#ffffff;margin:0;font-size:20px;">${title}</h2>
    <p style="color:#9ca3af;margin:4px 0 0;font-size:13px;">via ARIFAC website — auto-generated</p>
  </div>`;

const USER_HEADER = `
  <div style="background:#1a1a2e;padding:24px 32px;border-radius:8px 8px 0 0;text-align:center;">
    <h2 style="color:#ffffff;margin:0;font-size:22px;letter-spacing:.02em;">ARIFAC</h2>
    <p style="color:#9ca3af;margin:6px 0 0;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Alliance of Reporting Entities in India for AML/CFT</p>
  </div>`;

const FOOTER_NOTE = `
  <p style="font-size:11px;color:#9ca3af;margin-top:24px;margin-bottom:0;">
    This is an automated notification from the ARIFAC platform.
    Contact <a href="mailto:help.arifac@iamai.in" style="color:#9ca3af;">help.arifac@iamai.in</a> for queries.
  </p>`;

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;width:140px;vertical-align:top;">
      <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;">${label}</span>
    </td>
    <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
      <span style="font-size:14px;color:#111827;">${value}</span>
    </td>
  </tr>`;

/* ─── Email methods ─── */

export class EmailService {

  /* ══════════════════════════════════════════════════════════
     1. CONTACT US FORM
     Admin notification + User acknowledgement
  ══════════════════════════════════════════════════════════ */

  static async sendContactFormEmail(
    data: { name: string; email: string; organisation?: string; subject: string; message: string },
    retries = 3,
  ) {
    // Email 1 — Admin notification
    await sendEmail({
      from: `"ARIFAC Contact Form" <${process.env.SMTP_USER}>`,
      replyTo: `"${data.name}" <${data.email}>`,
      to: ADMIN_INBOX,
      subject: `[ARIFAC Contact] ${data.subject}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          ${HEADER('New Contact Form Submission')}
          <div style="background:#f9fafb;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
            <table style="width:100%;border-collapse:collapse;">
              ${row('Name', data.name)}
              ${row('Email', `<a href="mailto:${data.email}" style="color:#2563eb;">${data.email}</a>`)}
              ${row('Organisation', data.organisation || '—')}
              ${row('Subject', `<strong>${data.subject}</strong>`)}
            </table>
            <div style="margin-top:24px;">
              <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Message</p>
              <div style="background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:16px 20px;">
                <p style="font-size:14px;color:#374151;margin:0;line-height:1.7;white-space:pre-wrap;">${data.message}</p>
              </div>
            </div>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);

    // Email 2 — User acknowledgement
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: 'Thank you for contacting ARIFAC',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          ${USER_HEADER}
          <div style="background:#f9fafb;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
            <p style="font-size:16px;color:#111827;margin:0 0 16px;">Dear ${data.name},</p>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 16px;">
              Thank you for reaching out to ARIFAC. We have received your enquiry regarding
              <strong>"${data.subject}"</strong> and a member of our team will respond to you shortly.
            </p>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 24px;">
              In the meantime, if you have any urgent queries, please do not hesitate to contact us directly
              at <a href="mailto:help.arifac@iamai.in" style="color:#2563eb;">help.arifac@iamai.in</a>.
            </p>
            <div style="background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:20px 24px;margin-bottom:24px;">
              <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 8px;">Your Submission Summary</p>
              <table style="width:100%;border-collapse:collapse;">
                ${row('Subject', data.subject)}
                ${data.organisation ? row('Organisation', data.organisation) : ''}
              </table>
            </div>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 8px;">
              Warm regards,<br/>
              <strong>The ARIFAC Team</strong>
            </p>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  /* ══════════════════════════════════════════════════════════
     2. BECOME A TRAINER (Volunteer application + Topic request)
     Admin notification + User acknowledgement
  ══════════════════════════════════════════════════════════ */

  static async sendTrainingFormEmail(
    data: {
      type: 'volunteer' | 'topic';
      firstName: string;
      lastName: string;
      email: string;
      mobile: string;
      topics: string;
      agreement: boolean;
    },
    retries = 3,
  ) {
    const fullName = `${data.firstName} ${data.lastName}`;
    const isVolunteer = data.type === 'volunteer';
    const adminTitle = isVolunteer ? 'New Training Volunteer Application' : 'New Training Topic Request';
    const topicLabel = isVolunteer ? 'Expertise &amp; Topics' : 'Proposed Topic';

    // Email 1 — Admin notification
    await sendEmail({
      from: `"ARIFAC Website" <${process.env.SMTP_USER}>`,
      replyTo: `"${fullName}" <${data.email}>`,
      to: ADMIN_INBOX,
      subject: `[ARIFAC Training] ${adminTitle}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          ${HEADER(adminTitle)}
          <div style="background:#f9fafb;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
            <table style="width:100%;border-collapse:collapse;">
              ${row('Name', fullName)}
              ${row('Email', `<a href="mailto:${data.email}" style="color:#2563eb;">${data.email}</a>`)}
              ${row('Mobile', data.mobile)}
              ${row('Type', isVolunteer ? 'Volunteer Trainer' : 'Topic Request')}
              ${row('Confirmation', data.agreement ? 'Confirmed' : 'Not Confirmed')}
            </table>
            <div style="margin-top:24px;">
              <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">${topicLabel}</p>
              <div style="background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:16px 20px;">
                <p style="font-size:14px;color:#374151;margin:0;line-height:1.7;white-space:pre-wrap;">${data.topics}</p>
              </div>
            </div>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);

    // Email 2 — User acknowledgement
    const userSubject = isVolunteer
      ? 'Thank you for your interest in becoming an ARIFAC Trainer'
      : 'Thank you for your Training Topic Suggestion';

    const userBody = isVolunteer
      ? `We are delighted to receive your application to volunteer as a trainer with ARIFAC. Our team will review your expertise and proposed topics, and we will be in touch with you shortly to discuss next steps.`
      : `Thank you for submitting your training topic suggestion. Our curriculum team will carefully review your proposal, and we will reach out to you if we would like to take it forward.`;

    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: userSubject,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          ${USER_HEADER}
          <div style="background:#f9fafb;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
            <p style="font-size:16px;color:#111827;margin:0 0 16px;">Dear ${data.firstName},</p>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 16px;">
              ${userBody}
            </p>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 24px;">
              If you have any questions in the meantime, please contact us at
              <a href="mailto:help.arifac@iamai.in" style="color:#2563eb;">help.arifac@iamai.in</a>.
            </p>
            <div style="background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:20px 24px;margin-bottom:24px;">
              <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 8px;">Your Submission Summary</p>
              <table style="width:100%;border-collapse:collapse;">
                ${row('Name', fullName)}
                ${row('Mobile', data.mobile)}
                ${row(isVolunteer ? 'Expertise & Topics' : 'Proposed Topic', data.topics)}
              </table>
            </div>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 8px;">
              Warm regards,<br/>
              <strong>The ARIFAC Team</strong>
            </p>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  /* ══════════════════════════════════════════════════════════
     3. MEMBERSHIP CONFIRMATION (Form A — paid membership)
     Admin notification + User confirmation with credentials
  ══════════════════════════════════════════════════════════ */

  static async sendMembershipConfirmationEmail(
    data: {
      orgName: string;
      email: string;
      membershipId: string;
      entityType: string;
      username: string;
      password: string;
      name: string;
      designation?: string;
      mobile?: string;
    },
    retries = 3,
  ) {
    const activationDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

    // Email 1 — Admin notification
    await sendEmail({
      from: `"ARIFAC Membership" <${process.env.SMTP_USER}>`,
      replyTo: `"${data.name}" <${data.email}>`,
      to: ADMIN_INBOX,
      subject: `[ARIFAC Membership] New Registration — ${data.orgName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          ${HEADER('New Membership Registration — Form A')}
          <div style="background:#f9fafb;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
            <table style="width:100%;border-collapse:collapse;">
              ${row('Organisation', data.orgName)}
              ${row('Membership ID', data.membershipId)}
              ${row('Category', data.entityType)}
              ${row('Contact Person', data.name)}
              ${row('Email', `<a href="mailto:${data.email}" style="color:#2563eb;">${data.email}</a>`)}
              ${data.designation ? row('Designation', data.designation) : ''}
              ${data.mobile ? row('Mobile', data.mobile) : ''}
              ${row('Date of Activation', activationDate)}
            </table>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);

    // Email 2 — User confirmation with credentials
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Confirmation of ARIFAC Membership Registration – ${data.orgName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          ${USER_HEADER}
          <div style="background:#f9fafb;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
            <p style="font-size:15px;color:#111827;margin:0 0 20px;">Respected Sir/Madam,</p>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 20px;">
              We are pleased to inform you that <strong>${data.orgName}</strong> has been successfully registered as a member of the
              Alliance of Reporting Entities in India for AML/CFT (ARIFAC).
            </p>
            <div style="background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:20px 24px;margin-bottom:20px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('Membership ID', `<strong>${data.membershipId}</strong>`)}
                ${row('Category', data.entityType)}
                ${row('Date of Activation', activationDate)}
                ${row('Username', data.username)}
                ${row('Password', data.password)}
              </table>
            </div>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 16px;">
              As a member, you will be part of ARIFAC's initiatives focused on AML/CFT compliance, capacity building, and industry collaboration.
            </p>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 24px;">
              Further details regarding platform access, knowledge sessions, and engagement opportunities will be shared shortly.
            </p>
            <p style="font-size:14px;color:#374151;line-height:1.6;margin:0 0 0;">
              Regards,<br/>
              <strong>ARIFAC Secretariat</strong><br/>
              Internet and Mobile Association of India (IAMAI)<br/>
              <a href="mailto:help.arifac@iamai.in" style="color:#2563eb;">help.arifac@iamai.in</a>
            </p>
          </div>
        </div>`,
    }, retries);
  }

  /* ══════════════════════════════════════════════════════════
     4. REGISTRATION CONFIRMATION (Form C — free registration)
     Admin notification + User confirmation with credentials
  ══════════════════════════════════════════════════════════ */

  static async sendRegistrationConfirmationEmail(
    data: {
      orgName: string;
      email: string;
      registrationId: string;
      entityType: string;
      username: string;
      password: string;
      name: string;
      designation?: string;
      mobile?: string;
    },
    retries = 3,
  ) {
    const activationDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

    // Email 1 — Admin notification
    await sendEmail({
      from: `"ARIFAC Membership" <${process.env.SMTP_USER}>`,
      replyTo: `"${data.name}" <${data.email}>`,
      to: ADMIN_INBOX,
      subject: `[ARIFAC Registration] New Registration — ${data.orgName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          ${HEADER('New Registration — Form C')}
          <div style="background:#f9fafb;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
            <table style="width:100%;border-collapse:collapse;">
              ${row('Organisation', data.orgName)}
              ${row('Registration ID', data.registrationId)}
              ${row('Category', data.entityType)}
              ${row('Contact Person', data.name)}
              ${row('Email', `<a href="mailto:${data.email}" style="color:#2563eb;">${data.email}</a>`)}
              ${data.designation ? row('Designation', data.designation) : ''}
              ${data.mobile ? row('Mobile', data.mobile) : ''}
              ${row('Date of Registration', activationDate)}
            </table>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);

    // Email 2 — User confirmation with credentials
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Confirmation of Registration with ARIFAC – ${data.orgName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          ${USER_HEADER}
          <div style="background:#f9fafb;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
            <p style="font-size:15px;color:#111827;margin:0 0 20px;">Respected Sir/Madam,</p>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 20px;">
              We are pleased to inform you that <strong>${data.orgName}</strong> has been successfully registered with the
              Alliance of Reporting Entities in India for AML/CFT (ARIFAC).
            </p>
            <div style="background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:20px 24px;margin-bottom:20px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('Registration ID', `<strong>${data.registrationId}</strong>`)}
                ${row('Category', data.entityType)}
                ${row('Date of Registration', activationDate)}
                ${row('Username', data.username)}
                ${row('Password', data.password)}
              </table>
            </div>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 16px;">
              As a registered entity, you will be part of ARIFAC's initiatives focused on AML/CFT compliance, capacity building, and industry collaboration.
            </p>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 24px;">
              Further details regarding platform access, knowledge sessions, and engagement opportunities will be shared shortly.
            </p>
            <p style="font-size:14px;color:#374151;line-height:1.6;margin:0 0 0;">
              Regards,<br/>
              <strong>ARIFAC Secretariat</strong><br/>
              Internet and Mobile Association of India (IAMAI)<br/>
              <a href="mailto:help.arifac@iamai.in" style="color:#2563eb;">help.arifac@iamai.in</a>
            </p>
          </div>
        </div>`,
    }, retries);
  }

  /* ══════════════════════════════════════════════════════════
     5. APPLICATION RECEIVED (Form B — under-review)
     Admin notification + User acknowledgement
  ══════════════════════════════════════════════════════════ */

  static async sendApplicationReceivedEmail(
    data: {
      orgName: string;
      email: string;
      name: string;
      designation?: string;
      mobile?: string;
      salutation?: string;
    },
    retries = 3,
  ) {
    const displayName = data.salutation ? `${data.salutation} ${data.name}` : data.name;

    // Email 1 — Admin notification
    await sendEmail({
      from: `"ARIFAC Membership" <${process.env.SMTP_USER}>`,
      replyTo: `"${displayName}" <${data.email}>`,
      to: ADMIN_INBOX,
      subject: `[ARIFAC Form B] New Organisation Application — ${data.orgName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          ${HEADER('New Form B — Organisation Membership Application')}
          <div style="background:#f9fafb;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
            <table style="width:100%;border-collapse:collapse;">
              ${row('Name', displayName)}
              ${row('Email', `<a href="mailto:${data.email}" style="color:#2563eb;">${data.email}</a>`)}
              ${row('Organisation', data.orgName)}
              ${data.designation ? row('Designation', data.designation) : ''}
              ${data.mobile ? row('Mobile', data.mobile) : ''}
            </table>
            <p style="font-size:13px;color:#6b7280;margin-top:20px;">
              This application requires admin review before activation. Please log in to the admin panel to review and approve.
            </p>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);

    // Email 2 — User acknowledgement
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `ARIFAC Membership Application Received – ${data.orgName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          ${USER_HEADER}
          <div style="background:#f9fafb;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
            <p style="font-size:15px;color:#111827;margin:0 0 20px;">Respected Sir/Madam,</p>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 16px;">
              This is to acknowledge that we have received the membership application for
              <strong>${data.orgName}</strong> for onboarding to ARIFAC.
            </p>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 16px;">
              Our team is currently reviewing the submitted details. The ARIFAC Helpdesk will reach out to you
              with the next steps, if any additional information is required.
            </p>
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 24px;">
              We appreciate your interest in joining ARIFAC.
            </p>
            <p style="font-size:14px;color:#374151;line-height:1.6;margin:0 0 0;">
              Regards,<br/>
              <strong>ARIFAC Secretariat</strong><br/>
              Internet and Mobile Association of India (IAMAI)<br/>
              <a href="mailto:help.arifac@iamai.in" style="color:#2563eb;">help.arifac@iamai.in</a>
            </p>
          </div>
        </div>`,
    }, retries);
  }

  /* ══════════════════════════════════════════════════════════
     SYSTEM EMAILS (resume link, password reset, admin notify)
  ══════════════════════════════════════════════════════════ */

  /* Resume / approval email */
  static async sendResumeEmail(email: string, name: string, token: string, retries = 3) {
    const domain = process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://arifac.in');
    const resumeLink = `${domain}/api/resume?token=${token}`;

    await sendEmail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || ADMIN_INBOX,
      to: email,
      subject: 'Your Form Approval – Resume Flow | ARIFAC',
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:auto;border:1px solid #eee;border-radius:10px;">
          <h2 style="color:#333;">Hello, ${name}!</h2>
          <p>Your <strong>Form</strong> submission has been approved by the ARIFAC Secretariat.</p>
          <p>Click below to resume your registration. This link is valid for <strong>24 hours</strong>.</p>
          <div style="margin:30px 0;text-align:center;">
            <a href="${resumeLink}" style="background:#4F46E5;color:#fff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">
              Resume Registration
            </a>
          </div>
          <p style="color:#666;font-size:14px;">Or copy this link: <a href="${resumeLink}" style="color:#4F46E5;">${resumeLink}</a></p>
          <hr style="border:0;border-top:1px solid #eee;margin:30px 0;" />
          ${FOOTER_NOTE}
        </div>`,
    }, retries);
  }

  /* Password reset email */
  static async sendPasswordResetEmail(email: string, name: string, token: string, retries = 3) {
    const domain = process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://arifac.in');
    const resetLink = `${domain}/membership/reset-password/${token}`;

    await sendEmail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || ADMIN_INBOX,
      to: email,
      subject: 'Password Reset Request – ARIFAC',
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:auto;border:1px solid #eee;border-radius:10px;">
          <h2 style="color:#333;">Hello, ${name}!</h2>
          <p>We received a request to reset your ARIFAC membership password.</p>
          <p>Click below to set a new password. This link is valid for <strong>1 hour</strong>.</p>
          <div style="margin:30px 0;text-align:center;">
            <a href="${resetLink}" style="background:#1d1d1f;color:#fff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">
              Reset My Password
            </a>
          </div>
          <p style="color:#666;font-size:14px;">Or copy: <a href="${resetLink}" style="color:#1d1d1f;">${resetLink}</a></p>
          <p style="color:#666;font-size:14px;">If you didn't request this, you can safely ignore this email.</p>
          <hr style="border:0;border-top:1px solid #eee;margin:30px 0;" />
          ${FOOTER_NOTE}
        </div>`,
    }, retries);
  }

  /* Admin notification for new Form B */
  static async sendAdminNotificationEmail(adminEmail: string, userDetails: Record<string, any>, retries = 3) {
    const loginLink = process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/admin/login`
      : 'http://localhost:3000/admin/login';

    await sendEmail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || ADMIN_INBOX,
      to: adminEmail,
      subject: 'New Form-B Application for Review – ARIFAC',
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:auto;border:1px solid #eee;border-radius:10px;">
          <h2 style="color:#333;">New Form-B Submission</h2>
          <p>A new application has been submitted for review:</p>
          <table style="width:100%;border-collapse:collapse;margin:20px 0;">
            ${row('Full Name', `${userDetails.salutation || ''} ${userDetails.fullName || userDetails.name}`)}
            ${row('Organisation', userDetails.orgName || userDetails.organisationName)}
            ${row('Designation', userDetails.designation || 'N/A')}
            ${row('Email', userDetails.email)}
            ${row('Mobile', `${userDetails.countryCode || ''} ${userDetails.mobile || 'N/A'}`)}
            ${row('Regulated Entity', userDetails.isRegulated || 'N/A')}
          </table>
          <div style="margin:30px 0;text-align:center;">
            <a href="${loginLink}" style="background:#0066cc;color:#fff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">
              Login to Admin Panel
            </a>
          </div>
          <hr style="border:0;border-top:1px solid #eee;margin:30px 0;" />
          ${FOOTER_NOTE}
        </div>`,
    }, retries);
  }
}
