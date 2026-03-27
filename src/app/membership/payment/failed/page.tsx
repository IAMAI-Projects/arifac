'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { XCircle, RefreshCw, Mail, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const STATUS_COPY: Record<string, { title: string; description: string; color: string }> = {
    failed: {
        title: 'Payment Failed',
        description: 'Your payment could not be processed. Please check your payment details and try again, or use a different payment method.',
        color: 'text-red-500',
    },
    aborted: {
        title: 'Payment Cancelled',
        description: 'You cancelled the payment. Your application has not been submitted. Click below to go back and try again.',
        color: 'text-amber-500',
    },
    invalid: {
        title: 'Invalid Transaction',
        description: 'The transaction could not be verified. Please contact our support team if you believe this is an error.',
        color: 'text-red-500',
    },
    error: {
        title: 'Something Went Wrong',
        description: 'An unexpected error occurred while processing your payment. Please try again or contact support.',
        color: 'text-red-500',
    },
};

function PaymentFailedContent() {
    const searchParams = useSearchParams();
    const reason  = searchParams.get('reason') ?? 'failed';
    const orderId = searchParams.get('orderId') ?? '';

    const copy = STATUS_COPY[reason] ?? STATUS_COPY['error'];

    return (
        <main className="min-h-screen flex flex-col bg-[#f5f5f7]">
            <Navbar />

            <div className="flex-1 flex items-center justify-center px-6 py-24">
                <div className="bg-white rounded-[32px] shadow-xl shadow-gray-200/60 max-w-lg w-full p-10 text-center">

                    {/* Icon */}
                    <div className={`flex items-center justify-center w-20 h-20 rounded-full mx-auto mb-8 ${reason === 'aborted' ? 'bg-amber-50' : 'bg-red-50'}`}>
                        <XCircle className={`w-10 h-10 ${copy.color}`} />
                    </div>

                    <h1 className="text-3xl font-bold text-[#1d1d1f] mb-3">{copy.title}</h1>
                    <p className="text-secondary text-base mb-10 font-medium leading-relaxed">
                        {copy.description}
                    </p>

                    {/* Order reference (if available) */}
                    {orderId && (
                        <div className="bg-[#f5f5f7] rounded-2xl p-5 text-left mb-10">
                            <div className="flex justify-between text-sm">
                                <span className="text-secondary font-medium">Order Reference</span>
                                <span className="font-semibold text-[#1d1d1f] font-mono">{orderId}</span>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/membership/register/form-a"
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1d1d1f] text-white rounded-full px-6 py-3.5 text-sm font-semibold hover:bg-[#0066cc] transition-colors"
                        >
                            <RefreshCw size={16} /> Try Again
                        </Link>
                        <a
                            href="mailto:membership@arifac.in"
                            className="flex-1 inline-flex items-center justify-center gap-2 border border-gray-300 text-[#1d1d1f] rounded-full px-6 py-3.5 text-sm font-semibold hover:bg-[#f5f5f7] transition-colors"
                        >
                            <Mail size={16} /> Contact Support
                        </a>
                    </div>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 mt-6 text-sm text-secondary hover:text-[#1d1d1f] transition-colors font-medium"
                    >
                        <Home size={14} /> Back to Home
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    );
}

export default function PaymentFailedPage() {
    return (
        <Suspense>
            <PaymentFailedContent />
        </Suspense>
    );
}
