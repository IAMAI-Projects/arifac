import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const allianceLinks = [
    { href: "/about", label: "About Us" },
    { href: "/member-benefits", label: "Member Benefits" },
    { href: "/members", label: "Our Members" },
    { href: "/meetings", label: "Meetings & Events" },
    { href: "/gallery", label: "Gallery" },
  ];

  const programmesLinks = [
    { href: "/programmes", label: "Programmes" },
    { href: "/certifications", label: "Certifications" },
    { href: "/training-leads", label: "Training Leads" },
    { href: "/sectoral-nodal-officers", label: "Sectoral Nodal Officers" },
    { href: "/regulatory-updates", label: "Regulatory Updates" },
  ];

  const supportLinks = [
    { href: "/resources", label: "Resource Center" },
    { href: "/help", label: "Help Center" },
    { href: "/faqs", label: "FAQs" },
    { href: "/contact", label: "Contact Us" },
    { href: "/membership/launching-soon", label: "Membership Application" },
  ];

  return (
    <footer className="bg-brand-dark text-white pt-16 md:pt-24 pb-10">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-10 mb-16">
          
          <div className="md:col-span-4">
             <Image src="/logo.png" alt="ARIFAC" width={140} height={42} className="h-9 w-auto brightness-0 invert mb-6" />
             <p className="text-[15px] text-slate-300 leading-relaxed font-normal max-w-sm mb-8">
               Empowering India&apos;s financial ecosystem through unified compliance standards, expert certification, and strategic regulatory dialogue. 
             </p>
             <div className="flex items-center gap-5">
               <div className="flex items-center gap-3">
                 <Image src="/fiu-logo.png" alt="FIU India" width={28} height={28} className="brightness-0 invert opacity-60" />
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Under Guidance of<br/>FIU-INDIA</span>
               </div>
               <div className="w-px h-8 bg-white/10" />
               <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">An IAMAI Initiative</span>
             </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-[11px] font-bold text-brand-on-dark uppercase tracking-[0.2em] mb-6">Alliance</h4>
            <div className="flex flex-col gap-4 text-[13px] text-slate-300">
              {allianceLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold text-brand-on-dark uppercase tracking-[0.2em] mb-6">Programmes</h4>
            <div className="flex flex-col gap-4 text-[13px] text-slate-300">
              {programmesLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold text-brand-on-dark uppercase tracking-[0.2em] mb-6">Support</h4>
            <div className="flex flex-col gap-4 text-[13px] text-slate-300">
              {supportLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] text-slate-400 font-medium">
          <div className="flex gap-8">
            <Link href="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
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
