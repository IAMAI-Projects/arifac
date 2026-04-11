"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */

type EngagementFormat = {
  title: string;
  description: string;
  points: string[];
};

type ProgrammeRow = {
  programme: string;
  type: string;
  date: string;
};

type AnnualMeetingRow = {
  meeting: string;
  date: string;
  location: string;
};

const engagementFormats: EngagementFormat[] = [
  {
    title: "Industry Consultations",
    description:
      "Addressing emerging financial risks and operational challenges within the AML/CFT",
    points: [
      "Closed-door roundtables",
      "Multi-stakeholder consultations",
      "Thematic discussions on emerging risks",
      "Sector-specific implementation dialogues",
    ],
  },
  {
    title: "Training & Capacity Building",
    description:
      "Programmes to strengthen internal capabilities across compliance, risk, legal, operations, and business functions.",
    points: [
      "Foundational and advanced AML/CFT programmes",
      "Role-based training modules",
      "Institutional capability-building initiatives",
      "Continuous learning programmes",
    ],
  },
  {
    title: "Certification & Learning Pathways",
    description:
      "Structured learning pathways to build internal expertise and support professional development of AML/CFT teams.",
    points: [
      "Certification-linked learning programmes",
      "Role-based progression pathways",
      "Participation tracking and learning completion",
      "Integration with ARIFAC learning ecosystem",
    ],
  },
  {
    title: "Working Groups",
    description:
      "Focused forums for collaborative problem-solving and knowledge exchange on specific financial crime prevention themes.",
    points: [
      "Typologies and emerging risk groups",
      "Digital onboarding and KYC challenges",
      "Fraud and transaction monitoring practices",
      "Reporting and compliance implementation",
    ],
  },
  {
    title: "Knowledge Sessions & Webinars",
    description:
      "Regular sessions bringing together industry experts and practitioners to share insights on evolving risks and trends.",
    points: [
      "Expert-led webinars",
      "Thematic briefings",
      "Sectoral knowledge sessions",
      "Case-based discussions",
    ],
  },
  {
    title: "Flagship Engagements",
    description:
      "Larger ecosystem engagements to enable broader industry participation and collaboration on financial integrity.",
    points: [
      "National-level summits and forums",
      "Sector-focused roundtables",
      "Collaborative industry initiatives",
      "Multi-stakeholder special programmes",
    ],
  },
];

const upcomingProgrammes: ProgrammeRow[] = [
  {
    programme:
      "N-SAFE: National Summit on Anti-Financial Crime Enforcement",
    type: "Flagship Event",
    date: "6 April 2026",
  },
  {
    programme: "OVDs, Digital Verification & V-CIP Enablement",
    type: "Training Session",
    date: "April 2026",
  },
  {
    programme: "STR Filing and Typologies",
    type: "Training Session",
    date: "April 2026",
  },
  {
    programme:
      "Cross-Border AML: Managing Risk Across Jurisdictions, Counterparties & Data Flows",
    type: "Training Session",
    date: "April 2026",
  },
  {
    programme:
      "Strengthening Transparency and Infrastructure in the Derivatives Market",
    type: "Training Session",
    date: "May 2026",
  },
  {
    programme:
      "CDD and Verification: Customer Due Diligence in Practice",
    type: "Training Session",
    date: "May 2026",
  },
];

const pastProgrammes: ProgrammeRow[] = [
  {
    programme: "AML and Compliance in Mutual Fund Industry",
    type: "Training Session",
    date: "27 Feb 2026",
  },
  {
    programme:
      "Artificial Intelligence in AML, Fraud Monitoring & Compliance Functions",
    type: "Training Session",
    date: "20 Feb 2026",
  },
  {
    programme:
      "Central KYC Records Registry - Compliance by REs, Issues & Challenges",
    type: "Training Session",
    date: "30 Jan 2026",
  },
  {
    programme:
      "Follow-up Q&A: PMLA Requirements, Screening & Transaction Monitoring for PAs",
    type: "Training Session",
    date: "27 Jan 2026",
  },
  {
    programme:
      "PMLA Requirements, Screening & Transaction Monitoring for PAs",
    type: "Training Session",
    date: "22 Jan 2026",
  },
];

