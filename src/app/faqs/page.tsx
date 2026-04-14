'use client';

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    Search,
    MessageCircleQuestion,
    HelpCircle,
    Info,
    UserCheck,
    BookOpen,
    GraduationCap,
    ShieldCheck,
    Mail
} from 'lucide-react';

const faqs = [
    {
        question: "What is ARIFAC?",
        answer: "ARIFAC (Alliance of Reporting Entities in India for AML/CFT) is an industry-led platform focused on strengthening anti-money laundering (AML), counter-terrorism financing (CFT), and financial crime prevention frameworks across reporting entities.",
        category: "General"
    },
    {
        question: "Who operates ARIFAC?",
        answer: "ARIFAC is operated by the Internet and Mobile Association of India (IAMAI) under the guidance of the Financial Intelligence Unit – India (FIU-IND).",
        category: "General"
    },
    {
        question: "What are ARIFAC’s key focus areas?",
        answer: "• AML/CFT compliance capacity building\n• Certification and training programmes\n• Industry-regulator collaboration\n• Financial crime risk awareness and best practices",
        category: "General"
    },
    {
        question: "Is ARIFAC a regulator?",
        answer: "No. ARIFAC is an industry initiative and does not exercise regulatory authority.",
        category: "General"
    },
    {
        question: "Who can apply for ARIFAC membership?",
        answer: "Banks, NBFCs, fintechs, payment entities, VDA platforms, insurance companies, and other reporting entities in India.",
        category: "Membership"
    },
    {
        question: "How can an entity apply?",
        answer: "Through the ARIFAC portal by submitting required organisational details and completing the application process.",
        category: "Membership"
    },
    {
        question: "What happens after application submission?",
        answer: "• Application review by ARIFAC\n• Request for additional details (if required)\n• Approval and onboarding communication",
        category: "Membership"
    },
    {
        question: "When is the Membership ID issued?",
        answer: "A unique Membership ID is generated upon successful activation after completion of onboarding and payment.",
        category: "Membership"
    },
    {
        question: "When does membership become active?",
        answer: "Membership becomes active after:\ni. Approval\nii. Payment completion\niii. Profile onboarding",
        category: "Membership"
    },
    {
        question: "What access does membership provide?",
        answer: "• Regulatory Engagements\n• Capacity Building\n• Industry Intelligence\n• Support",
        category: "Membership"
    },
    {
        question: "Can multiple users be registered under one entity?",
        answer: "Yes. Entities can nominate multiple users for LMS programmes and participation.",
        category: "Membership"
    },
    {
        question: "What is the validity of membership?",
        answer: "Defined at onboarding (typically annual or linked to institutional association where applicable).",
        category: "Membership"
    },
    {
        question: "How can membership be renewed?",
        answer: "By logging into the ARIFAC portal and completing renewal before expiry.",
        category: "Membership"
    },
    {
        question: "What happens if membership expires?",
        answer: "• Access to LMS and programmes may be restricted\n• Certifications may not be accessible for new enrolments\n• Renewal is required for reactivation",
        category: "Membership"
    },
    {
        question: "Can membership be suspended?",
        answer: "Yes, in cases of:\ni. Non-payment\nii. Non-compliance\niii. Administrative review",
        category: "Membership"
    },
    {
        question: "How is LMS access provided?",
        answer: "Upon enrollment, login credentials and access details are shared via email.",
        category: "LMS"
    },
    {
        question: "What is the LMS Roll Number?",
        answer: "A unique identifier assigned to each learner for:\ni. Course tracking\nii. Exam management\niii. Certification issuance",
        category: "LMS"
    },
    {
        question: "Can LMS be accessed across devices?",
        answer: "Yes. It is accessible across desktop, mobile, and tablet.",
        category: "LMS"
    },
    {
        question: "What programmes are available?",
        answer: "Structured certification programmes:\ni. Level 1 to Level 5\nii. Domain-specific add-ons (Wealth, Insurance, Payments, VDA, etc.)",
        category: "LMS"
    },
    {
        question: "Are levels sequential?",
        answer: "• Yes. Progression is structured from L1 to L4\n• L5 may be specialized for senior roles.",
        category: "LMS"
    },
    {
        question: "What are add-on modules?",
        answer: "Specialized domain modules aligned to sectors such as:\ni. Mutual Funds / Wealth\nii. Insurance\niii. Payments / PPIs\niv. Digital Assets etc.",
        category: "LMS"
    },
    {
        question: "How do I enroll in a course?",
        answer: "Through LMS dashboard or via organisation nomination.",
        category: "LMS"
    },
    {
        question: "Are courses self-paced?",
        answer: "Yes, with defined completion timelines where applicable.",
        category: "LMS"
    },
    {
        question: "Can I resume my course later?",
        answer: "Yes. Progress is automatically saved.",
        category: "LMS"
    },
    {
        question: "How do I track progress?",
        answer: "Through LMS dashboard.",
        category: "LMS"
    },
    {
        question: "Are reminders sent for incomplete courses?",
        answer: "Yes. Automated reminders are issued.",
        category: "LMS"
    },
    {
        question: "What are system requirements?",
        answer: "Modern browsers (Chrome, Edge, Safari, Firefox) and stable internet connection.",
        category: "LMS"
    },
    {
        question: "Is offline access available?",
        answer: "No. Internet connection is required.",
        category: "LMS"
    },
    {
        question: "How are assessments conducted?",
        answer: "Each level includes a time-bound assessment.",
        category: "Certifications"
    },
    {
        question: "What is the passing criteria?",
        answer: "Defined within each course.",
        category: "Certifications"
    },
    {
        question: "When can I take the exam?",
        answer: "After completing the mandatory study modules.",
        category: "Certifications"
    },
    {
        question: "What happens if I fail?",
        answer: "You may reattempt the exam as per programme guidelines.",
        category: "Certifications"
    },
    {
        question: "How many attempts are allowed?",
        answer: "Generally one additional attempt. Defined within each programme.",
        category: "Certifications"
    },
    {
        question: "When is the certificate issued?",
        answer: "After successful completion of assessment requirements.",
        category: "Certifications"
    },
    {
        question: "Can certificates be shared with employers/regulators?",
        answer: "Yes. Certificates can be downloaded and shared.",
        category: "Certifications"
    },
    {
        question: "How long is certification valid?",
        answer: "Validity is defined by ARIFAC and may require periodic renewal.",
        category: "Certifications"
    },
    {
        question: "What is recertification?",
        answer: "A process to maintain certification validity through reassessment or updated learning.",
        category: "Certifications"
    },
    {
        question: "Will reminders be sent for expiry?",
        answer: "Yes. Notifications will be sent prior to expiry.",
        category: "Certifications"
    },
    {
        question: "How can I contact ARIFAC support?",
        answer: "Email: help.arifac@iamai.in",
        category: "Support"
    },
    {
        question: "What is the response time?",
        answer: "Queries are addressed within defined service timelines.",
        category: "Support"
    },
    {
        question: "What if my certificate has incorrect details?",
        answer: "Contact support immediately for correction.",
        category: "Support"
    },
    {
        question: "Can my account or membership be restricted?",
        answer: "Yes, in cases of:\ni. Incorrect information\nii. Misuse of platform\niii. Non-compliance with guidelines\niv. Adverse News",
        category: "Support"
    },
    {
        question: "Are records maintained for audit purposes?",
        answer: "Yes. ARIFAC maintains records of:\ni. Membership\nii. LMS participation\niii. Certification",
        category: "Support"
    },
    {
        question: "Can organisations enroll multiple employees?",
        answer: "Yes. Bulk onboarding is supported.",
        category: "Specialized"
    },
    {
        question: "Can organisations track employee progress?",
        answer: "Yes. Reporting and tracking mechanisms may be provided.",
        category: "Specialized"
    },
    {
        question: "Can customised programmes be offered?",
        answer: "Yes. ARIFAC may support tailored training for institutions.",
        category: "Specialized"
    },
    {
        question: "How will I receive updates?",
        answer: "Via:\ni. Registered email\nii. LMS notifications\niii. Official ARIFAC communications",
        category: "Support"
    }
];

