import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import PageBanner from '@/components/PageBanner'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

export const metadata: Metadata = {
  title: 'Programmes — Industry Engagement Framework | ARIFAC',
  description: 'Explore ARIFAC\'s consolidated ecosystem engagement programmes including workshops, consultations, annual meetings, and capacity building initiatives for India\'s financial sector.',
  alternates: { canonical: 'https://arifac.com/programmes' },
}

export default async function ProgrammesPage() {
  const payload = await getPayload({ config: configPromise })
  const programmes = await payload.findGlobal({ slug: 'programmes', draft: true })

  const engagementFormats = programmes.engagementFormats ?? []
  const programmeSchedule = programmes.programmeSchedule ?? []
  const recentConsultations = programmes.recentConsultations ?? []
  const annualMeetings = programmes.annualMeetings ?? []

  return (
    <>
      <RefreshRouteOnSave />
      <PageBanner
        label={programmes.banner?.label ?? 'Programmes'}
        title={programmes.banner?.title ?? 'Consolidated Ecosystem Engagement Framework'}
        description={programmes.banner?.description ?? ''}
      />

      {/* Engagement Channels */}
      {engagementFormats.length > 0 && (
        <section className="py-8 lg:py-10 bg-white border-b border-neutral-100">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="h-1 w-8 bg-brand" />
                <span className="text-[11px] font-bold text-brand tracking-widest uppercase">
                  {programmes.sectionHeadings?.engagementStrategy ?? 'Engagement Strategy'}
                </span>
              </div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                {engagementFormats.length} {programmes.labels?.activeChannelsLabel || 'Active Channels'}
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {engagementFormats.map((ch, idx) => (
                <div
                  key={ch.id ?? idx}
                  className="group bg-white border border-neutral-200 p-4 hover:border-brand/30 hover:shadow-sm transition-all relative overflow-hidden"
                >
                  <div className="absolute top-3 right-4 text-[48px] font-black text-neutral-50 group-hover:text-brand/[0.05] transition-colors pointer-events-none select-none leading-none">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-[14px] font-bold text-neutral-900 mb-2 group-hover:text-brand transition-colors">
                      {ch.title}
                    </h4>
                    <p className="text-neutral-500 text-[12px] leading-relaxed line-clamp-2">
                      {ch.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Programme Schedule */}
      {programmeSchedule.length > 0 && (
        <section className="py-8 lg:py-10 bg-white border-b border-neutral-100">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-brand" />
                <h2 className="text-xl lg:text-2xl font-extrabold text-neutral-900 uppercase tracking-tight">
                  {programmes.sectionHeadings?.programmeSchedule ?? 'Programme Schedule'}
                </h2>
              </div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                {programmeSchedule.length} {programmes.labels?.sessionsLabel || 'Sessions'}
              </span>
            </div>

            {/* Table -- desktop */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-neutral-200">
                    <th className="px-0 pr-4 py-3 text-left text-[10px] font-black text-neutral-400 uppercase tracking-[0.15em] w-[5%]">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black text-neutral-400 uppercase tracking-[0.15em] w-[55%]">
                      {programmes.labels?.programmeTableHeader || 'Programme'}
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black text-neutral-400 uppercase tracking-[0.15em] w-[20%]">
                      {programmes.labels?.formatTableHeader || 'Format'}
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black text-neutral-400 uppercase tracking-[0.15em] w-[20%]">
                      {programmes.labels?.timelineTableHeader || 'Timeline'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {programmeSchedule.map((row, idx) => (
                    <tr
                      key={row.id ?? idx}
                      className="group hover:bg-neutral-50/60 transition-colors"
                    >
                      <td className="px-0 pr-4 py-4">
                        <span className="text-[10px] font-black text-neutral-300 group-hover:text-brand transition-colors">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[15px] font-bold text-neutral-900 leading-snug group-hover:text-brand transition-colors">
                          {row.name}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider px-2.5 py-1 bg-neutral-50 border border-neutral-200 group-hover:bg-white transition-colors">
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[13px] font-medium text-neutral-500 whitespace-nowrap">
                        {row.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards -- mobile */}
            <div className="md:hidden space-y-3">
              {programmeSchedule.map((row, idx) => (
                <div
                  key={row.id ?? idx}
                  className="border border-neutral-200 p-4 bg-white group hover:border-brand/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-black text-brand/50 uppercase tracking-[0.3em] px-2 py-0.5 border border-brand/10 bg-brand/[0.03]">
                      {row.type}
                    </span>
                    <span className="text-[11px] font-bold text-neutral-400">
                      {row.date}
                    </span>
                  </div>
                  <h4 className="text-[14px] font-bold text-neutral-900 leading-snug group-hover:text-brand transition-colors">
                    {row.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Consultations */}
      {recentConsultations.length > 0 && (
        <section className="py-8 lg:py-10 bg-white border-b border-neutral-100">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-brand" />
                <h2 className="text-xl lg:text-2xl font-extrabold text-neutral-900 uppercase tracking-tight">
                  {programmes.sectionHeadings?.recentConsultations ?? 'Recent Consultations'}
                </h2>
              </div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                {recentConsultations.length} {programmes.labels?.sessionsLabel || 'Sessions'}
              </span>
            </div>

            <div className="space-y-3">
              {recentConsultations.map((item, idx) => (
                <div
                  key={item.id ?? idx}
                  className="group grid grid-cols-[48px_1fr] md:grid-cols-[64px_100px_1fr_120px] items-center gap-3 py-4 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/60 transition-colors"
                >
                  <span className="text-[10px] font-black text-neutral-300 group-hover:text-brand transition-colors text-center">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="hidden md:block text-[12px] font-bold text-neutral-500">
                    {item.date}
                  </span>
                  <div>
                    <span className="text-[14px] font-bold text-neutral-900 leading-snug group-hover:text-brand transition-colors">
                      {item.name}
                    </span>
                    <span className="md:hidden block text-[11px] text-neutral-400 mt-0.5">{item.date}</span>
                  </div>
                  <span className="hidden md:block text-[10px] font-bold text-neutral-500 uppercase tracking-wider px-2.5 py-1 bg-neutral-50 border border-neutral-200 text-center">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Annual Meetings */}
      {annualMeetings.length > 0 && (
        <section className="py-8 lg:py-10 bg-white">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
              {/* Left -- header */}
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-1 w-8 bg-brand" />
                  <span className="text-[11px] font-bold text-brand tracking-widest uppercase">
                    {programmes.labels?.institutionalDialogueEyebrow || 'Institutional Dialogue'}
                  </span>
                </div>
                <h2 className="text-2xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-3">
                  {programmes.sectionHeadings?.annualMeetings ?? 'Annual Meetings & Regulatory Fora'}.
                </h2>
                <p className="text-neutral-600 text-[14px] leading-relaxed">
                  {programmes.labels?.annualMeetingsDescription || 'Structured convergence platforms facilitating knowledge exchange and strategic alignment between ecosystem stakeholders.'}
                </p>
              </div>

              {/* Right -- meeting table */}
              <div className="lg:col-span-8">
                <div className="bg-white border border-neutral-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-brand">
                        <th className="px-5 lg:px-6 py-4 text-[10px] font-black text-white/60 uppercase tracking-widest w-[15%]">
                          {programmes.labels?.yearTableHeader || 'Year'}
                        </th>
                        <th className="px-5 lg:px-6 py-4 text-[10px] font-black text-white/60 uppercase tracking-widest">
                          {programmes.labels?.meetingTableHeader || 'Meeting'}
                        </th>
                        <th className="px-5 lg:px-6 py-4 text-[10px] font-black text-white/60 uppercase tracking-widest w-[22%]">
                          {programmes.labels?.dateTableHeader || 'Date'}
                        </th>
                        <th className="px-5 lg:px-6 py-4 text-[10px] font-black text-white/60 uppercase tracking-widest w-[15%]">
                          {programmes.labels?.locationTableHeader || 'Location'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {annualMeetings.map((mtg, idx) => {
                        const year = mtg.date.includes(',')
                          ? mtg.date.split(',').pop()?.trim()
                          : '2025'
                        return (
                          <tr
                            key={mtg.id ?? idx}
                            className="group hover:bg-neutral-50 transition-colors"
                          >
                            <td className="px-5 lg:px-6 py-4">
                              <span className="text-lg font-black text-neutral-200 group-hover:text-brand transition-colors">
                                {year}
                              </span>
                            </td>
                            <td className="px-5 lg:px-6 py-4">
                              <span className="text-[14px] font-bold text-neutral-900 group-hover:text-brand transition-colors">
                                {mtg.name}
                              </span>
                            </td>
                            <td className="px-5 lg:px-6 py-4 text-[13px] font-medium text-neutral-500">
                              {mtg.date}
                            </td>
                            <td className="px-5 lg:px-6 py-4">
                              <div className="flex items-center gap-1.5">
                                <svg
                                  className="w-3 h-3 text-neutral-300"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                  <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span className="text-[13px] font-bold text-neutral-600">
                                  {mtg.location}
                                </span>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
