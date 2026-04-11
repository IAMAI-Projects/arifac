# ARIFAC Website — CMS Integration

## What This Is

The ARIFAC website is a regulatory compliance organization's web presence, currently built as a static Next.js site with ~20 pages of hardcoded content. This project adds Keystatic CMS so non-technical editors can manage all page content through an admin UI without touching code. Keystatic stores content as files (Markdown/JSON) in the git repo — no database needed.

## Core Value

Non-technical editors can update any page's content through a visual admin panel — no developer involvement needed for routine content changes.

## Requirements

### Validated

- ✓ Static website with ~20 content pages — existing
- ✓ Responsive design with Tailwind CSS — existing
- ✓ Navigation header with news scroller — existing
- ✓ Footer with site links — existing
- ✓ Home page with hero, stats, programs, regulatory dashboard — existing
- ✓ Content pages using StaticPageLayout wrapper — existing
- ✓ Certifications page with client-side filtering — existing
- ✓ Design tokens system (brand colors, typography) — existing
- ✓ PWA manifest — existing

### Active

- [ ] Keystatic CMS integrated into the Next.js app
- [ ] Admin UI accessible at `/keystatic` for content editors
- [ ] All existing pages editable from CMS
- [ ] Regulatory updates manageable as a content collection
- [ ] Programmes and certifications manageable as content collections
- [ ] Content stored as Markdown/JSON files in the repo
- [ ] Media upload support for images
- [ ] Content migration from hardcoded components to CMS-managed files
- [ ] Deployment working with CMS admin UI

### Out of Scope

- User authentication for site visitors — this is an admin CMS, not a user-facing auth system
- Real-time preview/draft mode — not needed for 1-2 editors
- Multi-language/i18n — single language site
- Complex editorial workflows (approval chains) — 1-2 editors, simple workflow
- Search functionality — not requested
- E-commerce/payments — not applicable

## Context

- **Existing site:** Next.js 16, React 19, Tailwind 4, TypeScript, pnpm
- **Current content:** All hardcoded in React components (~20 pages)
- **Deployment:** AWS Amplify currently, flexible within AWS
- **CMS choice:** Keystatic — git-based, no database, content as files, admin UI built-in
- **Database:** None needed — Keystatic stores content as Markdown/JSON in the repo
- **Editors:** 1-2 people managing content
- **Media needs:** Minimal — mostly text content, occasional images/files
- **Page types:** Home page (composite sections), content pages (StaticPageLayout), listings (certifications, programmes, regulatory updates)

## Constraints

- **Tech stack**: Must integrate with existing Next.js 16 / React 19 / Tailwind 4 stack — Keystatic has first-class Next.js support
- **Hosting**: Must deploy on AWS — no database needed, but CMS admin needs a running server (not purely static export)
- **Content continuity**: All existing page content must be preserved during migration to CMS
- **Design continuity**: Visual design must remain identical after CMS integration — same components, same styling

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keystatic over Payload CMS | No database needed, faster to ship, content in git, simpler stack. Can migrate to Payload later if needed. | — Pending |
| Git-based content storage | Content as Markdown/JSON files versioned in repo — fits static site mental model, easy rollbacks | — Pending |
| Migrate all pages to CMS | User wants full CMS control over every page, not partial | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-11 after initialization (updated: CMS choice changed from Payload to Keystatic)*
