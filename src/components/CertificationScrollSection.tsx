"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { CheckCircle2, X, BookOpen, Clock } from 'lucide-react';
import { LogoMark } from './Logo';
import { certificationLevels, CertificationLevel } from '@/data/arifac';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isLoggedIn, hasPaidForCourse } from '@/lib/auth';
import SyllabusModal from './SyllabusModal';

export default function CertificationScrollSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedLevel, setSelectedLevel] = useState<CertificationLevel | null>(null);
    const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
    const router = useRouter();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Track which card is currently active based on scroll position
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const newIndex = Math.min(Math.floor(latest * 4), 3);
        setActiveCardIndex(newIndex);
    });

    return (
        <section id="certification" ref={containerRef} className="relative h-[400vh] bg-background">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />

                <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center h-full">
                    {/* Left Side: Static Context */}
                    <div className="hidden lg:block">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                            Professional <br />
                            <span className="text-accent">Certification Framework</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-md">
                            A tiered competency model designed to standardize financial integrity expertise across the national ecosystem.
                        </p>

                        <div className="flex flex-col gap-10 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-4 top-4 bottom-4 w-[2px] bg-gray-100 -z-10" />

                            {certificationLevels.map((level, index) => {
                                const isActive = activeCardIndex === index;

                                return (
                                    <motion.div
                                        key={level.level}
                                        animate={{
                                            opacity: isActive ? 1 : 0.2,
                                            scale: isActive ? 1.05 : 1,
                                            x: isActive ? 10 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="relative pl-12 cursor-pointer group"
                                        onClick={() => {
                                            // Optional: Scroll to that section if we had better control, 
                                            // but for now navigation highlight is enough.
                                        }}
                                    >
                                        {/* Dot on line */}
                                        <motion.div
                                            animate={{
                                                backgroundColor: isActive ? "var(--color-accent, #EAB308)" : "#E5E7EB",
                                                scale: isActive ? 1.5 : 1,
                                                boxShadow: isActive ? "0 0 15px rgba(234, 179, 8, 0.4)" : "none"
                                            }}
                                            className="absolute left-[0.9rem] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-white"
                                        />

                                        <div className={`text-sm font-bold tracking-tight mb-1 transition-colors ${isActive ? 'text-accent' : 'text-gray-400'}`}>
                                            LEVEL {index + 1}
                                        </div>
                                        <h3 className={`text-xl font-bold transition-colors ${isActive ? 'text-primary' : 'text-gray-300'}`}>
                                            {level.title}
                                        </h3>

                                        {isActive && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-full"
                                            />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Side: Scroll Cards */}
                    <div className="w-full relative h-[60vh] flex items-center justify-center">
                        {certificationLevels.map((level, index) => {
                            const rangeStart = index * 0.25;
                            const rangeEnd = (index + 1) * 0.25;
                            const isActive = activeCardIndex === index;

                            // Using tighter fade-in/out and longer "hold" (0.05 instead of 0.1)
                            return (
                                <motion.div
                                    key={index}
                                    style={{
                                        opacity: useTransform(scrollYProgress, [rangeStart, rangeStart + 0.05, rangeEnd - 0.05, rangeEnd], [0, 1, 1, 0]),
                                        y: useTransform(scrollYProgress, [rangeStart, rangeStart + 0.05, rangeEnd - 0.05, rangeEnd], [40, 0, 0, -40]),
                                        scale: useTransform(scrollYProgress, [rangeStart, rangeStart + 0.05, rangeEnd - 0.05, rangeEnd], [0.98, 1, 1, 0.98]),
                                        zIndex: isActive ? 10 : 0,
                                    }}
                                    className={`absolute w-full max-w-lg bg-white border border-gray-200 rounded-2xl p-8 shadow-2xl shadow-gray-200/50 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="bg-accent/10 text-accent/80 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-accent/20">
                                            {level.validity} Validity
                                        </span>
                                        {level.isProctored && (
                                            <div className="flex items-center gap-1.5 text-blue-600/80 text-xs font-medium">
                                                <LogoMark className="w-4 h-4" />
                                                <span>Proctored Exam</span>
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-bold text-primary mb-2">{level.title}</h3>
                                    <p className="text-gray-500 text-sm mb-6">{level.targetAudience}</p>

                                    <div className="space-y-4">
                                        {level.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                                <span className="text-gray-700 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider">Certification Level {index + 1}</div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setSelectedLevel(level)}
                                                className="text-sm font-semibold text-gray-400 hover:text-primary transition-colors cursor-pointer"
                                            >
                                                Syllabus
                                            </button>

                                            {isLoggedIn() && hasPaidForCourse(level.level) ? (
                                                <Link
                                                    href="/lms/dashboard"
                                                    className="text-sm font-bold text-accent hover:text-primary transition-colors flex items-center gap-1"
                                                >
                                                    Go to Course →
                                                </Link>
                                            ) : (
                                                <button
                                                    onClick={() => setSelectedLevel(level)}
                                                    className="text-sm font-semibold text-primary hover:text-accent transition-colors flex items-center gap-1 cursor-pointer"
                                                >
                                                    Enroll Now →
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Syllabus Modal */}
            <SyllabusModal
                course={selectedLevel}
                onClose={() => setSelectedLevel(null)}
            />
        </section>
    );
}
