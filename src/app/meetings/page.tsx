'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, Video, CalendarClock, ExternalLink } from 'lucide-react';

const upcomingSessions = [
    {
        id: 1,
        title: "Training Session on OVDs, Digital Verification & V-CIP Enablement- Designing Digital KYC Frameworks for Risk-Based and Remote Onboarding",
        month: "April",
        registerLink: "#",
    },
    {
        id: 2,
        title: "Training Session on STR Filing and Typologies",
        month: "April",
        registerLink: "#",
    },
    {
        id: 3,
        title: "Training on Cross-Border AML: Managing Risk Across Jurisdictions, Counterparties & Data Flows",
        month: "April",
        registerLink: "#",
    },
    {
        id: 4,
        title: "Training on Strengthening Transparency and Infrastructure in the Derivatives Market",
        month: "May",
        registerLink: "#",
    },
    {
        id: 5,
        title: "Training on CDD and Verification - Customer Due Diligence in Practice: Verification, Risk Profiling & Ongoing Monitoring",
        month: "May",
        registerLink: "#",
    },
];

const virtualSessions = [
    {
        id: 1,
        title: "ARIFAC Session 1 on PMLA Requirements, Screening & Transaction Monitoring for PAs",
        date: "22-Jan-26",
    },
    {
        id: 2,
        title: "ARIFAC Session 1 Follow up Q&A on PMLA Requirements, Screening & Transaction Monitoring for PAs",
        date: "27-Jan-26",
    },
    {
        id: 3,
        title: "ARIFAC Session 2 - Training Program on Central KYC Records Registry – Compliance by REs, Issues & Challenges",
        date: "30-Jan-26",
    },
    {
        id: 4,
        title: "ARIFAC Training 3 - Artificial Intelligence in AML, fraud monitoring, and compliance functions.",
        date: "20-Feb-26",
    },
    {
        id: 5,
        title: `ARIFAC - Training 4 AML and Compliance in Mutual Fund Industry - By Sameer Seksarai, Principal Officer, HDFC AMC`,
        date: "27-Feb-26",
    },
];

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

export default function MeetingsPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar />

            <div className="flex-1 pt-48 pb-32">
                <div className="container mx-auto px-6">
                    {/* Page Header */}
                    <div className="max-w-4xl mx-auto mb-24 text-center">
                        <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-6 block">Engagement</span>
                        <h1 className="text-5xl md:text-7xl font-bold text-[#1d1d1f] tracking-tight mb-8">Meetings &amp; Consultations</h1>
                        <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
                            Facilitating information sharing and strategic engagement to strengthen the national AML/CFT ecosystem through collaborative national chapter meetings.
                        </p>
                    </div>

                    {/* In-Person Meetings Section */}
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl font-bold text-[#1d1d1f] mb-10 tracking-tight border-b border-gray-200 pb-4">In-person Meetings</h2>
                        <div className="space-y-8">
                            {inPersonMeetings.map((meeting, idx) => (
                                <motion.div
                                    key={meeting.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group bg-[#f5f5f7] rounded-[32px] overflow-hidden hover:bg-[#ebebed] transition-all duration-500"
                                >
                                    <div className="p-10 md:p-12">
                                        <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4 tracking-tight">{meeting.title}</h3>

                                        <div className="flex flex-wrap gap-8 text-[15px] font-semibold text-[#1d1d1f] mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                                    <Calendar size={18} className="text-accent" />
                                                </div>
                                                <span>{meeting.date}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                                    <MapPin size={18} className="text-accent" />
                                                </div>
                                                <span>{meeting.location}</span>
                                            </div>
                                        </div>

                                        <p className="text-[15px] text-secondary font-medium mb-6">
                                            Hosted by <span className="text-[#1d1d1f] font-semibold">{meeting.host}</span>
                                        </p>

                                        {meeting.minutesLink ? (
                                            <a
                                                href={meeting.minutesLink}
                                                className="inline-flex items-center gap-2 py-2.5 px-6 bg-white border border-gray-200 text-[#1d1d1f] rounded-2xl text-[14px] font-bold hover:bg-gray-50 transition-all shadow-sm"
                                            >
                                                Click here for summary of the meeting proceedings <ChevronRight size={16} />
                                            </a>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 py-2.5 px-6 bg-white/60 border border-gray-200 text-secondary rounded-2xl text-[14px] font-bold cursor-default">
                                                Click here for summary of the meeting proceedings <ChevronRight size={16} />
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Virtual Sessions Section */}
                    <div className="max-w-5xl mx-auto mt-20">
                        <h2 className="text-2xl font-bold text-[#1d1d1f] mb-10 tracking-tight border-b border-gray-200 pb-4 flex items-center gap-3">
                            <Video size={22} className="text-accent" /> Virtual Sessions
                        </h2>
                        <div className="overflow-hidden rounded-[24px] border border-gray-200">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#f5f5f7]">
                                        <th className="text-left px-8 py-5 text-[13px] font-bold text-secondary uppercase tracking-[0.15em]">Session</th>
                                        <th className="text-right px-8 py-5 text-[13px] font-bold text-secondary uppercase tracking-[0.15em] whitespace-nowrap">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {virtualSessions.map((session, idx) => (
                                        <motion.tr
                                            key={session.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.07 }}
                                            className={`border-t border-gray-100 hover:bg-[#f5f5f7] transition-colors ${
                                                idx % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
                                            }`}
                                        >
                                            <td className="px-8 py-6 text-[15px] font-medium text-[#1d1d1f] leading-relaxed">{session.title}</td>
                                            <td className="px-8 py-6 text-[15px] font-bold text-accent text-right whitespace-nowrap">{session.date}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Upcoming Sessions Section */}
                    <div className="max-w-5xl mx-auto mt-20">
                        <h2 className="text-2xl font-bold text-[#1d1d1f] mb-10 tracking-tight border-b border-gray-200 pb-4 flex items-center gap-3">
                            <CalendarClock size={22} className="text-accent" /> Upcoming Sessions
                        </h2>
                        <div className="overflow-hidden rounded-[24px] border border-gray-200">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#f5f5f7]">
                                        <th className="text-left px-8 py-5 text-[13px] font-bold text-secondary uppercase tracking-[0.15em]">Session</th>
                                        <th className="text-center px-6 py-5 text-[13px] font-bold text-secondary uppercase tracking-[0.15em] whitespace-nowrap">Month</th>
                                        <th className="text-center px-6 py-5 text-[13px] font-bold text-secondary uppercase tracking-[0.15em] whitespace-nowrap">Register</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingSessions.map((session, idx) => (
                                        <motion.tr
                                            key={session.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.07 }}
                                            className={`border-t border-gray-100 hover:bg-[#f5f5f7] transition-colors ${
                                                idx % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
                                            }`}
                                        >
                                            <td className="px-8 py-6 text-[15px] font-medium text-[#1d1d1f] leading-relaxed">{session.title}</td>
                                            <td className="px-6 py-6 text-[15px] font-bold text-secondary text-center whitespace-nowrap">{session.month}</td>
                                            <td className="px-6 py-6 text-center whitespace-nowrap">
                                                <a
                                                    href={session.registerLink}
                                                    className="inline-flex items-center gap-1.5 text-[13px] font-bold text-accent hover:underline"
                                                >
                                                    Register here to express interest <ExternalLink size={13} />
                                                </a>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
