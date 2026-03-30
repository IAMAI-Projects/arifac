"use client";

import { useState } from 'react';
import { CheckCircle2, BookOpen, ChevronRight, ChevronDown, Award, ShieldCheck, Zap, Lock } from 'lucide-react';
import { certificationLevels, CertificationLevel } from '@/data/arifac';
import Link from 'next/link';
import { isLoggedIn, hasPaidForCourse } from '@/lib/auth';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SyllabusModal from '@/components/SyllabusModal';
import { motion } from 'framer-motion';

const comingSoonLevels = [
    {
        badge: "ACF-L2",
        title: "ARIFAC Certified Professional (AML/CFT)",
        targetAudience: "Mid-level compliance officers, analysts, and risk professionals.",
    },
    {
        badge: "ACF-L3",
        title: "ARIFAC Certified Specialist (AML/CFT)",
        targetAudience: "Senior compliance officers, MLROs, and team leads.",
    },
    {
        badge: "ACF-L4",
        title: "ARIFAC Certified Expert (AML/CFT)",
        targetAudience: "Chief Compliance Officers, heads of risk, and AML program directors.",
    },
];

const addOnCourses = [
    {
        title: "Mutual Funds & Wealth Management",
        description: "Sector-specific AML/CFT compliance for mutual fund distributors, AMCs, and wealth management firms.",
    },
    {
        title: "Insurance Sector Compliance",
        description: "AML/CFT obligations for life, general, and health insurance entities and intermediaries.",
    },
    {
        title: "Payments & PPIs",
        description: "Compliance frameworks for payment aggregators, PPI issuers, and digital payment service providers.",
    },
    {
        title: "Virtual Digital Assets (VDA)",
        description: "AML/CFT and regulatory compliance for VDA exchanges, custodians, and service providers.",
    },
];

export default function CertificationsPage() {
    const [selectedLevel, setSelectedLevel] = useState<CertificationLevel | null>(null);
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
            <section className="py-12 bg-[#f5f5f7] border-y border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                <Award className="text-accent" size={32} />
                            </div>
                            <div className="max-w-xs">
                                <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">Recognized Standards</h3>
                                <p className="text-secondary font-medium leading-relaxed">Aligned with global FATF standards and Indian regulatory requirements.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                <ShieldCheck className="text-accent" size={32} />
                            </div>
                            <div className="max-w-xs">
                                <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">Industry Validated</h3>
                                <p className="text-secondary font-medium leading-relaxed">Curriculum vetted by leading subject matter experts.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                <Zap className="text-accent" size={32} />
                            </div>
                            <div className="max-w-xs">
                                <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">Career Growth</h3>
                                <p className="text-secondary font-medium leading-relaxed">Structured pathway from foundational knowledge to leadership.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="py-14 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificationLevels.map((level, index) => (
                            <motion.div
                                key={level.level}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-[#f5f5f7] rounded-[24px] p-5 flex flex-col hover:bg-[#ebebed] transition-all duration-300 relative group"
                            >
                                {/* Level Badge */}
                                <div className="flex items-center mb-4">
                                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-accent bg-white border border-gray-100 px-4 py-1.5 rounded-full shadow-sm">
                                        ACF-L{index + 1}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-[#1d1d1f] mb-2 tracking-tight leading-tight">
                                    ARIFAC Certified Associate Programme (AML/CFT)
                                </h3>
                                <p className="text-[13px] text-secondary font-medium mb-4 leading-relaxed">{level.targetAudience}</p>

                                {/* Know More Dropdown */}
                                <div className="mb-4 rounded-2xl overflow-hidden border border-gray-200 bg-white">
                                    <button
                                        onClick={() => setOpenKnowMore(openKnowMore === level.level ? null : level.level)}
                                        className="w-full flex items-center justify-between px-4 py-3 text-[13px] font-bold text-[#1d1d1f] hover:bg-gray-50 transition-colors"
                                    >
                                        <span>Know More</span>
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform duration-200 text-accent ${openKnowMore === level.level ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    {openKnowMore === level.level && (
                                        <div className="px-4 pb-4 border-t border-gray-100">
                                            <div className="pt-3 mb-3">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl font-bold text-[#1d1d1f]">₹{level.price.toLocaleString()}</span>
                                                    <span className="text-secondary text-xs font-bold">+ GST</span>
                                                </div>
                                            </div>
                                            <ul className="space-y-2">
                                                {level.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-2.5 text-[12px] text-secondary font-medium leading-normal">
                                                        <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2 pt-4 border-t border-gray-200 mt-auto">
                                    {isLoggedIn() && hasPaidForCourse(level.level) ? (
                                        <Link
                                            href="/lms/dashboard"
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-[#0066cc] text-white rounded-xl font-bold text-sm hover:bg-[#0077ed] transition-all"
                                        >
                                            Go to Course <ChevronRight size={16} />
                                        </Link>
                                    ) : level.enrollUrl ? (
                                        <a
                                            href={level.enrollUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-[#0066cc] text-white rounded-xl font-bold text-sm hover:bg-[#0077ed] transition-all"
                                        >
                                            Enroll Now <ChevronRight size={16} />
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => setSelectedLevel(level)}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-[#0066cc] text-white rounded-xl font-bold text-sm hover:bg-[#0077ed] transition-all"
                                        >
                                            Pre-register Now <ChevronRight size={16} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setSelectedLevel(level)}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-white text-[#1d1d1f] border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all"
                                    >
                                        <BookOpen size={16} />
                                        View Full Syllabus
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coming Soon Levels */}
            <section className="py-14 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-10">
                        <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-3 block">Coming Soon</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] tracking-tight">Advanced Certification Levels</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {comingSoonLevels.map((level, index) => (
                            <motion.div
                                key={level.badge}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[32px] p-7 flex flex-col border border-gray-100 relative overflow-hidden opacity-80"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#59626E] bg-gray-100 border border-gray-200 px-5 py-2 rounded-full">
                                        {level.badge}
                                    </span>
                                    <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-accent bg-accent/10 px-3 py-1 rounded-full">
                                        Coming Soon
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-[#1d1d1f] mb-3 tracking-tight leading-tight">
                                    {level.title}
                                </h3>
                                <p className="text-[14px] text-secondary font-medium leading-relaxed flex-1">{level.targetAudience}</p>
                                <div className="mt-6 pt-5 border-t border-gray-100">
                                    <div className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-gray-100 text-[#59626E] font-bold text-sm">
                                        <Lock size={16} /> Coming Soon
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Add-On Courses */}
            <section className="py-14 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-10">
                        <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-3 block">Specialized Modules</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] tracking-tight">Add-On Courses</h2>
                        <p className="text-secondary font-medium mt-2 max-w-2xl mx-auto">Domain-specific modules aligned to sector requirements, available as add-ons to your certification pathway.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {addOnCourses.map((course, index) => (
                            <motion.div
                                key={course.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                viewport={{ once: true }}
                                className="bg-[#f5f5f7] rounded-[24px] p-6 flex flex-col border border-gray-100 hover:border-accent/20 hover:shadow-lg transition-all group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm group-hover:bg-accent/10 transition-colors">
                                    <BookOpen size={20} className="text-accent" />
                                </div>
                                <h3 className="text-[15px] font-bold text-[#1d1d1f] mb-2 tracking-tight">{course.title}</h3>
                                <p className="text-[13px] text-secondary font-medium leading-relaxed flex-1">{course.description}</p>
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent">Coming Soon</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Syllabus Modal */}
            <SyllabusModal
                course={selectedLevel}
                onClose={() => setSelectedLevel(null)}
            />

            <Footer />
        </main>
    );
}
