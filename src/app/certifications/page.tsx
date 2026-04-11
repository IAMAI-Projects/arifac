"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

const certifications = [
  {
    id: "associate-aml-cft",
    title: "ARIFAC Certified Associate (AML/CFT)",
    level: "Foundation Level",
    focus: "Awareness & Literacy",
    category: "Foundation",
    format: "Online",
    description:
      "Designed for role-based onboarding and entry-level compliance awareness. This certification ensures that all staff within reporting entities understand the fundamentals of PMLA, KYC, and the importance of financial integrity.",
    curriculum: [
      "Introduction to AML/CFT Frameworks",
      "Overview of PMLA & FIU-IND Reporting",
      "KYC & Customer Due Diligence (CDD)",
      "Red Flag Indicators for Frontline Staff",
    ],
    duration: "4 Weeks (Online)",
  },
  {
    id: "professional-aml-cft",
    title: "ARIFAC Certified Professional (AML/CFT)",
    level: "Professional Level",
    focus: "Operations & Supervision",
    category: "Professional",
    format: "Hybrid",
    description:
      "Focuses on applied compliance, transaction monitoring, and enhancing supervisory capabilities. Targeted at compliance officers and mid-level managers responsible for daily operational oversight.",
    curriculum: [
      "Advanced Transaction Monitoring",
      "Suspicious Transaction Reporting (STR)",
      "Risk-Based Approach (RBA) Implementation",
      "Sanctions Screening & Management",
    ],
    duration: "8 Weeks (Hybrid)",
  },
  {
    id: "specialist-aml-cft",
    title: "ARIFAC Certified Specialist (AML/CFT)",
    level: "Specialist Level",
    focus: "Investigations & Forensics",
    category: "Specialist",
    format: "Expert-Led",
    description:
      "Deep domain expertise focusing on advanced investigations, complex money laundering typologies, and forensic analysis. Designed for senior compliance leaders and financial crime investigators.",
    curriculum: [
      "Complex Typology Analysis",
      "Forensic Audit & Asset Tracing",
      "Digital Asset & VDA Compliance",
      "Regulatory Reporting & Audit Defense",
    ],
    duration: "12 Weeks (Expert-Led)",
  },
  {
    id: "digital-assets-compliance",
    title: "ARIFAC Certificate in Digital Asset Compliance",
    level: "Advanced Certificate",
    focus: "VDA Risk & Controls",
    category: "Specialist",
    format: "Live Online",
    description:
      "Focused programme on virtual digital asset risk management, travel rule readiness, sanctions controls, and transaction monitoring for VDA-related businesses.",
    curriculum: [
      "VDA Regulatory Landscape in India",
      "Blockchain Analytics for Compliance Teams",
      "Sanctions and Wallet Screening Controls",
      "Suspicious Activity Escalation Protocols",
    ],
    duration: "6 Weeks (Live Online)",
  },
];