const categories = ["All", "General", "Membership", "LMS", "Certifications", "Support", "Specialized"];

export default function FAQsPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-[#f5f5f7] font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-36 pb-12 bg-white overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(194,176,32,0.1),transparent_70%)] pointer-events-none" />
                <div className="container relative mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-widest mb-8"
                        >
                            <HelpCircle size={18} /> Support Center
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold font-heading text-[#1d1d1f] mb-8"
                        >
                            Frequently Asked <span className="text-accent italic">Questions</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-secondary max-w-2xl mx-auto font-medium"
                        >
                            Everything you need to know about ARIFAC membership, programmes, and AML/CFT compliance capacity building.
                        </motion.p>
                    </div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-2xl mx-auto mt-8 relative"
                    >
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={24} />
                            <input
                                type="text"
                                placeholder="Search questions or keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-8 py-6 rounded-[32px] bg-white border border-gray-100 shadow-xl focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all text-lg font-medium"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ content */}
            <section className="py-14">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">

                        {/* Categories */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-3 rounded-2xl font-bold transition-all ${activeCategory === cat
                                        ? "bg-accent text-white shadow-lg shadow-accent/20"
                                        : "bg-white text-secondary hover:bg-gray-50 border border-gray-100"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* FAQ items */}
                        <div className="space-y-4">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map((faq, index) => (
                                    <motion.div
                                        key={index}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <button
                                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                            className="w-full px-6 py-5 flex items-center justify-between text-left group"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${openIndex === index ? 'bg-accent text-white' : 'bg-[#f5f5f7] text-accent'}`}>
                                                    {faq.category === "General" && <Info size={20} />}
                                                    {faq.category === "Membership" && <UserCheck size={20} />}
                                                    {faq.category === "LMS" && <BookOpen size={20} />}
                                                    {faq.category === "Certifications" && <GraduationCap size={20} />}
                                                    {faq.category === "Support" && <Mail size={20} />}
                                                    {faq.category === "Specialized" && <ShieldCheck size={20} />}
                                                </div>
                                                <span className={`text-xl font-bold transition-colors ${openIndex === index ? 'text-accent' : 'text-[#1d1d1f]'}`}>
                                                    {faq.question}
                                                </span>
                                            </div>
                                            <motion.div
                                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                                className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-accent/10 text-accent' : 'text-gray-400'}`}
                                            >
                                                <ChevronDown size={24} />
                                            </motion.div>
                                        </button>

                                        <AnimatePresence>
                                            {openIndex === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <div className="px-16 pb-5 text-secondary text-base font-medium leading-relaxed whitespace-pre-line">
                                                        <div className="h-px bg-gray-100 mb-5" />
                                                        {faq.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-14 bg-white rounded-[48px] border border-dashed border-gray-200">
                                    <MessageCircleQuestion className="mx-auto text-gray-300 mb-4" size={64} />
                                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">No questions found</h3>
                                    <p className="text-secondary">Try searching with different keywords or browse all categories.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Help CTA */}
            <section className="py-14 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto bg-[#1d1d1f] rounded-[48px] p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 relative z-10">
                            Still have questions?
                        </h2>
                        <p className="text-xl text-white/70 mb-8 relative z-10">
                            Our support team is here to help you with anything you need. Reach out to us directly.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
                            <a
                                href="mailto:help.arifac@iamai.in"
                                className="w-full md:w-auto px-10 py-5 bg-accent text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-3"
                            >
                                <Mail size={20} /> Contact Support
                            </a>
                            <button className="w-full md:w-auto px-10 py-5 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all backdrop-blur-sm">
                                Submit a Query
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
