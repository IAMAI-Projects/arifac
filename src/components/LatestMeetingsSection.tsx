'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

const recentMeetings = [
    {
        title: "5th Multilateral Consultation",
        date: "Feb 12, 2025",
        location: "FIU-IND, New Delhi",
        type: "High-Level Briefing"
    },
    {
        title: "North India Regional Meet",
        date: "Jan 18, 2025",
        location: "IAMAI Office, Gurugram",
        type: "Operational Workshop"
    }
];

export default function LatestMeetingsSection() {
    return (
        <section className="py-24 bg-gray-50 relative">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-[10px] mb-4">
                                <Calendar size={14} /> Engagements
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                                Latest Consultations
                            </h2>
                            <p className="text-gray-600">
                                Tracking strategic dialogues and regional workshops strengthening India's financial integrity.
                            </p>
                        </div>
                        <Link
                            href="/meetings"
                            className="group flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors"
                        >
                            All Meetings <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
