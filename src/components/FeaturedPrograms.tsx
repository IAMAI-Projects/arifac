import Image from "next/image";
import Link from "next/link";
import type { Page } from '@/payload-types'

type FeaturedProgramsBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'featuredPrograms' }>

interface FeaturedProgramsProps {
  data: FeaturedProgramsBlockData
}

export default function FeaturedPrograms({ data }: FeaturedProgramsProps) {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div className="max-w-xl">
            {data.sectionEyebrow && (
              <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-3 block">{data.sectionEyebrow}</span>
            )}
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight">{data.sectionHeading}</h2>
            {data.sectionDescription && (
              <p className="text-neutral-700 text-[15px] mt-4 leading-relaxed">
                {data.sectionDescription}
              </p>
            )}
          </div>
          {data.viewAllText && data.viewAllLink && (
            <Link href={data.viewAllLink} className="text-neutral-900 font-bold border-b-2 border-brand pb-0.5 text-[13px] hover:text-brand transition-colors uppercase tracking-widest">
              {data.viewAllText}
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {data.programs.map((program, idx) => (
            <div key={idx} className="bg-white border border-neutral-200 hover:border-brand transition-all group flex flex-col h-full overflow-hidden">
              <div className="aspect-[16/10] bg-white relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-brand opacity-0 group-hover:opacity-[0.02] transition-opacity z-10" />
                {program.image && (program.image.startsWith('/') || program.image.startsWith('http')) ? (
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    {...(idx === 0 ? { loading: "eager" as const } : {})}
                  />
                ) : (
                  <div className="absolute inset-0 bg-neutral-100" />
                )}
              </div>
              <div className="p-6 lg:p-8 flex flex-col flex-grow">
                <span className="text-[10px] font-bold text-brand uppercase tracking-widest mb-2 block">{program.category}</span>
                <h3 className="text-[18px] font-bold text-neutral-900 mb-3 group-hover:text-brand transition-colors leading-snug">{program.title}</h3>
                <p className="text-neutral-600 text-[14px] leading-relaxed mb-6 flex-grow">{program.description}</p>
                <Link href={program.link} className="inline-flex items-center gap-2 text-[11px] font-bold text-neutral-900 uppercase tracking-widest hover:text-brand transition-colors">
                  {data.courseDetailsLabel || 'Course Details'}
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
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
