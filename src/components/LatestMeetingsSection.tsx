'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, ChevronRight, Building2 } from 'lucide-react';

import { useLanguage } from './LanguageContext';

const inPersonMeetings = [
    {
        id: 1,
        title: "4th National Chapter Meeting",
        date: "December 10, 2025",
        location: "Mumbai",
        host: "IAMAI",
        minutesLink: "/Minutes-of-the-5th-National-ARIFAC-Meeting.docx",
    },
    {
        id: 2,
        title: "3rd National Chapter Meeting",
        date: "July 24, 2024",
        location: "Mumbai",
        host: "Citibank NA India",
        minutesLink: null,
    },
    {
        id: 3,
        title: "2nd National Chapter Meeting",
        date: "October 19, 2023",
        location: "Mumbai",
        host: "Standard Chartered Bank",
        minutesLink: null,
    },
    {
        id: 4,
        title: "Inaugural National Chapter Meeting",
        date: "August 4, 2023",
        location: "New Delhi",
        host: "Paytm",
        minutesLink: null,
    },
];

export default function LatestMeetingsSection() {
    const { t } = useLanguage();

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
                        {inPersonMeetings.map((meeting, idx) => (
                            <motion.div
                                key={meeting.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                className="bg-[#f5f5f7] p-10 rounded-[32px] hover:bg-[#ebebed] transition-all duration-500 group flex flex-col"
                            >
                                <div className="text-[11px] font-bold text-accent uppercase tracking-[0.15em] mb-4">In-person Meeting</div>
                                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-6 group-hover:text-[#0066cc] transition-colors duration-500 tracking-tight">{meeting.title}</h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-[14px] text-secondary font-medium">
                                        <Calendar className="w-4 h-4 text-[#0066cc] shrink-0" />
                                        <span>{meeting.date}, {meeting.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[14px] text-secondary font-medium">
                                        <Building2 className="w-4 h-4 text-[#0066cc] shrink-0" />
                                        <span>Hosted by <span className="text-[#1d1d1f] font-semibold">{meeting.host}</span></span>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    {meeting.minutesLink ? (
                                        <a
                                            href={meeting.minutesLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 py-2 px-5 bg-white border border-gray-200 text-[#1d1d1f] rounded-2xl text-[13px] font-bold hover:bg-gray-50 transition-all shadow-sm"
                                        >
                                            Click here for summary of the meeting proceedings <ChevronRight size={14} />
                                        </a>
                                    ) : (
                                        <span className="inline-flex items-center gap-2 py-2 px-5 bg-white/60 border border-gray-200 text-secondary rounded-2xl text-[13px] font-medium cursor-default">
                                            Click here for summary of the meeting proceedings <ChevronRight size={14} />
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
