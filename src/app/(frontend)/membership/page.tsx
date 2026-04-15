import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import StaticPageLayout from '@/components/StaticPageLayout'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

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
                <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-2 block">What ARIFAC Engagement Enables</span>
                <h2 className="text-xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-2">
                  Capacity building and collaboration benefits for the financial intelligence ecosystem.
                </h2>
                <p className="text-neutral-600 text-[15px] leading-[1.75] max-w-3xl">
                  Benefits differ by engagement tier, with enhanced access for Members.
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
                <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-2 block">Obligations</span>
                <h2 className="text-xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-3">
                  Member / Affliate Responsibilities
                </h2>
                <p className="text-neutral-600 text-[15px] leading-[1.75] mb-4">
                  Members are expected to maintain the highest standards of integrity, professionalism, and compliance.
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
                  Members must not disclose sensitive regulatory or transaction-related information, including Suspicious Transaction Reporting (STR)-related discussions or any confidential compliance data.
                </p>
              </div>

              {/* Validity & Renewal */}
              <div>
                <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-2 block">Terms</span>
                <h2 className="text-xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-3">
                  Validity &amp; Renewal
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
              <div>
                <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-2 block">Pricing</span>
                <h2 className="text-xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-3">
                  Fees
                </h2>
                <p className="text-neutral-600 text-[15px] leading-[1.75] mb-5 max-w-3xl">
                  Membership fees are determined by your organisation&apos;s self-declared annual turnover or Assets Under Management (AUM), as applicable. All fees are exclusive of taxes and subject to revision.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Turnover Table */}
                  {feeTables.turnoverBased && feeTables.turnoverBased.length > 0 && (
                    <details className="group">
                      <summary className="flex items-center gap-3 mb-3 pb-2 border-b border-neutral-100 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <div className="h-1 w-6 bg-brand" />
                        <span className="text-[11px] font-bold text-brand tracking-widest uppercase">Turnover-Based</span>
                        <svg className="w-3.5 h-3.5 text-neutral-400 ml-auto transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-neutral-200">
                            <th className="text-left text-[11px] font-bold text-neutral-500 uppercase tracking-widest py-2">Turnover &#8377;</th>
                            <th className="text-right text-[11px] font-bold text-neutral-500 uppercase tracking-widest py-2">Annual Fee</th>
                          </tr>
                        </thead>
                        <tbody className="text-[13px] text-neutral-700">
                          {feeTables.turnoverBased.map((row) => (
                            <tr key={row.tier} className="border-b border-neutral-100">
                              <td className="py-2">{row.tier}</td>
                              <td className="py-2 text-right font-medium">{row.fee} + taxes</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </details>
                  )}

                  {/* AUM Table */}
                  {feeTables.aumBased && feeTables.aumBased.length > 0 && (
                    <details className="group">
                      <summary className="flex items-center gap-3 mb-3 pb-2 border-b border-neutral-100 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <div className="h-1 w-6 bg-brand" />
                        <span className="text-[11px] font-bold text-brand tracking-widest uppercase">AUM-Based</span>
                        <svg className="w-3.5 h-3.5 text-neutral-400 ml-auto transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-neutral-200">
                            <th className="text-left text-[11px] font-bold text-neutral-500 uppercase tracking-widest py-2">AUM &#8377;</th>
                            <th className="text-right text-[11px] font-bold text-neutral-500 uppercase tracking-widest py-2">Annual Fee</th>
                          </tr>
                        </thead>
                        <tbody className="text-[13px] text-neutral-700">
                          {feeTables.aumBased.map((row) => (
                            <tr key={row.tier} className="border-b border-neutral-100">
                              <td className="py-2">{row.tier}</td>
                              <td className="py-2 text-right font-medium">{row.fee} + taxes</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </details>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </StaticPageLayout>
    </>
  )
}
