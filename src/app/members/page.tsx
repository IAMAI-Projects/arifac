import StaticPageLayout, { ContentSection } from "@/components/StaticPageLayout";

const members = [
  "Amazon Pay India Private Limited",
  "American Express Banking Corporation",
  "CoinSwitch - Bitcipher Labs",
  "Google India Digital Services Private Limited",
  "IndiaIdeas.com Limited (BillDesk)",
  "Jio Financial Services Ltd",
  "NSDL Database Management Ltd",
  "One Mobikwik Systems Limited",
  "PayU Payments Private Limited",
  "Payoneer India Private Limited",
  "Razorpay Software Private Limited",
  "Reliance Payment Solutions Limited",
  "Stripe India Private Limited",
  "Suryoday Small Finance Bank Ltd",
  "Ujjivan Small Finance Bank",
  "and other leading organizations in the ecosystem",
];

export default function MembersPage() {
  return (
    <StaticPageLayout
      label="Members"
      title="Our Members"
      description="ARIFAC's network includes leading organizations across banking, fintech, payments, and allied sectors."
    >
      <ContentSection
        eyebrow="Ecosystem"
        title="Representative Member Institutions"
        description="The current network includes 175 organizations across the financial crime prevention ecosystem."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {members.map((name) => (
            <div key={name} className="border border-slate-200 bg-white px-4 py-3 text-[13px] font-medium text-slate-700 hover:border-brand/30 transition-colors">
              {name}
            </div>
          ))}
        </div>
      </ContentSection>
    </StaticPageLayout>
  );
}
