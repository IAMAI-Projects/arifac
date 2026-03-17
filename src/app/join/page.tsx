'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import { ArrowLeft, ChevronRight, Building2, Upload } from 'lucide-react';

export default function JoinPage() {
    const [step, setStep] = useState(1);

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(step + 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Application submitted for review. Our compliance team will contact you shortly.');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row text-primary overflow-hidden font-sans">
            {/* Visual Context Side */}
            <div className="hidden md:flex flex-col justify-between w-5/12 bg-gray-50 p-12 relative overflow-hidden border-r border-gray-200">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.03),transparent_50%)]" />

                <div className="relative z-10">
                    <Link href="/" className="inline-block mb-12">
                        <Logo />
                    </Link>

                    <h2 className="text-3xl font-heading font-bold mb-6 text-primary">
                        Join the National Compliance Alliance
                    </h2>

                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
                                <span className="text-accent font-bold">1</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-1">Institutional Verification</h3>
                                <p className="text-sm text-gray-500">KYC verification of the reporting entity using LEI/CIN.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
                                <span className="text-accent font-bold">2</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-1">Board Resolution</h3>
                                <p className="text-sm text-gray-500">Upload authorized signatory mandate and integrity pledge.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
                                <span className="text-accent font-bold">3</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-1">Fee Payment</h3>
                                <p className="text-sm text-gray-500">Annual membership fees based on entity classification.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 p-6 bg-white rounded-lg border border-gray-200 shadow-sm mt-auto">
                    <p className="text-xs text-gray-500 italic">
                        "Membership requires adherence to the ARIFAC Code of Conduct and commitment to national AML/CFT standards."
                    </p>
                </div>
            </div>

            {/* Application Form Side */}
            <div className="flex-1 flex flex-col p-6 md:p-12 overflow-y-auto bg-white">
                <div className="flex justify-between items-center mb-10">
                    <Link
                        href="/"
                        className="text-gray-400 hover:text-primary flex items-center gap-2 text-sm transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Cancel Application
                    </Link>
                    <div className="text-sm text-gray-500">
                        Step <span className="text-accent font-bold">{step}</span> of 3
                    </div>
                </div>

                <div className="max-w-2xl mx-auto w-full">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold font-heading mb-2 text-primary">
                            {step === 1 ? 'Entity Details' : step === 2 ? 'Authorized Signatory' : 'Document Upload'}
                        </h1>
                        <p className="text-gray-500">
                            {step === 1 ? 'Please provide legal registration details of your institution.'
                                : step === 2 ? 'Details of the Principal Officer or Designated Director.'
                                    : 'Upload necessary compliance documents.'}
                        </p>
                    </div>

                    <form onSubmit={step === 3 ? handleSubmit : handleNext} className="space-y-6">

                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Legal Entity Name</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400"
                                                placeholder="e.g. State Bank of India"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Entity Type</label>
                                        <select className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                                            <option value="">Select Type</option>
                                            <option value="bank">Banking Company</option>
                                            <option value="nbfc">NBFC</option>
                                            <option value="insurance">Insurance</option>
                                            <option value="securities">Securities Market Intermediary</option>
                                            <option value="vda">VDA SP</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Registration / CIN</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400"
                                            placeholder="L12345MH2000PLC..."
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400"
                                            placeholder="Name of Principal Officer"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Official Email</label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400"
                                            placeholder="principal@entity.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Designation</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400"
                                            placeholder="e.g. Chief Compliance Officer"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, x: 0 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="space-y-6">
                                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-accent/50 transition-colors cursor-pointer bg-gray-50 hover:bg-white">
                                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                                        <h3 className="font-semibold text-primary">Upload Certificate of Incorporation</h3>
                                        <p className="text-sm text-gray-500 mt-2">PDF under 5MB</p>
                                    </div>

                                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-accent/50 transition-colors cursor-pointer bg-gray-50 hover:bg-white">
                                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                                        <h3 className="font-semibold text-primary">Upload Board Resolution</h3>
                                        <p className="text-sm text-gray-500 mt-2">Signed by Chairman/MD</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div className="pt-8 flex gap-4">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="flex-1 py-3.5 rounded-lg border border-gray-200 text-primary font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Back
                                </button>
                            )}
                            <button
                                type="submit"
                                className="flex-1 bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                {step === 3 ? 'Submit Application' : 'Continue'}
                                {step !== 3 && <ChevronRight className="w-4 h-4" />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
