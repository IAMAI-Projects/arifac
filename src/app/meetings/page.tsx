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
    ArrowRight,
    ShieldCheck,
    Briefcase,
    AlertCircle,
    CheckCircle2,
    MapPin,
    Star,
    Clock,
    ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const programAreas = [
    {
        title: "Industry Consultations",
        icon: <Users className="text-[#C2B020]" size={24} />,
        description: "Addressing emerging financial risks and operational challenges within the AML/CFT",
        details: ["Closed-door roundtables", "Multi-stakeholder consultations", "Thematic discussions on emerging risks", "Sector-specific implementation dialogues"]
    },
    {
        title: "Training & Capacity Building",
        icon: <BookOpen className="text-[#C2B020]" size={24} />,
        description: "Programmes to strengthen internal capabilities across compliance, risk, legal, operations, and business functions.",
        details: ["Foundational and advanced AML/CFT programmes", "Role-based training modules", "Institutional capability-building initiatives", "Continuous learning programmes"]
    },
    {
        title: "Certification & Learning Pathways",
        icon: <ShieldCheck className="text-[#C2B020]" size={24} />,
        description: "Structured learning pathways to build internal expertise and support professional development of AML/CFT teams.",
        details: ["Certification-linked learning programmes", "Role-based progression pathways", "Participation tracking and learning completion", "Integration with ARIFAC learning ecosystem"]
    },
    {
        title: "Working Groups",
        icon: <Briefcase className="text-[#C2B020]" size={24} />,
        description: "Focused forums for collaborative problem-solving and knowledge exchange on specific financial crime prevention themes.",
        details: ["Typologies and emerging risk groups", "Digital onboarding and KYC challenges", "Fraud and transaction monitoring practices", "Reporting and compliance implementation"]
    },
    {
        title: "Knowledge Sessions & Webinars",
        icon: <Video className="text-[#C2B020]" size={24} />,
        description: "Regular sessions bringing together industry experts and practitioners to share insights on evolving risks and trends.",
        details: ["Expert-led webinars", "Thematic briefings", "Sectoral knowledge sessions", "Case-based discussions"]
    },
    {
        title: "Flagship Engagements",
        icon: <Trophy className="text-[#C2B020]" size={24} />,
        description: "Larger ecosystem engagements to enable broader industry participation and collaboration on financial integrity.",
        details: ["National-level summits and forums", "Sector-focused roundtables", "Collaborative industry initiatives", "Multi-stakeholder special programmes"]
    }
];

const upcomingPrograms = [
    {
        type: "SUMMIT", tag: "Flagship Event",
        tagColor: "bg-amber-50 text-amber-700 border-amber-200",
        accentColor: "bg-[#C2B020]",
        title: "N-SAFE: National Summit on Anti-Financial Crime Enforcement",
        description: "An annual summit bringing together regulators, enforcement agencies, financial institutions, and technology providers for policy dialogue, shared intelligence, and coordinated action.",
        date: "6 April 2026", location: "New Delhi",
        theme: "Strengthening India's Financial Ecosystem Against Cyber Fraud",
        edition: "Inaugural Edition",
        cta: { label: "Express Interest", href: "#" }
    },
    {
        type: "TRAINING", tag: "Training Session",
        tagColor: "bg-blue-50 text-blue-700 border-blue-200",
        accentColor: "bg-blue-500",
        title: "OVDs, Digital Verification & V-CIP Enablement",
        description: "Designing Digital KYC Frameworks for Risk-Based and Remote Onboarding.",
        date: "April 2026", location: "", theme: "", edition: "",
        cta: { label: "Register Interest", href: "#" }
    },
    {
        type: "TRAINING", tag: "Training Session",
        tagColor: "bg-blue-50 text-blue-700 border-blue-200",
        accentColor: "bg-blue-500",
        title: "STR Filing and Typologies",
        description: "Comprehensive training on Suspicious Transaction Report filing requirements, methodologies, and common typologies.",
        date: "April 2026", location: "", theme: "", edition: "",
        cta: { label: "Register Interest", href: "#" }
    },
    {
        type: "TRAINING", tag: "Training Session",
        tagColor: "bg-blue-50 text-blue-700 border-blue-200",
        accentColor: "bg-blue-500",
        title: "Cross-Border AML: Managing Risk Across Jurisdictions, Counterparties & Data Flows",
        description: "Strategies and frameworks for managing AML risk across multiple jurisdictions, counterparties, and complex data environments.",
        date: "April 2026", location: "", theme: "", edition: "",
        cta: { label: "Register Interest", href: "#" }
    },
    {
        type: "TRAINING", tag: "Training Session",
        tagColor: "bg-blue-50 text-blue-700 border-blue-200",
        accentColor: "bg-blue-500",
        title: "Strengthening Transparency and Infrastructure in the Derivatives Market",
        description: "Building robust transparency mechanisms and compliance infrastructure within derivatives market operations.",
        date: "May 2026", location: "", theme: "", edition: "",
        cta: { label: "Register Interest", href: "#" }
    },
    {
        type: "TRAINING", tag: "Training Session",
        tagColor: "bg-blue-50 text-blue-700 border-blue-200",
        accentColor: "bg-blue-500",
        title: "CDD and Verification: Customer Due Diligence in Practice",
        description: "Verification, Risk Profiling & Ongoing Monitoring — hands-on guidance for effective customer due diligence frameworks.",
        date: "May 2026", location: "", theme: "", edition: "",
        cta: { label: "Register Interest", href: "#" }
    }
];

