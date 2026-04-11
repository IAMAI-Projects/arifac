import StaticPageLayout, { ContentSection } from "@/components/StaticPageLayout";

const meetingFormats = [
  "Training and Capacity Building",
  "Certification and Learning Pathways",
  "Working Groups",
  "Knowledge Sessions and Webinars",
  "Flagship Ecosystem Engagements",
];

export default function MeetingsPage() {
  return (
    <StaticPageLayout
      label="Meetings"
      title="Programme-Led Engagement Across the Ecosystem"
      description="ARIFAC programmes enable collaboration, capability building, and implementation alignment across India's financial and digital ecosystem."
    >
      <ContentSection
        eyebrow="Programme Formats"
        title="How ARIFAC Engagements Are Structured"
        description="ARIFAC addresses evolving financial crime risks through consultations, learning initiatives, working groups, and knowledge-led forums."
      >
        <div className="grid md:grid-cols-2 gap-4">
          {meetingFormats.map((item) => (
            <div key={item} className="bg-white border border-slate-200 px-5 py-4 text-[14px] font-semibold text-slate-900 hover:border-brand/30 transition-colors">
              {item}
            </div>
          ))}
        </div>
      </ContentSection>
    </StaticPageLayout>
  );
}
