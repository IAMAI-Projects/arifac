"use client";

import { useState, useRef } from 'react';
import { CheckCircle2, BookOpen, ChevronRight, ChevronDown, ChevronLeft, Award, ShieldCheck, Zap, Lock } from 'lucide-react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';

/* ─── Course Data from ARIFAC Certification Framework PDF ─── */

interface AddOnCourse {
    code: string;
    title: string;
}

interface LevelData {
    level: string;
    badge: string;
    name: string;
    credential: string;
    objective: string;
    core: { code: string; title: string };
    addOns: AddOnCourse[];
    enrollUrl?: string;
    isAvailable: boolean;
}

const levels: LevelData[] = [
    {
        level: "L1",
        badge: "ACF-L1",
        name: "Foundation",
        credential: "ARIFAC Certified Associate (AML/CFT)",
        objective: "Entry-level AML/CFT literacy (role-based onboarding)",
        core: { code: "ACF-L1-CORE", title: "AML/CFT Foundations & Regulatory Framework" },
        enrollUrl: "https://arifac.iamai.in/course/CertifiedAMLFinancialCrimeProfessionalIndia-105418",
        isAvailable: true,
        addOns: [
            { code: "ACF-L1-PAY", title: "AML in Payments & PPIs" },
            { code: "ACF-L1-UPI", title: "UPI Fraud & Transaction Monitoring Basics" },
            { code: "ACF-L1-PA", title: "Payment Aggregators & Merchant Risk" },
            { code: "ACF-L1-BNK", title: "AML for Banking Operations" },
            { code: "ACF-L1-LND", title: "AML in Lending & Loan Origination" },
            { code: "ACF-L1-MFI", title: "AML in Microfinance" },
            { code: "ACF-L1-WLT", title: "AML in Wealth & Mutual Funds" },
            { code: "ACF-L1-CAP", title: "AML in Capital Markets" },
            { code: "ACF-L1-INS", title: "AML in Insurance Operations" },
            { code: "ACF-L1-PLT", title: "Platform Abuse & Merchant Fraud Basics" },
            { code: "ACF-L1-TEL", title: "Telecom Fraud & SIM Risks" },
            { code: "ACF-L1-VDA", title: "Introduction to Crypto & AML Risks" },
            { code: "ACF-L1-CBX", title: "Cross-border Payments Basics" },
            { code: "ACF-L1-DATA", title: "KYC, CKYC & Data Governance" },
            { code: "ACF-L1-DNF", title: "AML for DNFBPs (Real Estate, Jewellers)" },
        ],
    },
    {
        level: "L2",
        badge: "ACF-L2",
        name: "Professional",
        credential: "ARIFAC Certified Professional",
        objective: "Applied compliance, monitoring, supervisory capability",
        core: { code: "ACF-L2-CORE", title: "Transaction Monitoring & STR Filing" },
        isAvailable: false,
        addOns: [
            { code: "ACF-L2-BNK", title: "AML Risk Management in Banks" },
            { code: "ACF-L2-LND", title: "Lending Fraud & Credit Risk Monitoring" },
            { code: "ACF-L2-NBFC", title: "AML in NBFCs & Shadow Banking" },
            { code: "ACF-L2-PAY", title: "Fraud Detection in Payments" },
            { code: "ACF-L2-PA", title: "Merchant Onboarding & Due Diligence" },
            { code: "ACF-L2-UPI", title: "UPI Fraud Lifecycle & Dispute Handling" },
            { code: "ACF-L2-WLT", title: "AML in Wealth Products & PMS" },
            { code: "ACF-L2-CAP", title: "Market Abuse & Insider Trading Risks" },
            { code: "ACF-L2-AIF", title: "AML in AIFs & Portfolio Management" },
            { code: "ACF-L2-INS", title: "AML in Life & Non-Life Insurance" },
            { code: "ACF-L2-CLAIM", title: "Fraud in Insurance Claims" },
            { code: "ACF-L2-PLT", title: "Platform Abuse & Fake Merchant Detection" },
            { code: "ACF-L2-GAM", title: "Gaming, Betting & Wallet Risks" },
            { code: "ACF-L2-TEL", title: "SIM Fraud, Mule Accounts & Identity Abuse" },
            { code: "ACF-L2-CBX", title: "Cross-border AML & Remittance Monitoring" },
            { code: "ACF-L2-TBL", title: "Trade-Based Money Laundering" },
            { code: "ACF-L2-DATA", title: "Data Analytics for AML Monitoring" },
            { code: "ACF-L2-AI", title: "AI/ML in Fraud Detection" },
        ],
    },
    {
        level: "L3",
        badge: "ACF-L3",
        name: "Specialist",
        credential: "ARIFAC Certified Specialist",
        objective: "Deep domain expertise, investigations, typologies",
        core: { code: "ACF-L3-CORE", title: "Advanced AML Investigations & Typologies" },
        isAvailable: false,
        addOns: [
            { code: "ACF-L3-FCT", title: "Financial Crime Typologies & Case Studies" },
            { code: "ACF-L3-MULE", title: "Mule Account Networks & Syndicates" },
            { code: "ACF-L3-VDA", title: "Advanced Crypto Forensics & AML" },
            { code: "ACF-L3-DEFI", title: "DeFi, NFTs & Blockchain Risk" },
            { code: "ACF-L3-TBL", title: "Advanced Trade-Based Laundering" },
            { code: "ACF-L3-CBX", title: "Global AML & Sanctions Framework" },
            { code: "ACF-L3-REG", title: "Regulatory Interpretation (RBI, SEBI, FIU)" },
            { code: "ACF-L3-AUD", title: "AML Audits & Compliance Reviews" },
            { code: "ACF-L3-TMS", title: "Transaction Monitoring Systems Design" },
            { code: "ACF-L3-REGTECH", title: "RegTech Architecture & Tools" },
            { code: "ACF-L3-BNK", title: "Complex Banking AML Cases" },
            { code: "ACF-L3-PAY", title: "Advanced Payments Fraud Networks" },
            { code: "ACF-L3-WLT", title: "Wealth Structuring & Layering Risk" },
            { code: "ACF-L3-INV", title: "Financial Crime Investigation Techniques" },
            { code: "ACF-L3-LEA", title: "Working with Law Enforcement Agencies" },
            { code: "ACF-L3-PEP", title: "Politically Exposed Persons Risk" },
            { code: "ACF-L3-SAN", title: "Sanctions Screening & Evasion" },
        ],
    },
    {
        level: "L4",
        badge: "ACF-L4",
        name: "Leadership & Governance",
        credential: "ARIFAC Certified Leader",
        objective: "Strategic oversight, policy, institutional leadership",
        core: { code: "ACF-L4-CORE", title: "AML Governance, Board Oversight & Risk Culture" },
        isAvailable: false,
        addOns: [
            { code: "ACF-L4-RISK", title: "Enterprise AML Risk Framework" },
            { code: "ACF-L4-STRAT", title: "Financial Crime Strategy & Transformation" },
            { code: "ACF-L4-POLICY", title: "Regulatory Engagement & Policy Design" },
            { code: "ACF-L4-GLOB", title: "Global AML Standards (FATF, BIS, IOSCO)" },
            { code: "ACF-L4-CRISIS", title: "Crisis Management & Fraud Response" },
            { code: "ACF-L4-DATA", title: "Data Governance & Privacy at Scale" },
            { code: "ACF-L4-INNOV", title: "Innovation vs Compliance Balance" },
            { code: "ACF-L4-BOARD", title: "Board Reporting & Governance Controls" },
        ],
    },
];

