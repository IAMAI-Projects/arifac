'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import {
    BookOpen,
    Bell,
    Calendar,
    Video,
    FileText,
    Award,
    Lock,
    ArrowRight,
    GraduationCap
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export default function RegisterARIFACPage() {
    const { t } = useLanguage();

    const items = [
        { title: t('register.item1_title'), desc: t('register.item1_desc'), icon: BookOpen },
        { title: t('register.item2_title'), desc: t('register.item2_desc'), icon: Bell },
        { title: t('register.item3_title'), desc: t('register.item3_desc'), icon: Calendar },
        { title: t('register.item4_title'), desc: t('register.item4_desc'), icon: Video },
        { title: t('register.item5_title'), desc: t('register.item5_desc'), icon: FileText },
        { title: t('register.item6_title'), desc: t('register.item6_desc'), icon: Award },
        { title: t('register.item7_title'), desc: t('register.item7_desc'), icon: Lock },
    ];

    return (
        <main className="min-h-screen bg-white font-sans text-[#1d1d1f]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-44 pb-16 overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center"
                    >

                        <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight tracking-tight mb-8">
                            {t('register.title').split('ARIFAC')[0]}
                            <span className="bg-gradient-to-r from-[#BFC700] to-[#454552] bg-clip-text text-transparent">
                                ARIFAC
                            </span>
                            {t('register.title').split('ARIFAC')[1]}
                        </h1>
                        <p className="text-xl md:text-2xl text-[#6e6e73] font-medium mb-12 leading-relaxed max-w-3xl mx-auto">
                            {t('register.subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-16 text-center">
                            <h2 className="text-1xl md:text-2xl mb-4">{t('register.foundation')}</h2>
                            <div className="h-1.5 w-20 bg-accent mx-auto rounded-full" />
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-8 md:p-10 rounded-[48px] border border-gray-100/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group"
                                >
                                    <div className="w-16 h-16 bg-[#f5f5f7] text-[#1d1d1f] group-hover:bg-accent group-hover:text-white rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-lg group-hover:shadow-accent/20">
                                        <item.icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
                                    <p className="text-secondary leading-relaxed font-medium text-lg">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-white overflow-hidden relative">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="bg-gradient-to-br from-[#1d1d1f] to-[#3a3a3c] p-12 md:p-24 rounded-[64px] text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
                            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C2B020]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />

                            <h2 className="text-2xl md:text-4xl font-bold mb-8 tracking-tight">
                                {t('register.free')}
                            </h2>
                            <p className="text-xl md:text-2xl text-white/80 mb-16 font-medium max-w-2xl mx-auto leading-relaxed">
                                {t('register.seamless')}
                            </p>

                            <div className="flex justify-center">
                                <button
                                    onClick={() => window.location.href = "/engage/register"}
                                    className="group px-12 py-6 bg-accent hover:bg-accent/90 text-white font-bold rounded-[24px] transition-all flex items-center gap-4 text-xl shadow-xl hover:shadow-accent/40 active:scale-95"
                                >
                                    {t('register.proceed')}
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                        <ArrowRight size={20} />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
