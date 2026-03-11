'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, FileText, Users, Building2 } from 'lucide-react';
import { useRef } from 'react';
import { LogoMark } from './Logo';
import { useLanguage } from './LanguageContext';

export default function HeroSection() {
    const { t } = useLanguage();
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

    const stats = [
        { label: t('hero.stats_entities'), value: "500+", icon: Building2 },
        { label: t('hero.stats_professionals'), value: "2,500+", icon: Users },
        { label: t('hero.stats_modules'), value: "12", icon: FileText },
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

            {/* Floating Abstract Element - Compliance Brand Mark */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 right-[10%] hidden lg:block pointer-events-none opacity-20 grayscale hover:grayscale-0 hover:opacity-40 transition-all font-primary"
            >
                <LogoMark className="w-32 h-32" />
            </motion.div>

            <div className="container relative z-10 px-6 pt-20 text-center">
                <motion.div
                    style={{ opacity, scale, y }}
                    className="flex flex-col items-center gap-8 max-w-5xl mx-auto"
                >
                    <br />
                    {/* Animated Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 shadow-sm backdrop-blur-md"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                        </span>

                        <span className="text-xs font-bold tracking-widest uppercase text-gray-600">
                            {t('hero.badge')}
                        </span>

                        {/* Separator + IAMAI tag */}
                        {/* <span className="w-px h-4 bg-gray-300/70" />
                        <a
                            href="https://iamai.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 group"
                            title="Internet And Mobile Association of India"
                        >
                            <span className="text-[10px] text-gray-400 font-medium group-hover:text-gray-600 transition-colors hidden sm:block">by</span>
                            <div className="relative w-10 h-4 rounded overflow-hidden bg-white border border-gray-100">
                                <Image
                                    src="/iamai-logo.png"
                                    alt="IAMAI"
                                    fill
                                    className="object-contain p-0.5"
                                />
                            </div>
                        </a> */}
                    </motion.div>

                    {/* Main Heading with Gradient and Stagger */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-[1.05] tracking-tight text-primary"
                    >

                        {t('hero.title')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-gray-600 to-primary animate-gradient-x bg-[length:200%_auto]">
                            {t('hero.title_integrity')} &nbsp;
                        </span>
                        {t('hero.title_architecture')}
                        <br />
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg md:text-xl text-gray-600 max-w-4xl font-light leading-relaxed bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-sm"
                    >
                        {t('hero.description')}
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
                            className="group inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-primary min-w-[220px] px-8 py-4 rounded-xl font-bold text-base hover:border-primary hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
                        >
                            {t('hero.btn_explore')}
                        </Link>
                        <Link
                            href="/join"
                            className="group inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-primary min-w-[220px] px-8 py-4 rounded-xl font-bold text-base hover:border-primary hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
                        >
                            {t('hero.btn_join')}
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
                <span className="text-[10px] uppercase tracking-[0.2em]">{t('hero.scroll')}</span>
                <ChevronDown className="w-5 h-5" />
            </motion.div>
        </section>
    );
}
