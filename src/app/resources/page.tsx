'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import {
    BookOpen,
    FileText,
    Newspaper,
    Lightbulb,
    BarChart3,
    MessageCircleQuestion,
    Lock,
    ArrowRight,
    Search
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export default function ResourcesPage() {
    const { t } = useLanguage();

    const sections = [
        {
            title: "Regulatory Updates",
            desc: "Stay informed about latest changes in AML/CFT laws, regulations, and circulars from FIU-IND and other regulators.",
            icon: Newspaper,
            color: "blue",
            href: "/regulatory-updates"
        },
        {
            title: "FAQs",
            desc: "Frequently asked questions regarding reporting obligations, compliance requirements, and ARIFAC programmes.",
            icon: MessageCircleQuestion,
            color: "purple",
            href: "/faqs"
        }
    ];

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-36 pb-12 bg-white overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(194,176,32,0.05),transparent_70%)] pointer-events-none" />
                <div className="container relative mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-widest mb-8">
                            <Search size={16} /> Knowledge Hub
                        </div>
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-heading leading-[1.1] tracking-tight text-[#1d1d1f] mb-8">
                            <span className="bg-gradient-to-r from-[#C2B020] to-[#59626E] text-transparent bg-clip-text italic mr-4">ARIFAC</span>
                            Resources
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed mb-8">
                            Access curated materials and reference documents related to AML/CFT frameworks, industry practices, and financial crime prevention.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#f5f5f7] border border-gray-100 text-[#1d1d1f] font-bold">
                                <Lock size={18} className="text-accent" />
                                <span>Member-exclusive content available</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Resources Grid */}
            <section className="py-14 bg-[#f5f5f7] relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {sections.map((section, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative bg-white p-7 rounded-[32px] border border-transparent hover:border-accent/10 transition-all hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full translate-x-8 -translate-y-8 blur-3xl group-hover:bg-accent/10 transition-colors" />

                                    <div className="w-16 h-16 rounded-[24px] bg-[#f5f5f7] flex items-center justify-center text-accent mb-8 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
                                        <section.icon size={32} strokeWidth={1.5} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4 group-hover:text-accent transition-colors">
                                        {section.title}
                                    </h3>
                                    <p className="text-secondary leading-relaxed font-medium mb-8">
                                        {section.desc}
                                    </p>

                                    <Link href={section.href} className="flex items-center gap-2 text-accent font-bold group/btn">
                                        <span>Explore Section</span>
                                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Note Section */}
            <section className="py-14 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-[#1d1d1f] text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden text-center"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <Lock size={40} className="mx-auto text-accent mb-4" />
                            <h2 className="text-2xl font-bold mb-3">Membership Access</h2>
                            <p className="text-lg text-white/70 font-medium mb-6">
                                Some resources, including high-level typologies and consultation papers, may be available only to registered ARIFAC members.
                            </p>
                            <button className="px-8 py-4 bg-accent text-white font-bold rounded-2xl hover:bg-white hover:text-accent transition-all shadow-lg shadow-accent/20">
                                Apply for Membership
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>


            <Footer />
        </main>
    );
}
