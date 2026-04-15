import StaticPageLayout, { ContentSection } from '@/components/StaticPageLayout'

export default function PrivacyPolicyPage() {
  return (
    <StaticPageLayout
      label="Legal Documentation"
      title="Privacy Policy & Data Protection"
      description="Aligned with the Digital Personal Data Protection Act, 2023 — India. Effective: 23rd March, 2026."
    >
      <ContentSection eyebrow="Section 1" title="Introduction">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>This Privacy Policy describes how ARIFAC (Alliance of Reporting Entities in India for AML/CFT), operated by the Internet and Mobile Association of India (IAMAI) under the guidance of the Financial Intelligence Unit – India (FIU-IND), collects, uses, processes, stores, and protects personal data of individuals (&quot;Data Principals&quot;) who access or use ARIFAC platforms, including its website, Learning Management Program (LMP), membership services, and certification programs.</p>
          <p>By accessing or using ARIFAC services, you consent to the collection and processing of your personal data in accordance with this Policy and applicable laws, including the Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;) and the Digital Personal Data Protection Rules, 2025 and any amendments thereto.</p>
          <p className="font-medium text-neutral-700">PLEASE READ THIS PRIVACY POLICY BEFORE USING ARIFAC&apos;S SERVICES. BY USING ARIFAC&apos;S SERVICES OR SUBMITTING THE INFORMATION, YOU (&apos;You&apos; or &apos;you&apos; or &apos;yourself&apos; or &apos;User&apos; or &apos;your&apos; or &apos;user&apos;) AGREE THAT YOU ARE OF THE AGE OF 18 YEARS OR ABOVE AND EXPRESSLY CONSENT TO THE PROCESSING AND USE OF THE INFORMATION ACCORDING TO THE PRIVACY POLICY.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 2" title="Scope of Policy">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>This Policy applies to all users of ARIFAC services, including: (i) Website visitors, (ii) Registered users, (iii) Learners and certification candidates, and (iv) Member organization representatives.</p>
          <p>This Policy covers personal data collected through digital platforms, forms, communications, and program participation. By registering on our platform for ARIFAC services, you specifically consent to the use and transmission/transfer/sharing of your personal data and information to provide the services to you.</p>
          <p>This Privacy Policy does not apply to companies or entities that ARIFAC does not own or control, or has no contractual relationship with. If you choose not to provide the personal information/personal data that we seek from you, then you may not be able to avail the ARIFAC services and we may also not be able to respond to any queries that you may have.</p>
          <p>ARIFAC (and its licensors, if applicable) owns exclusively and absolutely all rights, title and interest, including all related intellectual property rights, in the platform and the ARIFAC services, and any suggestions, ideas, improvements, enhancement requests, feedback, recommendations and other information provided by you relating to the platform and its services.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 3" title="Categories of Personal Data Collected">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>ARIFAC may collect and process the following categories of personal data:</p>
          <ul className="space-y-2.5 ml-1">
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" /><span><strong>Identity Information:</strong> Name, date of birth, photograph, Aadhaar/PAN/passport or other identification details (where required)</span></li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" /><span><strong>Contact Information:</strong> Email address, phone number, address</span></li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" /><span><strong>Professional Information:</strong> Employer details, designation, industry affiliation, work history</span></li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" /><span><strong>Educational and Certification Data:</strong> Course enrollment, progress, assessment results, certification status</span></li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" /><span><strong>Technical Data:</strong> IP address, device details, browser information, login activity</span></li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" /><span><strong>Audio-Visual Data:</strong> Video, audio, and screen recordings during remote proctored examinations</span></li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" /><span><strong>Transactional Data:</strong> Payment details (processed through authorised payment gateways)</span></li>
          </ul>
          <p>ARIFAC shall collect only such data as is necessary for lawful purposes.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 4" title="Purpose of Data Processing">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>Personal data shall be processed for lawful purposes including:</p>
          <ul className="space-y-2.5 ml-1">
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />User registration, onboarding, and account management</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Delivery of LMP training programs and certification services</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Conduct of examinations and identity verification</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Issuance, validation, and publication of certifications</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Communication of program updates, notifications, and support</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Compliance with legal, regulatory, and audit requirements</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Prevention of fraud, misuse, or unauthorised access</li>
          </ul>
          <p>Personal data shall not be processed for purposes incompatible with the above.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 5" title="Legal Basis and Consent">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>Processing of personal data shall be based on:</p>
          <ul className="space-y-2.5 ml-1">
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Consent provided by the Data Principal at the time of registration or use of services</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Legitimate uses permitted under applicable law</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Compliance with legal obligations, including regulatory or law enforcement requirements</li>
          </ul>
          <p>Users may withdraw consent where applicable, subject to consequences such as suspension of access to services.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 6" title="Data Sharing and Disclosure">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>ARIFAC may share personal data only under the following circumstances:</p>
          <ul className="space-y-2.5 ml-1">
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />With regulatory authorities or law enforcement agencies where required under applicable law</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />With service providers (e.g., LMS platforms, proctoring providers, payment gateways) under strict confidentiality obligations</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />With member organisations, where users are nominated participants (limited to program participation data)</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />For certification verification, including publication of certified user lists (name, organisation, certification status)</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />For business transfers: ARIFAC may sell, transfer or otherwise share some or all of its assets, including any personal information, in connection with a merger, acquisition, reorganisation or sale of assets or in the event of bankruptcy</li>
          </ul>
          <p>ARIFAC shall not sell personal data to third parties.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 7" title="Data Retention">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>Personal data shall be retained only for as long as necessary to fulfil the purposes outlined in this Policy, including:</p>
          <ul className="space-y-2.5 ml-1">
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Certification and audit records</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Legal and regulatory compliance</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Dispute resolution</li>
          </ul>
          <p>Upon expiry of retention requirements, data shall be securely deleted or anonymised.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 8" title="Data Security Measures">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>ARIFAC shall implement reasonable security safeguards, including:</p>
          <ul className="space-y-2.5 ml-1">
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Access controls and authentication mechanisms</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Encryption and secure data storage</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Monitoring and audit of system access</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Secure handling of proctoring data</li>
          </ul>
          <p>However, no system is completely secure, and ARIFAC does not guarantee absolute security.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 9" title="Rights of Data Principals">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>Under the DPDP Act, users (Data Principals) have the right to:</p>
          <ul className="space-y-2.5 ml-1">
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Access information about their personal data</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Request correction or updating of inaccurate data</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Request erasure of personal data (subject to legal limitations)</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Withdraw consent (where applicable)</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />Grievance redressal</li>
          </ul>
          <p>Requests may be submitted through the contact details provided in the Grievance Redressal section below.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 10" title="Obligations of Users (Data Principals)">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>Users shall ensure that:</p>
          <ul className="space-y-2.5 ml-1">
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />All personal data provided is accurate and up to date</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />They do not impersonate or provide false information</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-brand/40 mt-[9px] flex-shrink-0" />They comply with applicable laws and ARIFAC policies</li>
          </ul>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 11" title="Cross-Border Data Transfers">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>Personal data may be stored or processed in India or in jurisdictions permitted under applicable laws. ARIFAC shall ensure that such transfers comply with the DPDP Act and applicable safeguards.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 12" title="Cookies and Tracking Technologies">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>The ARIFAC website may use cookies and similar technologies to enhance user experience, analyse usage patterns, and improve services. Users may control cookie preferences through browser settings. If the User does not accept cookies, it may not be able to use all portions and functionality of the Platform.</p>
          <p>Third-party websites which are accessible from our platform via links, click-through or banner advertising may use cookies. However, it is important for us to inform you that we have no access or control over such cookies and do not accept responsibility with regards to them.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 13" title="Links to Third-Party Websites/Platforms">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>Our platform may contain links to other third-party websites/platforms. The User&apos;s use of websites/platforms to which the platform links is subject to the terms of use and privacy policies located on such third-party websites/platforms.</p>
          <p>ARIFAC absolutely disclaims any liability or responsibility for any disclosure by you or anyone on your behalf of any of your personal information/data, which may be posted on any parts of the platform.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 14" title="Usage Data">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>ARIFAC may also collect information that your browser sends whenever you visit our platform or when you access the platform by or through a mobile device (&quot;Usage Data&quot;).</p>
          <p>This Usage Data may include information such as your computer&apos;s internet protocol address (e.g. IP address), browser type, browser version, the pages of our Platform that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
          <p>When you access the platform by or through a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 15" title="Location Data">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>We may use and store information about your location if you give us permission to do so (&quot;Location Data&quot;). We use this data to provide features of our platform, to improve and customise our platform.</p>
          <p>You can enable or disable location services when you use our platform at any time, through your device settings.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 16" title="Grievance Redressal and Data Protection Contact">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>For any queries, requests, or grievances relating to personal data, users may contact the ARIFAC Data Protection / Grievance Officer at: <a href="mailto:help.arifac@iamai.in" className="text-brand font-medium hover:underline">help.arifac@iamai.in</a></p>
          <p>ARIFAC shall address grievances within a reasonable timeframe in accordance with applicable law.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 17" title="Limitation of Liability">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>ARIFAC shall not be liable for any unauthorised access, loss, or misuse of personal data or information arising from circumstances beyond its reasonable control, including user-side vulnerabilities or force majeure events.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 18" title="Amendments to this Policy">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>ARIFAC reserves the right to update or modify this Privacy Policy from time to time. Updated versions shall be published on the ARIFAC website. Users are advised to review the Policy periodically.</p>
          <p>Continued use of services shall constitute acceptance of such updates.</p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Section 19" title="Governing Law and Jurisdiction">
        <div className="space-y-4 text-neutral-600 text-[15px] leading-[1.75]">
          <p>This Privacy Policy shall be governed by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.</p>
        </div>
      </ContentSection>

      <section className="py-10 lg:py-14 bg-neutral-50">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-3 block">Acknowledgment</span>
            <p className="text-neutral-600 text-[15px] leading-[1.75]">
              By continuing to use our Platform, you acknowledge that you have read, understood, and agreed to be bound by this Privacy Policy and Data Protection Terms.
            </p>
            <p className="text-neutral-500 text-[13px] mt-4">Effective: 23rd March, 2026 &middot; DPDP Act, 2023 Aligned</p>
          </div>
        </div>
      </section>
    </StaticPageLayout>
  )
}
