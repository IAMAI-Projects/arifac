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


                </motion.div>
            </div>

            {/* Scroll Indicator */}

        </section>
    );
}
