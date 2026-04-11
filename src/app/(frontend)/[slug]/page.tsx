import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import StaticPageLayout from '@/components/StaticPageLayout'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    where: { pageType: { not_equals: 'home' } },
    limit: 100,
    select: { slug: true },
  })
  return result.docs.map((page) => ({ slug: page.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) notFound()

  return (
    <StaticPageLayout
      label={page.banner?.label || ''}
      title={page.banner?.title || page.title}
      description={page.banner?.description || ''}
    >
      {page.body && (
        <section className="py-10 lg:py-14">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="max-w-3xl prose prose-neutral">
              <RichText data={page.body as unknown as SerializedEditorState} />
            </div>
          </div>
        </section>
      )}
    </StaticPageLayout>
  )
}
