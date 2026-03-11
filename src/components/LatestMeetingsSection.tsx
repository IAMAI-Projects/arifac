'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

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
        <section className="py-24 bg-gray-50 relative">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-[10px] mb-4">
                                <Calendar size={14} /> {t('meetings.engagements')}
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                                {t('meetings.title')}
                            </h2>
                            <p className="text-gray-600">
                                {t('meetings.description')}
                            </p>
                        </div>
                        <Link
                            href="/meetings"
                            className="group flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors"
                        >
                            {t('meetings.all')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recentMeetings.map((meeting, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-3">{meeting.type}</div>
                                <h3 className="text-xl font-bold text-primary mb-6 group-hover:text-accent transition-colors">{meeting.title}</h3>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span>{meeting.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <MapPin className="w-4 h-4 text-gray-400" />
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
