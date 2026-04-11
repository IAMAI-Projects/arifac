# Phase 2: Content Modeling & Frontend Integration - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Define Payload CMS collections, globals, and block types for all site content, then wire every frontend page to render from CMS data instead of hardcoded content. Includes audit trail via Payload Versions.

</domain>

<decisions>
## Implementation Decisions

### Content Schema Design
- **D-01:** Single Pages collection for ALL pages — home page, static pages, and complex pages all live in the same collection
- **D-02:** Home page is a document in Pages collection (slug: 'home') that uses a block-based layout field — editors compose home sections from reusable content blocks (hero block, stats block, capability matrix block, regulatory dashboard block, CTA block)
- **D-03:** Simple static pages (~15 pages) use banner fields (label, title, description) plus a rich text body field
- **D-04:** Complex static pages (about, etc.) get additional structured fields (arrays, groups) controlled by a `pageType` field — the pageType determines which extra fields appear in the admin panel
- **D-05:** All text and data comes from CMS — layouts stay in React components but every piece of content is CMS-managed (not just rich text body)

### Collection Structure
- **D-06:** Regulatory Updates collection with fields: title, date, reference number, category, issuing body (RBI/SEBI/etc). Matches current display — no extended body/detail pages
- **D-07:** Certifications collection is TEMPORARY — will be replaced by LMS API integration in a future phase. For now, create a Payload collection so editors can manage the 4 certifications. Fields: title, level, focus, category (select for filtering), format, description, curriculum (array), duration
- **D-08:** Programmes page modeled as a Payload Global with three array fields: engagement formats (title + description + points array), programme schedule (name + type + date), annual meetings (name + date + location)
- **D-09:** News Items as a separate collection (not a global) — editors can individually publish/unpublish items. Fields: text content, published status

### Frontend Data Fetching
- **D-10:** Server components for all page-level components — remove 'use client' from pages, make them async functions that fetch CMS data
- **D-11:** Client component islands for interactive parts — certifications filtering (CertificationsFilter), header navigation state (usePathname), etc. Data flows from server parent to client children via props
- **D-12:** Missing/empty CMS content: hide the section (don't render). Missing pages (no document for slug) = 404. Strict — forces editors to populate content

### Audit Trail
- **D-13:** Use Payload's built-in Versions feature on all collections and globals — automatic tracking of who changed what and when, zero custom code
- **D-14:** Editors CAN restore previous versions from the admin panel (Payload's default restore behavior)
- **D-15:** No draft mode needed (versions: { drafts: false }) — changes publish immediately on save

### Claude's Discretion
- Local API vs REST for data fetching (Local API is the standard approach for Payload inside Next.js)
- Block type definitions and field granularity for home page blocks
- How to implement the pageType conditional field logic in Payload config
- Version retention count (maxPerDoc setting)
- Dynamic route setup for Pages collection ([slug]/page.tsx)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Payload CMS Configuration
- `src/payload.config.ts` — Current Payload config with users collection, PostgreSQL adapter, Lexical editor

### Existing Frontend Components
- `src/components/StaticPageLayout.tsx` — Layout wrapper for static pages (banner + children pattern)
- `src/components/PageBanner.tsx` — Reusable page header (label, title, description)
- `src/components/Hero.tsx` — Home page hero section (hardcoded content to extract)
- `src/components/StatsStrip.tsx` — Stats counter section
- `src/components/CapabilityMatrix.tsx` — 3-column mandate cards
- `src/components/RegulatoryDashboard.tsx` — Regulatory updates list with hardcoded data array
- `src/components/FeaturedPrograms.tsx` — Certification cards
- `src/components/CommunitySection.tsx` — Network showcase
- `src/components/Header.tsx` — Contains hardcoded news scroller items
- `src/components/Footer.tsx` — Site footer

### Page Files (content to model)
- `src/app/(frontend)/page.tsx` — Home page composition
- `src/app/(frontend)/about/page.tsx` — Complex static page example
- `src/app/(frontend)/certifications/page.tsx` — Has client-side filtering + hardcoded cert data
- `src/app/(frontend)/programmes/page.tsx` — Three data types (engagement formats, schedule, meetings)

### Project Context
- `.planning/REQUIREMENTS.md` — Requirements HOME-01 through CONF-01, AUDIT-01, AUDIT-02
- `.planning/PROJECT.md` — Constraints and key decisions
- `.planning/ROADMAP.md` — Phase 2 success criteria
- `.planning/phases/01-cms-foundation/01-CONTEXT.md` — Phase 1 decisions (route groups, Lexical editor, PostgreSQL)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `StaticPageLayout` + `ContentSection` — Layout wrapper pattern for content pages, will need to accept CMS data props instead of hardcoded values
- `PageBanner` — Already takes label/title/description props, maps directly to CMS page banner fields
- Route group structure `(frontend)` / `(payload)` — Already in place from Phase 1
- `src/design-tokens.ts` — Design token system (brand colors, typography) — styling stays unchanged

### Established Patterns
- Tailwind CSS v4 utility classes inline (no CSS modules)
- Default exports for all components
- Data arrays defined as constants outside component body (e.g., `updates`, `certifications`, `engagementFormats`)
- `max-w-[1240px] mx-auto px-6` container pattern
- `border-radius: 0 !important` — intentionally angular design, no rounded corners

### Integration Points
- `src/payload.config.ts` — Add collections, globals, and block definitions here
- `src/app/(frontend)/*/page.tsx` — Each page needs to become a server component fetching from Payload
- `src/components/Header.tsx` — News scroller needs to fetch from News Items collection
- `next.config.ts` — May need configuration for Payload's admin panel and TypeScript generation

</code_context>

<specifics>
## Specific Ideas

- Certifications collection is temporary — will be replaced by LMS API in a future phase. Design it to be easily removable.
- User prefers News Items as a collection (not global) for individual publish/unpublish control
- User chose blocks for home page — wants composable sections, not a fixed global
- User wants strict empty state handling — missing content = hidden sections, missing pages = 404

</specifics>

<deferred>
## Deferred Ideas

- LMS API integration for certifications (replaces temporary CMS collection)
- Payload Live Preview / visual editing (listed as v2 requirement ADV-01)

</deferred>

---

*Phase: 02-content-modeling-frontend-integration*
*Context gathered: 2026-04-11*
