'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lightbulb, Send, CheckCircle2 } from 'lucide-react';

export default function TrainingTopicsPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        topics: '',
        agreement: false
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Simulate submission
        setTimeout(() => {
            console.log('Topic request submitted:', formData);
        }, 500);
    };

    if (isSubmitted) {
        return (
            <main className="min-h-screen flex flex-col pt-20 bg-white">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md w-full text-center"
                    >
                        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold text-primary mb-4">Request Submitted</h1>
                        <p className="text-gray-600 mb-8">
                            Your training topic suggestion has been recorded. Our curriculum committee reviews all member requests during quarterly planning.
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-primary font-bold hover:underline"
                        >
                            Suggest another topic
                        </button>
                    </motion.div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            <div className="pt-48 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
                        {/* Info Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-xl"
                        >
                            <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-8 block">Curriculum</span>
                            <h1 className="text-5xl md:text-7xl font-bold text-[#1d1d1f] tracking-tight mb-8 leading-[1.05]">
                                Request a <span className="text-secondary">Topic</span>
                            </h1>
                            <p className="text-2xl text-secondary font-medium leading-relaxed mb-12">
                                Help us tailor our training programs to the specific needs of your institution or sector.
                            </p>

                            <div className="space-y-10">
                                <div className="flex gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                        <Lightbulb className="w-7 h-7 text-accent" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-[#1d1d1f] mb-2">Member Driven</h3>
                                        <p className="text-secondary font-medium leading-relaxed">Our syllabus is continuously updated based on member feedback and industry needs.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                        <Send className="w-7 h-7 text-accent" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-[#1d1d1f] mb-2">Strategic Focus</h3>
                                        <p className="text-secondary font-medium leading-relaxed">Suggesting topics helps core stakeholders focus on emerging risks and new typologies.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Form Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#f5f5f7] rounded-[48px] p-10 md:p-16"
                        >
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label htmlFor="firstName" className="text-[11px] font-bold uppercase tracking-[0.15em] text-secondary ml-1">First Name</label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            placeholder="John"
                                            className="w-full bg-white rounded-2xl px-6 py-4 border-none shadow-sm focus:ring-2 focus:ring-accent/20 outline-none transition-all text-[#1d1d1f] font-bold text-lg placeholder:text-gray-300"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label htmlFor="lastName" className="text-[11px] font-bold uppercase tracking-[0.15em] text-secondary ml-1">Last Name</label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            placeholder="Doe"
                                            className="w-full bg-white rounded-2xl px-6 py-4 border-none shadow-sm focus:ring-2 focus:ring-accent/20 outline-none transition-all text-[#1d1d1f] font-bold text-lg placeholder:text-gray-300"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-[0.15em] text-secondary ml-1">Work Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="john@institution.com"
                                            className="w-full bg-white rounded-2xl px-6 py-4 border-none shadow-sm focus:ring-2 focus:ring-accent/20 outline-none transition-all text-[#1d1d1f] font-bold text-lg placeholder:text-gray-300"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label htmlFor="mobile" className="text-[11px] font-bold uppercase tracking-[0.15em] text-secondary ml-1">Official Mobile</label>
                                        <input
                                            id="mobile"
                                            type="tel"
                                            placeholder="+91 00000 00000"
                                            className="w-full bg-white rounded-2xl px-6 py-4 border-none shadow-sm focus:ring-2 focus:ring-accent/20 outline-none transition-all text-[#1d1d1f] font-bold text-lg placeholder:text-gray-300"
                                            value={formData.mobile}
                                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label htmlFor="topics" className="text-[11px] font-bold uppercase tracking-[0.15em] text-secondary ml-1">Proposed Training Topic</label>
                                    <textarea
                                        id="topics"
                                        placeholder="What specific topic or typology would you like us to cover?"
                                        className="w-full bg-white rounded-3xl px-8 py-6 border-none shadow-sm focus:ring-2 focus:ring-accent/20 outline-none transition-all text-[#1d1d1f] font-bold text-lg placeholder:text-gray-300 min-h-[200px] resize-none"
                                        value={formData.topics}
                                        onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-6">
                                    <label className="flex items-start gap-4 cursor-pointer group max-w-sm">
                                        <input
                                            type="checkbox"
                                            className="mt-1 w-5 h-5 rounded-lg border-gray-300 text-accent focus:ring-accent/20"
                                            checked={formData.agreement}
                                            onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
                                            required
                                        />
                                        <span className="text-[13px] text-secondary font-medium leading-relaxed group-hover:text-[#1d1d1f] transition-colors">
                                            I confirm I am submitting this request as an authorized representative or interested professional.
                                        </span>
                                    </label>

                                    <button
                                        type="submit"
                                        className="bg-[#0066cc] text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all hover:bg-[#0077ed] active:scale-[0.98] shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                                    >
                                        Submit Request <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
