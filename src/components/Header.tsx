import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      {/* Top Bar with News Scroller & Logins */}
      <div className="bg-navy text-white h-10 flex items-center overflow-hidden border-b border-white/5">
        <div className="max-w-[1240px] mx-auto px-6 w-full flex items-center justify-between">
          
          {/* News Scroller */}
          <div className="flex items-center gap-4 flex-1 overflow-hidden h-full">
            <span className="bg-brand text-[10px] font-bold px-2 py-0.5 whitespace-nowrap uppercase tracking-widest shrink-0 z-10 relative">
              Latest Updates
            </span>
            <div className="flex-1 overflow-hidden relative">
              <div className="inline-flex animate-marquee whitespace-nowrap text-[11px] font-medium text-slate-300 py-1">
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
            <Link href="/login/member" className="text-[11px] font-bold hover:text-brand transition-colors uppercase tracking-widest">
              Member Login
            </Link>
            <div className="w-px h-3 bg-white/20" />
            <Link href="/login/learner" className="text-[11px] font-bold hover:text-brand transition-colors uppercase tracking-widest">
              Learner Login
            </Link>
          </div>

        </div>
      </div>

      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1240px] mx-auto px-6 h-16 lg:h-24 flex items-center justify-between">
          
          {/* Left: Logos */}
          <div className="flex items-center gap-4 lg:gap-6 xl:gap-8 shrink-0">
            <Link href="/">
              <Image src="/logo.png" alt="ARIFAC" width={110} height={32} className="h-9 lg:h-10 xl:h-12 w-auto mix-blend-multiply" priority />
            </Link>
            <div className="h-8 lg:h-10 w-px bg-slate-300" />
            <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
              <Image src="/fiu-logo.png" alt="FIU INDIA" width={32} height={32} className="h-9 lg:h-10 xl:h-12 mix-blend-multiply" style={{ width: "auto" }} priority />
              <div className="hidden xl:flex flex-col justify-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-tight">Strategic Guidance</span>
                <span className="text-[13px] font-bold text-slate-900 leading-tight">FIU-INDIA</span>
              </div>
            </div>
          </div>
          
          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 mx-auto">
            {[
              { label: "About", href: "/about" },
              { label: "Membership", href: "/membership" },
              { label: "Certification", href: "/certifications" },
              { label: "Programmes", href: "/programmes" },
              { label: "Updates", href: "/updates" },
            ].map(item => (
              <Link key={item.label} href={item.href} className="text-[13px] font-bold text-slate-800 hover:text-brand transition-colors whitespace-nowrap">
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Right: Actions */}
          <div className="flex items-center gap-4 xl:gap-6">
            <Link href="/members" className="hidden lg:block text-[13px] font-bold text-slate-800 hover:text-brand transition-colors whitespace-nowrap">
              Our Members
            </Link>
            <Link href="/membership/launching-soon" className="bg-slate-900 text-white px-5 py-2.5 lg:px-7 lg:py-3 text-[13px] font-bold hover:bg-brand transition-colors whitespace-nowrap">
              Membership
            </Link>
          </div>

        </div>
      </header>
    </>
  );
}
