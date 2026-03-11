'use client';

import { motion } from 'framer-motion';
import { engagementFormats } from '@/data/arifac';
import { ArrowRight, MessageSquare, Users, FileText, TrendingUp, Briefcase, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function EngagementSection() {
    const { t } = useLanguage();

    const engageKeys: Record<string, string> = {
        "Sectoral Roundtables": "data.engage.round",
        "Workshops": "data.engage.work",
        "Policy Consultations": "data.engage.policy",
        "Typology Briefings": "data.engage.typology",
        "Working Groups": "data.engage.group"
    };

    const getIcon = (index: number) => {
        const icons = [MessageSquare, Users, FileText, TrendingUp, Briefcase];
        return icons[index % icons.length];
    };

    return (
        <section id="engagement" className="py-32 bg-[#f5f5f7]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-3xl">
                        <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-4 block">{t('engage.collab')}</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight mb-8">
                            {t('engage.title')}
                        </h2>
                        <p className="text-xl text-secondary max-w-2xl font-medium leading-relaxed">
                            {t('engage.description')}
                        </p>
                    </div>
                    <button className="group inline-flex items-center gap-2 text-[#0066cc] font-semibold text-lg hover:underline decoration-2 underline-offset-4">
                        {t('engage.calendar')}
                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {engagementFormats.map((format, index) => {
                        const Icon = getIcon(index);
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-[32px] p-10 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <Icon className="w-7 h-7 text-[#1d1d1f]" />
                                </div>

                                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">
                                    {engageKeys[format.title] ? t(`${engageKeys[format.title]}.title`) : format.title}
                                </h3>
                                <p className="text-lg text-secondary leading-relaxed font-medium mb-8">
                                    {engageKeys[format.title] ? t(`${engageKeys[format.title]}.desc`) : format.description}
                                </p>

                                <div className="flex items-center gap-2 text-[15px] text-[#0066cc] font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                    <span>{t('engage.participate')}</span>
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
