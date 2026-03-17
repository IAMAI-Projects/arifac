"use client";

import { useState } from 'react';
import { CheckCircle2, Clock, BookOpen, ChevronRight, Award, ShieldCheck, Zap } from 'lucide-react';
import { certificationLevels, CertificationLevel } from '@/data/arifac';
import Link from 'next/link';
import { isLoggedIn, hasPaidForCourse } from '@/lib/auth';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SyllabusModal from '@/components/SyllabusModal';
import { motion } from 'framer-motion';

export default function CertificationsPage() {
    const [selectedLevel, setSelectedLevel] = useState<CertificationLevel | null>(null);

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 bg-white overflow-hidden">
                <div className="container relative mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-6 block">Professional Growth</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#1d1d1f] tracking-tight mb-10 leading-[1.05]">
                            Elevate Your <span className="text-secondary">Expertise</span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
                            A comprehensive, multi-level certification program designed to standardize financial integrity expertise across the Indian financial ecosystem.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Framework Features */}
            <section className="py-20 bg-[#f5f5f7] border-y border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
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
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {certificationLevels.map((level, index) => (
                            <motion.div
                                key={level.level}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-[#f5f5f7] rounded-[40px] p-10 flex flex-col hover:bg-[#ebebed] transition-all duration-500 relative group"
                            >
                                {/* Level Badge + Meta */}
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-accent bg-white border border-gray-100 px-5 py-2 rounded-full shadow-sm">
                                        Level {index + 1}
                                    </span>
                                    <div className="flex items-center gap-2 text-secondary text-[12px] font-bold uppercase tracking-wider">
                                        <Clock size={16} />
                                        <span>{level.validity}</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl font-bold text-[#1d1d1f] mb-4 tracking-tight leading-tight">
                                    {level.title}
                                </h3>
                                <p className="text-[15px] text-secondary font-medium mb-8 leading-relaxed">{level.targetAudience}</p>

                                {/* Price Tag */}
                                <div className="mb-10">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-[#1d1d1f]">₹{level.price.toLocaleString()}</span>
                                        <span className="text-secondary text-sm font-bold">+ GST</span>
                                    </div>
                                </div>

                                {/* Feature list */}
                                <ul className="space-y-4 mb-12 flex-1">
                                    {level.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3.5 text-[15px] text-secondary font-medium leading-normal">
                                            <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Actions */}
                                <div className="flex flex-col gap-4 pt-10 border-t border-gray-200">
                                    {isLoggedIn() && hasPaidForCourse(level.level) ? (
                                        <Link
                                            href="/lms/dashboard"
                                            className="w-full flex items-center justify-center gap-2 py-4 bg-[#0066cc] text-white rounded-2xl font-bold text-lg hover:bg-[#0077ed] transition-all"
                                        >
                                            Go to Course <ChevronRight size={20} />
                                        </Link>
                                    ) : level.enrollUrl ? (
                                        <a
                                            href={level.enrollUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 py-4 bg-[#0066cc] text-white rounded-2xl font-bold text-lg hover:bg-[#0077ed] transition-all"
                                        >
                                            Enroll Now <ChevronRight size={20} />
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => setSelectedLevel(level)}
                                            className="w-full flex items-center justify-center gap-2 py-4 bg-[#0066cc] text-white rounded-2xl font-bold text-lg hover:bg-[#0077ed] transition-all"
                                        >
                                            Pre-register Now <ChevronRight size={20} />
                                        </button>
                                    )}

                                    <button
                                        onClick={() => setSelectedLevel(level)}
                                        className="w-full flex items-center justify-center gap-2 py-4 bg-white text-[#1d1d1f] border border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all"
                                    >
                                        <BookOpen size={20} />
                                        View Full Syllabus
                                    </button>
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
