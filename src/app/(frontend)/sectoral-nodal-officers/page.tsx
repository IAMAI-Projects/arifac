import configPromise from '@payload-config'
import { getPayload } from 'payload'
import StaticPageLayout from '@/components/StaticPageLayout'

interface NodalOfficer {
  organization: string
  designation: string
  officerName: string
}

interface Sector {
  name: string
  officers: NodalOfficer[]
}

const sectors: Sector[] = [
  {
    name: 'Banks',
    officers: [
      { organization: 'ICICI Bank', designation: 'Principal Officer', officerName: 'Ms Rakhee Sengupta' },
      { organization: 'Axis Bank', designation: 'Principal Officer', officerName: 'Mr Manish Vasishta' },
      { organization: 'State Bank of India', designation: 'Principal Officer', officerName: '' },
    ],
  },
  {
    name: 'Payment Aggregators / PA - Cross Border',
    officers: [
      { organization: 'IndiaIdeas.com Limited (BillDesk)', designation: 'Principal Officer', officerName: 'Ms Jyothi N M' },
    ],
  },
  {
    name: 'Networks',
    officers: [
      { organization: 'NPCI', designation: 'Principal Officer', officerName: '' },
    ],
  },
  {
    name: 'Payment Banks / PPI Issuers',
    officers: [
      { organization: 'Fino Payments Bank', designation: 'Principal Officer', officerName: 'Mr Aashish Pathak' },
    ],
  },
  {
    name: 'Asset Management',
    officers: [
      { organization: 'HDFC Mutual Fund', designation: 'Principal Officer', officerName: 'Mr Sameer Seksaria' },
    ],
  },
  {
    name: 'Co-operative Banks',
    officers: [
      { organization: 'Karad Urban Co-Operative Bank', designation: 'Principal Officer', officerName: 'Mr Amit Madhusudan Retharekar' },
    ],
  },
  {
    name: 'Brokers',
    officers: [
      { organization: 'Zerodha Broking Limited', designation: 'Principal Officer', officerName: 'Ms Roopa Venkatesh' },
    ],
  },
  {
    name: 'NBFC',
    officers: [
      { organization: 'Bajaj Finserv', designation: 'Principal Officer', officerName: 'Mr Neelesh Sarda' },
    ],
  },
]

function OfficerCard({ officer }: { officer: NodalOfficer }) {
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
          <div className="text-[10px] font-bold text-brand uppercase tracking-widest">Nodal Officer</div>
          {officer.officerName ? (
            <div className="text-lg font-bold text-[#1d1d1f]">{officer.officerName}</div>
          ) : (
            <div className="text-lg font-medium text-slate-400 italic">Principal Officer</div>
          )}
        </div>
      </div>
    </div>
  )
}

function SectorGroup({ sector, index }: { sector: Sector; index: number }) {
  return (
    <div className="mb-24 last:mb-0">
      <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-12 border-b border-gray-100 pb-8">
        <span className="text-brand font-bold text-sm tracking-widest tabular-nums opacity-50">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">{sector.name}</h2>
      </div>
      <div className="grid gap-6">
        {sector.officers.map((officer) => (
          <OfficerCard key={officer.organization} officer={officer} />
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
  })
  const page = result.docs[0]

  const totalOfficers = sectors.reduce((sum, s) => sum + s.officers.length, 0)

  return (
    <StaticPageLayout
      label={page?.banner?.label || 'Ecosystem Leadership'}
      title={page?.banner?.title || 'Sectoral Nodal Officers'}
      description={page?.banner?.description || 'Facilitating coordination and mission delivery across the ARIFAC network through representation from major financial sectors.'}
    >
      <section className="py-10 lg:py-14">
        <div className="max-w-4xl mx-auto px-6">
          {sectors.map((sector, i) => (
            <SectorGroup key={sector.name} sector={sector} index={i} />
          ))}

          <div className="mt-6 pt-5 border-t-2 border-navy/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-[3px] bg-brand" />
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  {sectors.length} Sectors
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-[3px] bg-brand-light" />
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  {totalOfficers} Officers
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
