'use client'

import { useMemo, useState } from 'react'
import type { RegulatoryUpdate } from '@/payload-types'

const categoryLabels: Record<string, string> = {
  'aml-cft': 'AML / CFT',
  'kyc-cdd': 'KYC / Customer Due Diligence',
  'reporting': 'Reporting Obligations',
  'digital-onboarding': 'Digital Onboarding',
  'fraud-cyber': 'Fraud / Cyber Risk',
  'sanctions': 'Sanctions / Screening',
  'compliance-governance': 'Compliance & Governance',
}

const issuingBodyLabels: Record<string, string> = {
  'rbi': 'RBI',
  'fiu-ind': 'FIU-IND',
  'sebi': 'SEBI',
  'irdai': 'IRDAI',
}

const regulatorTone: Record<string, string> = {
  'rbi': 'bg-brand-subtle text-brand border-brand/20',
  'fiu-ind': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'sebi': 'bg-violet-50 text-violet-700 border-violet-200',
  'irdai': 'bg-amber-50 text-amber-700 border-amber-200',
}

const formatDate = (raw: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(raw))

const PER_PAGE = 10

interface UpdatesFilterProps {
  updates: RegulatoryUpdate[]
}

export default function UpdatesFilter({ updates }: UpdatesFilterProps) {
  const [regulator, setRegulator] = useState('All Regulators')
  const [category, setCategory] = useState('All Categories')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')
  const [page, setPage] = useState(1)

  const regulators = useMemo(
    () => ['All Regulators', ...new Set(updates.map((item) => issuingBodyLabels[item.issuingBody] || item.issuingBody))],
    [updates],
  )

  const categories = useMemo(
    () => ['All Categories', ...new Set(updates.map((item) => categoryLabels[item.category] || item.category))],
    [updates],
  )

  const filtered = useMemo(() => {
    const scoped = updates.filter((item) => {
      const displayRegulator = issuingBodyLabels[item.issuingBody] || item.issuingBody
      const displayCategory = categoryLabels[item.category] || item.category
      const regulatorMatch = regulator === 'All Regulators' || displayRegulator === regulator
      const categoryMatch = category === 'All Categories' || displayCategory === category
      return regulatorMatch && categoryMatch
    })

    return scoped.sort((a, b) => {
      const lhs = new Date(`${a.date}T00:00:00`).getTime()
      const rhs = new Date(`${b.date}T00:00:00`).getTime()
      return sortBy === 'newest' ? rhs - lhs : lhs - rhs
    })
  }, [category, regulator, sortBy, updates])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(page, totalPages)

  const pageData = useMemo(() => {
    const start = (safePage - 1) * PER_PAGE
    return filtered.slice(start, start + PER_PAGE)
  }, [filtered, safePage])

  const showingStart = filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1
  const showingEnd = Math.min(safePage * PER_PAGE, filtered.length)

  return (
    <section className="py-10 lg:py-12 bg-white">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-7">
          <div className="flex flex-wrap items-center gap-2 border border-neutral-200 bg-neutral-50 px-2.5 py-2">
            <select
              value={regulator}
              onChange={(e) => {
                setRegulator(e.target.value)
                setPage(1)
              }}
              className="bg-transparent text-[12px] font-bold text-neutral-700 px-2 py-1.5 focus:outline-none cursor-pointer"
            >
              {regulators.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>

            <div className="w-px h-4 bg-neutral-300" />

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
                setPage(1)
              }}
              className="bg-transparent text-[12px] font-bold text-neutral-700 px-2 py-1.5 focus:outline-none cursor-pointer"
            >
              {categories.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>

            <div className="w-px h-4 bg-neutral-300" />

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as 'newest' | 'oldest')
                setPage(1)
              }}
              className="bg-transparent text-[12px] font-bold text-neutral-700 px-2 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
          <div>
            <p className="text-neutral-500 text-[14px]">
              Showing <span className="font-black text-brand">{showingStart}-{showingEnd}</span> of{' '}
              <span className="font-black text-neutral-900">{filtered.length}</span> circulars
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {pageData.length === 0 && (
            <div className="border border-neutral-200 bg-neutral-50 p-8 text-center text-neutral-600">
              No circulars match your selected filters.
            </div>
          )}

          {pageData.map((item, idx) => {
            const displayRegulator = issuingBodyLabels[item.issuingBody] || item.issuingBody
            const displayCategory = categoryLabels[item.category] || item.category
            const tone = regulatorTone[item.issuingBody] || 'bg-neutral-50 text-neutral-700 border-neutral-200'
            return (
              <article
                key={item.id}
                className="group border border-neutral-200 bg-white p-5 lg:p-6 hover:border-brand/35 hover:shadow-lg hover:shadow-neutral-200/70 transition-all duration-300 animate-in"
                style={{ animationDelay: `${(idx + 1) * 70}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`px-2.5 py-1 border text-[11px] font-black uppercase tracking-wide ${tone}`}>
                        {displayRegulator}
                      </span>
                      <span className="px-2.5 py-1 border border-neutral-200 bg-neutral-50 text-neutral-600 text-[11px] font-bold uppercase tracking-wide">
                        {displayCategory}
                      </span>
                      <span className="text-[12px] text-neutral-500 font-semibold">{formatDate(item.date)}</span>
                    </div>

                    <h3 className="text-[16px] lg:text-[18px] font-bold text-neutral-900 leading-tight group-hover:text-brand transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[12px] text-neutral-500 font-mono mt-2">{item.referenceNumber}</p>
                  </div>

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="shrink-0 inline-flex items-center gap-2 border border-neutral-300 px-4 py-2 text-[11px] font-black uppercase tracking-wide text-neutral-700 hover:bg-brand hover:text-white hover:border-neutral-900 transition-all"
                    >
                      View Circular
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                        <path d="M7 17 17 7" />
                        <path d="M9 7h8v8" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-between gap-4">
          <p className="text-[14px] text-neutral-600">
            Showing <span className="font-black text-neutral-900">{showingStart}-{showingEnd}</span> of{' '}
            <span className="font-black text-neutral-900">{filtered.length}</span> circulars
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="w-9 h-9 border border-neutral-300 text-neutral-600 font-black disabled:opacity-35 disabled:cursor-not-allowed hover:bg-brand hover:text-white hover:border-neutral-900 transition-colors"
            >
              {'<'}
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((entry) => (
              <button
                key={entry}
                onClick={() => setPage(entry)}
                className={`w-9 h-9 text-[12px] font-black border transition-colors ${
                  entry === safePage ? 'bg-brand text-white border-neutral-900' : 'border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
                }`}
              >
                {entry}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="w-9 h-9 border border-neutral-300 text-neutral-600 font-black disabled:opacity-35 disabled:cursor-not-allowed hover:bg-brand hover:text-white hover:border-neutral-900 transition-colors"
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
