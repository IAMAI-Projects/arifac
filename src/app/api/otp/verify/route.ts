import { NextResponse } from 'next/server';
import { OtpService } from '@/services/otp.service';
import { z } from 'zod';

const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, 'Verification code must be exactly 6 digits.'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp } = verifyOtpSchema.parse(body);

    const result = await OtpService.verifyOtp(email, otp);
    return NextResponse.json(result);
  } catch (err: any) {
    const message = err?.message || 'Something went wrong while verifying OTP.';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
