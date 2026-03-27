'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle2, Download, ArrowRight, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const orderId    = searchParams.get('orderId')    ?? '—';
    const trackingId = searchParams.get('trackingId') ?? '—';
    const amount     = searchParams.get('amount')     ?? '';

    return (
        <main className="min-h-screen flex flex-col bg-[#f5f5f7]">
            <Navbar />

            <div className="flex-1 flex items-center justify-center px-6 py-24">
                <div className="bg-white rounded-[32px] shadow-xl shadow-gray-200/60 max-w-lg w-full p-10 text-center">

                    {/* Icon */}
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mx-auto mb-8">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>

                    <h1 className="text-3xl font-bold text-[#1d1d1f] mb-3">Payment Successful</h1>
                    <p className="text-secondary text-base mb-10 font-medium">
                        Your ARIFAC membership application has been received. We will review your details and send a confirmation to your registered email.
                    </p>

                    {/* Details */}
                    <div className="bg-[#f5f5f7] rounded-2xl p-6 text-left space-y-4 mb-10">
                        <div className="flex justify-between text-sm">
                            <span className="text-secondary font-medium">Order ID</span>
                            <span className="font-semibold text-[#1d1d1f] font-mono">{orderId}</span>
                        </div>
                        <div className="h-px bg-gray-200" />
                        <div className="flex justify-between text-sm">
                            <span className="text-secondary font-medium">Tracking ID</span>
                            <span className="font-semibold text-[#1d1d1f] font-mono">{trackingId}</span>
                        </div>
                        {amount && (
                            <>
                                <div className="h-px bg-gray-200" />
                                <div className="flex justify-between text-sm">
                                    <span className="text-secondary font-medium">Amount Paid</span>
                                    <span className="font-semibold text-green-600">₹ {parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/membership/dashboard"
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1d1d1f] text-white rounded-full px-6 py-3.5 text-sm font-semibold hover:bg-[#0066cc] transition-colors"
                        >
                            Go to Dashboard <ArrowRight size={16} />
                        </Link>
                        <button
                            onClick={() => window.print()}
                            className="flex-1 inline-flex items-center justify-center gap-2 border border-gray-300 text-[#1d1d1f] rounded-full px-6 py-3.5 text-sm font-semibold hover:bg-[#f5f5f7] transition-colors"
                        >
                            <Download size={16} /> Print Receipt
                        </button>
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

export default function PaymentSuccessPage() {
    return (
        <Suspense>
            <PaymentSuccessContent />
        </Suspense>
    );
}
