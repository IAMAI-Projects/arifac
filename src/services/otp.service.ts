import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { EmailService } from '@/lib/email';
import crypto from 'crypto';

export class OtpService {
  private static OTP_EXPIRY_MINUTES = 5;
  private static MAX_ATTEMPTS = 5;
  private static RESEND_COOLDOWN_SECONDS = 60;

  /**
   * Generates a 6-digit numeric OTP.
   */
  private static generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Hashes the OTP using bcrypt.
   */
  private static async hashOtp(otp: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(otp, salt);
  }

  /**
   * Verifies the OTP against a hashed version.
   */
  private static async compareOtp(otp: string, hashedOtp: string): Promise<boolean> {
    return bcrypt.compare(otp, hashedOtp);
  }

  /**
   * Sends a new OTP to the specified email.
   */
  static async sendOtp(email: string) {
    // Check for cooldown (prevent spam)
    const lastOtp = await prisma.emailOTP.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' },
    });

    if (lastOtp) {
      const secondsSinceLast = (Date.now() - lastOtp.createdAt.getTime()) / 1000;
      if (secondsSinceLast < this.RESEND_COOLDOWN_SECONDS) {
        throw new Error(`Please wait ${Math.ceil(this.RESEND_COOLDOWN_SECONDS - secondsSinceLast)}s before requesting a new OTP.`);
      }
    }

    // Check if user already exists
    const [existingMember, existingAdmin] = await Promise.all([
      prisma.users.findUnique({ where: { email } }),
      prisma.user.findUnique({ where: { email } })
    ]);

    if (existingMember || existingAdmin) {
      throw new Error('Both Email and User ID are required to be unique. The provided email address is already associated with another account.');
    }

    const otp = this.generateOtp();
    const hashedOtp = await this.hashOtp(otp);
    const expiresAt = new Date(Date.now() + this.OTP_EXPIRY_MINUTES * 60 * 1000);

    // Save to database
    await prisma.emailOTP.create({
      data: {
        email,
        otp: hashedOtp,
        expiresAt,
        verified: false,
        attempts: 0,
      },
    });

    // Send email
    await EmailService.sendOTPEmail(email, otp, expiresAt);

    return { success: true, message: 'OTP sent successfully.' };
  }

  /**
   * Verifies an OTP for a given email.
   */
  static async verifyOtp(email: string, otp: string) {
    const latestOtpRecord = await prisma.emailOTP.findFirst({
      where: { email, verified: false },
      orderBy: { createdAt: 'desc' },
    });

    if (!latestOtpRecord) {
      throw new Error('No active OTP request found for this email.');
    }

    // Check expiry
    if (new Date() > latestOtpRecord.expiresAt) {
      throw new Error('OTP has expired. Please request a new one.');
    }

    // Check attempts
    if (latestOtpRecord.attempts >= this.MAX_ATTEMPTS) {
      throw new Error('Too many failed attempts. Please request a new OTP.');
    }

    // Verify OTP
    const isMatch = await this.compareOtp(otp, latestOtpRecord.otp);

    if (!isMatch) {
      // Increment attempts
      await prisma.emailOTP.update({
        where: { id: latestOtpRecord.id },
        data: { attempts: { increment: 1 } },
      });
      throw new Error('Invalid verification code.');
    }

    // Mark as verified
    await prisma.emailOTP.update({
      where: { id: latestOtpRecord.id },
      data: { verified: true },
    });

    return { success: true, message: 'OTP verified successfully.' };
  }

  /**
   * Checks if an email is already verified.
   * Useful before final form submission.
   */
  static async checkIsVerified(email: string): Promise<boolean> {
    const verifiedRecord = await prisma.emailOTP.findFirst({
      where: {
        email,
        verified: true,
        // Optional: Ensure it was verified recently (e.g. within last hour)
        createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) },
      },
      orderBy: { createdAt: 'desc' },
    });

    return !!verifiedRecord;
  }
}
