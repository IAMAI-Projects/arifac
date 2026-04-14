import StaticPageLayout from '@/components/StaticPageLayout'

const accessItems = [
  {
    title: 'Knowledge & Intelligence',
    desc: 'Get started with ARIFAC\u2019s foundational resources and materials curated to build your understanding of the regulatory and financial intelligence landscape.',
  },
  {
    title: 'Typology & Risk Alerts',
    desc: 'Receive FIU-driven insights and alerts, keeping you informed on emerging financial crime typologies and risk developments as they unfold.',
  },
  {
    title: 'Events & Summits',
    desc: 'Gain access to flagship ARIFAC events (Eg: N-SAFE) on an event-by-event basis. An entry point into the region\u2019s most important regulatory gatherings.',
  },
  {
    title: 'Webinars & Awareness Sessions',
    desc: 'Participate in webinars and awareness programmes, connecting you with timely topics and thought leadership across the ecosystem.',
  },
  {
    title: 'Reports',
    desc: 'Full access to ARIFAC\u2019s published reports.',
  },
  {
    title: 'Training & Certification',
    desc: 'Access ARIFAC\u2019s training and certification programmes at standard pricing, building credentials recognised across the industry.',
  },
  {
    title: 'Closed-Door Interactions',
    desc: 'Select access to closed-door sessions, offering a first look into more exclusive ARIFAC engagements.',
  },
]

export default function LearnersPage() {
  return (
    <StaticPageLayout
      label="Learners"
      title="Register with ARIFAC"
      description="ARIFAC brings together institutions and professionals at the forefront of financial intelligence in India. Registering with us places you within an evolving ecosystem of regulators, practitioners, and policymakers in the AML/CFT ecosystem."
    >
      {/* What You Get Access To */}
      <section className="py-6 lg:py-8 border-b border-neutral-100">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="mb-5">
            <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-2 block">Access</span>
            <h2 className="text-xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-2">
              Building a foundation for you to learn, engage, and grow
            </h2>
            <p className="text-neutral-600 text-[15px] leading-[1.75] max-w-3xl">
              Via access to:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accessItems.map((item) => (
              <div key={item.title} className="editorial-card p-4">
                <h3 className="text-[14px] font-bold text-neutral-900 mb-1">{item.title}</h3>
                <p className="text-[13px] text-neutral-600 leading-[1.6]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Registration CTA */}
      <section className="py-6 lg:py-8">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="editorial-card p-6 lg:p-8 bg-brand/[0.03] border-brand/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-1 w-6 bg-brand" />
              <span className="text-[11px] font-bold text-brand tracking-widest uppercase">Open &amp; Free</span>
            </div>
            <h2 className="text-xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-2">
              Registering with ARIFAC is open and free for all
            </h2>
            <p className="text-neutral-600 text-[15px] leading-[1.75] max-w-3xl">
              A seamless first step into one of India&apos;s leading financial intelligence communities.
            </p>
          </div>
        </div>
      </section>
    </StaticPageLayout>
  )
}
