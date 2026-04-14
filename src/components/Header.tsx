"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NewsItem } from "@/payload-types";

interface HeaderProps {
  newsItems?: NewsItem[];
}

export default function Header({ newsItems = [] }: HeaderProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Top Bar with News Scroller & Logins -- Exact StatsStrip Sync Version */}
      {newsItems.length > 0 && (
        <div className="bg-[#0f172a] h-11 flex items-center overflow-hidden border-b border-brand/20 relative z-30">
          {/* Depth Layers (Exact Sync with StatsStrip) */}
          <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
          <div className="absolute inset-0 bg-grid-subtle opacity-[0.03] pointer-events-none" />
          
          <div className="max-w-[1240px] mx-auto px-6 w-full flex items-center justify-between relative z-10">

            {/* News Scroller */}
            <div className="flex items-center gap-4 flex-1 overflow-hidden h-full">
              <span className="bg-white/5 text-white text-[9px] font-black px-2.5 py-1 whitespace-nowrap uppercase tracking-[0.2em] shrink-0 relative flex items-center gap-2 border border-white/10">
                <span className="w-1.5 h-1.5 bg-[#C41E24] rounded-full animate-pulse" />
                Latest Updates
              </span>
              <div className="flex-1 overflow-hidden relative">
                <div className="inline-flex animate-marquee whitespace-nowrap text-[11px] font-bold text-white/90 py-1">
                  {newsItems.map((item) => (
                    <span key={item.id} className="mx-10 flex items-center gap-2">
                      {item.text}
                    </span>
                  ))}
                  {/* Duplicate for seamless loop */}
                  {newsItems.map((item) => (
                    <span key={`dup-${item.id}`} className="mx-10 flex items-center gap-2">
                      {item.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Login Links */}
            <div className="hidden md:flex items-center gap-6 shrink-0 ml-8 border-l border-brand/20 pl-8 h-full">
              <Link href="/login/member" className="text-[10px] font-black text-white hover:text-[#C41E24] transition-colors uppercase tracking-widest flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Member
              </Link>
              <Link href="/login/learner" className="text-[10px] font-black text-white hover:text-[#C41E24] transition-colors uppercase tracking-widest flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                Learner
              </Link>
            </div>

          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-[1240px] mx-auto px-6 h-16 lg:h-24 flex items-center justify-between">

          {/* Left: Logos */}
          <div className="flex items-center gap-4 shrink-0">
            <Image src="/fiu-logo.png" alt="FIU INDIA" width={32} height={32} className="h-9 lg:h-10 xl:h-12 mix-blend-multiply" style={{ width: "auto" }} priority />
            <div className="h-8 lg:h-10 w-px bg-neutral-300" />
            <Link href="/">
              <Image src="/logo.png" alt="ARIFAC" width={110} height={32} className="h-9 lg:h-10 xl:h-12 w-auto mix-blend-multiply" priority />
            </Link>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 mx-auto">
            <Link
              href="/about"
              className={`text-[15px] font-bold transition-colors whitespace-nowrap ${
                isActive("/about") ? "text-brand" : "text-neutral-800 hover:text-brand"
              }`}
            >
              About
            </Link>

            {/* Engage with dropdown */}
            <div className="relative group/engage">
              <span
                className={`text-[15px] font-bold group-hover/engage:text-brand transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-default ${
                  (isActive("/membership") || isActive("/learners") || isActive("/contributor")) ? "text-brand" : "text-neutral-800 hover:text-brand"
                }`}
              >
                Engage
                <svg className={`w-2.5 h-2.5 group-hover/engage:text-brand group-hover/engage:translate-y-px transition-all duration-300 ${
                  (isActive("/membership") || isActive("/learners") || isActive("/contributor")) ? "text-brand" : "text-neutral-300"
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              <div className="absolute top-full -left-4 pt-3 opacity-0 invisible translate-y-1 group-hover/engage:opacity-100 group-hover/engage:visible group-hover/engage:translate-y-0 transition-all duration-300 z-50">
                <div className="bg-white w-[260px] border border-neutral-200 overflow-hidden relative">
                  {/* Top accent */}
                  <div className="h-[2px] w-full bg-gradient-to-r from-brand via-brand-light to-transparent" />
                  {/* Eyebrow */}
                  <div className="px-5 pt-4 pb-2">
                    <span className="text-[9px] font-bold text-brand uppercase tracking-[0.25em]">Engage</span>
                  </div>
                  {/* Links */}
                  <div className="px-2 pb-3">
                    <Link href="/membership" className="group/item flex items-center px-3 py-2.5 hover:bg-neutral-50 transition-colors">
                      <div>
                        <span className="text-[12px] font-bold text-neutral-900 block leading-tight group-hover/item:text-brand transition-colors">Membership</span>
                        <span className="text-[10px] text-neutral-400">Join our network</span>
                      </div>
                    </Link>
                    <Link href="/learners" className="group/item flex items-center px-3 py-2.5 hover:bg-neutral-50 transition-colors">
                      <div>
                        <span className="text-[12px] font-bold text-neutral-900 block leading-tight group-hover/item:text-brand transition-colors">Learners</span>
                        <span className="text-[10px] text-neutral-400">Register with ARIFAC</span>
                      </div>
                    </Link>
                    <Link href="/contributor" className="group/item flex items-center px-3 py-2.5 hover:bg-neutral-50 transition-colors">
                      <div>
                        <span className="text-[12px] font-bold text-neutral-900 block leading-tight group-hover/item:text-brand transition-colors">Become a Contributor</span>
                        <span className="text-[10px] text-neutral-400">Join our expert network</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Certification with dropdown */}
            <div className="relative group/nav">
              <Link
                href="/certifications"
                className={`text-[15px] font-bold group-hover/nav:text-brand transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  (isActive("/certifications") || isActive("/training-leads")) ? "text-brand" : "text-neutral-800 hover:text-brand"
                }`}
              >
                Certification
                <svg className={`w-2.5 h-2.5 group-hover/nav:text-brand group-hover/nav:translate-y-px transition-all duration-300 ${
                  (isActive("/certifications") || isActive("/training-leads")) ? "text-brand" : "text-neutral-300"
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute top-full -left-4 pt-3 opacity-0 invisible translate-y-1 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-300 z-50">
                <div className="bg-white w-[260px] border border-neutral-200 overflow-hidden relative">
                  {/* Top accent */}
                  <div className="h-[2px] w-full bg-gradient-to-r from-brand via-brand-light to-transparent" />
                  {/* Eyebrow */}
                  <div className="px-5 pt-4 pb-2">
                    <span className="text-[9px] font-bold text-brand uppercase tracking-[0.25em]">Certification &amp; Training</span>
                  </div>
                  {/* Links */}
                  <div className="px-2 pb-3">
                    <Link href="/certifications" className="group/item flex items-center px-3 py-2.5 hover:bg-neutral-50 transition-colors">
                      <div>
                        <span className="text-[12px] font-bold text-neutral-900 block leading-tight group-hover/item:text-brand transition-colors">All Certifications</span>
                        <span className="text-[10px] text-neutral-400">Browse learning pathways</span>
                      </div>
                    </Link>
                    <Link href="/training-leads" className="group/item flex items-center px-3 py-2.5 hover:bg-neutral-50 transition-colors">
                      <div>
                        <span className="text-[12px] font-bold text-neutral-900 block leading-tight group-hover/item:text-brand transition-colors">Training Leads</span>
                        <span className="text-[10px] text-neutral-400">Expert network directory</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {[
              { label: "Programmes", href: "/programmes" },
              { label: "Updates", href: "/updates" },
            ].map(item => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[15px] font-bold transition-colors whitespace-nowrap ${
                  isActive(item.href) ? "text-brand" : "text-neutral-800 hover:text-brand"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 xl:gap-6">

            <Link
              href="https://www.linkedin.com/company/arifac/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-brand transition-colors"
              aria-label="ARIFAC on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
          </div>

        </div>
      </header>
    </>
  );
}
