'use client';

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    ChevronRight,
    HelpCircle,
    Book,
    Shield,
    Zap,
    MessageSquare,
    Award,
    Users,
    ChevronDown,
    MapPin,
    Mail,
    Phone
} from 'lucide-react';

const faqData = [
    {
        category: "General",
        questions: [
            {
                q: "What is ARIFAC?",
                a: "ARIFAC (Alliance of Reporting Entities in India for AML/CFT) is a private-private partnership initiative designed to facilitate information sharing, development of knowledge products, training programmes, and certifications for reporting entities in India."
            },
            {
                q: "How can I join the alliance?",
                a: "You can join ARIFAC by navigating to our 'Become a Member' page. We offer various membership tiers tailored to different sectors and entity sizes."
            }
        ]
    },
    {
        category: "Certifications",
        questions: [
            {
                q: "What certifications does ARIFAC offer?",
                a: "We offer several levels of certification, starting with Level 1 (Foundational) up to Advanced and Expert levels, focusing on AML/CFT compliance standards in India."
            },
            {
                q: "Is the certification recognized by regulators?",
                a: "Our certifications are developed in collaboration with industry experts and follow strategic guidance from regulatory bodies, ensuring they meet the high standards required for compliance professionals."
            }
        ]
    },
    {
        category: "Membership",
        questions: [
            {
                q: "What are the benefits of membership?",
                a: "Members gain access to exclusive research reports, regulatory updates, free access to periodic E-books, delta exams, and a digital badge validated by Credly."
            }
        ]
    }
];

const categories = [
    { id: 'general', name: 'General', icon: HelpCircle, color: 'bg-blue-50 text-blue-600' },
    { id: 'membership', name: 'Membership', icon: Users, color: 'bg-green-50 text-green-600' },
    { id: 'certifications', name: 'Certifications', icon: Award, color: 'bg-purple-50 text-purple-600' },
    { id: 'training', name: 'Training', icon: Book, color: 'bg-orange-50 text-orange-600' },
    { id: 'technical', name: 'Tech Support', icon: Zap, color: 'bg-red-50 text-red-600' },
];

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const filteredFaqs = faqData.flatMap(cat => cat.questions).filter(faq =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 bg-gray-50 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
                <div className="container relative mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            How can we <span className="text-[#4b00d1]">help you?</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 font-light">
                            Search our knowledge base or browse categories below to find answers to your questions.
                        </p>

                        <div className="relative group max-w-2xl mx-auto">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4b00d1]" size={24} />
                            <input
                                type="text"
                                placeholder="Search for help topics, FAQs..."
                                className="w-full bg-white border-2 border-gray-100 rounded-2xl py-5 pl-16 pr-8 text-lg text-gray-900 focus:outline-none focus:border-[#4b00d1] transition-all shadow-sm focus:shadow-md"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {categories.map((cat, idx) => (
                            <motion.button
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`flex flex-col items-center gap-4 p-8 rounded-3xl border-2 transition-all ${activeCategory === cat.id
                                        ? 'border-[#4b00d1] bg-white shadow-xl -translate-y-2'
                                        : 'border-gray-50 bg-gray-50 hover:bg-white hover:border-gray-100 hover:shadow-lg'
                                    }`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                <div className={`p-4 rounded-2xl ${cat.color}`}>
                                    <cat.icon size={28} />
                                </div>
                                <span className={`font-bold ${activeCategory === cat.id ? 'text-[#4b00d1]' : 'text-gray-600'}`}>
                                    {cat.name}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <div className="w-20 h-1.5 bg-[#c1d82f] mx-auto rounded-full" />
                    </div>

                    <div className="space-y-4">
                        {(searchQuery ? filteredFaqs : faqData.flatMap(c => c.questions)).map((faq, idx) => (
                            <motion.div
                                key={idx}
                                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
                            >
                                <button
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                                >
                                    <span className="font-bold text-gray-800 text-lg">{faq.q}</span>
                                    <ChevronDown
                                        size={20}
                                        className={`text-[#4b00d1] transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {expandedFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6"
                                        >
                                            <p className="text-gray-600 leading-relaxed font-light pt-2 border-t border-gray-50">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="bg-[#4b00d1] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c1d82f]/20 rounded-full blur-[80px] -ml-32 -mb-32" />

                        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <h2 className="text-4xl font-bold mb-6">Still need assistance?</h2>
                                <p className="text-lg text-white/80 mb-10 font-light">
                                    Our dedicated support team is here to help you with any queries regarding membership, certifications, or platform access.
                                </p>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                            <Mail size={24} className="text-[#c1d82f]" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white/60">Email Support</p>
                                            <p className="font-bold text-lg">support@arifac.org</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                            <Phone size={24} className="text-[#c1d82f]" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white/60">Phone Support</p>
                                            <p className="font-bold text-lg">+91 1800-ARIFAC-HELP</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-3xl p-10 text-gray-900 shadow-xl">
                                <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                                <form className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:outline-none focus:border-[#4b00d1]"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:outline-none focus:border-[#4b00d1]"
                                    />
                                    <textarea
                                        placeholder="Your Message..."
                                        rows={4}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:outline-none focus:border-[#4b00d1] resize-none"
                                    ></textarea>
                                    <button className="w-full bg-[#4b00d1] text-white font-bold py-4 rounded-xl hover:bg-[#3e00b0] transition-colors shadow-lg">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
