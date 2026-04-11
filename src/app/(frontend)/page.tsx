"use client";

import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";

import RegulatoryDashboard from "@/components/RegulatoryDashboard";
import CapabilityMatrix from "@/components/CapabilityMatrix";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityMatrix />
      <StatsStrip />

      {/* RegulatoryDashboard with white background for continuity */}
      <RegulatoryDashboard />

      {/* Final Institutional CTA */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="bg-brand p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand opacity-10 rounded-full translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold !text-white mb-4">Empower your institution with global compliance standards.</h2>
              <p className="text-white/80 text-[16px] mb-10 leading-relaxed">
                Join ARIFAC as an institutional member to gain access to exclusive forums, regulatory guidance, and specialized capability building programs.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link href="/membership" className="bg-white text-brand px-8 py-3.5 font-bold text-[13px] hover:bg-brand-dark hover:text-white transition-all">
                  Apply for Membership
                </Link>
                <Link href="/contact" className="border border-white/20 text-white px-8 py-3.5 font-bold text-[13px] hover:bg-white/10 transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
