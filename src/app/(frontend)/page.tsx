import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import BlockRenderer from '@/components/BlockRenderer'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    draft: true,
  })

  const page = result.docs[0]
  if (!page) notFound()

  // Fetch latest regulatory updates for the dashboard block
  const updatesResult = await payload.find({
    collection: 'regulatory-updates',
    sort: '-date',
    limit: 3,
    draft: true,
  })

  return (
    <>
      <RefreshRouteOnSave />
      {page.layout && page.layout.length > 0 && (
        <BlockRenderer
          blocks={page.layout.filter(block => block.blockType !== 'featuredPrograms' && block.blockType !== 'stats')}
          regulatoryUpdates={updatesResult.docs}
        />
      )}
    </>
  )
}
