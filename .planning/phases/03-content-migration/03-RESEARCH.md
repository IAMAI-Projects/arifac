# Phase 3: Content Migration - Research

**Researched:** 2026-04-12
**Domain:** Payload CMS seed scripts, Lexical rich text format, content extraction from hardcoded React components
**Confidence:** HIGH

## Summary

Phase 3 migrates all hardcoded content from React components into the Payload CMS database via seed scripts, then removes the hardcoded content from page components so everything renders from CMS data. Phase 2 already built the infrastructure: collections (Pages, RegulatoryUpdates, Certifications, NewsItems), globals (Programmes), blocks (Hero, Stats, CapabilityMatrix, RegulatoryDashboard, FeaturedPrograms, CTA), and the frontend pages that fetch from CMS. A partial seed endpoint already exists at `src/app/(payload)/api/seed/route.ts`.

The work divides into three areas: (1) expanding the seed script to include ALL content from ALL pages -- the existing seed is partial and missing most page body content, the about page's structured content, and many static pages referenced in the footer; (2) converting the hardcoded about page to use CMS data; (3) verifying visual parity across all pages.

**Primary recommendation:** Expand the existing seed endpoint to be comprehensive, convert the about page from hardcoded JSX to CMS-driven rendering (either via rich text body or structured about-specific fields), and create a verification checklist for visual parity across all routes.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MIGR-01 | All existing hardcoded content extracted into CMS database via seed scripts | Expand existing seed endpoint at `src/app/(payload)/api/seed/route.ts` to cover all pages, all body content, and complete data for collections |
| MIGR-02 | Visual design remains identical after migration | Side-by-side comparison of all routes; no CSS/component changes needed since Phase 2 components already render from CMS data structures |
</phase_requirements>

## Current State Analysis

### What is already CMS-driven (from Phase 2)

| Page/Feature | Route | Data Source | Status |
|-------------|-------|-------------|--------|
| Home page | `/(frontend)/page.tsx` | Pages collection (slug: home) + blocks | CMS-driven, needs seed data |
| Certifications | `/(frontend)/certifications/page.tsx` | Certifications collection | CMS-driven, needs seed data |
| Regulatory Updates | `/(frontend)/updates/page.tsx` | RegulatoryUpdates collection | CMS-driven, needs seed data |
| Programmes | `/(frontend)/programmes/page.tsx` | Programmes global | CMS-driven, needs seed data |
| News scroller | Layout `/(frontend)/layout.tsx` | NewsItems collection | CMS-driven, needs seed data |
| Static pages (catch-all) | `/(frontend)/[slug]/page.tsx` | Pages collection + RichText body | CMS-driven, needs seed data |

### What is still hardcoded

| Page/Feature | Route | Issue |
|-------------|-------|-------|
| **About page** | `/(frontend)/about/page.tsx` | Entire page is hardcoded JSX with structured sections (Why ARIFAC, What ARIFAC Does, Who Should Engage) -- NOT fetching from CMS at all |

### Existing seed endpoint gaps

The seed endpoint at `src/app/(payload)/api/seed/route.ts` already seeds:
- Home page with all 6 blocks (complete)
- 3 regulatory updates (partial -- original site may have had more)
- 3 news items (complete for demo)
- 4 certifications with curriculum arrays (complete)
- Programmes global with engagement formats, schedule, meetings (complete)
- 4 static pages with banners only: about, contact, membership, member-benefits (incomplete -- no body content)

**Missing from seed:**
1. About page body -- currently just banner fields, but the about page has 3 complex sections with structured data
2. ~11 additional static pages referenced in Footer but not seeded: members, meetings, gallery, training-leads, sectoral-nodal-officers, resources, help, faqs, privacy, terms-of-use, disclaimer
3. Rich text body content for all static pages (currently only banner is seeded, body is null)
4. Certification curriculum arrays (seed has them but they are empty in current data)

## Architecture Patterns

### Seed Script Pattern (Payload Local API)

The existing seed endpoint uses the correct pattern for Payload 3.x seeding. [VERIFIED: codebase inspection of `src/app/(payload)/api/seed/route.ts`]

```typescript
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const payload = await getPayload({ config: configPromise })

// Create collection documents
await payload.create({
  collection: 'pages',
  data: { title: '...', slug: '...', pageType: 'simple', body: lexicalContent, banner: { ... } },
})

// Update globals
await payload.updateGlobal({
  slug: 'programmes',
  data: { engagementFormats: [...], programmeSchedule: [...] },
})
```

