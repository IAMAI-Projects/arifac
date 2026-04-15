import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import StaticPageLayout from '@/components/StaticPageLayout'
import RichText from '@/components/RichText'

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'legal-pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) notFound()

  return (
    <StaticPageLayout
      title={page.title}
      description=""
      label="Legal Documentation"
    >
      <div className="max-w-4xl mx-auto">
        {page.sections?.map((section, idx) => (
          <div key={idx} className="mb-10">
            <h2 className="text-[18px] font-bold text-neutral-900 mb-4">{section.title}</h2>
            <div className="text-neutral-600 text-[15px] leading-relaxed">
              <RichText data={section.body} />
            </div>
          </div>
        ))}

        {page.acknowledgment?.heading && (
          <div className="mt-16 pt-8 border-t border-neutral-200">
            <h2 className="text-[18px] font-bold text-neutral-900 mb-4">{page.acknowledgment.heading}</h2>
            <div className="text-neutral-600 text-[15px] leading-relaxed">
              <RichText data={page.acknowledgment.body} />
            </div>
          </div>
        )}

        {page.contactEmail && (
          <div className="mt-8 text-neutral-500 text-[13px]">
            For questions, contact: <a href={`mailto:${page.contactEmail}`} className="text-brand hover:underline">{page.contactEmail}</a>
          </div>
        )}
      </div>
    </StaticPageLayout>
  )
}
