# Phase 2: Content Modeling & Frontend Integration - Research

**Researched:** 2026-04-11
**Domain:** Payload CMS content modeling, Local API data fetching, Next.js server components
**Confidence:** HIGH

## Summary

This phase converts the ARIFAC site from fully hardcoded content to CMS-driven rendering using Payload CMS 3.82+ already installed in Phase 1. The work divides into three domains: (1) defining Payload collections, globals, and block types in `src/payload.config.ts`, (2) converting frontend pages from client components with hardcoded data to server components that fetch via Payload's Local API, and (3) enabling Payload's built-in Versions feature for audit trail.

The existing codebase has a clean separation: 14 pages use `StaticPageLayout` (server-compatible pattern), 5 pages use `"use client"` (home, about, certifications, programmes, updates). The conversion requires removing `"use client"` from pages, extracting interactive parts into client component islands, and making page components async functions that call `payload.find()` / `payload.findGlobal()`.

**Primary recommendation:** Define all Payload collections/globals/blocks in separate config files under `src/collections/` and `src/globals/`, use `getPayload({ config: configPromise })` in server components for data fetching, and enable `versions: { drafts: false, maxPerDoc: 20 }` on all content types.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Single Pages collection for ALL pages -- home, static, and complex pages in one collection
- **D-02:** Home page is a document in Pages (slug: 'home') with block-based layout field
- **D-03:** Simple static pages use banner fields + rich text body
- **D-04:** Complex pages get additional structured fields controlled by `pageType` field
- **D-05:** All text/data from CMS -- layouts in React, content CMS-managed
- **D-06:** Regulatory Updates collection: title, date, reference number, category, issuing body
- **D-07:** Certifications collection (TEMPORARY): title, level, focus, category, format, description, curriculum array, duration
- **D-08:** Programmes as a Payload Global with three array fields
- **D-09:** News Items as separate collection with text + published status
- **D-10:** Server components for all page-level components, remove 'use client'
- **D-11:** Client component islands for interactive parts (filtering, navigation state)
- **D-12:** Missing/empty CMS content = hide section; missing pages = 404
- **D-13:** Payload Versions on all collections/globals, zero custom code
- **D-14:** Editors can restore previous versions
- **D-15:** No draft mode (versions: { drafts: false })

### Claude's Discretion
- Local API vs REST for data fetching (Local API is standard)
- Block type definitions and field granularity for home page blocks
- pageType conditional field logic implementation
- Version retention count (maxPerDoc)
- Dynamic route setup for Pages collection

### Deferred Ideas (OUT OF SCOPE)
- LMS API integration for certifications
- Payload Live Preview / visual editing (ADV-01)
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HOME-01 | Hero section editable from CMS | HeroBlock definition in Pages collection blocks field |
| HOME-02 | Stats strip editable from CMS | StatsBlock definition with array of stat items |
| HOME-03 | Featured programs editable from CMS | FeaturedProgramsBlock (note: currently CapabilityMatrix component) |
| HOME-04 | Regulatory dashboard editable from CMS | RegulatoryDashboardBlock pulling from RegulatoryUpdates collection |
| HOME-05 | Capability matrix editable from CMS | CapabilityMatrixBlock with array of mandate cards |
| HOME-06 | Final CTA section editable from CMS | CTABlock with heading, body, and button links |
| PAGE-01 | All ~15 static pages editable | Pages collection with slug-based lookup, rich text body |
| PAGE-02 | Page banner titles/descriptions editable | Banner fields (label, title, description) on Pages collection |
| COLL-01 | Regulatory updates as individual entries | RegulatoryUpdates collection with versions |
| COLL-02 | Certifications as individual entries | Certifications collection (temporary, easily removable) |
| COLL-03 | Programmes manageable | Programmes global with three array fields |
| CONF-01 | News scroller editable | NewsItems collection with text + published status |
| AUDIT-01 | Change logs who/when | Payload Versions feature on all collections/globals |
| AUDIT-02 | Admin can view change history | Payload admin panel version history UI (built-in) |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| payload | ^3.82.1 | CMS framework | Already installed, runs natively in Next.js [VERIFIED: package.json] |
| @payloadcms/richtext-lexical | ^3.82.1 | Rich text editor | Already configured in payload.config.ts [VERIFIED: package.json] |
| @payloadcms/db-postgres | ^3.82.1 | Database adapter | Already configured with PostgreSQL [VERIFIED: package.json] |
| next | 16.2.3 | Application framework | Already installed [VERIFIED: package.json] |

