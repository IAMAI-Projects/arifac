'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { certificationLevels } from '@/data/arifac';

export default function CertificationScrollSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
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

                        <div className="relative h-[400px] w-full border-l-2 border-gray-200 pl-8">
                            {certificationLevels.map((level, index) => {
                                // Dynamic active state based on scroll
                                const rangeStart = index * 0.25;
                                const rangeEnd = (index + 1) * 0.25;

                                return (
                                    <motion.div
                                        key={level.level}
                                        style={{
                                            opacity: useTransform(scrollYProgress, [rangeStart, rangeStart + 0.1, rangeEnd - 0.1, rangeEnd], [0, 1, 1, 0]),
                                            scale: useTransform(scrollYProgress, [rangeStart, rangeStart + 0.1, rangeEnd - 0.1, rangeEnd], [0.95, 1, 1, 0.95]),
                                            x: useTransform(scrollYProgress, [rangeStart, rangeStart + 0.1, rangeEnd - 0.1, rangeEnd], [0, 20, 20, 0]),
                                        }}
                                        className="absolute top-0 left-0 w-full mb-4"
                                    >
                                        <div className="text-6xl font-bold text-gray-100 mb-2">{level.level}</div>
                                        <h3 className="text-2xl font-bold text-primary mb-2">{level.title}</h3>
                                        <div className="h-1 w-20 bg-accent rounded-full" />
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

                            return (
                                <motion.div
                                    key={index}
                                    style={{
                                        opacity: useTransform(scrollYProgress, [rangeStart, rangeStart + 0.1, rangeEnd - 0.1, rangeEnd], [0, 1, 1, 0]),
                                        y: useTransform(scrollYProgress, [rangeStart, rangeStart + 0.1, rangeEnd - 0.1, rangeEnd], [50, 0, 0, -50]),
                                        zIndex: index
                                    }}
                                    className="absolute w-full max-w-lg bg-white border border-gray-200 rounded-2xl p-8 shadow-xl shadow-gray-200/50"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="bg-accent/10 text-accent/80 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-accent/20">
                                            {level.validity} Validity
                                        </span>
                                        {level.isProctored && (
                                            <div className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                                                <ShieldCheck className="w-4 h-4" />
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
                                        <button className="text-sm font-semibold text-primary hover:text-accent transition-colors">
                                            View Syllabus →
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
