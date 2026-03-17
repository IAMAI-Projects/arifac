'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle2, Loader2, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LogoMark } from '@/components/Logo';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
    const [status, setStatus] = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            organisation: (form.elements.namedItem('organisation') as HTMLInputElement).value,
            subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus('success');
                form.reset();
            } else {
                const json = await res.json();
                setErrorMsg(json.error || 'Something went wrong. Please try again.');
                setStatus('error');
            }
        } catch {
            setErrorMsg('Network error. Please check your connection and try again.');
            setStatus('error');
        }
    };

    const inputClass =
        'w-full bg-[#f5f5f7] border-none rounded-2xl py-4 px-6 text-[#1d1d1f] font-bold placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-accent/20 transition-all duration-300';
    const labelClass = 'block text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 ml-2';

    return (
        <main className="min-h-screen bg-white flex flex-col font-heading">
            <Navbar />

            <div className="flex-1 pt-48 pb-32">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-24 lg:gap-40">
                            {/* Left Side: Info */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="space-y-16"
                            >
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-[10px]">
                                        <Mail className="w-5 h-5" /> Connect with us
                                    </div>
                                    <h1 className="text-6xl md:text-8xl font-bold text-[#1d1d1f] tracking-tight leading-[1.1]">
                                        Get in <br />
                                        <span className="text-gray-300">touch.</span>
                                    </h1>
                                    <p className="text-2xl text-gray-500 leading-relaxed font-medium max-w-lg">
                                        Whether you're exploring membership, have questions about our certifications, or want to collaborate.
                                    </p>
                                </div>

                                <div className="space-y-10">
                                    <div className="flex items-start gap-8">
                                        <div className="w-14 h-14 bg-[#f5f5f7] rounded-2xl flex items-center justify-center shrink-0 text-accent">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Direct Email</div>
                                            <a href="mailto:s.avanish@iamai.in" className="text-2xl font-bold text-[#1d1d1f] hover:text-accent transition-colors underline decoration-gray-200 underline-offset-8">
                                                s.avanish@iamai.in
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-8">
                                        <div className="w-14 h-14 bg-[#f5f5f7] rounded-2xl flex items-center justify-center shrink-0 text-accent">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Main Office</div>
                                            <p className="text-2xl font-bold text-[#1d1d1f] leading-snug">
                                                IAMAI Headquarters,<br />
                                                New Delhi, India
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-8">
                                        <div className="w-14 h-14 bg-[#f5f5f7] rounded-2xl flex items-center justify-center shrink-0 text-accent">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Response Time</div>
                                            <p className="text-2xl font-bold text-[#1d1d1f]">Within 48 hours</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Side: Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="relative lg:pt-8"
                            >
                                <div className="bg-white rounded-[48px] p-8 md:p-12 border border-gray-100 shadow-2xl shadow-gray-200/50">
                                    {status === 'success' ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="py-20 flex flex-col items-center text-center gap-8"
                                        >
                                            <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-white shadow-2xl shadow-accent/20">
                                                <CheckCircle2 size={48} />
                                            </div>
                                            <div className="space-y-4">
                                                <h2 className="text-4xl font-bold text-[#1d1d1f]">Message Sent.</h2>
                                                <p className="text-xl text-gray-500 font-medium max-w-sm mx-auto">
                                                    Thank you for reaching out. A representative will contact you shortly.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setStatus('idle')}
                                                className="px-10 py-5 bg-[#1d1d1f] text-white rounded-2xl text-lg font-bold hover:bg-gray-800 transition-all"
                                            >
                                                Send another message
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-10">
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div>
                                                    <label htmlFor="name" className={labelClass}>Full Name</label>
                                                    <input id="name" name="name" type="text" required placeholder="John Doe" className={inputClass} />
                                                </div>
                                                <div>
                                                    <label htmlFor="email" className={labelClass}>Email Address</label>
                                                    <input id="email" name="email" type="email" required placeholder="john@example.com" className={inputClass} />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="organisation" className={labelClass}>Organisation</label>
                                                <input id="organisation" name="organisation" type="text" placeholder="Institution Name" className={inputClass} />
                                            </div>

                                            <div>
                                                <label htmlFor="subject" className={labelClass}>Subject</label>
                                                <input id="subject" name="subject" type="text" required placeholder="Nature of enquiry" className={inputClass} />
                                            </div>

                                            <div>
                                                <label htmlFor="message" className={labelClass}>Message</label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    required
                                                    rows={6}
                                                    placeholder="How can we help you?"
                                                    className={`${inputClass} resize-none`}
                                                />
                                            </div>

                                            {status === 'error' && (
                                                <p className="text-red-500 font-bold bg-red-50 rounded-2xl px-6 py-4 border border-red-100 text-sm">{errorMsg}</p>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={status === 'loading'}
                                                className="w-full bg-accent text-white font-bold py-6 rounded-2xl hover:bg-[#0055aa] transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-3 disabled:opacity-60 text-lg"
                                            >
                                                {status === 'loading' ? (
                                                    <><Loader2 size={24} className="animate-spin" /> Sending...</>
                                                ) : (
                                                    <><Send size={20} /> Send enquiry</>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>

                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="mt-12 text-center"
                                >
                                    <p className="text-gray-400 text-sm font-medium">
                                        ARIFAC is an industry-led initiative under the aegis of IAMAI.
                                    </p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
