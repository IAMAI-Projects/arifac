import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlockRenderer from '@/components/BlockRenderer'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) notFound()

  // Fetch latest regulatory updates for the dashboard block
  const updatesResult = await payload.find({
    collection: 'regulatory-updates',
    sort: '-date',
    limit: 5,
  })

  return (
    <div className="min-h-screen bg-white text-neutral-800 font-sans selection:bg-brand selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow">
        {page.layout && page.layout.length > 0 && (
          <BlockRenderer
            blocks={page.layout}
            regulatoryUpdates={updatesResult.docs}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}
