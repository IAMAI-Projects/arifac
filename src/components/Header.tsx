"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NewsItem, Header as HeaderType } from "@/payload-types";

interface HeaderProps {
  newsItems?: NewsItem[];
  data: HeaderType;
}

export default function Header({ newsItems = [], data }: HeaderProps) {
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


          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-[1240px] mx-auto px-6 h-16 lg:h-24 flex items-center justify-between">

          {/* Left: Logos */}
          <div className="flex items-center gap-4 shrink-0">
            <a href={data.fiuLogoLink || 'https://fiuindia.gov.in/'} target="_blank" rel="noopener noreferrer">
              <Image src="/fiu-logo.png" alt="FIU INDIA" width={32} height={32} className="h-9 lg:h-10 xl:h-12 mix-blend-multiply" style={{ width: "auto" }} priority />
            </a>
            <div className="h-8 lg:h-10 w-px bg-neutral-300" />
            <Link href="/">
              <Image src="/logo.png" alt="ARIFAC" width={110} height={32} className="h-9 lg:h-10 xl:h-12 w-auto mix-blend-multiply" priority />
            </Link>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 mx-auto">
            {data.navigation?.map((item, idx) => {
              if (item.hasDropdown && item.dropdownItems && item.dropdownItems.length > 0) {
                const groupName = `nav${idx}`;
                const isAnyChildActive = item.dropdownItems.some(di => isActive(di.link));
                return (
                  <div key={idx} className={`relative group/${groupName}`}>
                    <Link
                      href={item.link}
                      className={`text-[15px] font-bold group-hover/${groupName}:text-brand transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                        isActive(item.link) || isAnyChildActive ? "text-brand" : "text-neutral-800 hover:text-brand"
                      }`}
                    >
                      {item.label}
                      <svg className={`w-2.5 h-2.5 group-hover/${groupName}:text-brand group-hover/${groupName}:translate-y-px transition-all duration-300 ${
                        isActive(item.link) || isAnyChildActive ? "text-brand" : "text-neutral-300"
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    <div className={`absolute top-full -left-4 pt-3 opacity-0 invisible translate-y-1 group-hover/${groupName}:opacity-100 group-hover/${groupName}:visible group-hover/${groupName}:translate-y-0 transition-all duration-300 z-50`}>
                      <div className="bg-white w-[260px] border border-neutral-200 overflow-hidden relative">
                        <div className="h-[2px] w-full bg-gradient-to-r from-brand via-brand-light to-transparent" />
                        <div className="px-5 pt-4 pb-2">
                          <span className="text-[9px] font-bold text-brand uppercase tracking-[0.25em]">{item.dropdownLabel || item.label}</span>
                        </div>
                        <div className="px-2 pb-3">
                          {item.dropdownItems.map((di, diIdx) => (
                            <Link key={diIdx} href={di.link} className="group/item flex items-center px-3 py-2.5 hover:bg-neutral-50 transition-colors">
                              <div>
                                <span className="text-[12px] font-bold text-neutral-900 block leading-tight group-hover/item:text-brand transition-colors">{di.label}</span>
                                {di.description && <span className="text-[10px] text-neutral-400">{di.description}</span>}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={idx}
                  href={item.link}
                  className={`text-[15px] font-bold transition-colors whitespace-nowrap ${
                    isActive(item.link) ? "text-brand" : "text-neutral-800 hover:text-brand"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 xl:gap-6">

            <Link
              href={data.linkedinUrl || 'https://www.linkedin.com/company/arifac/'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-brand transition-colors"
              aria-label="ARIFAC on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>

            {/* Login with dropdown */}
            <div className="relative group/login">
              <span className="text-[13px] font-bold text-neutral-800 hover:text-brand group-hover/login:text-brand transition-colors cursor-default flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
                <svg className="w-2.5 h-2.5 text-neutral-300 group-hover/login:text-brand group-hover/login:translate-y-px transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              <div className="absolute top-full right-0 pt-3 opacity-0 invisible translate-y-1 group-hover/login:opacity-100 group-hover/login:visible group-hover/login:translate-y-0 transition-all duration-300 z-50">
                <div className="bg-white w-[220px] border border-neutral-200 overflow-hidden relative">
                  <div className="h-[2px] w-full bg-gradient-to-r from-brand via-brand-light to-transparent" />
                  <div className="px-5 pt-4 pb-2">
                    <span className="text-[9px] font-bold text-brand uppercase tracking-[0.25em]">Login As</span>
                  </div>
                  <div className="px-2 pb-3">
                    <Link href={data.memberPortalUrl || `${process.env.NEXT_PUBLIC_MEMBER_PORTAL_URL}`} className="group/item flex items-center px-3 py-2.5 hover:bg-neutral-50 transition-colors">
                      <div>
                        <span className="text-[12px] font-bold text-neutral-900 block leading-tight group-hover/item:text-brand transition-colors">Organization</span>
                        <span className="text-[10px] text-neutral-400">Member portal access</span>
                      </div>
                    </Link>
                    <Link href={data.learnerPortalUrl || 'https://stage.learning.arifac.com/'} className="group/item flex items-center px-3 py-2.5 hover:bg-neutral-50 transition-colors">
                      <div>
                        <span className="text-[12px] font-bold text-neutral-900 block leading-tight group-hover/item:text-brand transition-colors">Learner</span>
                        <span className="text-[10px] text-neutral-400">Learning platform access</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>
    </>
  );
}
