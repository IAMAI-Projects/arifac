import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import StaticPageLayout from '@/components/StaticPageLayout'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

export const metadata: Metadata = {
  title: 'Membership — Engage with ARIFAC\'s Financial Intelligence Ecosystem',
  description: 'Join ARIFAC as a member organisation. Access capacity building programmes, policy consultations, and collaboration opportunities within India\'s AML/CFT reporting entity network.',
  alternates: { canonical: 'https://arifac.com/membership' },
}

export default async function MembershipPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'membership' } },
    limit: 1,
    draft: true,
  })
  const page = result.docs[0]
  if (!page) notFound()

  const benefits = page.benefits ?? []
  const responsibilities = page.responsibilities ?? []
  const validityTerms = page.validityTerms ?? []
  const feeTables = page.feeTables
  const membershipCta = page.membershipCta
  const membershipIntro = page.membershipIntro

  return (
    <>
      <RefreshRouteOnSave />
      <StaticPageLayout
        label={page.banner?.label ?? undefined}
        title={page.banner?.title ?? 'Engagement with ARIFAC'}
        description={page.banner?.description ?? ''}
        subheading={
          membershipIntro?.subheading ? (
            <p className="text-neutral-600 text-[15px] leading-[1.75] max-w-3xl">
              {membershipIntro.subheading}
            </p>
          ) : undefined
        }
        ctaLabel={membershipCta?.label ?? undefined}
        ctaHref={membershipCta?.link ?? undefined}
      >

        {/* What Membership Enables */}
        {benefits.length > 0 && (
          <section className="py-6 lg:py-8 border-b border-neutral-100">
            <div className="max-w-[1240px] mx-auto px-6">
              <div className="mb-5">
                <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-2 block">{page.membershipSections?.benefitsEyebrow || 'What ARIFAC Engagement Enables'}</span>
                <h2 className="text-xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-2">
                  {page.membershipSections?.benefitsHeading || 'Capacity building and collaboration benefits for the financial intelligence ecosystem.'}
                </h2>
                <p className="text-neutral-600 text-[15px] leading-[1.75] max-w-3xl">
                  {page.membershipSections?.benefitsDescription || 'Benefits differ by engagement tier, with enhanced access for Members.'}
                </p>
              </div>

              <div className="space-y-6">
                {benefits.map((group) => (
                  <div key={group.category}>
                    <div className="flex items-center gap-3 mb-3 pb-2 border-b border-neutral-100">
                      <div className="h-1 w-6 bg-brand" />
                      <span className="text-[11px] font-bold text-brand tracking-widest uppercase">
                        {group.category}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {(group.items ?? []).map((item) => (
                        <div key={item.title} className="editorial-card p-4">
                          <h3 className="text-[14px] font-bold text-neutral-900 mb-1">{item.title}</h3>
                          <p className="text-[13px] text-neutral-600 leading-[1.6]">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Responsibilities & Validity side by side */}
        <section className="py-6 lg:py-8 border-b border-neutral-100">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Member Responsibilities */}
              <div>
                <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-2 block">{page.membershipSections?.responsibilitiesEyebrow || 'Obligations'}</span>
                <h2 className="text-xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-3">
                  {page.membershipSections?.responsibilitiesHeading || 'Member / Affiliate Responsibilities'}
                </h2>
                <p className="text-neutral-600 text-[15px] leading-[1.75] mb-4">
                  {page.membershipSections?.responsibilitiesDescription || 'Members are expected to maintain the highest standards of integrity, professionalism, and compliance.'}
                </p>
                <ul className="space-y-2 mb-4">
                  {responsibilities.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-[3px] bg-brand shrink-0" />
                      <span className="text-[14px] text-neutral-700 leading-[1.6]">{item.description}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[13px] text-neutral-500 leading-[1.6] border-l-2 border-brand/20 pl-4">
                  {page.membershipSections?.responsibilitiesDisclaimer || 'Members must not disclose sensitive regulatory or transaction-related information, including Suspicious Transaction Reporting (STR)-related discussions or any confidential compliance data.'}
                </p>
              </div>

              {/* Validity & Renewal */}
              <div>
                <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-2 block">{page.membershipSections?.validityEyebrow || 'Terms'}</span>
                <h2 className="text-xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-3">
                  {page.membershipSections?.validityHeading || 'Validity & Renewal'}
                </h2>
                <ul className="space-y-2">
                  {validityTerms.map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-[3px] bg-brand shrink-0" />
                      <span className="text-[14px] text-neutral-700 leading-[1.6]">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Fees */}
        {feeTables && (
          <section className="py-6 lg:py-8">
            <div className="max-w-[1240px] mx-auto px-6">
              <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-2 block">{page.membershipSections?.feesEyebrow || 'Pricing'}</span>
              <h2 className="text-xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-5">
                {page.membershipSections?.feesHeading || 'Fees'}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 items-start">
                {/* Affiliate */}
                <div className="border border-neutral-200 p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-1 w-6 bg-neutral-300" />
                      <span className="text-[11px] font-bold text-neutral-500 tracking-widest uppercase">Affiliate</span>
                    </div>
                    <span className="text-[13px] font-extrabold text-neutral-900">Free</span>
                  </div>
                  <p className="text-[13px] text-neutral-600 leading-[1.7]">Entry-level access to ARIFAC's platform, forums, and community events. No fee required to get started.</p>
                </div>

                {/* Member — highlighted */}
                <div className="border border-brand p-6 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-brand" />
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-1 w-6 bg-brand" />
                      <span className="text-[11px] font-bold text-brand tracking-widest uppercase">Member</span>
                    </div>
                    <span className="text-[13px] font-extrabold text-neutral-900">Paid</span>
                  </div>
                  <details className="group">
                    <summary className="text-[13px] text-neutral-600 leading-[1.7] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      Full membership with enhanced access to regulatory programmes, certifications, and ARIFAC forums. Fees are tiered by annual turnover or AUM, excl. taxes. {page.membershipSections?.feeScheduleLabel || 'Click here to find out more'}
                    </summary>
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      {feeTables.turnoverBased && feeTables.turnoverBased.length > 0 && (
                        <div>
                          <div className="flex items-center gap-3 mb-3 pb-2 border-b border-neutral-200">
                            <div className="h-1 w-6 bg-brand" />
                            <span className="text-[11px] font-bold text-brand tracking-widest uppercase">{page.membershipSections?.turnoverLabel || 'Turnover-Based'}</span>
                          </div>
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-neutral-200">
                                <th className="text-left text-[11px] font-bold text-neutral-500 uppercase tracking-widest py-2">{page.membershipSections?.turnoverColumnHeader || 'Turnover ₹'}</th>
                                <th className="text-right text-[11px] font-bold text-neutral-500 uppercase tracking-widest py-2">{page.membershipSections?.feeColumnHeader || 'Annual Fee'}</th>
                              </tr>
                            </thead>
                            <tbody className="text-[13px] text-neutral-700">
                              {feeTables.turnoverBased.map((row) => (
                                <tr key={row.tier} className="border-b border-neutral-100">
                                  <td className="py-2">{row.tier}</td>
                                  <td className="py-2 text-right font-medium">{row.fee} {page.membershipSections?.feeSuffix || '+ taxes'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {feeTables.aumBased && feeTables.aumBased.length > 0 && (
                        <div>
                          <div className="flex items-center gap-3 mb-3 pb-2 border-b border-neutral-200">
                            <div className="h-1 w-6 bg-brand" />
                            <span className="text-[11px] font-bold text-brand tracking-widest uppercase">{page.membershipSections?.aumLabel || 'AUM-Based'}</span>
                          </div>
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-neutral-200">
                                <th className="text-left text-[11px] font-bold text-neutral-500 uppercase tracking-widest py-2">{page.membershipSections?.aumColumnHeader || 'AUM ₹'}</th>
                                <th className="text-right text-[11px] font-bold text-neutral-500 uppercase tracking-widest py-2">{page.membershipSections?.feeColumnHeader || 'Annual Fee'}</th>
                              </tr>
                            </thead>
                            <tbody className="text-[13px] text-neutral-700">
                              {feeTables.aumBased.map((row) => (
                                <tr key={row.tier} className="border-b border-neutral-100">
                                  <td className="py-2">{row.tier}</td>
                                  <td className="py-2 text-right font-medium">{row.fee} {page.membershipSections?.feeSuffix || '+ taxes'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </section>
        )}
      </StaticPageLayout>
    </>
  )
}
