'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Star, ArrowRight, Shield, Users, Briefcase, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const galleryCategories = [
    "All",
    "Industry Consultations",
    "Training & Capacity Building",
    "Working Groups & Expert Engagements",
    "Flagship Programs & Events"
];

const galleryImages = [
    { id: 1, title: "Fintech Regulatory Dialogue", category: "Industry Consultations", image: "/images/img1.png", description: "Structured discussions on emerging financial crime risks." },
    { id: 2, title: "AML Compliance Workshop", category: "Training & Capacity Building", image: "/images/img2.png", description: "Strengthening capabilities across compliance and risk teams." },
    { id: 3, title: "Transaction Monitoring Group", category: "Working Groups & Expert Engagements", image: "/images/img3.jpg", description: "Focused forum on transaction monitoring typologies." },
    { id: 4, title: "National AML/CFT Summit", category: "Flagship Programs & Events", image: "/images/img4.jpg", description: "National-level initiative addressing risks at scale." },
    { id: 5, title: "Banking Sector Consultation", category: "Industry Consultations", image: "/images/img5.jpg", description: "Addressing operational challenges in traditional banking." },
    { id: 6, title: "Digital Onboarding Forum", category: "Working Groups & Expert Engagements", image: "/images/img6.jpg", description: "Expert engagement on digital onboarding practices." },
];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredImages = activeCategory === "All"
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    return (
        <main className="min-h-screen bg-[#fafafa] flex flex-col font-heading selection:bg-accent/30">
            <Navbar />

            <div className="flex-1 pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Hero Section */}
                    <div className="max-w-5xl mx-auto mb-20 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center md:justify-start gap-3 text-accent font-bold uppercase tracking-[0.3em] text-[11px] mb-6"
                        >
                            <div className="w-8 h-[1px] bg-accent/50 hidden md:block"></div>
                            Visual Snapshot
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-2xl md:text-4xl lg:text-5xl font-bold font-heading text-[#1d1d1f] mb-8 tracking-tight leading-[1.05]"
                        >
                            ARIFAC in Action: <br />
                            <span className="bg-gradient-to-r from-accent via-[#8a7a00] to-accent text-transparent bg-clip-text">Industry Engagement.</span>
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium max-w-3xl">
                                A visual snapshot of ARIFAC&rsquo;s consultations, training programs, and stakeholder engagements across India&rsquo;s financial crime prevention ecosystem.
                            </p>
                            <p className="text-lg text-gray-500 leading-relaxed max-w-4xl">
                                These engagements bring together stakeholders across banking, fintech, regulatory, and technology ecosystems to strengthen AML/CFT capabilities through collaboration, capacity building, and structured dialogue.
                            </p>
                        </motion.div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-start gap-3 mb-16 overflow-x-auto pb-4 no-scrollbar">
                        {galleryCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-8 py-3.5 rounded-full text-[12px] font-bold tracking-wide transition-all duration-500 whitespace-nowrap border ${activeCategory === cat
                                    ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-xl shadow-black/10'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-[#1d1d1f]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                        <AnimatePresence mode='popLayout'>
                            {filteredImages.map((item, idx) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className="group relative aspect-[4/5] rounded-[32px] overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all duration-700"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                        <div className="translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                                            <span className="inline-block px-3 py-1 bg-accent text-[#1d1d1f] text-[10px] font-bold uppercase tracking-wider rounded-md mb-4 transform -skew-x-12">
                                                {item.category}
                                            </span>
                                            <h3 className="text-white font-bold text-2xl leading-tight mb-2">{item.title}</h3>
                                            <p className="text-white/70 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Program Details Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-xl shadow-black/[0.02]"
                        >
                            <h2 className="text-3xl font-bold text-[#1d1d1f] mb-8">About These Engagements</h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                ARIFAC engagements are designed to support industry collaboration and capability building across AML/CFT domains. Participation includes stakeholders from financial institutions, fintech platforms, technology providers, and allied sectors.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-bold text-[#1d1d1f]">Compliance</h4>
                                    <p className="text-sm text-gray-500">Strengthening regulatory adherence.</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-bold text-[#1d1d1f]">Collaboration</h4>
                                    <p className="text-sm text-gray-500">Structured dialogue across sectors.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#1d1d1f] p-12 rounded-[40px] text-white flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Explore ARIFAC Programs</h2>
                                <p className="text-white/70 text-lg mb-10">
                                    To learn more about ARIFAC&rsquo;s structured initiatives and apply for participation in our upcoming programs.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/meetings" className="flex-1 bg-accent text-[#1d1d1f] px-8 py-4 rounded-2xl font-bold text-center hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 group">
                                    Explore Programs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link href="/membership/launching-soon" className="flex-1 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-center hover:bg-white hover:text-[#1d1d1f] transition-all duration-300">
                                    Membership
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer Notes */}
                    <div className="max-w-4xl mx-auto space-y-12 border-t border-gray-100 pt-16">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">Important Note</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Access to specific consultations, working groups, and training programs may be subject to eligibility, participation criteria, and availability.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

