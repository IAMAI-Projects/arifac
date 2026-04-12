import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import type { Page } from '@/payload-types'
import PageBanner from '@/components/PageBanner'
import Link from 'next/link'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
    draft: true,
  })
  const page = result.docs[0] as Page | undefined
  if (!page) notFound()

  const threats = page.whySection?.threats ?? []
  const alignedItems = page.whySection?.alignedWith?.items ?? []
  const focusAreas = page.whatSection?.focusAreas ?? []
  const audiences = page.whoSection?.audiences ?? []

  return (
    <>
      <RefreshRouteOnSave />
      <PageBanner
        label={page.banner?.label || 'About ARIFAC'}
        title={page.banner?.title || page.title}
        description={page.banner?.description || ''}
      />

      {/* Why ARIFAC */}
      <section className="py-12 lg:py-16 bg-white border-b border-neutral-100">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="mb-10 w-full">
            <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-3 block">{page.whySection?.eyebrow || 'The Challenge'}</span>
            <h2 className="text-2xl lg:text-[34px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-4">
              {page.whySection?.heading || 'Why ARIFAC'}
            </h2>
            <p className="text-neutral-600 text-[16px] leading-[1.7]">
              {page.whySection?.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-7 gap-6">
            {/* Threats -- 2 cols */}
            <div className="lg:col-span-2 bg-neutral-50 border border-neutral-200 p-6 lg:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-brand-light" />
              <h3 className="text-[11px] font-bold text-brand uppercase tracking-widest mb-5">Emerging Threats</h3>
              <div className="space-y-3">
                {threats.map((threat) => (
                  <div key={threat.id || threat.label} className="flex items-center gap-3 bg-white p-3 border border-neutral-100 hover:border-brand/30 hover:shadow-sm transition-all">
                    <div className="w-1.5 h-1.5 bg-brand flex-shrink-0" />
                    <span className="text-[12px] font-bold text-neutral-900 uppercase tracking-tight">{threat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Aligned With -- 5 cols */}
            <div className="lg:col-span-5 bg-brand p-8 lg:p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10" />
              <div className="absolute bottom-0 left-0 w-48 h-24 bg-brand/[0.04]" />
              <h3 className="text-[11px] font-bold text-white uppercase tracking-widest mb-5">Aligned With</h3>
              <p className="text-white/80 text-[15px] leading-relaxed mb-6">
                {page.whySection?.alignedWith?.description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                {alignedItems.map((item) => (
                  <div key={item.id || item.value} className="bg-white/[0.05] p-3">
                    <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1.5">{item.label}</div>
                    <div className="text-[13px] font-bold text-white tracking-tight">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What ARIFAC Does */}
      <section className="py-12 lg:py-16 bg-neutral-50 border-b border-neutral-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-10">
            <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-3 block">{page.whatSection?.eyebrow || 'Operational Focus'}</span>
            <h2 className="text-2xl lg:text-[34px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-4">
              {page.whatSection?.heading || 'What ARIFAC Does'}
            </h2>
            <p className="text-neutral-600 text-[16px] leading-[1.7]">
              {page.whatSection?.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {focusAreas.map((item) => (
              <div key={item.id || item.number} className="group relative bg-white border border-neutral-200 p-6 lg:p-8 hover:border-brand/40 hover:shadow-lg transition-all duration-500 overflow-hidden">
                {/* Background number */}
                <div className="absolute top-4 right-6 text-[72px] font-black text-neutral-50 group-hover:text-brand/[0.06] transition-colors pointer-events-none select-none leading-none">
                  {item.number}
                </div>

                <div className="relative z-10">
                  <div className="w-8 h-1 bg-brand mb-4 group-hover:w-12 transition-all duration-500" />
                  <h3 className="text-[18px] font-bold text-neutral-900 mb-4 leading-tight group-hover:text-brand transition-colors">
                    {item.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {(item.points ?? []).map((point, i) => (
                      <li key={point.id || i} className="flex items-start gap-3 text-neutral-600 text-[14px] leading-relaxed">
                        <div className="w-1.5 h-1.5 bg-brand/40 mt-[7px] flex-shrink-0" />
                        {point.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Engage */}
      <section className="py-12 lg:py-16 bg-white border-b border-neutral-100">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: Header + description */}
            <div className="lg:col-span-4">
              <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-3 block">{page.whoSection?.eyebrow || 'Membership'}</span>
              <h2 className="text-2xl lg:text-[34px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-4">
                {page.whoSection?.heading || 'Who Should Engage'}
              </h2>
              <p className="text-neutral-600 text-[15px] leading-relaxed mb-6">
                {page.whoSection?.description}
              </p>
              <Link href={page.whoSection?.ctaLink || '/membership'} className="inline-flex items-center gap-3 bg-brand text-white px-6 py-3 text-[13px] font-bold hover:bg-brand-dark transition-colors group">
                {page.whoSection?.ctaLabel || 'Explore Membership'}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Right: Audience grid */}
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-4">
                {audiences.map((item, idx) => (
                  <div key={item.id || idx} className="group flex gap-4 items-start bg-neutral-50 p-5 border border-neutral-100 hover:bg-white hover:border-brand/30 hover:shadow-sm transition-all">
                    <div className="w-8 h-8 bg-brand/[0.06] group-hover:bg-brand/10 flex items-center justify-center flex-shrink-0 transition-colors">
                      <span className="text-[11px] font-black text-neutral-900/40 group-hover:text-brand transition-colors">0{idx + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-neutral-900 mb-1 group-hover:text-brand transition-colors">{item.name}</h3>
                      <p className="text-neutral-500 text-[12px] leading-relaxed">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
