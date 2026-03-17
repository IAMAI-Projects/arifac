'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { LogoMark } from '@/components/Logo';

const sectors = [
    {
        category: "Banks",
        officers: [
            { institution: "ICICI Bank", name: "Ms Rakhee Sengupta" },
            { institution: "Axis Bank", name: "Mr Manish Vasishta" },
            { institution: "State Bank of India", name: "Principal Officer" }
        ]
    },
    {
        category: "Payment Aggregators / PA - Cross Border",
        officers: [
            { institution: "IndiaIdeas.com Limited (BillDesk)", name: "Ms Jyothi N M" }
        ]
    },
    {
        category: "Networks",
        officers: [
            { institution: "NPCI", name: "Ms Swati Salvi" }
        ]
    },
    {
        category: "Payment Banks / PPI Issuers",
        officers: [
            { institution: "Fino Payments Bank", name: "Mr Aashish Pathak" }
        ]
    },
    {
        category: "Asset Management",
        officers: [
            { institution: "HDFC Mutual Fund", name: "Mr Sameer Seksaria" }
        ]
    },
    {
        category: "Co-operative Banks",
        officers: [
            { institution: "Karad Urban Co-Operative Bank", name: "Mr Amit Madhusudan Retharekar" }
        ]
    },
    {
        category: "Brokers",
        officers: [
            { institution: "Zerodha Broking Limited", name: "Ms Roopa Venkatesh" }
        ]
    },
    {
        category: "NBFC",
        officers: [
            { institution: "Bajaj Finserv", name: "Mr Neelesh Sarda" }
        ]
    }
];

export default function SectoralNodalOfficersPage() {
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
                            <LogoMark className="w-5 h-5 relative" /> Ecosystem Leadership
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-7xl font-bold text-[#1d1d1f] mb-10 tracking-tight leading-[1.1]"
                        >
                            Sectoral Nodal <br />
                            <span className="text-gray-300">Officers.</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-gray-500 leading-relaxed font-medium max-w-2xl"
                        >
                            Facilitating coordination and mission delivery across the ARIFAC network through representation from major financial sectors.
                        </motion.p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {sectors.map((sector, idx) => (
                            <motion.div
                                key={sector.category}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="mb-24 last:mb-0"
                            >
                                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-12 border-b border-gray-100 pb-8">
                                    <span className="text-accent font-bold text-sm tracking-widest tabular-nums opacity-50">
                                        {(idx + 1).toString().padStart(2, '0')}
                                    </span>
                                    <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">
                                        {sector.category}
                                    </h2>
                                </div>
                                
                                <div className="grid gap-6">
                                    {sector.officers.map((officer, oIdx) => (
                                        <motion.div
                                            key={oIdx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: oIdx * 0.1 }}
                                            className="group bg-[#f5f5f7] rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500"
                                        >
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-bold text-[#1d1d1f] group-hover:text-accent transition-colors duration-300">
                                                    {officer.institution}
                                                </h3>
                                                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                                    Principal Representative
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="h-12 w-px bg-gray-200 hidden md:block" />
                                                <div className="space-y-1">
                                                    <div className="text-[10px] font-bold text-accent uppercase tracking-widest">Nodal Officer</div>
                                                    <div className="text-lg font-bold text-[#1d1d1f]">{officer.name}</div>
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
