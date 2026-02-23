'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Video } from 'lucide-react';

const meetingsData = [
    {
        id: 1,
        title: "National Consultation Meeting - Mumbai",
        date: "December 05, 2024",
        time: "11:00 AM - 4:00 PM",
        location: "Mumbai, Maharashtra",
        type: "In-Person",
        status: "Upcoming",
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
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-1 pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto mb-12">
                        <h1 className="text-4xl font-bold text-primary mb-4">Meetings & Consultations</h1>
                        <p className="text-gray-600 text-lg">Facilitating information sharing and strategic engagement to strengthen the national AML/CFT ecosystem through collaborative national and regional meetings.</p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6">
                        {meetingsData.map((meeting, idx) => (
                            <motion.div
                                key={meeting.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="p-8">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${meeting.status === 'Upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {meeting.status}
                                        </span>
                                        <span className="text-xs font-medium text-accent bg-accent/5 px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                                            {meeting.type === 'Online' ? <Video size={12} /> : meeting.type === 'Hybrid' ? <Users size={12} /> : <MapPin size={12} />}
                                            {meeting.type}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-primary mb-3">{meeting.title}</h2>
                                    <p className="text-gray-600 mb-6">{meeting.description}</p>

                                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={18} className="text-accent" />
                                            <span>{meeting.date} at {meeting.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={18} className="text-accent" />
                                            <span>{meeting.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                                    <button className="text-sm font-bold text-primary hover:text-accent transition-colors">
                                        {meeting.status === 'Upcoming' ? 'Register Seat' : 'View Minutes'} →
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
