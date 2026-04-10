"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";

const certifications = [
  {
    id: "associate-aml-cft",
    title: "ARIFAC Certified Associate (AML/CFT)",
    level: "Foundation Level",
    focus: "Awareness & Literacy",
    category: "Foundation",
    format: "Online",
    description: "Designed for role-based onboarding and entry-level compliance awareness. This certification ensures that all staff within reporting entities understand the fundamentals of PMLA, KYC, and the importance of financial integrity.",
    curriculum: [
      "Introduction to AML/CFT Frameworks",
      "Overview of PMLA & FIU-IND Reporting",
      "KYC & Customer Due Diligence (CDD)",
      "Red Flag Indicators for Frontline Staff"
    ],
    duration: "4 Weeks (Online)",
    image: "/cert-associate.png"
  },
  {
    id: "professional-aml-cft",
    title: "ARIFAC Certified Professional (AML/CFT)",
    level: "Professional Level",
    focus: "Operations & Supervision",
    category: "Professional",
    format: "Hybrid",
    description: "Focuses on applied compliance, transaction monitoring, and enhancing supervisory capabilities. Targeted at compliance officers and mid-level managers responsible for daily operational oversight.",
    curriculum: [
      "Advanced Transaction Monitoring",
      "Suspicious Transaction Reporting (STR)",
      "Risk-Based Approach (RBA) Implementation",
      "Sanctions Screening & Management"
    ],
    duration: "8 Weeks (Hybrid)",
    image: "/cert-professional.png"
  },
  {
    id: "specialist-aml-cft",
    title: "ARIFAC Certified Specialist (AML/CFT)",
    level: "Specialist Level",
    focus: "Investigations & Forensics",
    category: "Specialist",
    format: "Expert-Led",
    description: "Deep domain expertise focusing on advanced investigations, complex money laundering typologies, and forensic analysis. Designed for senior compliance leaders and financial crime investigators.",
    curriculum: [
      "Complex Typology Analysis",
      "Forensic Audit & Asset Tracing",
      "Digital Asset & VDA Compliance",
      "Regulatory Reporting & Audit Defense"
    ],
    duration: "12 Weeks (Expert-Led)",
    image: "/cert-specialist.png"
  },
  {
    id: "digital-assets-compliance",
    title: "ARIFAC Certificate in Digital Asset Compliance",
    level: "Advanced Certificate",
    focus: "VDA Risk & Controls",
    category: "Specialist",
    format: "Live Online",
    description: "Focused programme on virtual digital asset risk management, travel rule readiness, sanctions controls, and transaction monitoring for VDA-related businesses.",
    curriculum: [
      "VDA Regulatory Landscape in India",
      "Blockchain Analytics for Compliance Teams",
      "Sanctions and Wallet Screening Controls",
      "Suspicious Activity Escalation Protocols"
    ],
    duration: "6 Weeks (Live Online)",
    image: "/cert-specialist.png" // Fallback to specialist image
  }
];

const benefits = [
  {
    title: "Recognised Standards",
    description: "Aligned with global FATF standards and Indian regulatory requirements.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2 2 0 012 2v.5m.435 4.435L17.435 20M12 22a10 10 0 110-20 10 10 0 010 20z" />
      </svg>
    )
  },
  {
    title: "Industry Validated",
    description: "Curriculum vetted by leading subject matter experts across the ecosystem.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Career Growth",
    description: "Structured pathway from foundational knowledge to senior integrity leadership.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  }
];

