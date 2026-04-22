'use client'

import { useState, useMemo } from 'react'
import type { Certification } from '@/payload-types'

interface CertificationsFilterProps {
  certifications: Certification[]
}

export default function CertificationsFilter({ certifications }: CertificationsFilterProps) {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [formatFilter, setFormatFilter] = useState('All')
  const [expanded, setExpanded] = useState<number | null>(null)

  const categories = useMemo(() => {
    return ['All', ...new Set(certifications.map((c) => c.category))]
  }, [certifications])

  const formats = useMemo(() => {
    return ['All', ...new Set(certifications.map((c) => c.format))]
  }, [certifications])

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase()
    return certifications.filter((course) => {
      const byCategory =
        categoryFilter === 'All' || course.category === categoryFilter
      const byFormat =
        formatFilter === 'All' || course.format === formatFilter
      const bySearch =
        query.length === 0 ||
        course.title.toLowerCase().includes(query) ||
        course.focus.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
      return byCategory && byFormat && bySearch
    })
  }, [search, categoryFilter, formatFilter, certifications])

  return (
    <>
      {/* Pathway Tiers Strip */}
      <section className="relative -mt-6 z-20 animate-in">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-0">
            {[
              {
                label: 'Recognised Standards',
                sub: 'Aligned with FATF & Indian PMLA requirements.',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2 2 0 012 2v.5m.435 4.435L17.435 20M12 22a10 10 0 110-20 10 10 0 010 20z" />
                  </svg>
                ),
              },
              {
                label: 'Industry Validated',
                sub: 'Vetted by leading subject matter experts.',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                label: 'Career Growth',
                sub: 'Foundation to senior integrity leadership.',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
              },
            ].map((tier, idx) => (
              <div
                key={tier.label}
                className={`group bg-white p-5 lg:p-6 border border-neutral-100 transition-all hover:bg-neutral-50 relative overflow-hidden animate-in delay-${(idx + 1) * 100}`}
              >
                <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 bg-[#0f172a]/[0.05] text-[#0f172a] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0f172a] group-hover:text-white transition-all duration-300">
                    {tier.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-bold text-neutral-900 uppercase tracking-widest group-hover:text-[#0f172a] transition-colors">
                      {tier.label}
                    </h3>
                    <p className="text-neutral-400 text-[11px] leading-relaxed truncate">
                      {tier.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Catalogue */}
      <section className="py-8 lg:py-10 bg-neutral-50/60 border-b border-neutral-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle opacity-[0.02] pointer-events-none" />
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Left: Sticky Filter Sidebar */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-6">
                <div className="bg-white border border-neutral-200 shadow-sm overflow-hidden">
                  {/* Sidebar header */}
                  <div className="bg-[#0f172a] px-5 py-4">
                    <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">
                      Filter Programmes
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      {filteredCourses.length} of {certifications.length} shown
                    </p>
                  </div>

                  <div className="p-5 space-y-5">
                    {/* Search */}
                    <div>
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">
                        Search
                      </label>
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Title, focus, topic..."
                        className="w-full bg-neutral-50 border border-neutral-200 px-3 py-2 text-[13px] focus:outline-none focus:border-[#0f172a] focus:bg-white transition-all placeholder:text-neutral-300"
                      />
                    </div>

                    {/* Level */}
                    <div>
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">
                        Level
                      </label>
                      <div className="space-y-1">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`w-full text-left px-3 py-2 text-[12px] font-bold transition-all ${
                              categoryFilter === cat
                                ? 'bg-[#0f172a] text-white'
                                : 'text-neutral-900 hover:bg-neutral-50 border border-transparent hover:border-neutral-200'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Format */}
                    <div>
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 block">
                        Format
                      </label>
                      <div className="space-y-1">
                        {formats.map((fmt) => (
                          <button
                            key={fmt}
                            onClick={() => setFormatFilter(fmt)}
                            className={`w-full text-left px-3 py-2 text-[12px] font-bold transition-all ${
                              formatFilter === fmt
                                ? 'bg-[#0f172a] text-white'
                                : 'text-neutral-900 hover:bg-neutral-50 border border-transparent hover:border-neutral-200'
                            }`}
                          >
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Reset */}
                    {(search || categoryFilter !== 'All' || formatFilter !== 'All') && (
                      <button
                        onClick={() => {
                          setSearch('')
                          setCategoryFilter('All')
                          setFormatFilter('All')
                        }}
                        className="w-full text-center px-3 py-2 text-[11px] font-bold text-neutral-400 uppercase tracking-widest border border-dashed border-neutral-300 hover:text-[#0f172a] hover:border-[#0f172a] transition-colors"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Course Grid */}
            <div className="lg:col-span-9">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 grid-rows-[auto]" style={{ gridAutoRows: 'auto' }}>
                {filteredCourses.map((cert, idx) => (
                  <div
                    key={cert.id}
                    className="group relative bg-white border border-neutral-200 hover:border-brand/30 hover:shadow-lg transition-all duration-500 overflow-hidden grid grid-rows-subgrid row-span-6"
                  >
                    {/* Row 1: Top accent bar + Level badge */}
                    <div>
                      <div className="h-1 w-full bg-gradient-to-r from-brand to-brand-light transition-all duration-500" />
                      <div className="relative z-10 px-5 lg:px-6 pt-5 lg:pt-6">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold text-brand uppercase tracking-widest bg-brand/[0.08] border border-brand/20 px-2.5 py-1">
                            {cert.level}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Title */}
                    <div className="relative z-10 px-5 lg:px-6 pt-3">
                      <h3 className="text-[16px] font-bold text-neutral-900 leading-tight group-hover:text-[#0f172a] transition-colors pr-12">
                        {cert.title}
                      </h3>
                    </div>

                    {/* Row 3: Description */}
                    <div className="relative z-10 px-5 lg:px-6 pt-2">
                      <p className="text-neutral-500 text-[13px] leading-relaxed line-clamp-3">
                        {cert.description}
                      </p>
                    </div>

                    {/* Row 4: Meta tags */}
                    <div className="relative z-10 px-5 lg:px-6 pt-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold text-neutral-900 uppercase tracking-wider px-2.5 py-1 bg-[#0f172a]/[0.04] border border-neutral-900/10">
                          {cert.format}
                        </span>
                        <span className="text-[10px] font-bold text-neutral-900 uppercase tracking-wider px-2.5 py-1 bg-[#0f172a]/[0.04] border border-neutral-900/10">
                          {cert.duration}
                        </span>
                        <span className="text-[10px] font-bold text-brand uppercase tracking-wider px-2.5 py-1 bg-brand/[0.06] border border-brand/15">
                          {cert.focus}
                        </span>
                      </div>
                    </div>

                    {/* Row 5: Curriculum toggle */}
                    <div className="relative z-10 px-5 lg:px-6 pt-4">
                      <button
                        onClick={() =>
                          setExpanded(expanded === cert.id ? null : cert.id)
                        }
                        className="flex items-center gap-2 text-[11px] font-bold text-neutral-900 uppercase tracking-widest hover:text-[#0f172a] transition-colors"
                      >
                        <svg
                          className={`w-3 h-3 transition-transform duration-300 ${expanded === cert.id ? 'rotate-90' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Curriculum
                      </button>

                      {expanded === cert.id && cert.curriculum && (
                        <div className="mt-3 pt-3 border-t border-neutral-100 animate-in">
                          <ul className="space-y-2">
                            {cert.curriculum.map((entry, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-neutral-600 text-[13px] leading-relaxed"
                              >
                                <div className="w-1.5 h-1.5 bg-brand/40 mt-[7px] flex-shrink-0" />
                                {entry.item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Row 6: Status */}
                    <div className="relative z-10 px-5 lg:px-6 pb-5 lg:pb-6 pt-4 mt-auto">
                      <div className="pt-4 border-t border-neutral-100">
                        {cert.launchStatus === 'live' ? (
                          <div className="space-y-2">
                            <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 text-[11px] font-bold uppercase tracking-widest">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                              Live
                            </span>
                            <p className="text-[12px] text-neutral-600 leading-relaxed">
                              This course is now live for employees of reporting entities, based on nominations received from their respective organisations.
                            </p>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-2 bg-neutral-100 text-neutral-400 px-4 py-2 text-[11px] font-bold uppercase tracking-widest">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="mt-6 bg-white border border-dashed border-neutral-300 p-8 text-center">
                  <p className="text-neutral-500 text-[14px]">
                    No courses match the selected filters. Try adjusting your
                    search or filter selections.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
