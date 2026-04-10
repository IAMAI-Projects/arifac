import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 md:pt-24 pb-10">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          <div className="md:col-span-5">
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
          
          <div className="md:col-span-2 md:col-start-8">
            <h4 className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-6">Alliance</h4>
            <div className="flex flex-col gap-4 text-[13px] text-slate-300">
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/member-benefits" className="hover:text-white transition-colors">Member Benefits</Link>
              <Link href="/resources" className="hover:text-white transition-colors">Resource Center</Link>
              <Link href="/meetings" className="hover:text-white transition-colors">Meetings & Events</Link>
              <Link href="/governance" className="hover:text-white transition-colors">Governance</Link>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-6">Resources</h4>
            <div className="flex flex-col gap-4 text-[13px] text-slate-300">
              <Link href="/regulatory-updates" className="hover:text-white transition-colors">Regulatory Updates</Link>
              <Link href="/training" className="hover:text-white transition-colors">Training Programs</Link>
              <Link href="/certifications" className="hover:text-white transition-colors">Certifications</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              <Link href="/faqs" className="hover:text-white transition-colors">Help & FAQ</Link>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] text-slate-400 font-medium">
          <div className="flex gap-8">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/legal" className="hover:text-white transition-colors">Legal & Compliance</Link>
          </div>
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} ARIFAC | IAMAI. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
