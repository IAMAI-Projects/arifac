---
phase: 03-content-migration
plan: 02
subsystem: database, seed-data, content-migration
tags: [payload-cms, seed-endpoint, lexical-richtext, content-migration, all-pages]

# Dependency graph
requires:
  - phase: 03-content-migration
    plan: 01
    provides: About-specific structured fields in Pages collection, CMS-driven about page
provides:
  - Comprehensive seed data for all CMS pages (16 total page records)
  - Lexical rich text helpers for structured body content
  - About page structured seed data (whySection, whatSection, whoSection)
  - Verification script for runtime seed testing
affects: [visual-parity, all-footer-links, about-page-content]

# Tech tracking
tech-stack:
  added: []
  patterns: [lexical rich text node construction, Promise.all for independent collection creates]

key-files:
  created:
    - src/app/(payload)/api/seed/verify-seed.sh
  modified:
    - src/app/(payload)/api/seed/route.ts

key-decisions:
  - "Used lexical helper functions to generate structured rich text bodies for all static pages"
  - "Used Promise.all for independent collection creates (regulatory-updates, news, certs) to reduce seed time"
  - "Created verification script instead of runtime test — no PostgreSQL available in worktree"

patterns-established:
  - "Lexical rich text helpers (lexicalParagraph, lexicalHeading, lexicalList, lexicalRoot) for composing body content"
  - "Idempotent seed pattern: check-before-create for all page records"

requirements-completed: [MIGR-01, MIGR-02]

# Metrics
duration: 3min
completed: 2026-04-11
---

# Phase 3 Plan 2: Comprehensive Seed Content for All Pages Summary

**Expanded seed endpoint with lexical rich text helpers, about page structured sections, and 12 additional footer-linked pages covering all site navigation**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-11T20:19:39Z
- **Completed:** 2026-04-11T20:23:01Z
- **Tasks:** 2 completed, 1 pending (checkpoint:human-verify)
- **Files modified:** 1, Files created: 1

## Accomplishments

- Added 5 lexical rich text helper functions (lexicalText, lexicalParagraph, lexicalHeading, lexicalList, lexicalRoot) for composing structured body content
- Expanded about page seed to include full whySection (threats, alignedWith), whatSection (4 focusAreas with points), whoSection (8 audiences with ctaLabel/ctaLink)
- Added rich text body content to contact, membership, and member-benefits pages
- Added 12 new page records for all footer-linked slugs: members, meetings, gallery, training-leads, sectoral-nodal-officers, resources, help, faqs, privacy, terms-of-use, disclaimer, membership/launching-soon
- Refactored regulatory-updates, news-items, certifications to use Promise.all for parallel creation
- Total seeded pages: 16 (home + about + contact + membership + member-benefits + 11 additional + membership/launching-soon)
- Created verification script for runtime testing when database is available

## Task Commits

Each task was committed atomically:

1. **Task 1: Expand seed endpoint with comprehensive content for all pages** - `a2276b8` (feat)
2. **Task 2: Add seed verification script** - `e56678e` (chore)
3. **Task 3: Visual parity verification** - PENDING (checkpoint:human-verify)

## Files Created/Modified

- `src/app/(payload)/api/seed/route.ts` - Expanded from 170 to 340+ lines with all page content, lexical helpers, structured about data
- `src/app/(payload)/api/seed/verify-seed.sh` - Runtime verification script for seed + page status checks

## Decisions Made

- Used lexical helper functions to generate structured rich text bodies — keeps seed data readable and maintainable
- Used Promise.all for independent collection creates (regulatory-updates, news-items, certifications) — mitigates T-03-06 timeout threat
- Created verification script instead of live runtime test — no PostgreSQL database available in worktree CI environment

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] No database available for runtime seed verification (Task 2)**
- **Found during:** Task 2 (Run seed endpoint and verify)
- **Issue:** No DATABASE_URI configured in worktree environment, no PostgreSQL running — cannot start dev server or call seed endpoint
- **Fix:** Created verify-seed.sh script that performs all Task 2 verification steps when run with a live server. Runtime verification deferred to Task 3 (checkpoint:human-verify).
- **Files created:** src/app/(payload)/api/seed/verify-seed.sh
- **Commit:** e56678e

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Runtime seed verification not executed in CI. Verification script provided for human-verify checkpoint. All seed data code is complete and correct per static analysis.

## Checkpoint Pending

**Task 3: Visual parity verification** (checkpoint:human-verify)
- Status: PENDING — requires human to visit pages and verify visual parity
- Prerequisites: Database configured, dev server running, seed endpoint called
- Verification steps documented in plan and verify-seed.sh script

## Known Stubs

None. All pages have substantive banner and body content. About page has full structured data for all 3 sections.

---
*Phase: 03-content-migration*
*Completed: 2026-04-11 (Tasks 1-2; Task 3 pending checkpoint)*

## Self-Check: PASSED

All files exist, all commits verified.
