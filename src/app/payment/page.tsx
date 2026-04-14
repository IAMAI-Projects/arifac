'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CreditCard, Lock, ShieldCheck, ChevronDown, AlertCircle } from 'lucide-react';
import { certificationLevels } from '@/data/arifac';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function PaymentContent() {
    const searchParams = useSearchParams();

    const preSelectedLevel = searchParams.get('level') || certificationLevels[0]?.level;
    const preSelectedCourse = certificationLevels.find(c => c.level === preSelectedLevel) || certificationLevels[0];

    const [selectedCourse, setSelectedCourse] = useState(preSelectedCourse);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const course = certificationLevels.find(c => c.level === e.target.value);
        if (course) setSelectedCourse(course);
    };

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(price);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setError('');

        try {
            console.log('[Payment] Initiating payment for:', selectedCourse.level, 'amount:', selectedCourse.price);

            const response = await fetch('/api/payment/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: selectedCourse.price,
                    billingName: '',
                    billingEmail: '',
                    billingTel: '',
                    billingAddress: '',
                    billingCity: '',
                    billingState: '',
                    billingZip: '',
                    billingCountry: 'India',
                }),
            });

            console.log('[Payment] Response status:', response.status, 'Content-Type:', response.headers.get('content-type'));

            if (!response.ok) {
                // Error responses come back as JSON
                const err = await response.json();
                console.error('[Payment] Server error:', err);
                throw new Error(err.error || 'Failed to initiate payment');
            }

            // Success: server returns a self-submitting HTML form
            // Write it to the document so the browser renders & auto-submits to CCAvenue
            const html = await response.text();
            console.log('[Payment] Received HTML redirect page, writing to document...');
            document.open();
            document.write(html);
            document.close();
        } catch (err: any) {
            console.error('[Payment] Error:', err);
            setError(err.message || 'Failed to initiate payment. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <main className="bg-gray-50 min-h-screen font-sans flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center p-6 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden border border-gray-100"
                >
                    {/* Order Summary */}
                    <div className="w-full md:w-5/12 bg-gray-900 p-8 text-white flex flex-col justify-between">
                        <div>
                            <div className="mb-8">
                                <span className="text-xl font-bold text-white">ARIFAC</span>
                                <p className="text-xs text-gray-400 mt-1">Certification Programme</p>
                            </div>

                            <h2 className="text-xl font-bold mb-6 text-white/90">Order Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-start pb-4 border-b border-white/10">
                                    <div>
                                        <h3 className="font-semibold">{selectedCourse.level} Certification</h3>
                                        <p className="text-xs text-gray-400 mt-1">{selectedCourse.title}</p>
                                    </div>
                                    <span className="font-mono text-sm">{formatPrice(selectedCourse.price)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(selectedCourse.price)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Tax (18% GST)</span>
                                    <span>Included</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-bold">Total Due</span>
                                <span className="text-2xl font-bold text-blue-400">{formatPrice(selectedCourse.price)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-blue-400 bg-blue-400/10 px-3 py-2 rounded-lg w-fit">
                                <ShieldCheck className="w-4 h-4" />
                                Secured by CCAvenue
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="flex-1 p-8 md:p-12">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h1>
                            <p className="text-gray-500 text-sm">You will be securely redirected to CCAvenue to complete your payment.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handlePayment} className="space-y-6">
                            {/* Course Selection */}
                            <div>
                                <label className="text-xs font-semibold uppercase text-gray-500 mb-2 block">
                                    Select Certification Course
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedCourse.level}
                                        onChange={handleCourseChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 pr-10 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        {certificationLevels.map((course) => (
                                            <option key={course.level} value={course.level}>
                                                {course.level} — {course.title} ({formatPrice(course.price)})
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">{selectedCourse.targetAudience}</p>
                            </div>

                            {/* Info box */}
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                                <CreditCard className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-blue-900">Secure Payment via CCAvenue</p>
                                    <p className="text-xs text-blue-700 mt-1">
                                        Clicking "Proceed to Pay" will redirect you to CCAvenue's secure payment page where you can pay via Credit Card, Debit Card, Net Banking, UPI, and more.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-[#0066cc] text-white font-bold py-4 rounded-xl hover:bg-[#0077ed] hover:shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Redirecting to CCAvenue...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-4 h-4" />
                                        Proceed to Pay {formatPrice(selectedCourse.price)}
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
                            <div className="flex items-center gap-1">
                                <Lock className="w-3 h-3" />
                                256-bit SSL Encrypted
                            </div>
                            <span>·</span>
                            <div className="flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" />
                                PCI DSS Compliant
                            </div>
                        </div>

                        <p className="mt-4 text-center text-xs text-gray-400">
                            By confirming, you agree to our{' '}
                            <Link href="#" className="underline hover:text-gray-600">Terms of Service</Link>.
                        </p>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </main>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        }>
            <PaymentContent />
        </Suspense>
    );
}
