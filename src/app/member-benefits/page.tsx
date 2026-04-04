'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import {
    Shield,
    Users,
    GraduationCap,
    CheckCircle2,
    ClipboardCheck,
    Lock,
    RefreshCw,
    FileText,
    Download,
    Mail,
    ArrowRight,
} from 'lucide-react';

const categories = [
    {
        title: "Institutional Members",
        description: "Banks, NBFCs, Payment Aggregators, Payment Service Providers, Fintech Platforms, Insurance Companies, Capital Market Intermediaries, and other regulated entities.",
        icon: Shield,
        color: "from-[#C2B020] to-[#E5D24D]"
    },
    {
        title: "Associate Members",
        description: "RegTech companies, compliance technology providers, consulting firms, legal and advisory organisations supporting AML/CFT functions.",
        icon: Users,
        color: "from-[#59626E] to-[#8A97A8]"
    },
    {
        title: "Knowledge & Ecosystem Partners",
        description: "Industry associations, academic institutions, research organisations, and ecosystem enablers contributing to financial crime prevention.",
        icon: GraduationCap,
        color: "from-[#1d1d1f] to-[#424245]"
    }
];

const benefits = [
    {
        category: "Engagement & Governance",
        color: "bg-blue-50 text-blue-600",
        items: [
            { title: "Regulatory Engagement", description: "Direct participation in consultations, policy dialogues, and expert forums alongside regulators and policymakers." },
            { title: "Governance Participation", description: "Full voting rights within ARIFAC — eligible to elect and be elected to the Steering Committee and Working Groups." },
            { title: "Closed-Door Interactions", description: "Exclusive access to policy and regulatory closed-room sessions, structured by domain." }
        ]
    },
    {
        category: "Learning & Capacity",
        color: "bg-amber-50 text-amber-600",
        items: [
            { title: "Training & Certification", description: "Access to L1–L5 certification programmes at preferential member pricing." },
            { title: "Workshops & Masterclasses", description: "Full access to advanced sessions led by practitioners and subject matter experts." },
            { title: "Webinars & Awareness", description: "Unrestricted access to all webinars and awareness sessions." }
        ]
    },
    {
        category: "Intelligence & Research",
        color: "bg-emerald-50 text-emerald-600",
        items: [
            { title: "Knowledge & Intelligence", description: "Comprehensive access to typologies, case studies, learnings, and risk intelligence curated for the industry." },
            { title: "Typology & Risk Alerts", description: "Real-time FIU-driven insights and alerts to stay ahead of emerging risks." },
            { title: "Reports", description: "Full access to all ARIFAC published reports." },
            { title: "Participation in Reports", description: "Preferential inclusion in whitepapers, industry reports, and key ecosystem initiatives." }
        ]
    },
    {
        category: "Ecosystem & Visibility",
        color: "bg-purple-50 text-purple-600",
        items: [
            { title: "Events & Summits", description: "Participation and speaking opportunities at ARIFAC, IAMAI, PCI and FCC- organised summits (Eg: N-SAFE and GFF)" },
            { title: "Ecosystem Directory", description: "Full access to the directory of member institutions and certified professionals." },
            { title: "Brand Visibility", description: "Recognised as an ARIFAC Member across the website and all publications." }
        ]
    }
];

const processSteps = [
    { title: "Submit Application", desc: "Start by submitting your formal membership application." },
    { title: "Review & Approval", desc: "ARIFAC reviews the application for alignment and eligibility." },
    { title: "Onboarding", desc: "Complete necessary formalities and documentation." },
    { title: "Fee Payment", desc: "Payment of the applicable membership fees." },
    { title: "Activation", desc: "Full access to ARIFAC platforms, programmes, and forums." }
];

