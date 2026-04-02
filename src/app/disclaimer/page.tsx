'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { AlertCircle, Shield, Info, FileText } from 'lucide-react';

const disclaimerSections = [
    {
        id: "general",
        icon: Info,
        title: "General Disclaimer",
        content: [
            "ARIFAC (Alliance of Reporting Entities in India for AML/CFT) is an industry-led platform operated by the Internet and Mobile Association of India (IAMAI). ARIFAC is not a regulator, supervisory authority, or government body.",
            "Membership, participation, or engagement with ARIFAC does not confer any regulatory status, approval, licence, or compliance certification. ARIFAC does not grant approvals, licences, or compliance certifications of any kind.",
            "ARIFAC does not provide legal, regulatory, or financial advice. All information, materials, and resources shared through ARIFAC platforms are for knowledge-sharing and capacity-building purposes only."
        ]
    },
    {
        id: "membership",
        icon: Shield,
        title: "Membership Disclaimer",
        content: [
            "ARIFAC membership is intended for industry collaboration, knowledge sharing, and capacity building. It does not substitute regulatory compliance obligations under applicable laws.",
            "Submission of a membership application does not guarantee membership. Approval is subject to ARIFAC's review and discretion.",
            "By submitting a membership application, applicants consent to the collection and processing of their information in accordance with ARIFAC's Privacy Policy and applicable data protection laws."
        ]
    },
    {
        id: "programmes",
        icon: FileText,
        title: "Programmes & Events Disclaimer",
        content: [
            "Information about upcoming programmes, meetings, and events is subject to change. ARIFAC reserves the right to reschedule, modify, or cancel any programme or event at its discretion.",
            "Participation in ARIFAC programmes, training sessions, and knowledge forums does not confer any regulatory recognition or exemption under applicable laws.",
            "Certificates issued through ARIFAC certification programmes represent completion of the relevant learning pathway and do not constitute regulatory approval or professional licensing."
        ]
    },
    {
        id: "regulatory-updates",
        icon: AlertCircle,
        title: "Regulatory Updates Disclaimer",
        content: [
            "Regulatory updates, circulars, and information shared on this platform are provided for informational and awareness purposes only. They do not constitute legal advice.",
            "Members and users are advised to refer to official regulatory sources and seek independent professional advice for compliance-related matters.",
            "ARIFAC makes reasonable efforts to ensure the accuracy and currency of information shared, but does not warrant completeness, accuracy, or timeliness of any regulatory updates published on this platform."
        ]
    },
    {
        id: "resources",
        icon: FileText,
        title: "Resources & Materials Disclaimer",
        content: [
            "The materials provided in the resources section are for informational purposes only and do not constitute legal or regulatory advice.",
            "Reporting entities are advised to refer to official sources, including FIU-IND circulars and relevant statutes, to ensure statutory compliance."
        ]
    },
    {
        id: "media",
        icon: Info,
        title: "Media & Gallery Disclaimer",
        content: [
            "Images are used for documentation and illustrative purposes. Participation in ARIFAC programmes may imply consent for non-commercial use of photographs unless otherwise notified."
        ]
    },
    {
        id: "liability",
        icon: Shield,
        title: "Limitation of Liability",
        content: [
            "ARIFAC, IAMAI, and their affiliates, officers, and representatives shall not be liable for any direct, indirect, incidental, or consequential damages arising from participation in ARIFAC activities.",
            "Members remain solely responsible for compliance with applicable laws and regulations and for seeking independent professional advice where required.",
            "ARIFAC shall not be responsible for any regulatory actions, compliance failures, penalties, or legal consequences arising from reliance on ARIFAC discussions, materials, or programmes."
        ]
    }
];

export default function DisclaimerPage() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-36 pb-12 bg-white overflow-hidden">
                <div className="container relative mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading leading-[1.1] tracking-tight text-[#1d1d1f] mb-8">
                            <span className="bg-gradient-to-r from-[#C2B020] to-[#59626E] text-transparent bg-clip-text">Disclaimer</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
                            Important information about the nature, scope, and limitations of ARIFAC as an industry platform.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Disclaimer Sections */}
            <section className="py-14 bg-[#f5f5f7]">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-8">
                        {disclaimerSections.map((section, i) => (
                            <motion.div
                                key={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center text-accent shrink-0">
                                        <section.icon size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#1d1d1f]">{section.title}</h2>
                                </div>
                                <div className="space-y-4">
                                    {section.content.map((para, j) => (
                                        <p key={j} className="text-secondary leading-relaxed font-medium">
                                            {para}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}

                        {/* Note */}
                        <div className="flex items-start gap-4 p-6 bg-amber-50 rounded-3xl border border-amber-100">
                            <AlertCircle className="text-[#C2B020] shrink-0 mt-1" size={24} />
                            <div>
                                <h3 className="font-bold text-amber-900 mb-1">Note</h3>
                                <p className="text-amber-800 leading-relaxed text-sm">
                                    This disclaimer is subject to change. Users are advised to review this page periodically. For queries, please contact <a href="mailto:help.arifac@iamai.in" className="underline font-semibold">help.arifac@iamai.in</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
