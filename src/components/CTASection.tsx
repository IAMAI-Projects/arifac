import Link from "next/link";
import type { Page } from '@/payload-types'

type CTABlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'cta' }>

interface CTASectionProps {
  data: CTABlockData
}

export default function CTASection({ data }: CTASectionProps) {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="bg-brand p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand opacity-10 rounded-full translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold !text-white mb-4">{data.heading}</h2>
            <p className="text-white/80 text-[16px] mb-10 leading-relaxed">
              {data.description}
            </p>
            <div className="flex flex-wrap gap-5">
              {data.primaryButton && (
                <Link href={data.primaryButton.link} className="bg-white text-brand px-8 py-3.5 font-bold text-[13px] hover:bg-brand-dark hover:text-white transition-all">
                  {data.primaryButton.label}
                </Link>
              )}
              {data.secondaryButton?.label && data.secondaryButton?.link && (
                <Link href={data.secondaryButton.link} className="border border-white/20 text-white px-8 py-3.5 font-bold text-[13px] hover:bg-white/10 transition-all">
                  {data.secondaryButton.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
