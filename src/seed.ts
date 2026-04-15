import type { Payload } from 'payload'

function richTextParagraph(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text, version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

function richTextParagraphs(...texts: string[]) {
  return {
    root: {
      type: 'root',
      children: texts.map(text => ({
        type: 'paragraph',
        children: [{ type: 'text', text, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

const pages = [
  {
    title: 'Home',
    slug: 'home',
    pageType: 'home' as const,
    banner: {
      label: 'ARIFAC',
      title: 'Home',
      description: '',
    },
    layout: [
      {
        blockType: 'hero',
        tagline: 'Association of Reporting Entities for Indian Financial AML Coalition',
        heading: 'Strengthening India\'s',
        headingHighlight: 'Financial Intelligence',
        headingTrail: 'Ecosystem',
        description: 'ARIFAC is an industry body established under the guidance of FIU-India to foster collaboration among reporting entities in Anti-Money Laundering and Counter-Financing of Terrorism compliance.',
        primaryButton: { label: 'Explore Membership', link: '/membership' },
        secondaryButton: { label: 'About ARIFAC', link: '/about' },
        sideCard: {
          strategicAlignmentText: 'Aligned with FIU-India\'s vision for a robust AML/CFT ecosystem through industry-led capacity building and knowledge sharing.',
          industryLedText: 'Led by practitioners across banks, NBFCs, payment aggregators, and other reporting entities in India\'s financial sector.',
        },
      },
      {
        blockType: 'capabilityMatrix',
        sectionHeading: 'Our Three Mandates',
        sectionHeadingHighlight: 'Building Capability Across the Ecosystem',
        sectionDescription: 'ARIFAC operates through three core mandates that drive its mission of strengthening financial intelligence across India.',
        mandates: [
          {
            label: 'Mandate I',
            title: 'Capacity Building & Training',
            description: 'Comprehensive certification programmes and training initiatives designed to upskill compliance professionals across all reporting entity categories.',
            linkText: 'Explore Programmes',
            linkRef: '/programmes',
          },
          {
            label: 'Mandate II',
            title: 'Knowledge & Intelligence Sharing',
            description: 'Facilitating the exchange of typologies, risk indicators, and best practices to strengthen the collective AML/CFT response.',
            linkText: 'View Updates',
            linkRef: '/updates',
          },
          {
            label: 'Mandate III',
            title: 'Industry Consultation & Policy',
            description: 'Structured engagement platforms enabling dialogue between reporting entities, regulators, and policymakers on evolving compliance challenges.',
            linkText: 'Learn More',
            linkRef: '/about',
          },
        ],
      },
      {
        blockType: 'regulatoryDashboard',
        heading: 'Regulatory Intelligence',
        description: 'Stay informed with the latest circulars, notifications, and regulatory developments impacting reporting entities.',
        viewAllLabel: 'View All Updates',
        viewAllLink: '/updates',
      },
      {
        blockType: 'cta',
        heading: 'Join India\'s Leading Financial Intelligence Community',
        description: 'Connect with reporting entities, regulators, and practitioners working together to strengthen AML/CFT compliance across the ecosystem.',
        primaryButton: { label: 'Apply for Membership', link: '/membership' },
        secondaryButton: { label: 'Register as Learner', link: '/learners' },
      },
    ],
  },
  {
    title: 'About ARIFAC',
    slug: 'about',
    pageType: 'about' as const,
    banner: {
      label: 'About',
      title: 'About ARIFAC',
      description: 'Understanding the mission, mandate, and operational framework of India\'s premier financial intelligence industry body.',
    },
    whySection: {
      eyebrow: 'The Challenge',
      heading: 'Why ARIFAC',
      description: 'India\'s financial ecosystem faces increasingly sophisticated threats that demand a coordinated, industry-wide response. ARIFAC was established to bridge the gap between regulatory expectations and industry preparedness.',
      threats: [
        { label: 'Money Laundering' },
        { label: 'Terror Financing' },
        { label: 'Cyber Fraud' },
        { label: 'Trade-Based Laundering' },
        { label: 'Shell Company Networks' },
        { label: 'Crypto-Enabled Crime' },
      ],
      alignedWith: {
        description: 'ARIFAC\'s framework is aligned with global and national standards for financial crime prevention.',
        items: [
          { label: 'Global', value: 'FATF Standards' },
          { label: 'National', value: 'PMLA 2002' },
          { label: 'Regulatory', value: 'FIU-India Guidelines' },
          { label: 'Industry', value: 'RBI/SEBI Circulars' },
        ],
      },
    },
    whatSection: {
      eyebrow: 'Operational Focus',
      heading: 'What ARIFAC Does',
      description: 'ARIFAC operates across four strategic pillars to deliver its mandate of strengthening India\'s AML/CFT ecosystem.',
      focusAreas: [
        {
          number: '01',
          title: 'Capacity Building',
          points: [
            { text: 'L1-L5 certification programmes for compliance professionals' },
            { text: 'Sector-specific training modules and workshops' },
            { text: 'Continuous professional development frameworks' },
          ],
        },
        {
          number: '02',
          title: 'Knowledge Sharing',
          points: [
            { text: 'Typology reports and risk indicator databases' },
            { text: 'Best practice guides and compliance toolkits' },
            { text: 'Research publications and industry whitepapers' },
          ],
        },
        {
          number: '03',
          title: 'Industry Consultation',
          points: [
            { text: 'Structured regulatory dialogue platforms' },
            { text: 'Policy response coordination across sectors' },
            { text: 'Expert working groups on emerging challenges' },
          ],
        },
        {
          number: '04',
          title: 'Ecosystem Development',
          points: [
            { text: 'Cross-sector collaboration frameworks' },
            { text: 'Technology and innovation partnerships' },
            { text: 'International cooperation initiatives' },
          ],
        },
      ],
    },
    whoSection: {
      eyebrow: 'Membership',
      heading: 'Who Should Engage',
      description: 'ARIFAC brings together a broad spectrum of entities across India\'s financial ecosystem — from large banks to emerging fintech players.',
      ctaLabel: 'Explore Membership',
      ctaLink: '/membership',
      audiences: [
        { name: 'Banks', subtitle: 'Scheduled commercial, cooperative, and regional rural banks' },
        { name: 'NBFCs', subtitle: 'Non-banking financial companies and housing finance companies' },
        { name: 'Payment Aggregators', subtitle: 'PAs, PPI issuers, and cross-border payment operators' },
        { name: 'Insurance Companies', subtitle: 'Life and general insurance providers' },
        { name: 'Securities Market', subtitle: 'Brokers, depositories, and asset management companies' },
        { name: 'Fintech & Digital', subtitle: 'Digital lending platforms and neobanks' },
      ],
    },
  },
  {
    title: 'Training Leads',
    slug: 'training-leads',
    pageType: 'simple' as const,
    banner: {
      label: 'Training Leads',
      title: 'Training Leads',
      description: 'Leading experts driving excellence in professional certification across the ARIFAC ecosystem.',
    },
  },
  {
    title: 'Sectoral Nodal Officers',
    slug: 'sectoral-nodal-officers',
    pageType: 'simple' as const,
    banner: {
      label: 'Ecosystem Leadership',
      title: 'Sectoral Nodal Officers',
      description: 'Facilitating coordination and mission delivery across the ARIFAC network through representation from major financial sectors.',
    },
  },
  {
    title: 'Our Members',
    slug: 'members',
    pageType: 'simple' as const,
    banner: {
      label: 'Our Members',
      title: 'Our Members',
      description: 'Leading organisations across India\'s financial ecosystem collaborating to strengthen AML/CFT compliance.',
    },
  },
  {
    title: 'Register with ARIFAC',
    slug: 'learners',
    pageType: 'learners' as const,
    banner: {
      label: 'Learners',
      title: 'Register with ARIFAC',
      description: 'ARIFAC brings together institutions and professionals at the forefront of financial intelligence in India. Registering with us places you within an evolving ecosystem of regulators, practitioners, and policymakers in the AML/CFT ecosystem.',
    },
    accessItems: [
      { title: 'Knowledge & Intelligence', description: 'Curated intelligence briefs, typology reports, and risk advisories from across the ecosystem' },
      { title: 'Typology & Risk Alerts', description: 'Emerging financial crime patterns, red flags, and sector-specific risk indicators' },
      { title: 'Events & Summits', description: 'Access to ARIFAC conferences, summits, and regional compliance events' },
      { title: 'Webinars & Awareness Sessions', description: 'Regular online sessions covering regulatory updates, best practices, and emerging threats' },
      { title: 'Reports', description: 'ARIFAC research publications, compliance benchmarking data, and industry whitepapers' },
      { title: 'Training & Certification', description: 'Enrolment eligibility for ARIFAC\'s L1-L5 professional certification programmes' },
      { title: 'Closed-Door Interactions', description: 'Invitation-only sessions with regulators, policymakers, and senior compliance leaders' },
    ],
    learnersCta: {
      heading: 'Registering with ARIFAC is open and free for all',
      description: 'Whether you are a compliance professional, student, researcher, or simply interested in financial intelligence — registration gives you access to ARIFAC\'s knowledge ecosystem at no cost.',
      buttonLabel: 'Register Now',
      buttonLink: '/register',
    },
  },
  {
    title: 'Become a Contributor',
    slug: 'contributor',
    pageType: 'contributor' as const,
    banner: {
      label: 'Contributor',
      title: 'Become a Contributor',
      description: 'Join ARIFAC\'s network of experts and practitioners shaping the future of financial intelligence in India. Share your expertise through training, research, events, and policy dialogue.',
    },
    expertiseAreas: [
      { label: 'AML/CFT Compliance' },
      { label: 'Financial Intelligence' },
      { label: 'Risk Assessment' },
      { label: 'Regulatory Policy' },
      { label: 'Cyber Security' },
      { label: 'Fraud Prevention' },
      { label: 'Banking & Finance' },
      { label: 'FinTech & Digital Payments' },
      { label: 'Legal & Enforcement' },
      { label: 'Data Analytics' },
      { label: 'Training & Education' },
      { label: 'Other' },
    ],
    whyContribute: {
      heading: 'Why Contribute to ARIFAC?',
      points: [
        { text: 'Shape India\'s AML/CFT compliance standards and best practices' },
        { text: 'Gain visibility as a recognized expert in the financial intelligence ecosystem' },
        { text: 'Collaborate with regulators, industry leaders, and fellow practitioners' },
        { text: 'Contribute to research publications and industry whitepapers' },
        { text: 'Access exclusive contributor-only events and networking opportunities' },
      ],
    },
  },
  {
    title: 'Membership at ARIFAC',
    slug: 'membership',
    pageType: 'membership' as const,
    banner: {
      label: 'Membership',
      title: 'Engagement with ARIFAC',
      description: 'Membership is designed for reporting entities and stakeholders in India\'s digital and financial ecosystem seeking to engage in industry consultations, capacity building, and knowledge sharing aligned with AML/CFT frameworks.',
    },
    membershipIntro: {
      subheading: 'ARIFAC offers two engagement pathways — Membership (Paid, for reporting entities) and Affiliate (Free, for individuals). Both provide structured access to programmes, knowledge, and the compliance network.',
      description: '',
    },
    benefits: [
      {
        category: 'Engagement & Governance',
        items: [
          { title: 'Regulatory Engagement', description: 'Participate in structured consultations with FIU-IND and regulatory bodies' },
          { title: 'Governance Participation', description: 'Contribute to ARIFAC\'s sectoral committees and working groups' },
          { title: 'Closed-Door Interactions', description: 'Access invitation-only sessions with regulators and policymakers' },
        ],
      },
      {
        category: 'Learning & Capacity',
        items: [
          { title: 'Training & Certification', description: 'Enrol in ARIFAC\'s L1-L5 certification programmes at preferential rates' },
          { title: 'Workshops & Masterclasses', description: 'Attend domain-specific sessions led by industry experts' },
          { title: 'Webinars & Awareness', description: 'Join regular knowledge sessions on emerging compliance topics' },
        ],
      },
      {
        category: 'Intelligence & Research',
        items: [
          { title: 'Knowledge & Intelligence', description: 'Receive curated intelligence briefs, typology reports, and risk advisories' },
          { title: 'Typology & Risk Alerts', description: 'Stay updated on emerging financial crime patterns and red flags' },
          { title: 'Reports', description: 'Access ARIFAC research publications and compliance benchmarking data' },
          { title: 'Participation in Reports', description: 'Contribute to and be featured in industry research and surveys' },
        ],
      },
      {
        category: 'Ecosystem & Visibility',
        items: [
          { title: 'Events & Summits', description: 'Attend flagship events including the Annual Conference and regional summits' },
          { title: 'Ecosystem Directory', description: 'Listing in ARIFAC\'s member directory for network visibility' },
          { title: 'Brand Visibility', description: 'Co-branding opportunities at ARIFAC events and publications' },
        ],
      },
    ],
    responsibilities: [
      { title: 'Compliance Commitment', description: 'Maintain active compliance with applicable PMLA and FIU-IND regulations' },
      { title: 'Participation', description: 'Actively participate in ARIFAC programmes, consultations, and knowledge-sharing initiatives' },
      { title: 'Confidentiality', description: 'Maintain confidentiality of shared intelligence, discussions, and member-only resources' },
      { title: 'Ethical Conduct', description: 'Uphold ethical standards in all interactions within the ARIFAC ecosystem' },
    ],
    validityTerms: [
      { text: 'Membership is valid for 12 months from the date of approval' },
      { text: 'Renewal is subject to continued eligibility and compliance with membership obligations' },
      { text: 'ARIFAC reserves the right to revise terms and fee structure annually' },
    ],
    feeTables: {
      turnoverBased: [
        { tier: 'Up to INR 5 Cr', fee: '₹25,000' },
        { tier: 'INR 5 Cr to INR 100 Cr', fee: '₹50,000' },
        { tier: 'INR 100 Cr to INR 500 Cr', fee: '₹1,00,000' },
        { tier: 'INR 500 Cr to INR 1,000 Cr', fee: '₹2,00,000' },
        { tier: 'INR 1,000 Cr to INR 2,000 Cr', fee: '₹3,00,000' },
        { tier: 'Above INR 2,000 Cr', fee: '₹5,00,000' },
      ],
      aumBased: [
        { tier: 'Up to INR 500 Cr', fee: '₹25,000' },
        { tier: 'INR 500 Cr to INR 5,000 Cr', fee: '₹50,000' },
        { tier: 'INR 5,000 Cr to INR 20,000 Cr', fee: '₹1,00,000' },
        { tier: 'INR 20,000 Cr to INR 50,000 Cr', fee: '₹2,00,000' },
        { tier: 'INR 50,000 Cr to INR 1,00,000 Cr', fee: '₹3,00,000' },
        { tier: 'Above INR 1,00,000 Cr', fee: '₹5,00,000' },
      ],
    },
    membershipCta: {
      label: 'Apply to be a Member / Affiliate',
      link: '/register',
    },
  },
  {
    title: 'Certifications',
    slug: 'certifications',
    pageType: 'certifications' as const,
    banner: {
      label: 'Certifications',
      title: 'Industry Standard Pathways for Financial Crime Readiness',
      description: 'Role-based programmes designed to strengthen compliance across India\'s financial ecosystem — from foundational awareness to senior integrity leadership.',
    },
    pathwayTiers: [
      { title: 'Recognised Standards', description: 'Aligned with FATF & Indian PMLA requirements.' },
      { title: 'Industry Validated', description: 'Vetted by leading subject matter experts.' },
      { title: 'Career Growth', description: 'Foundation to senior integrity leadership.' },
    ],
  },
  {
    title: 'Regulatory Updates',
    slug: 'updates',
    pageType: 'updates' as const,
    banner: {
      label: 'Regulatory Updates',
      title: 'Recent Circulars and Notifications',
      description: 'Track important circulars, notifications, advisories, and regulatory updates relevant to reporting entities and the broader financial crime prevention ecosystem.',
    },
  },
]

const certifications = [
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

export async function seed(payload: Payload) {
  console.log('Seeding pages...')

  for (const page of pages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  ✓ Page "${page.slug}" already exists, skipping`)
      continue
    }

    await payload.create({
      collection: 'pages',
      data: page as any,
    })
    console.log(`  + Created page "${page.slug}"`)
  }

  console.log('Seeding certifications...')

  for (const cert of certifications) {
    const existing = await payload.find({
      collection: 'certifications',
      where: { title: { equals: cert.title } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  ✓ Certification "${cert.title}" already exists, skipping`)
      continue
    }

    await payload.create({
      collection: 'certifications',
      data: cert as any,
    })
    console.log(`  + Created certification "${cert.title}"`)
  }

  console.log('Seeding header global...')
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navigation: [
        { label: 'About', link: '/about', hasDropdown: false },
        {
          label: 'Engage',
          link: '/membership',
          hasDropdown: true,
          dropdownLabel: 'Engage',
          dropdownItems: [
            { label: 'Membership', description: 'Join our network', link: '/membership' },
          ],
        },
        {
          label: 'Certification',
          link: '/certifications',
          hasDropdown: true,
          dropdownLabel: 'Certification & Training',
          dropdownItems: [
            { label: 'All Certifications', description: 'Browse learning pathways', link: '/certifications' },
            { label: 'Training Leads', description: 'Expert network directory', link: '/training-leads' },
          ],
        },
        { label: 'Programmes', link: '/programmes', hasDropdown: false },
        { label: 'Updates', link: '/updates', hasDropdown: false },
      ],
      memberPortalLabel: 'Member',
      memberPortalUrl: process.env.NEXT_PUBLIC_MEMBER_PORTAL_URL || '',
      learnerPortalLabel: 'Learner',
      learnerPortalUrl: 'https://stage.learning.arifac.com/',
      fiuLogoLink: 'https://fiuindia.gov.in/',
      linkedinUrl: 'https://www.linkedin.com/company/arifac/',
    },
  })

  console.log('Seeding footer global...')
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      tagline: "Empowering India's financial ecosystem through unified compliance standards, expert certification, and strategic regulatory dialogue.",
      initiativeLabel: 'An IAMAI Initiative',
      linkGroups: [
        {
          title: 'Alliance',
          links: [
            { label: 'About Us', url: '/about' },
            { label: 'Our Members', url: '/members' },
          ],
        },
        {
          title: 'Programmes',
          links: [
            { label: 'Programmes', url: '/programmes' },
            { label: 'Certifications', url: '/certifications' },
            { label: 'Training Leads', url: '/training-leads' },
            { label: 'Sectoral Nodal Officers', url: '/sectoral-nodal-officers' },
            { label: 'Regulatory Updates', url: '/updates' },
          ],
        },
        {
          title: 'Support',
          links: [
            { label: 'Help Center', url: '/help' },
            { label: 'Contact Us', url: '/contact' },
          ],
        },
      ],
      bottomLinks: [
        { label: 'Terms of Use', url: '/legal/terms-of-use' },
        { label: 'Privacy Policy', url: '/legal/privacy-policy' },
        { label: 'Legal & Compliance', url: '/legal/disclaimer' },
      ],
      copyrightText: 'ARIFAC | IAMAI. All rights reserved.',
    },
  })

  console.log('Seeding nodal officers...')
  const nodalOfficers = [
    { name: 'Ms Rakhee Sengupta', designation: 'Principal Officer', organization: 'ICICI Bank', sector: 'Banks', order: 1 },
    { name: 'Mr Manish Vasishta', designation: 'Principal Officer', organization: 'Axis Bank', sector: 'Banks', order: 2 },
    { name: 'SBI Principal Officer', designation: 'Principal Officer', organization: 'State Bank of India', sector: 'Banks', order: 3 },
    { name: 'Ms Jyothi N M', designation: 'Asst. GM & PO', organization: 'IndiaIdeas.com Limited (BillDesk)', sector: 'Payment Aggregators / PA - Cross Border', order: 4 },
    { name: 'NPCI Principal Officer', designation: 'Principal Officer', organization: 'NPCI', sector: 'Networks', order: 5 },
    { name: 'Mr Aashish Pathak', designation: 'Principal Officer', organization: 'Fino Payments Bank', sector: 'Payment Banks / PPI Issuers', order: 6 },
    { name: 'Mr Sameer Seksaria', designation: 'Principal Officer', organization: 'HDFC Mutual Fund', sector: 'Asset Management', order: 7 },
    { name: 'Mr Amit Madhusudan Retharekar', designation: 'CCO', organization: 'Karad Urban Co-Operative Bank', sector: 'Co-operative Banks', order: 8 },
    { name: 'Ms Roopa Venkatesh', designation: 'Principal Officer', organization: 'Zerodha Broking Limited', sector: 'Brokers', order: 9 },
    { name: 'Mr Neelesh Sarda', designation: 'Principal Officer', organization: 'Bajaj Finserv', sector: 'NBFC', order: 10 },
  ]

  for (const officer of nodalOfficers) {
    const existing = await payload.find({
      collection: 'nodal-officers',
      where: { name: { equals: officer.name } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      console.log(`  ✓ Officer "${officer.name}" already exists, skipping`)
      continue
    }
    await payload.create({ collection: 'nodal-officers', data: officer })
    console.log(`  + Created officer "${officer.name}"`)
  }

  console.log('Seeding training leads...')
  const trainingLeads = [
    { name: 'Mr Nihal Shah', designation: 'Principal Officer', organization: 'Citibank NA', specialization: 'Foreign Banks AML Framework', order: 1 },
    { name: 'Mr Shirish Pathak', designation: '', organization: 'Fintelekt Advisory Services Pvt Ltd', specialization: '', order: 2 },
    { name: 'Mr Sameer Seksaria', designation: '', organization: 'HDFC AMC', specialization: 'Asset Management Compliance', order: 3 },
    { name: 'Mr Gyan Gotan', designation: '', organization: 'HDFC Bank', specialization: 'Private Banking AML Framework', order: 4 },
    { name: 'Ms Rakhee Sengupta', designation: '', organization: 'ICICI Bank', specialization: 'Retail Banking AML', order: 5 },
    { name: 'Ms Jyothi N M', designation: 'Asst. GM & PO', organization: 'IndiaIdeas.com Limited (BillDesk)', specialization: 'PA/PACB, BBPS AML Framework', order: 6 },
    { name: 'Mr Prashant Sinha', designation: '', organization: 'Jio Financial Services', specialization: '', order: 7 },
    { name: 'Mr Hemang Sheth', designation: '', organization: 'JP Morgan Chase Bank NA', specialization: '', order: 8 },
    { name: 'Mr Amit Madhusudan Retharekar', designation: 'CCO', organization: 'Karad Urban Co-Operative Bank', specialization: 'Cooperative Banking AML Framework', order: 9 },
    { name: 'SBI Training Lead', designation: '', organization: 'State Bank of India', specialization: 'Public Banking AML Framework', order: 10 },
  ]

  for (const lead of trainingLeads) {
    const existing = await payload.find({
      collection: 'training-leads-directory',
      where: { name: { equals: lead.name } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      console.log(`  ✓ Training lead "${lead.name}" already exists, skipping`)
      continue
    }
    await payload.create({ collection: 'training-leads-directory', data: lead })
    console.log(`  + Created training lead "${lead.name}"`)
  }

  console.log('Seeding legal pages...')
  const legalPages = [
    {
      title: 'Website Terms of Use',
      slug: 'terms-of-use',
      contactEmail: 'help.arifac@iamai.in',
      sections: [
        { title: '1. Acceptance of Terms', body: richTextParagraphs('These Terms of Use govern access to and use of the ARIFAC website and related digital platforms ("Platform"). By accessing or using the Platform, you agree to be bound by these Terms, as may be amended from time to time. Continued use of the Platform shall constitute acceptance of any modifications or updates.', 'Users must be at least 18 years of age to access or use the Platform. By using the Platform, you consent to the use of cookies as described in our policies. Users must not violate the intellectual property rights of ARIFAC, FIU-IND, or IAMAI in any manner.', 'By registering on the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety.') },
        { title: '2. About ARIFAC', body: richTextParagraphs('ARIFAC (Alliance of Reporting Entities in India for AML/CFT) is an industry-led initiative operated by the Internet and Mobile Association of India (IAMAI) under the guidance of the Financial Intelligence Unit – India (FIU-IND).', 'ARIFAC functions as a collaborative platform for capacity building, industry engagement, and knowledge sharing within the AML/CFT ecosystem.', 'ARIFAC does not act as a regulatory authority and does not grant any regulatory approvals, recognition, or exemptions under applicable laws.') },
        { title: '3. Permitted Use of Platform', body: richTextParagraphs('The Platform may be used solely for lawful purposes, including accessing information, participating in ARIFAC programs, and professional development. Users must not download any material from the Platform or save it to their computer or device except as expressly permitted. Users must not use the Platform for any purposes other than those intended.', 'ARIFAC and IAMAI prohibit the modification, editing, and out-of-context use of any material available on the Platform. Users may not modify, publish, transmit, reproduce, create derivative works from, distribute, perform, display, or in any way exploit any content available on the Platform.', 'Users must not scrape or extract data from the Platform. Users must not use the Platform for monitoring, benchmarking, or throttling purposes. Users must not access content by any means other than the interface provided by the Platform.', 'ARIFAC reserves the right to restrict access to the Platform at its sole discretion.') },
        { title: '4. Prohibited Conduct', body: richTextParagraphs('Users shall not misuse the Platform or engage in any activity that may compromise its integrity, including attempting unauthorized access, disrupting system operations, scraping data, reverse engineering, or misrepresenting affiliation with ARIFAC, IAMAI, FIU-IND, or any associated stakeholders.', 'Users must not use the Platform unlawfully or in any way that causes damage or impairment to the Platform. Users must not transmit spyware, viruses, or any other harmful software through or in connection with the Platform. Users must not use automated means to access the Platform and must not violate robots.txt directives.', 'Users must not use any data obtained from the Platform for direct marketing purposes. Users must not contact individuals using data collected from the Platform.', 'Users must ensure that all information supplied to the Platform is true, accurate, current, complete, and non-misleading.') },
        { title: '5. Intellectual Property Rights', body: richTextParagraphs('All content available on the Platform, including training materials, frameworks, certifications, logos, and branding, is proprietary to ARIFAC and/or IAMAI and is protected under applicable intellectual property laws. Unauthorized use, reproduction, distribution, or commercial exploitation of such content is strictly prohibited.', 'All IAMAI and/or ARIFAC trademarks and trade names are the exclusive property of IAMAI and/or ARIFAC respectively. The Platform and all related software, media, design, and content is the sole and exclusive property of IAMAI/ARIFAC, protected by copyright, trademark, and other intellectual property laws of India and other countries.', 'Users may not sell, modify, reproduce, display, publicly perform, distribute, or otherwise use the Platform content in any way for any public or commercial purpose.') },
        { title: '6. Registration and Accounts', body: richTextParagraphs('You may register for an account by completing the registration form on the Platform and clicking on the verification link in the email sent to you.', 'You must not allow any other person to use your account. You must notify us immediately if you become aware of any unauthorized use of your account. You must not use any other person\'s account.') },
        { title: '7. User Login Details', body: richTextParagraphs('If you register for an account, you will be provided with or asked to choose a user ID and password. Your user ID must not be liable to mislead, and you must not use your account for the purpose of impersonation.', 'You must keep your password confidential. You must notify us immediately if you become aware of any unauthorized disclosure of your password.', 'You are responsible for any activity on the Platform arising from your failure to keep your password confidential, and you may be held liable for any losses arising out of such a failure.') },
        { title: '8. Cancellation and Suspension of Account', body: richTextParagraphs('If we find that you have violated these Terms, we have the right to suspend your account, cancel your account, and/or edit your account details at any time in our sole discretion without notice or explanation.', 'You may cancel your account at any time using your account control panel on the Platform.') },
        { title: '9. Your Content: Licence', body: richTextParagraphs('In these Terms, "your content" means information required by the Platform in connection with your use of the Platform. You grant ARIFAC a worldwide, non-exclusive, royalty-free right and licence to use, reproduce, store, adapt, publish, translate, and distribute your content in connection with the Platform.', 'You may edit your content to the extent permitted using the editing functionality made available on the Platform.', 'Without prejudice to ARIFAC\'s other rights under these Terms, if you breach any provision of these Terms in any way, ARIFAC may delete, un-publish, or edit any or all of your content.') },
        { title: '10. Your Content: Rules', body: richTextParagraphs('You warrant and represent that your content will comply with these Terms. Your content must not be illegal or unlawful, must not infringe any person\'s legal rights, and must not be capable of giving rise to legal action against any person.', 'Your content must be correct, accurate, and authentic and must not violate any applicable laws, rules, or regulations, or infringe any copyright, moral right, database right, trademark right, design right, or other intellectual property rights.') },
        { title: '11. Monitoring and Enforcement', body: richTextParagraphs('ARIFAC reserves the right to monitor usage of the Platform and investigate any suspected misuse or violation of these Terms.', 'ARIFAC may, at its discretion, restrict, suspend, or terminate access to the Platform in cases of non-compliance or conduct that may adversely affect ARIFAC, its stakeholders, or the integrity of its programs.') },
        { title: '12. Disclaimer', body: richTextParagraphs('All content provided on the Platform is for educational and informational purposes only and does not constitute legal, regulatory, or compliance advice. While ARIFAC programs may cover applicable laws and regulatory frameworks, ARIFAC does not guarantee the accuracy, completeness, or continued applicability of such information.', 'Users remain solely responsible for ensuring compliance with all applicable laws and regulations, including obligations under the Prevention of Money Laundering Act, 2002 (PMLA). ARIFAC shall not be liable for any regulatory actions, penalties, or compliance failures arising from reliance on Platform content.', 'IAMAI/ARIFAC does not warrant that the information on the Platform is accurate or complete and disclaims all liability for any loss or damage caused by errors or omissions therein. IAMAI/ARIFAC assumes no liability for the interpretation and/or use of such information and offers no warranty of any kind.', 'ARIFAC reserves the right to discontinue or alter any or all of its services without notice or explanation. To the maximum extent permitted by applicable law, ARIFAC excludes all representations and warranties relating to the Platform and its use.') },
        { title: '13. Indemnity', body: richTextParagraph('Users agree to fully indemnify and hold harmless ARIFAC, IAMAI, and their officers, employees, affiliates, and representatives from any claims, damages, liabilities, penalties, fines, settlements, attorneys\' fees, costs, or expenses arising from or related to any claim made by any third party due to the user\'s access to or use of the Platform, creation of or transmittal of content, misuse of the Platform, breach of these Terms, or infringement of any intellectual property or other right, or violation of applicable laws.') },
        { title: '14. Limitation of Liability', body: richTextParagraphs('To the maximum extent permitted by law, ARIFAC shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from or in connection with the use of the Platform.', 'Any liability, if established, shall be limited to the fees paid by the user, if any.') },
        { title: '15. Breach of these Terms', body: richTextParagraphs('IAMAI/ARIFAC may immediately terminate a user\'s access to the Platform without prior notice. Without limiting the foregoing, access may be terminated for breach of these Terms, request by law enforcement, or unexpected technical issues. All terminations are at the sole discretion of IAMAI/ARIFAC.', 'IAMAI/ARIFAC does not assume any liability for damage arising from transmissions over the internet. Submitted data shall not be deemed confidential, shall not create any fiduciary obligations, and shall not result in liability if inadvertently released. IAMAI/ARIFAC takes no responsibility for uploaded information and shall not be responsible for its deletion, correction, destruction, damage, or loss.', 'IAMAI/ARIFAC is not responsible for any loss of information through the action of third parties or circumstances beyond its control. Neither IAMAI nor ARIFAC shall be liable for any direct, indirect, incidental, special, consequential, punitive, or exemplary damages arising from the use of the Platform.', 'The user\'s only right or remedy with respect to the Platform is to uninstall and/or discontinue use of the Platform.') },
        { title: '16. Third-Party Links', body: richTextParagraph('The Platform may contain links to third-party websites or resources for convenience. ARIFAC does not control, endorse, or assume responsibility for the content, policies, or practices of such third-party platforms.') },
        { title: '17. Amendments to Terms', body: richTextParagraphs('ARIFAC reserves the right to amend these Terms from time to time. Updated Terms shall be published on the ARIFAC website and shall become effective as specified therein. ARIFAC may modify, add, or remove terms without notice or liability. Changes are effective immediately upon posting.', 'Users may be notified of changes through pop-up notifications, push notifications, or email. Users are advised to review the Terms periodically. Continued use of the Platform shall constitute acceptance of such amendments.') },
        { title: '18. Assignment', body: richTextParagraphs('ARIFAC may assign, transfer, sub-contract, or otherwise deal with its rights and/or obligations under these Terms without prior notice or consent.', 'Users may not, without the prior written consent of ARIFAC, assign, transfer, sub-contract, or otherwise deal with any of their rights and/or obligations under these Terms.') },
        { title: '19. Governing Law and Jurisdiction', body: richTextParagraph('These Terms shall be governed by the laws of India. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.') },
      ],
      acknowledgment: {
        heading: 'Acknowledgment',
        body: richTextParagraphs('By continuing to use our Platform, you acknowledge that you have read, understood, and agreed to be bound by these Website Terms of Use.', 'Effective: 23rd March, 2026 | Version 1.0'),
      },
    },
    {
      title: 'Privacy Policy & Data Protection',
      slug: 'privacy-policy',
      contactEmail: 'help.arifac@iamai.in',
      sections: [
        { title: '1. Introduction', body: richTextParagraphs('This Privacy Policy describes how ARIFAC (Alliance of Reporting Entities in India for AML/CFT), operated by the Internet and Mobile Association of India (IAMAI) under the guidance of the Financial Intelligence Unit – India (FIU-IND), collects, uses, processes, stores, and protects personal data of individuals ("Data Principals") who access or use ARIFAC platforms, including its website, Learning Management Program (LMP), membership services, and certification programs.', 'By accessing or using ARIFAC services, you consent to the collection and processing of your personal data in accordance with this Policy and applicable laws, including the Digital Personal Data Protection Act, 2023 ("DPDP Act") and the Digital Personal Data Protection Rules, 2025 and any amendments thereto.', 'PLEASE READ THIS PRIVACY POLICY BEFORE USING ARIFAC\'S SERVICES. BY USING ARIFAC\'S SERVICES OR SUBMITTING THE INFORMATION, YOU AGREE THAT YOU ARE OF THE AGE OF 18 YEARS OR ABOVE AND EXPRESSLY CONSENT TO THE PROCESSING AND USE OF THE INFORMATION ACCORDING TO THE PRIVACY POLICY.') },
        { title: '2. Scope of Policy', body: richTextParagraphs('This Policy applies to all users of ARIFAC services, including: (i) Website visitors, (ii) Registered users, (iii) Learners and certification candidates, and (iv) Member organization representatives.', 'This Policy covers personal data collected through digital platforms, forms, communications, and program participation. By registering on our platform for ARIFAC services, you specifically consent to the use and transmission/transfer/sharing of your personal data and information to provide the services to you.', 'This Privacy Policy does not apply to companies or entities that ARIFAC does not own or control, or has no contractual relationship with. If you choose not to provide the personal information/personal data that we seek from you, then you may not be able to avail the ARIFAC services and we may also not be able to respond to any queries that you may have.', 'ARIFAC (and its licensors, if applicable) owns exclusively and absolutely all rights, title and interest, including all related intellectual property rights, in the platform and the ARIFAC services, and any suggestions, ideas, improvements, enhancement requests, feedback, recommendations and other information provided by you relating to the platform and its services.') },
        { title: '3. Categories of Personal Data Collected', body: richTextParagraphs('ARIFAC may collect and process the following categories of personal data: Identity Information (name, date of birth, photograph, Aadhaar/PAN/passport or other identification details), Contact Information (email address, phone number, address), Professional Information (employer details, designation, industry affiliation, work history), Educational and Certification Data (course enrollment, progress, assessment results, certification status), Technical Data (IP address, device details, browser information, login activity), Audio-Visual Data (video, audio, and screen recordings during remote proctored examinations), Transactional Data (payment details processed through authorised payment gateways).', 'ARIFAC shall collect only such data as is necessary for lawful purposes.') },
        { title: '4. Purpose of Data Processing', body: richTextParagraphs('Personal data shall be processed for lawful purposes including: User registration, onboarding, and account management; Delivery of LMP training programs and certification services; Conduct of examinations and identity verification; Issuance, validation, and publication of certifications; Communication of program updates, notifications, and support; Compliance with legal, regulatory, and audit requirements; Prevention of fraud, misuse, or unauthorised access.', 'Personal data shall not be processed for purposes incompatible with the above.') },
        { title: '5. Legal Basis and Consent', body: richTextParagraphs('Processing of personal data shall be based on: Consent provided by the Data Principal at the time of registration or use of services; Legitimate uses permitted under applicable law; Compliance with legal obligations, including regulatory or law enforcement requirements.', 'Users may withdraw consent where applicable, subject to consequences such as suspension of access to services.') },
        { title: '6. Data Sharing and Disclosure', body: richTextParagraphs('ARIFAC may share personal data only under the following circumstances: With regulatory authorities or law enforcement agencies where required under applicable law; With service providers (e.g., LMS platforms, proctoring providers, payment gateways) under strict confidentiality obligations; With member organisations, where users are nominated participants (limited to program participation data); For certification verification, including publication of certified user lists (name, organisation, certification status); For business transfers: ARIFAC may sell, transfer or otherwise share some or all of its assets, including any personal information, in connection with a merger, acquisition, reorganisation or sale of assets or in the event of bankruptcy.', 'ARIFAC shall not sell personal data to third parties.') },
        { title: '7. Data Retention', body: richTextParagraphs('Personal data shall be retained only for as long as necessary to fulfil the purposes outlined in this Policy, including: Certification and audit records; Legal and regulatory compliance; Dispute resolution.', 'Upon expiry of retention requirements, data shall be securely deleted or anonymised.') },
        { title: '8. Data Security Measures', body: richTextParagraphs('ARIFAC shall implement reasonable security safeguards, including: Access controls and authentication mechanisms; Encryption and secure data storage; Monitoring and audit of system access; Secure handling of proctoring data.', 'However, no system is completely secure, and ARIFAC does not guarantee absolute security.') },
        { title: '9. Rights of Data Principals', body: richTextParagraphs('Under the DPDP Act, users (Data Principals) have the right to: Access information about their personal data; Request correction or updating of inaccurate data; Request erasure of personal data (subject to legal limitations); Withdraw consent (where applicable); Grievance redressal.', 'Requests may be submitted through the contact details provided in the Grievance Redressal section below.') },
        { title: '10. Obligations of Users (Data Principals)', body: richTextParagraph('Users shall ensure that: All personal data provided is accurate and up to date; They do not impersonate or provide false information; They comply with applicable laws and ARIFAC policies.') },
        { title: '11. Cross-Border Data Transfers', body: richTextParagraph('Personal data may be stored or processed in India or in jurisdictions permitted under applicable laws. ARIFAC shall ensure that such transfers comply with the DPDP Act and applicable safeguards.') },
        { title: '12. Cookies and Tracking Technologies', body: richTextParagraphs('The ARIFAC website may use cookies and similar technologies to enhance user experience, analyse usage patterns, and improve services. Users may control cookie preferences through browser settings. If the User does not accept cookies, it may not be able to use all portions and functionality of the Platform.', 'Third-party websites which are accessible from our platform via links, click-through or banner advertising may use cookies. However, it is important for us to inform you that we have no access or control over such cookies and do not accept responsibility with regards to them.') },
        { title: '13. Links to Third-Party Websites/Platforms', body: richTextParagraphs('Our platform may contain links to other third-party websites/platforms. The User\'s use of websites/platforms to which the platform links is subject to the terms of use and privacy policies located on such third-party websites/platforms.', 'ARIFAC absolutely disclaims any liability or responsibility for any disclosure by you or anyone on your behalf of any of your personal information/data, which may be posted on any parts of the platform.') },
        { title: '14. Usage Data', body: richTextParagraphs('ARIFAC may also collect information that your browser sends whenever you visit our platform or when you access the platform by or through a mobile device ("Usage Data").', 'This Usage Data may include information such as your computer\'s internet protocol address (e.g. IP address), browser type, browser version, the pages of our Platform that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.', 'When you access the platform by or through a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.') },
        { title: '15. Location Data', body: richTextParagraphs('We may use and store information about your location if you give us permission to do so ("Location Data"). We use this data to provide features of our platform, to improve and customise our platform.', 'You can enable or disable location services when you use our platform at any time, through your device settings.') },
        { title: '16. Grievance Redressal and Data Protection Contact', body: richTextParagraphs('For any queries, requests, or grievances relating to personal data, users may contact the ARIFAC Data Protection / Grievance Officer at: help.arifac@iamai.in', 'ARIFAC shall address grievances within a reasonable timeframe in accordance with applicable law.') },
        { title: '17. Limitation of Liability', body: richTextParagraph('ARIFAC shall not be liable for any unauthorised access, loss, or misuse of personal data or information arising from circumstances beyond its reasonable control, including user-side vulnerabilities or force majeure events.') },
        { title: '18. Amendments to this Policy', body: richTextParagraphs('ARIFAC reserves the right to update or modify this Privacy Policy from time to time. Updated versions shall be published on the ARIFAC website. Users are advised to review the Policy periodically.', 'Continued use of services shall constitute acceptance of such updates.') },
        { title: '19. Governing Law and Jurisdiction', body: richTextParagraph('This Privacy Policy shall be governed by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.') },
      ],
      acknowledgment: {
        heading: 'Acknowledgment',
        body: richTextParagraphs('By continuing to use our Platform, you acknowledge that you have read, understood, and agreed to be bound by this Privacy Policy and Data Protection Terms.', 'Effective: 23rd March, 2026 | DPDP Act, 2023 Aligned'),
      },
    },
    {
      title: 'Disclaimer',
      slug: 'disclaimer',
      contactEmail: 'help.arifac@iamai.in',
      sections: [
        { title: '1. General Disclaimer', body: richTextParagraphs('ARIFAC (Alliance of Reporting Entities in India for AML/CFT) is an industry-led platform operated by the Internet and Mobile Association of India (IAMAI). ARIFAC is not a regulator, supervisory authority, or government body.', 'Membership, participation, or engagement with ARIFAC does not confer any regulatory status, approval, licence, or compliance certification. ARIFAC does not grant approvals, licences, or compliance certifications of any kind.', 'ARIFAC does not provide legal, regulatory, or financial advice. All information, materials, and resources shared through ARIFAC platforms are for knowledge-sharing and capacity-building purposes only.') },
        { title: '2. Membership Disclaimer', body: richTextParagraphs('ARIFAC membership is intended for industry collaboration, knowledge sharing, and capacity building. It does not substitute regulatory compliance obligations under applicable laws.', 'Submission of a membership application does not guarantee membership. Approval is subject to ARIFAC\'s review and discretion.', 'By submitting a membership application, applicants consent to the collection and processing of their information in accordance with ARIFAC\'s Privacy Policy and applicable data protection laws.') },
        { title: '3. Programmes & Events Disclaimer', body: richTextParagraphs('Information about upcoming programmes, meetings, and events is subject to change. ARIFAC reserves the right to reschedule, modify, or cancel any programme or event at its discretion.', 'Participation in ARIFAC programmes, training sessions, and knowledge forums does not confer any regulatory recognition or exemption under applicable laws.', 'Certificates issued through ARIFAC certification programmes represent completion of the relevant learning pathway and do not constitute regulatory approval or professional licensing.') },
        { title: '4. Regulatory Updates Disclaimer', body: richTextParagraphs('Regulatory updates, circulars, and information shared on this platform are provided for informational and awareness purposes only. They do not constitute legal advice.', 'Members and users are advised to refer to official regulatory sources and seek independent professional advice for compliance-related matters.', 'ARIFAC makes reasonable efforts to ensure the accuracy and currency of information shared, but does not warrant completeness, accuracy, or timeliness of any regulatory updates published on this platform.') },
        { title: '5. Resources & Materials Disclaimer', body: richTextParagraphs('The materials provided in the resources section are for informational purposes only and do not constitute legal or regulatory advice.', 'Reporting entities are advised to refer to official sources, including FIU-IND circulars and relevant statutes, to ensure statutory compliance.') },
        { title: '6. Media & Gallery Disclaimer', body: richTextParagraph('Images are used for documentation and illustrative purposes. Participation in ARIFAC programmes may imply consent for non-commercial use of photographs unless otherwise notified.') },
        { title: '7. Limitation of Liability', body: richTextParagraphs('ARIFAC, IAMAI, and their affiliates, officers, and representatives shall not be liable for any direct, indirect, incidental, or consequential damages arising from participation in ARIFAC activities.', 'Members remain solely responsible for compliance with applicable laws and regulations and for seeking independent professional advice where required.', 'ARIFAC shall not be responsible for any regulatory actions, compliance failures, penalties, or legal consequences arising from reliance on ARIFAC discussions, materials, or programmes.') },
      ],
    },
  ]

  for (const legalPage of legalPages) {
    const existing = await payload.find({
      collection: 'legal-pages',
      where: { slug: { equals: legalPage.slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      console.log(`  ✓ Legal page "${legalPage.slug}" already exists, skipping`)
      continue
    }
    await payload.create({ collection: 'legal-pages', data: legalPage as any })
    console.log(`  + Created legal page "${legalPage.slug}"`)
  }

  console.log('Seeding complete.')
}