export default function CertificationPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [formatFilter, setFormatFilter] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...new Set(certifications.map((course) => course.category))];
  }, []);

  const formats = useMemo(() => {
    return ["All", ...new Set(certifications.map((course) => course.format))];
  }, []);

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return certifications.filter((course) => {
      const byCategory = categoryFilter === "All" || course.category === categoryFilter;
      const byFormat = formatFilter === "All" || course.format === formatFilter;
      const bySearch =
        query.length === 0 ||
        course.title.toLowerCase().includes(query) ||
        course.focus.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query);
      return byCategory && byFormat && bySearch;
    });
  }, [search, categoryFilter, formatFilter]);

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-brand selection:text-white antialiased">
      <Header />
      
      <main className="flex-grow">
        <PageBanner 
          label="Certifications"
          title="Industry Standard Pathways for Financial Crime Readiness"
          description="Role-based programmes from foundation to specialist level, designed to strengthen compliance across India's financial ecosystem."
        />

        {/* ── Value Pillars ── */}
        <section className="relative -mt-6 z-20 pb-12 lg:pb-16 animate-in">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-0">
              {benefits.map((benefit, idx) => (
                <div 
                  key={idx} 
                  className={`group bg-white p-6 lg:p-8 border-y border-x border-slate-100 first:border-l-brand/20 last:border-r-brand/20 transition-all hover:bg-slate-50 relative animate-in delay-${(idx + 1) * 100}`}
                >
                  <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
                  <div className="flex items-start gap-5 relative z-10">
                    <div className="w-10 h-10 bg-navy/[0.03] text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all duration-300">
                      <div className="[&>svg]:w-5 [&>svg]:h-5">
                        {benefit.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[13px] font-bold text-navy uppercase tracking-widest mb-2 group-hover:text-brand transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-500 text-[13px] leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ── Certification Pathways ── */}
        <section id="pathway" className="py-12 lg:py-16 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />
          
          <div className="max-w-[1240px] mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-1 w-8 bg-brand" />
                  <span className="text-[12px] font-bold text-brand tracking-widest uppercase">Course Catalogue</span>
                </div>
                <h2 className="text-2xl lg:text-[34px] font-extrabold text-navy leading-none tracking-tight mb-4">
                  Explore Learning Pathways
                </h2>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  Browse ARIFAC programmes by level, delivery format, and focus area. 
                  This catalogue expands as new pathways are launched.
                </p>
              </div>

              <div className="flex-shrink-0">
                <div className="bg-white border border-slate-200 p-1 flex items-center shadow-sm">
                  <div className="px-4 py-2 border-r border-slate-100">
                    <span className="text-[11px] font-bold text-navy uppercase">{filteredCourses.length}</span>
                  </div>
                  <div className="px-4 py-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Compact Controls ── */}
            <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 p-5 lg:p-6 mb-10">
              <div className="grid md:grid-cols-12 gap-6">
                <div className="md:col-span-6">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title, focus, or topic..."
                    className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-[14px] focus:outline-none focus:border-brand focus:bg-white transition-all placeholder:text-slate-300"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Level</label>
                  <div className="relative">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-100 px-4 py-3 text-[14px] focus:outline-none focus:border-brand focus:bg-white transition-all cursor-pointer"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Format</label>
                  <div className="relative">
                    <select
                      value={formatFilter}
                      onChange={(e) => setFormatFilter(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-100 px-4 py-3 text-[14px] focus:outline-none focus:border-brand focus:bg-white transition-all cursor-pointer"
                    >
                      {formats.map((format) => (
                        <option key={format} value={format}>{format}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {filteredCourses.map((cert, idx) => (
                <div 
                  key={cert.id} 
                  className={`group relative bg-white border border-slate-200 hover:border-brand transition-all duration-500 overflow-hidden flex flex-col animate-in delay-${(idx % 10 + 1) * 50}`}
                >
                  <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                  
                  {/* Image Header - Ultra Compact */}
                  <div className="aspect-[4/3] bg-white relative overflow-hidden flex items-center justify-center border-b border-slate-100">
                    <div className="absolute inset-0 bg-navy opacity-0 group-hover:opacity-[0.02] transition-opacity z-10" />
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 1240px) 20vw, 33vw"
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="relative z-10 p-4 flex-grow flex flex-col">
                    <span className="text-[9px] font-bold text-brand uppercase tracking-widest mb-1.5 block truncate">
                      {cert.level}
                    </span>

                    <h3 className="text-[14px] font-extrabold text-navy mb-2 leading-tight group-hover:text-brand transition-colors line-clamp-2 min-h-[2.5em]">
                      {cert.title}
                    </h3>
                    
                    <p className="text-slate-500 text-[12px] leading-relaxed mb-4 flex-grow line-clamp-3">
                      {cert.description}
                    </p>

                    <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-[9px] font-bold text-navy uppercase tracking-widest">{cert.duration}</span>
                      </div>
                      <Link 
                        href={`/contact?subject=${encodeURIComponent(cert.title)}`} 
                        className="group/btn inline-flex items-center gap-1.5 text-[10px] font-bold text-brand uppercase tracking-widest hover:text-navy transition-colors"
                      >
                        Enquire
                        <svg className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="mt-6 bg-white border border-dashed border-slate-300 p-8 text-center">
                <p className="text-slate-600 text-[15px] leading-relaxed">No courses match the selected filters. Try adjusting your search or filter selections.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Regulatory Notice ── */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="relative p-1 bg-gradient-to-r from-brand/20 via-brand-light/20 to-transparent">
              <div className="bg-navy p-8 lg:p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-subtle opacity-[0.04] pointer-events-none" />
                <div className="relative z-10 grid lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-white/[0.05] border border-white/10 mb-6">
                      <svg className="w-8 h-8 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-[12px] font-bold text-brand-light uppercase tracking-widest mb-4">Statutory Compliance Notice</h3>
                    <div className="h-1 w-12 bg-brand" />
                  </div>
                  <div className="lg:col-span-8">
                    <p className="text-slate-300 text-[15px] lg:text-[16px] leading-relaxed">
                      ARIFAC certifications indicate successful completion of programme requirements and competency assessments. 
                      They do not represent regulatory approval, legal authorization, or statutory licensing. 
                      All entities and professionals remain responsible for compliance with applicable obligations 
                      under the PMLA framework and related regulatory directions.
                    </p>
                  </div>
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
