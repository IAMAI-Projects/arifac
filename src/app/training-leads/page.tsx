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
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-1 pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl font-bold text-primary mb-4">Training Leads</h1>
                        <p className="text-gray-600 text-lg">Leading experts and designated officers driving excellence in professional certification and domain training across the ARIFAC ecosystem.</p>
                    </div>

                    <div className="max-w-6xl mx-auto space-y-16">
                        {trainingCategories.map((cat, idx) => (
                            <motion.div
                                key={cat.category}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="bg-accent h-6 w-1 rounded-full" />
                                    <h2 className="text-2xl font-bold text-primary">{cat.category}</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {cat.leads.map((lead, lIdx) => (
                                        <motion.div
                                            key={lead.name + lead.institution}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.1 + lIdx * 0.05 }}
                                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                                        >
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="w-12 h-12 bg-accent/5 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-colors">
                                                    <Award size={24} />
                                                </div>
                                                <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                                                    <Star size={12} className="text-accent fill-accent" /> Expert
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-bold text-primary mb-1">{lead.institution}</h3>
                                            <div className="text-xs font-bold text-accent uppercase tracking-widest mb-4">{lead.name}</div>

                                            <div className="pt-4 border-t border-gray-50 mt-auto">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Training Domain</span>
                                                    <span className="text-sm font-semibold text-gray-600">{lead.specialty}</span>
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