### Supporting
No additional libraries needed. All functionality comes from Payload's built-in features (blocks, versions, Local API, globals).

**Installation:** No new packages required. All dependencies already installed in Phase 1.

## Architecture Patterns

### Recommended Project Structure
```
src/
  collections/
    Pages.ts            # Single pages collection (D-01)
    RegulatoryUpdates.ts # Regulatory updates (D-06)
    Certifications.ts    # Temporary certifications (D-07)
    NewsItems.ts         # News scroller items (D-09)
  globals/
    Programmes.ts        # Programmes global (D-08)
  blocks/
    HeroBlock.ts         # Home page hero (HOME-01)
    StatsBlock.ts        # Stats strip (HOME-02)
    CapabilityMatrixBlock.ts # Capability matrix (HOME-05)
    RegulatoryDashboardBlock.ts # Reg dashboard (HOME-04)
    CTABlock.ts          # Final CTA section (HOME-06)
  payload.config.ts      # Import and register all above
  payload-types.ts       # Auto-generated TypeScript types
  app/
    (frontend)/
      [slug]/page.tsx    # Dynamic route for all pages
      page.tsx           # Home page (fetches slug='home')
      certifications/page.tsx # Remains separate (client filtering)
      updates/page.tsx        # Remains separate (client filtering)
  components/
    Hero.tsx             # Accepts CMS data as props (not hardcoded)
    StatsStrip.tsx       # Accepts CMS data as props
    ...                  # All components become prop-driven
    CertificationsFilter.tsx  # Client island for filtering
    NewsScroller.tsx     # Client island for marquee animation
```

### Pattern 1: Payload Local API Data Fetching in Server Components
**What:** Use `getPayload()` to get Payload instance, call `.find()` / `.findByID()` / `.findGlobal()` directly in async server components
**When to use:** Every page-level component that needs CMS data
**Example:**
```typescript
// src/app/(frontend)/[slug]/page.tsx
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) notFound()

  return <PageRenderer page={page} />
}
```
[VERIFIED: getPayload signature from node_modules/payload/dist/index.d.ts, params is async in Next.js 15+]

### Pattern 2: Block-Based Layout Rendering
**What:** Home page stored as blocks in Pages collection, rendered by a block router component
**When to use:** Home page and any future composable pages
**Example:**
```typescript
// src/components/BlockRenderer.tsx
import type { Page } from '@/payload-types'

type Block = NonNullable<Page['layout']>[number]

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks?.map((block, i) => {
        switch (block.blockType) {
          case 'hero': return <Hero key={i} data={block} />
          case 'stats': return <StatsStrip key={i} data={block} />
          case 'capabilityMatrix': return <CapabilityMatrix key={i} data={block} />
          case 'regulatoryDashboard': return <RegulatoryDashboard key={i} data={block} />
          case 'cta': return <CTASection key={i} data={block} />
          default: return null
        }
      })}
    </>
  )
}
```
[ASSUMED: Block type discriminated union pattern is standard Payload]

### Pattern 3: Client Component Islands
**What:** Extract interactive-only logic into small client components, pass data from server parent
**When to use:** Certifications filtering, news scroller marquee, header active state
**Example:**
```typescript
// Server component fetches data
// src/app/(frontend)/certifications/page.tsx
export default async function CertificationsPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({ collection: 'certifications', limit: 100 })
  return (
    <div>
      <Header />
      <PageBanner label="Certifications" title="..." description="..." />
      <CertificationsFilter certifications={docs} /> {/* Client island */}
      <Footer />
    </div>
  )
}

// Client component handles interactivity
// src/components/CertificationsFilter.tsx
'use client'
import { useState, useMemo } from 'react'
export default function CertificationsFilter({ certifications }: { certifications: Certification[] }) {
  const [search, setSearch] = useState('')
  // ... filtering logic, same as current
}
```
[VERIFIED: React server/client component pattern from Next.js App Router]

