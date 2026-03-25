'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { FileText, Link as LinkIcon, ExternalLink, ShieldCheck, BookOpen, AlertCircle, Info } from 'lucide-react';

export default function RegulatoryUpdatesPage() {
    const authorities = [
        "FIU-IND", "RBI", "SEBI", "IRDAI", "Ministry of Finance"
    ];

    const categories = [
        "AML / CFT", "KYC / Customer Due Diligence", "Reporting Obligations",
        "Digital Onboarding", "Fraud / Cyber Risk", "Sanctions / Screening", "Compliance & Governance"
    ];

    const recentCirculars = [
        {
            title: "Master Direction - Know Your Customer (KYC) Direction, 2016 (Updated)",
            authority: "RBI",
            date: "March 15, 2024",
            category: "KYC / Customer Due Diligence",
            viewUrl: "#",
            downloadUrl: "#"
        },
        {
            title: "Guidance Note on Suspicious Transaction Reporting",
            authority: "FIU-IND",
            date: "February 28, 2024",
            category: "Reporting Obligations",
            viewUrl: "#",
            downloadUrl: "#"
        },
        {
            title: "Amendment to SEBI (KYC Registration Agency) Regulations, 2011",
            authority: "SEBI",
            date: "January 10, 2024",
            category: "AML / CFT",
            viewUrl: "#",
            downloadUrl: "#"
        }
    ];

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-48 pb-20 bg-white overflow-hidden">
                <div className="container relative mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-6 block">Regulatory Updates</span>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-[#1d1d1f] tracking-tight mb-8 leading-[1.1]">
                            Tracking Developments Across <br />
                            <span className="bg-gradient-to-r from-[#C2B020] to-[#59626E] text-transparent bg-clip-text text-2xl md:text-3xl lg:text-4xl uppercase tracking-widest block mt-4">India’s AML/CFT Framework</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
                            Track important circulars, notifications, advisories, and regulatory updates relevant to reporting entities and the broader financial crime prevention ecosystem.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Browse Sections */}
            <section className="py-20 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto space-y-20">
                        {/* Browse by Authority */}
                        <div>
                            <h2 className="text-3xl font-bold text-[#1d1d1f] mb-10 flex items-center gap-3">
                                <ShieldCheck className="text-accent" size={32} />
                                Browse by Authority
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {authorities.map((auth, index) => (
                                    <motion.button
                                        key={auth}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-accent/30 transition-all text-center group"
                                    >
                                        <span className="text-secondary group-hover:text-accent font-bold text-sm uppercase tracking-wider">{auth}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Browse by Category */}
                        <div>
                            <h2 className="text-3xl font-bold text-[#1d1d1f] mb-10 flex items-center gap-3">
                                <BookOpen className="text-accent" size={32} />
                                Browse by Category
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.map((cat, index) => (
                                    <motion.button
                                        key={cat}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-accent/30 transition-all text-left flex items-center justify-between group"
                                    >
                                        <span className="text-secondary group-hover:text-[#1d1d1f] font-bold">{cat}</span>
                                        <ExternalLink size={16} className="text-gray-300 group-hover:text-accent" />
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Circulars & Filters */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-4">Recent Circulars & Notifications</h2>
                                <p className="text-secondary text-lg">Latest uploaded circulars, advisories, and notifications.</p>
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 bg-[#f5f5f7] p-1.5 rounded-xl border border-gray-100">
                                <select className="bg-transparent px-3 py-1.5 font-bold text-[13px] text-secondary focus:outline-none cursor-pointer">
                                    <option>All Regulators</option>
                                    <option>RBI</option>
                                    <option>SEBI</option>
                                    <option>FIU-IND</option>
                                    <option>IRDAI</option>
                                </select>
                                <div className="w-[1px] h-4 bg-gray-200" />
                                <select className="bg-transparent px-3 py-1.5 font-bold text-[13px] text-secondary focus:outline-none cursor-pointer">
                                    <option>All Categories</option>
                                    {categories.map(c => <option key={c}>{c}</option>)}
                                </select>
                                <div className="w-[1px] h-4 bg-gray-200" />
                                <select className="bg-transparent px-3 py-1.5 font-bold text-[13px] text-secondary focus:outline-none cursor-pointer">
                                    <option>Date: Newest</option>
                                    <option>Date: Oldest</option>
                                </select>
                            </div>
                        </div>

                        {/* Circulars List */}
                        <div className="space-y-4">
                            {recentCirculars.map((circular, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-wider">
                                                <span className="text-accent">{circular.authority}</span>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-secondary">{circular.date}</span>
                                                <span className="text-gray-300">•</span>
                                                <span className="bg-gray-100 px-2 py-1 rounded text-gray-500">{circular.category}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-[#1d1d1f] group-hover:text-accent transition-colors">
                                                {circular.title}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-4 shrink-0">
                                            <a href={circular.viewUrl} className="px-6 py-3 rounded-full border border-gray-200 text-sm font-bold text-secondary hover:bg-gray-50 transition-colors uppercase tracking-tight">
                                                View Circular
                                            </a>
                                            <a href={circular.downloadUrl} className="px-6 py-3 rounded-full bg-[#1d1d1f] text-white text-sm font-bold hover:bg-black transition-colors uppercase tracking-tight flex items-center gap-2">
                                                Download <LinkIcon size={14} />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer & Info */}
            <section className="py-24 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                                <Info size={24} className="text-accent" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-[#1d1d1f] mb-2">Important Note</h4>
                                <p className="text-secondary leading-relaxed font-medium">
                                    This section is intended as a repository for easy reference and awareness. Latest regulatory circulars, advisories, and reference documents are maintained here for member access.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                                <AlertCircle size={24} className="text-amber-500" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-[#1d1d1f] mb-2">Disclaimer</h4>
                                <p className="text-secondary leading-relaxed font-medium italic">
                                    Content hosted on this page is for informational purposes only. Users should refer to the original circulars, notifications, and official communications issued by the relevant authority for statutory compliance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore More */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-[#1d1d1f] mb-12 italic opacity-50 font-serif">Explore More</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <a href="/about" className="group">
                                <h5 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">Explore ARIFAC Programs</h5>
                                <div className="h-0.5 w-12 bg-accent mx-auto scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                            </a>
                            <a href="/membership" className="group">
                                <h5 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">Apply for Membership</h5>
                                <div className="h-0.5 w-12 bg-accent mx-auto scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                            </a>
                            <a href="mailto:help.arifac@iamai.in" className="group">
                                <h5 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">Contact ARIFAC Secretariat</h5>
                                <p className="text-sm text-secondary">help.arifac@iamai.in</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
