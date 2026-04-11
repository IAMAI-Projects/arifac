import Link from "next/link";
import StaticPageLayout, { ContentSection } from "@/components/StaticPageLayout";

const galleryItems = [
  {
    title: "Fintech Regulatory Dialogue",
    text: "Structured discussions on emerging financial crime risks and practical controls.",
  },
  {
    title: "Transaction Monitoring Group",
    text: "Focused forum on transaction monitoring typologies and implementation readiness.",
  },
  {
    title: "Banking Sector Consultation",
    text: "Workshops addressing onboarding practices, operational issues, and control quality.",
  },
  {
    title: "Cross-Sector Workshops",
    text: "Joint sessions involving financial institutions, fintechs, and technology providers.",
  },
  {
    title: "Capability Building Programmes",
    text: "Hands-on learning engagements for compliance and risk teams.",
  },
  {
    title: "National Collaboration Events",
    text: "Large-format ecosystem programmes focused on coordination at scale.",
  },
];

export default function GalleryPage() {
  return (
    <StaticPageLayout
      label="Gallery"
      title="ARIFAC in Action: Industry Engagement"
      description="A visual snapshot of consultations, trainings, and stakeholder collaboration across India's financial crime prevention ecosystem."
    >
      <ContentSection
        eyebrow="Engagement Highlights"
        title="Programmes Built Around Collaboration"
        description="These engagements bring together stakeholders across banking, fintech, regulatory, and technology ecosystems to strengthen AML/CFT capability."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryItems.map((item, idx) => (
            <article key={item.title} className="relative border border-slate-200 bg-white p-5 lg:p-6 overflow-hidden group hover:border-brand/30 transition-all">
              <div className="absolute top-3 right-4 text-[42px] font-black text-slate-100 group-hover:text-brand/[0.08] transition-colors select-none pointer-events-none">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-2 relative z-10">{item.title}</h3>
              <p className="text-[14px] text-slate-600 leading-relaxed relative z-10">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 bg-brand text-white p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <p className="text-[15px] text-slate-300 leading-relaxed max-w-2xl">
            Access to specific consultations, working groups, and training programmes may be subject to eligibility and participation criteria.
          </p>
          <Link href="/contact" className="bg-white text-slate-900 px-5 py-3 text-[12px] font-bold uppercase tracking-wider hover:bg-brand hover:text-white transition-colors text-center">
            Request Participation
          </Link>
        </div>
      </ContentSection>
    </StaticPageLayout>
  );
}
