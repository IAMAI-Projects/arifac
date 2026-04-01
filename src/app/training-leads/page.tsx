'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Award, Star, Search } from 'lucide-react';
import { useState, useMemo } from 'react';

const allLeads = [
    { institution: "IndiaIdeas.com Limited (BillDesk)", name: "Ms Jyothi N M", specialty: "Digital Payments Compliance" },
    { institution: "ICICI Bank", name: "Ms Rakhee Sengupta", specialty: "Retail Banking AML" },
    { institution: "HDFC Bank", name: "Mr Gyan Gotan", specialty: "Corporate Banking Standards" },
    { institution: "State Bank of India", name: "Principal Officer", specialty: "Public Sector Compliance" },
    { institution: "Citibank NA", name: "Mr Nihal Shah", specialty: "Multisectoral AML Frameworks" },
    { institution: "JP Morgan Chase Bank NA", name: "Mr Hemang Sheth", specialty: "International Payments Policy" },
    { institution: "HDFC AMC", name: "Mr Sameer Seksaria", specialty: "Asset Management Compliance" },
    { institution: "Jio Financial Services", name: "Mr Prashant Sinha", specialty: "Fintech Risk Governance" },
    { institution: "Karad Urban Co-Operative Bank", name: "Mr Amit Madhusudan Retharekar", specialty: "Co-operative Banking Audit" },
    { institution: "Fintelekt Advisory Services Pvt Ltd", name: "Mr Shirish Pathak", specialty: "Professional AML Pedagogy" }
];

export default function TrainingLeadsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const groupedLeads = useMemo(() => {
        const filtered = allLeads.filter(lead => 
            lead.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const groups: { [key: string]: typeof allLeads } = {};
        filtered.forEach(lead => {
            const firstLetter = lead.institution[0].toUpperCase();
            if (!groups[firstLetter]) groups[firstLetter] = [];
            groups[firstLetter].push(lead);
        });

        // Sort groups alphabetically
        return Object.keys(groups).sort().reduce((acc, key) => {
            acc[key] = groups[key].sort((a, b) => a.institution.localeCompare(b.institution));
            return acc;
        }, {} as { [key: string]: typeof allLeads });
    }, [searchTerm]);


    return (
        <main className="min-h-screen bg-white flex flex-col font-heading">
            <Navbar />

            <div className="flex-1 pt-36 pb-14">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto mb-20 text-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-8"
                        >
                            <Award className="w-5 h-5" /> Professional Excellence
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-[#1d1d1f] mb-8 tracking-tight leading-[1.1]"
                        >
                            Training <span className="bg-gradient-to-r from-[#C2B020] to-[#59626E] text-transparent bg-clip-text">Leads.</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-500 leading-relaxed font-medium max-w-2xl mx-auto"
                        >
                            Leading experts driving excellence in professional certification across the ARIFAC ecosystem.
                        </motion.p>
                    </div>

                    <div className="max-w-2xl mx-auto mb-16">
                        <div className="bg-[#f5f5f7] p-8 rounded-[32px] shadow-sm">
                            <div className="relative w-full">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input 
                                    type="text"
                                    placeholder="Search by institution or lead..."
                                    className="w-full pl-16 pr-6 py-5 bg-white rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all text-base font-medium shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        {Object.keys(groupedLeads).length > 0 ? (
                            Object.entries(groupedLeads).map(([letter, leads]) => (
                                <div key={letter} id={`section-${letter}`} className="mb-20 scroll-mt-32">
                                    <div className="flex items-center gap-6 mb-12">
                                        <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent font-bold text-2xl">
                                            {letter}
                                        </div>
                                        <div className="h-[1px] flex-1 bg-gray-100" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {leads.map((lead, idx) => (
                                            <motion.div
                                                key={lead.institution + lead.name}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="group bg-[#f5f5f7] rounded-[32px] p-8 flex flex-col h-full hover:bg-white hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-500"
                                            >
                                                <div className="flex items-start justify-between mb-8">
                                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                                        <Star size={24} />
                                                    </div>
                                                </div>

                                                <div className="space-y-4 mb-8">
                                                    <h3 className="text-xl font-bold text-[#1d1d1f] group-hover:text-accent transition-colors duration-300">
                                                        {lead.institution}
                                                    </h3>
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">MLROs or Principal Officer</span>
                                                        <span className="text-[17px] font-bold text-[#1d1d1f]">{lead.name}</span>
                                                    </div>
                                                </div>

                                                <div className="mt-auto pt-6 border-t border-gray-200/50">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Specialization</span>
                                                        <span className="text-[14px] font-bold text-gray-500 group-hover:text-[#1d1d1f] transition-colors">{lead.specialty}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-gray-400 font-medium">No results found matching your search.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
