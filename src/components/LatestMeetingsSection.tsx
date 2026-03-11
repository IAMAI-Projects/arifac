'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, ChevronRight } from 'lucide-react';

import { useLanguage } from './LanguageContext';

export default function LatestMeetingsSection() {
    const { t, language } = useLanguage();

    const recentMeetings = [
        {
            title: t('data.meeting.consult.title_short'),
            date: language === 'HI' ? "12 फरवरी, 2025" : "Feb 12, 2025",
            location: t('data.meeting.consult.loc'),
            type: t('data.meeting.consult.type_short')
        },
        {
            title: t('data.meeting.regional.title'),
            date: language === 'HI' ? "18 जनवरी, 2025" : "Jan 18, 2025",
            location: t('data.meeting.regional.loc'),
            type: t('data.meeting.regional.type')
        }
    ];

    return (
        <section className="py-32 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                        <div>
                            <span className="text-secondary text-[12px] font-bold tracking-[0.2em] uppercase mb-4 block">{t('meetings.engagements')}</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-8">
                                {t('meetings.title')}
                            </h2>
                            <p className="text-xl text-secondary max-w-2xl font-medium leading-relaxed">
                                {t('meetings.description')}
                            </p>
                        </div>
                        <Link
                            href="/meetings"
                            className="group inline-flex items-center gap-2 text-[#0066cc] font-semibold text-lg hover:underline decoration-2 underline-offset-4"
                        >
                            {t('meetings.all')} <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {recentMeetings.map((meeting, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-[#f5f5f7] p-10 rounded-[32px] hover:bg-[#ebebed] transition-all duration-500 group"
                            >
                                <div className="text-[11px] font-bold text-accent uppercase tracking-[0.15em] mb-4">{meeting.type}</div>
                                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-8 group-hover:text-[#0066cc] transition-colors duration-500 tracking-tight">{meeting.title}</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-[14px] text-secondary font-medium">
                                        <Calendar className="w-5 h-5 text-[#0066cc]" />
                                        <span>{meeting.date}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-[14px] text-secondary font-medium">
                                        <MapPin className="w-5 h-5 text-[#0066cc]" />
                                        <span>{meeting.location}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