export default function CertificationPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [formatFilter, setFormatFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const categories = useMemo(() => {
    return ["All", ...new Set(certifications.map((c) => c.category))];
  }, []);

  const formats = useMemo(() => {
    return ["All", ...new Set(certifications.map((c) => c.format))];
  }, []);

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return certifications.filter((course) => {
      const byCategory =
        categoryFilter === "All" || course.category === categoryFilter;
      const byFormat =
        formatFilter === "All" || course.format === formatFilter;
      const bySearch =
        query.length === 0 ||
        course.title.toLowerCase().includes(query) ||
        course.focus.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query);
      return byCategory && byFormat && bySearch;
    });
  }, [search, categoryFilter, formatFilter]);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-brand selection:text-white flex flex-col antialiased">
      <Header />

      <main className="flex-grow">
        <PageBanner
          label="Certifications"
          title="Industry Standard Pathways for Financial Crime Readiness"
          description="Role-based programmes from foundation to specialist level, designed to strengthen compliance across India's financial ecosystem."
        />

        {/* ── Pathway Tiers Strip ── */}
        <section className="relative -mt-6 z-20 animate-in">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-0">
              {[
                {
                  label: "Recognised Standards",
                  sub: "Aligned with FATF & Indian PMLA requirements.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2 2 0 012 2v.5m.435 4.435L17.435 20M12 22a10 10 0 110-20 10 10 0 010 20z" />
                    </svg>
                  ),
                },
                {
                  label: "Industry Validated",
                  sub: "Vetted by leading subject matter experts.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
                {
                  label: "Career Growth",
                  sub: "Foundation to senior integrity leadership.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                },
              ].map((tier, idx) => (
                <div
                  key={tier.label}
                  className={`group bg-white p-5 lg:p-6 border border-slate-100 transition-all hover:bg-slate-50 relative overflow-hidden animate-in delay-${(idx + 1) * 100}`}
                >
                  <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-10 h-10 bg-brand/[0.03] text-brand flex items-center justify-center flex-shrink-0 group-hover:bg-brand group-hover:text-white transition-all duration-300">
                      {tier.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-widest group-hover:text-brand transition-colors">
                        {tier.label}
                      </h3>
                      <p className="text-slate-400 text-[11px] leading-relaxed truncate">
                        {tier.sub}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Certification Catalogue ── */}
        <section className="py-8 lg:py-10 bg-slate-50/60 border-b border-slate-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-subtle opacity-[0.02] pointer-events-none" />
          <div className="max-w-[1240px] mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              {/* ── Left: Sticky Filter Sidebar ── */}
              <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-6">
                  <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                    {/* Sidebar header */}
                    <div className="bg-brand px-5 py-4">
                      <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">
                        Filter Programmes
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {filteredCourses.length} of {certifications.length} shown
                      </p>
                    </div>

                    <div className="p-5 space-y-5">
                      {/* Search */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">
                          Search
                        </label>
                        <input
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Title, focus, topic..."
                          className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-[13px] focus:outline-none focus:border-brand focus:bg-white transition-all placeholder:text-slate-300"
                        />
                      </div>

                      {/* Level */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">
                          Level
                        </label>
                        <div className="space-y-1">
                          {categories.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setCategoryFilter(cat)}
                              className={`w-full text-left px-3 py-2 text-[12px] font-bold transition-all ${
                                categoryFilter === cat
                                  ? "bg-brand text-white"
                                  : "text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Format */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">
                          Format
                        </label>
                        <div className="space-y-1">
                          {formats.map((fmt) => (
                            <button
                              key={fmt}
                              onClick={() => setFormatFilter(fmt)}
                              className={`w-full text-left px-3 py-2 text-[12px] font-bold transition-all ${
                                formatFilter === fmt
                                  ? "bg-brand text-white"
                                  : "text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200"
                              }`}
                            >
                              {fmt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Reset */}
                      {(search || categoryFilter !== "All" || formatFilter !== "All") && (
                        <button
                          onClick={() => {
                            setSearch("");
                            setCategoryFilter("All");
                            setFormatFilter("All");
                          }}
                          className="w-full text-center px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest border border-dashed border-slate-300 hover:text-brand hover:border-brand transition-colors"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Right: Course Grid ── */}
              <div className="lg:col-span-9">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredCourses.map((cert, idx) => (
                    <div
                      key={cert.id}
                      className="group relative bg-white border border-slate-200 hover:border-brand/40 hover:shadow-lg transition-all duration-500 overflow-hidden"
                    >
                      {/* Top accent bar */}
                      <div className="h-1 w-full bg-gradient-to-r from-brand to-brand-light group-hover:from-brand-dark group-hover:to-brand transition-all duration-500" />

                      {/* Background index */}
                      <div className="absolute top-6 right-5 text-[64px] font-black text-slate-900/[0.04] group-hover:text-brand/[0.08] transition-colors pointer-events-none select-none leading-none">
                        {String(idx + 1).padStart(2, "0")}
                      </div>

                      <div className="relative z-10 p-5 lg:p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-brand px-2.5 py-1">
                            {cert.level}
                          </span>
                        </div>

                        <h3 className="text-[16px] font-bold text-slate-900 mb-2 leading-tight group-hover:text-brand transition-colors pr-12">
                          {cert.title}
                        </h3>

                        <p className="text-slate-500 text-[13px] leading-relaxed mb-4 line-clamp-3">
                          {cert.description}
                        </p>

                        {/* Meta tags */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider px-2.5 py-1 bg-brand/[0.04] border border-slate-900/10">
                            {cert.format}
                          </span>
                          <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider px-2.5 py-1 bg-brand/[0.04] border border-slate-900/10">
                            {cert.duration}
                          </span>
                          <span className="text-[10px] font-bold text-brand uppercase tracking-wider px-2.5 py-1 bg-brand/[0.06] border border-brand/15">
                            {cert.focus}
                          </span>
                        </div>

                        {/* Curriculum toggle */}
                        <button
                          onClick={() =>
                            setExpanded(expanded === cert.id ? null : cert.id)
                          }
                          className="flex items-center gap-2 text-[11px] font-bold text-slate-900 uppercase tracking-widest hover:text-brand transition-colors"
                        >
                          <svg
                            className={`w-3 h-3 transition-transform duration-300 ${expanded === cert.id ? "rotate-90" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          Curriculum
                        </button>

                        {expanded === cert.id && (
                          <div className="mt-3 pt-3 border-t border-slate-100 animate-in">
                            <ul className="space-y-2">
                              {cert.curriculum.map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 text-slate-600 text-[13px] leading-relaxed"
                                >
                                  <div className="w-1.5 h-1.5 bg-brand/40 mt-[7px] flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Enquire */}
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <Link
                            href={`/contact?subject=${encodeURIComponent(cert.title)}`}
                            className="group/btn inline-flex items-center gap-2 bg-brand text-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-brand transition-colors"
                          >
                            Enquire
                            <svg
                              className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredCourses.length === 0 && (
                  <div className="mt-6 bg-white border border-dashed border-slate-300 p-8 text-center">
                    <p className="text-slate-500 text-[14px]">
                      No courses match the selected filters. Try adjusting your
                      search or filter selections.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
