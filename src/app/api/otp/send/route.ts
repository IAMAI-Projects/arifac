import { NextResponse } from 'next/server';
import { OtpService } from '@/services/otp.service';
import { z } from 'zod';

const sendOtpSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = sendOtpSchema.parse(body);

    const result = await OtpService.sendOtp(email);
    return NextResponse.json(result);
  } catch (err: any) {
    const message = err?.message || 'Something went wrong while sending OTP.';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