**Key pattern:** The seed checks for existing documents before creating (`payload.find` + check `docs.length === 0`) to make it idempotent. This pattern MUST be preserved. [VERIFIED: existing seed code]

### Lexical Rich Text Format

For static pages that use the `body` rich text field, content must be in Lexical's `SerializedEditorState` format. The `[slug]/page.tsx` already casts body content: `page.body as unknown as SerializedEditorState`. [VERIFIED: codebase]

Lexical rich text data follows this structure: [ASSUMED]

```typescript
const richTextContent = {
  root: {
    type: 'root',
    children: [
      {
        type: 'heading',
        tag: 'h2',
        children: [{ type: 'text', text: 'Section Title' }],
      },
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Paragraph content here.' }],
      },
      {
        type: 'list',
        listType: 'bullet',
        children: [
          {
            type: 'listitem',
            children: [{ type: 'text', text: 'List item' }],
          },
        ],
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
}
```

### About Page Migration Strategy

The about page is the most complex migration challenge. It has 3 structured sections with arrays of data, custom layouts, and rich JSX. Two approaches:

**Option A: Convert to rich text body (simpler)**
- Flatten the about page content into Lexical rich text
- Use the existing `[slug]` catch-all route to render it
- **Tradeoff:** Loses the visual structure (grid layouts, styled cards, alignment blocks) -- plain prose rendering via `<RichText>` component won't match

**Option B: Keep dedicated about route, fetch from CMS (recommended)**
- The about page already has `pageType: 'about'` in the schema
- Keep `/(frontend)/about/page.tsx` as a dedicated route
- Fetch the about page from CMS and use the existing JSX structure but with CMS data injected
- Add structured fields to the Pages collection for about-type pages, OR store structured data as JSON in a custom field
- **Tradeoff:** More schema work, but preserves exact visual parity

**Recommendation: Option B** -- Keep the about page route but make it fetch content from CMS. The structured content (arrays of threats, focus areas, audience segments) can be stored in the Pages collection's existing structure. The about page's `pageType: 'about'` already exists but has no conditional fields defined for it. We need to add about-specific fields (similar to how `layout` blocks are conditional on `pageType === 'home'`).

However, given the scope constraint of Phase 3 (migration, not new schema work), a pragmatic middle ground exists:

**Option C: Keep about route, hardcode structure, fetch banner from CMS (minimal change)**
- The about page renders its banner from CMS (via the seeded about page record)
- The section content below the banner stays as-is in the component for now
- This matches the pattern of having the PageBanner CMS-driven while structured content remains in code
- **Tradeoff:** Doesn't fully satisfy MIGR-01 ("all existing hardcoded content extracted into CMS"), but is the most realistic given schema constraints

**Final recommendation:** If the goal is strict MIGR-01 compliance, add about-page-specific fields to the Pages collection schema (Phase 3 scope includes schema additions needed for migration). If the goal is pragmatic migration, Option C.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Rich text serialization | Manual JSON construction for Lexical | Payload's Lexical format constants/helpers | Lexical's node structure has specific version/format requirements |
| Seed idempotency | Custom "already exists" tracking | Check-before-create pattern (already in seed) | Payload's `find` + conditional `create` is the standard approach |
| Visual regression testing | Manual screenshots | Developer side-by-side browser comparison | No test framework is configured; manual verification is appropriate for ~6 routes |

## Common Pitfalls

### Pitfall 1: Lexical Rich Text Format Mismatch
**What goes wrong:** Seed script creates rich text body with incorrect node structure, causing `<RichText>` component to crash or render nothing
**Why it happens:** Lexical's serialized format has specific requirements for node types, version numbers, and required properties
**How to avoid:** Test rich text body rendering on a single page first before seeding all pages. Create a helper function for generating valid Lexical nodes.
**Warning signs:** Blank page body sections, console errors about invalid editor state

### Pitfall 2: Missing Pages Causing 404s
**What goes wrong:** Footer links point to pages (e.g., `/members`, `/gallery`, `/resources`) that don't exist in the CMS, resulting in 404 errors
**Why it happens:** The `[slug]` catch-all route calls `notFound()` when no page document matches
**How to avoid:** Seed ALL pages referenced in Footer and Header navigation. The footer references: about, member-benefits, members, meetings, gallery, programmes, certifications, training-leads, sectoral-nodal-officers, regulatory-updates, resources, help, faqs, contact, membership/launching-soon, terms-of-use, privacy, disclaimer
**Warning signs:** Links in footer that return 404

