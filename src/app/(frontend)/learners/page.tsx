import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import StaticPageLayout from '@/components/StaticPageLayout'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

export default async function LearnersPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'learners' } },
    limit: 1,
    draft: true,
  })
  const page = result.docs[0]
  if (!page) notFound()

  const accessItems = page.accessItems ?? []
  const learnersCta = page.learnersCta

  return (
    <>
      <RefreshRouteOnSave />
      <StaticPageLayout
        label={page.banner?.label ?? undefined}
        title={page.banner?.title ?? 'Register with ARIFAC'}
        description={page.banner?.description ?? ''}
      >
        {/* What You Get Access To */}
        {accessItems.length > 0 && (
          <section className="py-6 lg:py-8 border-b border-neutral-100">
            <div className="max-w-[1240px] mx-auto px-6">
              <div className="mb-5">
                <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-2 block">Access</span>
                <h2 className="text-xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-2">
                  Building a foundation for you to learn, engage, and grow
                </h2>
                <p className="text-neutral-600 text-[15px] leading-[1.75] max-w-3xl">
                  Via access to:
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accessItems.map((item) => (
                  <div key={item.title} className="editorial-card p-4">
                    <h3 className="text-[14px] font-bold text-neutral-900 mb-1">{item.title}</h3>
                    <p className="text-[13px] text-neutral-600 leading-[1.6]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Free Registration CTA */}
        {learnersCta?.heading && (
          <section className="py-6 lg:py-8">
            <div className="max-w-[1240px] mx-auto px-6">
              <div className="editorial-card p-6 lg:p-8 bg-brand/[0.03] border-brand/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-1 w-6 bg-brand" />
                  <span className="text-[11px] font-bold text-brand tracking-widest uppercase">Open &amp; Free</span>
                </div>
                <h2 className="text-xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-2">
                  {learnersCta.heading}
                </h2>
                {learnersCta.description && (
                  <p className="text-neutral-600 text-[15px] leading-[1.75] max-w-3xl">
                    {learnersCta.description}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </StaticPageLayout>
    </>
  )
}
