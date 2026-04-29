import Image from 'next/image'
import type { Page } from '@/payload-types'

type PartnershipsBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'partnerships' }>

interface PartnershipsProps {
  data: PartnershipsBlockData
}

export default function Partnerships({ data }: PartnershipsProps) {
  return (
    <section className="py-10 md:py-14 bg-neutral-50 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-0 bg-white border border-neutral-100">
          {/* Left: Strategic Guidance */}
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <h2 className="text-xl lg:text-2xl font-extrabold text-neutral-900 leading-tight tracking-tight mb-4">
              {data.guidanceCard?.label ? (
                <>{data.guidanceCard.label.split(' ')[0]} <span className="text-brand">{data.guidanceCard.label.split(' ').slice(1).join(' ')}</span></>
              ) : (
                <>Strategic <span className="text-brand">Guidance</span></>
              )}
            </h2>
            <div className="flex items-center gap-4">
              {data.guidanceCard?.logoUrl && (
                <Image src={data.guidanceCard.logoUrl} alt={data.guidanceCard.title || ''} width={48} height={48} className="h-12 w-auto object-contain flex-shrink-0" />
              )}
              <span className="text-[16px] font-bold text-neutral-900 leading-snug">
                {data.guidanceCard?.title}
              </span>
            </div>
          </div>

          {/* Right: Section Header */}
          <div className="p-6 lg:p-8 border-t md:border-t-0 md:border-l border-neutral-100 flex flex-col justify-center">
            <h2 className="text-xl lg:text-2xl font-extrabold text-neutral-900 leading-tight tracking-tight mb-3">
              {data.heading}
            </h2>
            <p className="text-neutral-500 text-[14px] leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>

        {data.disclaimer && (
          <div className="mt-5 pt-4 border-t border-neutral-200">
            <p className="text-neutral-400 text-[12px] leading-relaxed">
              <span className="font-bold text-neutral-500">Note:</span> {data.disclaimer}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