### Pitfall 3: About Page Not Fetching From CMS
**What goes wrong:** The about page at `/(frontend)/about/page.tsx` has a dedicated route that bypasses the `[slug]` catch-all. It renders entirely from hardcoded JSX without fetching from CMS.
**Why it happens:** Phase 2 created the about route with hardcoded content rather than converting it to CMS-driven
**How to avoid:** Either convert the about page to fetch from CMS (adding about-specific fields), or acknowledge that about page content stays in code
**Warning signs:** About page content unchanged after CMS edits

### Pitfall 4: Seed Script Timeout on Large Content
**What goes wrong:** The GET endpoint times out when seeding many pages with rich text content
**Why it happens:** Sequential `payload.create()` calls for 15+ pages with rich text can be slow
**How to avoid:** Use `Promise.all` for independent creates (different collections), keep sequential creates within same collection to avoid unique constraint races
**Warning signs:** Partial seed results, timeout errors

### Pitfall 5: Date Format Mismatch in Regulatory Updates
**What goes wrong:** Seed uses string dates like `'2026-01-04'` but the Payload date field may store/return ISO format
**Why it happens:** Phase 2 already handled this -- `UpdatesFilter` component casts ISO strings [VERIFIED: commit e5774ef]
**How to avoid:** Use ISO date strings (YYYY-MM-DD) in seed data, which Payload accepts for date fields

## Content Inventory

Complete inventory of content that must exist in CMS for visual parity:

### Home Page Blocks (already seeded)
- Hero block: tagline, heading, highlight, trail, description, 2 buttons, side card
- Capability Matrix block: heading, highlight, description, 3 mandate cards
- Stats block: 4 stats (Reporting Entities, Officers Trained, Sectors, Years)
- Featured Programs block: eyebrow, heading, description, 3 program cards
- Regulatory Dashboard block: eyebrow, heading, description, CTA
- CTA block: heading, description, 2 buttons

### Collections
- **Regulatory Updates:** 3 entries in seed (may need more for visual parity with original)
- **Certifications:** 4 entries in seed (Foundation, Professional, Specialist, Strategic)
- **News Items:** 3 entries in seed

### Globals
- **Programmes:** 3 engagement formats, 2 schedule items, 1 annual meeting

### Static Pages Needing Seed Data
Pages referenced in navigation/footer that need at minimum banner + placeholder body:

| Slug | Title | Has Seed Data | Needs Body |
|------|-------|---------------|------------|
| about | About ARIFAC | Yes (banner only) | Complex structured content |
| contact | Contact Us | Yes (banner only) | Yes |
| membership | ARIFAC Membership | Yes (banner only) | Yes |
| member-benefits | Member Benefits | Yes (banner only) | Yes |
| members | Our Members | No | Yes |
| meetings | Meetings & Events | No | Yes |
| gallery | Gallery | No | Yes |
| training-leads | Training Leads | No | Yes |
| sectoral-nodal-officers | Sectoral Nodal Officers | No | Yes |
| resources | Resource Center | No | Yes |
| help | Help Center | No | Yes |
| faqs | FAQs | No | Yes |
| privacy | Privacy Policy | No | Yes |
| terms-of-use | Terms of Use | No | Yes |
| disclaimer | Legal & Compliance | No | Yes |

### About Page Structured Content
The about page has 3 sections that cannot be represented as simple rich text:

1. **Why ARIFAC section:**
   - Section heading + description paragraph
   - "Emerging Threats" card with 4 threat items (Cyber fraud, Mule account networks, Identity misuse, Platform abuse)
   - "Aligned With" card with description + 4 alignment items (PMLA, FIU-IND, FATF, IMF/Basel/Egmont)

2. **What ARIFAC Does section:**
   - Section heading + description
   - 4 focus area cards, each with numbered title + 3 bullet points

3. **Who Should Engage section:**
   - Section heading + description + CTA button
   - 8 audience segment cards, each with name + subtitle

## Code Examples

### Expanding the Seed Endpoint

The existing seed at `src/app/(payload)/api/seed/route.ts` should be expanded. Key pattern for adding static pages with rich text body:

