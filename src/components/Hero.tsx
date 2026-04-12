import Image from "next/image";
import Link from "next/link";
import type { Page } from '@/payload-types'

type HeroBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

interface HeroProps {
  data: HeroBlockData
}

export default function Hero({ data }: HeroProps) {
  return (
    <section className="relative bg-white min-h-[420px] flex items-center overflow-hidden py-12 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-6 relative z-10 w-full">

        {/* Mobile FIU trust line */}
        {data.sideCard && (
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <Image src="/fiu-logo.png" alt="FIU India" width={28} height={28} className="mix-blend-multiply" />
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Under Guidance of FIU-INDIA</span>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Content — left */}
          <div className="lg:col-span-7 animate-in">

            {/* Tagline */}
            <div className="flex items-center gap-3 mb-7 lg:mb-9">
              <span className="w-2 h-[2px] bg-brand flex-shrink-0" />
              <span className="text-[11px] lg:text-[12px] font-bold text-brand uppercase tracking-[0.25em]">
                {data.tagline}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[28px] md:text-[32px] lg:text-[36px] font-extrabold text-neutral-900 leading-[1.12] tracking-tight mb-7 lg:mb-9">
              {data.heading}{' '}
              {data.headingHighlight && (
                <span className="text-brand underline decoration-brand/30 underline-offset-4 decoration-[3px]">
                  {data.headingHighlight}
                </span>
              )}
              {data.headingTrail && (
                <> {data.headingTrail}</>
              )}
            </h1>

            {/* Description */}
            <p className="text-neutral-600 text-[15px] lg:text-[16px] leading-[1.7] max-w-[540px] mb-9 lg:mb-11">
              {data.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              {data.primaryButton && (
                <Link
                  href={data.primaryButton.link}
                  className="bg-brand text-white px-7 py-3.5 lg:px-8 lg:py-4 text-[13px] font-bold hover:bg-[#a8191e] transition-colors flex items-center gap-3 group"
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
                  className="text-brand font-bold text-[13px] px-7 py-3.5 lg:px-8 lg:py-4 border border-brand/30 hover:bg-brand/[0.04] transition-colors flex items-center gap-2"
                >
                  {data.secondaryButton.label}
                </Link>
              )}
            </div>
          </div>

          {/* Side card — right */}
          {data.sideCard && (
            <div className="lg:col-span-5 hidden lg:block animate-in delay-200">
              <div className="bg-neutral-50 border border-neutral-200 p-8 lg:p-9 relative">
                {/* Red gradient top border */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand via-brand-light to-transparent" />

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
                    <div className="pt-5 border-t border-neutral-200">
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