### Pattern 4: Conditional Fields via Payload Admin Conditions
**What:** Use Payload's `admin.condition` on fields to show/hide based on `pageType` value
**When to use:** Complex static pages (about, contact) that need extra structured fields beyond rich text
**Example:**
```typescript
// In Pages collection
{
  name: 'pageType',
  type: 'select',
  options: [
    { label: 'Simple', value: 'simple' },
    { label: 'About', value: 'about' },
    { label: 'Contact', value: 'contact' },
    { label: 'Home', value: 'home' },
  ],
  defaultValue: 'simple',
},
{
  name: 'layout',
  type: 'blocks',
  blocks: [HeroBlock, StatsBlock, CapabilityMatrixBlock, ...],
  admin: {
    condition: (data) => data?.pageType === 'home',
  },
},
{
  name: 'aboutSections',
  type: 'array',
  admin: {
    condition: (data) => data?.pageType === 'about',
  },
  fields: [/* structured about page fields */],
},
```
[VERIFIED: admin.condition exists in Payload field config types]

### Pattern 5: Versions Configuration (No Drafts)
**What:** Enable version tracking without draft/publish workflow
**When to use:** All collections and globals per D-13, D-14, D-15
**Example:**
```typescript
{
  slug: 'pages',
  versions: {
    drafts: false,
    maxPerDoc: 20,
  },
  // ... fields
}
```
[VERIFIED: IncomingCollectionVersions type from node_modules/payload/dist/versions/types.d.ts -- maxPerDoc defaults to 100, drafts can be false]

### Anti-Patterns to Avoid
- **Fetching CMS data in client components:** Never use REST API from client-side. Always fetch in server components via Local API, pass as props to client islands.
- **Using `"use client"` on page files:** Page files should be server components. Only small interactive pieces should be client components.
- **Creating separate routes for each static page:** Use `[slug]/page.tsx` dynamic route, not 15+ individual page files. Exception: home page (root `/`), certifications, and updates which have unique layouts.
- **Hand-rolling audit trail:** Payload Versions handles this completely. Do not build custom logging.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Version history / audit trail | Custom change log table, hooks | Payload Versions (`versions: { drafts: false }`) | Built-in tracking of who/what/when, admin UI for viewing history, restore capability [VERIFIED: Payload versions types] |
| Rich text editing | Custom editor integration | `@payloadcms/richtext-lexical` (already configured) | Full-featured editor with inline toolbars, already set up in payload.config.ts |
| Conditional admin fields | Custom React admin components | Payload `admin.condition` on fields | Native field-level visibility control based on sibling field values |
| TypeScript types for CMS data | Manual type definitions | `pnpm payload generate:types` | Auto-generates from collection/global configs, stays in sync |
| Content querying/filtering | Custom SQL queries | Payload Local API `payload.find({ where: ... })` | Type-safe, handles relations, pagination, access control |

**Key insight:** Payload CMS provides everything needed for this phase out of the box. The entire phase is configuration (collection/global/block definitions) plus frontend wiring (server component data fetching). Zero custom CMS functionality is needed.

## Common Pitfalls

### Pitfall 1: Forgetting to Generate TypeScript Types After Config Changes
**What goes wrong:** TypeScript errors or missing type information when accessing CMS data in components
**Why it happens:** Payload generates types from collection configs, but this must be triggered manually
**How to avoid:** Run `pnpm payload generate:types` after every collection/global/block config change. The output goes to `src/payload-types.ts` as configured in payload.config.ts.
**Warning signs:** `any` types on CMS data, missing autocomplete for field names

### Pitfall 2: Async Params in Next.js 15+
**What goes wrong:** Runtime errors when accessing `params.slug` directly
**Why it happens:** In Next.js 15+, `params` is a Promise and must be awaited
**How to avoid:** Always `const { slug } = await params` in page components
**Warning signs:** TypeScript error about Promise type on params
[VERIFIED: Next.js 15+ async params pattern from Next.js docs]

