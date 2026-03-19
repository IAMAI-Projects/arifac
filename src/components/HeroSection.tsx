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

        { label: t('hero.stats_professionals'), value: "2,500+", icon: Users },
        { label: t('hero.stats_modules'), value: "12", icon: FileText },
    ];

    return (
        <section ref={targetRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-white">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-30" />

            <div className="container relative z-10 px-6 pt-20 text-center">
                <motion.div
                    style={{ opacity, scale, y }}
                    className="flex flex-col items-center gap-6 max-w-5xl mx-auto"
                >
                    {/* Animated Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50/50 backdrop-blur-sm border border-gray-100/50"
                    >

                    </motion.div>
                    <br />
                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-[1.1] tracking-tight text-[#1d1d1f]"
                    >
                        {t('hero.title')} {' '}
                        <span className="bg-gradient-to-r from-[#C2B020] to-[#59626E] text-transparent bg-clip-text">
                            {t('hero.title_integrity')}
                        </span>{' '}
                        <br />
                        {t('hero.title_architecture')}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-[15px] md:text-[16px] text-gray-900 max-w-4xl font-light leading-[1.8] whitespace-pre-wrap"
                    >
                        {t('hero.description')}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center"
                    >
                        <Link
                            href="#certification"
                            className="inline-flex items-center justify-center bg-[#0066cc] text-white px-8 py-3 rounded-full font-semibold text-base hover:bg-[#0077ed] transition-all"
                        >
                            {t('hero.btn_explore')}
                        </Link>
                        <Link
                            href="/membership/register"
                            className="inline-flex items-center justify-center text-[#0066cc] hover:underline px-8 py-3 rounded-full font-semibold text-base transition-all group"
                        >
                            {t('hero.btn_join')}
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-12 mt-16 py-8 px-12 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50"
                    >

                        {stats.map((stat, idx) => {
                            if (!stat.icon) return null; // Safety check in case of empty items
                            const Icon = stat.icon;
                            return (
                                <div key={idx} className="flex flex-col items-center min-w-[200px]">
                                    <div className="p-3 bg-indigo-50/50 rounded-full mb-3">
                                        <Icon className="w-6 h-6 text-[#5b5bcf]" />
                                    </div>
                                    <div className="text-3xl font-bold text-[#1d1d1f]">{stat.value}</div>
                                    <div className="text-[11px] text-[#86868b] font-semibold uppercase tracking-wider mt-1">{stat.label}</div>
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
