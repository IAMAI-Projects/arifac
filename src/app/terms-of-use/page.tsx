'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import {
    FileText,
    ChevronRight,
    Search,
    Download,
    Mail,
    Globe,
    Clock
} from 'lucide-react';

const terms_content = [
    {
        id: "acceptance",
        num: 1,
        title: "Acceptance of Terms",
        content: [
            "a. These Terms of Use govern access to and use of the ARIFAC website and related digital platforms (\"Platform\"). By accessing or using the Platform, you agree to be bound by these Terms, as may be amended from time to time. Continued use of the Platform shall constitute acceptance of any modifications or updates."
        ]
    },
    {
        id: "about",
        num: 2,
        title: "About ARIFAC",
        content: [
            "a. ARIFAC (Alliance of Reporting Entities in India for AML/CFT) is an industry-led initiative operated by the Internet and Mobile Association of India (IAMAI) under the guidance of the Financial Intelligence Unit – India (FIU-IND).",
            "b. ARIFAC functions as a collaborative platform for capacity building, industry engagement, and knowledge sharing within the AML/CFT ecosystem.",
            "c. ARIFAC does not act as a regulatory authority and does not grant any regulatory approvals, recognition, or exemptions under applicable laws."
        ]
    },
    {
        id: "permitted-use",
        num: 3,
        title: "Permitted Use of Platform",
        content: [
            "a. The Platform may be used solely for lawful purposes, including accessing information, participating in ARIFAC programs, and professional development. Users agree to use the Platform in compliance with applicable laws and these Terms."
        ]
    },
    {
        id: "prohibited-conduct",
        num: 4,
        title: "Prohibited Conduct",
        content: [
            "a. Users shall not misuse the Platform or engage in any activity that may compromise its integrity, including attempting unauthorised access, disrupting system operations, scraping data, reverse engineering, or misrepresenting affiliation with ARIFAC, IAMAI, FIU-IND, or any associated stakeholders."
        ]
    },
    {
        id: "ip-rights",
        num: 5,
        title: "Intellectual Property Rights",
        content: [
            "a. All content available on the Platform, including training materials, frameworks, certifications, logos, and branding, is proprietary to ARIFAC and/or IAMAI and is protected under applicable intellectual property laws.",
            "b. Unauthorized use, reproduction, distribution, or commercial exploitation of such content is strictly prohibited."
        ]
    },
    {
        id: "monitoring",
        num: 6,
        title: "Monitoring and Enforcement",
        content: [
            "a. ARIFAC reserves the right to monitor usage of the Platform and investigate any suspected misuse or violation of these Terms.",
            "b. ARIFAC may, at its discretion, restrict, suspend, or terminate access to the Platform in cases of non-compliance or conduct that may adversely affect ARIFAC, its stakeholders, or the integrity of its programs."
        ]
    },
    {
        id: "disclaimer",
        num: 7,
        title: "Disclaimer",
        content: [
            "a. All content provided on the Platform is for educational and informational purposes only and does not constitute legal, regulatory, or compliance advice.",
            "b. While ARIFAC programs may cover applicable laws and regulatory frameworks, ARIFAC does not guarantee the accuracy, completeness, or continued applicability of such information.",
            "c. Users remain solely responsible for ensuring compliance with all applicable laws and regulations, including obligations under the Prevention of Money Laundering Act, 2002 (PMLA), and for seeking independent professional advice where required.",
            "d. ARIFAC shall not be liable for any regulatory actions, penalties, or compliance failures arising from reliance on Platform content."
        ]
    },
    {
        id: "indemnity",
        num: 8,
        title: "Indemnity",
        content: [
            "a. Users agree to indemnify and hold harmless ARIFAC, IAMAI, and their officers, employees, affiliates, and representatives from and against any claims, damages, liabilities, costs, or expenses arising out of misuse of the Platform, breach of these Terms, or violation of applicable laws or regulations."
        ]
    },
    {
        id: "liability",
        num: 9,
        title: "Limitation of Liability",
        content: [
            "a. To the maximum extent permitted by law, ARIFAC shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from or in connection with the use of the Platform.",
            "b. Any liability, if established, shall be limited to the fees paid by the user, if any."
        ]
    },
    {
        id: "third-party",
        num: 10,
        title: "Third-Party Links",
        content: [
            "a. The Platform may contain links to third-party websites or resources for convenience.",
            "b. ARIFAC does not control, endorse, or assume responsibility for the content, policies, or practices of such third-party platforms."
        ]
    },
    {
        id: "amendments",
        num: 11,
        title: "Amendments to Terms",
        content: [
            "a. ARIFAC reserves the right to amend these Terms from time to time. Updated Terms shall be published on the ARIFAC website and shall become effective as specified therein.",
            "b. Users are advised to review the Terms periodically. Continued use of the Platform shall constitute acceptance of such amendments."
        ]
    },
    {
        id: "governing-law",
        num: 12,
        title: "Governing Law and Jurisdiction",
        content: [
            "a. These Terms shall be governed by the laws of India. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India."
        ]
    }
];

