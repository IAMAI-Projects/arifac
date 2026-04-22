import configPromise from '@payload-config'
import { getPayload } from 'payload'
import StaticPageLayout from '@/components/StaticPageLayout'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import type { NodalOfficer } from '@/payload-types'

interface OfficerCardProps {
  officer: NodalOfficer
  nodalOfficerLabel?: string
  fallbackDesignation?: string
}

function OfficerCard({ officer, nodalOfficerLabel, fallbackDesignation }: OfficerCardProps) {
  return (
    <div className="group bg-[#f5f5f7] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-[#1d1d1f] group-hover:text-brand transition-colors duration-300">
          {officer.organization}
        </h3>
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
          {officer.designation}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="h-12 w-px bg-gray-200 hidden md:block" />
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-brand uppercase tracking-widest">{nodalOfficerLabel || 'Nodal Officer'}</div>
          {officer.name ? (
            <div className="text-lg font-bold text-[#1d1d1f]">{officer.name}</div>
          ) : (
            <div className="text-lg font-medium text-slate-400 italic">{fallbackDesignation || 'Principal Officer'}</div>
          )}
        </div>
      </div>
    </div>
  )
}

function SectorGroup({ name, officers, index, nodalOfficerLabel, fallbackDesignation }: { name: string; officers: NodalOfficer[]; index: number; nodalOfficerLabel?: string; fallbackDesignation?: string }) {
  return (
    <div className="mb-24 last:mb-0">
      <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-12 border-b border-gray-100 pb-8">
        <span className="text-brand font-bold text-sm tracking-widest tabular-nums opacity-50">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">{name}</h2>
      </div>
      <div className="grid gap-6">
        {officers.map((officer) => (
          <OfficerCard key={officer.id} officer={officer} nodalOfficerLabel={nodalOfficerLabel} fallbackDesignation={fallbackDesignation} />
        ))}
      </div>
    </div>
  )
}

export default async function SectoralNodalOfficersPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'sectoral-nodal-officers' } },
    limit: 1,
    draft: true,
  })
  const page = result.docs[0]

  const { docs: officers } = await payload.find({
    collection: 'nodal-officers',
    sort: 'order',
    limit: 100,
  })

  // Group by sector for display
  const sectorMap = new Map<string, NodalOfficer[]>()
  for (const officer of officers) {
    const sector = officer.sector
    if (!sectorMap.has(sector)) sectorMap.set(sector, [])
    sectorMap.get(sector)!.push(officer)
  }
  const sectors = Array.from(sectorMap.entries()).map(([name, sectorOfficers]) => ({ name, officers: sectorOfficers }))

  const totalOfficers = officers.length

  return (
    <StaticPageLayout
      label={page?.banner?.label || 'Ecosystem Leadership'}
      title={page?.banner?.title || 'Sectoral Nodal Officers'}
      description={page?.banner?.description || 'Facilitating coordination and mission delivery across the ARIFAC network through representation from major financial sectors.'}
    >
      <RefreshRouteOnSave />
      <section className="py-10 lg:py-14">
        <div className="max-w-4xl mx-auto px-6">
          {sectors.map((sector, i) => (
            <SectorGroup key={sector.name} name={sector.name} officers={sector.officers} index={i} nodalOfficerLabel={page?.nodalOfficersContent?.nodalOfficerLabel || 'Nodal Officer'} fallbackDesignation={page?.nodalOfficersContent?.fallbackDesignation || 'Principal Officer'} />
          ))}

          <div className="mt-6 pt-5 border-t-2 border-navy/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-[3px] bg-brand" />
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  {sectors.length} {page?.nodalOfficersContent?.sectorsCountLabel || 'Sectors'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-[3px] bg-brand-light" />
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  {totalOfficers} {page?.nodalOfficersContent?.officersCountLabel || 'Officers'}
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-400">{page?.nodalOfficersContent?.lastUpdated || 'Updated April 2026'}</span>
          </div>
        </div>
      </section>
    </StaticPageLayout>
  )
}