/* ─── Carousel Component ─── */

function AddOnCarousel({ addOns, levelBadge, isAvailable }: { addOns: AddOnCourse[]; levelBadge: string; isAvailable: boolean }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [openAddon, setOpenAddon] = useState<string | null>(null);

    const scroll = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const cardWidth = 220;
        scrollRef.current.scrollBy({ left: dir === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
    };

    return (
        <div className="relative flex-1 min-w-0">
            {/* Scroll buttons */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors -ml-3"
            >
                <ChevronLeft size={14} />
            </button>
            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors -mr-3"
            >
                <ChevronRight size={14} />
            </button>

            {/* Scrollable container */}
            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto scrollbar-hide px-2 py-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {addOns.map((addon) => (
                    <div
                        key={addon.code}
                        className="shrink-0 w-[200px] rounded-xl p-3 flex flex-col border bg-white border-gray-100 hover:border-accent/30 hover:shadow-md transition-all"
                    >
                        <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-accent/70 mb-1.5">{addon.code}</span>
                        <h4 className="text-[12px] font-bold text-[#1d1d1f] leading-snug mb-3 flex-1">{addon.title}</h4>

                        {/* Know More Dropdown */}
                        <div className="rounded-lg overflow-hidden border border-gray-200">
                            <button
                                onClick={() => setOpenAddon(openAddon === addon.code ? null : addon.code)}
                                className="w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] font-bold text-[#1d1d1f] hover:bg-gray-50 transition-colors"
                            >
                                <span>Know More</span>
                                <ChevronDown
                                    size={12}
                                    className={`transition-transform duration-200 text-accent ${openAddon === addon.code ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {openAddon === addon.code && (
                                <div className="px-2.5 pb-2.5 border-t border-gray-100 pt-2 space-y-1.5">
                                    <p className="text-[10px] text-secondary font-medium leading-relaxed">
                                        Domain-specific add-on for {levelBadge} pathway covering {addon.title.toLowerCase()}.
                                    </p>
                                    <div className="flex items-center gap-1.5">
                                        <Lock size={10} className="text-accent/60 shrink-0" />
                                        <span className="text-[10px] font-bold text-accent/70 uppercase tracking-wider">Coming Soon</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Page ─── */

export default function CertificationsPage() {
    const [openKnowMore, setOpenKnowMore] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-36 pb-12 bg-white overflow-hidden">
                <div className="container relative mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-6 block">Professional Growth</span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-[#1d1d1f] tracking-tight mb-8 leading-[1.1]">
                            Elevate Your <span className="bg-gradient-to-r from-[#C2B020] to-[#59626E] text-transparent bg-clip-text">Expertise</span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
                            A comprehensive, multi-level certification program designed to standardize financial integrity expertise across the Indian financial ecosystem.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Framework Features */}
            <section className="py-10 bg-[#f5f5f7] border-y border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                <Award className="text-accent" size={24} />
                            </div>
                            <div className="max-w-xs">
                                <h3 className="text-base font-bold text-[#1d1d1f] mb-2">Recognized Standards</h3>
                                <p className="text-secondary text-sm font-medium leading-relaxed">Aligned with global FATF standards and Indian regulatory requirements.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                <ShieldCheck className="text-accent" size={24} />
                            </div>
                            <div className="max-w-xs">
                                <h3 className="text-base font-bold text-[#1d1d1f] mb-2">Industry Validated</h3>
                                <p className="text-secondary text-sm font-medium leading-relaxed">Curriculum vetted by leading subject matter experts.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                <Zap className="text-accent" size={24} />
                            </div>
                            <div className="max-w-xs">
                                <h3 className="text-base font-bold text-[#1d1d1f] mb-2">Career Growth</h3>
                                <p className="text-secondary text-sm font-medium leading-relaxed">Structured pathway from foundational knowledge to leadership.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Grid — 4 rows, each: Core card + Add-on carousel */}
            <section className="py-14 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col gap-8">
                        {levels.map((lvl, rowIdx) => (
                            <motion.div
                                key={lvl.level}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: rowIdx * 0.08 }}
                                viewport={{ once: true }}
                                className="flex flex-col lg:flex-row gap-4 items-stretch"
                            >
                                {/* ── Column 1: Core Course Card ── */}
                                <div className={`shrink-0 w-full lg:w-[280px] rounded-2xl p-4 flex flex-col border transition-all ${
                                    lvl.isAvailable
                                        ? 'bg-[#f5f5f7] border-gray-100 hover:bg-[#ebebed]'
                                        : 'bg-[#f9f9fb] border-gray-100 opacity-80'
                                }`}>
                                    {/* Badge row */}
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-accent bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm">
                                            {lvl.badge}
                                        </span>
                                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                            lvl.isAvailable ? 'text-green-700 bg-green-50' : 'text-accent bg-accent/10'
                                        }`}>
                                            {lvl.isAvailable ? 'Available' : 'Coming Soon'}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-[15px] font-bold text-[#1d1d1f] mb-1 leading-tight">{lvl.credential}</h3>
                                    <p className="text-[11px] text-secondary font-medium mb-1">{lvl.name} Level</p>
                                    <p className="text-[11px] text-secondary/70 mb-3 leading-relaxed">{lvl.objective}</p>

                                    {/* Know More Dropdown */}
                                    <div className="mb-3 rounded-xl overflow-hidden border border-gray-200 bg-white">
                                        <button
                                            onClick={() => setOpenKnowMore(openKnowMore === lvl.badge ? null : lvl.badge)}
                                            className="w-full flex items-center justify-between px-3 py-2 text-[12px] font-bold text-[#1d1d1f] hover:bg-gray-50 transition-colors"
                                        >
                                            <span>Know More</span>
                                            <ChevronDown
                                                size={14}
                                                className={`transition-transform duration-200 text-accent ${openKnowMore === lvl.badge ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                        {openKnowMore === lvl.badge && (
                                            <div className="px-3 pb-3 border-t border-gray-100 text-[11px] text-secondary space-y-2 pt-2">
                                                <p className="font-medium leading-relaxed">
                                                    This {lvl.name.toLowerCase()}-level certification covers {lvl.core.title.toLowerCase()} with {lvl.addOns.length} domain-specific add-on modules available.
                                                </p>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-lg font-bold text-[#1d1d1f]">₹5,000</span>
                                                    <span className="text-secondary text-[10px] font-bold">+ GST</span>
                                                </div>
                                                <ul className="space-y-1">
                                                    <li className="flex items-start gap-1.5"><CheckCircle2 size={12} className="text-accent shrink-0 mt-0.5" />Self-paced online learning</li>
                                                    <li className="flex items-start gap-1.5"><CheckCircle2 size={12} className="text-accent shrink-0 mt-0.5" />Industry-recognized credential</li>
                                                    <li className="flex items-start gap-1.5"><CheckCircle2 size={12} className="text-accent shrink-0 mt-0.5" />FATF-aligned curriculum</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2 mt-auto">
                                        {lvl.isAvailable ? (
                                            <a
                                                href={lvl.enrollUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#0066cc] text-white rounded-xl font-bold text-[12px] hover:bg-[#0077ed] transition-all"
                                            >
                                                Enroll Now <ChevronRight size={14} />
                                            </a>
                                        ) : (
                                            <div className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gray-100 text-gray-400 font-bold text-[12px]">
                                                <Lock size={14} /> Coming Soon
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* ── Columns 2-4: Add-on Carousel ── */}
                                <div className="flex-1 min-w-0 flex flex-col">
                                    <div className="flex items-center gap-2 mb-2 px-2">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{lvl.badge} Domain Add-Ons</span>
                                        <span className="text-[10px] text-gray-300 font-medium">({lvl.addOns.length} programs)</span>
                                    </div>
                                    <AddOnCarousel addOns={lvl.addOns} levelBadge={lvl.badge} isAvailable={lvl.isAvailable} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
