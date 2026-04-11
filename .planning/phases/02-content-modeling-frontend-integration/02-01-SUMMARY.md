---
phase: 02-content-modeling-frontend-integration
plan: 01
title: "Content Schema Definitions"
subsystem: cms-content-model
tags: [payload, collections, globals, blocks, types]
dependency_graph:
  requires: [01-01, 01-02]
  provides: [Pages, RegulatoryUpdates, Certifications, NewsItems, Programmes, payload-types]
  affects: [02-02, 02-03, 02-04]
tech_stack:
  added: []
  patterns: [payload-collections, payload-globals, payload-blocks, conditional-fields]
key_files:
  created:
    - src/blocks/HeroBlock.ts
    - src/blocks/StatsBlock.ts
    - src/blocks/CapabilityMatrixBlock.ts
    - src/blocks/RegulatoryDashboardBlock.ts
    - src/blocks/FeaturedProgramsBlock.ts
    - src/blocks/CTABlock.ts
    - src/collections/Pages.ts
    - src/collections/RegulatoryUpdates.ts
    - src/collections/Certifications.ts
    - src/collections/NewsItems.ts
    - src/globals/Programmes.ts
    - src/payload-types.ts
  modified:
    - src/payload.config.ts
decisions:
  - Used relative imports in payload.config.ts and Pages.ts instead of @/ aliases for Payload CLI compatibility
  - Hand-wrote payload-types.ts because Payload CLI cannot run under Node.js 25 due to ESM resolution errors
  - Certifications category values use PascalCase (Foundation/Professional/Specialist/Strategic) to match existing frontend filter values
metrics:
  duration: ~8min
  completed: "2026-04-11"
  tasks_completed: 2
  tasks_total: 2
  files_created: 12
  files_modified: 1
---

# Phase 02 Plan 01: Content Schema Definitions Summary

4 Payload CMS collections, 1 global, and 6 block types with TypeScript types for the full ARIFAC content model.

## What Was Done

### Task 1: Block Definitions, Collection Configs, and Global Config (6ab0dca)

Created 11 schema files defining the complete CMS content model:

**6 Block types** for home page layout composition:
- `HeroBlock` (hero) -- tagline, heading with highlight/trail, description, two CTA buttons, side card
- `StatsBlock` (stats) -- array of label/value stat entries
- `CapabilityMatrixBlock` (capabilityMatrix) -- section chrome + mandates array with link references
- `RegulatoryDashboardBlock` (regulatoryDashboard) -- section chrome only (entries from RegulatoryUpdates collection)
- `FeaturedProgramsBlock` (featuredPrograms) -- section chrome + programs array with image paths
- `CTABlock` (cta) -- heading, description, primary/secondary buttons

**4 Collections:**
- `Pages` (pages) -- title, slug (unique+indexed), pageType select with conditional fields: richText body for simple pages, blocks layout for home page
- `RegulatoryUpdates` (regulatory-updates) -- title, date, referenceNumber, category (7 options), issuingBody (4 options), link
- `Certifications` (certifications) -- title, level, focus, category (4 tiers), format, description, curriculum array, duration
- `NewsItems` (news-items) -- text, published checkbox

**1 Global:**
- `Programmes` (programmes) -- engagementFormats, programmeSchedule, annualMeetings arrays

All schemas have `versions: { drafts: false }` with `maxPerDoc: 20` (collections) or `max: 20` (global).

### Task 2: Config Registration and Type Generation (b6cfbe2)

Updated `src/payload.config.ts` to import and register all 4 collections and the Programmes global. Used relative imports (`./collections/Pages`) instead of path aliases (`@/collections/Pages`) because the Payload CLI uses tsx which cannot resolve tsconfig path aliases.

Created `src/payload-types.ts` with complete TypeScript interfaces matching all schemas. Includes `Config` interface, all collection/global types, block discriminated union types, and select types. Module augmentation declares `GeneratedTypes` for Payload's type system.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Switched from @/ path aliases to relative imports**
- **Found during:** Task 2
- **Issue:** Payload CLI (via tsx) cannot resolve TypeScript path aliases (`@/collections/Pages`), causing `ERR_MODULE_NOT_FOUND`
- **Fix:** Changed all imports in `payload.config.ts` and `Pages.ts` to relative paths (`./collections/Pages`, `../blocks/HeroBlock`)
- **Files modified:** src/payload.config.ts, src/collections/Pages.ts
- **Commit:** b6cfbe2

**2. [Rule 3 - Blocking] Hand-wrote payload-types.ts instead of auto-generating**
- **Found during:** Task 2
- **Issue:** `npx payload generate:types` fails under Node.js 25 with `ERR_REQUIRE_ASYNC_MODULE` and `ERR_MODULE_NOT_FOUND` -- same issue noted in Phase 1
- **Fix:** Manually created payload-types.ts with all interfaces matching the schema definitions exactly. File includes a comment noting it should be regenerated when CLI compatibility is restored.
- **Files modified:** src/payload-types.ts (created)
- **Commit:** b6cfbe2

**3. [Rule 3 - Blocking] Database migration skipped**
- **Found during:** Task 2
- **Issue:** Payload CLI commands (`migrate:create`, `migrate`) fail with the same Node.js 25 ESM errors. Migration will be applied automatically when the dev server starts (Payload auto-migrates on startup in development).
- **Impact:** No migration file committed. Tables will be created on first dev server start.

## Self-Check: PASSED
