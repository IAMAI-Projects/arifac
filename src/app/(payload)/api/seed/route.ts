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

  // 2. Regulatory Updates, News Items, Certifications (independent — run in parallel)
  const [updatesResult, newsResult, certsResult] = await Promise.all([
    // 2a. Regulatory Updates
    (async () => {
      const existingUpdates = await payload.find({ collection: 'regulatory-updates', limit: 1 })
      if (existingUpdates.docs.length === 0) {
        const updates = [
          { title: 'Regional Rural Banks – Know Your Customer Directions, 2025', date: '2026-01-04', referenceNumber: 'DOR.AML.REC.No.185/14.01.004/2025-26', category: 'kyc-cdd', issuingBody: 'rbi', link: '' },
          { title: 'Commercial Banks – Know Your Customer Directions, 2025', date: '2025-11-28', referenceNumber: 'DOR.AML.REC.No.88/14.01.002/2025-26', category: 'kyc-cdd', issuingBody: 'rbi', link: '' },
          { title: 'Small Finance Banks – Know Your Customer Directions, 2025', date: '2025-11-28', referenceNumber: 'DOR.AML.REC.No.119/14.01.007/2025-26', category: 'kyc-cdd', issuingBody: 'rbi', link: '' },
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
    // 2c. Certifications
    (async () => {
      const existingCerts = await payload.find({ collection: 'certifications', limit: 1 })
      if (existingCerts.docs.length === 0) {
        const certs = [
          { title: 'ARIFAC Certified Associate (AML/CFT)', level: 'Entry', focus: 'AML/CFT Fundamentals', category: 'Foundation' as const, format: 'Online Self-Paced', description: 'Entry-level AML/CFT literacy designed for role-based onboarding and fundamental compliance awareness.', duration: '40 hours' },
          { title: 'ARIFAC Certified Professional', level: 'Intermediate', focus: 'Applied Compliance & Monitoring', category: 'Professional' as const, format: 'Blended Learning', description: 'Focuses on applied compliance, transaction monitoring, and enhancing supervisory capabilities.', duration: '80 hours' },
          { title: 'ARIFAC Certified Specialist', level: 'Advanced', focus: 'Investigations & Forensics', category: 'Specialist' as const, format: 'Instructor-Led + Practicum', description: 'Deep domain expertise focusing on advanced investigations, money laundering typologies, and forensic analysis.', duration: '120 hours' },
          { title: 'ARIFAC Strategic Leadership in Compliance', level: 'Executive', focus: 'Governance & Strategic Oversight', category: 'Strategic' as const, format: 'Executive Program', description: 'Designed for senior compliance officers and board members overseeing institutional AML/CFT governance frameworks.', duration: '60 hours' },
        ]
        for (const c of certs) await payload.create({ collection: 'certifications', data: c })
        return `Created ${certs.length} certifications`
      }
      return 'Certifications already exist'
    })(),
  ])
  results.push(updatesResult, newsResult, certsResult)

  // 3. Programmes global
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
      title: 'Membership',
      slug: 'membership',
      pageType: 'simple' as const,
      banner: { label: 'Join the Alliance', title: 'ARIFAC Membership', description: 'Institutional membership for reporting entities, fintech companies, and compliance professionals.' },
      body: lexicalRoot([
        lexicalHeading('ARIFAC Membership', 'h2'),
        lexicalParagraph('ARIFAC membership is open to all reporting entities, fintech companies, and compliance professionals operating within India\'s AML/CFT regulatory framework.'),
        lexicalHeading('Membership Categories', 'h3'),
        lexicalList(['Institutional Members — Banks, NBFCs, payment aggregators, fintech platforms', 'Associate Members — Technology providers, consultancies, training institutions', 'Individual Members — Compliance officers, AML investigators, risk professionals']),
        lexicalHeading('How to Apply', 'h3'),
        lexicalParagraph('Submit your membership application through the ARIFAC portal. Applications are reviewed within 5-7 business days.'),
      ]),
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
      await payload.create({ collection: 'pages', data: p })
      results.push(`Created page: ${p.slug}`)
    } else {
      results.push(`Page "${p.slug}" already exists`)
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
      await payload.create({ collection: 'pages', data: p })
      results.push(`Created page: ${p.slug}`)
    } else {
      results.push(`Page "${p.slug}" already exists`)
    }
  }

  return NextResponse.json({ success: true, results })
}
