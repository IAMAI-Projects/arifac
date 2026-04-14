'use client';

import React, { useState, useMemo } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { ExternalLink, AlertCircle, Info, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

/* ─── 7 canonical categories ─────────────────────────────── */
const CATEGORIES = [
    "All Categories",
    "AML / CFT",
    "KYC / Customer Due Diligence",
    "Reporting Obligations",
    "Digital Onboarding",
    "Fraud / Cyber Risk",
    "Sanctions / Screening",
    "Compliance & Governance",
];

const AUTHORITIES = ["All Regulators", "RBI", "FIU-IND", "SEBI", "IRDAI"];

const BADGE: Record<string, string> = {
    "RBI":     "bg-blue-50 text-blue-700 border-blue-200",
    "FIU-IND": "bg-green-50 text-green-700 border-green-200",
    "SEBI":    "bg-purple-50 text-purple-700 border-purple-200",
    "IRDAI":   "bg-orange-50 text-orange-700 border-orange-200",
};

const allCirculars = [
    /* ══════════════════════════════════════════════════
       RBI — KYC Directions 2025 Series
    ══════════════════════════════════════════════════ */
    {
        title: "Commercial Banks – Know Your Customer Directions, 2025",
        authority: "RBI", date: "Nov 28, 2025", timestamp: 20251128,
        circularNo: "DOR.AML.REC.No.88/14.01.002/2025-26",
        category: "KYC / Customer Due Diligence",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Small Finance Banks – Know Your Customer Directions, 2025",
        authority: "RBI", date: "Nov 28, 2025", timestamp: 20251128,
        circularNo: "DOR.AML.REC.No.119/14.01.007/2025-26",
        category: "KYC / Customer Due Diligence",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Payments Banks – Know Your Customer Directions, 2025",
        authority: "RBI", date: "Nov 28, 2025", timestamp: 20251128,
        circularNo: "DOR.AML.REC.No.137/14.01.009/2025-26",
        category: "KYC / Customer Due Diligence",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Local Area Banks – Know Your Customer Directions, 2025",
        authority: "RBI", date: "Nov 28, 2025", timestamp: 20251128,
        circularNo: "DOR.AML.REC.No.162/14.01.008/2025-26",
        category: "KYC / Customer Due Diligence",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Urban Cooperative Banks – Know Your Customer Directions, 2025",
        authority: "RBI", date: "Nov 28, 2025", timestamp: 20251128,
        circularNo: "DOR.AML.REC.No.210/14.01.006/2025-26",
        category: "KYC / Customer Due Diligence",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Rural Cooperative Banks – Know Your Customer Directions, 2025",
        authority: "RBI", date: "Nov 28, 2025", timestamp: 20251128,
        circularNo: "DOR.AML.REC.No.235/14.01.005/2025-26",
        category: "KYC / Customer Due Diligence",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "All India Financial Institutions – Know Your Customer Directions, 2025",
        authority: "RBI", date: "Nov 28, 2025", timestamp: 20251128,
        circularNo: "DOR.AML.REC.No.254/14.01.011/2025-26",
        category: "KYC / Customer Due Diligence",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Non-Banking Financial Companies – Know Your Customer Directions, 2025",
        authority: "RBI", date: "Nov 28, 2025", timestamp: 20251128,
        circularNo: "DOR.AML.REC.No.280/14.01.003/2025-26",
        category: "KYC / Customer Due Diligence",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Asset Reconstruction Companies – Know Your Customer Directions, 2025",
        authority: "RBI", date: "Nov 28, 2025", timestamp: 20251128,
        circularNo: "DOR.AML.REC.No.296/14.01.010/2025-26",
        category: "KYC / Customer Due Diligence",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    {
        title: "Regional Rural Banks – Know Your Customer Directions, 2025",
        authority: "RBI", date: "Jan 4, 2026", timestamp: 20260104,
        circularNo: "DOR.AML.REC.No.185/14.01.004/2025-26",
        category: "KYC / Customer Due Diligence",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
    },
    /* ══════════════════════════════════════════════════
       RBI — AML & Fraud Risk
    ══════════════════════════════════════════════════ */
    {
        title: "Master Directions on Fraud Risk Management in Commercial Banks (incl. RRBs) and AIFIs",
        authority: "RBI", date: "Jul 15, 2024", timestamp: 20240715,
        circularNo: "DOS.CO.FMG.SEC.No.5/23.04.001/2024-25",
        category: "Fraud / Cyber Risk",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12726",
    },
    {
        title: "Master Directions on Fraud Risk Management in Urban / State / Central Cooperative Banks",
        authority: "RBI", date: "Jul 15, 2024", timestamp: 20240715,
        circularNo: "DOS.CO.FMG.SEC.No.6/23.04.001/2024-25",
        category: "Fraud / Cyber Risk",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12727",
    },
    {
        title: "Master Directions on Fraud Risk Management in Non-Banking Financial Companies (incl. HFCs)",
        authority: "RBI", date: "Jul 15, 2024", timestamp: 20240715,
        circularNo: "DOS.CO.FMG.SEC.No.7/23.04.001/2024-25",
        category: "Fraud / Cyber Risk",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12728",
    },
    {
        title: "Master Directions on Frauds – Classification and Reporting by Commercial Banks and Select FIs",
        authority: "RBI", date: "Jul 1, 2016", timestamp: 20160701,
        circularNo: "DBS.CO.CFMC.BC.No.1/23.04.001/2016-17",
        category: "AML / CFT",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10022",
    },
    /* ══════════════════════════════════════════════════
       RBI — Risk Management
    ══════════════════════════════════════════════════ */
    {
        title: "Master Direction on Information Technology Governance, Risk, Controls and Assurance Practices",
        authority: "RBI", date: "Apr 10, 2024", timestamp: 20240410,
        circularNo: "DoS.CO.CSITEG/SEC.7/31.01.015/2023-24",
        category: "Fraud / Cyber Risk",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12274",
    },
    {
        title: "Cyber Security Framework in Banks",
        authority: "RBI", date: "Jun 2, 2016", timestamp: 20160602,
        circularNo: "DBS.CO/CSITE/BC.11/33.01.001/2015-16",
        category: "Fraud / Cyber Risk",
        viewUrl: "https://rbidocs.rbi.org.in/rdocs/notification/PDFs/NT53126052016_F.pdf",
    },
    {
        title: "Master Direction – RBI (Outsourcing of Information Technology Services) Directions, 2023",
        authority: "RBI", date: "Apr 10, 2024", timestamp: 20240410,
        circularNo: "RBI/2023-24/95 | DoS.CO.CSITE.SEC.7/31.01.015/2023-24",
        category: "Compliance & Governance",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12280",
    },
    {
        title: "Master Circular – Prudential Norms on Income Recognition, Asset Classification & Provisioning (IRACP)",
        authority: "RBI", date: "Apr 1, 2023", timestamp: 20230401,
        circularNo: "RBI/2023-24/07 | DOR.STR.REC.5/21.04.048/2023-24",
        category: "Compliance & Governance",
        viewUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasCirculardetails.aspx?id=12299",
    },
    {
        title: "Guidelines on Management of Operational Risk (Basel III / Standardised Approach)",
        authority: "RBI", date: "Feb 17, 2022", timestamp: 20220217,
        circularNo: "DOR.MRG.REC.93/00-00-007/2021-22",
        category: "Compliance & Governance",
        viewUrl: "https://www.rbi.org.in/Scripts/NotificationUser.aspx",
    },
    /* ══════════════════════════════════════════════════
       FIU-IND
    ══════════════════════════════════════════════════ */
    {
        title: "AML & CFT Guidelines for Reporting Entities Providing Services Related to Virtual Digital Assets (VDAs)",
        authority: "FIU-IND", date: "Mar 10, 2023 (Updated Sep 15, 2025)", timestamp: 20250915,
        circularNo: "F.No.9-8/2023/COMPL/FIUIND",
        category: "AML / CFT",
        viewUrl: "https://fiuindia.gov.in/files/AMLCFT_Guidelines_for_VDA_SPs.pdf",
    },
    {
        title: "AML & CFT Guidelines for Reporting Entities – Designated Non-Financial Businesses and Professions (DNFBP)",
        authority: "FIU-IND", date: "Jul 4, 2023", timestamp: 20230704,
        circularNo: "FIUIND/DNFBP/2023",
        category: "AML / CFT",
        viewUrl: "https://fiuindia.gov.in/files/AML_CFT_Guidelines_DNFBP.pdf",
    },
    {
        title: "Revised AML/CFT Guidelines for VDA Service Providers (Enhanced KYC – selfie verification, geo-location, penny-drop)",
        authority: "FIU-IND", date: "Sep 15, 2025", timestamp: 20250915,
        circularNo: "F.No. 9-8/2023/COMPL/FIUIND-Pt-II",
        category: "AML / CFT",
        viewUrl: "https://fiuindia.gov.in/files/AMLCFT_Guidelines_for_VDA_SPs_Revised.pdf",
    },
    /* ══════════════════════════════════════════════════
       SEBI — AML / CFT
    ══════════════════════════════════════════════════ */
    {
        title: "Master Circular – Guidelines on AML Standards and CFT / Obligations of Securities Market Intermediaries under PMLA 2002",
        authority: "SEBI", date: "Jun 6, 2024", timestamp: 20240606,
        circularNo: "SEBI/HO/MLSD/SEC5/P/CIR/2024/083",
        category: "AML / CFT",
        viewUrl: "https://www.sebi.gov.in/legal/circulars/jun-2024/master-circular-on-guidelines-on-anti-money-laundering-aml-standards-and-counter-financing-of-terrorism-cft-obligations-of-securities-market-intermediaries-under-the-prevention-of-money-laundering-act_83965.html",
    },
    /* ══════════════════════════════════════════════════
       SEBI — KYC
    ══════════════════════════════════════════════════ */
    {
        title: "Master Circular on Know Your Client (KYC) Norms for the Securities Market",
        authority: "SEBI", date: "Oct 12, 2023", timestamp: 20231012,
        circularNo: "SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169",
        category: "KYC / Customer Due Diligence",
        viewUrl: "https://www.sebi.gov.in/legal/circulars/oct-2023/master-circular-on-know-your-client-kyc-norms-for-the-securities-market_77920.html",
    },
    {
        title: "Uploading of KYC Information by KYC Registration Agencies (KRAs) to Central KYC Records Registry (CKYCRR)",
        authority: "SEBI", date: "Jun 27, 2024", timestamp: 20240627,
        circularNo: "SEBI/HO/MIRSD/SEC-3/P/CIR/2024/088",
        category: "KYC / Customer Due Diligence",
        viewUrl: "https://www.sebi.gov.in/legal/circulars/jun-2024/uploading-of-kyc-information-by-kyc-registration-agencies-kras-to-central-kyc-records-registry-ckycrr_84149.html",
    },
    {
        title: "Guidelines in Pursuance of Amendment to SEBI KYC Registration Agency (KRA) Regulations, 2011",
        authority: "SEBI", date: "Jan 2025", timestamp: 20250101,
        circularNo: "NSE Circular ISC66053",
        category: "KYC / Customer Due Diligence",
        viewUrl: "https://nsearchives.nseindia.com/corporate/content/ISC66053_21012025110000.pdf",
    },
    {
        title: "Publishing Investor Charter for KYC (Know Your Client) Registration Agencies (KRAs) on their Websites",
        authority: "SEBI", date: "May 2025", timestamp: 20250501,
        circularNo: "SEBI/HO/MIRSD/PODFATF/P/CIR/2025/62",
        category: "KYC / Customer Due Diligence",
        viewUrl: "https://www.sebi.gov.in/legal/circulars/may-2025/publishing-investor-charter-for-kyc-registration-agencies-kras_88000.html",
    },
    /* ══════════════════════════════════════════════════
       SEBI — Risk Management
    ══════════════════════════════════════════════════ */
    {
        title: "Cyber Security & Cyber Resilience Framework for SEBI-Registered Intermediaries",
        authority: "SEBI", date: "Dec 28, 2023", timestamp: 20231228,
        circularNo: "SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2025/119",
        category: "Fraud / Cyber Risk",
        viewUrl: "https://www.sebi.gov.in/legal/circulars/dec-2023/cyber-security-and-cyber-resilience-framework-for-sebi-registered-intermediaries_79246.html",
    },
    /* ══════════════════════════════════════════════════
       IRDAI
    ══════════════════════════════════════════════════ */
    {
        title: "IRDAI Master Guidelines on Anti-Money Laundering / Counter Financing of Terrorism (AML/CFT) for all Insurers",
        authority: "IRDAI", date: "Aug 2022", timestamp: 20220801,
        circularNo: "IRDAI/SDD/GDL/AML/062/01/2022",
        category: "AML / CFT",
        viewUrl: "https://irdai.gov.in/document/37343/0/AML-CFT-Master-Guidelines.pdf",
    },
    {
        title: "Amendment to Master Guidelines on Anti-Money Laundering / Counter Financing of Terrorism (AML/CFT) 2022",
        authority: "IRDAI", date: "Aug 2025", timestamp: 20250801,
        circularNo: "IRDAI/IID/CIR/MISC/177/10/2023",
        category: "AML / CFT",
        viewUrl: "https://irdai.gov.in/",
    },
];

export default function RegulatoryUpdatesPage() {
    const [filterAuthority, setFilterAuthority] = useState("All Regulators");
    const [filterCategory, setFilterCategory] = useState("All Categories");
    const [filterSort, setFilterSort] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = useMemo(() => {
        let list = [...allCirculars];
        if (filterAuthority !== "All Regulators") list = list.filter(c => c.authority === filterAuthority);
        if (filterCategory !== "All Categories") list = list.filter(c => c.category === filterCategory);
        list.sort((a, b) => filterSort === "newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp);
        return list;
    }, [filterAuthority, filterCategory, filterSort]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginatedItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filtered.length);

    const handleFilterChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        setter(e.target.value);
        setCurrentPage(1);
    };

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-36 pb-10 bg-white overflow-hidden">
                <div className="container relative mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
                        <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-4 block">Regulatory Updates</span>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-5 leading-tight">
                            Tracking Developments Across <br />
                            <span className="bg-gradient-to-r from-[#C2B020] to-[#59626E] text-transparent bg-clip-text uppercase tracking-widest block mt-2">India's AML/CFT Framework</span>
                        </h1>
                        <p className="text-lg text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
                            Track important circulars, notifications, advisories, and regulatory updates relevant to reporting entities and the broader financial crime prevention ecosystem.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Circulars + Filters */}
            <section className="py-10 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">

                        {/* Header + Filters */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-5">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] mb-1">Recent Circulars &amp; Notifications</h2>
                                <p className="text-secondary text-sm">
                                    Showing <span className="font-bold text-accent">{filtered.length > 0 ? `${startItem}–${endItem}` : '0'}</span> of <span className="font-bold">{filtered.length}</span> circulars
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 bg-[#f5f5f7] p-1.5 rounded-xl border border-gray-100">
                                <Filter size={13} className="text-secondary ml-1.5" />
                                <select value={filterAuthority} onChange={handleFilterChange(setFilterAuthority)}
                                    className="bg-transparent px-2.5 py-1.5 font-bold text-[12px] text-secondary focus:outline-none cursor-pointer">
                                    {AUTHORITIES.map(a => <option key={a}>{a}</option>)}
                                </select>
                                <div className="w-px h-4 bg-gray-200" />
                                <select value={filterCategory} onChange={handleFilterChange(setFilterCategory)}
                                    className="bg-transparent px-2.5 py-1.5 font-bold text-[12px] text-secondary focus:outline-none cursor-pointer">
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                                <div className="w-px h-4 bg-gray-200" />
                                <select value={filterSort} onChange={handleFilterChange(setFilterSort)}
                                    className="bg-transparent px-2.5 py-1.5 font-bold text-[12px] text-secondary focus:outline-none cursor-pointer">
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                </select>
                            </div>
                        </div>

                        {/* List */}
                        {filtered.length === 0 ? (
                            <div className="py-16 text-center text-secondary font-medium">No circulars found for the selected filters.</div>
                        ) : (
                            <>
                                <div className="space-y-3">
                                    {paginatedItems.map((c, i) => (
                                        <motion.div key={`${c.circularNo}-${i}`}
                                            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: Math.min(i * 0.03, 0.25) }}
                                            className="px-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                                <div className="space-y-1.5 flex-1 min-w-0">
                                                    {/* Badges */}
                                                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wide">
                                                        <span className={`px-2.5 py-0.5 rounded-full border ${BADGE[c.authority] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                                                            {c.authority}
                                                        </span>
                                                        <span className="bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full border border-gray-200">
                                                            {c.category}
                                                        </span>
                                                        <span className="text-secondary font-medium normal-case text-[12px]">{c.date}</span>
                                                    </div>
                                                    {/* Title */}
                                                    <h3 className="text-[15px] font-bold text-[#1d1d1f] group-hover:text-accent transition-colors leading-snug">
                                                        {c.title}
                                                    </h3>
                                                    {/* Ref number */}
                                                    <p className="text-[11px] text-secondary/60 font-mono truncate">{c.circularNo}</p>
                                                </div>
                                                <a href={c.viewUrl} target="_blank" rel="noopener noreferrer"
                                                    className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-xs font-bold text-secondary hover:bg-[#1d1d1f] hover:text-white hover:border-[#1d1d1f] transition-all uppercase tracking-tight whitespace-nowrap">
                                                    View Circular <ExternalLink size={11} />
                                                </a>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                                        <p className="text-sm text-secondary font-medium">
                                            Showing <span className="font-bold text-[#1d1d1f]">{startItem}–{endItem}</span> of <span className="font-bold text-[#1d1d1f]">{filtered.length}</span> circulars
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                                disabled={currentPage === 1}
                                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-secondary hover:bg-[#1d1d1f] hover:text-white hover:border-[#1d1d1f] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                <ChevronLeft size={14} />
                                            </button>
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                                                        page === currentPage
                                                            ? 'bg-[#1d1d1f] text-white'
                                                            : 'border border-gray-200 text-secondary hover:border-[#1d1d1f] hover:text-[#1d1d1f]'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                disabled={currentPage === totalPages}
                                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-secondary hover:bg-[#1d1d1f] hover:text-white hover:border-[#1d1d1f] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Explore More */}
            <section className="py-14 bg-white border-t border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-[#1d1d1f] mb-8 italic opacity-50 font-serif">Explore More</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <a href="/meetings" className="group">
                                <h5 className="font-bold text-base mb-1 group-hover:text-accent transition-colors">Explore ARIFAC Programs</h5>
                                <div className="h-0.5 w-10 bg-accent mx-auto scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                            </a>
                            <a href="/membership/launching-soon" className="group">
                                <h5 className="font-bold text-base mb-1 group-hover:text-accent transition-colors">Apply for Membership</h5>
                                <div className="h-0.5 w-10 bg-accent mx-auto scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                            </a>
                            <a href="mailto:help.arifac@iamai.in" className="group">
                                <h5 className="font-bold text-base mb-1 group-hover:text-accent transition-colors">Contact ARIFAC Secretariat</h5>
                                <p className="text-xs text-secondary">help.arifac@iamai.in</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
