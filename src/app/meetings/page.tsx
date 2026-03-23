'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import {
    Calendar,
    Users,
    BookOpen,
    Trophy,
    MessageSquare,
    Video,
    ExternalLink,
    CheckCircle2,
    ArrowRight,
    Search,
    ShieldCheck,
    Briefcase,
    Globe,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';

const programAreas = [
    {
        title: "Industry Consultations",
        icon: <Users className="text-[#C2B020]" size={24} />,
        description: "ARIFAC facilitates structured consultations and closed-room discussions to address operational challenges, emerging risks, and implementation perspectives under AML/CFT frameworks.",
        details: [
            "Closed-door roundtables",
            "Multi-stakeholder consultations",
            "Thematic discussions on emerging risks",
            "Sector-specific implementation dialogues"
        ]
    },
    {
        title: "Training & Capacity Building",
        icon: <BookOpen className="text-[#C2B020]" size={24} />,
        description: "ARIFAC programs support organizations in strengthening internal capabilities across compliance, risk, legal, operations, and business functions.",
        details: [
            "Foundational and advanced AML/CFT programs",
            "Role-based training modules",
            "Institutional capability-building initiatives",
            "Continuous learning programs"
        ]
    },
    {
        title: "Certification & Learning Pathways",
        icon: <ShieldCheck className="text-[#C2B020]" size={24} />,
        description: "Structured learning pathways enable organizations to build internal expertise and support professional development of teams engaged in AML/CFT functions.",
        details: [
            "Certification-linked learning programs",
            "Role-based progression pathways",
            "Participation tracking and learning completion",
            "Integration with ARIFAC learning ecosystem"
        ]
    },
    {
        title: "Working Groups",
        icon: <Briefcase className="text-[#C2B020]" size={24} />,
        description: "ARIFAC working groups provide focused forums for collaborative problem-solving and knowledge exchange on specific themes within financial crime prevention.",
        details: [
            "Typologies and emerging risk groups",
            "Digital onboarding and KYC challenges",
            "Fraud and transaction monitoring practices",
            "Reporting and compliance implementation discussions"
        ]
    },
    {
        title: "Knowledge Sessions & Webinars",
        icon: <Video className="text-[#C2B020]" size={24} />,
        description: "Regular knowledge sessions bring together industry experts and practitioners to share insights on evolving risks, trends, and operational approaches.",
        details: [
            "Expert-led webinars",
            "Thematic briefings",
            "Sectoral knowledge sessions",
            "Case-based discussions"
        ]
    },
    {
        title: "Flagship Engagements & Special Initiatives",
        icon: <Trophy className="text-[#C2B020]" size={24} />,
        description: "ARIFAC hosts and supports larger ecosystem engagements to enable broader industry participation and collaboration.",
        details: [
            "National-level summits and forums",
            "Sector-focused roundtables",
            "Collaborative industry initiatives",
            "Special projects and multi-stakeholder programs"
        ]
    }
];

