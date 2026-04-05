'use client';

import { useState, useEffect } from 'react';
import { Mail, CheckCircle2, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface OTPVerificationProps {
  email: string;
  onVerify: (isVerified: boolean) => void;
  className?: string;
}

export default function OTPVerification({ email, onVerify, className }: OTPVerificationProps) {
  const [otp, setOtp] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSendOtp = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }

    setIsSending(true);
    setError(null);
    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        setCooldown(60);
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError('Please enter a 6-digit code.');
      return;
    }

    setIsVerifying(true);
    setError(null);
    try {
      const response = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();

      if (data.success) {
        setIsVerified(true);
        onVerify(true);
      } else {
        setError(data.message || 'Invalid OTP.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  if (isVerified) {
    return (
      <div className={twMerge("flex items-center gap-3 p-4 bg-green-50/50 border border-green-200 rounded-xl", className)}>
        <CheckCircle2 className="w-5 h-5 text-green-600" />
        <span className="text-sm font-medium text-green-700">Email verified successfully</span>
      </div>
    );
  }

  return (
    <div className={twMerge("space-y-4", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSendOtp}
          disabled={isSending || cooldown > 0}
          className={clsx(
            "flex-shrink-0 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
            cooldown > 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:opacity-80"
          )}
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <Mail className="w-4 h-4" />
          )}
          {otpSent ? (cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Code') : 'Send OTP'}
        </button>

        {otpSent && (
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="6-digit code"
              className="flex-1 min-w-[120px] px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-center tracking-[4px] font-mono text-lg transition-all"
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={isVerifying || otp.length !== 6}
              className="flex-shrink-0 relative z-10 px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 active:opacity-80"
            >
              {isVerifying ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                'Verify'
              )}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl animate-in slide-in-from-top-2 duration-300">
          <AlertCircle className="w-4 h-4" />
          <span className="text-xs font-medium">{error}</span>
        </div>
      )}

      {otpSent && !isVerified && (
        <p className="text-[11px] text-gray-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          We've sent a 6-digit code to <span className="font-semibold text-gray-700">{email}</span>.
        </p>
      )}
    </div>
  );
}
