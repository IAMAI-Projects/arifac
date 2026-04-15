# Full CMS Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all hardcoded website content to Payload CMS so editors can manage everything through the admin panel.

**Architecture:** Extend the existing Payload CMS schema with 2 new globals (Header, Footer), 3 new collections (Legal Pages, Nodal Officers, Training Leads), 2 new homepage blocks (Partnerships, Community), and 5 new page types (membership, learners, contributor, certifications, updates). All existing hardcoded content is preserved via seed data. Components are refactored to accept CMS props.

**Tech Stack:** Payload CMS 3.x, Next.js 16, TypeScript, PostgreSQL

**Spec:** `docs/superpowers/specs/2026-04-15-full-cms-migration-design.md`

---

## File Structure

### New files to create:
```
src/globals/Header.ts          — Header global schema
src/globals/Footer.ts          — Footer global schema
src/collections/LegalPages.ts  — Legal pages collection schema
src/collections/NodalOfficers.ts — Nodal officers collection schema
src/collections/TrainingLeadsDirectory.ts — Training leads collection schema
src/blocks/PartnershipsBlock.ts — Partnerships homepage block schema
src/blocks/CommunityBlock.ts   — Community homepage block schema
src/app/(frontend)/legal/[slug]/page.tsx — Dynamic legal page route
```

### Existing files to modify:
```
src/payload.config.ts           — Register new globals, collections, blocks
src/collections/Pages.ts        — Add new pageType options and conditional field groups
src/globals/Programmes.ts       — Add banner and sectionHeadings fields
src/seed.ts                     — Add seed data for all new schema
src/components/BlockRenderer.tsx — Add partnerships and community block cases
src/components/Header.tsx        — Accept props from global instead of hardcoded
src/components/Footer.tsx        — Accept props from global instead of hardcoded
src/components/Partnerships.tsx  — Accept block data prop
src/components/CommunitySection.tsx — Accept block data prop
src/components/CertificationsFilter.tsx — Accept pathway tiers as prop
src/app/(frontend)/layout.tsx    — Fetch header/footer globals, pass as props
src/app/(frontend)/page.tsx      — Remove partnerships block filter exception
src/app/(frontend)/membership/page.tsx — Fetch from CMS
src/app/(frontend)/learners/page.tsx — Fetch from CMS
src/app/(frontend)/contributor/page.tsx — Fetch from CMS
src/app/(frontend)/certifications/page.tsx — Fetch banner from CMS page
src/app/(frontend)/updates/page.tsx — Fetch banner from CMS page
src/app/(frontend)/programmes/page.tsx — Use extended global fields
src/app/(frontend)/about/page.tsx — Remove hardcoded paragraph
src/app/(frontend)/sectoral-nodal-officers/page.tsx — Fetch from collection
src/app/(frontend)/training-leads/page.tsx — Fetch from collection
src/app/(frontend)/terms-of-use/page.tsx — DELETE (replaced by dynamic route)
src/app/(frontend)/privacy-policy/page.tsx — DELETE (replaced by dynamic route)
src/app/(frontend)/disclaimer/page.tsx — DELETE (replaced by dynamic route)
```

---

## Task 1: Header & Footer Globals

**Files:**
- Create: `src/globals/Header.ts`
- Create: `src/globals/Footer.ts`
- Modify: `src/payload.config.ts`
- Modify: `src/seed.ts`
- Modify: `src/app/(frontend)/layout.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Create Header global schema**

Create `src/globals/Header.ts`:

```ts
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'navigation',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
        { name: 'hasDropdown', type: 'checkbox', defaultValue: false },
        { name: 'dropdownLabel', type: 'text' },
        {
          name: 'dropdownItems',
          type: 'array',
          admin: { condition: (data, siblingData) => siblingData?.hasDropdown },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'description', type: 'text' },
            { name: 'link', type: 'text', required: true },
          ],
        },
      ],
    },
    { name: 'memberPortalLabel', type: 'text', defaultValue: 'Member' },
    { name: 'memberPortalUrl', type: 'text' },
    { name: 'learnerPortalLabel', type: 'text', defaultValue: 'Learner' },
    { name: 'learnerPortalUrl', type: 'text' },
    { name: 'fiuLogoLink', type: 'text', defaultValue: 'https://fiuindia.gov.in/' },
    { name: 'linkedinUrl', type: 'text', defaultValue: 'https://www.linkedin.com/company/arifac/' },
  ],
}
```

- [ ] **Step 2: Create Footer global schema**

Create `src/globals/Footer.ts`:

```ts
import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    { name: 'tagline', type: 'textarea' },
    { name: 'initiativeLabel', type: 'text', defaultValue: 'An IAMAI Initiative' },
    {
      name: 'linkGroups',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'bottomLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'copyrightText', type: 'text', defaultValue: 'ARIFAC | IAMAI. All rights reserved.' },
  ],
}
```

- [ ] **Step 3: Register globals in payload.config.ts**

In `src/payload.config.ts`, add imports for `Header` and `Footer` globals, then add them to the `globals` array:

```ts
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

