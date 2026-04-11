import Link from "next/link";

export default function CommunitySection() {
  return (
    <section className="py-16 md:py-24 bg-brand text-white overflow-hidden relative">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand opacity-5 skew-x-12 translate-x-1/2" />
      
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <span className="text-[11px] font-bold text-brand-on-dark tracking-widest uppercase mb-4 block">National Network</span>
            <h2 className="text-3xl lg:text-[40px] font-bold !text-white leading-[1.1] mb-6">India&apos;s most authoritative network of compliance leaders.</h2>
            <p className="text-white/80 text-[16px] leading-relaxed mb-10 max-w-xl">
              From Sectoral Nodal Officers to Training Leads across all reporting entities, ARIFAC facilitates the human connections that power financial integrity.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <Link href="/sectoral-nodal-officers" className="group">
                <div className="text-[10px] font-bold text-brand-on-dark uppercase tracking-widest mb-2">Network Hub</div>
                <h4 className="text-[16px] font-bold !text-white group-hover:text-brand-on-dark transition-colors mb-2">Sectoral Nodal Officers</h4>
                <div className="w-6 h-[2px] bg-white group-hover:w-16 transition-all" />
              </Link>
              <Link href="/training-leads" className="group">
                <div className="text-[10px] font-bold text-brand-on-dark uppercase tracking-widest mb-2">Excellence</div>
                <h4 className="text-[16px] font-bold !text-white group-hover:text-brand-on-dark transition-colors mb-2">Training Leads</h4>
                <div className="w-6 h-[2px] bg-white group-hover:w-16 transition-all" />
              </Link>
              <Link href="/gallery" className="group">
                <div className="text-[10px] font-bold text-brand-on-dark uppercase tracking-widest mb-2">Engagement</div>
                <h4 className="text-[16px] font-bold !text-white group-hover:text-brand-on-dark transition-colors mb-2">Event Gallery</h4>
                <div className="w-6 h-[2px] bg-white group-hover:w-16 transition-all" />
              </Link>
              <Link href="/forums" className="group">
                <div className="text-[10px] font-bold text-brand-on-dark uppercase tracking-widest mb-2">Collaboration</div>
                <h4 className="text-[16px] font-bold !text-white group-hover:text-brand-on-dark transition-colors mb-2">Specialized Forums</h4>
                <div className="w-6 h-[2px] bg-white group-hover:w-16 transition-all" />
              </Link>
            </div>
          </div>

          <div className="relative">
             <div className="aspect-square bg-white/5 border border-white/20 p-8 lg:p-12 flex flex-col justify-center">
                <div className="text-[48px] font-bold text-brand-on-dark leading-none mb-4">18+</div>
                <p className="text-[18px] font-medium text-white mb-8">Sectors represented including Banking, Fintech, Insurance, and Capital Markets.</p>
                <Link href="/membership" className="inline-flex items-center gap-3 bg-white text-brand px-8 py-3.5 font-bold text-[13px] hover:bg-brand-dark hover:text-white transition-all">
                  Join the Network
                </Link>
             </div>
             {/* Decorative box */}
             <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-brand-dark hidden md:block" />
          </div>

        </div>
      </div>
    </section>
  );
}
