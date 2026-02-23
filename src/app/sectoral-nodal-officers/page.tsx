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
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-1 pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto mb-16">
                        <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-widest text-[10px] mb-4">
                            <LogoMark className="w-4 h-4 relative" /> Team Leadership
                        </div>
                        <h1 className="text-4xl font-bold text-primary mb-6">Sectoral Nodal Officers</h1>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Our Sectoral Nodal Officers (SNOs) represent major financial institutions and sectors, facilitating coordination and mission delivery across the ARIFAC network.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-12">
                        {sectors.map((sector, idx) => (
                            <motion.div
                                key={sector.category}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-4">
                                    <span className="w-8 h-1 bg-accent rounded-full" />
                                    {sector.category}
                                </h2>
                                <div className="grid gap-4">
                                    {sector.officers.map((officer, oIdx) => (
                                        <div
                                            key={oIdx}
                                            className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                                        >
                                            <div>
                                                <h3 className="text-lg font-bold text-primary mb-1">{officer.institution}</h3>
                                                <div className="text-xs font-bold text-accent uppercase tracking-widest">Nodal Officer</div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                                                <span className="text-sm font-semibold text-gray-700">{officer.name}</span>
                                            </div>
                                        </div>
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
