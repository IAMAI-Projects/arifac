import Link from "next/link";
import StaticPageLayout, { ContentSection } from "@/components/StaticPageLayout";

const benefits = [
  "Participation in industry consultations and closed-room discussions",
  "Access to AML/CFT training and certification programmes",
  "Inclusion in working groups and knowledge forums",
  "Access to typologies, insights, and industry best practices",
  "Nomination pathways for employee certification and learning tracks",
  "Pricing discounts on selected learning programmes",
];

const onboardingSteps = [
  "Submit your membership application",
  "ARIFAC reviews alignment and eligibility",
  "Complete formalities and documentation",
  "Pay applicable membership fees",
  "Receive access to ARIFAC platforms and programmes",
];

export default function MemberBenefitsPage() {
  return (
    <StaticPageLayout
      label="Member Benefits"
      title="Membership for India's Financial Crime Prevention Ecosystem"
      description="A focused framework for reporting entities and ecosystem stakeholders seeking industry collaboration, capability building, and AML/CFT alignment."
    >
      <ContentSection
        eyebrow="Value"
        title="What Membership Enables"
        description="Membership is designed to strengthen capability, collaboration, and readiness across financial crime prevention functions."
      >
        <div className="grid lg:grid-cols-2 gap-5">
          {benefits.map((item) => (
            <div key={item} className="bg-white border border-slate-200 p-4 text-[14px] text-slate-700 leading-relaxed">
              {item}
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="Onboarding"
        title="Five-Step Membership Journey"
        description="Submission of an application does not guarantee membership. Approval is subject to ARIFAC review and discretion."
      >
        <div className="grid md:grid-cols-5 gap-3">
          {onboardingSteps.map((step, idx) => (
            <article key={step} className="border border-slate-200 bg-slate-50 p-4 min-h-[130px]">
              <div className="text-[10px] font-black text-brand tracking-[0.16em] uppercase mb-2">Step {idx + 1}</div>
              <p className="text-[13px] font-semibold text-navy leading-relaxed">{step}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 bg-navy text-white p-6 lg:p-8 flex flex-col lg:flex-row justify-between gap-5">
          <p className="text-[14px] text-slate-300 leading-relaxed max-w-2xl">
            Clarification: ARIFAC is operated by IAMAI as an industry initiative and does not function as a regulator or supervisory authority.
          </p>
          <Link href="/membership/launching-soon" className="bg-brand text-white px-5 py-3 text-[12px] font-bold uppercase tracking-wider hover:bg-white hover:text-navy transition-colors text-center">
            Start Application
          </Link>
        </div>
      </ContentSection>
    </StaticPageLayout>
  );
}
