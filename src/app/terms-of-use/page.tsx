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
            "These Terms of Use govern access to and use of the ARIFAC website and related digital platforms (\"Platform\"). By accessing or using the Platform, you agree to be bound by these Terms, as may be amended from time to time. Continued use of the Platform shall constitute acceptance of any modifications or updates.",
            "Users must be at least 18 years of age to access or use the Platform. By using the Platform, you consent to the use of cookies as described in our policies. Users must not violate the intellectual property rights of ARIFAC, FIU-IND, or IAMAI in any manner.",
            "By registering on the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety."
        ]
    },
    {
        id: "about",
        num: 2,
        title: "About ARIFAC",
        content: [
            "ARIFAC (Alliance of Reporting Entities in India for AML/CFT) is an industry-led initiative operated by the Internet and Mobile Association of India (IAMAI) under the guidance of the Financial Intelligence Unit \u2013 India (FIU-IND).",
            "ARIFAC functions as a collaborative platform for capacity building, industry engagement, and knowledge sharing within the AML/CFT ecosystem.",
            "ARIFAC does not act as a regulatory authority and does not grant any regulatory approvals, recognition, or exemptions under applicable laws."
        ]
    },
    {
        id: "permitted-use",
        num: 3,
        title: "Permitted Use of Platform",
        content: [
            "The Platform may be used solely for lawful purposes, including accessing information, participating in ARIFAC programs, and professional development. Users must not download any material from the Platform or save it to their computer or device except as expressly permitted. Users must not use the Platform for any purposes other than those intended.",
            "ARIFAC and IAMAI prohibit the modification, editing, and out-of-context use of any material available on the Platform. Users may not modify, publish, transmit, reproduce, create derivative works from, distribute, perform, display, or in any way exploit any content available on the Platform.",
            "Users must not scrape or extract data from the Platform. Users must not use the Platform for monitoring, benchmarking, or throttling purposes. Users must not access content by any means other than the interface provided by the Platform.",
            "ARIFAC reserves the right to restrict access to the Platform at its sole discretion."
        ]
    },
    {
        id: "prohibited-conduct",
        num: 4,
        title: "Prohibited Conduct",
        content: [
            "Users shall not misuse the Platform or engage in any activity that may compromise its integrity, including attempting unauthorized access, disrupting system operations, scraping data, reverse engineering, or misrepresenting affiliation with ARIFAC, IAMAI, FIU-IND, or any associated stakeholders.",
            "Users must not use the Platform unlawfully or in any way that causes damage or impairment to the Platform. Users must not transmit spyware, viruses, or any other harmful software through or in connection with the Platform. Users must not use automated means to access the Platform and must not violate robots.txt directives.",
            "Users must not use any data obtained from the Platform for direct marketing purposes. Users must not contact individuals using data collected from the Platform.",
            "Users must ensure that all information supplied to the Platform is true, accurate, current, complete, and non-misleading."
        ]
    },
    {
        id: "ip-rights",
        num: 5,
        title: "Intellectual Property Rights",
        content: [
            "All content available on the Platform, including training materials, frameworks, certifications, logos, and branding, is proprietary to ARIFAC and/or IAMAI and is protected under applicable intellectual property laws. Unauthorized use, reproduction, distribution, or commercial exploitation of such content is strictly prohibited.",
            "All IAMAI and/or ARIFAC trademarks and trade names are the exclusive property of IAMAI and/or ARIFAC respectively. The Platform and all related software, media, design, and content is the sole and exclusive property of IAMAI/ARIFAC, protected by copyright, trademark, and other intellectual property laws of India and other countries.",
            "Users may not sell, modify, reproduce, display, publicly perform, distribute, or otherwise use the Platform content in any way for any public or commercial purpose."
        ]
    },
    {
        id: "registration",
        num: 6,
        title: "Registration and Accounts",
        content: [
            "You may register for an account by completing the registration form on the Platform and clicking on the verification link in the email sent to you.",
            "You must not allow any other person to use your account. You must notify us immediately if you become aware of any unauthorized use of your account. You must not use any other person\u2019s account."
        ]
    },
    {
        id: "login-details",
        num: 7,
        title: "User Login Details",
        content: [
            "If you register for an account, you will be provided with or asked to choose a user ID and password. Your user ID must not be liable to mislead, and you must not use your account for the purpose of impersonation.",
            "You must keep your password confidential. You must notify us immediately if you become aware of any unauthorized disclosure of your password.",
            "You are responsible for any activity on the Platform arising from your failure to keep your password confidential, and you may be held liable for any losses arising out of such a failure."
        ]
    },
    {
        id: "cancellation",
        num: 8,
        title: "Cancellation and Suspension of Account",
        content: [
            "If we find that you have violated these Terms, we have the right to suspend your account, cancel your account, and/or edit your account details at any time in our sole discretion without notice or explanation.",
            "You may cancel your account at any time using your account control panel on the Platform."
        ]
    },
    {
        id: "content-licence",
        num: 9,
        title: "Your Content: Licence",
        content: [
            "In these Terms, \"your content\" means information required by the Platform in connection with your use of the Platform. You grant ARIFAC a worldwide, non-exclusive, royalty-free right and licence to use, reproduce, store, adapt, publish, translate, and distribute your content in connection with the Platform.",
            "You may edit your content to the extent permitted using the editing functionality made available on the Platform.",
            "Without prejudice to ARIFAC\u2019s other rights under these Terms, if you breach any provision of these Terms in any way, ARIFAC may delete, un-publish, or edit any or all of your content."
        ]
    },
    {
        id: "content-rules",
        num: 10,
        title: "Your Content: Rules",
        content: [
            "You warrant and represent that your content will comply with these Terms. Your content must not be illegal or unlawful, must not infringe any person\u2019s legal rights, and must not be capable of giving rise to legal action against any person.",
            "Your content must be correct, accurate, and authentic and must not violate any applicable laws, rules, or regulations, or infringe any copyright, moral right, database right, trademark right, design right, or other intellectual property rights."
        ]
    },
    {
        id: "monitoring",
        num: 11,
        title: "Monitoring and Enforcement",
        content: [
            "ARIFAC reserves the right to monitor usage of the Platform and investigate any suspected misuse or violation of these Terms.",
            "ARIFAC may, at its discretion, restrict, suspend, or terminate access to the Platform in cases of non-compliance or conduct that may adversely affect ARIFAC, its stakeholders, or the integrity of its programs."
        ]
    },
    {
        id: "disclaimer",
        num: 12,
        title: "Disclaimer",
        content: [
            "All content provided on the Platform is for educational and informational purposes only and does not constitute legal, regulatory, or compliance advice. While ARIFAC programs may cover applicable laws and regulatory frameworks, ARIFAC does not guarantee the accuracy, completeness, or continued applicability of such information.",
            "Users remain solely responsible for ensuring compliance with all applicable laws and regulations, including obligations under the Prevention of Money Laundering Act, 2002 (PMLA). ARIFAC shall not be liable for any regulatory actions, penalties, or compliance failures arising from reliance on Platform content.",
            "IAMAI/ARIFAC does not warrant that the information on the Platform is accurate or complete and disclaims all liability for any loss or damage caused by errors or omissions therein. IAMAI/ARIFAC assumes no liability for the interpretation and/or use of such information and offers no warranty of any kind.",
            "ARIFAC reserves the right to discontinue or alter any or all of its services without notice or explanation. To the maximum extent permitted by applicable law, ARIFAC excludes all representations and warranties relating to the Platform and its use."
        ]
    },
    {
        id: "indemnity",
        num: 13,
        title: "Indemnity",
        content: [
            "Users agree to fully indemnify and hold harmless ARIFAC, IAMAI, and their officers, employees, affiliates, and representatives from any claims, damages, liabilities, penalties, fines, settlements, attorneys\u2019 fees, costs, or expenses arising from or related to any claim made by any third party due to the user\u2019s access to or use of the Platform, creation of or transmittal of content, misuse of the Platform, breach of these Terms, or infringement of any intellectual property or other right, or violation of applicable laws."
        ]
    },
    {
        id: "liability",
        num: 14,
        title: "Limitation of Liability",
        content: [
            "To the maximum extent permitted by law, ARIFAC shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from or in connection with the use of the Platform.",
            "Any liability, if established, shall be limited to the fees paid by the user, if any."
        ]
    },
    {
        id: "breach",
        num: 15,
        title: "Breach of these Terms",
        content: [
            "IAMAI/ARIFAC may immediately terminate a user\u2019s access to the Platform without prior notice. Without limiting the foregoing, access may be terminated for breach of these Terms, request by law enforcement, or unexpected technical issues. All terminations are at the sole discretion of IAMAI/ARIFAC.",
            "IAMAI/ARIFAC does not assume any liability for damage arising from transmissions over the internet. Submitted data shall not be deemed confidential, shall not create any fiduciary obligations, and shall not result in liability if inadvertently released. IAMAI/ARIFAC takes no responsibility for uploaded information and shall not be responsible for its deletion, correction, destruction, damage, or loss.",
            "IAMAI/ARIFAC is not responsible for any loss of information through the action of third parties or circumstances beyond its control. Neither IAMAI nor ARIFAC shall be liable for any direct, indirect, incidental, special, consequential, punitive, or exemplary damages arising from the use of the Platform.",
            "The user\u2019s only right or remedy with respect to the Platform is to uninstall and/or discontinue use of the Platform."
        ]
    },
    {
        id: "third-party",
        num: 16,
        title: "Third-Party Links",
        content: [
            "The Platform may contain links to third-party websites or resources for convenience. ARIFAC does not control, endorse, or assume responsibility for the content, policies, or practices of such third-party platforms."
        ]
    },
    {
        id: "amendments",
        num: 17,
        title: "Amendments to Terms",
        content: [
            "ARIFAC reserves the right to amend these Terms from time to time. Updated Terms shall be published on the ARIFAC website and shall become effective as specified therein. ARIFAC may modify, add, or remove terms without notice or liability. Changes are effective immediately upon posting.",
            "Users may be notified of changes through pop-up notifications, push notifications, or email. Users are advised to review the Terms periodically. Continued use of the Platform shall constitute acceptance of such amendments."
        ]
    },
    {
        id: "assignment",
        num: 18,
        title: "Assignment",
        content: [
            "ARIFAC may assign, transfer, sub-contract, or otherwise deal with its rights and/or obligations under these Terms without prior notice or consent.",
            "Users may not, without the prior written consent of ARIFAC, assign, transfer, sub-contract, or otherwise deal with any of their rights and/or obligations under these Terms."
        ]
    },
    {
        id: "governing-law",
        num: 19,
        title: "Governing Law and Jurisdiction",
        content: [
            "These Terms shall be governed by the laws of India. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India."
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
                                        <Clock size={14} /> Effective: 23rd March, 2026
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
                                                Effective: 23rd March, 2026
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


