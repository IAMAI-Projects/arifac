"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

type RegulatoryUpdate = {
  id: string;
  regulator: "RBI" | "FIU-IND" | "SEBI" | "IRDAI";
  category:
    | "AML / CFT"
    | "KYC / Customer Due Diligence"
    | "Reporting Obligations"
    | "Digital Onboarding"
    | "Fraud / Cyber Risk"
    | "Sanctions / Screening"
    | "Compliance & Governance";
  title: string;
  circularRef: string;
  issuedOn: string;
  link: string;
};

const updates: RegulatoryUpdate[] = [
  {
    id: "rbi-rrb-kyc-2025",
    regulator: "RBI",
    category: "KYC / Customer Due Diligence",
    title: "Regional Rural Banks - Know Your Customer Directions, 2025",
    circularRef: "DOR.AML.REC.No.185/14.01.004/2025-26",
    issuedOn: "2026-01-04",
    link: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
  },
  {
    id: "rbi-commercial-kyc-2025",
    regulator: "RBI",
    category: "KYC / Customer Due Diligence",
    title: "Commercial Banks - Know Your Customer Directions, 2025",
    circularRef: "DOR.AML.REC.No.88/14.01.002/2025-26",
    issuedOn: "2025-11-28",
    link: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
  },
  {
    id: "rbi-sfb-kyc-2025",
    regulator: "RBI",
    category: "KYC / Customer Due Diligence",
    title: "Small Finance Banks - Know Your Customer Directions, 2025",
    circularRef: "DOR.AML.REC.No.119/14.01.007/2025-26",
    issuedOn: "2025-11-28",
    link: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
  },
  {
    id: "rbi-payments-bank-kyc-2025",
    regulator: "RBI",
    category: "KYC / Customer Due Diligence",
    title: "Payments Banks - Know Your Customer Directions, 2025",
    circularRef: "DOR.AML.REC.No.137/14.01.009/2025-26",
    issuedOn: "2025-11-28",
    link: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
  },
  {
    id: "rbi-ucb-kyc-2025",
    regulator: "RBI",
    category: "KYC / Customer Due Diligence",
    title: "Urban Co-operative Banks - Know Your Customer Directions, 2025",
    circularRef: "DOR.AML.REC.No.235/14.01.005/2025-26",
    issuedOn: "2025-11-28",
    link: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
  },
  {
    id: "rbi-aifi-kyc-2025",
    regulator: "RBI",
    category: "KYC / Customer Due Diligence",
    title: "All India Financial Institutions - Know Your Customer Directions, 2025",
    circularRef: "DOR.AML.REC.No.254/14.01.011/2025-26",
    issuedOn: "2025-11-28",
    link: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
  },
  {
    id: "rbi-nbfc-kyc-2025",
    regulator: "RBI",
    category: "KYC / Customer Due Diligence",
    title: "Non-Banking Financial Companies - Know Your Customer Directions, 2025",
    circularRef: "DOR.AML.REC.No.280/14.01.003/2025-26",
    issuedOn: "2025-11-28",
    link: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
  },
  {
    id: "rbi-arc-kyc-2025",
    regulator: "RBI",
    category: "KYC / Customer Due Diligence",
    title: "Asset Reconstruction Companies - Know Your Customer Directions, 2025",
    circularRef: "DOR.AML.REC.No.296/14.01.010/2025-26",
    issuedOn: "2025-11-28",
    link: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
  },
  {
    id: "fiu-sanctions-implementation-note",
    regulator: "FIU-IND",
    category: "Sanctions / Screening",
    title: "Advisory on strengthened sanctions screening and beneficial ownership traceability",
    circularRef: "FIU-IND/OPS/ADVISORY/2025-11",
    issuedOn: "2025-11-15",
    link: "https://fiuindia.gov.in",
  },
  {
    id: "sebi-risk-monitoring-framework",
    regulator: "SEBI",
    category: "Compliance & Governance",
    title: "Updated risk governance framework for market intermediaries",
    circularRef: "SEBI/HO/MIRSD/POD1/CIR/2025/188",
    issuedOn: "2025-10-30",
    link: "https://www.sebi.gov.in",
  },
  {
    id: "rbi-digital-onboarding-enhanced-ovd",
    regulator: "RBI",
    category: "Digital Onboarding",
    title: "Enhanced OVD verification controls for fully digital onboarding journeys",
    circularRef: "DOR.AML.REC.No.74/14.01.001/2025-26",
    issuedOn: "2025-10-17",
    link: "https://www.rbi.org.in",
  },
  {
    id: "irdai-fraud-escalation-norms",
    regulator: "IRDAI",
    category: "Fraud / Cyber Risk",
    title: "Fraud incident escalation and board reporting timelines for insurers",
    circularRef: "IRDAI/INT/FRAUD/CIR/2025-26/17",
    issuedOn: "2025-09-12",
    link: "https://www.irdai.gov.in",
  },
  {
    id: "fiu-str-quality-advisory",
    regulator: "FIU-IND",
    category: "Reporting Obligations",
    title: "Guidance note on improving STR narrative quality and entity linkage",
    circularRef: "FIU-IND/STR/GN/2025-08",
    issuedOn: "2025-08-22",
    link: "https://fiuindia.gov.in",
  },
  {
    id: "sebi-aml-cft-intermediary-surveillance",
    regulator: "SEBI",
    category: "AML / CFT",
    title: "Supervisory expectations for AML/CFT transaction surveillance in securities markets",
    circularRef: "SEBI/HO/AML/CIR/2025/143",
    issuedOn: "2025-07-30",
    link: "https://www.sebi.gov.in",
  },
  {
    id: "rbi-cbdt-pan-screening-sync",
    regulator: "RBI",
    category: "Compliance & Governance",
    title: "Operational alignment note for PAN validation and periodic KYC refresh",
    circularRef: "DOR.AML.REC.No.29/14.01.006/2025-26",
    issuedOn: "2025-06-18",
    link: "https://www.rbi.org.in",
  },
];

