'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { FileText, Link as LinkIcon, ExternalLink, ShieldCheck, BookOpen, AlertCircle, Info } from 'lucide-react';

export default function RegulatoryUpdatesPage() {
    const resources = [
        {
            title: "Compliance Orders",
            url: "https://fiuindia.gov.in/files/Compliance_Orders/orders.html",
            description: "Official orders and directives issued by FIU-IND regarding compliance obligations under PMLA.",
            icon: ShieldCheck,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Publications",
            url: "https://fiuindia.gov.in/files/Publication/Publication.html",
            description: "Research papers, typology reports, and guidance materials published by FIU-IND.",
            icon: BookOpen,
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            title: "FPAC Note",
            url: "https://fiuindia.gov.in/files/FPAC/FPACnote.pdf",
            description: "Feedback and Advisory Committee notes providing strategic insights on reporting quality.",
            icon: AlertCircle,
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        {
            title: "FATF",
            url: "https://www.fatf-gafi.org/",
            description: "Global standards and recommendations from the Financial Action Task Force on AML/CFT.",
            icon: Info,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        }
    ];

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-48 pb-20 bg-white overflow-hidden">
                <div className="container relative mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-6 block">Resources</span>
                        <h1 className="text-5xl md:text-7xl font-bold text-[#1d1d1f] tracking-tight mb-8 leading-[1.1]">
                            Regulatory <span className="text-secondary">Updates</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
                            Access the latest regulatory frameworks, guidelines, and international standards for AML/CFT compliance in India.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Resources Grid */}
            <section className="py-20 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {resources.map((resource, index) => (
                            <motion.a
                                key={index}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${resource.bg} flex items-center justify-center ${resource.color} mb-8 transition-transform group-hover:scale-110 duration-500`}>
                                    <resource.icon size={28} />
                                </div>
                                
                                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4 flex items-center gap-2">
                                    {resource.title}
                                    <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                                </h3>
                                
                                <p className="text-secondary text-lg leading-relaxed mb-8 flex-grow">
                                    {resource.description}
                                </p>
                                
                                <div className="flex items-center gap-2 text-accent font-bold text-[14px] uppercase tracking-wider">
                                    Access Resource <LinkIcon size={14} />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Disclaimer / Additional Info */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto p-10 rounded-[40px] bg-[#f5f5f7] border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                                <FileText size={28} className="text-accent" />
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-[#1d1d1f]">Official Regulatory Guidance</h4>
                                <p className="text-secondary leading-relaxed font-medium">
                                    While ARIFAC provides access to these resources for professional development and knowledge sharing, reporting entities must always refer to the official portals of FIU-IND and respective sectoral regulators for the most current statutory requirements and legal notices.
                                </p>
                                <a 
                                    href="https://fiuindia.gov.in" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-accent font-bold hover:underline"
                                >
                                    Visit fiuindia.gov.in <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
