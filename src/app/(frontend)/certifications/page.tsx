import configPromise from '@payload-config'
import { getPayload } from 'payload'
import PageBanner from '@/components/PageBanner'
import CertificationsFilter from '@/components/CertificationsFilter'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

export default async function CertificationsPage() {
  const payload = await getPayload({ config: configPromise })

  const [{ docs: certifications }, pageResult] = await Promise.all([
    payload.find({
      collection: 'certifications',
      limit: 100,
      sort: 'order',
      draft: true,
    }),
    payload.find({
      collection: 'pages',
      where: { slug: { equals: 'certifications' } },
      limit: 1,
      draft: true,
    }),
  ])

  const page = pageResult.docs[0]

  return (
    <>
      <RefreshRouteOnSave />
      <PageBanner
        label={page?.banner?.label ?? 'Certifications'}
        title={page?.banner?.title ?? 'Industry Standard Pathways for Financial Crime Readiness'}
        description={page?.banner?.description ?? "Role-based programmes from foundation to specialist level, designed to strengthen compliance across India's financial ecosystem."}
      />
      {certifications.length > 0 ? (
        <CertificationsFilter certifications={certifications} pathwayTiers={page?.pathwayTiers} ui={page?.certificationsUI} />
      ) : null}
    </>
  )
}
