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
    Clock,
    Shield
} from 'lucide-react';

const privacy_content = [
    {
        id: "introduction",
        num: 1,
        title: "Introduction",
        content: [
            "This Privacy Policy describes how ARIFAC (Alliance of Reporting Entities in India for AML/CFT), operated by the Internet and Mobile Association of India (IAMAI) under the guidance of the Financial Intelligence Unit \u2013 India (FIU-IND), collects, uses, processes, stores, and protects personal data of individuals (\u201CData Principals\u201D) who access or use ARIFAC platforms, including its website, Learning Management Program (LMP), membership services, and certification programs.",
            "By accessing or using ARIFAC services, you consent to the collection and processing of your personal data in accordance with this Policy and applicable laws, including the Digital Personal Data Protection Act, 2023 (\u201CDPDP Act\u201D) and the Digital Personal Data Protection Rules, 2025 and any amendments thereto.",
            "PLEASE READ THIS PRIVACY POLICY BEFORE USING ARIFAC\u2019s SERVICES. BY USING ARIFAC\u2019S SERVICES OR SUBMITTING THE INFORMATION, YOU (\u2018You\u2019 or \u2018you\u2019 or \u2018yourself\u2019 or \u2018User\u2019 or \u2018your\u2019 or \u2018user\u2019) AGREE THAT YOU ARE OF THE AGE OF 18 YEARS OR ABOVE AND EXPRESSLY CONSENT TO THE PROCESSING AND USE OF THE INFORMATION ACCORDING TO THE PRIVACY POLICY."
        ]
    },
    {
        id: "scope",
        num: 2,
        title: "Scope of Policy",
        content: [
            "This Policy applies to all users of ARIFAC services, including: (i) Website visitors, (ii) Registered users, (iii) Learners and certification candidates, and (iv) Member organization representatives.",
            "This Policy covers personal data collected through digital platforms, forms, communications, and program participation. By registering on our platform for ARIFAC services, you specifically consent to the use and transmission/transfer/sharing of your personal data and information to provide the services to you.",
            "This Privacy Policy does not apply to companies or entities that ARIFAC does not own or control, or has no contractual relationship with. If you choose not to provide the personal information/personal data that we seek from you, then you may not be able to avail the ARIFAC services and we may also not be able to respond to any queries that you may have.",
            "ARIFAC (and its licensors, if applicable) owns exclusively and absolutely all rights, title and interest, including all related intellectual property rights, in the platform and the ARIFAC services, and any suggestions, ideas, improvements, enhancement requests, feedback, recommendations and other information provided by you relating to the platform and its services."
        ]
    },
    {
        id: "categories",
        num: 3,
        title: "Categories of Personal Data Collected",
        content: [
            "ARIFAC may collect and process the following categories of personal data: (i) Identity Information: Name, date of birth, photograph, Aadhaar/PAN/passport or other identification details (where required); (ii) Contact Information: Email address, phone number, address; (iii) Professional Information: Employer details, designation, industry affiliation, work history; (iv) Educational and Certification Data: Course enrollment, progress, assessment results, certification status; (v) Technical Data: IP address, device details, browser information, login activity; (vi) Audio-Visual Data: Video, audio, and screen recordings during remote proctored examinations; (vii) Transactional Data: Payment details (processed through authorised payment gateways).",
            "ARIFAC shall collect only such data as is necessary for lawful purposes."
        ]
    },
    {
        id: "purpose",
        num: 4,
        title: "Purpose of Data Processing",
        content: [
            "Personal data shall be processed for lawful purposes including: (i) User registration, onboarding, and account management; (ii) Delivery of LMP training programs and certification services; (iii) Conduct of examinations and identity verification; (iv) Issuance, validation, and publication of certifications; (v) Communication of program updates, notifications, and support; (vi) Compliance with legal, regulatory, and audit requirements; (vii) Prevention of fraud, misuse, or unauthorised access.",
            "Personal data shall not be processed for purposes incompatible with the above."
        ]
    },
    {
        id: "legal-basis",
        num: 5,
        title: "Legal Basis and Consent",
        content: [
            "Processing of personal data shall be based on: (i) Consent provided by the Data Principal at the time of registration or use of services; (ii) Legitimate uses permitted under applicable law; (iii) Compliance with legal obligations, including regulatory or law enforcement requirements.",
            "Users may withdraw consent where applicable, subject to consequences such as suspension of access to services."
        ]
    },
    {
        id: "data-sharing",
        num: 6,
        title: "Data Sharing and Disclosure",
        content: [
            "ARIFAC may share personal data only under the following circumstances: (i) With regulatory authorities or law enforcement agencies where required under applicable law; (ii) With service providers (e.g., LMS platforms, proctoring providers, payment gateways) under strict confidentiality obligations; (iii) With member organisations, where users are nominated participants (limited to program participation data); (iv) For certification verification, including publication of certified user lists (name, organisation, certification status); (v) For business transfers: ARIFAC may sell, transfer or otherwise share some or all of its assets, including any personal information, or non-identifiable information in connection with a merger, acquisition, reorganisation or sale of assets or in the event of bankruptcy.",
            "ARIFAC shall not sell personal data to third parties."
        ]
    },
    {
        id: "data-retention",
        num: 7,
        title: "Data Retention",
        content: [
            "Personal data shall be retained only for as long as necessary to fulfil the purposes outlined in this Policy, including: (i) Certification and audit records; (ii) Legal and regulatory compliance; (iii) Dispute resolution.",
            "Upon expiry of retention requirements, data shall be securely deleted or anonymised."
        ]
    },
    {
        id: "data-security",
        num: 8,
        title: "Data Security Measures",
        content: [
            "ARIFAC shall implement reasonable security safeguards, including: (i) Access controls and authentication mechanisms; (ii) Encryption and secure data storage; (iii) Monitoring and audit of system access; (iv) Secure handling of proctoring data.",
            "However, no system is completely secure, and ARIFAC does not guarantee absolute security."
        ]
    },
    {
        id: "rights",
        num: 9,
        title: "Rights of Data Principals",
        content: [
            "Under the DPDP Act, users (Data Principals) have the right to: (i) Access information about their personal data; (ii) Request correction or updating of inaccurate data; (iii) Request erasure of personal data (subject to legal limitations); (iv) Withdraw consent (where applicable); (v) Grievance redressal.",
            "Requests may be submitted through the contact details provided in the Grievance Redressal section below."
        ]
    },
    {
        id: "obligations",
        num: 10,
        title: "Obligations of Users (Data Principals)",
        content: [
            "Users shall ensure that: (i) All personal data provided is accurate and up to date; (ii) They do not impersonate or provide false information; (iii) They comply with applicable laws and ARIFAC policies."
        ]
    },
    {
        id: "cross-border",
        num: 11,
        title: "Cross-Border Data Transfers",
        content: [
            "Personal data may be stored or processed in India or in jurisdictions permitted under applicable laws. ARIFAC shall ensure that such transfers comply with the DPDP Act and applicable safeguards."
        ]
    },
    {
        id: "cookies",
        num: 12,
        title: "Cookies and Tracking Technologies",
        content: [
            "The ARIFAC website may use cookies and similar technologies to enhance user experience, analyse usage patterns, and improve services. Users may control cookie preferences through browser settings. If the User does not accept cookies, it may not be able to use all portions and functionality of the Platform.",
            "Third-party websites which are accessible from our platform via links, click-through or banner advertising may use cookies. However, it is important for us to inform you that we have no access or control over such cookies and do not accept responsibility with regards to them."
        ]
    },
    {
        id: "third-party-links",
        num: 13,
        title: "Links to Third-Party Websites/Platforms",
        content: [
            "Our platform may contain links to other third-party websites/platforms. The User\u2019s use of websites/platforms to which the platform links is subject to the terms of use and privacy policies located on such third-party websites/platforms.",
            "ARIFAC absolutely disclaims any liability or responsibility for any disclosure by you or anyone on your behalf of any of your personal information/data, which may be posted on any parts of the platform."
        ]
    },
    {
        id: "usage-data",
        num: 14,
        title: "Usage Data",
        content: [
            "ARIFAC may also collect information that your browser sends whenever you visit our platform or when you access the platform by or through a mobile device (\u201CUsage Data\u201D).",
            "This Usage Data may include information such as your computer\u2019s internet protocol address (e.g. IP address), browser type, browser version, the pages of our Platform that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.",
            "When you access the platform by or through a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data."
        ]
    },
    {
        id: "location-data",
        num: 15,
        title: "Location Data",
        content: [
            "We may use and store information about your location if you give us permission to do so (\u201CLocation Data\u201D). We use this data to provide features of our platform, to improve and customise our platform.",
            "You can enable or disable location services when you use our platform at any time, through your device settings."
        ]
    },
    {
        id: "grievance",
        num: 16,
        title: "Grievance Redressal and Data Protection Contact",
        content: [
            "For any queries, requests, or grievances relating to personal data, users may contact the ARIFAC Data Protection / Grievance Officer at: help.arifac@iamai.in",
            "ARIFAC shall address grievances within a reasonable timeframe in accordance with applicable law."
        ]
    },
    {
        id: "liability",
        num: 17,
        title: "Limitation of Liability",
        content: [
            "ARIFAC shall not be liable for any unauthorised access, loss, or misuse of personal data or information arising from circumstances beyond its reasonable control, including user-side vulnerabilities or force majeure events."
        ]
    },
    {
        id: "amendments",
        num: 18,
        title: "Amendments to this Policy",
        content: [
            "ARIFAC reserves the right to update or modify this Privacy Policy from time to time. Updated versions shall be published on the ARIFAC website. Users are advised to review the Policy periodically.",
            "Continued use of services shall constitute acceptance of such updates."
        ]
    },
    {
        id: "governing-law",
        num: 19,
        title: "Governing Law and Jurisdiction",
        content: [
            "This Privacy Policy shall be governed by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in New Delhi, India."
        ]
    }
];

export default function PrivacyPolicyPage() {
    const [activeSection, setActiveSection] = useState(privacy_content[0].id);

    useEffect(() => {
        const handleScroll = () => {
            const sections = privacy_content.map(section => document.getElementById(section.id));
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(privacy_content[i].id);
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
                                    <Shield size={16} /> Legal Documentation
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    Privacy Policy & Data Protection
                                </h1>
                                <p className="text-secondary text-sm max-w-2xl mb-4">
                                    Aligned with the Digital Personal Data Protection Act, 2023 &mdash; India
                                </p>
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
                                    {privacy_content.map((item) => (
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
                                        Our data protection team can help clarify any part of this policy.
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
                                {privacy_content.map((section) => (
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
                                            By continuing to use our Platform, you acknowledge that you have read, understood, and agreed to be bound by this Privacy Policy and Data Protection Terms.
                                        </p>
                                        <div className="flex flex-wrap gap-4">
                                            <div className="px-5 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium border border-white/10">
                                                Effective: 23rd March, 2026
                                            </div>
                                            <div className="px-5 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium border border-white/10">
                                                DPDP Act, 2023 Aligned
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
