'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Video, ChevronRight } from 'lucide-react';

const meetingsData = [
    {
        id: 1,
        title: "National Consultation Meeting - Mumbai",
        date: "December 10, 2025",
        time: "11:00 AM - 4:00 PM",
        location: "Mumbai, Maharashtra",
        type: "In-Person",
        status: "Past",
        description: "Focusing on the establishment of industry-specific working groups and defining time-bound action points for efficient mission delivery in the financial sector."
    },
    {
        id: 2,
        title: "National Consultation Meeting - New Delhi",
        date: "August 2023",
        time: "9:30 AM - 5:30 PM",
        location: "New Delhi, NCR",
        type: "In-Person",
        status: "Past",
        description: "The inaugural national conference to define ARIFAC's objectives, structure, and the nature of private-private engagement in the national AML/CFT domain."
    },
    {
        id: 3,
        title: "Virtual Working Group Session: Fintech Regulation",
        date: "January 20, 2025",
        time: "3:00 PM - 4:30 PM",
        location: "Online (Standard Video Conference)",
        type: "Online",
        status: "Planned",
        description: "A specialized session for the Fintech working group to discuss regional contact points and broadening the dissemination of ARIFAC objectives."
    }
];

export default function MeetingsPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <div className="flex-1 pt-48 pb-32">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto mb-24 text-center">
                        <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-6 block">Engagement</span>
                        <h1 className="text-5xl md:text-7xl font-bold text-[#1d1d1f] tracking-tight mb-8">Meetings & Consultations</h1>
                        <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
                            Facilitating information sharing and strategic engagement to strengthen the national AML/CFT ecosystem through collaborative national and regional meetings.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto space-y-10">
                        {meetingsData.map((meeting, idx) => (
                            <motion.div
                                key={meeting.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-[#f5f5f7] rounded-[40px] overflow-hidden hover:bg-[#ebebed] transition-all duration-500"
                            >
                                <div className="p-10 md:p-14">
                                    <div className="flex flex-wrap items-center gap-4 mb-8">
                                        <span className={`text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.15em] border ${
                                            meeting.status === 'Upcoming' || meeting.status === 'Planned' 
                                            ? 'bg-white text-green-600 border-green-100' 
                                            : 'bg-white text-secondary border-gray-200'
                                            }`}>
                                            {meeting.status}
                                        </span>
                                        <span className="text-[11px] font-bold text-accent bg-white border border-gray-100 px-4 py-1.5 rounded-full uppercase tracking-[0.15em] flex items-center gap-2 shadow-sm">
                                            {meeting.type === 'Online' ? <Video size={14} /> : meeting.type === 'Hybrid' ? <Users size={14} /> : <MapPin size={14} />}
                                            {meeting.type}
                                        </span>
                                    </div>

                                    <h2 className="text-3xl font-bold text-[#1d1d1f] mb-6 tracking-tight">{meeting.title}</h2>
                                    <p className="text-lg text-secondary mb-10 leading-relaxed font-medium">{meeting.description}</p>

                                    <div className="flex flex-wrap gap-10 text-[15px] font-bold text-[#1d1d1f]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                                <Calendar size={20} className="text-accent" />
                                            </div>
                                            <span>{meeting.date} at {meeting.time}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                                <MapPin size={20} className="text-accent" />
                                            </div>
                                            <span>{meeting.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-10 md:px-14 py-8 bg-white/50 border-t border-gray-200 flex justify-end">
                                    <button className="inline-flex items-center gap-2 py-3 px-8 bg-white border border-gray-200 text-[#1d1d1f] rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm">
                                        {meeting.status === 'Upcoming' ? 'Register Seat' : meeting.status === 'Planned' ? 'View Agenda' : 'View Minutes'} <ChevronRight size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
