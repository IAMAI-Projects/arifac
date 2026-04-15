import configPromise from '@payload-config'
import { getPayload } from 'payload'
import PageBanner from '@/components/PageBanner'
import UpdatesFilter from '@/components/UpdatesFilter'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

export default async function UpdatesPage() {
  const payload = await getPayload({ config: configPromise })

  const [{ docs: updates }, pageResult] = await Promise.all([
    payload.find({
      collection: 'regulatory-updates',
      sort: '-date',
      limit: 100,
      draft: true,
    }),
    payload.find({
      collection: 'pages',
      where: { slug: { equals: 'updates' } },
      limit: 1,
      draft: true,
    }),
  ])

  const page = pageResult.docs[0]

  return (
    <>
      <RefreshRouteOnSave />
      <PageBanner
        label={page?.banner?.label ?? 'Regulatory Updates'}
        title={page?.banner?.title ?? 'Recent Circulars and Notifications'}
        description={page?.banner?.description ?? 'Track important circulars, notifications, advisories, and regulatory updates relevant to reporting entities and the broader financial crime prevention ecosystem.'}
      />
      {updates.length > 0 ? (
        <UpdatesFilter updates={updates} />
      ) : (
        <section className="py-10 lg:py-12 bg-white">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="border border-neutral-200 bg-neutral-50 p-8 text-center text-neutral-600">
              No regulatory updates available at this time.
            </div>
          </div>
        </section>
      )}
    </>
  )
}
