import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const allianceLinks = [
    { href: "/about", label: "About Us" },
    { href: "/members", label: "Our Members" },
  ];

  const programmesLinks = [
    { href: "/programmes", label: "Programmes" },
    { href: "/certifications", label: "Certifications" },
    { href: "/training-leads", label: "Training Leads" },
    { href: "/sectoral-nodal-officers", label: "Sectoral Nodal Officers" },
    { href: "/regulatory-updates", label: "Regulatory Updates" },
  ];

  const supportLinks = [
    { href: "/help", label: "Help Center" },
    { href: "/contact", label: "Contact Us" },
  ];

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
               <Image src="/fiu-logo.png" alt="FIU INDIA" width={36} height={36} className="h-10 w-auto" />
               <div className="h-8 w-px bg-white/20" />
               <Image src="/logo.png" alt="ARIFAC" width={110} height={32} className="h-9 w-auto brightness-0 invert" />
             </div>
             <p className="text-[15px] text-white leading-relaxed font-normal max-w-sm mb-8">
               Empowering India&apos;s financial ecosystem through unified compliance standards, expert certification, and strategic regulatory dialogue.
             </p>
             <span className="text-[11px] font-bold text-white uppercase tracking-wider">An IAMAI Initiative</span>
          </div>
          
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-6">Alliance</h4>
            <div className="flex flex-col gap-4 text-[13px] text-white">
              {allianceLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white/70 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-6">Programmes</h4>
            <div className="flex flex-col gap-4 text-[13px] text-white">
              {programmesLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white/70 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-6">Support</h4>
            <div className="flex flex-col gap-4 text-[13px] text-white">
              {supportLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white/70 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] text-white font-medium">
          <div className="flex gap-8">
            <Link href="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Legal & Compliance</Link>
          </div>
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} ARIFAC | IAMAI. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
