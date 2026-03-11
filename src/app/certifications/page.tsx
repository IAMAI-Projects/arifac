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
        <main className="bg-background min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-white overflow-hidden">
                {/* Premium Background Elements */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <br /><br />
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6">
                            Elevate Your <br />
                            <span className="text-accent">Compliance Expertise</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed font-light">
                            A comprehensive, multi-level certification program designed to standardize financial integrity expertise across the Indian financial ecosystem.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Framework Features */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                                <Award className="text-accent" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-1">Recognized Standards</h3>
                                <p className="text-sm text-gray-500">Aligned with global FATF standards and Indian regulatory requirements.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                                <ShieldCheck className="text-accent" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-1">Industry Validated</h3>
                                <p className="text-sm text-gray-500">Curriculum vetted by subject matter experts.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                                <Zap className="text-accent" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-1">Career Growth</h3>
                                <p className="text-sm text-gray-500">Structured pathway from foundational knowledge to strategic leadership.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {certificationLevels.map((level, index) => (
                            <motion.div
                                key={level.level}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative group"
                            >
                                {/* Level Badge + Meta */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-xs font-bold tracking-widest uppercase text-accent bg-accent/8 border border-accent/20 px-4 py-1.5 rounded-full">
                                        Level {index + 1}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                                        <Clock size={14} />
                                        <span>{level.validity} Validity</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-primary mb-2 leading-tight">
                                    {level.title}
                                </h3>
                                <p className="text-sm text-gray-400 mb-6">{level.targetAudience}</p>

                                {/* Price Tag */}
                                <div className="mb-6">
                                    <span className="text-2xl font-bold text-primary">₹{level.price.toLocaleString()}</span>
                                    <span className="text-gray-400 text-sm ml-1">+ GST</span>
                                </div>

                                {/* Feature list */}
                                <ul className="space-y-3.5 mb-8 flex-1">
                                    {level.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                            <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Actions */}
                                <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
                                    {isLoggedIn() && hasPaidForCourse(level.level) ? (
                                        <Link
                                            href="/lms/dashboard"
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-white rounded-xl font-bold text-sm hover:bg-primary transition-all"
                                        >
                                            Go to Course <ChevronRight size={16} />
                                        </Link>
                                    ) : level.enrollUrl ? (
                                        <a
                                            href={level.enrollUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-accent transition-all"
                                        >
                                            Enroll Now <ChevronRight size={16} />
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => setSelectedLevel(level)}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-accent transition-all animate-pulse-subtle"
                                        >
                                            Pre-register Now <ChevronRight size={16} />
                                        </button>
                                    )}

                                    <button
                                        onClick={() => setSelectedLevel(level)}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all border border-gray-100"
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

            {/* Syllabus Modal */}
            <SyllabusModal
                course={selectedLevel}
                onClose={() => setSelectedLevel(null)}
            />

            <Footer />
        </main>
    );
}
