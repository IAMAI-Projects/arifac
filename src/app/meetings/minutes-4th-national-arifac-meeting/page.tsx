'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Download } from 'lucide-react';
import Link from 'next/link';

export default function FourthMeetingMinutesPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar />

            <div className="flex-1 pt-48 pb-32">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Back link */}
                        <Link
                            href="/meetings"
                            className="inline-flex items-center gap-2 text-secondary hover:text-[#1d1d1f] font-semibold text-[15px] mb-12 transition-colors"
                        >
                            <ArrowLeft size={18} /> Back to Meetings &amp; Consultations
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-6 block">Meeting Proceedings</span>
                            <h1 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] tracking-tight mb-6">
                                Minutes of the 4th National Chapter Meeting
                            </h1>
                            <p className="text-lg text-secondary font-medium mb-4">
                                Held at Godrej One, Vikhroli, Mumbai
                            </p>
                            <p className="text-lg text-secondary font-medium mb-16">
                                December 10, 2024 &nbsp;·&nbsp; Hosted by IAMAI
                            </p>

                            {/* Document download card */}
                            <div className="bg-[#f5f5f7] rounded-[32px] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center gap-8">
                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                                    <FileText size={32} className="text-accent" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-[#1d1d1f] mb-2 tracking-tight">
                                        Minutes of the 5th National ARIFAC Meeting
                                    </h2>
                                    <p className="text-[15px] text-secondary font-medium">
                                        Godrej One, Vikhroli, Mumbai &nbsp;·&nbsp; December 10, 2024
                                    </p>
                                </div>
                                <a
                                    href="/documents/Minutes-5th-National-ARIFAC-Meeting-Mumbai-Dec-2024.docx"
                                    download
                                    className="inline-flex items-center gap-2 py-3 px-8 bg-[#1d1d1f] text-white rounded-2xl text-[14px] font-bold hover:bg-[#333] transition-all shadow-sm flex-shrink-0"
                                >
                                    <Download size={16} /> Download Document
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
