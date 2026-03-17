'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Quote, Target, Award, Users, Shield, Globe, ArrowRight } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 bg-white overflow-hidden">
                <div className="container relative mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-6 block">Our Mission</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#1d1d1f] tracking-tight mb-10 leading-[1.05]">
                            About <span className="text-secondary">ARIFAC</span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
                            India’s AML/CFT capability platform supported by FIU India
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* The Mandate Section */}
            <section className="py-32 bg-[#f5f5f7] relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mb-16"
                        >
                            <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-[0.2em] text-[12px] mb-12">
                                <Quote size={18} /> Why ARIFAC
                            </div>

                            <div className="space-y-24">
                                {/* Why ARIFAC Content */}
                                <div className="grid lg:grid-cols-5 gap-16 items-start">
                                    <div className="lg:col-span-3 space-y-8">
                                        <div className="space-y-6">
                                            <p className="text-2xl md:text-3xl font-medium text-[#1d1d1f] leading-relaxed">
                                                India’s anti-money laundering framework is governed by the <span className="text-secondary font-bold">Prevention of Money Laundering Act (PMLA)</span> and supervised by the <span className="text-secondary font-bold">Financial Intelligence Unit – India (FIU-IND)</span>.
                                            </p>
                                            <p className="text-lg text-secondary leading-relaxed">
                                                As the number of reporting entities continues to expand across financial institutions, fintech companies, intermediaries, and designated non-financial businesses and professions (DNFBPs), there is an increasing need for:
                                            </p>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {[
                                                { title: "Structured compliance training", icon: Shield },
                                                { title: "Industry-wide knowledge sharing", icon: Globe },
                                                { title: "Continuous regulatory engagement", icon: Users },
                                                { title: "Skilled financial crime professionals", icon: Award }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                                    <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center text-accent shrink-0">
                                                        <item.icon size={20} />
                                                    </div>
                                                    <span className="font-semibold text-[#1d1d1f] text-[15px]">{item.title}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/10">
                                            <p className="text-xl font-bold leading-relaxed">
                                                ARIFAC has been designed to address this need by building a national AML/CFT capability platform.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-2 space-y-8">
                                        <div className="p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm">
                                            <h3 className="text-[12px] font-bold text-secondary uppercase tracking-[0.2em] mb-6">Strategic Context</h3>
                                            <p className="text-base text-secondary leading-relaxed font-medium">
                                                The advent of technological change creates systemic risks of financial crimes that need to be addressed with the alignment of national capabilities and technological sophistication.
                                            </p>
                                            <div className="mt-8 pt-6 border-t border-gray-100">
                                                <p className="text-sm font-bold text-primary italic">
                                                    "Combatting risks through coordinated and collaborative efforts by leveraging the expertise of the private sector."
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Regulatory Alignment */}
                                <div className="pt-20 border-t border-gray-200">
                                    <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-[0.2em] text-[12px] mb-12">
                                        <Target size={18} /> Regulatory Alignment
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-16">
                                        <div className="space-y-8">
                                            <p className="text-3xl font-bold text-[#1d1d1f] tracking-tight">
                                                ARIFAC programs and training frameworks are aligned with:
                                            </p>
                                            <ul className="space-y-4">
                                                {[
                                                    "Prevention of Money Laundering Act (PMLA)",
                                                    "FIU-IND Reporting Entity Guidelines",
                                                    "RBI / SEBI / IRDAI / IFSCA AML requirements",
                                                    "FATF Recommendations",
                                                    "Virtual Digital Asset (VDA) reporting guidelines issued by FIU-IND"
                                                ].map((li, i) => (
                                                    <li key={i} className="flex items-start gap-4 text-secondary">
                                                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent mt-0.5 shrink-0">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                                        </div>
                                                        <span className="font-medium text-lg leading-tight">{li}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="flex items-center justify-center">
                                            <div className="w-full max-w-md p-10 rounded-[40px] bg-white border border-gray-100 shadow-xl relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-accent/10 transition-colors" />
                                                <h4 className="text-[12px] font-bold text-secondary uppercase tracking-[0.2em] mb-6">Official Guidance</h4>
                                                <p className="text-secondary font-medium mb-8">
                                                    For official regulatory guidance, please visit the official Financial Intelligence Unit – India portal.
                                                </p>
                                                <a 
                                                    href="https://fiuindia.gov.in" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-3 bg-[#f5f5f7] hover:bg-[#1d1d1f] hover:text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 w-full"
                                                >
                                                    <Globe size={20} className="text-accent" />
                                                    <span>fiuindia.gov.in</span>
                                                    <ArrowRight size={18} className="ml-auto opacity-50" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
