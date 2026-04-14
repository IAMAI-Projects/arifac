import configPromise from '@payload-config'
import { getPayload } from 'payload'
import StaticPageLayout from '@/components/StaticPageLayout'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

export default async function MembersPage() {
  const payload = await getPayload({ config: configPromise })

  const [pageResult, membersResult] = await Promise.all([
    payload.find({ collection: 'pages', where: { slug: { equals: 'members' } }, limit: 1, draft: true }),
    payload.find({ collection: 'members', limit: 500, sort: 'name', draft: true }),
  ])

  const page = pageResult.docs[0]
  const members = membersResult.docs

  return (
    <StaticPageLayout
      label={page?.banner?.label || 'Our Members'}
      title={page?.banner?.title || `Our Members — ${members.length} leading organisations in the ecosystem.`}
      description={page?.banner?.description || ''}
    >
      <RefreshRouteOnSave />
      <section className="py-10 lg:py-14">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="h-1 w-8 bg-brand" />
              <span className="text-[11px] font-bold text-brand tracking-widest uppercase">
                Member Directory
              </span>
            </div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              {members.length} Organisations
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-0">
            {members.map((member, idx) => (
              <div
                key={member.id}
                className="group flex items-center gap-3 py-3 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/60 transition-colors"
              >
                <span className="text-[10px] font-black text-neutral-200 group-hover:text-brand transition-colors w-7 text-right flex-shrink-0">
                  {String(idx + 1).padStart(3, '0')}
                </span>
                <span className="text-[13px] font-medium text-neutral-800 group-hover:text-brand transition-colors leading-snug">
                  {member.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t-2 border-neutral-200 flex items-center gap-2">
            <span className="w-3 h-[3px] bg-brand" />
            <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-neutral-500">
              {members.length} Member Organisations
            </span>
          </div>
        </div>
      </section>
    </StaticPageLayout>
  )
}
