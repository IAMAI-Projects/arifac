import StaticPageLayout, { ContentSection } from "@/components/StaticPageLayout";

const terms = [
  "These Terms govern access to and use of the ARIFAC platform and related digital services.",
  "ARIFAC is an industry-led initiative operated by IAMAI and does not act as a regulatory authority.",
  "Users must use the platform only for lawful purposes and in compliance with applicable laws.",
  "Unauthorized access attempts, scraping, disruption, misrepresentation, or misuse of platform content are prohibited.",
  "All platform materials, including branding and training content, are protected by applicable intellectual property laws.",
  "ARIFAC may monitor platform usage and may suspend or restrict access in case of misuse or non-compliance.",
  "Platform content is for educational and informational purposes and does not constitute legal or compliance advice.",
  "Users remain responsible for ensuring compliance with applicable AML/CFT laws, including PMLA obligations.",
  "ARIFAC's liability is limited to the maximum extent permitted by law.",
  "These Terms are governed by the laws of India, with jurisdiction in New Delhi courts.",
];

export default function TermsOfUsePage() {
  return (
    <StaticPageLayout
      label="Terms of Use"
      title="Website Terms of Use"
      description="By accessing or using the ARIFAC platform, you acknowledge and agree to these terms."
    >
      <ContentSection
        eyebrow="Legal Framework"
        title="Core Terms"
        description="For clarifications on these terms, contact ARIFAC legal and compliance support."
      >
        <div className="space-y-3">
          {terms.map((item, idx) => (
            <article key={item} className="border border-slate-200 bg-white p-4 lg:p-5">
              <p className="text-[10px] font-black text-brand uppercase tracking-[0.16em] mb-2">Section {idx + 1}</p>
              <p className="text-[14px] text-slate-700 leading-relaxed">{item}</p>
            </article>
          ))}
        </div>
      </ContentSection>
    </StaticPageLayout>
  );
}