export default function MemberBenefitsPage() {
    return (
        <main className="min-h-screen bg-white font-sans text-[#1d1d1f]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-36 pb-4 overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight tracking-tight mb-6">
                            Membership at <span className="bg-gradient-to-r from-[#C2B020] to-[#59626E] text-transparent bg-clip-text">ARIFAC</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-[#6e6e73] font-medium mb-10 leading-relaxed max-w-3xl text-center mx-auto">
                            India’s Industry Platform for Financial Crime Prevention
                        </p>

                        <div className="bg-[#f5f5f7] p-8 md:p-10 rounded-[40px] border border-gray-100 mb-4">
                            <p className="text-lg leading-relaxed text-[#1d1d1f]">
                                Membership is designed for reporting entities and stakeholders in India’s digital and financial ecosystem seeking to engage in industry consultations, capacity building, and knowledge sharing aligned with AML/CFT frameworks.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What Membership Enables */}
            <section className="py-10 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">What Membership Enables</h2>
                            <p className="text-xl text-[#6e6e73] max-w-3xl mx-auto leading-relaxed">
                                A focused approach to capacity building and collaboration across the financial intelligence ecosystem.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {benefits.map((group, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-[#f5f5f7] rounded-[40px] p-8 md:p-10 border border-gray-100 flex flex-col h-full"
                                >
                                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-4">
                                        <span className={`w-2 h-8 rounded-full ${group.color.split(' ')[1].replace('text-', 'bg-')}`} />
                                        {group.category}
                                    </h3>

                                    <div className="space-y-8 flex-grow">
                                        {group.items.map((item, j) => (
                                            <div key={j} className="flex gap-4 group/item">
                                                <div className="mt-1">
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${group.color}`}>
                                                        <CheckCircle2 size={16} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg text-[#1d1d1f] mb-1 group-hover/item:text-[#C2B020] transition-colors">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-[#6e6e73] text-sm leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* Membership Process */}
            {/* <section className="py-14 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Membership Process</h2>
                        <p className="text-lg text-[#6e6e73]">Five simple steps to join India’s premier AML/CFT ecosystem.</p>
                    </div>

                    <div className="max-w-4xl mx-auto relative">
                        <div className="grid md:grid-cols-5 gap-8 relative z-10">
                            {processSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-12 h-12 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center font-bold text-lg mb-4 shadow-lg">
                                        {i + 1}
                                    </div>
                                    <h4 className="font-bold text-center mb-2">{step.title}</h4>
                                    <p className="text-xs text-[#6e6e73] text-center leading-relaxed px-2">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </section> */}

            {/* Responsibilities & Policies */}
            <section className="py-14 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto space-y-10">

                        {/* Row 1: Responsibilities + Validity */}
                        <div className="grid lg:grid-cols-2 gap-10">
                            {/* Responsibilities */}
                            <div className="bg-primary text-white p-10 md:p-12 rounded-[48px] shadow-xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(194,176,32,0.1),transparent)] pointer-events-none" />
                                <h2 className="text-3xl font-bold mb-8">Member Responsibilities</h2>
                                <p className="text-white/80 mb-8 font-medium">Members are expected to maintain the highest standards of integrity, professionalism, and compliance:</p>
                                <ul className="space-y-6 mb-10">
                                    {[
                                        "Maintain confidentiality of discussions and shared information",
                                        "Ensure compliance with applicable AML/CFT laws and regulatory obligations",
                                        "Avoid misuse of ARIFAC platforms, forums, or affiliation",
                                        "Act in good faith and contribute constructively to industry discussions"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <CheckCircle2 className="text-[#C2B020] shrink-0 mt-1" size={20} />
                                            <span className="text-white/90 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                    <p className="text-sm text-white/70 italic">
                                        Members must not disclose sensitive regulatory or transaction-related information, including Suspicious Transaction Reporting (STR)-related discussions or any confidential compliance data.
                                    </p>
                                </div>
                            </div>

                            {/* Validity & Renewal */}
                            <div className="p-8 bg-[#f5f5f7] rounded-[40px] border border-gray-100 flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-6 text-accent">
                                    <RefreshCw size={28} />
                                    <h3 className="text-2xl font-bold text-[#1d1d1f]">Validity & Renewal</h3>
                                </div>
                                <ul className="space-y-4 text-secondary font-medium">
                                    <li className="flex items-start gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                        <span>Membership is valid for a year from the date of onboarding and will be renewed annually</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                        <span>Membership is subject to renewal in accordance with ARIFAC policies</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                        <span>Access may be restricted upon expiry until renewal is completed</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Row 2: Fees — full width */}
                        <div className="p-8 bg-[#f5f5f7] rounded-[40px] border border-gray-100">
                            <div className="flex items-center gap-4 mb-4 text-accent">
                                <ClipboardCheck size={28} />
                                <h3 className="text-2xl font-bold text-[#1d1d1f]">Fees</h3>
                            </div>
                            <p className="text-secondary text-sm font-medium leading-relaxed mb-6">
                                Membership fees are determined by your organisation&apos;s self-declared annual turnover or Assets Under Management (AUM), as applicable. All fees are exclusive of taxes and subject to revision.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Turnover Table */}
                                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                                    <div className="grid grid-cols-2 bg-[#1d1d1f] text-white text-[11px] font-bold uppercase tracking-wider px-5 py-3">
                                        <span>Turnover ₹</span>
                                        <span>Annual Fee</span>
                                    </div>
                                    {[
                                        ['Up to 5 Cr', '₹25,000 + taxes'],
                                        ['5–25 Cr', '₹50,000 + taxes'],
                                        ['25–100 Cr', '₹1,00,000 + taxes'],
                                        ['100–500 Cr', '₹1,50,000 + taxes'],
                                        ['500–2,000 Cr', '₹3,00,000 + taxes'],
                                        ['Above 2,000 Cr', '₹5,00,000 + taxes'],
                                    ].map(([range, fee], i) => (
                                        <div key={i} className={`grid grid-cols-2 px-5 py-3 text-[13px] font-medium border-b border-gray-50 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}>
                                            <span className="text-[#1d1d1f]">{range}</span>
                                            <span className="text-accent font-bold">{fee}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* AUM Table */}
                                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                                    <div className="grid grid-cols-2 bg-[#C2B020] text-[#1d1d1f] text-[11px] font-bold uppercase tracking-wider px-5 py-3">
                                        <span>AUM ₹</span>
                                        <span>Annual Fee</span>
                                    </div>
                                    {[
                                        ['Up to 500 Cr', '₹25,000 + taxes'],
                                        ['500–1,000 Cr', '₹50,000 + taxes'],
                                        ['1,000–10,000 Cr', '₹1,00,000 + taxes'],
                                        ['10,000–50,000 Cr', '₹1,50,000 + taxes'],
                                        ['50,000–1,00,000 Cr', '₹3,00,000 + taxes'],
                                        ['Above 1,00,000 Cr', '₹5,00,000 + taxes'],
                                    ].map(([range, fee], i) => (
                                        <div key={i} className={`grid grid-cols-2 px-5 py-3 text-[13px] font-medium border-b border-gray-50 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}>
                                            <span className="text-[#1d1d1f]">{range}</span>
                                            <span className="text-accent font-bold">{fee}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 px-6 py-4 bg-[#C2B020]/10 border border-[#C2B020]/30 rounded-2xl text-[13px] font-bold text-[#1d1d1f] text-center">
                                ARIFAC membership is complimentary for all IBA and IAMAI members.
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto bg-gradient-to-br from-[#1d1d1f] to-[#424245] p-8 md:p-12 rounded-[48px] text-white shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(194,176,32,0.1),transparent)] pointer-events-none" />

                        <h2 className="text-2xl md:text-4xl font-bold mb-6">Apply for Membership</h2>
                        <p className="text-xl text-white/80 mb-12 max-w-xl mx-auto">
                            Join ARIFAC to be a part of India’s evolving financial crime prevention ecosystem.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                            <button onClick={() => window.location.href = "/membership/launching-soon"} className="px-10 py-5 bg-[#C2B020] hover:bg-[#A3941B] text-[#1d1d1f] font-bold rounded-2xl transition-all flex items-center gap-3 w-full sm:w-auto justify-center">
                                Proceed to become a member <ArrowRight size={20} />
                            </button>

                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center gap-4">
                            <p className="text-white/60">Contact ARIFAC Secretariat</p>
                            <a href="mailto:help.arifac@iamai.in" className="flex items-center gap-3 text-xl font-bold hover:text-[#C2B020] transition-colors">
                                <Mail size={24} className="text-[#C2B020]" /> help.arifac@iamai.in
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* End-of-page notices */}
            <section className="py-8 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-xs text-[#6e6e73]">
                        <p><strong>Important Clarification:</strong> Submission of an application does not guarantee membership. Approval is subject to ARIFAC’s review and discretion. Additionally, ARIFAC does not function as a regulatory or supervisory authority, hence membership does not confer any regulatory status, approval, or compliance certification.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
