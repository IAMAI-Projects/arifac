import Link from "next/link";
import type { Page } from '@/payload-types'

type CommunityBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'community' }>

interface CommunitySectionProps {
  data: CommunityBlockData
}

export default function CommunitySection({ data }: CommunitySectionProps) {
  return (
    <section className="py-16 md:py-24 bg-brand text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand opacity-5 skew-x-12 translate-x-1/2" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <span className="text-[11px] font-bold text-brand-on-dark tracking-widest uppercase mb-4 block">{data.label}</span>
            <h2 className="text-3xl lg:text-[40px] font-bold !text-white leading-[1.1] mb-6">{data.heading}</h2>
            <p className="text-white/80 text-[16px] leading-relaxed mb-10 max-w-xl">
              {data.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {data.links?.map((link, idx) => (
                <Link key={idx} href={link.href} className="group">
                  <div className="text-[10px] font-bold text-brand-on-dark uppercase tracking-widest mb-2">{link.eyebrow}</div>
                  <h4 className="text-[16px] font-bold !text-white group-hover:text-brand-on-dark transition-colors mb-2">{link.title}</h4>
                  <div className="w-6 h-[2px] bg-white group-hover:w-16 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-white/5 border border-white/20 p-8 lg:p-12 flex flex-col justify-center">
              <div className="text-[48px] font-bold text-brand-on-dark leading-none mb-4">{data.stat?.value}</div>
              <p className="text-[18px] font-medium text-white mb-8">{data.stat?.description}</p>
              <Link href={data.ctaLink || '/membership'} className="inline-flex items-center gap-3 bg-white text-brand px-8 py-3.5 font-bold text-[13px] hover:bg-brand-dark hover:text-white transition-all">
                {data.ctaLabel || 'Join the Network'}
              </Link>
            </div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-brand-dark hidden md:block" />
          </div>

        </div>
      </div>
    </section>
  );
}
