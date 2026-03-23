'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Quote, Target, Award, Users, Shield, Globe, ArrowRight, GraduationCap, Lightbulb, Handshake } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-48 pb-24 bg-white overflow-hidden">
                <div className="container relative mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading leading-[1.1] tracking-tight text-[#1d1d1f] mb-8">
                            About <span className="bg-gradient-to-r from-[#C2B020] to-[#59626E] text-transparent bg-clip-text">ARIFAC</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed mb-12">
                            India's Industry Platform for Financial Crime Prevention
                        </p>

                        <div className="max-w-3xl mx-auto text-lg text-secondary leading-relaxed bg-[#f5f5f7]/50 p-8 rounded-[32px] border border-gray-100">
                            <p className="mb-6">
                                ARIFAC (Alliance of Reporting Entities in India for AML/CFT) is an industry-led initiative operated by the Internet and Mobile Association of India (IAMAI), working in alignment with India's financial intelligence and AML/CFT framework.
                            </p>
                            <p className="font-semibold text-[#1d1d1f]">
                                ARIFAC serves as a national platform to enable collaboration, capacity building, and regulatory alignment across reporting entities, financial institutions, fintech platforms, and ecosystem stakeholders to strengthen financial crime prevention in India.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why ARIFAC Section */}
            <section className="py-24 bg-[#f5f5f7] relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 gap-16 items-center"
                        >
                            <div>
                                <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-[0.2em] text-[12px] mb-8">
                                    <Target size={18} /> Why ARIFAC
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-8 leading-tight">
                                    Adapting to India's Evolving Digital Financial Ecosystem
                                </h2>
                                <div className="space-y-6 text-lg text-secondary leading-relaxed">
                                    <p>
                                        India's rapidly evolving digital financial ecosystem—driven by real-time payments, digital onboarding, and platform-led services—has significantly expanded both opportunity and risk.
                                    </p>
                                    <p>
                                        The increasing scale and sophistication of financial crime, including cyber fraud, mule account networks, identity misuse, and platform abuse, require a coordinated industry response aligned with:
                                    </p>
                                </div>
                                <ul className="mt-8 space-y-4">
                                    {[
                                        "The Prevention of Money Laundering Act (PMLA)",
                                        "Reporting requirements under FIU-IND",
                                        "Global standards such as the Financial Action Task Force (FATF)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-[#1d1d1f] font-semibold">
                                            <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white p-12 rounded-[48px] border border-gray-100 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                                <p className="text-xl font-medium text-[#1d1d1f] leading-relaxed relative z-10">
                                    ARIFAC has been established to provide a structured platform for industry stakeholders to collectively strengthen readiness, share insights, and address emerging risks.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-4">Core Pillars of ARIFAC</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Capacity Building",
                                    desc: "Strengthening AML/CFT capabilities through structured learning programs, certification pathways, and role-based training for compliance and risk professionals.",
                                    icon: GraduationCap
                                },
                                {
                                    title: "Industry Collaboration",
                                    desc: "Enabling closed-room consultations, knowledge sharing, and multi-stakeholder engagement to address operational challenges and emerging financial crime risks.",
                                    icon: Users
                                },
                                {
                                    title: "Regulatory Alignment",
                                    desc: "Facilitating industry understanding of regulatory frameworks and supporting consistent interpretation of AML/CFT requirements under Indian and global standards.",
                                    icon: Shield
                                }
                            ].map((pillar, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-10 rounded-[40px] bg-[#f5f5f7] border border-transparent hover:border-accent/10 transition-all hover:shadow-xl group"
                                >
                                    <div className="w-14 h-14 rounded-[20px] bg-white flex items-center justify-center text-accent mb-8 shadow-sm group-hover:scale-110 transition-transform">
                                        <pillar.icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1d1d1f] mb-4">{pillar.title}</h3>
                                    <p className="text-secondary leading-relaxed font-medium">{pillar.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What ARIFAC Does */}
            <section className="py-24 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-6">What ARIFAC Does</h2>
                            <p className="text-xl text-secondary max-w-2xl mx-auto">
                                ARIFAC operates as a collaborative platform focused on enabling industry-wide capability and coordination:
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    title: "Industry Engagement & Consultations",
                                    icon: Globe,
                                    items: [
                                        "Closed-door roundtables",
                                        "Stakeholder engagement across financial and digital ecosystems",
                                        "Address Emerging risks, typologies, and implementation challenges"
                                    ]
                                },
                                {
                                    title: "Training & Certification",
                                    icon: Award,
                                    items: [
                                        "AML/CFT learning programs",
                                        "Certification and continuous professional development pathways",
                                        "Role-based training aligned to compliance and operational functions"
                                    ]
                                },
                                {
                                    title: "Knowledge & Typologies",
                                    icon: Lightbulb,
                                    items: [
                                        "Sharing of financial crime typologies and case-based insights",
                                        "Development of industry knowledge resources",
                                        "Dissemination of best practices across sectors"
                                    ]
                                },
                                {
                                    title: "Ecosystem Coordination",
                                    icon: Handshake,
                                    items: [
                                        "Engagement across banks, fintechs, payment systems, VDAs and intermediaries",
                                        "Cross-sector collaboration including financial services, telecom, and digital platforms",
                                        "Support for collective response to systemic risks"
                                    ]
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm"
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center text-accent">
                                            <item.icon size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1d1d1f]">{item.title}</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {item.items.map((li, j) => (
                                            <li key={j} className="flex items-start gap-4 text-secondary leading-relaxed font-medium">
                                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                                {li}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Framework & Who Should Engage */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-20">
                            <div>
                                <h2 className="text-3xl font-bold text-[#1d1d1f] mb-8">ARIFAC Framework</h2>
                                <div className="space-y-6 text-lg text-secondary leading-relaxed bg-[#f5f5f7] p-10 rounded-[40px]">
                                    <p>
                                        ARIFAC operates under the aegis of the Internet and Mobile Association of India (IAMAI), which serves as its secretariat.
                                    </p>
                                    <p>
                                        The platform works in alignment with India's financial intelligence ecosystem and supports industry readiness in implementing AML/CFT obligations under the PMLA and related regulatory frameworks.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-[#1d1d1f] mb-8">Who Should Engage</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        "Banks and NBFCs",
                                        "Payment Aggregators & PSPs",
                                        "Fintech Platforms",
                                        "Virtual Asset Providers (VASPs)",
                                        "PMLA Intermediaries",
                                        "Compliance Officers & MLROs",
                                        "Risk Professionals",
                                        "Investigators"
                                    ].map((stakeholder, i) => (
                                        <div key={i} className="px-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-accent" />
                                            <span className="font-bold text-[#1d1d1f] text-[15px]">{stakeholder}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing Statement */}
            <section className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-primary text-white p-12 md:p-20 rounded-[48px] md:rounded-[64px] shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(194,176,32,0.15),transparent)] pointer-events-none" />
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                                Building a Trusted Financial Ecosystem
                            </h2>
                            <p className="text-xl text-white/80 leading-relaxed mb-10 font-medium">
                                ARIFAC enables stakeholders to come together to strengthen capabilities, share knowledge, and align approaches to financial crime prevention.
                            </p>
                            <div className="h-px bg-white/20 mb-10" />
                            <p className="text-lg text-white/90 font-bold leading-relaxed">
                                Through collaboration, capacity building, and regulatory alignment, ARIFAC contributes to building a more resilient, compliant, and trusted financial system in India.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Disclaimer Section */}
            <section className="py-24 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="p-10 md:p-16 rounded-[48px] bg-white border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-8">Disclaimer</h2>
                            <div className="space-y-6 text-secondary font-medium leading-relaxed">
                                <p>
                                    ARIFAC is an industry initiative operated by IAMAI and does not function as a regulator, supervisory authority, or enforcement agency. Participation in ARIFAC programs does not constitute regulatory approval or compliance certification. Users are advised to refer to applicable laws and official regulatory guidance for compliance requirements.
                                </p>
                                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-4">
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                            <span>ARIFAC does not function as a regulator or supervisory authority</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                            <span>ARIFAC does not grant licenses, approvals, or compliance certifications</span>
                                        </li>
                                    </ul>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-4">
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                            <span>ARIFAC does not act on behalf of FIU-IND or any government authority</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                            <span>Participation in ARIFAC programs does not substitute regulatory compliance obligations</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

