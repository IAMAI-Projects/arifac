'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Award, Star, BookOpen } from 'lucide-react';

const trainingCategories = [
    {
        category: "Payment System Operators (PA, PA CB, BBPS etc)",
        leads: [
            { institution: "IndiaIdeas.com Limited (BillDesk)", name: "Ms Jyothi N M", specialty: "Digital Payments Compliance" }
        ]
    },
    {
        category: "Banks and Financial Services",
        leads: [
            { institution: "ICICI Bank", name: "Ms Rakhee Sengupta", specialty: "Retail Banking AML" },
            { institution: "HDFC Bank", name: "Mr Gyan Gotan", specialty: "Corporate Banking Standards" },
            { institution: "State Bank of India", name: "Principal Officer", specialty: "Public Sector Compliance" },
            { institution: "Citibank NA", name: "Mr Nihal Shah", specialty: "Multisectoral AML Frameworks" },
            { institution: "JP Morgan Chase Bank NA", name: "Mr Hemang Sheth", specialty: "International Payments Policy" },
            { institution: "HDFC AMC", name: "Mr Sameer Seksaria", specialty: "Asset Management Compliance" },
            { institution: "Jio Financial Services", name: "Mr Prashant Sinha", specialty: "Fintech Risk Governance" },
            { institution: "Karad Urban Co-Operative Bank", name: "Mr Amit Madhusudan Retharekar", specialty: "Co-operative Banking Audit" }
        ]
    },
    {
        category: "AML Training Providers",
        leads: [
            { institution: "Fintelekt Advisory Services Pvt Ltd", name: "Mr Shirish Pathak", specialty: "Professional AML Pedagogy" }
        ]
    }
];

export default function TrainingLeadsPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col font-heading">
            <Navbar />

            <div className="flex-1 pt-48 pb-32">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto mb-32">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-8"
                        >
                            <Award className="w-5 h-5 relative" /> Professional Excellence
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-7xl font-bold text-[#1d1d1f] mb-10 tracking-tight leading-[1.1]"
                        >
                            Training <br />
                            <span className="text-gray-300">Leads.</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-gray-500 leading-relaxed font-medium max-w-2xl"
                        >
                            Leading experts and designated officers driving excellence in professional certification and domain training across the ARIFAC ecosystem.
                        </motion.p>
                    </div>

                    <div className="max-w-6xl mx-auto space-y-32">
                        {trainingCategories.map((cat, idx) => (
                            <motion.div
                                key={cat.category}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-16 border-b border-gray-100 pb-8">
                                    <span className="text-accent font-bold text-sm tracking-widest tabular-nums opacity-50">
                                        {(idx + 1).toString().padStart(2, '0')}
                                    </span>
                                    <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">
                                        {cat.category}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {cat.leads.map((lead, lIdx) => (
                                        <motion.div
                                            key={lead.name + lead.institution}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 + lIdx * 0.05 }}
                                            className="group bg-[#f5f5f7] rounded-[32px] p-10 flex flex-col h-full hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500"
                                        >
                                            <div className="flex items-start justify-between mb-10">
                                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                                    <Star size={28} />
                                                </div>
                                                <div className="px-4 py-1.5 bg-white rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest shadow-sm">
                                                    Expert Lead
                                                </div>
                                            </div>

                                            <div className="space-y-4 mb-10">
                                                <h3 className="text-2xl font-bold text-[#1d1d1f] group-hover:text-accent transition-colors duration-300 min-h-[4rem] flex items-center">
                                                    {lead.institution}
                                                </h3>
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Designated Officer</span>
                                                    <span className="text-lg font-bold text-[#1d1d1f]">{lead.name}</span>
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-8 border-t border-gray-200/50">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">Domain Specialization</span>
                                                    <span className="text-[15px] font-bold text-gray-500 group-hover:text-[#1d1d1f] transition-colors">{lead.specialty}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
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