export default function TermsOfUsePage() {
    const [activeSection, setActiveSection] = useState(terms_content[0].id);

    useEffect(() => {
        const handleScroll = () => {
            const sections = terms_content.map(section => document.getElementById(section.id));
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(terms_content[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <main className="min-h-screen bg-white font-sans text-[#1d1d1f]">
            <Navbar />

            {/* Document Header */}
            <section className="pt-28 pb-10 bg-[#f5f5f7] border-b border-gray-200">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div>
                                <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest mb-4">
                                    <Globe size={16} /> Legal Documentation
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    Website Terms of Use
                                </h1>
                                <div className="flex items-center gap-6 text-secondary text-sm font-medium">
                                    <span className="flex items-center gap-2">
                                        <Clock size={14} /> Last Updated: March 2024
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FileText size={14} /> Official Policy
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-4">

                                <a href="mailto:help.arifac@iamai.in" className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-bold hover:opacity-90 transition-all text-sm shadow-sm">
                                    <Mail size={18} /> Contact Legal
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Document Content */}
            <section className="py-12">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">

                        {/* Sidebar Navigation */}
                        <aside className="lg:w-80 shrink-0">
                            <div className="sticky top-32">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#1d1d1f] mb-6 flex items-center gap-2">
                                    <FileText size={16} /> Table of Contents
                                </h3>
                                <div className="space-y-1">
                                    {terms_content.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => scrollToSection(item.id)}
                                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between group ${activeSection === item.id
                                                    ? "bg-accent/10 text-accent"
                                                    : "text-secondary hover:bg-gray-50"
                                                }`}
                                        >
                                            <span className="truncate pr-4">{item.num}. {item.title}</span>
                                            <ChevronRight
                                                size={14}
                                                className={`transition-transform grow-0 shrink-0 ${activeSection === item.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}
                                            />
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-12 p-6 bg-[#f5f5f7] rounded-2xl">
                                    <h4 className="font-bold text-sm mb-2">Need assistance?</h4>
                                    <p className="text-xs text-secondary leading-relaxed mb-4">
                                        Our legal and compliance team can help clarify any part of these terms.
                                    </p>
                                    <a href="mailto:help.arifac@iamai.in" className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
                                        Email Support <ChevronRight size={12} />
                                    </a>
                                </div>
                            </div>
                        </aside>

                        {/* Main Text Content */}
                        <div className="flex-1 lg:max-w-3xl">
                            <div className="prose prose-lg prose-headings:font-bold prose-headings:text-[#1d1d1f] max-w-none">
                                {terms_content.map((section) => (
                                    <div
                                        key={section.id}
                                        id={section.id}
                                        className="mb-16 scroll-mt-32"
                                    >
                                        <h2 className="text-2xl md:text-3xl font-bold mb-8 pb-4 border-b border-gray-100">
                                            {section.num}. {section.title}
                                        </h2>
                                        <div className="space-y-6">
                                            {section.content.map((paragraph, index) => (
                                                <p
                                                    key={index}
                                                    className="text-lg text-secondary leading-relaxed text-justify"
                                                >
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Final Note */}
                            <div className="mt-20 pt-12 border-t border-gray-100">
                                <div className="bg-[#1d1d1f] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold mb-4">Acknowledgment</h3>
                                        <p className="text-white/70 text-lg leading-relaxed mb-8">
                                            By continuing to use our Platform, you acknowledge that you have read, understood, and agreed to be bound by these Website Terms of Use.
                                        </p>
                                        <div className="flex flex-wrap gap-4">
                                            <div className="px-5 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium border border-white/10">
                                                Effective: March 2024
                                            </div>
                                            <div className="px-5 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium border border-white/10">
                                                Version 1.0
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}


