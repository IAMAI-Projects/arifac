import type { Payload } from 'payload'

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
    pageType: 'simple' as const,
    banner: {
      label: 'Learners',
      title: 'Register with ARIFAC',
      description: 'ARIFAC brings together institutions and professionals at the forefront of financial intelligence in India. Registering with us places you within an evolving ecosystem of regulators, practitioners, and policymakers in the AML/CFT ecosystem.',
    },
  },
  {
    title: 'Become a Contributor',
    slug: 'contributor',
    pageType: 'simple' as const,
    banner: {
      label: 'Contributor',
      title: 'Become a Contributor',
      description: 'Join ARIFAC\'s network of experts and practitioners shaping the future of financial intelligence in India. Share your expertise through training, research, events, and policy dialogue.',
    },
  },
  {
    title: 'Membership at ARIFAC',
    slug: 'membership',
    pageType: 'simple' as const,
    banner: {
      label: 'Membership',
      title: 'Membership at ARIFAC',
      description: 'Membership is designed for reporting entities and stakeholders in India\'s digital and financial ecosystem seeking to engage in industry consultations, capacity building, and knowledge sharing aligned with AML/CFT frameworks.',
    },
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

  console.log('Seeding complete.')
}
