'use client';

import React, { useState, useMemo } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { FileText, ExternalLink, AlertCircle, Info, Filter } from 'lucide-react';

const allCirculars = [
    // ─── RBI | KYC ───
    {
        title: "Commercial Banks – Know Your Customer Directions, 2025",
        authority: "RBI",
        date: "Nov 28, 2025",
        circularNo: "DOR.AML.REC.No.88/14.01.002/2025-26",
        category: "KYC",
        timestamp: 20251128,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Small Finance Banks – Know Your Customer Directions, 2025",
        authority: "RBI",
        date: "Nov 28, 2025",
        circularNo: "DOR.AML.REC.No.119/14.01.007/2025-26",
        category: "KYC",
        timestamp: 20251128,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Payments Banks – Know Your Customer Directions, 2025",
        authority: "RBI",
        date: "Nov 28, 2025",
        circularNo: "DOR.AML.REC.No.137/14.01.009/2025-26",
        category: "KYC",
        timestamp: 20251128,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Local Area Banks – Know Your Customer Directions, 2025",
        authority: "RBI",
        date: "Nov 28, 2025",
        circularNo: "DOR.AML.REC.No.162/14.01.008/2025-26",
        category: "KYC / AML",
        timestamp: 20251128,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Urban Cooperative Banks – Know Your Customer Directions, 2025",
        authority: "RBI",
        date: "Nov 28, 2025",
        circularNo: "DOR.AML.REC.No.210/14.01.006/2025-26",
        category: "KYC",
        timestamp: 20251128,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Rural Cooperative Banks – Know Your Customer Directions, 2025",
        authority: "RBI",
        date: "Nov 28, 2025",
        circularNo: "DOR.AML.REC.No.235/14.01.005/2025-26",
        category: "KYC",
        timestamp: 20251128,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "All India Financial Institutions – Know Your Customer Directions, 2025",
        authority: "RBI",
        date: "Nov 28, 2025",
        circularNo: "DOR.AML.REC.No.254/14.01.011/2025-26",
        category: "KYC",
        timestamp: 20251128,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Non-Banking Financial Companies – Know Your Customer Directions, 2025",
        authority: "RBI",
        date: "Nov 28, 2025",
        circularNo: "DOR.AML.REC.No.280/14.01.003/2025-26",
        category: "KYC",
        timestamp: 20251128,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Asset Reconstruction Companies – Know Your Customer Directions, 2025",
        authority: "RBI",
        date: "Nov 28, 2025",
        circularNo: "DOR.AML.REC.No.296/14.01.010/2025-26",
        category: "KYC",
        timestamp: 20251128,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Regional Rural Banks – Know Your Customer Directions, 2025",
        authority: "RBI",
        date: "Jan 4, 2026",
        circularNo: "DOR.AML.REC.No.185/14.01.004/2025-26",
        category: "KYC / AML",
        timestamp: 20260104,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    // ─── RBI | AML & Fraud Risk ───
    {
        title: "Master Directions on Fraud Risk Management in Commercial Banks (incl. RRBs) and AIFIs",
        authority: "RBI",
        date: "Jul 15, 2024",
        circularNo: "DOS.CO.FMG.SEC.No.5/23.04.001/2024-25",
        category: "AML / Fraud Risk",
        timestamp: 20240715,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12726",
    },
    {
        title: "Master Directions on Fraud Risk Management in Urban / State / Central Cooperative Banks",
        authority: "RBI",
        date: "Jul 15, 2024",
        circularNo: "DOS.CO.FMG.SEC.No.6/23.04.001/2024-25",
        category: "AML / Fraud Risk",
        timestamp: 20240715,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12727",
    },
    {
        title: "Master Directions on Fraud Risk Management in Non-Banking Financial Companies (incl. HFCs)",
        authority: "RBI",
        date: "Jul 15, 2024",
        circularNo: "DOS.CO.FMG.SEC.No.7/23.04.001/2024-25",
        category: "AML / Fraud Risk",
        timestamp: 20240715,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12728",
    },
    {
        title: "Master Directions on Frauds – Classification and Reporting by Commercial Banks and Select FIs",
        authority: "RBI",
        date: "Jul 1, 2016",
        circularNo: "DBS.CO.CFMC.BC.No.1/23.04.001/2016-17",
        category: "AML / KYC",
        timestamp: 20160701,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10022",
    },
    // ─── RBI | Risk Management ───
    {
        title: "Master Direction on Information Technology Governance, Risk, Controls and Assurance Practices",
        authority: "RBI",
        date: "Apr 10, 2024",
        circularNo: "DoS.CO.CSITEG/SEC.7/31.01.015/2023-24",
        category: "IT / Cyber Risk",
        timestamp: 20240410,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12274",
    },
    {
        title: "Cyber Security Framework in Banks",
        authority: "RBI",
        date: "Jun 2, 2016",
        circularNo: "DBS.CO/CSITE/BC.11/33.01.001/2015-16",
        category: "Cyber / Operational Risk",
        timestamp: 20160602,
        viewUrl: "https://rbidocs.rbi.org.in/rdocs/notification/PDFs/NT53126052016_F.pdf",
    },
    {
        title: "Master Direction – RBI (Outsourcing of Information Technology Services) Directions, 2023",
        authority: "RBI",
        date: "Apr 10, 2024",
        circularNo: "RBI/2023-24/95 | DoS.CO.CSITE.SEC.7/31.01.015/2023-24",
        category: "Operational Risk",
        timestamp: 20240410,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12280",
    },
    {
        title: "Master Circular – Prudential Norms on Income Recognition, Asset Classification & Provisioning (IRACP)",
        authority: "RBI",
        date: "Apr 1, 2023",
        circularNo: "RBI/2023-24/07 | DOR.STR.REC.5/21.04.048/2023-24",
        category: "Credit Risk",
        timestamp: 20230401,
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasCirculardetails.aspx?id=12299",
    },
    {
        title: "Guidelines on Management of Operational Risk (Basel III / Standardised Approach)",
        authority: "RBI",
        date: "Feb 17, 2022",
        circularNo: "DOR.MRG.REC.93/00-00-007/2021-22",
        category: "Operational Risk",
        timestamp: 20220217,
        viewUrl: "https://www.rbi.org.in/Scripts/NotificationUser.aspx",
    },
    // ─── FIU-IND | AML / KYC / CFT ───
    {
        title: "AML & CFT Guidelines for Reporting Entities Providing Services Related to Virtual Digital Assets (VDAs)",
        authority: "FIU-IND",
        date: "Mar 10, 2023 (Updated Sep 15, 2025)",
        circularNo: "F.No.9-8/2023/COMPL/FIUIND",
        category: "AML / KYC / VDA",
        timestamp: 20250915,
        viewUrl: "https://fiuindia.gov.in/files/AMLCFT_Guidelines_for_VDA_SPs.pdf",
    },
    {
        title: "AML & CFT Guidelines for Reporting Entities – Designated Non-Financial Businesses and Professions (DNFBP)",
        authority: "FIU-IND",
        date: "Jul 4, 2023",
        circularNo: "FIUIND/DNFBP/2023",
        category: "AML / KYC / CFT",
        timestamp: 20230704,
        viewUrl: "https://fiuindia.gov.in/files/AML_CFT_Guidelines_DNFBP.pdf",
    },
    {
        title: "Revised AML/CFT Guidelines for VDA Service Providers (Enhanced KYC – selfie verification, geo-location, penny-drop)",
        authority: "FIU-IND",
        date: "Sep 15, 2025",
        circularNo: "F.No. 9-8/2023/COMPL/FIUIND-Pt-II",
        category: "AML / KYC / VDA",
        timestamp: 20250915,
        viewUrl: "https://fiuindia.gov.in/files/AMLCFT_Guidelines_for_VDA_SPs_Revised.pdf",
    },
    // ─── SEBI | AML / CFT ───
    {
        title: "Master Circular – Guidelines on AML Standards and CFT / Obligations of Securities Market Intermediaries under PMLA 2002",
        authority: "SEBI",
        date: "Jun 6, 2024",
        circularNo: "SEBI/HO/MLSD/SEC5/P/CIR/2024/083",
        category: "AML / CFT",
        timestamp: 20240606,
        viewUrl: "https://www.sebi.gov.in/legal/circulars/jun-2024/master-circular-on-guidelines-on-anti-money-laundering-aml-standards-and-counter-financing-of-terrorism-cft-obligations-of-securities-market-intermediaries-under-the-prevention-of-money-laundering-act_83965.html",
    },
    // ─── SEBI | KYC ───
    {
        title: "Master Circular on Know Your Client (KYC) Norms for the Securities Market",
        authority: "SEBI",
        date: "Oct 12, 2023",
        circularNo: "SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169",
        category: "KYC",
        timestamp: 20231012,
        viewUrl: "https://www.sebi.gov.in/legal/circulars/oct-2023/master-circular-on-know-your-client-kyc-norms-for-the-securities-market_77920.html",
    },
    {
        title: "Uploading of KYC Information by KYC Registration Agencies (KRAs) to Central KYC Records Registry (CKYCRR)",
        authority: "SEBI",
        date: "Jun 27, 2024",
        circularNo: "SEBI/HO/MIRSD/SEC-3/P/CIR/2024/088",
        category: "KYC",
        timestamp: 20240627,
        viewUrl: "https://www.sebi.gov.in/legal/circulars/jun-2024/uploading-of-kyc-information-by-kyc-registration-agencies-kras-to-central-kyc-records-registry-ckycrr_84149.html",
    },
    {
        title: "Guidelines in Pursuance of Amendment to SEBI KYC Registration Agency (KRA) Regulations, 2011",
        authority: "SEBI",
        date: "Jan 2025",
        circularNo: "NSE Circular ISC66053",
        category: "KYC Validation",
        timestamp: 20250101,
        viewUrl: "https://nsearchives.nseindia.com/corporate/content/ISC66053_21012025110000.pdf",
    },
    {
        title: "Publishing Investor Charter for KYC (Know Your Client) Registration Agencies (KRAs) on their Websites",
        authority: "SEBI",
        date: "May 2025",
        circularNo: "SEBI/HO/MIRSD/PODFATF/P/CIR/2025/62",
        category: "KYC",
        timestamp: 20250501,
        viewUrl: "https://www.sebi.gov.in/legal/circulars/may-2025/publishing-investor-charter-for-kyc-registration-agencies-kras_88000.html",
    },
    // ─── SEBI | Risk Management ───
    {
        title: "Cyber Security & Cyber Resilience Framework for SEBI-Registered Intermediaries",
        authority: "SEBI",
        date: "Dec 28, 2023",
        circularNo: "SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2025/119",
        category: "Cyber / Operational Risk",
        timestamp: 20231228,
        viewUrl: "https://www.sebi.gov.in/legal/circulars/dec-2023/cyber-security-and-cyber-resilience-framework-for-sebi-registered-intermediaries_79246.html",
    },
    // ─── IRDAI | AML / KYC / CFT ───
    {
        title: "IRDAI Master Guidelines on Anti-Money Laundering / Counter Financing of Terrorism (AML/CFT) for all Insurers",
        authority: "IRDAI",
        date: "Aug 2022",
        circularNo: "IRDAI/SDD/GDL/AML/062/01/2022",
        category: "AML / KYC / CFT",
        timestamp: 20220801,
        viewUrl: "https://irdai.gov.in/document/37343/0/AML-CFT-Master-Guidelines.pdf",
    },
    {
        title: "Amendment to Master Guidelines on Anti-Money Laundering / Counter Financing of Terrorism (AML/CFT) 2022",
        authority: "IRDAI",
        date: "Aug 2025",
        circularNo: "IRDAI/IID/CIR/MISC/177/10/2023",
        category: "AML / KYC",
        timestamp: 20250801,
        viewUrl: "https://irdai.gov.in/",
    },
];

const authorities = ["All Regulators", "RBI", "FIU-IND", "SEBI", "IRDAI"];

const categories = [
    "All Categories",
    "KYC",
    "KYC / AML",
    "AML / CFT",
    "AML / Fraud Risk",
    "AML / KYC",
    "AML / KYC / VDA",
    "AML / KYC / CFT",
    "IT / Cyber Risk",
    "Cyber / Operational Risk",
    "Operational Risk",
    "Credit Risk",
    "KYC Validation",
];

const authorityColors: Record<string, string> = {
    "RBI":     "bg-blue-50 text-blue-700 border-blue-200",
    "FIU-IND": "bg-green-50 text-green-700 border-green-200",
    "SEBI":    "bg-purple-50 text-purple-700 border-purple-200",
    "IRDAI":   "bg-orange-50 text-orange-700 border-orange-200",
};

export default function RegulatoryUpdatesPage() {
    const [filterAuthority, setFilterAuthority] = useState("All Regulators");
    const [filterCategory, setFilterCategory] = useState("All Categories");
    const [filterSort, setFilterSort] = useState("newest");

    const filtered = useMemo(() => {
        let list = [...allCirculars];

        if (filterAuthority !== "All Regulators") {
            list = list.filter(c => c.authority === filterAuthority);
        }
        if (filterCategory !== "All Categories") {
            list = list.filter(c => c.category === filterCategory);
        }
        list.sort((a, b) =>
            filterSort === "newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp
        );
        return list;
    }, [filterAuthority, filterCategory, filterSort]);

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
                        <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-6 block">Regulatory Updates</span>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-[#1d1d1f] tracking-tight mb-8 leading-[1.1]">
                            Tracking Developments Across <br />
                            <span className="bg-gradient-to-r from-[#C2B020] to-[#59626E] text-transparent bg-clip-text text-2xl md:text-3xl lg:text-4xl uppercase tracking-widest block mt-4">India's AML/CFT Framework</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
                            Track important circulars, notifications, advisories, and regulatory updates relevant to reporting entities and the broader financial crime prevention ecosystem.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Recent Circulars & Filters */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">

                        {/* Header + Filters */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-2">
                                    Recent Circulars &amp; Notifications
                                </h2>
                                <p className="text-secondary text-lg">
                                    Showing <span className="font-bold text-accent">{filtered.length}</span> of {allCirculars.length} circulars
                                </p>
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap items-center gap-2 bg-[#f5f5f7] p-1.5 rounded-xl border border-gray-100">
                                <Filter size={14} className="text-secondary ml-2" />
                                <select
                                    value={filterAuthority}
                                    onChange={e => setFilterAuthority(e.target.value)}
                                    className="bg-transparent px-3 py-1.5 font-bold text-[13px] text-secondary focus:outline-none cursor-pointer"
                                >
                                    {authorities.map(a => <option key={a}>{a}</option>)}
                                </select>
                                <div className="w-[1px] h-4 bg-gray-200" />
                                <select
                                    value={filterCategory}
                                    onChange={e => setFilterCategory(e.target.value)}
                                    className="bg-transparent px-3 py-1.5 font-bold text-[13px] text-secondary focus:outline-none cursor-pointer"
                                >
                                    {categories.map(c => <option key={c}>{c}</option>)}
                                </select>
                                <div className="w-[1px] h-4 bg-gray-200" />
                                <select
                                    value={filterSort}
                                    onChange={e => setFilterSort(e.target.value)}
                                    className="bg-transparent px-3 py-1.5 font-bold text-[13px] text-secondary focus:outline-none cursor-pointer"
                                >
                                    <option value="newest">Date: Newest</option>
                                    <option value="oldest">Date: Oldest</option>
                                </select>
                            </div>
                        </div>

                        {/* Circulars List */}
                        {filtered.length === 0 ? (
                            <div className="py-20 text-center text-secondary font-medium text-lg">
                                No circulars found for the selected filters.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filtered.map((circular, index) => (
                                    <motion.div
                                        key={`${circular.circularNo}-${index}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: Math.min(index * 0.04, 0.3) }}
                                        className="p-6 md:p-8 rounded-[28px] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="space-y-2 flex-1 min-w-0">
                                                {/* Badges row */}
                                                <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
                                                    <span className={`px-2.5 py-1 rounded-full border font-bold ${authorityColors[circular.authority] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                                                        {circular.authority}
                                                    </span>
                                                    <span className="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full border border-gray-200">
                                                        {circular.category}
                                                    </span>
                                                    <span className="text-secondary font-medium normal-case text-[12px]">
                                                        {circular.date}
                                                    </span>
                                                </div>
                                                {/* Title */}
                                                <h3 className="text-[17px] font-bold text-[#1d1d1f] group-hover:text-accent transition-colors leading-snug">
                                                    {circular.title}
                                                </h3>
                                                {/* Circular number */}
                                                <p className="text-[12px] text-secondary/70 font-mono truncate">
                                                    {circular.circularNo}
                                                </p>
                                            </div>

                                            {/* CTA */}
                                            <div className="shrink-0">
                                                <a
                                                    href={circular.viewUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-secondary hover:bg-[#1d1d1f] hover:text-white hover:border-[#1d1d1f] transition-all uppercase tracking-tight whitespace-nowrap"
                                                >
                                                    View Circular <ExternalLink size={13} />
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Disclaimer & Info */}
            <section className="py-20 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-10">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                                <Info size={24} className="text-accent" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-[#1d1d1f] mb-2">Important Note</h4>
                                <p className="text-secondary leading-relaxed font-medium">
                                    This section is intended as a repository for easy reference and awareness. Latest regulatory circulars, advisories, and reference documents are maintained here for member access.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                                <AlertCircle size={24} className="text-amber-500" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-[#1d1d1f] mb-2">Disclaimer</h4>
                                <p className="text-secondary leading-relaxed font-medium italic">
                                    Content hosted on this page is for informational purposes only. Users should refer to the original circulars, notifications, and official communications issued by the relevant authority for statutory compliance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore More */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-[#1d1d1f] mb-12 italic opacity-50 font-serif">Explore More</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <a href="/meetings" className="group">
                                <h5 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">Explore ARIFAC Programs</h5>
                                <div className="h-0.5 w-12 bg-accent mx-auto scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                            </a>
                            <a href="/membership/register" className="group">
                                <h5 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">Apply for Membership</h5>
                                <div className="h-0.5 w-12 bg-accent mx-auto scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                            </a>
                            <a href="mailto:help.arifac@iamai.in" className="group">
                                <h5 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">Contact ARIFAC Secretariat</h5>
                                <p className="text-sm text-secondary">help.arifac@iamai.in</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
