import StaticPageLayout, { ContentSection } from "@/components/StaticPageLayout";

export default function HelpPage() {
  return (
    <StaticPageLayout
      label="Help"
      title="Support for Membership, Programmes, and Platform Access"
      description="Search the knowledge base or use the contact channels below to resolve queries related to ARIFAC participation."
    >
      <ContentSection
        eyebrow="Support"
        title="Need Assistance?"
        description="Our support team assists with membership, learning pathways, programme registrations, and access clarifications."
      >
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-slate-50 border border-slate-200 p-6">
            <h3 className="text-[13px] font-bold text-brand uppercase tracking-[0.18em] mb-3">Frequently Asked Questions</h3>
            <p className="text-[14px] text-slate-600 leading-relaxed mb-4">
              Start with the FAQ section for quick answers on eligibility, certifications, and participation workflows.
            </p>
            <a href="/faqs" className="text-[12px] font-bold uppercase tracking-wider text-brand hover:text-slate-900 transition-colors">
              Open FAQs
            </a>
          </div>

          <div className="bg-white border border-slate-200 p-6">
            <h3 className="text-[13px] font-bold text-brand uppercase tracking-[0.18em] mb-3">Direct Support</h3>
            <p className="text-[14px] text-slate-600 leading-relaxed mb-2">For unresolved issues, contact the ARIFAC support desk:</p>
            <a href="mailto:help.arifac@iamai.in" className="text-[15px] font-semibold text-slate-900 hover:text-brand transition-colors">
              help.arifac@iamai.in
            </a>
          </div>
        </div>
      </ContentSection>
    </StaticPageLayout>
  );
}
