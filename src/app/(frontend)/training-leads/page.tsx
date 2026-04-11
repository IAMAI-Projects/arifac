import StaticPageLayout, { ContentSection } from "@/components/StaticPageLayout";

interface TrainingLead {
  name: string;
  designation?: string;
  organization: string;
  specialisation?: string;
}

const trainingLeads: TrainingLead[] = [
  {
    name: "Mr Nihal Shah",
    designation: "Principal Officer",
    organization: "Citibank NA",
    specialisation: "Foreign Banks AML Framework",
  },
  {
    name: "Mr Shirish Pathak",
    organization: "Fintelekt Advisory Services Pvt Ltd",
  },
  {
    name: "Mr Sameer Seksaria",
    organization: "HDFC AMC",
    specialisation: "Asset Management Compliance",
  },
  {
    name: "Mr Gyan Gotan",
    organization: "HDFC Bank",
    specialisation: "Private Banking AML Framework",
  },
  {
    name: "Ms Rakhee Sengupta",
    organization: "ICICI Bank",
    specialisation: "Retail Banking AML",
  },
  {
    name: "Ms Jyothi N M",
    designation: "Asstt. GM & Principal Officer",
    organization: "IndiaIdeas.com Limited (BillDesk)",
    specialisation: "PA/PACB, BBPS AML Framework",
  },
  {
    name: "Mr Prashant Sinha",
    organization: "Jio Financial Services",
  },
  {
    name: "Mr Hemang Sheth",
    organization: "JP Morgan Chase Bank NA",
  },
  {
    name: "Mr Amit Madhusudan Retharekar",
    designation: "Chief Compliance Officer",
    organization: "Karad Urban Co-Operative Bank",
    specialisation: "Cooperative Banking AML Framework",
  },
  {
    name: "",
    organization: "State Bank of India",
    specialisation: "Public Banking AML Framework",
  },
];

function LeadRow({ lead, index }: { lead: TrainingLead; index: number }) {
  return (
    <div className="group grid grid-cols-[48px_1fr] lg:grid-cols-[64px_minmax(180px,1.2fr)_1.5fr_1fr] items-start lg:items-center gap-x-4 gap-y-1 py-5 lg:py-6 border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50/60 transition-colors duration-300">
      {/* Index — oversized, ghosted */}
      <span className="text-[28px] lg:text-[36px] font-extrabold text-neutral-200 leading-none select-none tabular-nums group-hover:text-brand-light transition-colors duration-300">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Name + designation — mobile: stacked under index; desktop: own column */}
      <div className="min-w-0">
        {lead.name ? (
          <h3 className="text-[15px] lg:text-[16px] font-bold text-neutral-900 leading-snug tracking-tight">
            {lead.name}
          </h3>
        ) : (
          <h3 className="text-[14px] font-medium text-neutral-400 italic">
            To be announced
          </h3>
        )}
        {lead.designation && (
          <p className="text-[12px] text-neutral-500 mt-0.5">{lead.designation}</p>
        )}
      </div>

      {/* Organization — on mobile, spans full row below */}
      <div className="col-span-2 lg:col-span-1 pl-[calc(48px+16px)] lg:pl-0">
        <div className="flex items-center gap-2.5">
          <span className="hidden lg:block w-5 h-px bg-neutral-300 shrink-0" />
          <p className="text-[13px] lg:text-[14px] font-semibold text-brand leading-snug">
            {lead.organization}
          </p>
        </div>
      </div>

      {/* Specialisation — on mobile, spans full row; desktop: last column */}
      {lead.specialisation ? (
        <div className="col-span-2 lg:col-span-1 pl-[calc(48px+16px)] lg:pl-0 mt-1 lg:mt-0">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-900/50 bg-brand/[0.04] border border-neutral-900/[0.08] px-2.5 py-1">
            {lead.specialisation}
          </span>
        </div>
      ) : (
        <div className="hidden lg:block" />
      )}
    </div>
  );
}

export default function TrainingLeadsPage() {
  return (
    <StaticPageLayout
      label="Training Leads"
      title="Training Leads"
      description="Leading experts driving excellence in professional certification across the ARIFAC ecosystem."
    >
      <ContentSection
        eyebrow="Expert Network"
        title="ARIFAC Training Lead Directory"
        description="Domain specialists appointed across India's financial ecosystem to lead certification, capacity building, and AML/CFT training initiatives."
      >
        {/* Column headers — desktop only */}
        <div className="hidden lg:grid lg:grid-cols-[64px_minmax(180px,1.2fr)_1.5fr_1fr] gap-x-4 pb-3 border-b-2 border-neutral-900/10 mb-0">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            No.
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            Name
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            Organization
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            Specialisation
          </span>
        </div>

        {/* Rows */}
        <div>
          {trainingLeads.map((lead, i) => (
            <LeadRow key={lead.organization} lead={lead} index={i} />
          ))}
        </div>

        {/* Footer stats */}
        <div className="mt-6 pt-5 border-t-2 border-neutral-900/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-[3px] bg-brand" />
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                {trainingLeads.length} Leads
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-[3px] bg-brand-light" />
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                {trainingLeads.filter((l) => l.specialisation).length} Specialisations
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