// In buildConfig:
globals: [Programmes, Header, Footer],
```

Also add to `livePreview.globals`:
```ts
globals: ['programmes', 'header', 'footer'],
```

- [ ] **Step 4: Add Header & Footer seed data**

In `src/seed.ts`, add at the end of the `seed` function (before the closing `console.log('Seeding complete.')`):

```ts
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
```

- [ ] **Step 5: Update layout.tsx to fetch globals**

Modify `src/app/(frontend)/layout.tsx` to fetch header and footer globals and pass them as props:

```ts
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { NewsItem, Header as HeaderType, Footer as FooterType } from '@/payload-types'

// ... fonts unchanged ...

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const payload = await getPayload({ config: configPromise })

  const { docs: newsItems } = await payload.find({
    collection: 'news-items',
    where: { published: { equals: true } },
    sort: '-createdAt',
    limit: 20,
  })

  const headerData = await payload.findGlobal({ slug: 'header' }) as HeaderType
  const footerData = await payload.findGlobal({ slug: 'footer' }) as FooterType

  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${inter.variable} h-full font-body min-h-full flex flex-col antialiased bg-white text-slate-900`}>
        <div className="min-h-screen bg-white text-neutral-800 font-sans selection:bg-brand selection:text-white flex flex-col">
          <Header newsItems={newsItems as NewsItem[]} data={headerData} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer data={footerData} />
        </div>
      </body>
    </html>
  )
}
```

- [ ] **Step 6: Refactor Header component to use CMS data**

Modify `src/components/Header.tsx`. Update the interface and replace all hardcoded nav items, URLs, and labels with data from the `data` prop. The component structure (dropdown behavior, styling, scroll logic) stays the same — only data sources change.

Key changes:
- Add `data: HeaderType` to `HeaderProps` interface (import `Header as HeaderType` from `@/payload-types`)
- Replace hardcoded nav array with `data.navigation` mapping
- Replace hardcoded portal URLs with `data.memberPortalUrl` and `data.learnerPortalUrl`
- Replace hardcoded portal labels with `data.memberPortalLabel` and `data.learnerPortalLabel`
- Replace hardcoded FIU logo link with `data.fiuLogoLink`
- Replace hardcoded LinkedIn URL with `data.linkedinUrl`
- For nav items with `hasDropdown`, render dropdown using `item.dropdownItems`
- For nav items without dropdown, render as simple links

- [ ] **Step 7: Refactor Footer component to use CMS data**

Modify `src/components/Footer.tsx`. Add `FooterType` prop and replace all hardcoded content:

```ts
import Image from "next/image";
import Link from "next/link";
import type { Footer as FooterType } from '@/payload-types'

interface FooterProps {
  data: FooterType
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 md:pt-24 pb-10 relative overflow-hidden">
      {/* Texture layers unchanged */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-subtle opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-white/5" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-10 mb-16">

          <div className="md:col-span-4">
            <div className="flex items-center gap-4 mb-6">
              <Image src="/fiu-logo.png" alt="FIU INDIA" width={36} height={36} className="h-10 w-auto" />
              <div className="h-8 w-px bg-white/20" />
              <Image src="/logo.png" alt="ARIFAC" width={110} height={32} className="h-9 w-auto brightness-0 invert" />
            </div>
            <p className="text-[15px] text-white leading-relaxed font-normal max-w-sm mb-8">
              {data.tagline}
            </p>
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">{data.initiativeLabel}</span>
          </div>

          {data.linkGroups?.map((group, idx) => (
            <div key={idx} className={`md:col-span-2 ${idx === 0 ? 'md:col-start-6' : ''}`}>
              <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-6">{group.title}</h4>
              <div className="flex flex-col gap-4 text-[13px] text-white">
                {group.links?.map((link, linkIdx) => (
                  <Link key={linkIdx} href={link.url} className="hover:text-white/70 transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] text-white font-medium">
          <div className="flex gap-8">
            {data.bottomLinks?.map((link, idx) => (
              <Link key={idx} href={link.url} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} {data.copyrightText}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 8: Generate types and verify build**

Run: `pnpm payload generate:types`

Then: `pnpm build`

Expected: Build succeeds with no type errors.

- [ ] **Step 9: Commit**

```bash
git add src/globals/Header.ts src/globals/Footer.ts src/payload.config.ts src/seed.ts src/app/\(frontend\)/layout.tsx src/components/Header.tsx src/components/Footer.tsx src/payload-types.ts
git commit -m "feat: migrate Header and Footer to CMS globals"
```

---

## Task 2: New Collections — Legal Pages, Nodal Officers, Training Leads

**Files:**
- Create: `src/collections/LegalPages.ts`
- Create: `src/collections/NodalOfficers.ts`
- Create: `src/collections/TrainingLeadsDirectory.ts`
- Create: `src/app/(frontend)/legal/[slug]/page.tsx`
- Modify: `src/payload.config.ts`
- Modify: `src/seed.ts`
- Modify: `src/app/(frontend)/sectoral-nodal-officers/page.tsx`
- Modify: `src/app/(frontend)/training-leads/page.tsx`
- Delete: `src/app/(frontend)/terms-of-use/page.tsx`
- Delete: `src/app/(frontend)/privacy-policy/page.tsx`
- Delete: `src/app/(frontend)/disclaimer/page.tsx`

- [ ] **Step 1: Create LegalPages collection**

Create `src/collections/LegalPages.ts`:

```ts
import type { CollectionConfig } from 'payload'

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'contactEmail', type: 'text' },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'richText', required: true },
      ],
    },
    {
      name: 'acknowledgment',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'body', type: 'richText' },
      ],
    },
  ],
}
```

- [ ] **Step 2: Create NodalOfficers collection**

Create `src/collections/NodalOfficers.ts`:

```ts
import type { CollectionConfig } from 'payload'

