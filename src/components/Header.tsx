"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Top Bar with News Scroller & Logins */}
      <div className="bg-brand text-white h-10 flex items-center overflow-hidden border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-6 w-full flex items-center justify-between">
          
          {/* News Scroller */}

          <div className="flex items-center gap-4 flex-1 overflow-hidden h-full">
            <span className="bg-brand text-[10px] font-bold px-2 py-0.5 whitespace-nowrap uppercase tracking-widest shrink-0 z-10 relative">
              Latest Updates
            </span>
            <div className="flex-1 overflow-hidden relative">
              <div className="inline-flex animate-marquee whitespace-nowrap text-[11px] font-medium text-white/80 py-1">
                <span className="mx-8">RBI: Regional Rural Banks – Know Your Customer Directions, 2025 released</span>
                <span className="mx-8">ARIFAC: Register for the upcoming Specialist Level Certification Batch</span>
                <span className="mx-8">RBI: Commercial Banks – Know Your Customer Directions, 2025 updated</span>
                {/* Duplicate for seamless loop */}
                <span className="mx-8">RBI: Regional Rural Banks – Know Your Customer Directions, 2025 released</span>
                <span className="mx-8">ARIFAC: Register for the upcoming Specialist Level Certification Batch</span>
                <span className="mx-8">RBI: Commercial Banks – Know Your Customer Directions, 2025 updated</span>
              </div>
            </div>
          </div>

          {/* Login Links */}
          <div className="hidden md:flex items-center gap-6 shrink-0 ml-8">
            <Link href="/login/member" className="text-[11px] font-bold hover:text-white/70 transition-colors uppercase tracking-widest">
              Member Login
            </Link>
            <div className="w-px h-3 bg-white/20" />
            <Link href="/login/learner" className="text-[11px] font-bold hover:text-white/70 transition-colors uppercase tracking-widest">
              Learner Login
            </Link>
          </div>

        </div>
      </div>

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
            {[
              { label: "About", href: "/about" },
              { label: "Membership", href: "/membership" },
            ].map(item => (
              <Link 
                key={item.label} 
                href={item.href} 
                className={`text-[13px] font-bold transition-colors whitespace-nowrap ${
                  isActive(item.href) ? "text-brand" : "text-neutral-800 hover:text-brand"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Certification with dropdown */}
            <div className="relative group/nav">
              <Link 
                href="/certifications" 
                className={`text-[13px] font-bold group-hover/nav:text-brand transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  isActive("/certifications") ? "text-brand" : "text-neutral-800 hover:text-brand"
                }`}
              >
                Certification
                <svg className={`w-2.5 h-2.5 group-hover/nav:text-brand group-hover/nav:translate-y-px transition-all duration-300 ${
                  isActive("/certifications") ? "text-brand" : "text-neutral-300"
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
                    <Link href="/certifications" className="group/item flex items-center gap-3 px-3 py-2.5 hover:bg-neutral-50 transition-colors">
                      <div className="w-7 h-7 bg-brand/[0.06] flex items-center justify-center flex-shrink-0 group-hover/item:bg-brand transition-colors duration-300">
                        <svg className="w-3.5 h-3.5 text-brand group-hover/item:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[12px] font-bold text-neutral-900 block leading-tight group-hover/item:text-brand transition-colors">All Certifications</span>
                        <span className="text-[10px] text-neutral-400">Browse learning pathways</span>
                      </div>
                    </Link>
                    <Link href="/training-leads" className="group/item flex items-center gap-3 px-3 py-2.5 hover:bg-neutral-50 transition-colors">
                      <div className="w-7 h-7 bg-brand/[0.06] flex items-center justify-center flex-shrink-0 group-hover/item:bg-brand transition-colors duration-300">
                        <svg className="w-3.5 h-3.5 text-brand group-hover/item:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
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
                className={`text-[13px] font-bold transition-colors whitespace-nowrap ${
                  isActive(item.href) ? "text-brand" : "text-neutral-800 hover:text-brand"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Right: Actions */}
          <div className="flex items-center gap-4 xl:gap-6">
          
            <Link href="/membership" className={`bg-neutral-900 text-white px-5 py-2.5 lg:px-7 lg:py-3 text-[13px] font-bold hover:bg-brand transition-colors whitespace-nowrap ${
              isActive("/membership") ? "bg-brand" : ""
            }`}>
              Membership
            </Link>
          </div>

        </div>
      </header>
    </>
  );
}

