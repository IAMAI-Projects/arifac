import StaticPageLayout, { ContentSection } from '@/components/StaticPageLayout'

export default function DisclaimerPage() {
  return (
    <StaticPageLayout
      label="Disclaimer"
      title="Disclaimer"
      description="Important information about the nature, scope, and limitations of ARIFAC as an industry platform."
    >
      <ContentSection eyebrow="General" title="General Disclaimer">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>ARIFAC (Alliance of Reporting Entities in India for AML/CFT) is an industry-led platform operated by the Internet and Mobile Association of India (IAMAI). ARIFAC is not a regulator, supervisory authority, or government body.</p>
          <p>Membership, participation, or engagement with ARIFAC does not confer any regulatory status, approval, licence, or compliance certification. ARIFAC does not grant approvals, licences, or compliance certifications of any kind.</p>
          <p>ARIFAC does not provide legal, regulatory, or financial advice. All information, materials, and resources shared through ARIFAC platforms are for knowledge-sharing and capacity-building purposes only.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Membership" title="Membership Disclaimer">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>ARIFAC membership is intended for industry collaboration, knowledge sharing, and capacity building. It does not substitute regulatory compliance obligations under applicable laws.</p>
          <p>Submission of a membership application does not guarantee membership. Approval is subject to ARIFAC&apos;s review and discretion.</p>
          <p>By submitting a membership application, applicants consent to the collection and processing of their information in accordance with ARIFAC&apos;s Privacy Policy and applicable data protection laws.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Programmes" title="Programmes & Events Disclaimer">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>Information about upcoming programmes, meetings, and events is subject to change. ARIFAC reserves the right to reschedule, modify, or cancel any programme or event at its discretion.</p>
          <p>Participation in ARIFAC programmes, training sessions, and knowledge forums does not confer any regulatory recognition or exemption under applicable laws.</p>
          <p>Certificates issued through ARIFAC certification programmes represent completion of the relevant learning pathway and do not constitute regulatory approval or professional licensing.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Regulatory" title="Regulatory Updates Disclaimer">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>Regulatory updates, circulars, and information shared on this platform are provided for informational and awareness purposes only. They do not constitute legal advice.</p>
          <p>Members and users are advised to refer to official regulatory sources and seek independent professional advice for compliance-related matters.</p>
          <p>ARIFAC makes reasonable efforts to ensure the accuracy and currency of information shared, but does not warrant completeness, accuracy, or timeliness of any regulatory updates published on this platform.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Resources" title="Resources & Materials Disclaimer">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>The materials provided in the resources section are for informational purposes only and do not constitute legal or regulatory advice.</p>
          <p>Reporting entities are advised to refer to official sources, including FIU-IND circulars and relevant statutes, to ensure statutory compliance.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Media" title="Media & Gallery Disclaimer">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>Images are used for documentation and illustrative purposes. Participation in ARIFAC programmes may imply consent for non-commercial use of photographs unless otherwise notified.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Liability" title="Limitation of Liability">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>ARIFAC, IAMAI, and their affiliates, officers, and representatives shall not be liable for any direct, indirect, incidental, or consequential damages arising from participation in ARIFAC activities.</p>
          <p>Members remain solely responsible for compliance with applicable laws and regulations and for seeking independent professional advice where required.</p>
          <p>ARIFAC shall not be responsible for any regulatory actions, compliance failures, penalties, or legal consequences arising from reliance on ARIFAC discussions, materials, or programmes.</p>
        </div>
      </ContentSection>

      <section className="py-10 lg:py-14 bg-neutral-50">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-3 block">Note</span>
            <p className="text-neutral-600 text-[15px] leading-[1.75]">
              This disclaimer is subject to change. Users are advised to review this page periodically. For queries, please contact <a href="mailto:help.arifac@iamai.in" className="text-brand font-medium hover:underline">help.arifac@iamai.in</a>.
            </p>
          </div>
        </div>
      </section>
    </StaticPageLayout>
  )
}
