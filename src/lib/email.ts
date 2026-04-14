import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { getBaseUrl } from '@/utils/url';

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
  <div style="background:#ef4444;padding:24px 32px;border-radius:8px 8px 0 0;">
    <h2 style="color:#ffffff;margin:0;font-size:20px;">${title}</h2>
    <p style="color:#ffffff;opacity:0.8;margin:4px 0 0;font-size:13px;">via ARIFAC website — auto-generated</p>
  </div>`;

const USER_HEADER = `
  <div style="background:#ef4444;padding:32px;border-radius:8px 8px 0 0;text-align:center;">
    <h2 style="color:#ffffff;margin:0;font-size:28px;letter-spacing:.05em;font-weight:800;">ARIFAC</h2>
    <p style="color:#ffffff;opacity:0.9;margin:8px 0 0;font-size:12px;text-transform:uppercase;letter-spacing:.1em;font-weight:600;">Alliance of Reporting Entities in India for AML/CFT</p>
  </div>`;

const FOOTER_NOTE = `
  <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e7eb;">
    <p style="font-size:12px;color:#6b7280;margin:0 0 4px;font-weight:600;">Regards,</p>
    <p style="font-size:13px;color:#111827;margin:0;font-weight:700;">ARIFAC Secretariat</p>
    <p style="font-size:12px;color:#374151;margin:2px 0;">Internet and Mobile Association of India (IAMAI)</p>
    <p style="font-size:12px;color:#2563eb;margin:4px 0 0;">
      <a href="mailto:help.arifac@iamai.in" style="color:#2563eb;text-decoration:none;">help.arifac@iamai.in</a>
    </p>
  </div>`;

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
    data: { name: string; email: string; organisation?: string; subject: string; message: string; ticketId?: string },
    retries = 3,
  ) {
    const ticketId = data.ticketId || Math.floor(1000 + Math.random() * 9000).toString();

    // Email 1 — Admin notification
    await sendEmail({
      from: `"ARIFAC Contact Form" <${process.env.SMTP_USER}>`,
      replyTo: `"${data.name}" <${data.email}>`,
      to: ADMIN_INBOX,
      subject: `[ARIFAC Contact] ${data.subject} — Ticket ${ticketId}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${HEADER('New Contact Form Submission')}
          <div style="background:#ffffff;padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              ${row('Ticket ID', `<strong>${ticketId}</strong>`)}
              ${row('Name', data.name)}
              ${row('Email', `<a href="mailto:${data.email}" style="color:#2563eb;">${data.email}</a>`)}
              ${row('Organisation', data.organisation || '—')}
              ${row('Subject', `<strong>${data.subject}</strong>`)}
            </table>
            <div style="margin-top:24px;">
              <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Message</p>
              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px 20px;">
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
      subject: `ARIFAC Support Request Received – Ticket ID ${ticketId}`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              Your query has been received by the ARIFAC Helpdesk.
            </p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('Ticket ID', `<strong>${ticketId}</strong>`)}
              </table>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 32px;">
              Our team will review and respond shortly.
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
      username?: string;
      password?: string;
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
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${HEADER('New Membership Registration — Form A')}
          <div style="background:#ffffff;padding:32px;">
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

    // Email 2 — User confirmation
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Confirmation of ARIFAC Membership Registration – ${data.orgName}`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              We are pleased to inform you that <strong>${data.orgName}</strong> has been successfully registered as a member of the
              Alliance of Reporting Entities in India for AML/CFT (ARIFAC).
            </p>
            
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 16px;">Membership Details</p>
              <table style="width:100%;border-collapse:collapse;">
                ${row('Membership ID', `<strong>${data.membershipId}</strong>`)}
                ${row('Category', data.entityType)}
                ${row('Date of Activation', activationDate)}
                ${data.username ? row('Username', data.username) : ''}
                ${data.password ? row('Password', data.password) : ''}
              </table>
            </div>

            <p style="font-size:15px;color:#374151;margin:0 0 16px;">
              As a member, you will be part of ARIFAC's initiatives focused on AML/CFT compliance, capacity building, and industry collaboration.
            </p>
            <p style="font-size:15px;color:#374151;margin:0 0 32px;">
              Further details regarding platform access, knowledge sessions, and engagement opportunities will be shared shortly.
            </p>
            
            ${FOOTER_NOTE}
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
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${HEADER('New Registration — Form C')}
          <div style="background:#ffffff;padding:32px;">
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

    // Email 2 — User confirmation
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Confirmation of Registration with ARIFAC – ${data.orgName}`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              We are pleased to inform you that <strong>${data.orgName}</strong> has been successfully registered with the
              Alliance of Reporting Entities in India for AML/CFT (ARIFAC).
            </p>
            
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 16px;">Registration Details</p>
              <table style="width:100%;border-collapse:collapse;">
                ${row('Registration ID', `<strong>${data.registrationId}</strong>`)}
                ${row('Category', data.entityType)}
                ${row('Date of Registration', activationDate)}
                ${row('Username', data.username)}
                ${row('Password', data.password)}
              </table>
            </div>

            <p style="font-size:15px;color:#374151;margin:0 0 16px;">
              As a registered entity, you will be part of ARIFAC's initiatives focused on AML/CFT compliance, capacity building, and industry collaboration.
            </p>
            <p style="font-size:15px;color:#374151;margin:0 0 32px;">
              Further details regarding platform access, knowledge sessions, and engagement opportunities will be shared shortly.
            </p>
            
            ${FOOTER_NOTE}
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
      username?: string;
      password?: string;
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
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${HEADER('New Form B — Membership Application')}
          <div style="background:#ffffff;padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              ${row('Name', displayName)}
              ${row('Email', `<a href="mailto:${data.email}" style="color:#2563eb;">${data.email}</a>`)}
              ${row('Organisation', data.orgName)}
              ${data.designation ? row('Designation', data.designation) : ''}
              ${data.mobile ? row('Mobile', data.mobile) : ''}
            </table>
            <p style="font-size:13px;color:#6b7280;margin:20px 0 0;">
              This application requires admin review before activation.
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
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              This is to acknowledge that we have received the membership application for
              <strong>${data.orgName}</strong> for onboarding to ARIFAC.
            </p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              Our team is currently reviewing the submitted details. The ARIFAC Helpdesk will reach out to you
              with the next steps, if any additional information is required.
            </p>
            <p style="font-size:15px;color:#374151;margin:0 0 32px;">
              We appreciate your interest in joining ARIFAC.
            </p>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  /* ══════════════════════════════════════════════════════════
     6. REGISTRATION APPROVED (Action Required)
     Form B approval -> prompt for payment/onboarding
  ══════════════════════════════════════════════════════════ */

  static async sendRegistrationApprovedActionRequiredEmail(
    data: {
      orgName: string;
      email: string;
      loginLink: string;
    },
    retries = 3,
  ) {
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `ARIFAC Membership Approved – Action Required to Complete Registration`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              We are pleased to inform you that the membership application of <strong>${data.orgName}</strong> has been approved.
            </p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              You are requested to complete the final onboarding process by logging into the ARIFAC portal:
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${data.loginLink}" style="background:#ef4444;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block;">
                Login to Portal
              </a>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 16px;">
              Kindly complete the required steps including profile confirmation, documentation (if applicable), and payment formalities.
            </p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              Your Membership ID will be activated upon completion of the onboarding process.
            </p>
            <p style="font-size:15px;color:#374151;margin:0 0 32px;">
              For any assistance, please reach out to the ARIFAC Helpdesk.
            </p>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  /* ══════════════════════════════════════════════════════════
     7. MEMBERSHIP ACTIVATED (Post Payment / Final Approval)
  ══════════════════════════════════════════════════════════ */

  static async sendMembershipActivatedEmail(
    data: {
      orgName: string;
      email: string;
      membershipId: string;
      loginLink: string;
    },
    retries = 3,
  ) {
    const activationDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `ARIFAC Membership Activated – ${data.orgName}`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              We are pleased to inform you that the membership of <strong>${data.orgName}</strong> has been successfully activated under ARIFAC.
            </p>
            
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('Membership ID', `<strong>${data.membershipId}</strong>`)}
                ${row('Activation Date', activationDate)}
              </table>
            </div>

            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              You may now access the ARIFAC platform for participation in industry initiatives, knowledge sessions, and compliance programs.
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${data.loginLink}" style="background:#ef4444;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block;">
                Login Link
              </a>
            </div>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  /* ══════════════════════════════════════════════════════════
     8. REMINDERS & MISC
  ══════════════════════════════════════════════════════════ */

  static async sendMembershipExpiryReminderEmail(
    data: {
      orgName: string;
      email: string;
      membershipId: string;
      expiryDate: string;
      renewalLink: string;
    },
    retries = 3,
  ) {
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Reminder: ARIFAC Membership Expiry on ${data.expiryDate}`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              This is a reminder that the ARIFAC membership of <strong>${data.orgName}</strong> is due for expiry on <strong>${data.expiryDate}</strong>.
            </p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('Membership ID', `<strong>${data.membershipId}</strong>`)}
              </table>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              To continue your participation in ARIFAC initiatives and maintain active status, you are requested to renew your membership by logging into the portal:
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${data.renewalLink}" style="background:#ef4444;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block;">
                Renewal Link
              </a>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 32px;">
              We recommend completing the renewal prior to the expiry date to avoid any interruption in access.
            </p>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  static async sendPaymentPendingReminderEmail(
    data: {
      orgName: string;
      email: string;
      id: string; // Application Reference / Membership ID
      paymentLink: string;
    },
    retries = 3,
  ) {
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Pending Action: ARIFAC Membership Payment – ${data.orgName}`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              This is a reminder that your ARIFAC membership application for <strong>${data.orgName}</strong> is pending due to incomplete payment.
            </p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('Reference / ID', `<strong>${data.id}</strong>`)}
              </table>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              You are requested to complete the payment to activate your membership.
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${data.paymentLink}" style="background:#ef4444;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block;">
                Payment Link
              </a>
            </div>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  static async sendMembershipRenewalEmail(
    data: {
      orgName: string;
      email: string;
      membershipId: string;
      newValidity: string;
    },
    retries = 3,
  ) {
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `ARIFAC Membership Renewed Successfully – ${data.orgName}`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              We are pleased to confirm that the ARIFAC membership of <strong>${data.orgName}</strong> has been successfully renewed.
            </p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('Membership ID', `<strong>${data.membershipId}</strong>`)}
                ${row('New Validity', data.newValidity)}
              </table>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 32px;">
              Thank you for your continued participation in ARIFAC initiatives.
            </p>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  static async sendAccountSuspensionEmail(
    data: {
      name: string; // Entity or Username
      email: string;
    },
    retries = 3,
  ) {
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `ARIFAC Membership Status – Action Required`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              This is to inform you that the ARIFAC membership / LMS access associated with <strong>${data.name}</strong> is currently under review due to pending compliance / administrative requirements.
            </p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              You are requested to complete the required actions to restore full access.
            </p>
            <p style="font-size:15px;color:#374151;margin:0 0 32px;">
              For assistance, please contact the ARIFAC Helpdesk.
            </p>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  /* ══════════════════════════════════════════════════════════
     9. LMS (LEARNING MANAGEMENT SYSTEM) SUITE
  ══════════════════════════════════════════════════════════ */

  static async sendLMSRegistrationEmail(
    data: {
      studentName: string;
      email: string;
      rollNumber: string;
      program: string;
      coreModule: string;
      addOnModules?: string;
      loginLink: string;
    },
    retries = 3,
  ) {
    await sendEmail({
      from: `"ARIFAC LMS" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `ARIFAC LMS Registration Confirmation – ${data.studentName}`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              We are pleased to confirm your registration on the ARIFAC Learning Management System (LMS).
            </p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('Name', data.studentName)}
                ${row('LMS Roll Number', `<strong>${data.rollNumber}</strong>`)}
                ${row('Program', data.program)}
                ${row('Core Module', data.coreModule)}
                ${data.addOnModules ? row('Add-on Modules', data.addOnModules) : ''}
              </table>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              You may now log in to the LMS platform to begin your coursework:
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${data.loginLink}" style="background:#ef4444;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block;">
                LMS Login Link
              </a>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 32px;">
              Please ensure timely completion of modules as per program guidelines.
            </p>
            ${FOOTER_NOTE.replace('ARIFAC Secretariat', 'ARIFAC LMS Team')}
          </div>
        </div>`,
    }, retries);
  }

  static async sendLMSCompletionEligibleEmail(
    data: {
      email: string;
      rollNumber: string;
      program: string;
      examLink: string;
    },
    retries = 3,
  ) {
    await sendEmail({
      from: `"ARIFAC LMS" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Eligible for Examination – ARIFAC Certification Program`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              This is to inform you that you have successfully completed the mandatory study requirements for the ARIFAC certification program.
            </p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('LMS Roll Number', `<strong>${data.rollNumber}</strong>`)}
                ${row('Program', data.program)}
              </table>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              You are now eligible to proceed with the certification examination.
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${data.examLink}" style="background:#ef4444;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block;">
                Exam Access Link
              </a>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 32px;">
              Kindly schedule and complete your examination within the stipulated timeline.
            </p>
            ${FOOTER_NOTE.replace('ARIFAC Secretariat', 'ARIFAC LMS Team')}
          </div>
        </div>`,
    }, retries);
  }

  static async sendLMSExamSuccessEmail(
    data: {
      studentName: string;
      email: string;
      rollNumber: string;
      program: string;
    },
    retries = 3,
  ) {
    await sendEmail({
      from: `"ARIFAC Certification" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Congratulations – ARIFAC Certification Successfully Completed`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              We are pleased to inform you that you have successfully completed the ARIFAC certification examination.
            </p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('Name', data.studentName)}
                ${row('LMS Roll Number', `<strong>${data.rollNumber}</strong>`)}
                ${row('Program', data.program)}
              </table>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              Your certificate will be issued and would be available on LMS dashboard for download.
            </p>
            <p style="font-size:15px;color:#374151;margin:0 0 32px;">
              Congratulations on this achievement.
            </p>
            ${FOOTER_NOTE.replace('ARIFAC Secretariat', 'ARIFAC Certification Team')}
          </div>
        </div>`,
    }, retries);
  }

  static async sendLMSReattemptEmail(
    data: {
      email: string;
      rollNumber: string;
      program: string;
      examLink: string;
    },
    retries = 3,
  ) {
    await sendEmail({
      from: `"ARIFAC LMS" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `ARIFAC Examination Attempt – Next Steps`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              This is to inform you that you have not cleared the ARIFAC certification examination in the recent attempt.
            </p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('LMS Roll Number', `<strong>${data.rollNumber}</strong>`)}
                ${row('Program', data.program)}
              </table>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              You may proceed with the next attempt with in next 30 days by accessing the examination portal:
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${data.examLink}" style="background:#ef4444;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block;">
                Exam Link
              </a>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 16px;">
              Kindly review the course material before reattempting the examination.
            </p>
            <p style="font-size:15px;color:#374151;margin:0 0 32px;">
              For any assistance, please reach out to the ARIFAC Helpdesk.
            </p>
            ${FOOTER_NOTE.replace('ARIFAC Secretariat', 'ARIFAC LMS Team')}
          </div>
        </div>`,
    }, retries);
  }

  static async sendLMSCredentialsEmail(
    data: {
      studentName: string;
      email: string;
      rollNumber: string;
      setupLink: string;
    },
    retries = 3,
  ) {
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `ARIFAC LMS Access Details – ${data.studentName}`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              Your access to the ARIFAC LMS platform has been created.
            </p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('Name', data.studentName)}
                ${row('LMS Roll Number', `<strong>${data.rollNumber}</strong>`)}
              </table>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              You may set your password and access the platform using the link below:
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${data.setupLink}" style="background:#ef4444;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block;">
                Set Password / Login Link
              </a>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 32px;">
              Please ensure you update your credentials upon first login.
            </p>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  static async sendLMSEnrollmentEmail(
    data: {
      email: string;
      program: string;
      courseCode: string;
      rollNumber: string;
      accessLink: string;
    },
    retries = 3,
  ) {
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Course Enrollment Confirmed – ${data.program}`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              You have been successfully enrolled in the following ARIFAC program:
            </p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('Program', data.program)}
                ${row('Course Code', data.courseCode)}
                ${row('LMS Roll Number', `<strong>${data.rollNumber}</strong>`)}
              </table>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              You may begin your coursework through the LMS platform.
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${data.accessLink}" style="background:#ef4444;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block;">
                Access Course
              </a>
            </div>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  static async sendLMSInactivityReminderEmail(
    data: {
      email: string;
      rollNumber: string;
      program: string;
      link: string;
    },
    retries = 3,
  ) {
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Reminder: Pending Coursework on ARIFAC LMS`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              Our records indicate that your coursework on the ARIFAC LMS platform is currently incomplete.
            </p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('LMS Roll Number', `<strong>${data.rollNumber}</strong>`)}
                ${row('Program', data.program)}
              </table>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              You are requested to resume and complete your modules to remain eligible for certification.
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${data.link}" style="background:#ef4444;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block;">
                Continue Learning
              </a>
            </div>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  static async sendLMSExamScheduledEmail(
    data: {
      email: string;
      rollNumber: string;
      dateTime: string;
    },
    retries = 3,
  ) {
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `ARIFAC Examination Scheduled – ${data.dateTime.split(' ')[0]}`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              Your ARIFAC certification examination has been successfully scheduled.
            </p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('LMS Roll Number', `<strong>${data.rollNumber}</strong>`)}
                ${row('Exam Date & Time', data.dateTime)}
              </table>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 32px;">
              Please ensure you are prepared and available as per the scheduled slot.
            </p>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  static async sendLMSCertificateIssuedEmail(
    data: {
      studentName: string;
      email: string;
      program: string;
      rollNumber: string;
      downloadLink: string;
    },
    retries = 3,
  ) {
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `ARIFAC Certification Issued – Download Certificate`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              Your ARIFAC certification has been successfully issued.
            </p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('Name', data.studentName)}
                ${row('Program', data.program)}
                ${row('LMS Roll Number', `<strong>${data.rollNumber}</strong>`)}
              </table>
            </div>
            <div style="text-align:center;margin:32px 0;">
              <a href="${data.downloadLink}" style="background:#ef4444;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block;">
                Download Certificate
              </a>
            </div>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  static async sendLMSCertificateExpiryReminderEmail(
    data: {
      email: string;
      rollNumber: string;
      program: string;
      expiryDate: string;
      recertificationLink: string;
    },
    retries = 3,
  ) {
    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Reminder: ARIFAC Certification Expiry – Action Required`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;line-height:1.6;">
            <p style="font-size:16px;color:#111827;margin:0 0 24px;font-weight:600;">Respected Sir/Madam,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              This is to inform you that your ARIFAC certification is due for expiry on <strong>${data.expiryDate}</strong>.
            </p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row('LMS Roll Number', `<strong>${data.rollNumber}</strong>`)}
                ${row('Program', data.program)}
              </table>
            </div>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              You are requested to complete the recertification process to maintain validity.
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${data.recertificationLink}" style="background:#ef4444;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block;">
                Recertification Link
              </a>
            </div>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  /* ══════════════════════════════════════════════════════════
     SYSTEM EMAILS (resume link, password reset, admin notify)
  ══════════════════════════════════════════════════════════ */

  /* Resume / approval email */
  static async sendResumeEmail(email: string, name: string, token: string, retries = 3) {
    const domain = getBaseUrl();
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

  /* Rejection email */
  static async sendRejectionEmail(email: string, name: string, remarks?: string, retries = 3) {
    await sendEmail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || ADMIN_INBOX,
      to: email,
      subject: 'Application Status Update | ARIFAC',
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:auto;border:1px solid #eee;border-radius:10px;">
          ${USER_HEADER}
          <h2 style="color:#333;margin-top:24px;">Hello, ${name}!</h2>
          <p>Thank you for your interest in ARIFAC membership. After reviewing your application, we regret to inform you that your registration could not be approved at this time.</p>
          ${remarks ? `
          <div style="background:#fef2f2;border:1px solid #fee2e2;border-radius:6px;padding:16px 20px;margin:20px 0;">
            <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#991b1b;margin:0 0 8px;">Reviewer Remarks</p>
            <p style="font-size:14px;color:#b91c1b;margin:0;line-height:1.6;">${remarks}</p>
          </div>
          ` : ''}
          <p>If you have any questions or would like to provide additional information, please feel free to reach out to us at <a href="mailto:help.arifac@iamai.in" style="color:#2563eb;">help.arifac@iamai.in</a>.</p>
          <hr style="border:0;border-top:1px solid #eee;margin:30px 0;" />
          ${FOOTER_NOTE}
        </div>`,
    }, retries);
  }

  /* Password reset email */
  static async sendPasswordResetEmail(email: string, name: string, token: string, retries = 3) {
    const domain = getBaseUrl();
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
    const loginLink = `${getBaseUrl()}/admin/login`;

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

  /* OTP email */
  static async sendOTPEmail(email: string, otp: string, expiresAt: Date, retries = 3) {
    const expiresMinutes = Math.ceil((expiresAt.getTime() - Date.now()) / 60000);

    await sendEmail({
      from: `"ARIFAC Verification" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your OTP for ARIFAC Verification',
      html: `
        <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;max-width:500px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          ${USER_HEADER}
          <div style="background:#ffffff;padding:40px;text-align:center;">
            <p style="font-size:15px;color:#4b5563;margin-bottom:12px;">Your verification code is</p>
            <div style="background:#f9fafb;border:1px dashed #ef4444;border-radius:12px;padding:20px;margin:24px 0;">
              <h1 style="font-size:42px;color:#111827;letter-spacing:12px;margin:0;font-family:monospace;font-weight:800;">${otp}</h1>
            </div>
            <p style="font-size:13px;color:#6b7280;margin-top:16px;">
              This code will expire in <strong>${expiresMinutes} minutes</strong>.
            </p>
            <p style="font-size:14px;color:#4b5563;line-height:1.6;margin-top:32px;">
              If you did not request this code, please ignore this email or contact support if you have concerns.
            </p>
            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }

  /* ══════════════════════════════════════════════════════════
     5. PAYMENT SUCCESS — INVOICE DETAILS
     User notification with itemized breakdown
  ══════════════════════════════════════════════════════════ */

  static async sendPaymentSuccessEmail(
    data: {
      email: string;
      fullName: string;
      organisationName: string;
      amount: number;
      orderId: string;
      trackingId?: string;
      paymentDate: Date;
      serviceName?: string;
      address?: string;
    },
    retries = 3,
  ) {
    const totalAmount = data.amount;
    // Total = Base * 1.18 => Base = Total / 1.18
    const baseAmount = totalAmount / 1.18;
    const gstAmount = totalAmount - baseAmount;
    const serviceName = data.serviceName || 'ARIFAC Annual Membership Fee';

    const formatDate = (date: Date) => {
      // Manual formatting to ensure consistent professional look
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    };

    await sendEmail({
      from: `"ARIFAC" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Payment Confirmation & Invoice — Order: ${data.orderId}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
          ${USER_HEADER}
          
          <div style="padding:40px;">
            <div style="text-align:center;margin-bottom:40px;">
              <div style="display:inline-block;padding:6px 16px;background:#ecfdf5;color:#059669;border-radius:99px;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:.05em;margin-bottom:16px;">
                Transaction Success
              </div>
              <h1 style="font-size:28px;color:#111827;margin:0 0 8px;font-weight:800;">Payment Received</h1>
              <p style="color:#6b7280;font-size:15px;margin:0;">Thank you for your membership payment. Your receipt is confirmed.</p>
            </div>

            <div style="border:1px solid #f3f4f6;border-radius:16px;padding:32px;margin-bottom:40px;background:#f9fafb;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding-bottom:24px;width:60%;vertical-align:top;">
                    <p style="font-size:11px;font-weight:bold;color:#9ca3af;text-transform:uppercase;letter-spacing:.1em;margin:0 0 6px;">Bill To</p>
                    <p style="font-size:15px;font-weight:bold;color:#111827;margin:0;">${data.fullName}</p>
                    <p style="font-size:14px;color:#4b5563;margin:4px 0;">${data.organisationName}</p>
                    ${data.address ? `<p style="font-size:12px;color:#6b7280;margin:8px 0 0;line-height:1.5;">${data.address}</p>` : ''}
                  </td>
                  <td style="padding-bottom:24px;width:40%;text-align:right;vertical-align:top;">
                    <p style="font-size:11px;font-weight:bold;color:#9ca3af;text-transform:uppercase;letter-spacing:.1em;margin:0 0 6px;">Date</p>
                    <p style="font-size:15px;color:#111827;margin:0;font-weight:bold;">${formatDate(data.paymentDate)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:16px;border-top:1px solid #e5e7eb;">
                    <p style="font-size:11px;font-weight:bold;color:#9ca3af;text-transform:uppercase;letter-spacing:.1em;margin:0 0 6px;">Transaction ID</p>
                    <p style="font-size:13px;color:#111827;margin:0;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">${data.trackingId || 'N/A'}</p>
                  </td>
                  <td style="padding-top:16px;border-top:1px solid #e5e7eb;text-align:right;">
                    <p style="font-size:11px;font-weight:bold;color:#9ca3af;text-transform:uppercase;letter-spacing:.1em;margin:0 0 6px;">Order ID</p>
                    <p style="font-size:13px;color:#111827;margin:0;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">${data.orderId}</p>
                  </td>
                </tr>
              </table>
            </div>

            <table style="width:100%;border-collapse:collapse;margin-bottom:40px;">
              <thead>
                <tr>
                  <th style="text-align:left;padding:16px 0;border-bottom:2px solid #111827;font-size:12px;color:#111827;text-transform:uppercase;letter-spacing:.1em;">Description</th>
                  <th style="text-align:right;padding:16px 0;border-bottom:2px solid #111827;font-size:12px;color:#111827;text-transform:uppercase;letter-spacing:.1em;">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding:24px 0;border-bottom:1px solid #f3f4f6;">
                    <p style="font-size:15px;font-weight:bold;color:#111827;margin:0;">${serviceName}</p>
                    <p style="font-size:13px;color:#6b7280;margin:6px 0 0;">Provision of professional membership services</p>
                  </td>
                  <td style="text-align:right;padding:24px 0;border-bottom:1px solid #f3f4f6;font-size:15px;color:#111827;font-weight:bold;">
                    ₹${baseAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td style="padding:20px 0 8px;text-align:right;font-size:14px;color:#6b7280;">Subtotal</td>
                  <td style="padding:20px 0 8px;text-align:right;font-size:14px;color:#111827;font-weight:bold;">
                    ₹${baseAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;text-align:right;font-size:14px;color:#6b7280;">GST (18%)</td>
                  <td style="padding:8px 0;text-align:right;font-size:14px;color:#111827;font-weight:bold;">
                    ₹${gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 0 0;text-align:right;font-size:18px;font-weight:bold;color:#111827;">Total Paid</td>
                  <td style="padding:24px 0 0;text-align:right;font-size:24px;font-weight:900;color:#0066cc;">
                    ₹${totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>

            <div style="background:#f8fafc;border-radius:12px;padding:24px;border:1px solid #e2e8f0;text-align:center;">
              <p style="font-size:13px;color:#64748b;margin:0;line-height:1.6;">
                This is a computer-generated invoice and does not require a physical signature. 
                For any assistance, please contact us at <a href="mailto:help.arifac@iamai.in" style="color:#0066cc;text-decoration:none;font-weight:bold;">help.arifac@iamai.in</a>.
              </p>
            </div>

            ${FOOTER_NOTE}
          </div>
        </div>`,
    }, retries);
  }
}
