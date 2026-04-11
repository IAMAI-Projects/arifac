import Link from "next/link";

const updates = [
  {
    date: "Jan 4, 2026",
    title: "Regional Rural Banks – Know Your Customer Directions, 2025",
    ref: "DOR.AML.REC.No.185/14.01.004/2025-26",
    category: "KYC / Customer Due Diligence"
  },
  {
    date: "Nov 28, 2025",
    title: "Commercial Banks – Know Your Customer Directions, 2025",
    ref: "DOR.AML.REC.No.88/14.01.002/2025-26",
    category: "KYC / Customer Due Diligence"
  },
  {
    date: "Nov 28, 2025",
    title: "Small Finance Banks – Know Your Customer Directions, 2025",
    ref: "DOR.AML.REC.No.119/14.01.007/2025-26",
    category: "KYC / Customer Due Diligence"
  }
];

export default function RegulatoryDashboard() {
  return (
    <section className="py-12 md:py-16 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          
          <div className="lg:col-span-4">
            <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-4 block">Regulatory Intelligence</span>
            <h2 className="text-3xl lg:text-[32px] font-bold text-neutral-900 leading-tight mb-4">Stay Ahead of Evolving Frameworks</h2>
            <p className="text-neutral-700 text-[15px] leading-relaxed mb-8">
              ARIFAC centralizes critical updates from FIU-IND, RBI, SEBI, and IRDAI to ensure your reporting systems are always in sync with national mandates.
            </p>
            <Link href="/regulatory-updates" className="inline-flex items-center gap-4 bg-neutral-900 text-white px-7 py-3.5 text-[13px] font-bold hover:bg-brand transition-colors">
              Access Full Archive
            </Link>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            {updates.map((update, idx) => (
              <div key={idx} className="flex flex-col p-5 lg:p-6 border border-neutral-100 rounded-xl hover:border-brand/30 hover:shadow-sm transition-all group bg-white">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-brand-subtle text-brand text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">RBI</span>
                  <span className="bg-neutral-100 text-neutral-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{update.category}</span>
                  <span className="text-[11px] text-neutral-400 font-medium ml-1">{update.date}</span>
                </div>
                
                <div className="flex justify-between items-start gap-6">
                  <div className="flex-grow">
                    <h3 className="text-[17px] font-bold text-neutral-900 group-hover:text-brand transition-colors leading-snug mb-2">{update.title}</h3>
                    <p className="text-[12px] font-medium text-neutral-400 font-mono tracking-tight">{update.ref}</p>
                  </div>
                  <Link href="#" className="flex-shrink-0 flex items-center gap-2 text-[11px] font-bold border border-neutral-200 px-4 py-2 rounded-lg hover:border-brand hover:text-brand transition-all whitespace-nowrap group/btn">
                    View Circular
                    <svg className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
