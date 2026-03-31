'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import {
    FileText,
    ChevronRight,
    Download,
    Mail,
    Globe,
    ShieldCheck,
    Clock
} from 'lucide-react';

const membership_terms = [
    {
        id: "nature",
        num: 1,
        title: "Nature and Purpose of Membership",
        content: [
            "a. Membership in ARIFAC (Alliance of Reporting Entities in India for AML/CFT) is voluntary and is designed to facilitate structured collaboration, knowledge sharing, and capacity building among organizations participating in the AML/CFT ecosystem.",
            "b. ARIFAC operates as an industry-led initiative under the guidance of the Financial Intelligence Unit – India (FIU-IND) and is administered by the Internet and Mobile Association of India (IAMAI).",
            "c. Membership in ARIFAC does not confer any regulatory status, recognition, endorsement, or exemption under applicable laws, nor does it create any agency or representative relationship with ARIFAC, IAMAI, FIU-IND, or any regulatory authority."
        ]
    },
    {
        id: "eligibility",
        num: 2,
        title: "Eligibility for Membership",
        content: [
            "a. Membership is open to organizations that are part of or contribute to the AML/CFT ecosystem, including but not limited to reporting entities such as banks, NBFCs, payment system operators, fintech companies, insurance entities, capital market intermediaries, virtual digital asset service providers, and RegTech or compliance tech solution providers."
        ]
    },
    {
        id: "categories-fees",
        num: 3,
        title: "Membership Categories and Fees",
        content: [
            "a. Membership categories, eligibility criteria, and applicable fee structures shall be as published on the ARIFAC website and may be revised from time to time.",
            "b. Members are required to refer to the Fee section of the website for the latest applicable structure.",
            "c. Continued participation, renewal, or use of ARIFAC services shall constitute acceptance of any revisions to such fee structures.",
            "d. Membership may provide access to ARIFAC programs, working groups, knowledge sessions, and certification pathways, subject to applicable conditions."
        ]
    },
    {
        id: "activation",
        num: 4,
        title: "Membership Activation and Onboarding",
        content: [
            "a. Membership shall become effective upon approval of the application by ARIFAC, completion of onboarding formalities, submission of required organizational information, acceptance of these Terms, and payment of applicable fees.",
            "b. All member organizations shall be required to provide accurate and complete information at the time of registration and onboarding. ARIFAC reserves the right to verify such information and request additional documentation where required."
        ]
    },
    {
        id: "rights-benefits",
        num: 5,
        title: "Rights and Benefits of Membership",
        content: [
            "a. Membership entitles organizations to participate in ARIFAC initiatives, including industry consultations, capacity-building programs, certification opportunities, and working groups.",
            "b. Members may nominate employees for participation in training and certification programs, and may be provided with tools or access to track participation and engagement.",
            "c. ARIFAC may also maintain and publish a list of certified individuals for verification and industry reference purposes, and members may use such information for internal validation and compliance support."
        ]
    },
    {
        id: "responsibilities",
        num: 6,
        title: "Responsibilities and Obligations",
        content: [
            "a. Members shall act in good faith and maintain the highest standards of integrity, professionalism, and ethical conduct in all ARIFAC engagements.",
            "b. Members shall ensure that participation in ARIFAC does not conflict with applicable laws, regulatory obligations, or internal organizational policies.",
            "c. Members shall maintain strict confidentiality of all non-public information shared within ARIFAC forums, including discussions, case studies, regulatory interactions, and industry insights.",
            "d. Members shall not disclose customer-specific, institution-specific, or regulator-sensitive information unless permitted under applicable law.",
            "e. Members shall comply with all applicable AML/CFT laws and regulations, including obligations under the Prevention of Money Laundering Act, 2002, and related regulatory frameworks."
        ]
    },
    {
        id: "code-of-conduct",
        num: 7,
        title: "Code of Conduct and Ethical Participation",
        content: [
            "a. Members shall conduct themselves in a professional and respectful manner in all ARIFAC activities. Members shall avoid conflicts of interest, refrain from unauthorized solicitation or commercial promotion within ARIFAC forums, and ensure that ARIFAC platforms are used solely for legitimate and constructive purposes.",
            "b. Members shall not misuse ARIFAC affiliation, branding, or participation for misleading representation or commercial gain without prior authorization."
        ]
    },
    {
        id: "aml-confidentiality",
        num: 8,
        title: "AML-Specific Confidentiality",
        content: [
            "a. Members acknowledge that ARIFAC may involve discussions relating to AML/CFT practices, typologies, and regulatory frameworks. Members shall not disclose any information relating to Suspicious Transaction Reporting (STR), regulatory actions, supervisory inputs, or any confidential compliance-related information.",
            "b. Members shall not engage in “tipping off” or any activity that may compromise regulatory investigations or compliance obligations."
        ]
    },
    {
        id: "org-responsibility",
        num: 9,
        title: "Organizational Responsibility",
        content: [
            "a. Member organizations shall be responsible for the conduct of their employees, representatives, and nominees participating in ARIFAC programs.",
            "b. Organizations shall ensure that such individuals comply with all applicable ARIFAC Terms, including LMP and Examination Terms where applicable.",
            "c. Any misuse of ARIFAC platforms or breach of Terms by a nominated individual may result in action against the member organization, including suspension or termination of membership."
        ]
    },
    {
        id: "validity-renewal",
        num: 10,
        title: "Membership Validity and Renewal",
        content: [
            "a. Membership shall be valid for the duration specified at the time of onboarding and shall be subject to renewal in accordance with ARIFAC policies.",
            "b. Upon expiry of membership, access to ARIFAC services, including Learning Management Program (LMP), certification programs, and participation in forums, may be restricted or suspended until renewal is completed."
        ]
    },
    {
        id: "suspension-termination",
        num: 11,
        title: "Suspension and Termination",
        content: [
            "a. ARIFAC reserves the right to suspend or terminate membership at its discretion in cases including, but not limited to, non-payment of fees, breach of these Terms, misconduct, misuse of ARIFAC platforms, adverse regulatory findings, or reputational concerns.",
            "b. Members may voluntarily withdraw from ARIFAC by providing one month written notice, subject to applicable conditions."
        ]
    },
    {
        id: "refund-policy",
        num: 12,
        title: "Fees, Charges, and Refund Policy",
        content: [
            "a. Membership fees, once paid, are non-refundable. Additional fees may be applicable for training programs, certification, events, or specialized services offered by ARIFAC.",
            "b. ARIFAC reserves the right to revise fees and introduce new fee categories from time to time."
        ]
    },
    {
        id: "data-audit",
        num: 13,
        title: "Record Keeping, Data Use, and Audit",
        content: [
            "a. ARIFAC may maintain records of membership, participation, certifications, and engagement for operational, audit, and regulatory purposes.",
            "b. Members acknowledge and consent to such record-keeping and agree that such data may be used for verification, reporting, and compliance-related purposes, including sharing with competent authorities where required under applicable law."
        ]
    },
    {
        id: "indemnity",
        num: 14,
        title: "Indemnity",
        content: [
            "a. Members agree to indemnify and hold harmless ARIFAC, IAMAI, and their affiliates, officers, and representatives from any claims, damages, liabilities, or expenses arising out of misuse of ARIFAC platforms, breach of these Terms, or violation of applicable laws or regulations."
        ]
    },
    {
        id: "liability-reliance",
        num: 15,
        title: "Limitation of Liability",
        content: [
            "a. ARIFAC shall not be liable for any direct, indirect, incidental, or consequential damages arising from participation in ARIFAC activities, including reliance on discussions, materials, or insights shared through the platform.",
            "b. Members acknowledge that ARIFAC provides industry-level knowledge sharing and capacity building, and does not provide legal or regulatory advice.",
            "c. ARIFAC shall not be responsible for any regulatory actions, compliance failures, penalties, or legal consequences arising from reliance on ARIFAC discussions, materials, or programs. Members remain solely responsible for compliance with applicable laws and regulations and for seeking independent professional advice where required."
        ]
    },
    {
        id: "amendments",
        num: 16,
        title: "Amendments to Terms",
        content: [
            "a. ARIFAC reserves the right to amend these Terms from time to time. Updated Terms shall be published on the ARIFAC website and shall become effective as specified therein. Members are advised to review the Terms periodically on the website.",
            "b. Continued membership, access, or participation in ARIFAC activities shall constitute acceptance of such amendments."
        ]
    },
    {
        id: "governing-law",
        num: 17,
        title: "Governing Law and Jurisdiction",
        content: [
            "a. These Terms shall be governed by the laws of India. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India."
        ]
    }
];

