'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import { ShieldCheck, CreditCard, Lock, CheckCircle2 } from 'lucide-react';

export default function PaymentPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        name: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Mock Validation
        setTimeout(() => {
            if (
                formData.cardNumber === '1234567890' &&
                formData.expiry === '12/30' &&
                formData.cvv === '111'
            ) {
                router.push('/lms/dashboard');
            } else {
                setError('Transaction Failed: Invalid card details. Use Setup: 1234567890 | 12/30 | 111');
                setIsLoading(false);
            }
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden border border-gray-100">

                {/* Order Summary Side */}
                <div className="w-full md:w-5/12 bg-gray-900 p-8 text-white relative flex flex-col justify-between">
                    <div>
                        <Logo className="mb-8" />
                        <h2 className="text-xl font-bold mb-6 text-white/90">Order Summary</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between items-start pb-4 border-b border-white/10">
                                <div>
                                    <h3 className="font-semibold">L1 Certification</h3>
                                    <p className="text-xs text-gray-400">Foundations of Financial Integrity</p>
                                </div>
                                <span className="font-mono">₹5,000.00</span>
                            </div>

                            <div className="flex justify-between items-center text-sm text-gray-400">
                                <span>Subtotal</span>
                                <span>₹5,000.00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-400">
                                <span>Tax (18% GST)</span>
                                <span>Included</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-lg font-bold">Total Due</span>
                            <span className="text-2xl font-bold text-accent">₹5,000.00</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-400 mt-4 bg-green-400/10 p-2 rounded w-fit">
                            <ShieldCheck className="w-3 h-3" />
                            Secure 256-bit SSL Encrypted
                        </div>
                    </div>
                </div>

                {/* Payment Form Side */}
                <div className="flex-1 p-8 md:p-12">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-primary mb-2">Payment Details</h1>
                        <p className="text-gray-500 text-sm">Complete your purchase to access the LMS.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold uppercase text-gray-500 mb-1 block">Cardholder Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-400"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold uppercase text-gray-500 mb-1 block">Card Number</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all font-mono placeholder:text-gray-400"
                                        placeholder="1234 5678 9012 3456"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="text-xs font-semibold uppercase text-gray-500 mb-1 block">Expiry</label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        value={formData.expiry}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all font-mono placeholder:text-gray-400"
                                        placeholder="MM/YY"
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs font-semibold uppercase text-gray-500 mb-1 block">CVV</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="password"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-9 pr-4 text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all font-mono placeholder:text-gray-400"
                                            placeholder="123"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Processing Payment...
                                </>
                            ) : (
                                'Pay ₹5,000.00 & Access Course'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-xs text-gray-400">
                        By confirming, you agree to the Terms of Service.
                    </div>
                </div>
            </div>
        </div>
    );
}
