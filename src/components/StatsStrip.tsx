import type { Page } from '@/payload-types'

type StatsBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'stats' }>

interface StatsStripProps {
  data: StatsBlockData
}

export default function StatsStrip({ data }: StatsStripProps) {
  return (
    <section className="bg-[#0f172a] border-y border-brand/20 py-12 relative overflow-hidden">
      {/* Texture Layer */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-subtle opacity-[0.03] pointer-events-none" />
      
      {/* Accent Glow */}
      <div className="absolute -left-20 top-0 w-64 h-64 bg-brand/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-48 h-48 bg-brand/5 blur-[60px] rounded-full pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
          {data.stats.map((stat, idx) => (
            <div key={idx} className="text-center md:text-left group">
              <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                <span className="h-px w-4 bg-brand/40 group-hover:w-8 transition-all duration-300" />
                <div className="text-4xl lg:text-[42px] font-black text-white tracking-tighter transition-transform group-hover:translate-x-1 duration-300">
                  {stat.value}
                </div>
              </div>
              <div className="text-[10px] lg:text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em] pl-7">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
