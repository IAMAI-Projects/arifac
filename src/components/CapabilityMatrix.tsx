import Link from "next/link";
import type { Page } from '@/payload-types'

type CapabilityMatrixBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'capabilityMatrix' }>

interface CapabilityMatrixProps {
  data: CapabilityMatrixBlockData
}

export default function CapabilityMatrix({ data }: CapabilityMatrixProps) {
  return (
    <section className="py-12 lg:py-16 bg-neutral-50 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">

        {/* Section Header */}
        <div className="max-w-3xl mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-[42px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-6">
            {data.sectionHeading}{data.sectionHeadingHighlight && <>: <span className="text-brand">{data.sectionHeadingHighlight}</span></>}
          </h2>
          {data.sectionDescription && (
            <p className="text-neutral-600 text-[16px] lg:text-[18px] leading-relaxed">
              {data.sectionDescription}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {data.mandates.map((item, idx) => (
            <div key={idx} className="group relative flex flex-col h-full bg-white p-6 lg:p-8 border border-neutral-100 hover:border-brand/40 hover:shadow-xl transition-all duration-500">
              {/* Numbering as background accent */}
              <div className="absolute top-6 right-8 text-5xl font-black text-neutral-100 group-hover:text-brand/5 transition-colors pointer-events-none select-none">
                0{idx + 1}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-4 block">
                  {item.label}
                </span>

                <h3 className="text-[20px] font-bold text-neutral-900 mb-5 leading-tight group-hover:text-brand transition-colors">
                  {item.title}
                </h3>

                <p className="text-neutral-600 text-[15px] leading-relaxed mb-8 flex-grow">
                  {item.description}
                </p>

                <Link href={item.linkRef} className="inline-flex items-center gap-2 text-neutral-900 font-bold text-[12px] uppercase tracking-widest hover:gap-3 transition-all group-hover:text-brand">
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
