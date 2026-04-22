"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Header as HeaderType } from "@/payload-types";

interface HeaderProps {
  data: HeaderType;
}

export default function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  useEffect(() => {
    if (isMenuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isMenuOpen]);

  const memberPortalHref =
    data.memberPortalUrl || `${process.env.NEXT_PUBLIC_MEMBER_PORTAL_URL}`;
  const learnerPortalHref =
    data.learnerPortalUrl || "https://stage.learning.arifac.com/";
  const linkedinHref =
    data.linkedinUrl || "https://www.linkedin.com/company/arifac/";

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 lg:h-24 flex items-center justify-between gap-3">

          {/* Left: Logos */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 min-w-0">
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
                const isAnyChildActive = item.dropdownItems.some(di => isActive(di.link));
                return (
                  <div key={idx} className="relative group/nav">
                    <Link
                      href={item.link}
                      className={`text-[15px] font-bold group-hover/nav:text-brand transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                        isActive(item.link) || isAnyChildActive ? "text-brand" : "text-neutral-800 hover:text-brand"
                      }`}
                    >
                      {item.label}
                      <svg className={`w-2.5 h-2.5 group-hover/nav:text-brand group-hover/nav:translate-y-px transition-all duration-300 ${
                        isActive(item.link) || isAnyChildActive ? "text-brand" : "text-neutral-300"
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    <div className="absolute top-full -left-4 pt-3 opacity-0 invisible translate-y-1 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-300 z-50">
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

          {/* Right: Actions (desktop) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">

            <Link
              href={linkedinHref}
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
                {data.loginLabel || 'Login'}
                <svg className="w-2.5 h-2.5 text-neutral-300 group-hover/login:text-brand group-hover/login:translate-y-px transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              <div className="absolute top-full right-0 pt-3 opacity-0 invisible translate-y-1 group-hover/login:opacity-100 group-hover/login:visible group-hover/login:translate-y-0 transition-all duration-300 z-50">
                <div className="bg-white w-[220px] border border-neutral-200 overflow-hidden relative">
                  <div className="h-[2px] w-full bg-gradient-to-r from-brand via-brand-light to-transparent" />
                  <div className="px-5 pt-4 pb-2">
                    <span className="text-[9px] font-bold text-brand uppercase tracking-[0.25em]">{data.loginAsLabel || 'Login As'}</span>
                  </div>
                  <div className="px-2 pb-3">
                    <Link href={memberPortalHref} className="group/item flex items-center px-3 py-2.5 hover:bg-neutral-50 transition-colors">
                      <div>
                        <span className="text-[12px] font-bold text-neutral-900 block leading-tight group-hover/item:text-brand transition-colors">{data.organizationLoginLabel || 'Organization'}</span>
                        <span className="text-[10px] text-neutral-400">{data.organizationLoginDescription || 'Member portal access'}</span>
                      </div>
                    </Link>
                    <Link href={learnerPortalHref} className="group/item flex items-center px-3 py-2.5 hover:bg-neutral-50 transition-colors">
                      <div>
                        <span className="text-[12px] font-bold text-neutral-900 block leading-tight group-hover/item:text-brand transition-colors">{data.learnerLoginLabel || 'Learner'}</span>
                        <span className="text-[10px] text-neutral-400">{data.learnerLoginDescription || 'Learning platform access'}</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: hamburger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-neutral-900 shrink-0"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

        </div>

        {/* Mobile menu panel */}
        {isMenuOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 top-16 bg-black/40 z-40"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              id="mobile-menu"
              className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white overflow-y-auto border-t border-neutral-200"
            >
              <nav className="px-4 py-5">
                {data.navigation?.map((item, idx) => {
                  const hasChildren =
                    item.hasDropdown && item.dropdownItems && item.dropdownItems.length > 0;
                  const active = isActive(item.link);
                  const childActive = hasChildren && item.dropdownItems!.some((di) => isActive(di.link));

                  if (hasChildren) {
                    const expanded = openDropdown === idx;
                    return (
                      <div key={idx} className="border-b border-neutral-100">
                        <div className="flex items-stretch">
                          <Link
                            href={item.link}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex-1 py-4 text-[15px] font-bold ${
                              active || childActive ? "text-brand" : "text-neutral-900"
                            }`}
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setOpenDropdown(expanded ? null : idx)}
                            aria-label={expanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
                            aria-expanded={expanded}
                            className="w-12 flex items-center justify-center text-neutral-500"
                          >
                            <svg
                              className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        {expanded && (
                          <div className="pb-3 pl-3 pr-1">
                            {item.dropdownItems!.map((di, diIdx) => (
                              <Link
                                key={diIdx}
                                href={di.link}
                                onClick={() => setIsMenuOpen(false)}
                                className="block py-2.5 px-3 border-l-2 border-neutral-100 hover:border-brand"
                              >
                                <span className={`text-[13px] font-bold block leading-tight ${
                                  isActive(di.link) ? "text-brand" : "text-neutral-900"
                                }`}>
                                  {di.label}
                                </span>
                                {di.description && (
                                  <span className="text-[11px] text-neutral-400">{di.description}</span>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={idx}
                      href={item.link}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-4 text-[15px] font-bold border-b border-neutral-100 ${
                        active ? "text-brand" : "text-neutral-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="px-4 pb-6">
                <span className="text-[10px] font-bold text-brand uppercase tracking-[0.25em] block mb-3">
                  {data.loginAsLabel || 'Login As'}
                </span>
                <div className="flex flex-col gap-2">
                  <Link
                    href={memberPortalHref}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col border border-neutral-200 px-4 py-3 hover:border-brand transition-colors"
                  >
                    <span className="text-[13px] font-bold text-neutral-900 leading-tight">{data.organizationLoginLabel || 'Organization'}</span>
                    <span className="text-[11px] text-neutral-400">{data.organizationLoginDescription || 'Member portal access'}</span>
                  </Link>
                  <Link
                    href={learnerPortalHref}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col border border-neutral-200 px-4 py-3 hover:border-brand transition-colors"
                  >
                    <span className="text-[13px] font-bold text-neutral-900 leading-tight">{data.learnerLoginLabel || 'Learner'}</span>
                    <span className="text-[11px] text-neutral-400">{data.learnerLoginDescription || 'Learning platform access'}</span>
                  </Link>
                </div>

                <Link
                  href={linkedinHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold text-neutral-700 hover:text-brand transition-colors"
                  aria-label="ARIFAC on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </Link>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