const pastPrograms = [
    {
        type: "TRAINING", tag: "Training Session",
        tagColor: "bg-blue-50 text-blue-700 border-blue-200",
        accentColor: "bg-blue-500",
        title: "PMLA Requirements, Screening & Transaction Monitoring for PAs",
        description: "In-depth coverage of PMLA obligations, screening frameworks, and transaction monitoring for Payment Aggregators.",
        date: "22 Jan 2026", location: "",
        cta: { label: "Completed", href: "#" }
    },
    {
        type: "TRAINING", tag: "Training Session",
        tagColor: "bg-blue-50 text-blue-700 border-blue-200",
        accentColor: "bg-blue-500",
        title: "Follow-up Q&A: PMLA Requirements, Screening & Transaction Monitoring for PAs",
        description: "Interactive Q&A addressing practitioner questions on PMLA for Payment Aggregators.",
        date: "27 Jan 2026", location: "",
        cta: { label: "Completed", href: "#" }
    },
    {
        type: "TRAINING", tag: "Training Session",
        tagColor: "bg-blue-50 text-blue-700 border-blue-200",
        accentColor: "bg-blue-500",
        title: "Central KYC Records Registry – Compliance by REs, Issues & Challenges",
        description: "CKYC Registry compliance requirements, implementation issues, and operational challenges for Reporting Entities.",
        date: "30 Jan 2026", location: "",
        cta: { label: "Completed", href: "#" }
    },
    {
        type: "TRAINING", tag: "Training Session",
        tagColor: "bg-blue-50 text-blue-700 border-blue-200",
        accentColor: "bg-blue-500",
        title: "Artificial Intelligence in AML, Fraud Monitoring & Compliance Functions",
        description: "Practical applications of AI and ML in AML transaction monitoring, fraud detection, and compliance automation.",
        date: "20 Feb 2026", location: "",
        cta: { label: "Completed", href: "#" }
    },
    {
        type: "TRAINING", tag: "Training Session",
        tagColor: "bg-blue-50 text-blue-700 border-blue-200",
        accentColor: "bg-blue-500",
        title: "AML and Compliance in Mutual Fund Industry",
        description: "By Sameer Seksarai, Principal Officer, HDFC AMC. Sector-specific AML compliance practices in the mutual fund industry.",
        date: "27 Feb 2026", location: "",
        cta: { label: "Completed", href: "#" }
    }
];

