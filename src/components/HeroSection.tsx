'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, FileText, Users, Building2, ShieldCheck } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getUser } from '@/lib/auth';
import { LogoMark } from './Logo';
import { useLanguage } from './LanguageContext';

export default function HeroSection() {
    const { t } = useLanguage();
    const targetRef = useRef(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        setUser(getUser());
    }, []);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]); // Keep opacity at 1
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

    return (
        <section ref={targetRef} className="relative min-h-[90vh] pt-32 pb-8 flex items-center justify-center bg-white border-b border-gray-200">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-60" />

            <div className="container relative z-10 px-6 pt-12 pb-8 text-center">
                <motion.div
                    style={{ opacity, scale, y }}
                    className="flex flex-col items-center gap-8 max-w-5xl mx-auto"
                >

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

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-[14px] md:text-[15px] text-gray-500 max-w-4xl font-medium -mt-4"
                    >
                        {t('hero.subtitle_initiative')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-[15px] md:text-[16px] text-gray-900 max-w-4xl font-light leading-[1.8] whitespace-pre-wrap"
                    >
                        {t('hero.description')}
                    </motion.div>

                    {/* Pillars Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="w-full max-w-4xl mt-12 pt-12 border-t border-gray-100"
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-[#1d1d1f] mb-8 tracking-tight">Core Pillars</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-[#C2B020]" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-[15px] font-bold text-[#1d1d1f] mb-1">{t('hero.pillar1_title')}</h3>
                                    <p className="text-[12px] text-[#1d1d1f]/80 font-semibold leading-relaxed">{t('hero.pillar1_desc')}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-[#59626E]" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-[15px] font-bold text-[#1d1d1f] mb-1">{t('hero.pillar2_title')}</h3>
                                    <p className="text-[12px] text-[#1d1d1f]/80 font-semibold leading-relaxed">{t('hero.pillar2_desc')}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-[#1d1d1f]" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-[15px] font-bold text-[#1d1d1f] mb-1">{t('hero.pillar3_title')}</h3>
                                    <p className="text-[12px] text-[#1d1d1f]/80 font-semibold leading-relaxed">{t('hero.pillar3_desc')}</p>
                                </div>
                            </div>
                        </div>

                    </motion.div>

                </motion.div>
            </div>

        </section>
    );
}
