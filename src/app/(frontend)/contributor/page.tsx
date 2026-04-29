import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import StaticPageLayout from '@/components/StaticPageLayout'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

export const metadata: Metadata = {
  title: 'Become a Contributor — Share AML/CFT Expertise | ARIFAC',
  description: 'Contribute your expertise to ARIFAC\'s knowledge-building mission. Support curriculum development, training delivery, and policy consultation across India\'s financial intelligence network.',
  alternates: { canonical: 'https://arifac.com/contributor' },
}
import ContributorForm from './ContributorForm'

export default async function ContributorPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contributor' } },
    limit: 1,
    draft: true,
  })
  const page = result.docs[0]
  if (!page) notFound()

  const expertiseAreas = page.expertiseAreas ?? []
  const whyContribute = page.whyContribute

  return (
    <>
      <RefreshRouteOnSave />
      <StaticPageLayout
        label={page.banner?.label ?? undefined}
        title={page.banner?.title ?? 'Become a Contributor'}
        description={page.banner?.description ?? ''}
      >
        <ContributorForm
          expertiseAreas={expertiseAreas.map((a) => a.label)}
          whyContribute={whyContribute}
          formLabels={page.contributorFormLabels}
        />
      </StaticPageLayout>
    </>
  )
}