const pastAnnualMeetings = [
    {
        type: "MEETING", tag: "National Chapter Meeting",
        tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        accentColor: "bg-emerald-500",
        title: "5th National Chapter Meeting",
        description: "Hosted by IAMAI",
        date: "December 10, 2025", location: "Mumbai",
        cta: { label: "View Proceedings", href: "#" }
    },
    {
        type: "MEETING", tag: "National Chapter Meeting",
        tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        accentColor: "bg-emerald-500",
        title: "4th National Chapter Meeting",
        description: "Hosted by IAMAI",
        date: "March 07, 2025", location: "Mumbai",
        cta: { label: "View Proceedings", href: "/meetings/minutes-4th-national-arifac-meeting" }
    },
    {
        type: "MEETING", tag: "National Chapter Meeting",
        tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        accentColor: "bg-emerald-500",
        title: "3rd National Chapter Meeting",
        description: "Hosted by Citibank NA India",
        date: "July 24, 2024", location: "Mumbai",
        cta: { label: "View Proceedings", href: "#" }
    },
    {
        type: "MEETING", tag: "National Chapter Meeting",
        tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        accentColor: "bg-emerald-500",
        title: "2nd National Chapter Meeting",
        description: "Hosted by Standard Chartered Bank",
        date: "October 19, 2023", location: "Mumbai",
        cta: { label: "View Proceedings", href: "#" }
    },
    {
        type: "MEETING", tag: "National Chapter Meeting",
        tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        accentColor: "bg-emerald-500",
        title: "Inaugural National Chapter Meeting",
        description: "Hosted by Paytm",
        date: "August 4, 2023", location: "New Delhi",
        cta: { label: "View Proceedings", href: "#" }
    }
].reverse();

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
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 }
};

