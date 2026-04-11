# Roadmap: ARIFAC CMS Integration

## Overview

Transform the ARIFAC static Next.js site into a CMS-powered application where non-technical editors can manage all content through Payload CMS. The journey moves from installing Payload and restructuring the app (Phase 1), through defining content schemas and wiring every page to the CMS (Phase 2), migrating all existing hardcoded content (Phase 3), and finally deploying to AWS with container hosting and PostgreSQL (Phase 4).

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: CMS Foundation** - Payload CMS installed with admin panel, auth, and PostgreSQL running locally
- [ ] **Phase 2: Content Modeling & Frontend Integration** - All collections, globals, and pages wired to CMS with audit trail
- [ ] **Phase 3: Content Migration** - Hardcoded content extracted into CMS database with visual parity
- [ ] **Phase 4: Production Deployment** - App deployed on AWS with container hosting and managed PostgreSQL

## Phase Details

### Phase 1: CMS Foundation
**Goal**: Payload CMS runs inside the existing Next.js app with a working admin panel, editor authentication, and local PostgreSQL database
**Depends on**: Nothing (first phase)
**Requirements**: CMS-01, CMS-02, CMS-03, AUTH-01, AUTH-02
**Success Criteria** (what must be TRUE):
  1. Developer can visit `/admin` and see the Payload admin panel login screen
  2. Editor can log in to the admin panel with email and password
  3. An admin user can create additional editor accounts from the admin panel
  4. Existing frontend pages still render correctly at their current URLs (no regressions from route group restructure)
  5. PostgreSQL database is connected and Payload migrations run successfully
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Install Payload CMS packages, create config with Users collection and PostgreSQL adapter, wire into Next.js
- [x] 01-02-PLAN.md — Restructure app into route groups, create admin panel route, run migration, verify end-to-end

### Phase 2: Content Modeling & Frontend Integration
**Goal**: Every piece of site content is manageable from the CMS admin panel, and all frontend pages render from CMS data
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, PAGE-01, PAGE-02, COLL-01, COLL-02, COLL-03, CONF-01, AUDIT-01, AUDIT-02
**Success Criteria** (what must be TRUE):
  1. Editor can edit the home page hero, stats, programs, regulatory dashboard, capability matrix, and CTA sections from the admin panel and see changes on the frontend
  2. Editor can edit any of the ~15 static content pages (banner title, description, body content) from the admin panel
  3. Editor can add, edit, and remove individual regulatory updates, certifications, and programmes from their respective collections
  4. Editor can update the news scroller content from the admin panel
  5. Admin can view a change history showing who edited what content and when
**Plans**: 3 plans
**UI hint**: yes

Plans:
- [ ] 02-01-PLAN.md — Define all Payload CMS content schemas (collections, globals, blocks), run migration, generate types
- [ ] 02-02-PLAN.md — Convert home page to server component with BlockRenderer and CMS-driven section components
- [ ] 02-03-PLAN.md — Wire static pages via dynamic [slug] route, convert special pages, add news scroller to layout

### Phase 3: Content Migration
**Goal**: All existing hardcoded content lives in the CMS database, and the site looks identical to its pre-CMS state
**Depends on**: Phase 2
**Requirements**: MIGR-01, MIGR-02
**Success Criteria** (what must be TRUE):
  1. Seed scripts populate the database with all existing page content, regulatory updates, certifications, programmes, and site config
  2. Every page renders identically to its pre-CMS appearance (visual parity verified by side-by-side comparison)
  3. No hardcoded content remains in page components -- all content flows from CMS
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

### Phase 4: Production Deployment
**Goal**: The CMS-powered site runs on AWS with persistent database and media storage, accessible to editors
**Depends on**: Phase 3
**Requirements**: DEPL-01, DEPL-02
**Success Criteria** (what must be TRUE):
  1. Site is accessible at the production URL with all pages loading correctly
  2. Admin panel is accessible at the production `/admin` URL and editors can log in
  3. Content changes made in the production admin panel persist across deployments
  4. PostgreSQL database is running on AWS RDS (or similar) with SSL connectivity
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. CMS Foundation | 0/2 | Not started | - |
| 2. Content Modeling & Frontend Integration | 0/3 | Not started | - |
| 3. Content Migration | 0/1 | Not started | - |
| 4. Production Deployment | 0/1 | Not started | - |
