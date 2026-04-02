'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Rocket, ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';

export default function LaunchingSoonPage() {
    return (
        <main className="min-h-screen bg-white font-sans text-[#1d1d1f]">
            <Navbar />

            <section className="relative pt-36 pb-24 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

                <div className="container relative z-10 mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
                            <Rocket className="text-accent" size={36} />
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight tracking-tight mb-6">
                            Membership Registration is{' '}
                            <span className="bg-gradient-to-r from-[#C2B020] to-[#59626E] text-transparent bg-clip-text">
                                Launching Soon
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-[#6e6e73] font-medium leading-relaxed mb-8 max-w-xl mx-auto">
                            We are finalising the membership registration process. Stay tuned for updates on how to join India's premier AML/CFT capability platform.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            <Link
                                href="/"
                                className="flex items-center gap-2 px-8 py-4 bg-[#1d1d1f] text-white font-bold rounded-2xl hover:bg-[#424245] transition-all"
                            >
                                <ArrowLeft size={18} /> Back to Home
                            </Link>
                            <a
                                href="mailto:help.arifac@iamai.in"
                                className="flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-2xl hover:opacity-90 transition-all"
                            >
                                <Mail size={18} /> Contact Us
                            </a>
                        </div>

                        <div className="p-6 bg-[#f5f5f7] rounded-3xl border border-gray-100">
                            <p className="text-sm text-[#6e6e73] font-medium">
                                For membership enquiries, please write to{' '}
                                <a href="mailto:help.arifac@iamai.in" className="text-accent font-bold hover:underline">
                                    help.arifac@iamai.in
                                </a>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
