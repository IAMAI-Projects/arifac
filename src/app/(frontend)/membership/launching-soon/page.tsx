import Link from "next/link";
import StaticPageLayout, { ContentSection } from "@/components/StaticPageLayout";

export default function MembershipLaunchingSoonPage() {
  return (
    <StaticPageLayout
      label="Membership"
      title="Membership Module Launching Soon"
      description="This section is currently under maintenance. Please check back shortly for the online application workflow."
    >
      <ContentSection
        eyebrow="Notice"
        title="Application Workflow Temporarily Unavailable"
        description="You can still connect with ARIFAC Secretariat for participation queries and onboarding guidance."
      >
        <div className="bg-white border border-neutral-200 p-6 lg:p-8 flex flex-col lg:flex-row justify-between gap-5 items-start lg:items-center">
          <p className="text-[14px] text-neutral-600 leading-relaxed max-w-2xl">
            For immediate interest registration and eligibility questions, reach out at help.arifac@iamai.in.
          </p>
          <Link href="/contact" className="bg-brand text-white px-5 py-3 text-[12px] font-bold uppercase tracking-wider hover:bg-brand-dark transition-colors">
            Contact Secretariat
          </Link>
        </div>
      </ContentSection>
    </StaticPageLayout>
  );
}
