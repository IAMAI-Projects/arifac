'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { User, Mail, Phone, BookOpen, Send, CheckCircle2 } from 'lucide-react';

export default function TrainingVolunteersPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        topics: '',
        agreement: false
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        
        try {
            const res = await fetch('/api/training', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, type: 'volunteer' })
            });
            
            if (!res.ok) throw new Error('Failed to submit');
            setIsSubmitted(true);
            setShowPopup(true);
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Thank You Popup */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[48px] p-12 max-w-md w-full text-center shadow-2xl"
                    >
                        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-accent" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Thank you for submitting your response</h2>
                        <p className="text-secondary font-medium mb-8">Our training coordination team will review your application and contact you shortly.</p>
                        <button
                            onClick={() => { setShowPopup(false); setIsSubmitted(false); setFormData({ firstName: '', lastName: '', email: '', mobile: '', topics: '', agreement: false }); }}
                            className="px-10 py-4 bg-[#1d1d1f] text-white rounded-2xl font-bold hover:bg-gray-800 transition-all"
                        >
                            Close
                        </button>
                    </motion.div>
                </div>
            )}

            <div className="pt-36 pb-14 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
                        {/* Info Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-xl"
                        >
                            <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-8 block">Contribution</span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-[#1d1d1f] tracking-tight mb-8 leading-[1.1]">
                                Become a <span className="bg-gradient-to-r from-[#C2B020] to-[#59626E] text-transparent bg-clip-text">Trainer</span>
                            </h1>
                            <p className="text-2xl text-secondary font-medium leading-relaxed mb-12">
                                Join our pool of subject matter experts. Your knowledge helps strengthen the national compliance framework.
                            </p>

                            <div className="space-y-10">
                                <div className="flex gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                        <BookOpen className="w-7 h-7 text-accent" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-[#1d1d1f] mb-2">Expert Sessions</h3>
                                        <p className="text-secondary font-medium leading-relaxed">Conduct high-impact training for reporting entities across sectors</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                        <Send className="w-7 h-7 text-accent" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-[#1d1d1f] mb-2">Knowledge Dissemination</h3>
                                        <p className="text-secondary font-medium leading-relaxed">Contribute to typology reports and strategic guidance notes for members</p>
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
                                            placeholder="First name"
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
                                            placeholder="Last name"
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
                                            placeholder="Your email address"
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
                                    <label htmlFor="topics" className="text-[11px] font-bold uppercase tracking-[0.15em] text-secondary ml-1">Expertise & Topics</label>
                                    <textarea
                                        id="topics"
                                        placeholder="Please describe the topics you would like to volunteer for..."
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
                                            I confirm the information provided is accurate and I am authorised to volunteer on behalf of my expertise.
                                        </span>
                                    </label>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-[#0066cc] text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all hover:bg-[#0077ed] active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? 'Sumitting...' : <>Submit Application <Send className="w-5 h-5" /></>}
                                    </button>
                                </div>
                                {error && <p className="text-red-500 font-medium text-center mt-4">{error}</p>}
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