const PER_PAGE = 10;

const regulatorTone: Record<RegulatoryUpdate["regulator"], string> = {
  RBI: "bg-brand-subtle text-brand border-brand/20",
  "FIU-IND": "bg-emerald-50 text-emerald-700 border-emerald-200",
  SEBI: "bg-violet-50 text-violet-700 border-violet-200",
  IRDAI: "bg-amber-50 text-amber-700 border-amber-200",
};

const formatDate = (raw: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${raw}T00:00:00`));

export default function UpdatesPage() {
  const [regulator, setRegulator] = useState("All Regulators");
  const [category, setCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);

  const regulators = useMemo(
    () => ["All Regulators", ...new Set(updates.map((item) => item.regulator))],
    [],
  );

  const categories = useMemo(
    () => ["All Categories", ...new Set(updates.map((item) => item.category))],
    [],
  );

  const filtered = useMemo(() => {
    const scoped = updates.filter((item) => {
      const regulatorMatch = regulator === "All Regulators" || item.regulator === regulator;
      const categoryMatch = category === "All Categories" || item.category === category;
      return regulatorMatch && categoryMatch;
    });

    return scoped.sort((a, b) => {
      const lhs = new Date(`${a.issuedOn}T00:00:00`).getTime();
      const rhs = new Date(`${b.issuedOn}T00:00:00`).getTime();
      return sortBy === "newest" ? rhs - lhs : lhs - rhs;
    });
  }, [category, regulator, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);

  const pageData = useMemo(() => {
    const start = (safePage - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, safePage]);

  const showingStart = filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1;
  const showingEnd = Math.min(safePage * PER_PAGE, filtered.length);

  return (
    <div className="min-h-screen bg-white text-neutral-800 font-sans selection:bg-brand selection:text-white flex flex-col antialiased">
      <Header />

      <main className="flex-grow">
        <PageBanner
          label="Regulatory Updates"
          title="Recent Circulars and Notifications"
          description="Track important circulars, notifications, advisories, and regulatory updates relevant to reporting entities and the broader financial crime prevention ecosystem."
        />

        <section className="py-10 lg:py-12 bg-white">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-7">
           <div className="flex flex-wrap items-center gap-2 border border-neutral-200 bg-neutral-50 px-2.5 py-2">
                <select
                  value={regulator}
                  onChange={(e) => {
                    setRegulator(e.target.value);
                    setPage(1);
                  }}
                  className="bg-transparent text-[12px] font-bold text-neutral-700 px-2 py-1.5 focus:outline-none cursor-pointer"
                >
                  {regulators.map((entry) => (
                    <option key={entry} value={entry}>
                      {entry}
                    </option>
                  ))}
                </select>

                <div className="w-px h-4 bg-neutral-300" />

                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                  className="bg-transparent text-[12px] font-bold text-neutral-700 px-2 py-1.5 focus:outline-none cursor-pointer"
                >
                  {categories.map((entry) => (
                    <option key={entry} value={entry}>
                      {entry}
                    </option>
                  ))}
                </select>

                <div className="w-px h-4 bg-neutral-300" />

                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as "newest" | "oldest");
                    setPage(1);
                  }}
                  className="bg-transparent text-[12px] font-bold text-neutral-700 px-2 py-1.5 focus:outline-none cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
              <div>
                <p className="text-neutral-500 text-[14px]">
                  Showing <span className="font-black text-brand">{showingStart}-{showingEnd}</span> of{" "}
                  <span className="font-black text-neutral-900">{filtered.length}</span> circulars
                </p>
              </div>

              
            </div>

            <div className="space-y-3">
              {pageData.length === 0 && (
                <div className="border border-neutral-200 bg-neutral-50 p-8 text-center text-neutral-600">
                  No circulars match your selected filters.
                </div>
              )}

              {pageData.map((item, idx) => (
                <article
                  key={item.id}
                  className="group border border-neutral-200 bg-white p-5 lg:p-6 hover:border-brand/35 hover:shadow-lg hover:shadow-neutral-200/70 transition-all duration-300 animate-in"
                  style={{ animationDelay: `${(idx + 1) * 70}ms` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-2.5 py-1 border text-[11px] font-black uppercase tracking-wide ${regulatorTone[item.regulator]}`}>
                          {item.regulator}
                        </span>
                        <span className="px-2.5 py-1 border border-neutral-200 bg-neutral-50 text-neutral-600 text-[11px] font-bold uppercase tracking-wide">
                          {item.category}
                        </span>
                        <span className="text-[12px] text-neutral-500 font-semibold">{formatDate(item.issuedOn)}</span>
                      </div>

                      <h3 className="text-[16px] lg:text-[18px] font-bold text-neutral-900 leading-tight group-hover:text-brand transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[12px] text-neutral-500 font-mono mt-2">{item.circularRef}</p>
                    </div>

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="shrink-0 inline-flex items-center gap-2 border border-neutral-300 px-4 py-2 text-[11px] font-black uppercase tracking-wide text-neutral-700 hover:bg-brand hover:text-white hover:border-neutral-900 transition-all"
                    >
                      View Circular
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                        <path d="M7 17 17 7" />
                        <path d="M9 7h8v8" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-between gap-4">
              <p className="text-[14px] text-neutral-600">
                Showing <span className="font-black text-neutral-900">{showingStart}-{showingEnd}</span> of{" "}
                <span className="font-black text-neutral-900">{filtered.length}</span> circulars
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="w-9 h-9 border border-neutral-300 text-neutral-600 font-black disabled:opacity-35 disabled:cursor-not-allowed hover:bg-brand hover:text-white hover:border-neutral-900 transition-colors"
                >
                  {"<"}
                </button>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((entry) => (
                  <button
                    key={entry}
                    onClick={() => setPage(entry)}
                    className={`w-9 h-9 text-[12px] font-black border transition-colors ${
                      entry === safePage ? "bg-brand text-white border-neutral-900" : "border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900"
                    }`}
                  >
                    {entry}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="w-9 h-9 border border-neutral-300 text-neutral-600 font-black disabled:opacity-35 disabled:cursor-not-allowed hover:bg-brand hover:text-white hover:border-neutral-900 transition-colors"
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