### Pitfall 3: Client Components Cannot Be Async
**What goes wrong:** Build errors if you try to make a `"use client"` component async
**Why it happens:** Client components run in the browser; they cannot use async/await at the component level
**How to avoid:** Only server components are async. Client components receive data as props.
**Warning signs:** "async Client Component" error during build

### Pitfall 4: Database Migrations Required for New Collections
**What goes wrong:** Collections defined in config but no database tables exist
**Why it happens:** Phase 1 established "must use migration workflow from day one"
**How to avoid:** After defining collections/globals, run `pnpm payload migrate:create` to generate a migration, then `pnpm payload migrate` to apply it
**Warning signs:** Runtime errors about missing tables
[CITED: .planning/STATE.md -- "Must use migration workflow from day one"]

### Pitfall 5: Home Page Slug Collision with Dynamic Route
**What goes wrong:** Both `/page.tsx` (home) and `/[slug]/page.tsx` try to handle the root route
**Why it happens:** Next.js static routes take precedence over dynamic routes
**How to avoid:** Keep `src/app/(frontend)/page.tsx` as the explicit home page route (fetches slug='home' from CMS). The `[slug]` route handles all other pages. This is correct behavior -- static routes win over dynamic.
**Warning signs:** 404 on home page or wrong content rendering

### Pitfall 6: Header Component is a Client Component
**What goes wrong:** Header uses `usePathname()` which requires `"use client"`, but it also needs news scroller data from CMS
**Why it happens:** Mixing server data needs with client interactivity
**How to avoid:** Fetch news items in the layout or page server component, pass them to Header as props. Header remains a client component but receives CMS data from its server parent. Alternatively, split into a server wrapper that fetches + a client child.
**Warning signs:** Cannot call `getPayload()` inside Header because it has `"use client"`

### Pitfall 7: Not Handling Empty/Missing CMS Content
**What goes wrong:** Runtime errors when accessing properties on null/undefined CMS data
**Why it happens:** During development, CMS may not have content populated yet
**How to avoid:** Per D-12, missing content = hide section. Use conditional rendering: `{data?.heroBlock && <Hero data={data.heroBlock} />}`. Missing page = `notFound()`.
**Warning signs:** "Cannot read property of undefined" errors

## Code Examples

### Collection Definition: Pages
```typescript
// src/collections/Pages.ts
import type { CollectionConfig } from 'payload'
import { HeroBlock } from '@/blocks/HeroBlock'
import { StatsBlock } from '@/blocks/StatsBlock'
import { CapabilityMatrixBlock } from '@/blocks/CapabilityMatrixBlock'
import { RegulatoryDashboardBlock } from '@/blocks/RegulatoryDashboardBlock'
import { CTABlock } from '@/blocks/CTABlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: false,
    maxPerDoc: 20,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'pageType',
      type: 'select',
      required: true,
      defaultValue: 'simple',
      options: [
        { label: 'Simple Page', value: 'simple' },
        { label: 'Home Page', value: 'home' },
        { label: 'About Page', value: 'about' },
        { label: 'Contact Page', value: 'contact' },
      ],
    },
    // Banner fields (all page types)
    {
      name: 'banner',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    // Rich text body (simple pages)
    {
      name: 'body',
      type: 'richText',
      admin: {
        condition: (data) => data?.pageType === 'simple',
      },
    },
    // Block-based layout (home page)
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, StatsBlock, CapabilityMatrixBlock, RegulatoryDashboardBlock, CTABlock],
      admin: {
        condition: (data) => data?.pageType === 'home',
      },
    },
  ],
}
```
[ASSUMED: Exact field structure -- planner should finalize field granularity]

### Block Definition: HeroBlock
```typescript
// src/blocks/HeroBlock.ts
import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    { name: 'tagline', type: 'text', required: true },
    { name: 'heading', type: 'text', required: true },
    { name: 'headingHighlight', type: 'text' },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'primaryButton',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
    {
      name: 'sideCard',
      type: 'group',
      fields: [
        { name: 'strategicAlignmentText', type: 'textarea' },
        { name: 'industryLedText', type: 'textarea' },
      ],
    },
  ],
}
```
[ASSUMED: Field granularity based on current Hero.tsx hardcoded content]

