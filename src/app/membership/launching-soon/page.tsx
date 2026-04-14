'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';

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
                            <Wrench className="text-accent" size={36} />
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight tracking-tight mb-6">
                            <span className="bg-gradient-to-r from-[#C2B020] to-[#59626E] text-transparent bg-clip-text">
                                Under Maintenance
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-[#6e6e73] font-medium leading-relaxed max-w-xl mx-auto">
                            This section is currently under maintenance. Please check back shortly.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
