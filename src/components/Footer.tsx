import Image from "next/image";
import Link from "next/link";
import type { Footer as FooterType } from '@/payload-types'

interface FooterProps {
  data: FooterType
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 md:pt-24 pb-10 relative overflow-hidden">
      {/* Texture Sync with StatsStrip */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-subtle opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-white/5" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-10 mb-16">

          <div className="md:col-span-4">
            <div className="flex items-center gap-4 mb-6">
              <Image src="/fiu-logo.png" alt="FIU INDIA" width={48} height={48} className="h-14 w-auto" />
              <div className="h-10 w-px bg-white/20" />
              <Image src="/logo.png" alt="ARIFAC" width={140} height={40} className="h-12 w-auto brightness-0 invert" />
            </div>
            <p className="text-[15px] text-white leading-relaxed font-normal max-w-sm mb-8">
              {data.tagline}
            </p>
            <Image src="/pci-fcc.png" alt="PCI & FCC — Internet And Mobile Association Of India" width={200} height={56} className="max-w-[180px] w-auto h-auto brightness-0 invert" />
          </div>

          {data.linkGroups?.map((group, idx) => (
            <div key={idx} className={`md:col-span-2 ${idx === 0 ? 'md:col-start-6' : ''}`}>
              <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-6">{group.title}</h4>
              <div className="flex flex-col gap-4 text-[13px] text-white">
                {group.links?.map((link, linkIdx) => (
                  <Link key={linkIdx} href={link.url} className="hover:text-white/70 transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] text-white font-medium">
          <div className="flex gap-8">
            {data.bottomLinks?.map((link, idx) => (
              <Link key={idx} href={link.url} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} {data.copyrightText}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
