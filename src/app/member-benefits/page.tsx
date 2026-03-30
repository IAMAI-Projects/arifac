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
    Info,
    AlertCircle
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
        description: "RegTech companies, compliance technology providers, consulting firms, legal and advisory organizations supporting AML/CFT functions.",
        icon: Users,
        color: "from-[#59626E] to-[#8A97A8]"
    },
    {
        title: "Knowledge & Ecosystem Partners",
        description: "Industry associations, academic institutions, research organizations, and ecosystem enablers contributing to financial crime prevention.",
        icon: GraduationCap,
        color: "from-[#1d1d1f] to-[#424245]"
    }
];

const benefits = [
    "Participation in industry consultations and closed-room discussions",
    "Access to AML/CFT training and certification programs",
    "Inclusion in working groups and knowledge forums",
    "Access to typologies, insights, and industry best practices",
    "Ability to nominate employees for training and certification pathways",
    "Access to verification of certified professionals (where applicable)",
    "Pricing discount on Learning Programs"
];

const processSteps = [
    { title: "Submit Application", desc: "Start by submitting your formal membership application." },
    { title: "Review & Approval", desc: "ARIFAC reviews the application for alignment and eligibility." },
    { title: "Onboarding", desc: "Complete necessary formalities and documentation." },
    { title: "Fee Payment", desc: "Payment of the applicable membership fees." },
    { title: "Activation", desc: "Full access to ARIFAC platforms, programs, and forums." }
];

export default function MemberBenefitsPage() {
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
                        <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight tracking-tight mb-6">
                            Membership at <span className="bg-gradient-to-r from-[#C2B020] to-[#59626E] text-transparent bg-clip-text">ARIFAC</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-[#6e6e73] font-medium mb-10 leading-relaxed max-w-3xl">
                            India’s Industry Platform for Financial Crime Prevention
                        </p>

                        <div className="bg-[#f5f5f7] p-8 md:p-10 rounded-[40px] border border-gray-100 mb-12">
                            <p className="text-lg leading-relaxed text-[#1d1d1f] mb-6">
                                ARIFAC (Alliance of Reporting Entities in India for AML/CFT) brings together organizations across India’s financial and digital ecosystem to strengthen capabilities, enable collaboration, and align approaches to financial crime prevention.
                            </p>
                            <p className="text-lg leading-relaxed text-[#1d1d1f] font-medium">
                                Membership is designed for reporting entities and ecosystem stakeholders seeking to engage in industry consultations, capacity building, and knowledge sharing aligned with AML/CFT frameworks.
                            </p>
                        </div>

                        {/* Important Clarification */}
                        <div className="flex items-start gap-4 p-6 bg-amber-50 rounded-3xl border border-amber-100">
                            <Info className="text-[#C2B020] shrink-0 mt-1" size={24} />
                            <div>
                                <h3 className="font-bold text-amber-900 mb-1">Important Clarification</h3>
                                <p className="text-amber-800 leading-relaxed text-sm">
                                    ARIFAC is an industry initiative operated by IAMAI and does not function as a regulator or supervisory authority. Membership does not confer any regulatory status, approval, or compliance certification.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Membership Categories */}
            <section className="py-14 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">Membership Categories</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform`}>
                                    <cat.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{cat.title}</h3>
                                <p className="text-[#6e6e73] leading-relaxed font-medium">{cat.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What Membership Enables */}
            <section className="py-14 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-5">What Membership Enables</h2>
                                <p className="text-lg text-[#6e6e73] mb-6 leading-relaxed">
                                    ARIFAC membership provides access to a structured ecosystem focused on capability building and collaboration:
                                </p>
                                <ul className="space-y-4">
                                    {benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-4 text-[#1d1d1f] font-medium text-lg leading-snug">
                                            <CheckCircle2 className="text-[#C2B020] shrink-0 mt-1" size={24} />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative">
                                <div className="aspect-square bg-gradient-to-br from-[#f5f5f7] to-white rounded-[64px] border border-gray-100 flex items-center justify-center p-12 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C2B020]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                                    <div className="grid grid-cols-2 gap-4 relative z-10 w-full h-full">
                                        {[Shield, Lock, Users, GraduationCap].map((Icon, i) => (
                                            <div key={i} className="bg-white rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-center">
                                                <Icon size={40} className="text-[#59626E]" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Membership Process */}
            <section className="py-14 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Membership Process</h2>
                        <p className="text-lg text-[#6e6e73]">Five simple steps to join India’s premier AML/CFT ecosystem.</p>
                    </div>

                    <div className="max-w-4xl mx-auto relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 hidden md:block" />

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

                        <p className="mt-8 text-center text-[#6e6e73] text-sm italic">
                            Submission of an application does not guarantee membership. Approval is subject to ARIFAC’s review and discretion.
                        </p>
                    </div>
                </div>
            </section>

            {/* Responsibilities & Policies */}
            <section className="py-14 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
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

                        {/* Validity & Fees */}
                        <div className="space-y-8">
                            <div className="p-7 bg-[#f5f5f7] rounded-[32px] border border-gray-100">
                                <div className="flex items-center gap-4 mb-6 text-accent">
                                    <RefreshCw size={28} />
                                    <h3 className="text-2xl font-bold text-[#1d1d1f]">Validity & Renewal</h3>
                                </div>
                                <ul className="space-y-4 text-secondary font-medium">
                                    <li className="flex items-start gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                        <span>Membership is valid for a defined period as specified during onboarding</span>
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

                            <div className="p-7 bg-[#f5f5f7] rounded-[32px] border border-gray-100">
                                <div className="flex items-center gap-4 mb-6 text-accent">
                                    <ClipboardCheck size={28} />
                                    <h3 className="text-2xl font-bold text-[#1d1d1f]">Fees & Participation</h3>
                                </div>
                                <p className="text-secondary font-medium leading-relaxed">
                                    Membership categories and applicable fee structures are published separately and may be updated from time to time. Additional fees may apply for training programs, certifications, and specialized events.
                                </p>
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
                            Join ARIFAC to be part of India’s evolving financial crime prevention ecosystem.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                            <button onClick={() => window.location.href = "/membership/register"} className="px-10 py-5 bg-[#C2B020] hover:bg-[#A3941B] text-[#1d1d1f] font-bold rounded-2xl transition-all flex items-center gap-3 w-full sm:w-auto justify-center">
                                Apply for Membership <ArrowRight size={20} />
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

            {/* Privacy & Disclaimer */}
            <section className="py-14 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm">
                                <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <Lock className="text-[#C2B020]" size={24} /> Data Protection & Consent
                                </h4>
                                <p className="text-[#6e6e73] leading-relaxed font-medium">
                                    By submitting a membership application, you consent to the collection and processing of your information in accordance with ARIFAC’s Privacy Policy and applicable data protection laws.
                                </p>
                            </div>
                            <div className="p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm">
                                <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <AlertCircle className="text-[#C2B020]" size={24} /> Disclaimer
                                </h4>
                                <p className="text-[#6e6e73] leading-relaxed font-medium">
                                    ARIFAC membership is intended for industry collaboration, knowledge sharing, and capacity building. It does not substitute regulatory compliance obligations under applicable laws. ARIFAC does not provide legal or regulatory advice.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
