---
phase: 02-content-modeling-frontend-integration
reviewed: 2026-04-12T14:22:00Z
depth: standard
files_reviewed: 31
files_reviewed_list:
  - src/app/(frontend)/[slug]/page.tsx
  - src/app/(frontend)/about/page.tsx
  - src/app/(frontend)/certifications/page.tsx
  - src/app/(frontend)/layout.tsx
  - src/app/(frontend)/page.tsx
  - src/app/(frontend)/programmes/page.tsx
  - src/app/(frontend)/updates/page.tsx
  - src/blocks/CTABlock.ts
  - src/blocks/CapabilityMatrixBlock.ts
  - src/blocks/FeaturedProgramsBlock.ts
  - src/blocks/HeroBlock.ts
  - src/blocks/RegulatoryDashboardBlock.ts
  - src/blocks/StatsBlock.ts
  - src/collections/Certifications.ts
  - src/collections/NewsItems.ts
  - src/collections/Pages.ts
  - src/collections/RegulatoryUpdates.ts
  - src/components/BlockRenderer.tsx
  - src/components/CTASection.tsx
  - src/components/CapabilityMatrix.tsx
  - src/components/CertificationsFilter.tsx
  - src/components/FeaturedPrograms.tsx
  - src/components/Header.tsx
  - src/components/Hero.tsx
  - src/components/RegulatoryDashboard.tsx
  - src/components/StaticPageLayout.tsx
  - src/components/StatsStrip.tsx
  - src/components/UpdatesFilter.tsx
  - src/globals/Programmes.ts
  - src/payload-types.ts
  - src/payload.config.ts
findings:
  critical: 2
  warning: 5
  info: 3
  total: 10
status: issues_found
---

# Phase 02: Code Review Report

**Reviewed:** 2026-04-12T14:22:00Z
**Depth:** standard
**Files Reviewed:** 31
**Status:** issues_found

## Summary

This review covers the Payload CMS integration layer: collection/global/block schemas, hand-written TypeScript types, Payload config, and the refactored frontend pages and components that now consume CMS data. The overall architecture is sound -- clean separation between CMS schemas, block rendering, and presentation components. Two critical security/reliability issues exist in `payload.config.ts` around secret and database fallbacks. Several warnings address external link handling, potential runtime errors from unvalidated image URLs, and incorrect index formatting for lists exceeding 9 items.

## Critical Issues

### CR-01: Empty string fallback for PAYLOAD_SECRET allows insecure JWT signing

**File:** `src/payload.config.ts:57`
**Issue:** `process.env.PAYLOAD_SECRET || ''` silently falls back to an empty string if the environment variable is not set. Payload uses this secret for JWT signing and cookie encryption. An empty string means authentication tokens are signed with no secret, making them trivially forgeable. Any attacker could craft a valid admin JWT and gain full CMS access.
**Fix:**
```typescript
const payloadSecret = process.env.PAYLOAD_SECRET
if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET environment variable is required')
}

// then in buildConfig:
secret: payloadSecret,
```

### CR-02: Empty string fallback for DATABASE_URI causes opaque runtime failure

**File:** `src/payload.config.ts:62-63`
**Issue:** `process.env.DATABASE_URI || ''` falls back to an empty string. The postgres adapter will attempt to connect with an empty connection string, producing a confusing runtime error rather than a clear configuration failure at startup. This delays debugging in new deployments or CI environments where the variable is accidentally missing.
**Fix:**
```typescript
const databaseUri = process.env.DATABASE_URI
if (!databaseUri) {
  throw new Error('DATABASE_URI environment variable is required')
}

// then in buildConfig:
db: postgresAdapter({
  pool: {
    connectionString: databaseUri,
  },
}),
```

## Warnings

### WR-01: External URLs rendered via next/link in RegulatoryDashboard

**File:** `src/components/RegulatoryDashboard.tsx:66`
**Issue:** The "View Circular" link uses `<Link href={update.link}>` from `next/link`. The `link` field on regulatory updates stores external URLs (government circular links). `next/link` performs client-side navigation and does not support external URLs correctly -- it will attempt to route internally. Additionally, external links should open in a new tab with `rel="noopener noreferrer"` for security.
**Fix:**
```tsx
{update.link && (
  <a
    href={update.link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-shrink-0 flex items-center gap-2 text-[11px] font-bold border border-neutral-200 px-4 py-2 rounded-lg hover:border-brand hover:text-brand transition-all whitespace-nowrap group/btn"
  >
    View Circular
    <svg className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  </a>
)}
```

