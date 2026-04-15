import configPromise from '@payload-config'
import { getPayload } from 'payload'
import StaticPageLayout from '@/components/StaticPageLayout'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import type { TrainingLeadsDirectory } from '@/payload-types'

function LeadRow({ lead, index }: { lead: TrainingLeadsDirectory; index: number }) {
  return (
    <div className="group grid grid-cols-[48px_1fr] lg:grid-cols-[64px_minmax(180px,1.2fr)_1.5fr_1fr] items-start lg:items-center gap-x-4 gap-y-1 py-5 lg:py-6 border-b border-slate-200 last:border-b-0 hover:bg-slate-50/60 transition-colors duration-300">
      <span className="text-[28px] lg:text-[36px] font-extrabold text-slate-200 leading-none select-none tabular-nums group-hover:text-brand-light transition-colors duration-300">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="min-w-0">
        {lead.name ? (
          <h3 className="text-[15px] lg:text-[16px] font-bold text-navy leading-snug tracking-tight">
            {lead.name}
          </h3>
        ) : (
          <h3 className="text-[14px] font-medium text-slate-400 italic">
            To be announced
          </h3>
        )}
        {lead.designation && (
          <p className="text-[12px] text-slate-500 mt-0.5">{lead.designation}</p>
        )}
      </div>

      <div className="col-span-2 lg:col-span-1 pl-[calc(48px+16px)] lg:pl-0">
        <div className="flex items-center gap-2.5">
          <span className="hidden lg:block w-5 h-px bg-slate-300 shrink-0" />
          <p className="text-[13px] lg:text-[14px] font-semibold text-brand leading-snug">
            {lead.organization}
          </p>
        </div>
      </div>

      {lead.specialization ? (
        <div className="col-span-2 lg:col-span-1 pl-[calc(48px+16px)] lg:pl-0 mt-1 lg:mt-0">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.12em] text-navy/50 bg-navy/[0.04] border border-navy/[0.08] px-2.5 py-1">
            {lead.specialization}
          </span>
        </div>
      ) : (
        <div className="hidden lg:block" />
      )}
    </div>
  )
}

export default async function TrainingLeadsPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'training-leads' } },
    limit: 1,
    draft: true,
  })
  const page = result.docs[0]

  const { docs: trainingLeads } = await payload.find({
    collection: 'training-leads-directory',
    sort: 'order',
    limit: 100,
  })

  return (
    <StaticPageLayout
      label={page?.banner?.label || 'Training Leads'}
      title={page?.banner?.title || 'Training Leads'}
      description={page?.banner?.description || 'Leading experts driving excellence in professional certification across the ARIFAC ecosystem.'}
    >
      <RefreshRouteOnSave />
      <section className="py-10 lg:py-14">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="mb-8">
            <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-3 block">Expert Network</span>
            <h2 className="text-2xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-3">
              ARIFAC Training Lead Directory
            </h2>
            <p className="text-neutral-600 text-[15px] leading-relaxed max-w-2xl">
              Domain specialists appointed across India&apos;s financial ecosystem to lead certification, capacity building, and AML/CFT training initiatives.
            </p>
          </div>

          <div className="hidden lg:grid lg:grid-cols-[64px_minmax(180px,1.2fr)_1.5fr_1fr] gap-x-4 pb-3 border-b-2 border-navy/10 mb-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">No.</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Name</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Organization</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Specialisation</span>
          </div>

          <div>
            {trainingLeads.map((lead, i) => (
              <LeadRow key={lead.id} lead={lead} index={i} />
            ))}
          </div>

          <div className="mt-6 pt-5 border-t-2 border-navy/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-[3px] bg-brand" />
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  {trainingLeads.length} Leads
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-[3px] bg-brand-light" />
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  {trainingLeads.filter((l) => l.specialization).length} Specialisations
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-400">Updated April 2026</span>
          </div>
        </div>
      </section>
    </StaticPageLayout>
  )
}
