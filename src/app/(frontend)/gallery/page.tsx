import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { GalleryItem, GalleryPage as GalleryPageType } from '@/payload-types'
import PageBanner from '@/components/PageBanner'
import GalleryGrid from '@/components/GalleryGrid'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import Link from 'next/link'

export const metadata = {
  title: 'Gallery — ARIFAC Industry Engagements & Events',
  description: 'A visual record of ARIFAC industry engagements, workshops, summits, and working group sessions across India\'s financial crime prevention ecosystem.',
  alternates: { canonical: 'https://arifac.com/gallery' },
}

export default async function GalleryPage() {
  const payload = await getPayload({ config: configPromise })

  const [{ docs: items }, galleryPage] = await Promise.all([
    payload.find({
      collection: 'gallery-items',
      limit: 200,
      sort: 'order',
      depth: 1,
    }),
    payload.findGlobal({ slug: 'gallery-page' }),
  ])

  const about = galleryPage?.aboutSection
  const cta = galleryPage?.ctaSection
  const note = galleryPage?.importantNote

  return (
    <>
      <RefreshRouteOnSave />
      <PageBanner
        label="Visual Archive"
        title="ARIFAC in Action: Industry Engagement"
        description="A visual record of consultations, workshops, summits, and working group sessions across India's financial crime prevention ecosystem."
      />
      <GalleryGrid items={items as GalleryItem[]} />

      {/* Bottom info section */}
      <section className="py-12 lg:py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Left: About card */}
            <div className="bg-white border border-neutral-200 p-8 lg:p-10">
              <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-4 block">About</span>
              <h2 className="text-[22px] lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-4">
                {about?.title || 'About These Engagements'}
              </h2>
              <p className="text-neutral-600 text-[15px] leading-[1.75] mb-8">
                {about?.description}
              </p>
              {(about?.features ?? []).length > 0 && (
                <div className="grid grid-cols-2 gap-6">
                  {(about?.features as { id?: string; label: string; description?: string }[] ?? []).map((f, i) => (
                    <div key={f.id || i}>
                      <div className="w-6 h-[2px] bg-brand mb-3" />
                      <h3 className="text-[14px] font-bold text-neutral-900 mb-1">{f.label}</h3>
                      {f.description && (
                        <p className="text-neutral-500 text-[13px] leading-relaxed">{f.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: CTA card */}
            <div className="p-8 lg:p-10 flex flex-col" style={{ backgroundColor: '#0f172a' }}>
              <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-4 block">Programs</span>
              <h2 className="text-[22px] lg:text-[28px] font-extrabold text-white leading-tight tracking-tight mb-4">
                {cta?.title || 'Explore ARIFAC Programs'}
              </h2>
              <p className="text-white/70 text-[15px] leading-[1.75] mb-10 flex-grow">
                {cta?.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={cta?.primaryButtonLink || '/programmes'}
                  className="inline-flex items-center gap-2 bg-brand text-white text-[13px] font-bold uppercase tracking-widest px-6 py-3 hover:bg-brand/90 transition-colors group"
                >
                  {cta?.primaryButtonLabel || 'Explore Programs'}
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href={cta?.secondaryButtonLink || '/membership'}
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[13px] font-bold uppercase tracking-widest px-6 py-3 hover:bg-white/20 transition-colors"
                >
                  {cta?.secondaryButtonLabel || 'Membership'}
                </Link>
              </div>
            </div>
          </div>

          {/* Important note */}
          {note?.text && (
            <div className="mt-6 flex gap-4 items-start bg-white border border-neutral-200 border-l-4 border-l-brand px-6 py-5">
              <svg className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-[13px] font-bold text-neutral-900 mb-1">{note.title || 'Important Note'}</p>
                <p className="text-neutral-600 text-[13px] leading-relaxed">{note.text}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