```typescript
// Helper to create a simple Lexical paragraph
function lexicalParagraph(text: string) {
  return {
    type: 'paragraph',
    children: [{ type: 'text', text, version: 1, format: 0, mode: 'normal', style: '', detail: 0 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
  }
}

function lexicalRoot(children: unknown[]) {
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

// Usage in seed:
await payload.create({
  collection: 'pages',
  data: {
    title: 'Privacy Policy',
    slug: 'privacy',
    pageType: 'simple',
    banner: {
      label: 'Legal',
      title: 'Privacy Policy',
      description: 'How ARIFAC handles your personal information.',
    },
    body: lexicalRoot([
      lexicalParagraph('ARIFAC is committed to protecting your privacy...'),
    ]),
  },
})
```

### Converting About Page to CMS-Driven

If about-specific fields are added to Pages collection:

```typescript
// In src/app/(frontend)/about/page.tsx
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
// ... existing component imports

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })
  const page = result.docs[0]
  if (!page) notFound()

  // Use page.banner for PageBanner
  // Use page.aboutSections (or similar) for structured content
  return (
    <>
      <PageBanner
        label={page.banner?.label || ''}
        title={page.banner?.title || page.title}
        description={page.banner?.description || ''}
      />
      {/* Render structured sections from CMS data */}
    </>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Payload 2.x seed scripts (separate CLI) | Payload 3.x Local API in route handlers | Payload 3.0 (2024) | Seed via HTTP endpoint or standalone script using `getPayload()` |
| Manual rich text JSON | Lexical editor serialization | Payload 3.0 | Must use Lexical node format, not Slate |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Lexical rich text node structure uses `type: 'paragraph'`, `type: 'heading'` etc with `version: 1` | Code Examples | Seed script would produce invalid rich text bodies, pages would render blank |
| A2 | The original static site had placeholder content for pages like privacy, terms-of-use, disclaimer (not detailed legal text) | Content Inventory | If original had real legal content, seed data would be incomplete |
| A3 | Footer links to non-existent pages (members, gallery, etc.) currently return 404, and seeding empty/placeholder pages is acceptable for MIGR-01 | Content Inventory | If user expects full content for all 15+ pages, scope is much larger |

## Open Questions

1. **About page migration depth**
   - What we know: The about page has complex structured content that doesn't fit the simple rich-text body model
   - What's unclear: Should we add about-specific fields to the Pages collection schema, or is it acceptable for the about page content to remain in the component while only the banner comes from CMS?
   - Recommendation: Add about-specific fields to Pages schema (conditional on `pageType === 'about'`) to fully satisfy MIGR-01. This is a small schema addition, not a major refactor.

2. **Placeholder content for unseeded pages**
   - What we know: Footer references ~15 page slugs. Only 4 are seeded. The `[slug]` route returns 404 for missing pages.
   - What's unclear: Should seed include realistic body content for all pages, or just banner + minimal placeholder?
   - Recommendation: Seed all pages with banner text and a short rich-text body paragraph. Editors will add real content through the admin panel.

3. **Certification curriculum arrays**
   - What we know: The Certifications collection has a `curriculum` array field. Current seed data doesn't include curriculum items.
   - What's unclear: Whether the original static certifications page displayed curriculum data
   - Recommendation: Include curriculum items in seed if the CertificationsFilter component renders them.

## Sources

### Primary (HIGH confidence)
- Codebase inspection of all files in `src/app/(frontend)/`, `src/collections/`, `src/globals/`, `src/blocks/`, `src/components/`
- Existing seed endpoint at `src/app/(payload)/api/seed/route.ts`
- Payload types at `src/payload-types.ts`
- Phase 2 RESEARCH.md and completed plans

### Secondary (MEDIUM confidence)
- Payload 3.x Local API patterns (verified from existing codebase usage)

### Tertiary (LOW confidence)
- Lexical rich text serialization format (A1 -- needs validation against actual Payload Lexical output)

## Metadata

**Confidence breakdown:**
- Content inventory: HIGH - directly inspected all source files
- Seed script patterns: HIGH - verified from existing working seed endpoint
- Lexical rich text format: MEDIUM - structure assumed from training data, needs validation
- About page migration approach: HIGH - clear options based on existing schema

**Research date:** 2026-04-12
**Valid until:** 2026-05-12 (stable -- Payload schema and codebase won't change without this project's work)