### WR-02: Unvalidated text field used as next/image src

**File:** `src/components/FeaturedPrograms.tsx:40-44`
**Issue:** The `image` field in `FeaturedProgramsBlock` is defined as `type: 'text'` in the block schema (`src/blocks/FeaturedProgramsBlock.ts:44`), meaning any arbitrary string from the CMS can be passed as the `src` prop to `next/image`. If the value is not a valid URL or is a hostname not configured in `next.config`, this will cause a runtime error that crashes the page. Additionally, storing image paths as free-text bypasses Payload's media handling (upload collections with automatic optimization).
**Fix:** Either validate the URL before rendering, or (preferred) change the block field to use a Payload upload/relationship field pointing to a media collection:
```typescript
// Short-term: guard against invalid values
{program.image && program.image.startsWith('/') || program.image?.startsWith('http') ? (
  <Image src={program.image} alt={program.title} fill sizes="..." className="..." />
) : (
  <div className="absolute inset-0 bg-neutral-100" />
)}
```

### WR-03: Index formatting breaks for lists with 10+ items

**File:** `src/app/(frontend)/programmes/page.tsx:44,104`
**Issue:** The pattern `0{idx + 1}` produces strings like `01`, `02`, ..., `09`, `010`, `011` for 10+ items. This creates visually inconsistent numbering. The same pattern appears in the programme schedule table (line 104) and engagement channels grid (line 44).
**Fix:**
```tsx
{String(idx + 1).padStart(2, '0')}
```

### WR-04: Using array index as React key for items with stable IDs

**File:** `src/components/RegulatoryDashboard.tsx:52`
**Issue:** `updates.map((update, idx) => <div key={idx} ...>` uses the array index as key, but `RegulatoryUpdate` objects have a stable `id` field. Using index-based keys can cause incorrect DOM reconciliation when the list order changes (e.g., when items are reordered or filtered).
**Fix:**
```tsx
{updates.map((update) => (
  <div key={update.id} className="flex flex-col p-5 ...">
```

### WR-05: Missing `generateStaticParams` for dynamic [slug] route

**File:** `src/app/(frontend)/[slug]/page.tsx`
**Issue:** The dynamic `[slug]` page does not export `generateStaticParams`. Without it, every page request hits the database at request time with no static generation. For a CMS-driven site where pages change infrequently, this means unnecessary database load and slower page loads. This is especially important for a site that previously was fully static.
**Fix:**
```typescript
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    where: { pageType: { not_equals: 'home' } },
    limit: 100,
    select: { slug: true },
  })
  return result.docs.map((page) => ({ slug: page.slug }))
}
```

## Info

### IN-01: Duplicate label mappings across components

**File:** `src/components/UpdatesFilter.tsx:6-21` and `src/components/RegulatoryDashboard.tsx:6-21`
**Issue:** `categoryLabels` and `issuingBodyLabels` lookup objects are duplicated between `UpdatesFilter.tsx` and `RegulatoryDashboard.tsx` with slightly different display values (e.g., "Reporting Obligations" vs "Reporting"). This inconsistency could confuse users seeing different labels for the same category on different pages. Consider extracting to a shared module.
**Fix:** Create `src/lib/regulatory-labels.ts` with canonical label mappings and import from both components.

### IN-02: Unused `points` field in Programmes global schema

**File:** `src/globals/Programmes.ts:17-21`
**Issue:** The `engagementFormats` array includes a nested `points` array field, but `src/app/(frontend)/programmes/page.tsx` never renders it -- only `title` and `description` are displayed. The field exists in the CMS admin but its data is never shown to users, which may confuse editors.
**Fix:** Either render the points in the programmes page template, or remove the field from the schema if it is not needed.

### IN-03: `ContentSection` component exported but unused

**File:** `src/components/StaticPageLayout.tsx:32-58`
**Issue:** `ContentSection` is a named export from `StaticPageLayout.tsx` but is not imported anywhere in the reviewed files. It may have been used in the pre-CMS static pages and is now dead code after the migration to CMS-driven content.
**Fix:** Verify whether `ContentSection` is used elsewhere in the codebase. If not, remove it to reduce maintenance surface.

---

_Reviewed: 2026-04-12T14:22:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
