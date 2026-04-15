export default function Partnerships() {
  return (
    <section className="pt-4 pb-16 md:pt-6 md:pb-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end mb-16">
          {/* Left: Section Header */}
          <div>
            <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-4 block">
              Partnerships
            </span>
            <h2 className="text-3xl lg:text-[42px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-6">
              Built on shared standards
            </h2>
            <p className="text-neutral-600 text-[16px] lg:text-[18px] leading-relaxed">
              ARIFAC unites regulatory bodies, industry stakeholders, legal experts, and academicians to strengthen every dimension of financial compliance.
            </p>
          </div>

          {/* Right: Strategic Guidance */}
          <div className="group relative bg-white p-8 lg:p-10 border border-neutral-100 hover:border-brand/40 hover:shadow-xl transition-all duration-500">
            <div className="absolute top-6 right-8 text-5xl font-black text-neutral-100 group-hover:text-brand/5 transition-colors pointer-events-none select-none">
              01
            </div>
            <div className="relative z-10">
              <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-4 block">
                Strategic Guidance
              </span>
              <h3 className="text-[20px] font-bold text-neutral-900 leading-tight group-hover:text-brand transition-colors">
                Financial Intelligence Unit &ndash; India (FIU-IND)
              </h3>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-neutral-200 pt-6">
          <p className="text-neutral-400 text-[13px] leading-relaxed">
            <span className="font-bold text-neutral-500">Note:</span> ARIFAC is an industry-led platform and does not grant approvals, licenses, or compliance certifications.
          </p>
        </div>
      </div>
    </section>
  )
}
