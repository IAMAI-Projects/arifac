import StaticPageLayout from '@/components/StaticPageLayout'

const benefits = [
  {
    category: 'Engagement & Governance',
    items: [
      { title: 'Regulatory Engagement', desc: 'Direct participation in consultations, policy dialogues, and expert forums alongside regulators and policymakers.' },
      { title: 'Governance Participation', desc: 'Full voting rights within ARIFAC — eligible to elect and be elected to the Steering Committee and Working Groups.' },
      { title: 'Closed-Door Interactions', desc: 'Exclusive access to policy and regulatory closed-room sessions, structured by domain.' },
    ],
  },
  {
    category: 'Learning & Capacity',
    items: [
      { title: 'Training & Certification', desc: 'Access to L1–L5 certification programmes at preferential member pricing.' },
      { title: 'Workshops & Masterclasses', desc: 'Full access to advanced sessions led by practitioners and subject matter experts.' },
      { title: 'Webinars & Awareness', desc: 'Unrestricted access to all webinars and awareness sessions.' },
    ],
  },
  {
    category: 'Intelligence & Research',
    items: [
      { title: 'Knowledge & Intelligence', desc: 'Comprehensive access to typologies, case studies, learnings, and risk intelligence curated for the industry.' },
      { title: 'Typology & Risk Alerts', desc: 'Real-time FIU-driven insights and alerts to stay ahead of emerging risks.' },
      { title: 'Reports', desc: 'Full access to all ARIFAC published reports.' },
      { title: 'Participation in Reports', desc: 'Preferential inclusion in whitepapers, industry reports, and key ecosystem initiatives.' },
    ],
  },
  {
    category: 'Ecosystem & Visibility',
    items: [
      { title: 'Events & Summits', desc: 'Participation and speaking opportunities at ARIFAC, IAMAI, PCI and FCC-organised summits (e.g. N-SAFE and GFF).' },
      { title: 'Ecosystem Directory', desc: 'Full access to the directory of member institutions and certified professionals.' },
      { title: 'Brand Visibility', desc: 'Recognised as an ARIFAC Member across the website and all publications.' },
    ],
  },
]

const responsibilities = [
  'Maintain confidentiality of discussions and shared information',
  'Ensure compliance with applicable AML/CFT laws and regulatory obligations',
  'Avoid misuse of ARIFAC platforms, forums, or affiliation',
  'Act in good faith and contribute constructively to industry discussions',
]

