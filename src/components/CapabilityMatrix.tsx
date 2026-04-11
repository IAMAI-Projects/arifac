import Link from "next/link";

export default function CapabilityMatrix() {
  const mandates = [
    {
      label: "Institutional Alliance",
      title: "National Industry Ecosystem",
      description: "ARIFAC serves as the unified industry platform, bridging the gap between reporting entities, fintech pioneers, and regulatory nodal officers.",
      linkText: "Our Mission",
      linkRef: "/about"
    },
    {
      label: "Regulatory Intelligence",
      title: "Strategic Actionable Insights",
      description: "We translate complex global mandates and FIU-India circulars into tactical compliance frameworks for institutional readiness.",
      linkText: "View Intelligence",
      linkRef: "/regulatory-updates"
    },
    {
      label: "Operational Excellence",
      title: "Capability & Skill Building",
      description: "Specialized training pathways designed to standardise AML/CFT literacy and enhance the investigative capabilities of compliance professionals.",
      linkText: "Explore Training",
      linkRef: "/certifications"
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-slate-50 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-[42px] font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
            The ARIFAC Mandate: <span className="text-brand">Securing India&apos;s Financial Sovereignty.</span>
          </h2>
          <p className="text-slate-600 text-[16px] lg:text-[18px] leading-relaxed">
            As a national alliance, ARIFAC operates through three strategic channels to strengthen the integrity of India&apos;s financial ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {mandates.map((item, idx) => (
            <div key={idx} className="group relative flex flex-col h-full bg-white p-6 lg:p-8 border border-slate-100 hover:border-brand/40 hover:shadow-xl transition-all duration-500">
              {/* Numbering as background accent */}
              <div className="absolute top-6 right-8 text-5xl font-black text-slate-100 group-hover:text-brand/5 transition-colors pointer-events-none select-none">
                0{idx + 1}
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-4 block">
                  {item.label}
                </span>
                
                <h3 className="text-[20px] font-bold text-slate-900 mb-5 leading-tight group-hover:text-brand transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-600 text-[15px] leading-relaxed mb-8 flex-grow">
                  {item.description}
                </p>
                
                <Link href={item.linkRef} className="inline-flex items-center gap-2 text-slate-900 font-bold text-[12px] uppercase tracking-widest hover:gap-3 transition-all group-hover:text-brand">
                  {item.linkText}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
