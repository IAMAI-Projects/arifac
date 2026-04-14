import Image from "next/image";
import Link from "next/link";
import type { Page } from '@/payload-types'

type HeroBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

interface HeroProps {
  data: HeroBlockData
}

export default function Hero({ data }: HeroProps) {
  return (
    <section className="relative flex items-center overflow-hidden bg-neutral-50">
      {/* Atmospheric layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100" />
        <div className="absolute inset-0 bg-grid-subtle opacity-[0.5]" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="max-w-[1240px] mx-auto px-6 relative z-10 w-full py-14 lg:py-20">

        {/* Mobile FIU trust line */}
        {data.sideCard && (
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <Image src="/fiu-logo.png" alt="FIU India" width={28} height={28} className="mix-blend-multiply" />
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Under Guidance of FIU-INDIA</span>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Content — left */}
          <div className="lg:col-span-7 animate-in">

            {/* Tagline */}
            <div className="flex items-center gap-3 mb-7 lg:mb-8">
              <span className="w-8 h-[1px] bg-brand/50 flex-shrink-0" />
              <span className="text-[11px] lg:text-[12px] font-bold text-brand uppercase tracking-[0.3em]">
                {data.tagline}
              </span>
            </div>

            {/* Heading — larger, commanding */}
            <h1 className="text-[32px] md:text-[40px] lg:text-[46px] font-extrabold text-neutral-900 leading-[1.1] tracking-tight mb-7 lg:mb-9">
              {data.heading}{' '}
              {data.headingHighlight && (
                <span className="text-brand">
                  {data.headingHighlight}
                </span>
              )}
              {data.headingTrail && (
                <span className="text-neutral-700"> {data.headingTrail}</span>
              )}
            </h1>

            {/* Description */}
            <p className="text-neutral-500 text-[15px] lg:text-[16px] leading-[1.75] max-w-[520px] mb-9 lg:mb-11">
              {data.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              {data.primaryButton && (
                <Link
                  href={data.primaryButton.link}
                  className="bg-brand text-white px-7 py-3.5 lg:px-9 lg:py-4 text-[13px] font-bold hover:bg-[#b91c22] transition-all flex items-center gap-3 group"
                >
                  {data.primaryButton.label}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              )}
              {data.secondaryButton && (
                <Link
                  href={data.secondaryButton.link}
                  className="text-neutral-700 font-bold text-[13px] px-7 py-3.5 lg:px-9 lg:py-4 border border-neutral-300 hover:border-neutral-400 hover:text-neutral-900 transition-all flex items-center gap-2"
                >
                  {data.secondaryButton.label}
                </Link>
              )}
            </div>
          </div>

          {/* Side card — right */}
          {data.sideCard && (
            <div className="lg:col-span-5 hidden lg:block animate-in delay-200">
              <div className="bg-white border border-neutral-200 shadow-sm p-8 lg:p-9 relative">
                {/* Subtle top accent — thin brand line */}
                <div className="absolute top-0 left-0 w-16 h-[2px] bg-brand" />

                {/* FIU badge */}
                <div className="flex items-center gap-4 mb-7">
                  <Image src="/fiu-logo.png" alt="FIU India" width={44} height={44} className="mix-blend-multiply" />
                  <div>
                    <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.25em] leading-none mb-1.5">Under Guidance Of</div>
                    <div className="text-[17px] font-black text-neutral-900 leading-none">FIU-INDIA</div>
                  </div>
                </div>

                <div className="space-y-5">
                  {data.sideCard.strategicAlignmentText && (
                    <div>
                      <h4 className="text-[11px] font-bold text-brand uppercase tracking-[0.2em] mb-2">Strategic Alignment</h4>
                      <p className="text-neutral-600 text-[14px] leading-relaxed">
                        {data.sideCard.strategicAlignmentText}
                      </p>
                    </div>
                  )}
                  {data.sideCard.industryLedText && (
                    <div className="pt-5 border-t border-neutral-100">
                      <h4 className="text-[11px] font-bold text-brand uppercase tracking-[0.2em] mb-2">Industry Led</h4>
                      <p className="text-neutral-600 text-[14px] leading-relaxed">
                        {data.sideCard.industryLedText}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
