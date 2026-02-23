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
        <main className="min-h-screen flex flex-col pt-20 bg-white text-primary">
            <Navbar />

            <div className="flex-1 py-16 px-6 md:px-12 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
                        {/* Info Section */}
                        <div className="md:w-1/3">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <span className="text-accent font-bold uppercase tracking-widest text-[10px] mb-4 block">Curriculum</span>
                                <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
                                    Request a <br /><span className="text-gray-400">Topic</span>
                                </h1>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Help us tailor our training programs to the specific needs of your institution or sector.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                                            <Lightbulb className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">Member Driven</h3>
                                            <p className="text-xs text-gray-500">Our syllabus is continuously updated based on member feedback.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                                            <Send className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">Strategic Focus</h3>
                                            <p className="text-xs text-gray-500">Suggesting topics helps FIU-IND focus on emerging risks.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Form Section */}
                        <div className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-2xl shadow-gray-200/50"
                            >
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-widest text-gray-400">First Name</label>
                                            <div className="relative">
                                                <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                                <input
                                                    id="firstName"
                                                    type="text"
                                                    placeholder="John"
                                                    className="w-full bg-transparent border-b border-gray-200 py-3 pl-7 focus:border-primary outline-none transition-colors text-primary font-medium"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                                            <div className="relative">
                                                <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                                <input
                                                    id="lastName"
                                                    type="text"
                                                    placeholder="Doe"
                                                    className="w-full bg-transparent border-b border-gray-200 py-3 pl-7 focus:border-primary outline-none transition-colors text-primary font-medium"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-400">Work Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                                <input
                                                    id="email"
                                                    type="email"
                                                    placeholder="john@institution.com"
                                                    className="w-full bg-transparent border-b border-gray-200 py-3 pl-7 focus:border-primary outline-none transition-colors text-primary font-medium"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="mobile" className="text-xs font-bold uppercase tracking-widest text-gray-400">Official Mobile</label>
                                            <div className="relative">
                                                <Phone className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                                <input
                                                    id="mobile"
                                                    type="tel"
                                                    placeholder="+91 00000 00000"
                                                    className="w-full bg-transparent border-b border-gray-200 py-3 pl-7 focus:border-primary outline-none transition-colors text-primary font-medium"
                                                    value={formData.mobile}
                                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label htmlFor="topics" className="text-xs font-bold uppercase tracking-widest text-gray-400">Proposed Training Topic</label>
                                        <textarea
                                            id="topics"
                                            placeholder="What specific topic or typology would you like us to cover?"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-6 focus:border-primary focus:bg-white outline-none transition-all text-primary font-medium min-h-[150px] resize-none"
                                            value={formData.topics}
                                            onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
                                        <label className="flex items-start gap-3 cursor-pointer group max-w-sm">
                                            <input
                                                type="checkbox"
                                                className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                checked={formData.agreement}
                                                onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
                                                required
                                            />
                                            <span className="text-[11px] text-gray-400 leading-tight">
                                                I confirm I am submitting this request as an authorized representative or interested professional.
                                            </span>
                                        </label>

                                        <button
                                            type="submit"
                                            className="bg-primary text-white px-10 py-4 rounded-xl font-bold transition-all hover:bg-gray-800 active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                        >
                                            Submit Request <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
