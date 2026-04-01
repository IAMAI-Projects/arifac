
import nodemailer from 'nodemailer';

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.error('[EmailService] CRITICAL: SMTP_USER or SMTP_PASS is not defined in environment variables.');
} else {
  console.log('[EmailService] Initializing with SMTP User:', process.env.SMTP_USER);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.office365.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export class EmailService {
  /**
   * Send Resume Email with Retry Logic
   */
  static async sendResumeEmail(email: string, name: string, token: string, retries = 3) {
    const domain = process.env.NEXT_PUBLIC_APP_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://arifac.in');
    const resumeLink = `${domain}/api/resume?token=${token}`; // Updated to point to resume API

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'help.arifac@iamai.in',
      to: email,
      subject: 'Your Form Approval - Resume Flow',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Hello, ${name}!</h2>
          <p>Congratulations! Your <strong>Form</strong> submission has been approved by the ARIFAC Secretariat.</p>
          <p>You can now resume your registration process. This link is valid for <strong>24 hours</strong>.</p>
          <div style="margin: 30px 0; text-align: center;">
            <a href="${resumeLink}" style="background-color: #4F46E5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Resume Registration Flow
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="background: #f4f4f4; padding: 10px; border-radius: 4px; word-break: break-all;">
            <a href="${resumeLink}" style="color: #4F46E5;">${resumeLink}</a>
          </p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 12px; color: #999;">If you have any questions, feel free to contact us at <a href="mailto:help.arifac@iamai.in">help.arifac@iamai.in</a>.</p>
        </div>
      `,
    };

    await this.sendEmail(mailOptions, email, retries);
  }

  /**
   * Send Password Reset Email
   */
  static async sendPasswordResetEmail(email: string, name: string, token: string, retries = 3) {
    const domain = process.env.NEXT_PUBLIC_APP_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://arifac.in');
    const resetLink = `${domain}/membership/reset-password/${token}`;

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'help.arifac@iamai.in',
      to: email,
      subject: 'Password Reset Request - ARIFAC',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Hello, ${name}!</h2>
          <p>We received a request to reset your password for your ARIFAC membership account.</p>
          <p>Click the button below to set a new password. This link is valid for <strong>1 hour</strong>.</p>
          <div style="margin: 30px 0; text-align: center;">
            <a href="${resetLink}" style="background-color: #1d1d1f; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Reset My Password
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="background: #f4f4f4; padding: 10px; border-radius: 4px; word-break: break-all;">
            <a href="${resetLink}" style="color: #1d1d1f;">${resetLink}</a>
          </p>
          <p style="color: #666; font-size: 14px; margin-top: 20px;">If you didn't request a password reset, you can safely ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 12px; color: #999;">If you have any questions, feel free to contact us at <a href="mailto:help.arifac@iamai.in">help.arifac@iamai.in</a>.</p>
        </div>
      `,
    };

    await this.sendEmail(mailOptions, email, retries);
  }

  /**
   * Helper method to send email with retry logic
   */
  private static async sendEmail(mailOptions: any, email: string, retries: number) {
    for (let i = 0; i < retries; i++) {
      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to ${email} (Attempt ${i + 1})`);
        return;
      } catch (error) {
        console.error(`Failed to send email to ${email} (Attempt ${i + 1}):`, error);
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }
}
