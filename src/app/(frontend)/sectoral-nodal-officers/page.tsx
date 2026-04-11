import StaticPageLayout, { ContentSection } from "@/components/StaticPageLayout";

interface Organization {
  name: string;
  officer?: string;
}

interface Sector {
  sector: string;
  organizations: Organization[];
}

const sectors: Sector[] = [
  {
    sector: "Banks",
    organizations: [
      { name: "ICICI Bank", officer: "Ms Rakhee Sengupta" },
      { name: "Axis Bank", officer: "Mr Manish Vasishta" },
      { name: "State Bank of India" },
    ],
  },
  {
    sector: "Payment Aggregators / PA - Cross Border",
    organizations: [
      { name: "IndiaIdeas.com Limited (BillDesk)", officer: "Ms Jyothi N M" },
    ],
  },
  {
    sector: "Networks",
    organizations: [{ name: "NPCI" }],
  },
  {
    sector: "Payment Banks / PPI Issuers",
    organizations: [
      { name: "Fino Payments Bank", officer: "Mr Aashish Pathak" },
    ],
  },
  {
    sector: "Asset Management",
    organizations: [
      { name: "HDFC Mutual Fund", officer: "Mr Sameer Seksaria" },
    ],
  },
  {
    sector: "Co-operative Banks",
    organizations: [
      { name: "Karad Urban Co-Operative Bank", officer: "Mr Amit Madhusudan Retharekar" },
    ],
  },
  {
    sector: "Brokers",
    organizations: [
      { name: "Zerodha Broking Limited", officer: "Ms Roopa Venkatesh" },
    ],
  },
  {
    sector: "NBFC",
    organizations: [
      { name: "Bajaj Finserv", officer: "Mr Neelesh Sarda" },
    ],
  },
];

const totalOrgs = sectors.reduce((sum, s) => sum + s.organizations.length, 0);

function SectorBlock({ sector, index }: { sector: Sector; index: number }) {
  return (
    <div className="group">
      {/* Sector header row */}
      <div className="grid grid-cols-[48px_1fr] lg:grid-cols-[64px_1fr] items-center gap-x-4 py-4 lg:py-5 border-b-2 border-neutral-900/10">
        <span className="text-[32px] lg:text-[42px] font-extrabold text-neutral-200 leading-none select-none tabular-nums group-hover:text-brand-light transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-[13px] lg:text-[14px] font-bold text-brand uppercase tracking-[0.14em]">
          {sector.sector}
        </h3>
      </div>

      {/* Organization rows */}
      {sector.organizations.map((org) => (
        <div
          key={org.name}
          className="grid grid-cols-[48px_1fr] lg:grid-cols-[64px_1.4fr_1fr] items-start lg:items-center gap-x-4 gap-y-1 py-4 lg:py-5 border-b border-neutral-200 hover:bg-neutral-50/60 transition-colors duration-300"
        >
          {/* Empty spacer to align with sector number */}
          <span className="hidden lg:block" />

          {/* Organization name */}
          <div className="col-start-2 lg:col-start-2 min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="w-4 h-px bg-neutral-300 shrink-0" />
              <p className="text-[15px] lg:text-[16px] font-semibold text-neutral-900 leading-snug tracking-tight">
                {org.name}
              </p>
            </div>
          </div>

          {/* Nodal officer */}
          <div className="col-start-2 lg:col-start-3 pl-[calc(16px+10px)] lg:pl-0">
            {org.officer ? (
              <span className="text-[13px] text-neutral-500 font-medium">
                {org.officer}
              </span>
            ) : (
              <span className="text-[12px] text-neutral-400 italic">
                To be announced
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SectoralNodalOfficersPage() {
  return (
    <StaticPageLayout
      label="Sectoral Nodal Officers"
      title="Sector-Wise Coordination Representatives"
      description="Facilitating coordination and mission delivery across the ARIFAC network through representation from major financial sectors."
    >
      <ContentSection title="Directory">
        {/* Column headers — desktop only */}
        <div className="hidden lg:grid lg:grid-cols-[64px_1.4fr_1fr] gap-x-4 pb-3 border-b-2 border-neutral-900/10 mb-0">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            Sector
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            Organization
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            Nodal Officer
          </span>
        </div>

        {/* Sector blocks */}
        <div>
          {sectors.map((sector, i) => (
            <SectorBlock key={sector.sector} sector={sector} index={i} />
          ))}
        </div>

        {/* Footer stats */}
        <div className="mt-6 pt-5 border-t-2 border-neutral-900/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-[3px] bg-brand" />
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                {sectors.length} Sectors
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-[3px] bg-brand-light" />
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                {totalOrgs} Organizations
              </span>
            </div>
          </div>
          <span className="text-[11px] text-neutral-400">
            Updated April 2026
          </span>
        </div>
      </ContentSection>
    </StaticPageLayout>
  );
}
