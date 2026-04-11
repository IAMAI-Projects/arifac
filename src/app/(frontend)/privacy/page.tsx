import StaticPageLayout, { ContentSection } from "@/components/StaticPageLayout";

export default function PrivacyPage() {
  return (
    <StaticPageLayout
      label="Privacy"
      title="Privacy and Data Protection Notice"
      description="ARIFAC handles submitted information in line with applicable data protection requirements and platform policies."
    >
      <ContentSection
        eyebrow="Data Protection"
        title="How Information Is Used"
        description="By submitting forms or membership information, users consent to processing for onboarding, communication, and programme administration in accordance with applicable law."
      >
        <div className="grid md:grid-cols-2 gap-5">
          <article className="border border-neutral-200 bg-white p-5">
            <h3 className="text-[14px] font-bold text-neutral-900 mb-2">Purpose of Collection</h3>
            <p className="text-[14px] text-neutral-600 leading-relaxed">
              Information is used to evaluate participation, manage communication, and administer ARIFAC programmes and services.
            </p>
          </article>

          <article className="border border-neutral-200 bg-white p-5">
            <h3 className="text-[14px] font-bold text-neutral-900 mb-2">Consent and Compliance</h3>
            <p className="text-[14px] text-neutral-600 leading-relaxed">
              Users should provide accurate information and review legal pages periodically for updates on policy and disclosure terms.
            </p>
          </article>
        </div>
      </ContentSection>
    </StaticPageLayout>
  );
}