### Collection Definition: Regulatory Updates
```typescript
// src/collections/RegulatoryUpdates.ts
import type { CollectionConfig } from 'payload'

export const RegulatoryUpdates: CollectionConfig = {
  slug: 'regulatory-updates',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'issuingBody', 'category', 'date'],
  },
  versions: {
    drafts: false,
    maxPerDoc: 20,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'date', type: 'date', required: true },
    { name: 'referenceNumber', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'AML / CFT', value: 'aml-cft' },
        { label: 'KYC / Customer Due Diligence', value: 'kyc-cdd' },
        { label: 'Reporting Obligations', value: 'reporting' },
        { label: 'Digital Onboarding', value: 'digital-onboarding' },
        { label: 'Fraud / Cyber Risk', value: 'fraud-cyber' },
        { label: 'Sanctions / Screening', value: 'sanctions' },
        { label: 'Compliance & Governance', value: 'compliance-governance' },
      ],
    },
    {
      name: 'issuingBody',
      type: 'select',
      required: true,
      options: [
        { label: 'RBI', value: 'rbi' },
        { label: 'FIU-IND', value: 'fiu-ind' },
        { label: 'SEBI', value: 'sebi' },
        { label: 'IRDAI', value: 'irdai' },
      ],
    },
    { name: 'link', type: 'text' },
  ],
}
```
[VERIFIED: Field types from D-06 decision, CollectionConfig type from Payload]

### Global Definition: Programmes
```typescript
// src/globals/Programmes.ts
import type { GlobalConfig } from 'payload'

export const Programmes: GlobalConfig = {
  slug: 'programmes',
  versions: {
    drafts: false,
    max: 20,
  },
  fields: [
    {
      name: 'engagementFormats',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'points', type: 'array', fields: [{ name: 'text', type: 'text' }] },
      ],
    },
    {
      name: 'programmeSchedule',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'type', type: 'text', required: true },
        { name: 'date', type: 'text', required: true },
      ],
    },
    {
      name: 'annualMeetings',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'date', type: 'text', required: true },
        { name: 'location', type: 'text', required: true },
      ],
    },
  ],
}
```
[VERIFIED: GlobalConfig type from node_modules/payload/dist/globals/config/types.d.ts, uses `max` instead of `maxPerDoc`]

### Data Fetching: Home Page
```typescript
// src/app/(frontend)/page.tsx
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlockRenderer from '@/components/BlockRenderer'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) notFound()

  // Fetch news items for header
  const newsResult = await payload.find({
    collection: 'news-items',
    where: { published: { equals: true } },
    sort: '-createdAt',
  })

  return (
    <div className="min-h-screen bg-white text-neutral-800 font-sans selection:bg-brand selection:text-white flex flex-col">
      <Header newsItems={newsResult.docs} />
      <main className="flex-grow">
        {page.layout && <BlockRenderer blocks={page.layout} />}
      </main>
      <Footer />
    </div>
  )
}
```
[VERIFIED: getPayload import from 'payload', configPromise from '@payload-config' pattern from existing payload layout.tsx]

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Payload 2.x separate server | Payload 3.x runs inside Next.js | 2024 | No separate CMS server; Local API is the primary data access method |
| REST API for frontend | Local API in server components | Payload 3.x | Zero HTTP overhead, direct database access, type-safe |
| MongoDB default | PostgreSQL as first-class option | Payload 3.x | Already configured in this project |
| Draft/publish required for versions | Versions without drafts | Payload 3.x | Can track changes without workflow complexity |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Block type definitions and exact field granularity for home page blocks | Code Examples | Low -- fields can be adjusted, structure is correct |
| A2 | pageType conditional logic works with admin.condition on blocks field | Architecture Patterns | Medium -- if condition function signature differs, admin UI won't show/hide fields correctly |
| A3 | maxPerDoc: 20 is reasonable for version retention | Architecture Patterns | Low -- can be changed later, 100 is default |
| A4 | Complex pages (about, contact) need separate pageType variants | Architecture Patterns | Medium -- could alternatively use blocks for these too |
| A5 | News scroller in Header can receive data as props from server parent | Common Pitfalls | Low -- standard React data flow pattern |

