---
phase: 02-content-modeling-frontend-integration
fixed_at: 2026-04-12T14:35:00Z
review_path: .planning/phases/02-content-modeling-frontend-integration/02-REVIEW.md
iteration: 1
findings_in_scope: 7
fixed: 7
skipped: 0
status: all_fixed
---

# Phase 02: Code Review Fix Report

**Fixed at:** 2026-04-12T14:35:00Z
**Source review:** .planning/phases/02-content-modeling-frontend-integration/02-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 7
- Fixed: 7
- Skipped: 0

## Fixed Issues

### CR-01: Empty string fallback for PAYLOAD_SECRET allows insecure JWT signing

**Files modified:** `src/payload.config.ts`
**Commit:** 8cadd52
**Applied fix:** Added early validation that throws a descriptive error if `PAYLOAD_SECRET` environment variable is not set, replacing the silent empty-string fallback. The validated `payloadSecret` constant is passed to `buildConfig`.

### CR-02: Empty string fallback for DATABASE_URI causes opaque runtime failure

**Files modified:** `src/payload.config.ts`
**Commit:** 8cadd52
**Applied fix:** Added early validation that throws a descriptive error if `DATABASE_URI` environment variable is not set, replacing the silent empty-string fallback. The validated `databaseUri` constant is passed to the postgres adapter. Combined with CR-01 in a single commit since both changes are in the same file and logically related.

### WR-01: External URLs rendered via next/link in RegulatoryDashboard

**Files modified:** `src/components/RegulatoryDashboard.tsx`
**Commit:** 9006ae9
**Applied fix:** Added `isExternalUrl` helper function. External links (http/https) now render as `<a>` tags with `target="_blank"` and `rel="noopener noreferrer"`. Internal links continue using `next/link` for client-side navigation.

### WR-02: Unvalidated text field used as next/image src

**Files modified:** `src/components/FeaturedPrograms.tsx`
**Commit:** e375dc7
**Applied fix:** Added URL validation guard before passing `program.image` to `next/image`. Only values starting with `/` (local paths) or `http` (remote URLs) are rendered as images; invalid values fall back to a neutral placeholder div.

### WR-03: Index formatting breaks for lists with 10+ items

**Files modified:** `src/app/(frontend)/programmes/page.tsx`
**Commit:** 5a5e13d
**Applied fix:** Replaced `0{idx + 1}` pattern with `String(idx + 1).padStart(2, '0')` at both occurrences (engagement channels grid line 44 and programme schedule table line 104). This correctly formats indices as `01`..`09`, `10`, `11`, etc.

### WR-04: Using array index as React key for items with stable IDs

**Files modified:** `src/components/RegulatoryDashboard.tsx`
**Commit:** 65468ba
**Applied fix:** Changed `updates.map((update, idx) => <div key={idx}>` to `updates.map((update) => <div key={update.id}>`, using the stable `id` field from `RegulatoryUpdate` objects for correct DOM reconciliation.

### WR-05: Missing generateStaticParams for dynamic [slug] route

**Files modified:** `src/app/(frontend)/[slug]/page.tsx`
**Commit:** 6d4233e
**Applied fix:** Added `generateStaticParams` export that queries the `pages` collection (excluding home page type) and returns slug params. This enables static generation for CMS-driven pages, reducing database load at request time.

---

_Fixed: 2026-04-12T14:35:00Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
