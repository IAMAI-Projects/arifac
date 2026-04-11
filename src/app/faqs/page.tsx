import StaticPageLayout, { ContentSection } from "@/components/StaticPageLayout";

const faqItems = [
  {
    q: "Who can apply for ARIFAC membership?",
    a: "Membership is designed for reporting entities and stakeholders in India's digital and financial ecosystem seeking collaboration, capability building, and AML/CFT alignment.",
  },
  {
    q: "Does ARIFAC membership provide regulatory approval?",
    a: "No. ARIFAC is an industry-led platform and does not provide approvals, licenses, or compliance certifications.",
  },
  {
    q: "What kind of programmes does ARIFAC conduct?",
    a: "ARIFAC conducts consultations, training programmes, certification pathways, working groups, and knowledge sessions focused on financial crime prevention.",
  },
  {
    q: "Are all resources publicly available?",
    a: "Some resources are open, while selected consultation papers, typologies, and specialized materials may be restricted to registered members.",
  },
  {
    q: "How can my organization nominate staff for certifications?",
    a: "Organizations can nominate employees through ARIFAC programme channels once enrolment windows are announced.",
  },
];

export default function FaqsPage() {
  return (
    <StaticPageLayout
      label="FAQs"
      title="Frequently Asked Questions"
      description="Everything you need to know about ARIFAC membership, programmes, and AML/CFT capability building."
    >
      <ContentSection title="Answers to Common Queries">
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <article key={item.q} className="border border-slate-200 bg-white p-5 lg:p-6">
              <div className="text-[10px] font-black text-brand tracking-[0.16em] uppercase mb-2">Q{String(index + 1).padStart(2, "0")}</div>
              <h3 className="text-[17px] font-bold text-navy mb-3">{item.q}</h3>
              <p className="text-[14px] text-slate-600 leading-relaxed">{item.a}</p>
            </article>
          ))}
        </div>
      </ContentSection>
    </StaticPageLayout>
  );
}