export default function MeetingsPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#C2B020]/30">
            <Navbar />

            <div className="flex-1 pt-36 pb-8">
                <div className="container mx-auto px-6 space-y-8">

                    {/* Hero */}
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="text-accent text-[14px] font-bold tracking-[0.2em] uppercase mb-3 block font-heading">
                            Strengthening AML/CFT Capabilities
                        </motion.span>
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight tracking-tight text-[#1d1d1f] mb-3">
                            Through Programme-led{' '}
                            <span className="bg-gradient-to-r from-[#C2B020] to-[#8A7B0E] text-transparent bg-clip-text">Engagement</span>
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-lg text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
                            ARIFAC's programmes enable collaboration, capacity building, and regulatory alignment across India's financial and digital ecosystem.
                        </motion.p>
                    </div>

                    {/* Intro */}
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="max-w-4xl mx-auto p-5 bg-[#f5f5f7] rounded-[28px] border border-gray-100/50">
                        <p className="text-[15px] text-secondary leading-relaxed text-center">
                            ARIFAC addresses evolving financial crime risks through consultations, training initiatives, working groups and knowledge-led engagement. It brings together reporting entities, fintech platforms, technology providers, and ecosystem stakeholders to strengthen implementation readiness.
                        </p>
                    </motion.div>

                    {/* Program Areas */}
                    <div>
                        <div className="mb-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] tracking-tight">Diverse engagement formats tailored for ecosystem strengthening</h2>
                        </div>
                        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {programAreas.map((area, idx) => (
                                <motion.div key={idx} variants={itemVariants}
                                    className="group bg-white p-5 rounded-[20px] border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col">
                                    <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] flex items-center justify-center mb-3 group-hover:bg-[#C2B020]/10 transition-colors">
                                        {area.icon}
                                    </div>
                                    <h3 className="text-[15px] font-bold text-[#1d1d1f] mb-1.5 tracking-tight">{area.title}</h3>
                                    <p className="text-secondary text-[13px] font-medium mb-3 leading-relaxed">{area.description}</p>
                                    <div className="mt-auto space-y-1.5">
                                        {area.details.map((detail, dIdx) => (
                                            <div key={dIdx} className="flex items-start gap-2 text-[12px] text-secondary/80 font-medium">
                                                <div className="mt-1.5 w-1 h-1 rounded-full bg-[#C2B020] shrink-0" />
                                                <span>{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Upcoming Programs - Table Format */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1 h-6 bg-[#C2B020] rounded-full" />
                            <h2 className="text-xl font-bold text-[#1d1d1f] tracking-tight">Upcoming Programmes</h2>
                        </div>
                        <div className="overflow-x-auto bg-white rounded-lg border border-gray-100">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[#f5f5f7] border-b border-gray-100">
                                        <th className="px-4 py-3 text-left font-bold text-[#1d1d1f] text-xs uppercase tracking-wide">Programme</th>
                                        <th className="px-4 py-3 text-left font-bold text-[#1d1d1f] text-xs uppercase tracking-wide">Type</th>
                                        <th className="px-4 py-3 text-left font-bold text-[#1d1d1f] text-xs uppercase tracking-wide">Date</th>
                                        <th className="px-4 py-3 text-center font-bold text-[#1d1d1f] text-xs uppercase tracking-wide">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {upcomingPrograms.map((program, idx) => (
                                        <tr key={idx} className="hover:bg-[#f5f5f7] transition-colors">
                                            <td className="px-4 py-3 font-medium text-[#1d1d1f]">{program.title}</td>
                                            <td className="px-4 py-3 text-secondary text-xs font-semibold">{program.tag}</td>
                                            <td className="px-4 py-3 text-secondary font-medium">{program.date}</td>
                                            <td className="px-4 py-3 text-center">
                                                <Link href={program.cta.href} className="text-accent hover:text-[#C2B020] font-bold text-xs">
                                                    Register →
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Past Programs - Table Format */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1 h-6 bg-[#59626E] rounded-full" />
                            <h2 className="text-xl font-bold text-[#1d1d1f] tracking-tight">Past Programmes</h2>
                        </div>
                        <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 mb-6">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[#f5f5f7] border-b border-gray-100">
                                        <th className="px-4 py-3 text-left font-bold text-[#1d1d1f] text-xs uppercase tracking-wide">Programme</th>
                                        <th className="px-4 py-3 text-left font-bold text-[#1d1d1f] text-xs uppercase tracking-wide">Type</th>
                                        <th className="px-4 py-3 text-left font-bold text-[#1d1d1f] text-xs uppercase tracking-wide">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {pastPrograms.slice().reverse().map((program, idx) => (
                                        <tr key={idx} className="hover:bg-[#f5f5f7] transition-colors">
                                            <td className="px-4 py-3 font-medium text-[#1d1d1f]">{program.title}</td>
                                            <td className="px-4 py-3 text-secondary text-xs font-semibold">{program.tag}</td>
                                            <td className="px-4 py-3 text-secondary font-medium">{program.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Annual Meetings - Table Format */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                            <h2 className="text-xl font-bold text-[#1d1d1f] tracking-tight">Annual Meetings</h2>
                        </div>
                        <div className="overflow-x-auto bg-white rounded-lg border border-gray-100">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[#f5f5f7] border-b border-gray-100">
                                        <th className="px-4 py-3 text-left font-bold text-[#1d1d1f] text-xs uppercase tracking-wide">Meeting</th>
                                        <th className="px-4 py-3 text-left font-bold text-[#1d1d1f] text-xs uppercase tracking-wide">Date</th>
                                        <th className="px-4 py-3 text-left font-bold text-[#1d1d1f] text-xs uppercase tracking-wide">Location</th>
                                        <th className="px-4 py-3 text-center font-bold text-[#1d1d1f] text-xs uppercase tracking-wide">Link</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {pastAnnualMeetings.map((program, idx) => (
                                        <tr key={idx} className="hover:bg-[#f5f5f7] transition-colors">
                                            <td className="px-4 py-3 font-medium text-[#1d1d1f]">{program.title}</td>
                                            <td className="px-4 py-3 text-secondary font-medium">{program.date}</td>
                                            <td className="px-4 py-3 text-secondary font-medium">{program.location}</td>
                                            <td className="px-4 py-3 text-center">
                                                <Link href={program.cta.href} className="text-accent hover:text-[#C2B020] font-bold text-xs">
                                                    View →
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </div>

            <Footer />
        </main>
    );
}
