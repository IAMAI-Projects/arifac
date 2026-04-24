import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

// --- Lexical rich text helpers ---

function lexicalText(text: string, format: number = 0) {
  return { type: 'text', text, version: 1, format, mode: 'normal' as const, style: '', detail: 0 }
}

function lexicalParagraph(text: string) {
  return {
    type: 'paragraph',
    children: [lexicalText(text)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
  }
}

function lexicalHeading(text: string, tag: 'h1' | 'h2' | 'h3' | 'h4' = 'h2') {
  return {
    type: 'heading',
    tag,
    children: [lexicalText(text)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  }
}

function lexicalList(items: string[]) {
  return {
    type: 'list',
    listType: 'bullet' as const,
    children: items.map((item, i) => ({
      type: 'listitem',
      children: [lexicalText(item)],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      value: i + 1,
    })),
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    start: 1,
    tag: 'ul' as const,
  }
}

function lexicalRoot(children: unknown[]) {
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

// --- Seed endpoint ---

export async function GET() {
  const payload = await getPayload({ config: configPromise })
  const results: string[] = []

  // 1. Home Page with blocks
  const existingHome = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1 })
  if (existingHome.docs.length === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home', slug: 'home', pageType: 'home',
        layout: [
          {
            blockType: 'hero',
            tagline: 'National Alliance for Financial Integrity',
            heading: "Strengthening India's",
            headingHighlight: 'Financial Integrity',
            headingTrail: 'Through Industry Collaboration',
            description: "ARIFAC (Alliance of Reporting Entities in India for AML/CFT) under the guidance of FIU-IND, enables collaboration, capacity building, and coordinated action to strengthen India's financial crime prevention ecosystem.",
            primaryButton: { label: 'Membership Benefits', link: '/member-benefits' },
            secondaryButton: { label: 'Explore Certifications', link: '/certifications' },
            sideCard: {
              strategicAlignmentText: "Operates in complete alignment with India's Financial Intelligence Unit and FATF global standards.",
              industryLedText: 'Driven by the joint action of scheduled banks, fintech pioneers, and regulatory nodal officers.',
            },
          },
          {
            blockType: 'capabilityMatrix',
            sectionHeading: 'The ARIFAC Mandate:',
            sectionHeadingHighlight: "Securing India's Financial Sovereignty.",
            sectionDescription: "As a national alliance, ARIFAC operates through three strategic channels to strengthen the integrity of India's financial ecosystem.",
            mandates: [
              { label: 'Institutional Alliance', title: 'National Industry Ecosystem', description: 'ARIFAC serves as the unified industry platform, bridging the gap between reporting entities, fintech pioneers, and regulatory nodal officers.', linkText: 'Our Mission', linkRef: '/about' },
              { label: 'Regulatory Intelligence', title: 'Strategic Actionable Insights', description: 'We translate complex global mandates and FIU-India circulars into tactical compliance frameworks for institutional readiness.', linkText: 'View Intelligence', linkRef: '/regulatory-updates' },
              { label: 'Operational Excellence', title: 'Capability & Skill Building', description: 'Specialized training pathways designed to standardise AML/CFT literacy and enhance the investigative capabilities of compliance professionals.', linkText: 'Explore Training', linkRef: '/certifications' },
            ],
          },
          {
            blockType: 'stats',
            stats: [
              { label: 'Reporting Entities', value: '2,500+' },
              { label: 'Officers Trained', value: '15,000+' },
              { label: 'Sectors Represented', value: '18+' },
              { label: 'Years of Collaboration', value: '10+' },
            ],
          },
          {
            blockType: 'featuredPrograms',
            sectionEyebrow: 'Capability Building',
            sectionHeading: 'Professional Certification Framework',
            sectionDescription: "Advancing the investigative and compliance capabilities of India's financial workforce through standardized, role-based literacy and specialist training.",
            viewAllText: 'View Certifications', viewAllLink: '/certifications',
            programs: [
              { title: 'ARIFAC Certified Associate (AML/CFT)', category: 'Foundation Level', description: 'Entry-level AML/CFT literacy designed for role-based onboarding and fundamental compliance awareness.', link: '/certifications/associate', image: '/cert-associate.png' },
              { title: 'ARIFAC Certified Professional', category: 'Professional Level', description: 'Focuses on applied compliance, transaction monitoring, and enhancing supervisory capabilities for daily operations.', link: '/certifications/professional', image: '/cert-professional.png' },
              { title: 'ARIFAC Certified Specialist', category: 'Specialist Level', description: 'Deep domain expertise focusing on advanced investigations, money laundering typologies, and forensic analysis.', link: '/certifications/specialist', image: '/cert-specialist.png' },
            ],
          },
          {
            blockType: 'regulatoryDashboard',
            sectionEyebrow: 'Regulatory Intelligence',
            sectionHeading: 'Stay Ahead of Evolving Frameworks',
            sectionDescription: 'ARIFAC centralizes critical updates from FIU-IND, RBI, SEBI, and IRDAI to ensure your reporting systems are always in sync with national mandates.',
            ctaText: 'Access Full Archive', ctaLink: '/regulatory-updates',
          },
          {
            blockType: 'partnerships',
            label: 'Partnerships',
            heading: 'Built on shared standards',
            description: 'ARIFAC unites regulatory bodies, industry stakeholders, legal experts, and academicians to strengthen every dimension of financial compliance.',
            guidanceCard: {
              label: 'Strategic Guidance',
              title: 'Financial Intelligence Unit \u2013 India',
              logoUrl: '/fiu-logo.png',
            },
            disclaimer: 'ARIFAC is an industry-led platform and does not grant approvals, licenses, or compliance certifications.',
          },
        ],
      },
    })
    results.push('Created home page with blocks')
  } else {
    // Update existing home page with latest layout and ensure published
    const homeDoc = existingHome.docs[0]
    await payload.update({
      collection: 'pages',
      id: homeDoc.id,
      data: {
        layout: [
          {
            blockType: 'hero',
            tagline: 'National Alliance for Financial Integrity',
            heading: "Strengthening India's",
            headingHighlight: 'Financial Integrity',
            headingTrail: 'Through Industry Collaboration',
            description: "ARIFAC (Alliance of Reporting Entities in India for AML/CFT) under the guidance of FIU-IND, enables collaboration, capacity building, and coordinated action to strengthen India's financial crime prevention ecosystem.",
            primaryButton: { label: 'Membership Benefits', link: '/member-benefits' },
            secondaryButton: { label: 'Explore Certifications', link: '/certifications' },
            sideCard: {
              strategicAlignmentText: "Operates in complete alignment with India's Financial Intelligence Unit and FATF global standards.",
              industryLedText: 'Driven by the joint action of scheduled banks, fintech pioneers, and regulatory nodal officers.',
            },
          },
          {
            blockType: 'capabilityMatrix',
            sectionHeading: 'The ARIFAC Mandate:',
            sectionHeadingHighlight: "Securing India's Financial Sovereignty.",
            sectionDescription: "As a national alliance, ARIFAC operates through three strategic channels to strengthen the integrity of India's financial ecosystem.",
            mandates: [
              { label: 'Institutional Alliance', title: 'National Industry Ecosystem', description: 'ARIFAC serves as the unified industry platform, bridging the gap between reporting entities, fintech pioneers, and regulatory nodal officers.', linkText: 'Our Mission', linkRef: '/about' },
              { label: 'Regulatory Intelligence', title: 'Strategic Actionable Insights', description: 'We translate complex global mandates and FIU-India circulars into tactical compliance frameworks for institutional readiness.', linkText: 'View Intelligence', linkRef: '/regulatory-updates' },
              { label: 'Operational Excellence', title: 'Capability & Skill Building', description: 'Specialized training pathways designed to standardise AML/CFT literacy and enhance the investigative capabilities of compliance professionals.', linkText: 'Explore Training', linkRef: '/certifications' },
            ],
          },
          {
            blockType: 'stats',
            stats: [
              { label: 'Reporting Entities', value: '2,500+' },
              { label: 'Officers Trained', value: '15,000+' },
              { label: 'Sectors Represented', value: '18+' },
              { label: 'Years of Collaboration', value: '10+' },
            ],
          },
          {
            blockType: 'featuredPrograms',
            sectionEyebrow: 'Capability Building',
            sectionHeading: 'Professional Certification Framework',
            sectionDescription: "Advancing the investigative and compliance capabilities of India's financial workforce through standardized, role-based literacy and specialist training.",
            viewAllText: 'View Certifications', viewAllLink: '/certifications',
            programs: [
              { title: 'ARIFAC Certified Associate (AML/CFT)', category: 'Foundation Level', description: 'Entry-level AML/CFT literacy designed for role-based onboarding and fundamental compliance awareness.', link: '/certifications/associate', image: '/cert-associate.png' },
              { title: 'ARIFAC Certified Professional', category: 'Professional Level', description: 'Focuses on applied compliance, transaction monitoring, and enhancing supervisory capabilities for daily operations.', link: '/certifications/professional', image: '/cert-professional.png' },
              { title: 'ARIFAC Certified Specialist', category: 'Specialist Level', description: 'Deep domain expertise focusing on advanced investigations, money laundering typologies, and forensic analysis.', link: '/certifications/specialist', image: '/cert-specialist.png' },
            ],
          },
          {
            blockType: 'regulatoryDashboard',
            sectionEyebrow: 'Regulatory Intelligence',
            sectionHeading: 'Stay Ahead of Evolving Frameworks',
            sectionDescription: 'ARIFAC centralizes critical updates from FIU-IND, RBI, SEBI, and IRDAI to ensure your reporting systems are always in sync with national mandates.',
            ctaText: 'Access Full Archive', ctaLink: '/regulatory-updates',
          },
          {
            blockType: 'partnerships',
            label: 'Partnerships',
            heading: 'Built on shared standards',
            description: 'ARIFAC unites regulatory bodies, industry stakeholders, legal experts, and academicians to strengthen every dimension of financial compliance.',
            guidanceCard: {
              label: 'Strategic Guidance',
              title: 'Financial Intelligence Unit \u2013 India',
              logoUrl: '/fiu-logo.png',
            },
            disclaimer: 'ARIFAC is an industry-led platform and does not grant approvals, licenses, or compliance certifications.',
          },
        ],
        _status: 'published',
      } as never,
    })
    results.push('Updated home page with latest layout')
  }

  // Publish all existing documents that have NULL _status
  for (const col of ['pages', 'regulatory-updates', 'certifications', 'news-items', 'members'] as const) {
    const unpublished = await payload.find({
      collection: col,
      where: { _status: { not_equals: 'published' } },
      limit: 500,
      draft: true,
    })
    for (const doc of unpublished.docs) {
      await payload.update({ collection: col, id: doc.id, data: { _status: 'published' } as never })
    }
    if (unpublished.docs.length > 0) {
      results.push(`Published ${unpublished.docs.length} ${col} documents`)
    }
  }

  // 2. Regulatory Updates, News Items, Certifications (independent — run in parallel)
  const [updatesResult, newsResult, certsResult] = await Promise.all([
    // 2a. Regulatory Updates
    (async () => {
      const existingUpdates = await payload.find({ collection: 'regulatory-updates', limit: 1, draft: true })
      if (existingUpdates.docs.length === 0) {
        const updates = [
          // RBI – KYC Directions (10)
          { title: 'Commercial Banks – Know Your Customer Directions, 2025', date: '2025-11-28', referenceNumber: 'DOR.AML.REC.No.88/14.01.002/2025-26', category: 'kyc-cdd' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'Small Finance Banks – Know Your Customer Directions, 2025', date: '2025-11-28', referenceNumber: 'DOR.AML.REC.No.119/14.01.007/2025-26', category: 'kyc-cdd' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'Payments Banks – Know Your Customer Directions, 2025', date: '2025-11-28', referenceNumber: 'DOR.AML.REC.No.137/14.01.009/2025-26', category: 'kyc-cdd' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'Local Area Banks – Know Your Customer Directions, 2025', date: '2025-11-28', referenceNumber: 'DOR.AML.REC.No.162/14.01.008/2025-26', category: 'kyc-cdd' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'Urban Cooperative Banks – Know Your Customer Directions, 2025', date: '2025-11-28', referenceNumber: 'DOR.AML.REC.No.210/14.01.006/2025-26', category: 'kyc-cdd' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'Rural Cooperative Banks – Know Your Customer Directions, 2025', date: '2025-11-28', referenceNumber: 'DOR.AML.REC.No.235/14.01.005/2025-26', category: 'kyc-cdd' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'All India Financial Institutions – Know Your Customer Directions, 2025', date: '2025-11-28', referenceNumber: 'DOR.AML.REC.No.254/14.01.011/2025-26', category: 'kyc-cdd' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'Non-Banking Financial Companies – Know Your Customer Directions, 2025', date: '2025-11-28', referenceNumber: 'DOR.AML.REC.No.280/14.01.003/2025-26', category: 'kyc-cdd' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'Asset Reconstruction Companies – Know Your Customer Directions, 2025', date: '2025-11-28', referenceNumber: 'DOR.AML.REC.No.296/14.01.010/2025-26', category: 'kyc-cdd' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'Regional Rural Banks – Know Your Customer Directions, 2025', date: '2026-01-04', referenceNumber: 'DOR.AML.REC.No.185/14.01.004/2025-26', category: 'kyc-cdd' as const, issuingBody: 'rbi' as const, link: '' },
          // RBI – Fraud / Cyber Risk (6)
          { title: 'Master Directions on Fraud Risk Management in Commercial Banks (incl. RRBs) and AIFIs', date: '2024-07-15', referenceNumber: 'DOS.CO.FMG.SEC.No.5/23.04.001/2024-25', category: 'fraud-cyber' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'Master Directions on Fraud Risk Management in Urban / State / Central Cooperative Banks', date: '2024-07-15', referenceNumber: 'DOS.CO.FMG.SEC.No.6/23.04.001/2024-25', category: 'fraud-cyber' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'Master Directions on Fraud Risk Management in Non-Banking Financial Companies (incl. HFCs)', date: '2024-07-15', referenceNumber: 'DOS.CO.FMG.SEC.No.7/23.04.001/2024-25', category: 'fraud-cyber' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'Master Directions on Frauds – Classification and Reporting by Commercial Banks and Select FIs', date: '2016-07-01', referenceNumber: 'DBS.CO.CFMC.BC.No.1/23.04.001/2016-17', category: 'aml-cft' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'Master Direction on Information Technology Governance, Risk, Controls and Assurance Practices', date: '2024-04-10', referenceNumber: 'DoS.CO.CSITEG/SEC.7/31.01.015/2023-24', category: 'fraud-cyber' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'Cyber Security Framework in Banks', date: '2016-06-02', referenceNumber: 'DBS.CO/CSITE/BC.11/33.01.001/2015-16', category: 'fraud-cyber' as const, issuingBody: 'rbi' as const, link: '' },
          // RBI – Compliance & Governance (3)
          { title: 'Master Direction – RBI (Outsourcing of Information Technology Services) Directions, 2023', date: '2024-04-10', referenceNumber: 'RBI/2023-24/95 | DoS.CO.CSITE.SEC.7/31.01.015/2023-24', category: 'compliance-governance' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'Master Circular – Prudential Norms on Income Recognition, Asset Classification & Provisioning (IRACP)', date: '2023-04-01', referenceNumber: 'RBI/2023-24/07 | DOR.STR.REC.5/21.04.048/2023-24', category: 'compliance-governance' as const, issuingBody: 'rbi' as const, link: '' },
          { title: 'Guidelines on Management of Operational Risk (Basel III / Standardised Approach)', date: '2022-02-17', referenceNumber: 'DOR.MRG.REC.93/00-00-007/2021-22', category: 'compliance-governance' as const, issuingBody: 'rbi' as const, link: '' },
          // FIU-IND – AML / CFT (3)
          { title: 'AML & CFT Guidelines for Reporting Entities Providing Services Related to Virtual Digital Assets (VDAs)', date: '2023-03-10', referenceNumber: 'F.No.9-8/2023/COMPL/FIUIND', category: 'aml-cft' as const, issuingBody: 'fiu-ind' as const, link: '' },
          { title: 'AML & CFT Guidelines for Reporting Entities – Designated Non-Financial Businesses and Professions (DNFBP)', date: '2023-07-04', referenceNumber: 'FIUIND/DNFBP/2023', category: 'aml-cft' as const, issuingBody: 'fiu-ind' as const, link: '' },
          { title: 'Revised AML/CFT Guidelines for VDA Service Providers (Enhanced KYC – selfie verification, geo-location, penny-drop)', date: '2025-09-15', referenceNumber: 'F.No. 9-8/2023/COMPL/FIUIND-Pt-II', category: 'aml-cft' as const, issuingBody: 'fiu-ind' as const, link: '' },
          // SEBI (6)
          { title: 'Master Circular – Guidelines on AML Standards and CFT / Obligations of Securities Market Intermediaries under PMLA 2002', date: '2024-06-06', referenceNumber: 'SEBI/HO/MLSD/SEC5/P/CIR/2024/083', category: 'aml-cft' as const, issuingBody: 'sebi' as const, link: '' },
          { title: 'Master Circular on Know Your Client (KYC) Norms for the Securities Market', date: '2023-10-12', referenceNumber: 'SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169', category: 'kyc-cdd' as const, issuingBody: 'sebi' as const, link: '' },
          { title: 'Uploading of KYC Information by KYC Registration Agencies (KRAs) to Central KYC Records Registry (CKYCRR)', date: '2024-06-27', referenceNumber: 'SEBI/HO/MIRSD/SEC-3/P/CIR/2024/088', category: 'kyc-cdd' as const, issuingBody: 'sebi' as const, link: '' },
          { title: 'Guidelines in Pursuance of Amendment to SEBI KYC Registration Agency (KRA) Regulations, 2011', date: '2025-01-15', referenceNumber: 'NSE Circular ISC66053', category: 'kyc-cdd' as const, issuingBody: 'sebi' as const, link: '' },
          { title: 'Publishing Investor Charter for KYC (Know Your Client) Registration Agencies (KRAs) on their Websites', date: '2025-05-15', referenceNumber: 'SEBI/HO/MIRSD/PODFATF/P/CIR/2025/62', category: 'kyc-cdd' as const, issuingBody: 'sebi' as const, link: '' },
          { title: 'Cyber Security & Cyber Resilience Framework for SEBI-Registered Intermediaries', date: '2023-12-28', referenceNumber: 'SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2025/119', category: 'fraud-cyber' as const, issuingBody: 'sebi' as const, link: '' },
          // IRDAI (2)
          { title: 'IRDAI Master Guidelines on Anti-Money Laundering / Counter Financing of Terrorism (AML/CFT) for all Insurers', date: '2022-08-01', referenceNumber: 'IRDAI/SDD/GDL/AML/062/01/2022', category: 'aml-cft' as const, issuingBody: 'irdai' as const, link: '' },
          { title: 'Amendment to Master Guidelines on Anti-Money Laundering / Counter Financing of Terrorism (AML/CFT) 2022', date: '2025-08-01', referenceNumber: 'IRDAI/IID/CIR/MISC/177/10/2023', category: 'aml-cft' as const, issuingBody: 'irdai' as const, link: '' },
        ]
        for (const u of updates) await payload.create({ collection: 'regulatory-updates', data: u })
        return `Created ${updates.length} regulatory updates`
      }
      return 'Regulatory updates already exist'
    })(),
    // 2b. News Items
    (async () => {
      const existingNews = await payload.find({ collection: 'news-items', limit: 1 })
      if (existingNews.docs.length === 0) {
        const items = [
          { text: 'ARIFAC Annual Conference 2026 — Registration Now Open', published: true },
          { text: 'New KYC Directions issued by RBI effective January 2026', published: true },
          { text: 'ARIFAC Certified Specialist program launches Q2 2026', published: true },
        ]
        for (const n of items) await payload.create({ collection: 'news-items', data: n })
        return `Created ${items.length} news items`
      }
      return 'News items already exist'
    })(),
    // 2c. Certifications (always re-create)
    (async () => {
      const existingCerts = await payload.find({ collection: 'certifications', limit: 500, draft: true })
      for (const doc of existingCerts.docs) {
        await payload.delete({ collection: 'certifications', id: doc.id })
      }
      {
        const certs = [
          {
            title: 'ARIFAC Certified Associate (AML/CFT)',
            level: 'ACF-L1',
            focus: 'AML/CFT Foundations',
            category: 'Foundation' as const,
            format: 'Online',
            description: 'Entry-level AML/CFT literacy and role-based onboarding. Build a strong foundation with practical understanding of KYC, transaction monitoring, and financial crime risk indicators within the Indian regulatory framework. Designed for entry-level professionals across reporting entities and learners aspiring to build a career in compliance, risk, and financial crime prevention.',
            duration: 'Self-paced',
            curriculum: [
              { item: 'AML/CFT Foundations & Regulatory Framework' },
              { item: 'KYC, CKYC & Data Governance' },
              { item: 'Transaction Monitoring Basics' },
              { item: 'Financial Crime Risk Indicators' },
              { item: 'PMLA 2002 & Indian Regulatory Requirements' },
              { item: 'FATF Standards Overview' },
            ],
          },
          {
            title: 'ARIFAC Certified Professional',
            level: 'ACF-L2',
            focus: 'Applied Compliance & Monitoring',
            category: 'Professional' as const,
            format: 'Online',
            description: 'Applied compliance, monitoring, and supervisory capability. Designed for mid-level professionals responsible for transaction monitoring, STR filing, and day-to-day compliance operations across reporting entities.',
            duration: 'Self-paced',
            curriculum: [
              { item: 'Transaction Monitoring & STR Filing' },
              { item: 'Fraud Detection in Payments' },
              { item: 'Merchant Onboarding & Due Diligence' },
              { item: 'Data Analytics for AML Monitoring' },
              { item: 'AI/ML in Fraud Detection' },
              { item: 'Cross-border AML & Remittance Monitoring' },
            ],
          },
          {
            title: 'ARIFAC Certified Specialist',
            level: 'ACF-L3',
            focus: 'Investigations & Typologies',
            category: 'Specialist' as const,
            format: 'Online',
            description: 'Deep domain expertise in financial crime investigations, typologies, and advanced compliance. For experienced professionals handling complex cases, regulatory interpretation, and specialist risk domains.',
            duration: 'Self-paced',
            curriculum: [
              { item: 'Advanced AML Investigations & Typologies' },
              { item: 'Financial Crime Typologies & Case Studies' },
              { item: 'Mule Account Networks & Syndicates' },
              { item: 'Advanced Crypto Forensics & AML' },
              { item: 'Sanctions Screening & Evasion' },
              { item: 'Working with Law Enforcement Agencies' },
            ],
          },
          {
            title: 'ARIFAC Certified Leader',
            level: 'ACF-L4',
            focus: 'Governance & Strategy',
            category: 'Strategic' as const,
            format: 'Online',
            description: 'Strategic oversight, policy design, and institutional leadership in AML/CFT. For senior leaders and board members responsible for enterprise-wide financial crime governance, risk culture, and regulatory engagement.',
            duration: 'Self-paced',
            curriculum: [
              { item: 'AML Governance, Board Oversight & Risk Culture' },
              { item: 'Enterprise AML Risk Framework' },
              { item: 'Financial Crime Strategy & Transformation' },
              { item: 'Regulatory Engagement & Policy Design' },
              { item: 'Global AML Standards (FATF, BIS, IOSCO)' },
              { item: 'Crisis Management & Fraud Response' },
            ],
          },
          {
            title: 'Compliance Training Programme for All Employees',
            level: 'CTP',
            focus: 'Organisation-wide Compliance',
            category: 'Foundation' as const,
            format: 'Online',
            description: 'Foundational AML/CFT compliance training designed for all employees across reporting entities. Ensures organisation-wide awareness of financial crime risks, regulatory obligations, and reporting responsibilities.',
            duration: 'Self-paced',
            curriculum: [
              { item: 'AML/CFT Awareness Fundamentals' },
              { item: 'Reporting Obligations & Responsibilities' },
              { item: 'Recognising Suspicious Activity' },
              { item: 'Internal Escalation Procedures' },
            ],
          },
        ]
        for (const c of certs) await payload.create({ collection: 'certifications', data: c as any })
        return `Created ${certs.length} certifications`
      }
    })(),
  ])
  results.push(updatesResult, newsResult, certsResult)

  // 3. Programmes global
  try {
    await payload.updateGlobal({
      slug: 'programmes',
      data: {
        banner: {
          label: 'Programmes',
          title: 'Consolidated Ecosystem Engagement Framework',
          description: 'ARIFAC facilitates structured collaboration between reporting entities, regulators, and domain experts through multiple active engagement channels.',
        },
        sectionHeadings: {
          engagementStrategy: 'Engagement Strategy',
          programmeSchedule: 'Programme Schedule',
          recentConsultations: 'Recent Consultations',
          annualMeetings: 'Annual Meetings & Regulatory Fora',
        },
        engagementFormats: [
          { title: 'Industry Consultations', description: 'Addressing emerging financial risks and operational challenges within the AML/CFT' },
          { title: 'Training & Capacity Building', description: 'Programmes to strengthen internal capabilities across compliance, risk, legal, operations, and business functions.' },
          { title: 'Certification & Learning Pathways', description: 'Structured learning pathways to build internal expertise and support professional development of AML/CFT teams.' },
          { title: 'Working Groups', description: 'Focused forums for collaborative problem-solving and knowledge exchange on specific financial crime prevention themes.' },
          { title: 'Knowledge Sessions & Webinars', description: 'Regular sessions bringing together industry experts and practitioners to share insights on evolving risks and trends.' },
          { title: 'Flagship Engagements', description: 'Larger ecosystem engagements to enable broader industry participation and collaboration on financial integrity.' },
        ],
        programmeSchedule: [
          { name: 'N-SAFE: National Summit on Anti-Financial Crime Enforcement', type: 'Flagship Event', date: '6 April 2026' },
          { name: 'OVDs, Digital Verification & V-CIP Enablement', type: 'Training Session', date: 'April 2026' },
          { name: 'STR Filing and Typologies', type: 'Training Session', date: 'April 2026' },
          { name: 'Cross-Border AML: Managing Risk Across Jurisdictions, Counterparties & Data Flows', type: 'Training Session', date: 'April 2026' },
          { name: 'Strengthening Transparency and Infrastructure in the Derivatives Market', type: 'Training Session', date: 'May 2026' },
          { name: 'CDD and Verification: Customer Due Diligence in Practice', type: 'Training Session', date: 'May 2026' },
        ],
        recentConsultations: [
          { name: 'AML and Compliance in Mutual Fund Industry', type: 'Training Session', date: '27 Feb 2026' },
          { name: 'Artificial Intelligence in AML, Fraud Monitoring & Compliance Functions', type: 'Training Session', date: '20 Feb 2026' },
          { name: 'Central KYC Records Registry - Compliance by REs, Issues & Challenges', type: 'Training Session', date: '30 Jan 2026' },
          { name: 'Follow-up Q&A: PMLA Requirements, Screening & Transaction Monitoring for PAs', type: 'Training Session', date: '27 Jan 2026' },
          { name: 'PMLA Requirements, Screening & Transaction Monitoring for PAs', type: 'Training Session', date: '22 Jan 2026' },
        ],
        annualMeetings: [
          { name: 'Inaugural National Chapter Meeting', date: 'August 4, 2023', location: 'New Delhi' },
          { name: '2nd National Chapter Meeting', date: 'October 19, 2023', location: 'Mumbai' },
          { name: '3rd National Chapter Meeting', date: 'July 24, 2024', location: 'Mumbai' },
          { name: '4th National Chapter Meeting', date: 'March 07, 2025', location: 'Mumbai' },
          { name: '5th National Chapter Meeting', date: 'December 10, 2025', location: 'Mumbai' },
        ],
      },
    })
    results.push('Updated Programmes global')
  } catch {
    results.push('Programmes global update failed')
  }

  // 4. Core static pages (about with structured fields, contact, membership, member-benefits with body content)
  const corePages = [
    {
      title: 'About ARIFAC',
      slug: 'about',
      pageType: 'about' as const,
      banner: {
        label: 'About ARIFAC',
        title: "India's Industry Platform for Financial Crime Prevention.",
        description: "A national platform facilitating collaboration, capacity building, and regulatory alignment across India's financial ecosystem.",
      },
      whySection: {
        eyebrow: 'The Challenge',
        heading: 'Why ARIFAC',
        description: "India's rapidly evolving digital financial ecosystem — driven by real-time payments, digital onboarding, and platform-led services — has significantly expanded both opportunity and risk. The increasing scale and sophistication of financial crime requires a coordinated industry response.",
        threats: [
          { label: 'Cyber fraud' },
          { label: 'Mule account networks' },
          { label: 'Identity misuse' },
          { label: 'Platform abuse' },
        ],
        alignedWith: {
          description: "ARIFAC has been established to provide a structured platform for industry stakeholders to collectively strengthen readiness, share insights, and address emerging risks — aligned with national and global frameworks.",
          items: [
            { label: 'Legislation', value: 'PMLA' },
            { label: 'Reporting', value: 'FIU-IND' },
            { label: 'Global Standards', value: 'FATF' },
            { label: 'International', value: 'IMF / Basel / Egmont' },
          ],
        },
      },
      whatSection: {
        eyebrow: 'Operational Focus',
        heading: 'What ARIFAC Does',
        description: 'ARIFAC operates as a collaborative platform focused on enabling industry-wide capability and coordination.',
        focusAreas: [
          {
            number: '01',
            title: 'Industry Engagement & Consultations',
            points: [
              { text: 'Closed-door roundtables' },
              { text: 'Stakeholder engagement across financial and digital ecosystems' },
              { text: 'Address emerging risks, typologies, and implementation challenges' },
            ],
          },
          {
            number: '02',
            title: 'Training & Certification',
            points: [
              { text: 'AML/CFT learning programmes' },
              { text: 'Certification and continuous professional development pathways' },
              { text: 'Role-based training aligned to compliance and operational functions' },
            ],
          },
          {
            number: '03',
            title: 'Knowledge & Typologies',
            points: [
              { text: 'Sharing of financial crime typologies and case-based insights' },
              { text: 'Development of industry knowledge resources' },
              { text: 'Dissemination of best practices across sectors' },
            ],
          },
          {
            number: '04',
            title: 'Ecosystem Coordination',
            points: [
              { text: 'Engagement across banks, fintechs, payment systems, VDAs and intermediaries' },
              { text: 'Cross-sector collaboration including financial services, telecom, and digital platforms' },
              { text: 'Support for collective response to systemic risks' },
            ],
          },
        ],
      },
      whoSection: {
        eyebrow: 'Membership',
        heading: 'Who Should Engage',
        description: "ARIFAC's platform is designed for all entities and professionals operating within India's AML/CFT regulatory perimeter.",
        ctaLabel: 'Explore Membership',
        ctaLink: '/membership',
        audiences: [
          { name: 'Banks & NBFCs', subtitle: 'Scheduled commercial banks, cooperative banks, NBFCs' },
          { name: 'Payment Aggregators & PSPs', subtitle: 'Payment service providers, aggregators, UPI ecosystem' },
          { name: 'Fintech Platforms', subtitle: 'Lending, wealth, insurance, neo-banking platforms' },
          { name: 'Virtual Asset Service Providers', subtitle: 'Crypto exchanges, custodians, VDA intermediaries' },
          { name: 'PMLA Intermediaries', subtitle: 'All intermediaries under PMLA, 2002' },
          { name: 'Compliance Officers & MLROs', subtitle: 'Principal officers, designated directors, reporting heads' },
          { name: 'Risk Professionals', subtitle: 'Operational risk, fraud risk, enterprise risk teams' },
          { name: 'AML Investigators', subtitle: 'Financial crime analysts, investigation units, forensic teams' },
        ],
      },
    },
    {
      title: 'Contact Us',
      slug: 'contact',
      pageType: 'contact' as const,
      banner: { label: 'Get in Touch', title: 'Contact Us', description: 'Reach out to the ARIFAC team for membership inquiries, partnership opportunities, or general information.' },
      body: lexicalRoot([
        lexicalHeading('Get in Touch', 'h2'),
        lexicalParagraph('For all inquiries related to ARIFAC membership, programmes, certifications, or partnership opportunities, please reach out to our team.'),
        lexicalHeading('Office Address', 'h3'),
        lexicalParagraph('ARIFAC Secretariat, Internet and Mobile Association of India (IAMAI), Mumbai, Maharashtra, India.'),
        lexicalHeading('Email', 'h3'),
        lexicalParagraph('For general inquiries: info@arifac.org'),
        lexicalParagraph('For membership: membership@arifac.org'),
      ]),
    },
    {
      title: 'Engagement with ARIFAC',
      slug: 'membership',
      pageType: 'membership' as const,
      banner: {
        label: 'Membership',
        title: 'Engagement with ARIFAC',
        description: 'Engagement is structured to enable reporting entities and ecosystem stakeholders to actively participate in consultations, strengthen capacity, and contribute to knowledge-sharing initiatives aligned with AML/CFT frameworks.',
      },
      membershipIntro: {
        subheading: 'ARIFAC offers two engagement pathways — Membership (Paid, for reporting entities) and Affiliate (Free, for individuals). Both provide structured access to programmes, knowledge, and the compliance network.',
      },
      membershipCta: {
        label: 'Apply to be a Member / Affiliate',
        link: `${process.env.NEXT_PUBLIC_MEMBER_PORTAL_URL || ''}/register`,
      },
      benefits: [
        {
          category: 'Engagement & Governance',
          items: [
            { title: 'Regulatory Engagement', description: 'Direct participation in consultations, policy dialogues, and expert forums alongside regulators and policymakers.' },
            { title: 'Governance Participation', description: 'Full voting rights within ARIFAC — eligible to elect and be elected to the Steering Committee and Working Groups.' },
            { title: 'Closed-Door Interactions', description: 'Exclusive access to policy and regulatory closed-room sessions, structured by domain.' },
          ],
        },
        {
          category: 'Learning & Capacity',
          items: [
            { title: 'Training & Certification', description: 'Access to L1\u2013L5 certification programmes at preferential member pricing.' },
            { title: 'Workshops & Masterclasses', description: 'Full access to advanced sessions led by practitioners and subject matter experts.' },
            { title: 'Webinars & Awareness', description: 'Unrestricted access to all webinars and awareness sessions.' },
          ],
        },
        {
          category: 'Intelligence & Research',
          items: [
            { title: 'Knowledge & Intelligence', description: 'Comprehensive access to typologies, case studies, learnings, and risk intelligence curated for the industry.' },
            { title: 'Typology & Risk Alerts', description: 'Real-time FIU-driven insights and alerts to stay ahead of emerging risks.' },
            { title: 'Reports', description: 'Full access to all ARIFAC published reports.' },
            { title: 'Participation in Reports', description: 'Preferential inclusion in whitepapers, industry reports, and key ecosystem initiatives.' },
          ],
        },
        {
          category: 'Ecosystem & Visibility',
          items: [
            { title: 'Events & Summits', description: 'Participation and speaking opportunities at ARIFAC, IAMAI, PCI and FCC-organised summits (e.g. N-SAFE and GFF).' },
            { title: 'Ecosystem Directory', description: 'Full access to the directory of member institutions and certified professionals.' },
            { title: 'Brand Visibility', description: 'Recognised as an ARIFAC Member across the website and all publications.' },
          ],
        },
      ],
      responsibilities: [
        { title: 'Confidentiality', description: 'Maintain confidentiality of discussions and shared information' },
        { title: 'Compliance', description: 'Ensure compliance with applicable AML/CFT laws and regulatory obligations' },
        { title: 'No Misuse', description: 'Avoid misuse of ARIFAC platforms, forums, or affiliation' },
        { title: 'Good Faith', description: 'Act in good faith and contribute constructively to industry discussions' },
      ],
      validityTerms: [
        { text: 'Membership is valid for a year from the date of onboarding and will be renewed annually' },
        { text: 'Membership is subject to renewal in accordance with ARIFAC policies' },
        { text: 'Access may be restricted upon expiry until renewal is completed' },
      ],
      feeTables: {
        turnoverBased: [
          { tier: 'Up to 5 Cr', fee: '\u20B925,000' },
          { tier: '5\u201325 Cr', fee: '\u20B950,000' },
          { tier: '25\u2013100 Cr', fee: '\u20B91,00,000' },
          { tier: '100\u2013500 Cr', fee: '\u20B91,50,000' },
          { tier: '500\u20132,000 Cr', fee: '\u20B93,00,000' },
          { tier: 'Above 2,000 Cr', fee: '\u20B95,00,000' },
        ],
        aumBased: [
          { tier: 'Up to 500 Cr', fee: '\u20B925,000' },
          { tier: '500\u20131,000 Cr', fee: '\u20B950,000' },
          { tier: '1,000\u201310,000 Cr', fee: '\u20B91,00,000' },
          { tier: '10,000\u201350,000 Cr', fee: '\u20B91,50,000' },
          { tier: '50,000\u20131,00,000 Cr', fee: '\u20B93,00,000' },
          { tier: 'Above 1,00,000 Cr', fee: '\u20B95,00,000' },
        ],
      },
    },
    {
      title: 'Member Benefits',
      slug: 'member-benefits',
      pageType: 'simple' as const,
      banner: { label: 'Membership', title: 'Member Benefits', description: 'Discover the advantages of joining the ARIFAC network.' },
      body: lexicalRoot([
        lexicalHeading('Member Benefits', 'h2'),
        lexicalParagraph('ARIFAC members gain access to a comprehensive suite of resources designed to enhance compliance capabilities and industry connectivity.'),
        lexicalList([
          'Access to exclusive regulatory roundtables and industry consultations',
          'Discounted rates on ARIFAC certification programmes',
          'Early access to regulatory intelligence and compliance advisories',
          'Networking opportunities with compliance leaders across sectors',
          'Access to ARIFAC knowledge repository and best practice guides',
          'Participation in working groups and task forces',
        ]),
      ]),
    },
  ]

  for (const p of corePages) {
    const existing = await payload.find({ collection: 'pages', where: { slug: { equals: p.slug } }, limit: 1 })
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'pages', data: p as never })
      results.push(`Created page: ${p.slug}`)
    } else {
      await payload.update({ collection: 'pages', id: existing.docs[0].id, data: p as never })
      results.push(`Updated page: ${p.slug}`)
    }
  }

  // 5. Additional static pages (all footer-linked pages not covered above)
  const additionalPages = [
    {
      title: 'Our Members', slug: 'members', pageType: 'simple' as const,
      banner: { label: 'Alliance', title: 'Our Members', description: 'Organizations and institutions that form the ARIFAC network.' },
      body: lexicalRoot([
        lexicalHeading('ARIFAC Member Network', 'h2'),
        lexicalParagraph('ARIFAC brings together a diverse network of reporting entities, financial institutions, and compliance professionals from across India\'s financial ecosystem.'),
        lexicalHeading('Member Categories', 'h3'),
        lexicalList(['Scheduled Commercial Banks', 'Non-Banking Financial Companies (NBFCs)', 'Payment Aggregators and Payment Service Providers', 'Fintech Platforms and Digital Lending Companies', 'Virtual Digital Asset Service Providers', 'Insurance Companies and Intermediaries']),
      ]),
    },
    {
      title: 'Meetings & Events', slug: 'meetings', pageType: 'simple' as const,
      banner: { label: 'Events', title: 'Meetings & Events', description: 'Stay updated on ARIFAC conferences, workshops, and industry forums.' },
      body: lexicalRoot([
        lexicalHeading('Upcoming Events', 'h2'),
        lexicalParagraph('ARIFAC organizes regular industry meetings, capacity building workshops, and regulatory roundtables throughout the year.'),
        lexicalParagraph('Check back for upcoming event announcements and registration details.'),
      ]),
    },
    {
      title: 'Gallery', slug: 'gallery', pageType: 'simple' as const,
      banner: { label: 'Media', title: 'Gallery', description: 'Highlights from ARIFAC events, conferences, and workshops.' },
      body: lexicalRoot([
        lexicalHeading('Event Gallery', 'h2'),
        lexicalParagraph('Browse photos and highlights from ARIFAC events, conferences, and industry forums.'),
      ]),
    },
    {
      title: 'Training Leads', slug: 'training-leads', pageType: 'simple' as const,
      banner: { label: 'Training', title: 'Training Leads', description: 'Connect with ARIFAC-certified training professionals and programme coordinators.' },
      body: lexicalRoot([
        lexicalHeading('ARIFAC Training Leads', 'h2'),
        lexicalParagraph('ARIFAC training leads are experienced compliance professionals who coordinate capacity building programmes across sectors.'),
        lexicalParagraph('For training inquiries, please contact the ARIFAC secretariat.'),
      ]),
    },
    {
      title: 'Sectoral Nodal Officers', slug: 'sectoral-nodal-officers', pageType: 'simple' as const,
      banner: { label: 'Network', title: 'Sectoral Nodal Officers', description: 'Key points of contact across sectors for AML/CFT coordination.' },
      body: lexicalRoot([
        lexicalHeading('Sectoral Nodal Officers', 'h2'),
        lexicalParagraph('Sectoral Nodal Officers serve as the primary coordination points between ARIFAC and reporting entities within their respective sectors.'),
        lexicalParagraph('They facilitate information sharing, coordinate training initiatives, and support regulatory compliance across their sector.'),
      ]),
    },
    {
      title: 'Resource Center', slug: 'resources', pageType: 'simple' as const,
      banner: { label: 'Knowledge', title: 'Resource Center', description: 'Access compliance guides, regulatory references, and training materials.' },
      body: lexicalRoot([
        lexicalHeading('ARIFAC Resource Center', 'h2'),
        lexicalParagraph('Access a curated collection of compliance resources, regulatory guidance documents, and training materials.'),
        lexicalList(['AML/CFT Compliance Guides', 'Regulatory Circulars and Notifications', 'Training Materials and Case Studies', 'Best Practice Frameworks', 'Industry Reports and Publications']),
      ]),
    },
    {
      title: 'Help Center', slug: 'help', pageType: 'simple' as const,
      banner: { label: 'Support', title: 'Help Center', description: 'Find answers to common questions and get support.' },
      body: lexicalRoot([
        lexicalHeading('How Can We Help?', 'h2'),
        lexicalParagraph('Find answers to frequently asked questions about ARIFAC membership, programmes, and services.'),
        lexicalParagraph('For additional support, contact us at support@arifac.org.'),
      ]),
    },
    {
      title: 'FAQs', slug: 'faqs', pageType: 'simple' as const,
      banner: { label: 'Support', title: 'Frequently Asked Questions', description: 'Common questions about ARIFAC, membership, and our programmes.' },
      body: lexicalRoot([
        lexicalHeading('What is ARIFAC?', 'h3'),
        lexicalParagraph('ARIFAC (Alliance of Reporting Entities in India for AML/CFT) is a national industry platform facilitating collaboration, capacity building, and regulatory alignment for financial crime prevention.'),
        lexicalHeading('Who can become a member?', 'h3'),
        lexicalParagraph('ARIFAC membership is open to all reporting entities under PMLA, fintech companies, compliance professionals, and other stakeholders in India\'s AML/CFT ecosystem.'),
        lexicalHeading('How do I apply for certification?', 'h3'),
        lexicalParagraph('Visit the Certifications page to explore available programmes. Applications can be submitted through the ARIFAC portal.'),
        lexicalHeading('How can I attend ARIFAC events?', 'h3'),
        lexicalParagraph('ARIFAC events are announced on the Meetings & Events page. Members receive priority registration and discounted rates.'),
      ]),
    },
    {
      title: 'Privacy Policy', slug: 'privacy', pageType: 'simple' as const,
      banner: { label: 'Legal', title: 'Privacy Policy', description: 'How ARIFAC handles your personal information.' },
      body: lexicalRoot([
        lexicalHeading('Privacy Policy', 'h2'),
        lexicalParagraph('ARIFAC is committed to protecting your privacy. This policy outlines how we collect, use, and safeguard personal information provided through our website and services.'),
        lexicalHeading('Information We Collect', 'h3'),
        lexicalParagraph('We collect information you provide directly, including contact details for membership applications, event registrations, and certification enrolments.'),
        lexicalHeading('How We Use Information', 'h3'),
        lexicalParagraph('Your information is used to process membership applications, communicate about programmes and events, and improve our services.'),
        lexicalHeading('Contact', 'h3'),
        lexicalParagraph('For privacy-related inquiries, contact us at privacy@arifac.org.'),
      ]),
    },
    {
      title: 'Terms of Use', slug: 'terms-of-use', pageType: 'simple' as const,
      banner: { label: 'Legal', title: 'Terms of Use', description: 'Terms and conditions for using the ARIFAC website and services.' },
      body: lexicalRoot([
        lexicalHeading('Terms of Use', 'h2'),
        lexicalParagraph('By accessing and using the ARIFAC website, you agree to these terms and conditions.'),
        lexicalHeading('Use of Content', 'h3'),
        lexicalParagraph('All content on this website is the property of ARIFAC and IAMAI. Content may not be reproduced without written permission.'),
        lexicalHeading('Disclaimer', 'h3'),
        lexicalParagraph('ARIFAC provides information for general compliance awareness purposes. It does not constitute legal or regulatory advice.'),
      ]),
    },
    {
      title: 'Legal & Compliance', slug: 'disclaimer', pageType: 'simple' as const,
      banner: { label: 'Legal', title: 'Legal & Compliance', description: 'Important legal notices and compliance disclaimers.' },
      body: lexicalRoot([
        lexicalHeading('Legal Disclaimer', 'h2'),
        lexicalParagraph('The information provided on this website is for general informational purposes and does not constitute legal, financial, or regulatory advice.'),
        lexicalParagraph('ARIFAC makes no warranties regarding the accuracy or completeness of information provided. Users should consult qualified professionals for specific compliance guidance.'),
      ]),
    },
    {
      title: 'Membership Application', slug: 'membership/launching-soon', pageType: 'simple' as const,
      banner: { label: 'Membership', title: 'Membership Application', description: 'Online membership application portal — launching soon.' },
      body: lexicalRoot([
        lexicalHeading('Coming Soon', 'h2'),
        lexicalParagraph('The ARIFAC online membership application portal is currently under development.'),
        lexicalParagraph('In the meantime, please contact membership@arifac.org to begin your membership application process.'),
      ]),
    },
  ]

  for (const p of additionalPages) {
    const existing = await payload.find({ collection: 'pages', where: { slug: { equals: p.slug } }, limit: 1 })
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'pages', data: p as never })
      results.push(`Created page: ${p.slug}`)
    } else {
      await payload.update({ collection: 'pages', id: existing.docs[0].id, data: p as never })
      results.push(`Updated page: ${p.slug}`)
    }
  }

  // 7. Members collection
  const memberNames = [
    '1Pay Mobileware Private Limited', 'ANQ Digital Finserv', 'Abhibha Technologies Private Limited',
    'Adyen India Tech Hub Private Limited', 'Airpay Payment Services Private Limited', 'Airtel Payments Bank',
    'Ajcon Edufin Private Limited', 'Ajcon Global Services Limited', 'Amazon Pay India Private Limited',
    'American Express Banking Corporation', 'Angelic Infotech Pvt Ltd', 'Axis Bank Limited',
    'Axis Securities Limited', 'BNP Paribas', 'Bajaj Finserv', 'Balancehero India Private Limited',
    'Bandhan Bank Ltd.', 'Bank of America', 'Bank of Baroda', 'Bank of China India Branch',
    'Bank of India', 'Bank of Maharashtra', 'Barclays Bank PLC',
    'Bharat Co operative Bank (Mumbai) Ltd.', 'Bitcipher Labs LLP', 'CCAvenue', 'CSB Bank Ltd',
    'Canara Bank', 'Canara HSBC Life Insurance Company Limited', 'Capstocks and Securities India Pvt Ltd',
    'Cashfree', 'Central Bank of India', 'Chatterjee & Tripathi Consultancy Private Limited',
    'Citibank', 'City Union Bank', 'CoinSwitch - Bitcipher Labs', 'Computer Age Management Services Ltd',
    'Cosmos Cooperative Bank', 'Cushman Wakefield', 'DBS Bank', 'DCB Bank', 'Deutsche Bank',
    'Dhanlaxmi Bank Limited', 'Digiotech Solutions Private Limited', 'Dow Jones Consulting India Pvt Limited',
    'Dreamplug PayTech Solutions Private Limited', 'E Meditek Global Pvt Ltd', 'Easebuzz Private Limited',
    'Emirates NBD Bank (P.J.S.C)', 'Equitas Small Finance Bank', 'Excelium Technologies Pvt Ltd',
    'Facctum IT Solutions India Pvt Ltd', 'Federal Bank Ltd', 'Fincare Small Finance Bank', 'Fincrypt LLP',
    'Finlogic Technologies India Private Limited', 'Fino Payments Bank Limited',
    'Fintelekt Advisory Services Private Limited', 'Fios Compliance Private Limited', 'FirstRand Bank',
    'Freecharge Payment Technologies Private Limited', 'Fullerton India', 'Futuretek Commerce Pvt Ltd',
    'GP Parsik Sahakari Bank Ltd', 'Giottus Technologies Pvt Ltd', 'Global Payments Asia Pacific Pvt Ltd',
    'Gobrisk Technologies Pvt Ltd', 'Google India Digital Services Private Limited',
    'HDFC Asset Management Co Ltd.', 'HDFC Bank Ltd', 'HDFC Mutual Fund', 'HSBC Bank',
    'Hiveloop Internet Private Limited', 'ICICI Bank', 'IDBI Bank Ltd', 'IDFC First Bank Ltd',
    'IndiaIdeas.com Limited (BillDesk)', 'Indiaforensic Center of Studies', 'Indian Overseas Bank',
    'IndusInd Bank', 'Infibeam Avenues Limited', 'Innoviti Technologies Private Limited',
    'Ixsight Technologies Private Limited', 'JLL', 'JP Morgan Chase Bank', 'Jalgaon Janata Sahakari Bank',
    'Jammu & Kashmir Bank', 'Jana Small Finance Bank Ltd', 'Jio Finance Ltd', 'Jio Financial Services Ltd',
    'Jio Payments Bank Ltd', 'Karad Urban Co-Operative Bank', 'Karnataka Bank Ltd', 'Karur Vysya Bank Ltd',
    'Kotak Mahindra Bank Ltd', 'Letzpay Solution Pvt Ltd', 'LexisNexis Risk Solutions Inc',
    'Lightningnodes Technologies Pvt Ltd', 'LivQuik Technology (India) Private Limited',
    'London Stock Exchange Group (World-Check)', 'Lyra Network Private Limited', 'MUFG',
    'Mahanagar Cooperative Bank Ltd', 'Mashreq Bank PSC', 'Mindless Pandora Tech Solutions Private Limited',
    'Mizuho Bank', 'NKGSB Co-op. Bank Ltd', 'NPCI', 'NSDL Database Management Ltd', 'NSE',
    'NTT Data Payment Services India Ltd', 'Nainital Bank', 'Neblio Technologies P Ltd',
    'New India Cooperative Bank Ltd', 'Nextgendev Solutions Pvt. Ltd',
    'Nomura Capital (India) Private Limited (NCIPL)',
    'Nomura Fixed Income Securities Private Limited (NFIS)', 'Ola Financial Services Pvt Ltd',
    'One Mobikwik Systems Limited', 'One97 Communications', 'PayTM Payments Bank',
    'PayU Payments Private Limited', 'Paygate India Private Limited', 'Payglocal', 'Paymate India Ltd',
    'Payments Council of India', 'Payoneer India Private Limited', 'Paypal Payments Pvt Ltd',
    'Paysharp Private Limited', 'Phi Commerce Private Limited',
    'PhonePe Insurance Broking Services Private Limited', 'PhonePe Private Limited',
    'PhonePe Wealth Broking Private Limited', 'Punjab National Bank',
    'Quantum Data Engines India Private Limited', 'RBL Bank Ltd', 'Rabobank',
    'Razorpay Software Private Limited', 'Reliance Payment Solutions Limited', 'SBI Life Insurance',
    'SBM Bank', 'SRS Live Technologies Pvt Ltd', 'SabPaisa', 'Saraswat Bank', 'Scotiabank, India',
    'South Indian Bank Ltd', 'Standard Chartered Bank', 'State Bank of India',
    'Stripe India Private Limited', 'Suncrypto', 'Suryoday Small Finance Bank Ltd',
    'Tapits Technologies Private Limited', 'Tata AIG Life',
    'The Kalupur Commercial Co Op Bank Limited', 'Transak Technology India Pvt Ltd',
    'Tri O Tech Solutions Private Limited', 'Tyche Payment Solutions Private Limited', 'UBS AG, India',
    'UBS Securities India Private Limited', 'UCO Bank', 'Ujjivan Small Finance Bank',
    'Unimoni Enterprise Solutions Pvt Ltd', 'Unimoni Financial Services Ltd', 'Union Bank of India Ltd',
    'Unocoin Technologies Pvt Ltd', 'WazirX - Zanmai Labs Pvt Ltd',
    'Western Union Services India Pvt. Ltd.', 'Worldline ePayments India Private Limited',
    'Wunderbaked Technologies Private Limited', 'Xsilica Software Solutions Private Limited', 'Yes Bank',
    'ZIGRAM', 'Zaak Epayment Services Private Limited', 'Zebpay - Awlencan Innovations',
    'Zerodha Broking Limited',
  ]

  const existingMembers = await payload.find({ collection: 'members', limit: 1, draft: true })
  if (existingMembers.totalDocs === 0) {
    for (const name of memberNames) {
      await payload.create({ collection: 'members', data: { name, _status: 'published' } as never })
    }
    results.push(`Created ${memberNames.length} members`)
  } else {
    results.push(`Members already seeded (${existingMembers.totalDocs} exist)`)
  }

  return NextResponse.json({ success: true, results })
}
