'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';

const benefits = [
    {
        num: '01',
        title: 'Regulatory Engagement',
        description: 'Direct interactions with regulators and law enforcement agencies — ensuring information symmetry and policy-level contributions.',
        points: [
            'Closed-door sessions with regulators and LEAs',
            'Ongoing insights into AML/CFT regulatory developments',
            'Industry consultation and formal representation',
        ],
    },
    {
        num: '02',
        title: 'Compliance Capacity Building',
        description: 'Structured, credentialed learning pathways for compliance professionals at every level of the organisation.',
        points: [
            'AML/CFT certification programmes, Levels 1–5',
            'Targeted training for compliance officers',
            'Learning resources available in Indic languages',
        ],
    },
    {
        num: '03',
        title: 'Industry Intelligence',
        description: "Curated, actionable intelligence to inform decision-making and sharpen your institution's compliance posture.",
        points: [
            'Typology database and real-world case studies',
            'Financial crime trends and timely alerts',
            'Industry reports and whitepapers',
        ],
    },
    {
        num: '04',
        title: 'Operational Support',
        description: 'Practical tools and expert assistance to help compliance teams operate with confidence and efficiency.',
        points: [
            'Dedicated compliance helpdesk',
            'AML benchmarking tools',
            'Access to a professional peer network',
        ],
    },
];

const engagements = [
    {
        title: 'Regulatory Engagements',
        description: 'Structured dialogue with regulators and policy bodies',
    },
    {
        title: 'Knowledge Webinars',
        description: 'Expert-led sessions on emerging compliance themes',
    },
    {
        title: 'AML/CFT Meets',
        description: 'Peer exchange among compliance professionals',
    },
    {
        title: 'RegTech Innovation Showcases',
        description: 'Discover tools reshaping the compliance landscape',
    },
    {
        title: 'Financial Crime Typology Workshops',
        description: 'Scenario-based, practitioner-focused learning',
    },
    {
        title: 'Industry Working Groups',
        description: 'Collaborative forums on sector-wide priorities',
    },
];

export default function MemberBenefitsPage() {
    return (
        <main className="bg-white min-h-screen font-sans">
            <Navbar />

            {/* ── Hero ────────────────────────────────────────────────── */}
            <section className="pt-44 pb-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.2em] mb-6">
                            Membership Benefits
                        </p>
                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-[#1d1d1f] leading-[1.05] tracking-tight mb-8">
                            Where India's compliance community connects.
                        </h1>
                        <p className="text-lg text-[#6e6e73] leading-relaxed max-w-2xl">
                            ARIFAC Membership offers more than access — it is a sustained partnership with the institutions,
                            intelligence, and community that define best-in-class AML/CFT practice in India.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Divider ───────────────────────────────────────────────── */}
            <div className="max-w-3xl mx-auto px-6">
                <hr className="border-gray-200" />
            </div>

            {/* ── 4 Benefit Cards ──────────────────────────────────────── */}
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="border border-gray-200 rounded-2xl overflow-hidden"
                    >
                        <div className="grid md:grid-cols-2 divide-y divide-gray-200 md:divide-y-0 md:divide-x">
                            {benefits.map((b, i) => (
                                <div
                                    key={b.num}
                                    className={`p-8 flex flex-col gap-5 ${i >= 2 ? 'border-t border-gray-200' : ''}`}
                                >
                                    {/* Number */}
                                    <span className="text-[13px] text-[#a3a3a3] font-light tracking-widest">{b.num}</span>

                                    {/* Title + description */}
                                    <div>
                                        <h2 className="font-heading text-[22px] font-bold text-[#1d1d1f] mb-3 leading-snug">
                                            {b.title}
                                        </h2>
                                        <p className="text-[14px] text-[#6e6e73] leading-relaxed">
                                            {b.description}
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <hr className="border-gray-200" />

                                    {/* Bullet points */}
                                    <ul className="space-y-2">
                                        {b.points.map((pt, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-[14px] text-[#6e6e73]">
                                                <span className="mt-[7px] w-3 h-[1px] bg-[#a3895a] shrink-0 inline-block" />
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Preferential pricing callout ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="mt-6 border-l-4 border-[#c8a96e] bg-[#fdf8ef] rounded-r-2xl px-6 py-5"
                    >
                        <p className="text-[14px] text-[#5a460a] leading-relaxed">
                            <strong className="font-bold">Preferential pricing</strong> applies across all programmes, events, and publications — extending the value of
                            membership throughout the year.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Member Engagement Throughout the Year ────────────────── */}
            <section className="py-16 px-6 pb-28">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {/* Section label */}
                        <p className="text-[11px] font-bold text-[#a3a3a3] uppercase tracking-[0.25em] mb-8 text-center">
                            Member Engagement Throughout the Year
                        </p>

                        {/* 3-column × 2-row table */}
                        <div className="border border-gray-200 rounded-2xl overflow-hidden">
                            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y divide-gray-200 sm:divide-y-0">
                                {engagements.map((e, i) => (
                                    <div
                                        key={e.title}
                                        className={`p-6 flex flex-col gap-2 ${i >= 3 ? 'border-t border-gray-200' : ''} ${(i + 1) % 3 !== 0 ? 'sm:border-r sm:border-gray-200' : ''}`}
                                    >
                                        <h3 className="font-heading text-[15px] font-bold text-[#1d1d1f] leading-snug">
                                            {e.title}
                                        </h3>
                                        <p className="text-[13px] text-[#6e6e73] leading-relaxed">
                                            {e.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
