import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

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
            blockType: 'cta',
            heading: 'Empower your institution with global compliance standards.',
            description: 'Join ARIFAC as an institutional member to gain access to exclusive forums, regulatory guidance, and specialized capability building programs.',
            primaryButton: { label: 'Apply for Membership', link: '/membership' },
            secondaryButton: { label: 'Contact Us', link: '/contact' },
          },
        ],
      },
    })
    results.push('Created home page with blocks')
  } else {
    results.push('Home page already exists')
  }

  // 2. Regulatory Updates
  const existingUpdates = await payload.find({ collection: 'regulatory-updates', limit: 1 })
  if (existingUpdates.docs.length === 0) {
    const updates = [
      { title: 'Regional Rural Banks – Know Your Customer Directions, 2025', date: '2026-01-04', referenceNumber: 'DOR.AML.REC.No.185/14.01.004/2025-26', category: 'kyc-cdd', issuingBody: 'rbi', link: '' },
      { title: 'Commercial Banks – Know Your Customer Directions, 2025', date: '2025-11-28', referenceNumber: 'DOR.AML.REC.No.88/14.01.002/2025-26', category: 'kyc-cdd', issuingBody: 'rbi', link: '' },
      { title: 'Small Finance Banks – Know Your Customer Directions, 2025', date: '2025-11-28', referenceNumber: 'DOR.AML.REC.No.119/14.01.007/2025-26', category: 'kyc-cdd', issuingBody: 'rbi', link: '' },
    ]
    for (const u of updates) await payload.create({ collection: 'regulatory-updates', data: u })
    results.push(`Created ${updates.length} regulatory updates`)
  } else {
    results.push('Regulatory updates already exist')
  }

  // 3. News Items
  const existingNews = await payload.find({ collection: 'news-items', limit: 1 })
  if (existingNews.docs.length === 0) {
    const items = [
      { text: 'ARIFAC Annual Conference 2026 — Registration Now Open', published: true },
      { text: 'New KYC Directions issued by RBI effective January 2026', published: true },
      { text: 'ARIFAC Certified Specialist program launches Q2 2026', published: true },
    ]
    for (const n of items) await payload.create({ collection: 'news-items', data: n })
    results.push(`Created ${items.length} news items`)
  } else {
    results.push('News items already exist')
  }

  // 4. Certifications
  const existingCerts = await payload.find({ collection: 'certifications', limit: 1 })
  if (existingCerts.docs.length === 0) {
    const certs = [
      { title: 'ARIFAC Certified Associate (AML/CFT)', level: 'Entry', focus: 'AML/CFT Fundamentals', category: 'Foundation' as const, format: 'Online Self-Paced', description: 'Entry-level AML/CFT literacy designed for role-based onboarding and fundamental compliance awareness.', duration: '40 hours' },
      { title: 'ARIFAC Certified Professional', level: 'Intermediate', focus: 'Applied Compliance & Monitoring', category: 'Professional' as const, format: 'Blended Learning', description: 'Focuses on applied compliance, transaction monitoring, and enhancing supervisory capabilities.', duration: '80 hours' },
      { title: 'ARIFAC Certified Specialist', level: 'Advanced', focus: 'Investigations & Forensics', category: 'Specialist' as const, format: 'Instructor-Led + Practicum', description: 'Deep domain expertise focusing on advanced investigations, money laundering typologies, and forensic analysis.', duration: '120 hours' },
      { title: 'ARIFAC Strategic Leadership in Compliance', level: 'Executive', focus: 'Governance & Strategic Oversight', category: 'Strategic' as const, format: 'Executive Program', description: 'Designed for senior compliance officers and board members overseeing institutional AML/CFT governance frameworks.', duration: '60 hours' },
    ]
    for (const c of certs) await payload.create({ collection: 'certifications', data: c })
    results.push(`Created ${certs.length} certifications`)
  } else {
    results.push('Certifications already exist')
  }

  // 5. Programmes global
  try {
    await payload.updateGlobal({
      slug: 'programmes',
      data: {
        engagementFormats: [
          { title: 'Capacity Building Workshops', description: 'Intensive workshops designed for compliance teams to strengthen operational capabilities in AML/CFT detection and reporting.' },
          { title: 'Regulatory Roundtables', description: 'Exclusive forums bringing together regulators, industry leaders, and compliance professionals for policy dialogue.' },
          { title: 'Digital Learning Modules', description: 'Self-paced e-learning programs covering emerging compliance topics, financial crime typologies, and regulatory updates.' },
        ],
        programmeSchedule: [
          { title: 'Q1 2026: AML Fundamentals Bootcamp', date: '2026-01-15', location: 'Mumbai', status: 'upcoming' },
          { title: 'Q2 2026: Advanced Transaction Monitoring', date: '2026-04-10', location: 'New Delhi', status: 'upcoming' },
        ],
        annualMeetings: [
          { title: 'ARIFAC Annual Conference 2026', date: '2026-09-15', location: 'Mumbai', status: 'upcoming' },
        ],
      },
    })
    results.push('Updated Programmes global')
  } catch {
    results.push('Programmes global update failed')
  }

  // 6. Sample static pages
  const pages = [
    { title: 'About ARIFAC', slug: 'about', pageType: 'about' as const, banner: { label: 'Who We Are', title: 'About ARIFAC', description: "India's premier alliance for anti-money laundering and counter-financing of terrorism compliance." } },
    { title: 'Contact Us', slug: 'contact', pageType: 'contact' as const, banner: { label: 'Get in Touch', title: 'Contact Us', description: 'Reach out to the ARIFAC team for membership inquiries, partnership opportunities, or general information.' } },
    { title: 'Membership', slug: 'membership', pageType: 'simple' as const, banner: { label: 'Join the Alliance', title: 'ARIFAC Membership', description: 'Institutional membership for reporting entities, fintech companies, and compliance professionals.' } },
    { title: 'Member Benefits', slug: 'member-benefits', pageType: 'simple' as const, banner: { label: 'Membership', title: 'Member Benefits', description: 'Discover the advantages of joining the ARIFAC network.' } },
  ]
  for (const p of pages) {
    const existing = await payload.find({ collection: 'pages', where: { slug: { equals: p.slug } }, limit: 1 })
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'pages', data: p })
      results.push(`Created page: ${p.slug}`)
    } else {
      results.push(`Page "${p.slug}" already exists`)
    }
  }

  return NextResponse.json({ success: true, results })
}
