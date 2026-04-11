import StaticPageLayout, { ContentSection } from "@/components/StaticPageLayout";

const clauses = [
  "ARIFAC is an industry-led platform operated by IAMAI and is not a regulator, supervisory authority, or government body.",
  "Membership or participation does not confer regulatory approval, license, exemption, or compliance certification.",
  "Information and materials shared through ARIFAC are for knowledge-sharing and capacity-building purposes only.",
  "ARIFAC does not provide legal, regulatory, or financial advice; entities must seek independent professional advice where needed.",
  "Programme schedules and events are subject to change and may be modified, rescheduled, or cancelled at ARIFAC's discretion.",
  "Completion certificates reflect programme completion and do not constitute regulatory approval or professional licensing.",
  "Users should refer to official regulatory sources for binding directions, circulars, and compliance obligations.",
  "Members remain solely responsible for compliance with applicable laws and obligations.",
  "ARIFAC is not liable for direct or indirect consequences arising from reliance on ARIFAC discussions, materials, or programmes.",
  "This disclaimer may be updated periodically; users should review this page for changes.",
];

export default function DisclaimerPage() {
  return (
    <StaticPageLayout
      label="Disclaimer"
      title="Important Platform Disclosures"
      description="Information about the nature, scope, and limitations of ARIFAC as an industry-led platform."
    >
      <ContentSection
        eyebrow="Legal Notice"
        title="Scope and Limitations"
        description="For clarifications, contact help.arifac@iamai.in."
      >
        <div className="space-y-3">
          {clauses.map((item, idx) => (
            <article key={item} className="border border-neutral-200 bg-white p-4 lg:p-5">
              <p className="text-[10px] font-black text-brand uppercase tracking-[0.16em] mb-2">Clause {String(idx + 1).padStart(2, "0")}</p>
              <p className="text-[14px] text-neutral-700 leading-relaxed">{item}</p>
            </article>
          ))}
        </div>
      </ContentSection>
    </StaticPageLayout>
  );
}
