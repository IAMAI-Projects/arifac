import Link from "next/link";
import StaticPageLayout, { ContentSection } from "@/components/StaticPageLayout";

export default function ResourcesPage() {
  return (
    <StaticPageLayout
      label="Resources"
      title="Reference Materials for AML/CFT Capability"
      description="Access curated materials and practical resources supporting implementation readiness across the financial crime prevention ecosystem."
    >
      <ContentSection
        eyebrow="Knowledge Base"
        title="Curated ARIFAC Resource Library"
        description="Stay informed on AML/CFT laws, regulatory circulars, and implementation guidance. Some resources are available only to registered members."
      >
        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              title: "Regulatory Circulars and Notifications",
              text: "Track updates from FIU-IND and related regulators relevant to reporting entities.",
              href: "/regulatory-updates",
              cta: "Open Regulatory Updates",
            },
            {
              title: "Compliance FAQs",
              text: "Quick answers on reporting obligations, programme participation, and practical implementation points.",
              href: "/faqs",
              cta: "Browse FAQs",
            },
            {
              title: "Programmes and Learning Tracks",
              text: "Understand capability-building formats including workshops, webinars, and certifications.",
              href: "/programmes",
              cta: "See Programmes",
            },
            {
              title: "Membership Resources",
              text: "Understand eligibility, onboarding flow, and member collaboration opportunities.",
              href: "/member-benefits",
              cta: "View Member Benefits",
            },
          ].map((card) => (
            <article key={card.title} className="bg-white border border-slate-200 p-5 lg:p-6 hover:border-brand/30 transition-colors">
              <h3 className="text-[17px] font-bold text-navy mb-2">{card.title}</h3>
              <p className="text-slate-600 text-[14px] leading-relaxed mb-5">{card.text}</p>
              <Link href={card.href} className="text-[12px] font-bold text-brand uppercase tracking-[0.12em] hover:text-navy transition-colors">
                {card.cta}
              </Link>
            </article>
          ))}
        </div>
      </ContentSection>
    </StaticPageLayout>
  );
}