export default function MembershipPage() {
  return (
    <StaticPageLayout
      title="Engagement with ARIFAC"
      description="Engagement is structured to enable reporting entities and ecosystem stakeholders to actively participate in consultations, strengthen capacity, and contribute to knowledge-sharing initiatives aligned with AML/CFT frameworks."
      subheading={
        <>
          <p className="mb-2">ARIFAC offers two engagement pathways:</p>
          <ul className="space-y-1">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-[3px] bg-brand shrink-0" />
              <span><strong className="text-neutral-900">Membership (Paid):</strong> Comprehensive access to programmes, certifications, consultations, and ecosystem initiatives.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-[3px] bg-brand shrink-0" />
              <span><strong className="text-neutral-900">Affiliate (Free):</strong> Entry-level access to ARIFAC updates, selected resources, and broader ecosystem participation.</span>
            </li>
          </ul>
        </>
      }
      ctaLabel="Apply to be a Member / Affliate"
      ctaHref="https://stage.member.arifac.com/"
    >
     

      {/* What Membership Enables */}
      <section className="py-6 lg:py-8 border-b border-neutral-100">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="mb-5">
            <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-2 block">What ARIFAC Engagement Enables</span>
            <h2 className="text-xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-2">
             Capacity building and collaboration benefits for the financial intelligence ecosystem. </h2>
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
                  {group.items.map((item) => (
                    <div key={item.title} className="editorial-card p-4">
                      <h3 className="text-[14px] font-bold text-neutral-900 mb-1">{item.title}</h3>
                      <p className="text-[13px] text-neutral-600 leading-[1.6]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-[3px] bg-brand shrink-0" />
                    <span className="text-[14px] text-neutral-700 leading-[1.6]">{item}</span>
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
                Validity & Renewal
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-[3px] bg-brand shrink-0" />
                  <span className="text-[14px] text-neutral-700 leading-[1.6]">Membership is valid for a year from the date of onboarding and will be renewed annually</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-[3px] bg-brand shrink-0" />
                  <span className="text-[14px] text-neutral-700 leading-[1.6]">Membership is subject to renewal in accordance with ARIFAC policies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-[3px] bg-brand shrink-0" />
                  <span className="text-[14px] text-neutral-700 leading-[1.6]">Access may be restricted upon expiry until renewal is completed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fees */}
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
              <div>
                <div className="flex items-center gap-3 mb-3 pb-2 border-b border-neutral-100">
                  <div className="h-1 w-6 bg-brand" />
                  <span className="text-[11px] font-bold text-brand tracking-widest uppercase">Turnover-Based</span>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left text-[11px] font-bold text-neutral-500 uppercase tracking-widest py-2">Turnover &#8377;</th>
                      <th className="text-right text-[11px] font-bold text-neutral-500 uppercase tracking-widest py-2">Annual Fee</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-neutral-700">
                    <tr className="border-b border-neutral-100"><td className="py-2">Up to 5 Cr</td><td className="py-2 text-right font-medium">&#8377;25,000 + taxes</td></tr>
                    <tr className="border-b border-neutral-100"><td className="py-2">5–25 Cr</td><td className="py-2 text-right font-medium">&#8377;50,000 + taxes</td></tr>
                    <tr className="border-b border-neutral-100"><td className="py-2">25–100 Cr</td><td className="py-2 text-right font-medium">&#8377;1,00,000 + taxes</td></tr>
                    <tr className="border-b border-neutral-100"><td className="py-2">100–500 Cr</td><td className="py-2 text-right font-medium">&#8377;1,50,000 + taxes</td></tr>
                    <tr className="border-b border-neutral-100"><td className="py-2">500–2,000 Cr</td><td className="py-2 text-right font-medium">&#8377;3,00,000 + taxes</td></tr>
                    <tr><td className="py-2">Above 2,000 Cr</td><td className="py-2 text-right font-medium">&#8377;5,00,000 + taxes</td></tr>
                  </tbody>
                </table>
              </div>

              {/* AUM Table */}
              <div>
                <div className="flex items-center gap-3 mb-3 pb-2 border-b border-neutral-100">
                  <div className="h-1 w-6 bg-brand" />
                  <span className="text-[11px] font-bold text-brand tracking-widest uppercase">AUM-Based</span>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left text-[11px] font-bold text-neutral-500 uppercase tracking-widest py-2">AUM &#8377;</th>
                      <th className="text-right text-[11px] font-bold text-neutral-500 uppercase tracking-widest py-2">Annual Fee</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-neutral-700">
                    <tr className="border-b border-neutral-100"><td className="py-2">Up to 500 Cr</td><td className="py-2 text-right font-medium">&#8377;25,000 + taxes</td></tr>
                    <tr className="border-b border-neutral-100"><td className="py-2">500–1,000 Cr</td><td className="py-2 text-right font-medium">&#8377;50,000 + taxes</td></tr>
                    <tr className="border-b border-neutral-100"><td className="py-2">1,000–10,000 Cr</td><td className="py-2 text-right font-medium">&#8377;1,00,000 + taxes</td></tr>
                    <tr className="border-b border-neutral-100"><td className="py-2">10,000–50,000 Cr</td><td className="py-2 text-right font-medium">&#8377;1,50,000 + taxes</td></tr>
                    <tr className="border-b border-neutral-100"><td className="py-2">50,000–1,00,000 Cr</td><td className="py-2 text-right font-medium">&#8377;3,00,000 + taxes</td></tr>
                    <tr><td className="py-2">Above 1,00,000 Cr</td><td className="py-2 text-right font-medium">&#8377;5,00,000 + taxes</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </StaticPageLayout>
  )
}