export default function MembershipTermsPage() {
    const [activeSection, setActiveSection] = useState(membership_terms[0].id);

    useEffect(() => {
        const handleScroll = () => {
            const sections = membership_terms.map(section => document.getElementById(section.id));
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(membership_terms[i].id);
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
                                    <ShieldCheck size={16} /> Compliance Framework
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    Membership Terms & Conditions
                                </h1>
                                <div className="flex items-center gap-6 text-secondary text-sm font-medium">
                                    <span className="flex items-center gap-2">
                                        <Clock size={14} /> Effective Date: March 2024
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FileText size={14} /> Institutional Policy
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-4">

                                <a href="mailto:help.arifac@iamai.in" className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-bold hover:opacity-90 transition-all text-sm shadow-sm">
                                    <Mail size={18} /> Support
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
                                    <FileText size={16} /> Content Outline
                                </h3>
                                <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {membership_terms.map((item) => (
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
                                    <h4 className="font-bold text-sm mb-2">Member Support</h4>
                                    <p className="text-xs text-secondary leading-relaxed mb-4">
                                        For institutional onboarding queries, please reach out to our membership team.
                                    </p>
                                    <a href="mailto:help.arifac@iamai.in" className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
                                        Onboarding Help <ChevronRight size={12} />
                                    </a>
                                </div>
                            </div>
                        </aside>

                        {/* Main Text Content */}
                        <div className="flex-1 lg:max-w-3xl">
                            <div className="prose prose-lg prose-headings:font-bold prose-headings:text-[#1d1d1f] max-w-none">
                                {membership_terms.map((section) => (
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
                                        <h3 className="text-2xl font-bold mb-4">Membership Declaration</h3>
                                        <p className="text-white/70 text-lg leading-relaxed mb-8">
                                            By applying for or renewing ARIFAC membership, your organization agrees to be bound by these Institutional Membership Terms & Conditions.
                                        </p>
                                        <div className="flex flex-wrap gap-4">
                                            <div className="px-5 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium border border-white/10">
                                                Version 1.2 (2024)
                                            </div>
                                            <div className="px-5 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium border border-white/10">
                                                Institutional Use
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

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e5e5e7;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #d1d1d6;
                }
            `}</style>
        </main>
    );
}