const participants = [
    "Banks and NBFCs",
    "Payment Aggregators and fintech platforms",
    "Insurance and capital market entities",
    "Virtual Digital Asset service providers",
    "RegTech and compliance technology providers",
    "Compliance officers, MLROs, risk and legal professionals"
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function MeetingsPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#C2B020]/30">
            <Navbar />

            <div className="flex-1 pt-48 pb-32">
                <div className="container mx-auto px-6">
                    {/* Hero Section */}
                    <div className="max-w-4xl mx-auto mb-24 text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-6 block"
                        >
                            Strengthening AML/CFT Capabilities
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading leading-[1.05] tracking-tight text-[#1d1d1f] mb-10"
                        >
                            Through Structured <br className="hidden md:block" />
                            <span className="bg-gradient-to-r from-[#C2B020] to-[#8A7B0E] text-transparent bg-clip-text">Engagement</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed"
                        >
                            ARIFAC's programs enable collaboration, capacity building, and regulatory alignment across India's financial and digital ecosystem.
                        </motion.p>
                    </div>

                    {/* Intro Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto mb-32 p-10 bg-[#f5f5f7] rounded-[40px] border border-gray-100/50"
                    >
                        <p className="text-lg text-secondary leading-relaxed text-center">
                            Through a combination of consultations, training initiatives, working groups, and knowledge-led engagement,
                            ARIFAC brings together reporting entities, fintech platforms, technology providers, and ecosystem stakeholders
                            to address evolving financial crime risks and strengthen implementation readiness.
                        </p>
                    </motion.div>

                    {/* Program Areas Grid */}
                    <div className="mb-40">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div className="max-w-2xl">
                                <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-4 tracking-tight">Program Areas</h2>
                                <p className="text-lg text-secondary font-medium">Diverse engagement formats tailored for ecosystem strengthening.</p>
                            </div>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {programAreas.map((area, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className="group bg-white p-10 rounded-[32px] border border-gray-100 hover:border-gray-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 flex flex-col h-full"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] flex items-center justify-center mb-8 group-hover:bg-[#C2B020]/10 transition-colors duration-500">
                                        {area.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4 tracking-tight">{area.title}</h3>
                                    <p className="text-secondary font-medium mb-8 leading-relaxed">
                                        {area.description}
                                    </p>
                                    <div className="mt-auto space-y-3">
                                        {area.details.map((detail, dIdx) => (
                                            <div key={dIdx} className="flex items-start gap-3 text-[14px] text-secondary/80 font-medium">
                                                <div className="mt-1.5 w-1 h-1 rounded-full bg-[#C2B020]" />
                                                <span>{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Who Should Participate */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-40 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#1d1d1f] rounded-[48px] p-12 md:p-16 text-white"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">Who Should Participate</h2>
                            <div className="space-y-6">
                                {participants.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 group">
                                        <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#C2B020] group-hover:bg-[#C2B020] transition-all duration-300">
                                            <CheckCircle2 size={14} className="text-white" />
                                        </div>
                                        <span className="text-lg md:text-xl text-white/80 font-medium group-hover:text-white transition-colors">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col justify-center h-full pt-10"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-8 tracking-tight">How to Participate</h2>
                            <p className="text-xl text-secondary font-medium mb-12 leading-relaxed">
                                Participation in ARIFAC programs is available to members, with selected sessions open to invited stakeholders.
                            </p>

                            <div className="space-y-4">
                                <Link href="/registration" className="flex items-center justify-between p-6 bg-[#f5f5f7] rounded-3xl group hover:bg-[#ebebed] transition-all duration-300">
                                    <span className="text-lg font-bold text-[#1d1d1f]">Apply for Membership</span>
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                        <ArrowRight size={20} className="text-accent" />
                                    </div>
                                </Link>
                                <Link href="#" className="flex items-center justify-between p-6 bg-[#f5f5f7] rounded-3xl group hover:bg-[#ebebed] transition-all duration-300">
                                    <span className="text-lg font-bold text-[#1d1d1f]">Explore Training Programs</span>
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                        <ArrowRight size={20} className="text-accent" />
                                    </div>
                                </Link>
                                <a href="mailto:help.arifac@iamai.in" className="flex items-center justify-between p-6 bg-[#f5f5f7] rounded-3xl group hover:bg-[#ebebed] transition-all duration-300">
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-[#1d1d1f]">Contact ARIFAC Secretariat</span>
                                        <span className="text-sm text-secondary font-medium">help.arifac@iamai.in</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                        <MessageSquare size={20} className="text-accent" />
                                    </div>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Upcoming & Past Programs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                        <section className="bg-white rounded-[40px] border border-gray-100 p-10">
                            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-8 flex items-center gap-3">
                                <Calendar className="text-accent" /> Upcoming Programs
                            </h2>
                            <div className="space-y-4">
                                <div className="p-6 bg-[#f5f5f7] rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center py-12 text-center">
                                    <Calendar className="text-gray-400 mb-4" size={32} />
                                    <p className="font-bold text-[#1d1d1f]">To be announced</p>
                                    <p className="text-sm text-secondary">Check back soon for upcoming sessions</p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-[40px] border border-gray-100 p-10">
                            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-8 flex items-center gap-3">
                                <Globe className="text-accent" /> Past Programs
                            </h2>
                            <div className="space-y-4">
                                <div className="p-6 bg-[#f5f5f7] rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center py-12 text-center">
                                    <Search className="text-gray-400 mb-4" size={32} />
                                    <p className="font-bold text-[#1d1d1f]">Coming Soon</p>
                                    <p className="text-sm text-secondary">Historical session archives are being updated</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Note & Disclaimer */}
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="bg-[#f5f5f7] p-8 rounded-[32px] border border-gray-100 flex gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                                <AlertCircle className="text-accent" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1d1d1f] mb-2 uppercase tracking-wider text-xs">Important Note</h4>
                                <p className="text-secondary font-medium text-[15px] leading-relaxed">
                                    Access to specific programs, working groups, training pathways, or consultations may be subject to eligibility, participation criteria, and availability.
                                </p>
                            </div>
                        </div>

                        <div className="p-8 border-t border-gray-100">
                            <h4 className="font-bold text-[#1d1d1f] mb-4 uppercase tracking-wider text-xs text-center">Disclaimer</h4>
                            <p className="text-secondary/60 font-medium text-[13px] leading-relaxed text-center max-w-3xl mx-auto">
                                ARIFAC programs are intended for industry collaboration, knowledge sharing, and capacity building.
                                They do not constitute legal advice, regulatory guidance, or compliance certification.
                                Participants are advised to refer to applicable laws and official regulatory communications for compliance requirements.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
