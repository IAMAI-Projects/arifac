'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { BookOpen, Zap, Award, CheckCircle2 } from 'lucide-react';

export default function MemberBenefitsPage() {
    const benefits = [
        {
            title: "Free Access To The New Edition Of The Ebook",
            icon: BookOpen,
            description: [
                "You'll be automatically updated with the latest versions of your certificate's study guide.",
                "This service simply allows you to stay up-to-date on the latest information in a way that's convenient and absolutely free."
            ]
        },
        {
            title: "Free Delta Exam",
            icon: Zap,
            description: [
                "Your current certificate will always be valid. You'll never have to pay outrageous fees for a re-certification exam.",
                "As a GCI member, you'll have the option to take the corresponding Delta exam for the new edition of your certificate study guide."
            ]
        },
        {
            title: "Valid Digital Badge by Credly",
            icon: Award,
            description: [
                "Active membership allows you to share an active and verified digital badge with your employer or anyone else."
            ]
        }
    ];

    return (
        <main className="bg-white min-h-screen font-sans">
            <Navbar />

            {/* Content Section */}
            <section className="pt-40 pb-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-12">
                            Why Become a Member?
                        </h1>

                        <div className="space-y-16">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-1.5 h-8 bg-orange-400 rounded-full group-hover:h-10 transition-all duration-300" />
                                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                                            {benefit.title}
                                        </h2>
                                    </div>

                                    <div className="space-y-6 pl-6">
                                        {benefit.description.map((text, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2.5 shrink-0" />
                                                <p className="text-lg text-gray-600 leading-relaxed">
                                                    {text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
