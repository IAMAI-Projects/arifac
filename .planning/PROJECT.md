# ARIFAC Website — CMS Integration

## What This Is

The ARIFAC website is a regulatory compliance organization's web presence, currently built as a static Next.js site with ~20 pages of hardcoded content. This project adds Payload CMS so non-technical editors can manage all page content through an admin panel with username/password login, without touching code.

## Core Value

Non-technical editors can log in and update any page's content through a visual admin panel — no developer involvement needed for routine content changes.

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

- [ ] Payload CMS integrated into the Next.js app
- [ ] Admin panel at `/admin` with email/password login
- [ ] Editor user accounts with credentials
- [ ] All existing pages editable from CMS
- [ ] Regulatory updates manageable as a collection
- [ ] Programmes and certifications manageable as collections
- [ ] Database (PostgreSQL) for CMS content storage
- [ ] Media upload support for images
- [ ] Content migration from hardcoded components to CMS
- [ ] Change log / audit trail — who changed what and when
- [ ] AWS deployment with database connectivity (ECS or similar)

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
- **Deployment:** AWS Amplify currently, moving to ECS or container-based AWS deployment (Amplify doesn't support Next.js 16 + Payload)
- **CMS choice:** Payload CMS — self-hosted, runs inside Next.js, built-in email/password auth, open source
- **Database:** PostgreSQL via Payload's db-postgres adapter
- **Editors:** 1-2 people with username/password login
- **Media needs:** Minimal — mostly text content, occasional images
- **Page types:** Home page (composite sections), content pages (StaticPageLayout), listings (certifications, programmes, regulatory updates)

## Constraints

- **Tech stack**: Must integrate with existing Next.js 16 / React 19 / Tailwind 4 stack — Payload CMS runs natively in Next.js
- **Hosting**: Must deploy on AWS — need PostgreSQL database (RDS or similar) alongside containerized app
- **Auth**: Editors must log in with email/password (no GitHub/OAuth dependency)
- **Content continuity**: All existing page content must be preserved during migration to CMS
- **Design continuity**: Visual design must remain identical after CMS integration — same components, same styling

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Payload CMS over Keystatic | Need built-in email/password auth for editors. Keystatic only supports GitHub OAuth. | — Pending |
| PostgreSQL over MongoDB | Better Payload + Next.js integration, structured data fits relational model | — Pending |
| Migrate all pages to CMS | User wants full CMS control over every page, not partial | — Pending |
| AWS container deployment | Amplify doesn't support Next.js 16; need ECS/App Runner for Payload + DB | — Pending |

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
*Last updated: 2026-04-11 after initialization (CMS: Keystatic → Payload for username/password auth)*
