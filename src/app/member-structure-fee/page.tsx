'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import {
    Shield,
    Users,
    CheckCircle2,
    Lock,
    ArrowRight,
    AlertCircle,
    Banknote,
    TrendingUp,
    CreditCard,
    HeartPulse,
    Globe,
    Zap,
    Building2,
    Database,
    Bitcoin,
    Settings,
    ChevronRight,
    Info,
    ArrowUpRight
} from 'lucide-react';

const membershipData = [
    {
        title: "BANKING",
        icon: Banknote,
        color: "bg-blue-50 text-blue-600",
        slabs: [
            { who: "Scheduled Commercial Banks (Public, Private, Foreign)", basis: "AUM", tier: "Tier 1", range: ">₹1,00,000 Cr", fee: "5,00,000" },
            { who: "Large Co-operative / Regional Banks", basis: "AUM", tier: "Tier 2", range: "₹10,000–1,00,000 Cr", fee: "3,00,000" },
            { who: "Urban Co-operative Banks, Small Finance Banks", basis: "AUM", tier: "Tier 3", range: "₹1,000–10,000 Cr", fee: "1,50,000" },
            { who: "Small Co-op Banks / Local Banks", basis: "AUM", tier: "Tier 4", range: "₹500–1,000 Cr", fee: "50,000" },
            { who: "Very Small / Rural Banks", basis: "AUM", tier: "Tier 5", range: "<₹500 Cr", fee: "25,000" }
        ],
        note: "This ensures inclusion of smaller banks facing cost constraints"
    },
    {
        title: "SECURITIES & CAPITAL MARKETS",
        icon: TrendingUp,
        color: "bg-emerald-50 text-emerald-600",
        slabs: [
            { who: "Stock Exchanges, Clearing Corporations, Depositories", basis: "Scale", tier: "Tier 1", range: "-", fee: "5,00,000" },
            { who: "AMCs, Mutual Funds, AIFs, PMS", basis: "AUM", tier: "Tier 2", range: ">₹10,000 Cr", fee: "3,00,000" },
            { who: "Mid-sized AMCs / Advisors", basis: "AUM", tier: "Tier 3", range: "₹1,000–10,000 Cr", fee: "1,50,000" },
            { who: "Brokers, Depository Participants", basis: "Turnover", tier: "Tier 4", range: "₹25–1,000 Cr", fee: "50,000 – 1,00,000" },
            { who: "Small brokers / research firms", basis: "Turnover", tier: "Tier 5", range: "<₹25 Cr", fee: "25,000" }
        ]
    },
    {
        title: "PAYMENTS, REMITTANCE & FX",
        icon: CreditCard,
        color: "bg-orange-50 text-orange-600",
        slabs: [
            { who: "Large Payment Aggregators / Gateways", basis: "GMV", tier: "Tier 1", range: ">₹5,000 Cr", fee: "5,00,000" },
            { who: "Mid-sized Payment Players", basis: "GMV", tier: "Tier 2", range: "₹500–5,000 Cr", fee: "3,00,000" },
            { who: "PPI Issuers / BC Networks", basis: "Turnover", tier: "Tier 3", range: "₹100–500 Cr", fee: "1,50,000" },
            { who: "Small fintech/payment startups", basis: "Turnover", tier: "Tier 4", range: "₹5–100 Cr", fee: "50,000" },
            { who: "Early-stage / small operators", basis: "Turnover", tier: "Tier 5", range: "<₹5 Cr", fee: "25,000" }
        ]
    },
    {
        title: "INSURANCE",
        icon: HeartPulse,
        color: "bg-red-50 text-red-600",
        slabs: [
            { who: "Life, General, Health, Reinsurers", basis: "Premium / AUM", tier: "Tier 1", range: "-", fee: "5,00,000" },
            { who: "Large Brokers / Corporate Agents", basis: "Turnover", tier: "Tier 2", range: "-", fee: "3,00,000" },
            { who: "Mid-sized intermediaries", basis: "Turnover", tier: "Tier 3", range: "-", fee: "1,50,000" },
            { who: "Small agents / firms", basis: "Turnover", tier: "Tier 4", range: "-", fee: "50,000" },
            { who: "Individual / small advisory entities", basis: "Turnover", tier: "Tier 5", range: "-", fee: "25,000" }
        ]
    },
    {
        title: "NBFCs & MICROFINANCE",
        icon: Globe,
        color: "bg-purple-50 text-purple-600",
        slabs: [
            { who: "Large NBFCs / HFCs", basis: "AUM", tier: "Tier 1", range: ">₹1,00,000 Cr", fee: "5,00,000" },
            { who: "Mid NBFCs", basis: "AUM", tier: "Tier 2", range: "₹10,000–1,00,000 Cr", fee: "3,00,000" },
            { who: "Small NBFCs", basis: "AUM", tier: "Tier 3", range: "₹1,000–10,000 Cr", fee: "1,50,000" },
            { who: "Microfinance Institutions", basis: "AUM", tier: "Tier 4", range: "₹100–1,000 Cr", fee: "50,000" },
            { who: "Small NBFCs / local lenders", basis: "AUM", tier: "Tier 5", range: "<₹100 Cr", fee: "25,000" }
        ]
    },
    {
        title: "FINTECH & DIGITAL FINANCE",
        icon: Zap,
        color: "bg-yellow-50 text-yellow-600",
        slabs: [
            { who: "Large fintech platforms", basis: "GMV / Turnover", tier: "Tier 1", range: ">₹5,000 Cr", fee: "5,00,000" },
            { who: "Growth-stage fintechs", basis: "GMV", tier: "Tier 2", range: "₹500–5,000 Cr", fee: "3,00,000" },
            { who: "Scaling fintech startups", basis: "Turnover", tier: "Tier 3", range: "₹100–500 Cr", fee: "1,50,000" },
            { who: "Early-stage startups", basis: "Turnover", tier: "Tier 4", range: "₹5–100 Cr", fee: "50,000" },
            { who: "Seed-stage / small startups", basis: "Turnover", tier: "Tier 5", range: "<₹5 Cr", fee: "25,000" }
        ]
    },
    {
        title: "DNFBP (REAL ESTATE, BULLION, ETC.)",
        icon: Building2,
        color: "bg-stone-50 text-stone-600",
        slabs: [
            { who: "Large developers / dealers", basis: "Transaction Scale", tier: "Tier 1", range: "-", fee: "5,00,000" },
            { who: "Mid-sized entities", basis: "Turnover", tier: "Tier 2", range: "-", fee: "3,00,000" },
            { who: "Small entities", basis: "Turnover", tier: "Tier 3", range: "-", fee: "1,50,000" },
            { who: "Local operators", basis: "Turnover", tier: "Tier 4", range: "-", fee: "50,000" },
            { who: "Small traders / firms", basis: "Turnover", tier: "Tier 5", range: "-", fee: "25,000" }
        ]
    },
    {
        title: "FIDUCIARY, CUSTODIAL & DATA",
        icon: Database,
        color: "bg-cyan-50 text-cyan-600",
        slabs: [
            { who: "CICs, large custodians", basis: "Asset Scale", tier: "Tier 1", range: "-", fee: "5,00,000" },
            { who: "Trustees / escrow providers", basis: "Asset Scale", tier: "Tier 2", range: "-", fee: "3,00,000" },
            { who: "Mid-sized entities", basis: "Turnover", tier: "Tier 3", range: "-", fee: "1,50,000" },
            { who: "Small service providers", basis: "Turnover", tier: "Tier 4", range: "-", fee: "50,000" },
            { who: "Niche / small firms", basis: "Turnover", tier: "Tier 5", range: "-", fee: "25,000" }
        ]
    },
    {
        title: "VDA ECOSYSTEM",
        icon: Bitcoin,
        color: "bg-indigo-50 text-indigo-600",
        slabs: [
            { who: "Large exchanges / custodians", basis: "Volume", tier: "Tier 1", range: "-", fee: "5,00,000" },
            { who: "Mid-sized platforms", basis: "Volume", tier: "Tier 2", range: "-", fee: "3,00,000" },
            { who: "Growing VDA firms", basis: "Revenue", tier: "Tier 3", range: "-", fee: "1,50,000" },
            { who: "Small platforms", basis: "Revenue", tier: "Tier 4", range: "-", fee: "50,000" },
            { who: "Early-stage entities", basis: "Revenue", tier: "Tier 5", range: "-", fee: "25,000" }
        ]
    },
    {
        title: "AML/CFT TECH & ADVISORY",
        icon: Settings,
        color: "bg-slate-50 text-slate-600",
        slabs: [
            { who: "Large RegTech / global firms", basis: "Turnover", tier: "Tier 1", range: "-", fee: "3,00,000 – 5,00,000" },
            { who: "Mid-sized firms", basis: "Turnover", tier: "Tier 2", range: "-", fee: "1,50,000 – 3,00,000" },
            { who: "Growing firms", basis: "Turnover", tier: "Tier 3", range: "-", fee: "1,00,000" },
            { who: "Small firms", basis: "Turnover", tier: "Tier 4", range: "-", fee: "50,000" },
            { who: "Startups / niche providers", basis: "Turnover", tier: "Tier 5", range: "-", fee: "25,000" }
        ]
    }
];