## Open Questions

1. **How should complex pages like "about" be modeled?**
   - What we know: D-04 says use `pageType` field with additional structured fields. The about page has multiple distinct sections (Why ARIFAC, What ARIFAC Does, Who Should Engage) each with different data shapes.
   - What's unclear: Whether to use blocks (like home page) or fixed structured fields per pageType
   - Recommendation: Use blocks for complex pages too -- more flexible and consistent with home page pattern. Add about-specific block types (ThreatGridBlock, OperationalFocusBlock, AudienceGridBlock). This avoids proliferating pageTypes.

2. **Should the dynamic `[slug]` route replace all individual page directories?**
   - What we know: 14 pages use StaticPageLayout and could be served by a single `[slug]/page.tsx`. 5 pages have unique layouts (home, about, certifications, updates, programmes).
   - What's unclear: Whether to keep the special pages as individual routes or model everything through the dynamic route with different renderers.
   - Recommendation: Keep explicit routes for: root `/page.tsx` (home), `/certifications/page.tsx` (client filtering), `/updates/page.tsx` (client filtering). Move all StaticPageLayout pages to `[slug]/page.tsx`. For about and programmes, decide based on whether they use blocks or fixed structures.

3. **How should the Header component get news items on every page?**
   - What we know: Header is a client component (`usePathname`), used on every page, needs news scroller data from CMS.
   - What's unclear: Whether to fetch in every page, use a layout, or use a server component wrapper.
   - Recommendation: Fetch news items in `(frontend)/layout.tsx` (server component) and pass to Header. This avoids duplicate fetches and ensures all pages get news data.

## Project Constraints (from CLAUDE.md)

- **Tech stack:** Next.js 16 / React 19 / Tailwind 4 / Payload CMS -- no new frameworks
- **Design continuity:** Visual design must remain identical -- same components, same styling, same angular design (border-radius: 0)
- **Path alias:** `@/*` maps to `./src/*` -- use for all imports
- **Component pattern:** Default exports, interfaces above components
- **Styling:** Tailwind v4 utility classes inline, no CSS modules
- **Fonts:** Plus Jakarta Sans (headings), Inter (body) -- already configured
- **Container pattern:** `max-w-[1240px] mx-auto px-6`
- **Migration workflow:** Must use `payload migrate:create` / `payload migrate` (no db push)
- **AGENTS.md warning:** Next.js 16 has breaking changes -- read docs before writing code

## Sources

### Primary (HIGH confidence)
- `node_modules/payload/dist/versions/types.d.ts` -- Versions config types (maxPerDoc, drafts, IncomingCollectionVersions)
- `node_modules/payload/dist/fields/config/types.d.ts` -- Block type definition, field types
- `node_modules/payload/dist/globals/config/types.d.ts` -- GlobalConfig type (versions.max for globals)
- `node_modules/payload/dist/index.d.ts` -- getPayload signature and options
- `src/payload.config.ts` -- Current Payload configuration (users collection, Lexical editor, PostgreSQL)
- `src/app/(payload)/layout.tsx` -- configPromise import pattern from @payload-config
- All existing frontend components in `src/components/` and pages in `src/app/(frontend)/`

### Secondary (MEDIUM confidence)
- Payload CMS official docs (payloadcms.com) -- referenced for general patterns but rate-limited during research

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all packages already installed, versions verified from package.json
- Architecture: HIGH - patterns derived from Payload type definitions and existing codebase analysis
- Pitfalls: HIGH - based on direct codebase observation (async params, client/server boundary, migration workflow)
- Content modeling: MEDIUM - exact field granularity for blocks is assumed based on current hardcoded content

**Research date:** 2026-04-11
**Valid until:** 2026-05-11 (stable -- Payload 3.x is mature, project stack is locked)
