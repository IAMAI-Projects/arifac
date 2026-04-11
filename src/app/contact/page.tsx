import Link from "next/link";
import StaticPageLayout, { ContentSection } from "@/components/StaticPageLayout";

export default function ContactPage() {
  return (
    <StaticPageLayout
      label="Contact"
      title="Connect With ARIFAC Secretariat"
      description="Whether you are exploring membership, certification pathways, or strategic collaboration, our team can help route your request."
    >
      <ContentSection
        eyebrow="Get In Touch"
        title="Membership, Programmes, and Institutional Queries"
        description="ARIFAC is an industry-led initiative under the aegis of IAMAI. Reach out with details of your organization, intended engagement area, and preferred timelines."
      >
        <div className="grid lg:grid-cols-3 gap-5">
          {[
            {
              title: "Membership",
              detail: "Eligibility, onboarding process, and participation criteria for reporting entities and ecosystem stakeholders.",
              action: "/member-benefits",
              actionLabel: "View Membership",
            },
            {
              title: "Learning and Certification",
              detail: "Programme schedules, course pathways, and institution-level nominations for AML/CFT teams.",
              action: "/certifications",
              actionLabel: "Explore Certifications",
            },
            {
              title: "Consultations and Events",
              detail: "Closed-room consultations, thematic working groups, and ecosystem engagements across sectors.",
              action: "/meetings",
              actionLabel: "See Programmes",
            },
          ].map((item) => (
            <article key={item.title} className="bg-white border border-neutral-200 p-5 hover:border-brand/30 transition-colors">
              <h3 className="text-[16px] font-bold text-neutral-900 mb-2">{item.title}</h3>
              <p className="text-[14px] text-neutral-600 leading-relaxed mb-5">{item.detail}</p>
              <Link href={item.action} className="text-[12px] font-bold uppercase tracking-wider text-brand hover:text-neutral-900 transition-colors">
                {item.actionLabel}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8 bg-neutral-50 border border-neutral-200 p-6">
          <h3 className="text-[12px] font-bold text-brand uppercase tracking-[0.18em] mb-3">Primary Contact</h3>
          <p className="text-[15px] text-neutral-700 leading-relaxed mb-2">
            ARIFAC Secretariat
          </p>
          <a href="mailto:help.arifac@iamai.in" className="text-[15px] font-semibold text-neutral-900 hover:text-brand transition-colors">
            help.arifac@iamai.in
          </a>
          <p className="text-[13px] text-neutral-500 mt-4">
            Include your organization name, role, and objective to help us respond faster.
          </p>
        </div>
      </ContentSection>
    </StaticPageLayout>
  );
}
