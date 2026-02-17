'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, ShieldCheck, FileText, Users, Building2 } from 'lucide-react';
import { useRef } from 'react';

export default function HeroSection() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

    const stats = [
        { label: "Reporting Entities", value: "500+", icon: Building2 },
        { label: "Certified Professionals", value: "2,500+", icon: Users },
        { label: "Regulatory Modules", value: "12", icon: FileText },
    ];

    return (
        <section ref={targetRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-white">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
            />

            {/* Floating Abstract Element - Compliance Shield */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 right-[10%] hidden lg:block pointer-events-none opacity-40 grayscale"
            >
                <ShieldCheck className="w-32 h-32 text-gray-200" strokeWidth={0.5} />
            </motion.div>

            <div className="container relative z-10 px-6 pt-20 text-center">
                <motion.div
                    style={{ opacity, scale, y }}
                    className="flex flex-col items-center gap-8 max-w-5xl mx-auto"
                >
                    {/* Animated Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 shadow-sm backdrop-blur-md"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                        </span>
                        <span className="text-xs font-bold tracking-widest uppercase text-gray-600">
                            India's National Compliance Platform
                        </span>
                    </motion.div>

                    {/* Main Heading with Gradient and Stagger */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-6xl md:text-7xl lg:text-8xl font-bold font-heading leading-[1.05] tracking-tight text-primary"
                    >
                        Advancing India’s <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-gray-600 to-primary animate-gradient-x bg-[length:200%_auto]">
                            Financial Integrity
                        </span> <br />
                        Architecture
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg md:text-xl text-gray-600 max-w-4xl font-light leading-relaxed bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-sm"
                    >
                        <span className="font-semibold text-primary">Alliance of Reporting Entities in India for AML/CFT (ARIFAC)</span> has been conceptualized as a <span className="text-accent font-medium">first-of-its-kind</span>, <span className="text-primary font-medium">private-private partnership</span> initiative amongst reporting entities in India belonging to multiple sectors to facilitate <span className="highlight-text bg-accent/10 px-1 rounded">information sharing</span>, development of <span className="highlight-text bg-accent/10 px-1 rounded">knowledge products</span>, <span className="highlight-text bg-accent/10 px-1 rounded">training programmes</span> and <span className="highlight-text bg-accent/10 px-1 rounded">certifications</span>.
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-5 mt-6 w-full justify-center"
                    >
                        <Link
                            href="#certification"
                            className="group inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-900 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1"
                        >
                            Explore Certification
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/join"
                            className="group inline-flex items-center justify-center gap-3 bg-white border border-gray-200 text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
                        >
                            Become a Member
                        </Link>
                    </motion.div>

                    {/* Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 py-8 px-12 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50"
                    >
                        {stats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <div key={idx} className="flex flex-col items-center">
                                    <div className="p-3 bg-gray-50 rounded-full mb-3">
                                        <Icon className="w-6 h-6 text-accent" />
                                    </div>
                                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                                    <div className="text-sm text-gray-500 font-medium uppercase tracking-wider mt-1">{stat.label}</div>
                                </div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 cursor-pointer hover:text-primary transition-colors"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
                <ChevronDown className="w-5 h-5" />
            </motion.div>
        </section>
    );
}
