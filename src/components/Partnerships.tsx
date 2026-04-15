export default function Partnerships() {
  return (
    <section className="py-10 md:py-14 bg-neutral-50 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-0 bg-white border border-neutral-100">
          {/* Left: Strategic Guidance */}
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <h2 className="text-xl lg:text-2xl font-extrabold text-neutral-900 leading-tight tracking-tight mb-4">
              Strategic <span className="text-brand">Guidance</span>
            </h2>
            <div className="flex items-center gap-4">
              <img src="/fiu-logo.png" alt="FIU-IND Logo" className="h-12 w-auto object-contain flex-shrink-0" />
              <span className="text-[16px] font-bold text-neutral-900 leading-snug">
                Financial Intelligence Unit &ndash; India
              </span>
            </div>
          </div>

          {/* Right: Built on shared standards */}
          <div className="p-6 lg:p-8 border-t md:border-t-0 md:border-l border-neutral-100 flex flex-col justify-center">
            <h2 className="text-xl lg:text-2xl font-extrabold text-neutral-900 leading-tight tracking-tight mb-3">
              Built on shared <span className="text-brand">standards</span>
            </h2>
            <p className="text-neutral-500 text-[14px] leading-relaxed">
              ARIFAC unites regulatory bodies, industry stakeholders, legal experts, and academicians to strengthen every dimension of financial compliance.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-5 pt-4 border-t border-neutral-200">
          <p className="text-neutral-400 text-[12px] leading-relaxed">
            <span className="font-bold text-neutral-500">Note:</span> ARIFAC is an industry-led platform and does not grant approvals, licenses, or compliance certifications.
          </p>
        </div>
      </div>
    </section>
  )
}