export const NodalOfficers: CollectionConfig = {
  slug: 'nodal-officers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'organization', 'sector', 'order'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'designation', type: 'text', required: true },
    { name: 'organization', type: 'text', required: true },
    { name: 'sector', type: 'text', required: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
```

- [ ] **Step 3: Create TrainingLeadsDirectory collection**

Create `src/collections/TrainingLeadsDirectory.ts`:

```ts
import type { CollectionConfig } from 'payload'

export const TrainingLeadsDirectory: CollectionConfig = {
  slug: 'training-leads-directory',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'organization', 'specialization', 'order'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'designation', type: 'text' },
    { name: 'organization', type: 'text', required: true },
    { name: 'specialization', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
```

- [ ] **Step 4: Register collections in payload.config.ts**

Add imports and register in collections array:

```ts
import { LegalPages } from './collections/LegalPages'
import { NodalOfficers } from './collections/NodalOfficers'
import { TrainingLeadsDirectory } from './collections/TrainingLeadsDirectory'

// In buildConfig.collections:
collections: [
  { slug: 'users', /* ... */ },
  Pages,
  RegulatoryUpdates,
  Certifications,
  NewsItems,
  Members,
  LegalPages,
  NodalOfficers,
  TrainingLeadsDirectory,
],
```

Also add to `livePreview.collections`:
```ts
collections: ['pages', 'regulatory-updates', 'certifications', 'news-items', 'members', 'legal-pages', 'nodal-officers', 'training-leads-directory'],
```

- [ ] **Step 5: Add seed data for Nodal Officers**

Add to `seed.ts` seed function:

```ts
  console.log('Seeding nodal officers...')
  const nodalOfficers = [
    { name: 'Ms Rakhee Sengupta', designation: 'Nodal Officer', organization: 'ICICI Bank', sector: 'Banks', order: 1 },
    { name: 'Mr Manish Vasishta', designation: 'Nodal Officer', organization: 'Axis Bank', sector: 'Banks', order: 2 },
    { name: 'Ms Jyothi N M', designation: 'Asst. GM & PO', organization: 'BillDesk', sector: 'Payment Aggregators / PA - Cross Border', order: 3 },
    { name: 'Mr Aashish Pathak', designation: 'Nodal Officer', organization: 'Fino Payments Bank', sector: 'Payment Banks / PPI Issuers', order: 4 },
    { name: 'Mr Sameer Seksaria', designation: 'Nodal Officer', organization: 'HDFC Mutual Fund', sector: 'Asset Management', order: 5 },
    { name: 'Mr Amit Madhusudan Retharekar', designation: 'CCO', organization: 'Karad Urban Co-Operative Bank', sector: 'Co-operative Banks', order: 6 },
    { name: 'Ms Roopa Venkatesh', designation: 'Nodal Officer', organization: 'Zerodha Broking Limited', sector: 'Brokers', order: 7 },
    { name: 'Mr Neelesh Sarda', designation: 'Nodal Officer', organization: 'Bajaj Finserv', sector: 'NBFC', order: 8 },
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
```

- [ ] **Step 6: Add seed data for Training Leads**

Add to `seed.ts`:

```ts
  console.log('Seeding training leads...')
  const trainingLeads = [
    { name: 'Mr Nihal Shah', designation: '', organization: 'Citibank NA', specialization: 'Foreign Banks AML Framework', order: 1 },
    { name: 'Mr Shirish Pathak', designation: '', organization: 'Fintelekt Advisory Services Pvt Ltd', specialization: '', order: 2 },
    { name: 'Mr Sameer Seksaria', designation: '', organization: 'HDFC AMC', specialization: 'Asset Management Compliance', order: 3 },
    { name: 'Mr Gyan Gotan', designation: '', organization: 'HDFC Bank', specialization: 'Private Banking AML Framework', order: 4 },
    { name: 'Ms Rakhee Sengupta', designation: '', organization: 'ICICI Bank', specialization: 'Retail Banking AML', order: 5 },
    { name: 'Ms Jyothi N M', designation: 'Asst. GM & PO', organization: 'BillDesk', specialization: 'PA/PACB, BBPS AML Framework', order: 6 },
    { name: 'Mr Prashant Sinha', designation: '', organization: 'Jio Financial Services', specialization: '', order: 7 },
    { name: 'Mr Hemang Sheth', designation: '', organization: 'JP Morgan Chase Bank NA', specialization: '', order: 8 },
    { name: 'Mr Amit Madhusudan Retharekar', designation: 'CCO', organization: 'Karad Urban Co-Operative Bank', specialization: 'Cooperative Banking AML Framework', order: 9 },
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
```

- [ ] **Step 7: Add seed data for Legal Pages**

Add to `seed.ts`. Legal pages contain long rich text content. Since Payload uses Lexical editor, the body fields need to be serialized as Lexical JSON. For the initial seed, use a simple paragraph node structure.

Create a helper at the top of `seed.ts`:

```ts
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
```

Then seed the 3 legal pages with their section titles. The full body text for each section should be copied from the existing hardcoded pages. For brevity, here is the structure — the implementer must copy the exact paragraph text from each existing page file:

```ts
  console.log('Seeding legal pages...')
  const legalPages = [
    {
      title: 'Website Terms of Use',
      slug: 'terms-of-use',
      contactEmail: 'help.arifac@iamai.in',
      sections: [
        { title: '1. Acceptance of Terms', body: richTextParagraph('By accessing...') },
        // ... copy all 19 section titles and their paragraph text from src/app/(frontend)/terms-of-use/page.tsx
      ],
      acknowledgment: {
        heading: 'Acknowledgment',
        body: richTextParagraph('Effective: 23rd March, 2026 | Version 1.0'),
      },
    },
    {
      title: 'Privacy Policy & Data Protection',
      slug: 'privacy-policy',
      contactEmail: 'help.arifac@iamai.in',
      sections: [
        { title: '1. Introduction', body: richTextParagraph('ARIFAC...') },
        // ... copy all 19 sections from src/app/(frontend)/privacy-policy/page.tsx
      ],
      acknowledgment: {
        heading: 'Acknowledgment',
        body: richTextParagraph('Effective: 23rd March, 2026 | DPDP Act, 2023 Aligned'),
      },
    },
    {
      title: 'Disclaimer',
      slug: 'disclaimer',
      contactEmail: 'help.arifac@iamai.in',
      sections: [
        { title: '1. General Disclaimer', body: richTextParagraph('The content...') },
        // ... copy all 7 sections from src/app/(frontend)/disclaimer/page.tsx
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
```

**IMPORTANT:** The implementer must read each legal page file and copy the full paragraph text into `richTextParagraph()` calls. Do not use placeholder text.

- [ ] **Step 8: Create dynamic legal page route**

Create `src/app/(frontend)/legal/[slug]/page.tsx`:

```tsx
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import StaticPageLayout from '@/components/StaticPageLayout'
import RichText from '@/components/RichText'

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'legal-pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) notFound()

  return (
    <StaticPageLayout
      title={page.title}
      description=""
      label="Legal Documentation"
    >
      <div className="max-w-4xl mx-auto">
        {page.sections?.map((section, idx) => (
          <div key={idx} className="mb-10">
            <h2 className="text-[18px] font-bold text-neutral-900 mb-4">{section.title}</h2>
            <div className="text-neutral-600 text-[15px] leading-relaxed">
              <RichText data={section.body} />
            </div>
          </div>
        ))}

        {page.acknowledgment?.heading && (
          <div className="mt-16 pt-8 border-t border-neutral-200">
            <h2 className="text-[18px] font-bold text-neutral-900 mb-4">{page.acknowledgment.heading}</h2>
            <div className="text-neutral-600 text-[15px] leading-relaxed">
              <RichText data={page.acknowledgment.body} />
            </div>
          </div>
        )}

        {page.contactEmail && (
          <div className="mt-8 text-neutral-500 text-[13px]">
            For questions, contact: <a href={`mailto:${page.contactEmail}`} className="text-brand hover:underline">{page.contactEmail}</a>
          </div>
        )}
      </div>
    </StaticPageLayout>
  )
}
```

**Note:** Check if a `RichText` component already exists in the project. If not, create a simple one that renders Lexical rich text content. Payload 3.x with Lexical typically provides `@payloadcms/richtext-lexical/react` with a `RichText` component, or you can use `serializeLexical` to convert to HTML.

- [ ] **Step 9: Refactor Sectoral Nodal Officers page**

Replace the hardcoded `sectors` array in `src/app/(frontend)/sectoral-nodal-officers/page.tsx` with a CMS fetch:

```ts
const { docs: officers } = await payload.find({
  collection: 'nodal-officers',
  sort: 'order',
  limit: 100,
})

// Group by sector for display
const sectorMap = new Map<string, typeof officers>()
for (const officer of officers) {
  const sector = officer.sector
  if (!sectorMap.has(sector)) sectorMap.set(sector, [])
  sectorMap.get(sector)!.push(officer)
}
const sectors = Array.from(sectorMap.entries()).map(([name, officers]) => ({ name, officers }))
```

Remove the hardcoded `sectors` array and `OfficerCard`/`SectorGroup` inline data. Keep the component rendering logic, just swap the data source.

- [ ] **Step 10: Refactor Training Leads page**

Replace the hardcoded `trainingLeads` array in `src/app/(frontend)/training-leads/page.tsx` with a CMS fetch:

```ts
const { docs: trainingLeads } = await payload.find({
  collection: 'training-leads-directory',
  sort: 'order',
  limit: 100,
})
```

Remove the hardcoded array. Keep the `LeadRow` component and table rendering, just use CMS data. Map `specialization` field to what was previously `specialisation`.

- [ ] **Step 11: Delete old legal page files**

Delete:
- `src/app/(frontend)/terms-of-use/page.tsx`
- `src/app/(frontend)/privacy-policy/page.tsx`
- `src/app/(frontend)/disclaimer/page.tsx`

These are replaced by `src/app/(frontend)/legal/[slug]/page.tsx`.

- [ ] **Step 12: Generate types and verify build**

Run: `pnpm payload generate:types`

Then: `pnpm build`

Expected: Build succeeds.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: add Legal Pages, Nodal Officers, Training Leads collections"
```

---

## Task 3: New Homepage Blocks — Partnerships & Community

**Files:**
- Create: `src/blocks/PartnershipsBlock.ts`
- Create: `src/blocks/CommunityBlock.ts`
- Modify: `src/collections/Pages.ts`
- Modify: `src/components/BlockRenderer.tsx`
- Modify: `src/components/Partnerships.tsx`
- Modify: `src/components/CommunitySection.tsx`
- Modify: `src/seed.ts`

- [ ] **Step 1: Create PartnershipsBlock schema**

Create `src/blocks/PartnershipsBlock.ts`:

```ts
import type { Block } from 'payload'

export const PartnershipsBlock: Block = {
  slug: 'partnerships',
  fields: [
    { name: 'label', type: 'text', defaultValue: 'Partnerships' },
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'guidanceCard',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Strategic Guidance' },
        { name: 'title', type: 'text', required: true },
        { name: 'logoUrl', type: 'text' },
      ],
    },
    { name: 'disclaimer', type: 'text' },
  ],
}
```

- [ ] **Step 2: Create CommunityBlock schema**

Create `src/blocks/CommunityBlock.ts`:

```ts
import type { Block } from 'payload'

export const CommunityBlock: Block = {
  slug: 'community',
  fields: [
    { name: 'label', type: 'text', defaultValue: 'National Network' },
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'eyebrow', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'stat',
      type: 'group',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
      ],
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Join the Network' },
    { name: 'ctaLink', type: 'text', defaultValue: '/membership' },
  ],
}
```

- [ ] **Step 3: Register blocks in Pages collection**

In `src/collections/Pages.ts`, import and add both blocks to the `layout.blocks` array:

```ts
import { PartnershipsBlock } from '../blocks/PartnershipsBlock'
import { CommunityBlock } from '../blocks/CommunityBlock'

// In the layout field's blocks array:
blocks: [
  HeroBlock,
  StatsBlock,
  CapabilityMatrixBlock,
  RegulatoryDashboardBlock,
  FeaturedProgramsBlock,
  CTABlock,
  PartnershipsBlock,
  CommunityBlock,
],
```

- [ ] **Step 4: Add block cases to BlockRenderer**

Modify `src/components/BlockRenderer.tsx`:

```ts
import Partnerships from '@/components/Partnerships'
import CommunitySection from '@/components/CommunitySection'

// In the switch statement, REMOVE the wrapper div around regulatoryDashboard
// and add new cases:

case 'partnerships':
  return <Partnerships key={index} data={block} />
case 'community':
  return <CommunitySection key={index} data={block} />
case 'regulatoryDashboard':
  return <RegulatoryDashboard key={index} data={block} updates={regulatoryUpdates} />
```

Remove the current `<div>` wrapper that renders `<Partnerships />` before `<RegulatoryDashboard>` — partnerships is now its own block.

- [ ] **Step 5: Refactor Partnerships component to accept CMS data**

Modify `src/components/Partnerships.tsx` to accept a `data` prop:

```tsx
import type { Page } from '@/payload-types'

type PartnershipsBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'partnerships' }>

interface PartnershipsProps {
  data: PartnershipsBlockData
}

export default function Partnerships({ data }: PartnershipsProps) {
  return (
    <section className="pt-4 pb-16 md:pt-6 md:pb-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end mb-16">
          {/* Left: Strategic Guidance */}
          <div className="group relative bg-white p-8 lg:p-10 border border-neutral-100 hover:border-brand/40 hover:shadow-xl transition-all duration-500">
            <div className="absolute top-6 right-8 text-5xl font-black text-neutral-100 group-hover:text-brand/5 transition-colors pointer-events-none select-none">01</div>
            <div className="relative z-10">
              <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-4 block">
                {data.guidanceCard?.label}
              </span>
              <div className="flex items-center gap-4">
                {data.guidanceCard?.logoUrl && (
                  <img src={data.guidanceCard.logoUrl} alt="" className="h-12 w-auto object-contain" />
                )}
                <h3 className="text-[20px] font-bold text-neutral-900 leading-tight group-hover:text-brand transition-colors">
                  {data.guidanceCard?.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Right: Section Header */}
          <div>
            <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-4 block">{data.label}</span>
            <h2 className="text-3xl lg:text-[42px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-6">{data.heading}</h2>
            <p className="text-neutral-600 text-[16px] lg:text-[18px] leading-relaxed">{data.description}</p>
          </div>
        </div>

        {data.disclaimer && (
          <div className="border-t border-neutral-200 pt-6">
            <p className="text-neutral-400 text-[13px] leading-relaxed">
              <span className="font-bold text-neutral-500">Note:</span> {data.disclaimer}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Refactor CommunitySection to accept CMS data**

Modify `src/components/CommunitySection.tsx` to accept a `data` prop. Replace all hardcoded text with `data.label`, `data.heading`, `data.description`, `data.links`, `data.stat`, `data.ctaLabel`, `data.ctaLink`. Keep all styling unchanged.

- [ ] **Step 7: Add partnerships and community blocks to seed data**

In `src/seed.ts`, add the blocks to the home page's layout array (insert before `regulatoryDashboard`):

```ts
{
  blockType: 'partnerships',
  label: 'Partnerships',
  heading: 'Built on shared standards',
  description: 'ARIFAC unites regulatory bodies, industry stakeholders, legal experts, and academicians to strengthen every dimension of financial compliance.',
  guidanceCard: {
    label: 'Strategic Guidance',
    title: 'Financial Intelligence Unit \u2013 India (FIU-IND)',
    logoUrl: '/fiu-logo.png',
  },
  disclaimer: 'ARIFAC is an industry-led platform and does not grant approvals, licenses, or compliance certifications.',
},
{
  blockType: 'community',
  label: 'National Network',
  heading: "India's most authoritative network of compliance leaders.",
  description: 'From Sectoral Nodal Officers to Training Leads across all reporting entities, ARIFAC facilitates the human connections that power financial integrity.',
  links: [
    { eyebrow: 'Network Hub', title: 'Sectoral Nodal Officers', href: '/sectoral-nodal-officers' },
    { eyebrow: 'Excellence', title: 'Training Leads', href: '/training-leads' },
    { eyebrow: 'Engagement', title: 'Event Gallery', href: '/gallery' },
    { eyebrow: 'Collaboration', title: 'Specialized Forums', href: '/forums' },
  ],
  stat: { value: '18+', description: 'Sectors represented including Banking, Fintech, Insurance, and Capital Markets.' },
  ctaLabel: 'Join the Network',
  ctaLink: '/membership',
},
```

- [ ] **Step 8: Remove block filter in page.tsx**

In `src/app/(frontend)/page.tsx`, remove the filter that excludes blocks:

Change:
```ts
blocks={page.layout.filter(block => block.blockType !== 'featuredPrograms' && block.blockType !== 'stats')}
```
To:
```ts
blocks={page.layout}
```

(If `featuredPrograms` and `stats` are intentionally hidden, keep their filter but remove any filter related to `partnerships`.)

- [ ] **Step 9: Generate types and verify build**

Run: `pnpm payload generate:types`

Then: `pnpm build`

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add Partnerships and Community homepage blocks to CMS"
```

---

## Task 4: Page Type Extensions — Membership, Learners, Contributor

**Files:**
- Modify: `src/collections/Pages.ts`
- Modify: `src/seed.ts`
- Modify: `src/app/(frontend)/membership/page.tsx`
- Modify: `src/app/(frontend)/learners/page.tsx`
- Modify: `src/app/(frontend)/contributor/page.tsx`

- [ ] **Step 1: Add new pageType options to Pages collection**

In `src/collections/Pages.ts`, extend the `pageType` select options:

```ts
{
  name: 'pageType',
  type: 'select',
  required: true,
  defaultValue: 'simple',
  options: [
    { label: 'Simple', value: 'simple' },
    { label: 'Home', value: 'home' },
    { label: 'About', value: 'about' },
    { label: 'Contact', value: 'contact' },
    { label: 'Membership', value: 'membership' },
    { label: 'Learners', value: 'learners' },
    { label: 'Contributor', value: 'contributor' },
    { label: 'Certifications', value: 'certifications' },
    { label: 'Updates', value: 'updates' },
  ],
},
```

- [ ] **Step 2: Add Membership field group to Pages**

Add after the `whoSection` field group in `src/collections/Pages.ts`:

```ts
{
  name: 'membershipIntro',
  type: 'group',
  admin: { condition: (data) => data?.pageType === 'membership' },
  fields: [
    { name: 'subheading', type: 'textarea' },
    { name: 'description', type: 'textarea' },
  ],
},
{
  name: 'benefits',
  type: 'array',
  admin: { condition: (data) => data?.pageType === 'membership' },
  fields: [
    { name: 'category', type: 'text', required: true },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
      ],
    },
  ],
},
{
  name: 'responsibilities',
  type: 'array',
  admin: { condition: (data) => data?.pageType === 'membership' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'text', required: true },
  ],
},
{
  name: 'validityTerms',
  type: 'array',
  admin: { condition: (data) => data?.pageType === 'membership' },
  fields: [
    { name: 'text', type: 'text', required: true },
  ],
},
{
  name: 'feeTables',
  type: 'group',
  admin: { condition: (data) => data?.pageType === 'membership' },
  fields: [
    {
      name: 'turnoverBased',
      type: 'array',
      fields: [
        { name: 'tier', type: 'text', required: true },
        { name: 'fee', type: 'text', required: true },
      ],
    },
    {
      name: 'aumBased',
      type: 'array',
      fields: [
        { name: 'tier', type: 'text', required: true },
        { name: 'fee', type: 'text', required: true },
      ],
    },
  ],
},
{
  name: 'membershipCta',
  type: 'group',
  admin: { condition: (data) => data?.pageType === 'membership' },
  fields: [
    { name: 'label', type: 'text' },
    { name: 'link', type: 'text' },
  ],
},
```

- [ ] **Step 3: Add Learners field group to Pages**

```ts
{
  name: 'accessItems',
  type: 'array',
  admin: { condition: (data) => data?.pageType === 'learners' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'text', required: true },
  ],
},
{
  name: 'learnersCta',
  type: 'group',
  admin: { condition: (data) => data?.pageType === 'learners' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'buttonLabel', type: 'text' },
    { name: 'buttonLink', type: 'text' },
  ],
},
```

- [ ] **Step 4: Add Contributor field group to Pages**

```ts
{
  name: 'expertiseAreas',
  type: 'array',
  admin: { condition: (data) => data?.pageType === 'contributor' },
  fields: [
    { name: 'label', type: 'text', required: true },
  ],
},
{
  name: 'whyContribute',
  type: 'group',
  admin: { condition: (data) => data?.pageType === 'contributor' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Why Contribute to ARIFAC?' },
    {
      name: 'points',
      type: 'array',
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
  ],
},
```

- [ ] **Step 5: Add Certifications pageType field group**

```ts
{
  name: 'pathwayTiers',
  type: 'array',
  admin: { condition: (data) => data?.pageType === 'certifications' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'text', required: true },
  ],
},
```

- [ ] **Step 6: Update seed data for Membership page**

In `src/seed.ts`, update the existing membership page seed entry (change `pageType` from `'simple'` to `'membership'` and add all fields):

```ts
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
```

- [ ] **Step 7: Update seed data for Learners page**

Update the existing learners page seed (change `pageType` to `'learners'`):

```ts
{
  title: 'Register with ARIFAC',
  slug: 'learners',
  pageType: 'learners' as const,
  banner: {
    label: 'Learners',
    title: 'Register with ARIFAC',
    description: 'ARIFAC brings together institutions and professionals at the forefront of financial intelligence in India.',
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
```

- [ ] **Step 8: Update seed data for Contributor page**

Update the existing contributor page seed (change `pageType` to `'contributor'`):

```ts
{
  title: 'Become a Contributor',
  slug: 'contributor',
  pageType: 'contributor' as const,
  banner: {
    label: 'Contributor',
    title: 'Become a Contributor',
    description: 'Join ARIFAC\'s network of experts and practitioners shaping the future of financial intelligence in India.',
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
```

- [ ] **Step 9: Update seed data for Certifications page**

Update the existing certifications page seed entry. If there isn't a dedicated one, create it:

```ts
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
```

- [ ] **Step 10: Refactor Membership page to use CMS data**

Rewrite `src/app/(frontend)/membership/page.tsx` as a server component that fetches the `membership` page from CMS:

```ts
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import StaticPageLayout from '@/components/StaticPageLayout'

export default async function MembershipPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'membership' } },
    limit: 1,
    draft: true,
  })
  const page = result.docs[0]
  if (!page) notFound()

  // Render using page.banner, page.membershipIntro, page.benefits,
  // page.responsibilities, page.validityTerms, page.feeTables, page.membershipCta
  // Keep existing JSX structure and styling, just swap data sources
}
```

The implementer should preserve the existing component structure and Tailwind styling, replacing only the hardcoded data references with CMS fields.

- [ ] **Step 11: Refactor Learners page to use CMS data**

Rewrite `src/app/(frontend)/learners/page.tsx` as a server component that fetches the `learners` page:

```ts
const result = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'learners' } },
  limit: 1,
  draft: true,
})
const page = result.docs[0]
// Use page.banner, page.accessItems, page.learnersCta
```

- [ ] **Step 12: Refactor Contributor page to use CMS data**

Modify `src/app/(frontend)/contributor/page.tsx`. This page has a client-side form, so it needs a split:
- Server component fetches CMS data (expertise areas, whyContribute sidebar, banner)
- Pass as props to the existing client component (or create a wrapper)

The form itself (field labels, validation) stays hardcoded — only the expertise options and sidebar content come from CMS.

- [ ] **Step 13: Refactor Certifications page to pass banner and tiers from CMS**

Modify `src/app/(frontend)/certifications/page.tsx`:

```ts
const pageResult = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'certifications' } },
  limit: 1,
  draft: true,
})
const page = pageResult.docs[0]

// Use page.banner for PageBanner props
// Pass page.pathwayTiers to CertificationsFilter as a new prop
```

Update `CertificationsFilter` to accept `pathwayTiers` prop and remove hardcoded tier data.

- [ ] **Step 14: Refactor Updates page banner from CMS**

Modify `src/app/(frontend)/updates/page.tsx`:

```ts
const pageResult = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'updates' } },
  limit: 1,
  draft: true,
})
const page = pageResult.docs[0]
// Use page?.banner for PageBanner props, with fallbacks
```

- [ ] **Step 15: Generate types and verify build**

Run: `pnpm payload generate:types`

Then: `pnpm build`

- [ ] **Step 16: Commit**

```bash
git add -A
git commit -m "feat: migrate Membership, Learners, Contributor, Certifications, Updates pages to CMS"
```

---

## Task 5: Programmes Global Extension

**Files:**
- Modify: `src/globals/Programmes.ts`
- Modify: `src/seed.ts`
- Modify: `src/app/(frontend)/programmes/page.tsx`

- [ ] **Step 1: Add banner and sectionHeadings to Programmes global**

In `src/globals/Programmes.ts`, add fields at the top of the fields array:

```ts
{
  name: 'banner',
  type: 'group',
  fields: [
    { name: 'label', type: 'text', defaultValue: 'Programmes' },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
  ],
},
{
  name: 'sectionHeadings',
  type: 'group',
  fields: [
    { name: 'engagementStrategy', type: 'text', defaultValue: 'Engagement Strategy' },
    { name: 'programmeSchedule', type: 'text', defaultValue: 'Programme Schedule' },
    { name: 'recentConsultations', type: 'text', defaultValue: 'Recent Consultations' },
    { name: 'annualMeetings', type: 'text', defaultValue: 'Annual Meetings & Regulatory Fora' },
  ],
},
```

- [ ] **Step 2: Add Programmes banner seed data**

In `src/seed.ts`, update the programmes global seeding (or add if not present):

```ts
console.log('Seeding programmes global...')
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
    // Keep existing engagementFormats, programmeSchedule, etc. if already seeded
  },
})
```

- [ ] **Step 3: Update Programmes page to use CMS banner and headings**

In `src/app/(frontend)/programmes/page.tsx`, replace hardcoded PageBanner props and section heading strings with data from the global:

```ts
const programmes = await payload.findGlobal({ slug: 'programmes', draft: true })

// Use programmes.banner.label, programmes.banner.title, programmes.banner.description for PageBanner
// Use programmes.sectionHeadings.engagementStrategy, etc. for section headings
```

- [ ] **Step 4: Generate types and verify build**

Run: `pnpm payload generate:types`

Then: `pnpm build`

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: migrate Programmes page banner and section headings to CMS"
```

---

## Task 6: About Page — Remove Hardcoded Paragraph

**Files:**
- Modify: `src/app/(frontend)/about/page.tsx`

- [ ] **Step 1: Remove hardcoded paragraph and bullets**

In `src/app/(frontend)/about/page.tsx`, the hardcoded paragraph at lines 46-61 ("The increasing scale and sophistication of financial crime...") and 3 bullets (PMLA, FIU-IND, FATF) should already be covered by the CMS `whySection.description` and `whySection.alignedWith` fields. Remove the hardcoded JSX and ensure the component renders purely from CMS data.

Check if the seed data in `seed.ts` already includes equivalent content in `whySection.description`. If not, update the seed to include the full paragraph text.

- [ ] **Step 2: Verify build**

Run: `pnpm build`

- [ ] **Step 3: Commit**

```bash
git add src/app/\(frontend\)/about/page.tsx
git commit -m "fix: remove hardcoded content from About page, use CMS data only"
```

---

## Task 7: Updates Page Seed & Final Cleanup

**Files:**
- Modify: `src/seed.ts`
- Modify: `src/payload.config.ts` (if livePreview needs updates)

- [ ] **Step 1: Add Updates page to seed data**

Ensure there's a page entry for updates:

```ts
{
  title: 'Regulatory Updates',
  slug: 'updates',
  pageType: 'updates' as const,
  banner: {
    label: 'Regulatory Updates',
    title: 'Recent Circulars and Notifications',
    description: 'Track the latest regulatory circulars, notifications, and compliance guidance from RBI, FIU-IND, SEBI, and IRDAI — curated for reporting entities across all sectors.',
  },
},
```

- [ ] **Step 2: Update livePreview URLs for new collections**

In `src/payload.config.ts`, update the `livePreview.url` function to handle new collection/global slugs:

```ts
if (collectionConfig.slug === 'legal-pages') {
  const slug = data?.slug
  return `${baseUrl}/legal/${slug}`
}
if (collectionConfig.slug === 'nodal-officers') return `${baseUrl}/sectoral-nodal-officers`
if (collectionConfig.slug === 'training-leads-directory') return `${baseUrl}/training-leads`
```

- [ ] **Step 3: Final type generation**

Run: `pnpm payload generate:types`

Then: `pnpm build`

Expected: Full build succeeds with zero hardcoded content remaining (except UI chrome labels as noted in spec exclusions).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: complete CMS migration — seed updates page, configure live preview"
```

---

## Summary

| Task | Scope | Files |
|------|-------|-------|
| 1 | Header & Footer globals | 7 files |
| 2 | Legal Pages, Nodal Officers, Training Leads collections | 10+ files |
| 3 | Partnerships & Community homepage blocks | 7 files |
| 4 | Membership, Learners, Contributor, Certifications, Updates page types | 8+ files |
| 5 | Programmes global extension | 3 files |
| 6 | About page hardcoded content removal | 1 file |
| 7 | Final seed data & live preview cleanup | 2 files |

Each task produces a working, committable state. Tasks 1-3 are independent and can be parallelized. Tasks 4-7 depend on Task 1 (for type generation) but are otherwise independent of each other.