const benefits = [
    "Participation in industry consultations and closed-room discussions",
    "Access to training and certification programmes",
    "Inclusion in working groups and expert forums",
    "Access to typologies, insights, and knowledge resources",
    "Ability to nominate employees for learning programmes",
    "Membership certificate and recognition"
];

const notes = [
    "Membership is subject to application review and approval",
    "Fee category is determined based on entity type, scale, and regulatory profile",
    "Membership fees are annual and non-refundable",
    "Additional fees may apply for training, certification, and events",
    "Fee slabs may be revised periodically"
];

export default function MemberStructureFeePage() {
    return (
        <main className="min-h-screen bg-white font-sans text-[#1d1d1f]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-36 pb-10 overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight tracking-tight mb-6 mt-10">
                            ARIFAC <span className="bg-gradient-to-r from-[#C2B020] to-[#59626E] text-transparent bg-clip-text">Membership Structure</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-[#6e6e73] font-medium mb-10 leading-relaxed max-w-3xl">
                            India’s Industry Platform for Financial Crime Prevention
                        </p>

                        <div className="bg-[#f5f5f7] p-8 md:p-10 rounded-[40px] border border-gray-100 mb-12">
                            <p className="text-lg leading-relaxed text-[#1d1d1f]">
                                ARIFAC (Alliance of Reporting Entities in India for AML/CFT) offers structured membership to organizations across India’s financial and digital ecosystem to enable collaboration, capacity building, and regulatory alignment in financial crime prevention.
                            </p>
                        </div>

                        {/* Important Clarification */}
                        <div className="flex items-start gap-4 p-6 bg-amber-50 rounded-3xl border border-amber-100 mb-12">
                            <AlertCircle className="text-[#C2B020] shrink-0 mt-1" size={24} />
                            <div>
                                <h3 className="font-bold text-amber-900 mb-1">Important Clarification</h3>
                                <p className="text-amber-800 leading-relaxed text-sm">
                                    ARIFAC is an industry initiative operated by IAMAI and does not function as a regulator or supervisory authority. Membership does not confer any regulatory approval, certification, or compliance status.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Fee Structure Section */}
            <section className="py-14 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Membership Types, Eligibility & Fee Structure</h2>
                        <p className="text-[#6e6e73] font-medium">Categorized by industry segment and operational scale</p>
                    </div>

                    <div className="space-y-10">
                        {membershipData.map((category, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx % 2 * 0.1 }}
                                className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden"
                            >
                                <div className="p-8 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-2xl ${category.color}`}>
                                            <category.icon size={28} />
                                        </div>
                                        <h3 className="text-xl font-bold tracking-tight text-[#1d1d1f]">{category.title}</h3>
                                    </div>
                                    {category.note && (
                                        <span className="text-sm font-medium text-[#C2B020] bg-amber-50 px-4 py-2 rounded-full flex items-center gap-2">
                                            <Info size={16} /> {category.note}
                                        </span>
                                    )}
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                <th className="px-8 py-5 text-sm font-bold text-[#6e6e73] uppercase tracking-wider">Who Can Join</th>
                                                <th className="px-8 py-5 text-sm font-bold text-[#6e6e73] uppercase tracking-wider">Basis</th>
                                                <th className="px-8 py-5 text-sm font-bold text-[#6e6e73] uppercase tracking-wider">Tier</th>
                                                <th className="px-8 py-5 text-sm font-bold text-[#6e6e73] uppercase tracking-wider">Range / Scale</th>
                                                <th className="px-8 py-5 text-sm font-bold text-[#6e6e73] uppercase tracking-wider text-right">Annual Fee (₹)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {category.slabs.map((slab, sIdx) => (
                                                <tr key={sIdx} className="hover:bg-gray-50/30 transition-colors">
                                                    <td className="px-8 py-6 font-medium text-[#1d1d1f] max-w-md">{slab.who}</td>
                                                    <td className="px-8 py-6 font-medium text-[#6e6e73]">{slab.basis}</td>
                                                    <td className="px-8 py-6">
                                                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-[#59626E]">
                                                            {slab.tier}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-[#6e6e73] font-medium">{slab.range}</td>
                                                    <td className="px-8 py-6 font-bold text-[#1d1d1f] text-right">
                                                        {slab.fee !== "-" ? slab.fee : "TBD"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What Membership Includes */}
            <section className="py-14 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-5">What Membership Includes</h2>
                                <p className="text-lg text-[#6e6e73] mb-6 leading-relaxed">
                                    Becoming part of ARIFAC grants access to a variety of resources and platforms designed for industry leadership:
                                </p>
                                <div className="grid sm:grid-cols-1 gap-4">
                                    {benefits.map((benefit, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-4 p-4 rounded-2xl border border-gray-50 hover:border-amber-100 hover:bg-amber-50/30 transition-all group"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center group-hover:bg-[#C2B020] transition-colors">
                                                <CheckCircle2 className="text-[#C2B020] group-hover:text-white transition-colors" size={18} />
                                            </div>
                                            <span className="text-[#1d1d1f] font-medium pt-1">{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-square bg-gradient-to-br from-[#f5f5f7] to-white rounded-[64px] border border-gray-100 flex items-center justify-center p-12 overflow-hidden shadow-inner">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C2B020]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
                                    <div className="grid grid-cols-2 gap-6 relative z-10 w-full">
                                        {[Shield, Users, Lock, ChevronRight].map((Icon, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ scale: 1.05, rotate: 2 }}
                                                className="bg-white rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center justify-center p-8 aspect-square"
                                            >
                                                <Icon size={48} className="text-[#C2B020] mb-4" />
                                                <div className="h-2 w-12 bg-gray-100 rounded-full" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Important Notes */}
            <section className="py-14 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="p-8 md:p-10 bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8">
                                <Info size={40} className="text-gray-100" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6">Important Notes</h2>
                            <ul className="space-y-4">
                                {notes.map((note, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-[#C2B020]/10 flex items-center justify-center mt-1 shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-[#C2B020]" />
                                        </div>
                                        <p className="text-lg font-medium text-[#59626E] leading-relaxed">{note}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 p-6 bg-amber-50 rounded-[28px] border border-amber-100">
                                <h4 className="text-xl font-bold text-amber-900 mb-4">Not Sure Which Category Applies?</h4>
                                <p className="text-amber-800 leading-relaxed font-medium">
                                    Submit your application and ARIFAC will determine the appropriate membership category and fee slab during the review process.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-14 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-5xl mx-auto bg-gradient-to-br from-[#1d1d1f] to-[#424245] p-8 md:p-14 rounded-[48px] text-white shadow-2xl relative overflow-hidden text-center"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(194,176,32,0.15),transparent)] pointer-events-none" />

                        <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">Ready to Join ARIFAC?</h2>
                        <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto font-medium">
                            Join the alliance of India's reporting entities and take a lead in financial crime prevention.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                            <button className="px-12 py-6 bg-[#C2B020] hover:bg-[#A3941B] text-[#1d1d1f] font-bold rounded-2xl transition-all flex items-center gap-3 w-full sm:w-auto justify-center text-lg hover:translate-y-[-2px] shadow-lg shadow-amber-900/20">
                                Apply for Membership <ArrowRight size={24} />
                            </button>
                            <button className="px-12 py-6 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all flex items-center gap-3 w-full sm:w-auto justify-center text-lg hover:translate-y-[-2px]">
                                Request Fee Details <ArrowUpRight size={24} />
                            </button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
                            <div className="text-center">
                                <p className="text-white/40 mb-2 uppercase tracking-widest text-xs font-bold">Contact ARIFAC Secretariat</p>
                                <a href="mailto:help.arifac@iamai.in" className="text-2xl md:text-3xl font-bold hover:text-[#C2B020] transition-colors flex items-center gap-4">
                                    <Globe className="text-[#C2B020]" size={32} /> help.arifac@iamai.in
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Disclaimer */}
            <section className="py-16 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-[#6e6e73] text-sm leading-relaxed font-medium italic">
                            Disclaimer: ARIFAC membership is intended for industry collaboration, knowledge sharing, and capacity building. It does not substitute regulatory compliance obligations under applicable laws. ARIFAC does not provide legal or regulatory advice.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

