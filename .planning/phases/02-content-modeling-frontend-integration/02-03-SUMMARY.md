---
phase: 02-content-modeling-frontend-integration
plan: 03
subsystem: frontend-cms-integration
tags: [payload-cms, server-components, dynamic-routes, client-islands, news-scroller]
dependency_graph:
  requires: [02-01]
  provides: [cms-frontend-pages, dynamic-slug-route, news-scroller-cms]
  affects: [src/app/(frontend), src/components/Header.tsx, src/components/StaticPageLayout.tsx]
tech_stack:
  added: []
  patterns: [server-components-with-client-islands, payload-local-api, dynamic-slug-routing]
key_files:
  created:
    - src/app/(frontend)/[slug]/page.tsx
    - src/components/CertificationsFilter.tsx
    - src/components/UpdatesFilter.tsx
  modified:
    - src/app/(frontend)/layout.tsx
    - src/app/(frontend)/certifications/page.tsx
    - src/app/(frontend)/programmes/page.tsx
    - src/app/(frontend)/updates/page.tsx
    - src/app/(frontend)/about/page.tsx
    - src/app/(frontend)/page.tsx
    - src/components/Header.tsx
    - src/components/StaticPageLayout.tsx
  deleted:
    - src/app/(frontend)/contact/page.tsx
    - src/app/(frontend)/disclaimer/page.tsx
    - src/app/(frontend)/faqs/page.tsx
    - src/app/(frontend)/gallery/page.tsx
    - src/app/(frontend)/help/page.tsx
    - src/app/(frontend)/legal/page.tsx
    - src/app/(frontend)/meetings/page.tsx
    - src/app/(frontend)/member-benefits/page.tsx
    - src/app/(frontend)/members/page.tsx
    - src/app/(frontend)/membership/page.tsx
    - src/app/(frontend)/membership/launching-soon/page.tsx
    - src/app/(frontend)/privacy/page.tsx
    - src/app/(frontend)/resources/page.tsx
    - src/app/(frontend)/sectoral-nodal-officers/page.tsx
    - src/app/(frontend)/terms/page.tsx
    - src/app/(frontend)/terms-of-use/page.tsx
    - src/app/(frontend)/training-leads/page.tsx
    - src/app/(frontend)/regulatory-updates/page.tsx
decisions:
  - Dynamic [slug] route replaces 18 static page files for CMS-driven content
  - Updates page gets UpdatesFilter client island (not in original plan but needed for interactive filtering per D-11)
  - Frontend layout renders Header/Footer as chrome for all pages (single fetch point for news items)
  - About page kept as explicit route with hardcoded content (complex page per D-04, will be CMS-driven in Phase 3)
metrics:
  duration: ~11min
  completed: 2026-04-11T18:54:37Z
  tasks_completed: 2
  tasks_total: 2
  files_created: 3
  files_modified: 8
  files_deleted: 18
---

# Phase 02 Plan 03: Frontend Pages CMS Integration Summary

Dynamic [slug] route serves all simple static pages from CMS, certifications/programmes/updates converted to server components with Payload Local API, Header news scroller wired to CMS NewsItems collection via frontend layout.

## What Was Done

### Task 1: Dynamic [slug] route and server component conversion

**Created `src/app/(frontend)/[slug]/page.tsx`** -- dynamic catch-all route for all simple static pages. Uses `getPayload` to query the Pages collection by slug, renders via `StaticPageLayout` with banner fields, and returns `notFound()` for missing slugs (per D-12). Rich text body rendered via `@payloadcms/richtext-lexical/react` `RichText` component.

**Converted `src/app/(frontend)/certifications/page.tsx`** -- removed `"use client"`, made async server component. Fetches certifications from Payload `certifications` collection. Passes data to new `CertificationsFilter` client island.

**Created `src/components/CertificationsFilter.tsx`** -- `'use client'` component accepting `Certification[]` prop. Contains all filtering UI (search, category, format), category tabs, certification cards grid, curriculum expand/collapse, and enquire links. Exact visual match to original page.

**Converted `src/app/(frontend)/programmes/page.tsx`** -- removed `"use client"`, made async server component. Fetches from Programmes global via `payload.findGlobal({ slug: 'programmes' })`. Maps `engagementFormats`, `programmeSchedule`, and `annualMeetings` arrays. Each section hidden when empty (per D-12).

**Converted `src/app/(frontend)/updates/page.tsx`** -- removed `"use client"`, made async server component. Fetches from `regulatory-updates` collection sorted by `-date`. Passes data to new `UpdatesFilter` client island.

**Created `src/components/UpdatesFilter.tsx`** -- `'use client'` component with regulator/category/sort filtering, pagination, and circular cards. Maps CMS field names (issuingBody, referenceNumber) to display labels.

**Deleted 18 static page files** -- contact, disclaimer, faqs, gallery, help, legal, meetings, member-benefits, members, membership (+ launching-soon), privacy, resources, sectoral-nodal-officers, terms, terms-of-use, training-leads, regulatory-updates. These are now served by the `[slug]` dynamic route from CMS data.

### Task 2: News scroller CMS integration and layout refactor

**Updated `src/app/(frontend)/layout.tsx`** -- converted to async server component. Fetches published news items from `news-items` collection. Renders `<Header newsItems={...} />` and `<Footer />` as chrome for all frontend pages.

**Updated `src/components/Header.tsx`** -- added `HeaderProps` interface with `newsItems?: NewsItem[]` prop. News scroller now maps dynamic `newsItems` array (with duplicate for seamless marquee loop). Top bar conditionally hidden when `newsItems` is empty (per D-12). Retained `"use client"` for `usePathname()`.

**Updated `src/components/StaticPageLayout.tsx`** -- removed `Header` and `Footer` imports and rendering. Now renders only `<PageBanner>` + children (layout provides chrome).

**Updated all page files** -- removed `Header`, `Footer`, wrapper `<div>`, and `<main>` from about, certifications, programmes, updates, and home pages. All now render only their unique content within fragments.

## Deviations from Plan

### Auto-added Issues

**1. [Rule 2 - Missing functionality] Created UpdatesFilter client island**
- **Found during:** Task 1
- **Issue:** Updates page has interactive filtering (regulator, category, sort, pagination) that requires client-side state. Plan only mentioned making it a server component but the filtering UI needs `useState`/`useMemo`.
- **Fix:** Created `src/components/UpdatesFilter.tsx` as a `'use client'` component (same pattern as CertificationsFilter), receiving updates data from the server parent.
- **Files created:** `src/components/UpdatesFilter.tsx`

**2. [Rule 2 - Missing functionality] Field name mapping in UpdatesFilter**
- **Found during:** Task 1
- **Issue:** CMS schema uses `issuingBody` (enum values like `rbi`, `fiu-ind`) and `referenceNumber` while the original hardcoded page used `regulator` (display values like `RBI`, `FIU-IND`) and `circularRef`. Display labels needed mapping.
- **Fix:** Added `issuingBodyLabels` and `categoryLabels` lookup maps in UpdatesFilter to convert CMS enum values to human-readable display labels.
- **Files modified:** `src/components/UpdatesFilter.tsx`

## Known Stubs

None. All pages are wired to CMS collections/globals via Payload Local API. Content will be populated during Phase 3 content migration. Until then, pages will show empty states or 404 per D-12 (expected behavior).

## Self-Check: PENDING

Commits could not be created due to tool permission restrictions on `git add` / `git commit`. All file changes are present in the working tree and verified via `git status` and `git diff --stat`. The orchestrator should commit these changes.