const annualMeetings: AnnualMeetingRow[] = [
  {
    meeting: "Inaugural National Chapter Meeting",
    date: "August 4, 2023",
    location: "New Delhi",
  },
  {
    meeting: "2nd National Chapter Meeting",
    date: "October 19, 2023",
    location: "Mumbai",
  },
  {
    meeting: "3rd National Chapter Meeting",
    date: "July 24, 2024",
    location: "Mumbai",
  },
  {
    meeting: "4th National Chapter Meeting",
    date: "March 07, 2025",
    location: "Mumbai",
  },
  {
    meeting: "5th National Chapter Meeting",
    date: "December 10, 2025",
    location: "Mumbai",
  },
];

/* ═══════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════ */

export default function ProgrammesPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-800 font-sans selection:bg-brand selection:text-white flex flex-col antialiased">
      <Header />

      <main className="flex-grow">
        <PageBanner
          label="Programmes"
          title="Consolidated Ecosystem Engagement Framework"
          description="Enabling collaboration, capacity building, and regulatory alignment across India's financial ecosystem through structured engagement channels."
        />

        {/* ─── SECTION 1: Engagement Channels (compact grid) ─── */}
        <section className="py-8 lg:py-10 bg-white border-b border-neutral-100">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="h-1 w-8 bg-brand" />
                <span className="text-[11px] font-bold text-brand tracking-widest uppercase">
                  Engagement Strategy
                </span>
              </div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                {engagementFormats.length} Active Channels
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {engagementFormats.map((ch, idx) => (
                <div
                  key={ch.title}
                  className="group bg-white border border-neutral-200 p-4 hover:border-brand/30 hover:shadow-sm transition-all relative overflow-hidden"
                >
                  <div className="absolute top-3 right-4 text-[48px] font-black text-neutral-50 group-hover:text-brand/[0.05] transition-colors pointer-events-none select-none leading-none">
                    0{idx + 1}
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-[14px] font-bold text-neutral-900 mb-2 group-hover:text-brand transition-colors">
                      {ch.title}
                    </h4>
                    <p className="text-neutral-500 text-[12px] leading-relaxed line-clamp-2">
                      {ch.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Upcoming Programmes (table) ─── */}
        <section className="py-8 lg:py-10 bg-white border-b border-neutral-100">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-brand" />
                <h2 className="text-xl lg:text-2xl font-extrabold text-neutral-900 uppercase tracking-tight">
                  Upcoming Programmes
                </h2>
              </div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                {upcomingProgrammes.length} Sessions
              </span>
            </div>

            {/* Table — desktop */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-neutral-200">
                    <th className="px-0 pr-4 py-3 text-left text-[10px] font-black text-neutral-400 uppercase tracking-[0.15em] w-[5%]">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black text-neutral-400 uppercase tracking-[0.15em] w-[55%]">
                      Programme
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black text-neutral-400 uppercase tracking-[0.15em] w-[20%]">
                      Format
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black text-neutral-400 uppercase tracking-[0.15em] w-[20%]">
                      Timeline
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {upcomingProgrammes.map((row, idx) => (
                    <tr
                      key={`${row.programme}-${idx}`}
                      className="group hover:bg-neutral-50/60 transition-colors"
                    >
                      <td className="px-0 pr-4 py-4">
                        <span className="text-[10px] font-black text-neutral-300 group-hover:text-brand transition-colors">
                          0{idx + 1}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[15px] font-bold text-neutral-900 leading-snug group-hover:text-brand transition-colors">
                          {row.programme}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider px-2.5 py-1 bg-neutral-50 border border-neutral-200 group-hover:bg-white transition-colors">
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[13px] font-medium text-neutral-500 whitespace-nowrap">
                        {row.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards — mobile */}
            <div className="md:hidden space-y-3">
              {upcomingProgrammes.map((row, idx) => (
                <div
                  key={`${row.programme}-${idx}`}
                  className="border border-neutral-200 p-4 bg-white group hover:border-brand/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-black text-brand/50 uppercase tracking-[0.3em] px-2 py-0.5 border border-brand/10 bg-brand/[0.03]">
                      {row.type}
                    </span>
                    <span className="text-[11px] font-bold text-neutral-400">
                      {row.date}
                    </span>
                  </div>
                  <h4 className="text-[14px] font-bold text-neutral-900 leading-snug group-hover:text-brand transition-colors">
                    {row.programme}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Recent Consultations ─── */}
        <section className="py-8 lg:py-10 bg-neutral-50/60 border-b border-neutral-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-subtle opacity-[0.02] pointer-events-none" />

          <div className="max-w-[1240px] mx-auto px-6 relative z-10">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-neutral-400" />
                <h2 className="text-xl lg:text-2xl font-extrabold text-neutral-900 uppercase tracking-tight">
                  Recent Consultations
                </h2>
              </div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                {pastProgrammes.length} Sessions
              </span>
            </div>

            <div className="space-y-0">
              {pastProgrammes.map((row, idx) => (
                <div
                  key={`${row.programme}-${idx}`}
                  className="group grid grid-cols-12 gap-4 lg:gap-6 items-baseline py-4 border-b border-neutral-200/60 last:border-b-0 hover:bg-white/60 -mx-4 px-4 transition-colors"
                >
                  {/* Index */}
                  <div className="col-span-1">
                    <span className="text-[10px] font-black text-neutral-300 group-hover:text-brand transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="col-span-3 lg:col-span-2">
                    <span className="text-[13px] font-bold text-neutral-400 group-hover:text-neutral-600 transition-colors tabular-nums">
                      {row.date}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="col-span-8 lg:col-span-7">
                    <h4 className="text-[14px] font-bold text-neutral-900 leading-snug group-hover:text-brand transition-colors">
                      {row.programme}
                    </h4>
                  </div>

                  {/* Type — desktop only */}
                  <div className="hidden lg:block lg:col-span-2 text-right">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      {row.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Annual Meetings ─── */}
        <section className="py-8 lg:py-10 bg-white">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
              {/* Left — header */}
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-1 w-8 bg-brand" />
                  <span className="text-[11px] font-bold text-brand tracking-widest uppercase">
                    Institutional Dialogue
                  </span>
                </div>
                <h2 className="text-2xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-3">
                  Annual Meetings &amp; Regulatory Fora.
                </h2>
                <p className="text-neutral-600 text-[14px] leading-relaxed">
                  Structured convergence platforms facilitating knowledge
                  exchange and strategic alignment between ecosystem
                  stakeholders.
                </p>
              </div>

              {/* Right — meeting table */}
              <div className="lg:col-span-8">
                <div className="bg-white border border-neutral-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-brand">
                        <th className="px-5 lg:px-6 py-4 text-[10px] font-black text-white/60 uppercase tracking-widest w-[15%]">
                          Year
                        </th>
                        <th className="px-5 lg:px-6 py-4 text-[10px] font-black text-white/60 uppercase tracking-widest">
                          Meeting
                        </th>
                        <th className="px-5 lg:px-6 py-4 text-[10px] font-black text-white/60 uppercase tracking-widest w-[22%]">
                          Date
                        </th>
                        <th className="px-5 lg:px-6 py-4 text-[10px] font-black text-white/60 uppercase tracking-widest w-[15%]">
                          Location
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {annualMeetings.map((mtg, idx) => {
                        const year = mtg.date.includes(",")
                          ? mtg.date.split(",").pop()?.trim()
                          : "2025";
                        return (
                          <tr
                            key={idx}
                            className="group hover:bg-neutral-50 transition-colors"
                          >
                            <td className="px-5 lg:px-6 py-4">
                              <span className="text-lg font-black text-neutral-200 group-hover:text-brand transition-colors">
                                {year}
                              </span>
                            </td>
                            <td className="px-5 lg:px-6 py-4">
                              <span className="text-[14px] font-bold text-neutral-900 group-hover:text-brand transition-colors">
                                {mtg.meeting}
                              </span>
                            </td>
                            <td className="px-5 lg:px-6 py-4 text-[13px] font-medium text-neutral-500">
                              {mtg.date}
                            </td>
                            <td className="px-5 lg:px-6 py-4">
                              <div className="flex items-center gap-1.5">
                                <svg
                                  className="w-3 h-3 text-neutral-300"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                  <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span className="text-[13px] font-bold text-neutral-600">
                                  {mtg.location}
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
