import configPromise from '@payload-config'
import { getPayload } from 'payload'
import PageBanner from '@/components/PageBanner'
import CertificationsFilter from '@/components/CertificationsFilter'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

export default async function CertificationsPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: certifications } = await payload.find({
    collection: 'certifications',
    limit: 100,
    sort: 'level',
    draft: true,
  })

  return (
    <>
      <RefreshRouteOnSave />
      <PageBanner
        label="Certifications"
        title="Industry Standard Pathways for Financial Crime Readiness"
        description="Role-based programmes from foundation to specialist level, designed to strengthen compliance across India's financial ecosystem."
      />
      {certifications.length > 0 ? (
        <CertificationsFilter certifications={certifications} />
      ) : null}
    </>
  )
}
