import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-white pt-12 pb-10 lg:pt-16 lg:pb-20 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral-50 -z-10 hidden lg:block" />

      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          <div className="lg:col-span-8 animate-in">
            <div className="flex items-center gap-4 mb-6 lg:mb-8">
              <span className="h-px w-12 bg-brand" />
              <span className="text-[12px] lg:text-[13px] font-bold text-brand uppercase tracking-[0.2em]">
                National Alliance for Financial Integrity
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-neutral-900 leading-[1.1] tracking-tight mb-6 lg:mb-8 max-w-4xl">
              Strengthening India&apos;s <span className="text-brand">Financial Integrity</span> <br className="hidden md:block" />
              Through Industry Collaboration
            </h1>
            
            <p className="text-neutral-700 text-[16px] lg:text-[17px] leading-relaxed max-w-3xl mb-8 lg:mb-10">
              ARIFAC (Alliance of Reporting Entities in India for AML/CFT) under the guidance of FIU-IND, enables collaboration, capacity building, and coordinated action to strengthen India&apos;s financial crime prevention ecosystem.
            </p>
            
            <div className="flex flex-wrap gap-5 lg:gap-6 items-center">
              <Link href="/member-benefits" className="bg-brand text-white px-7 py-3.5 lg:px-8 lg:py-4 text-[14px] font-bold hover:bg-brand-dark transition-all flex items-center gap-3 group">
                Membership Benefits
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/certifications" className="text-neutral-900 font-bold text-[14px] border-b-2 border-neutral-900 hover:text-brand hover:border-brand transition-all pb-1">
                Explore Certifications
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 translate-y-0 lg:translate-y-8 hidden lg:block animate-in delay-200">
            <div className="bg-white border border-neutral-200 p-8 lg:p-9 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative">
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-brand/5" />
              
              <div className="flex items-center gap-4 mb-8">
                <Image src="/fiu-logo.png" alt="FIU India" width={48} height={48} className="mix-blend-multiply" />
                <div>
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-none mb-1.5">Under Guidance Of</div>
                  <div className="text-[18px] font-black text-neutral-900 leading-none">FIU-INDIA</div>
                </div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <h4 className="text-[12px] font-bold text-brand uppercase tracking-widest mb-2">Strategic Alignment</h4>
                  <p className="text-neutral-600 text-[14px] leading-relaxed">
                    Operates in complete alignment with India&apos;s Financial Intelligence Unit and FATF global standards.
                  </p>
                </div>
                <div className="pt-6 border-t border-neutral-100">
                  <h4 className="text-[12px] font-bold text-brand uppercase tracking-widest mb-2">Industry Led</h4>
                  <p className="text-neutral-600 text-[14px] leading-relaxed">
                    Driven by the joint action of scheduled banks, fintech pioneers, and regulatory nodal officers.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
