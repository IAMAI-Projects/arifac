# Requirements: ARIFAC CMS Integration

**Defined:** 2026-04-11
**Core Value:** Non-technical editors can log in and update any page's content through a visual admin panel

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### CMS Setup

- [ ] **CMS-01**: Payload CMS installed and configured with Next.js 16
- [ ] **CMS-02**: Admin panel accessible at `/admin`
- [ ] **CMS-03**: PostgreSQL database connected via Payload db-postgres adapter

### Authentication

- [ ] **AUTH-01**: Editor can log in to admin panel with email/password
- [ ] **AUTH-02**: Editor accounts can be created by an admin user

### Audit Trail

- [ ] **AUDIT-01**: Every content change logs who made the change and when
- [ ] **AUDIT-02**: Admin can view change history for any content entry

### Home Page

- [ ] **HOME-01**: Hero section content (heading, subtext, CTA buttons) editable from CMS
- [ ] **HOME-02**: Stats strip numbers and labels editable from CMS
- [ ] **HOME-03**: Featured programs cards editable from CMS
- [ ] **HOME-04**: Regulatory dashboard entries editable from CMS
- [ ] **HOME-05**: Capability matrix cards editable from CMS
- [ ] **HOME-06**: Final CTA section content editable from CMS

### Static Pages

- [ ] **PAGE-01**: All ~15 static content pages editable from CMS (about, contact, FAQs, help, membership, legal, privacy, terms, disclaimer, resources, members, member-benefits, training-leads, sectoral-nodal-officers, gallery)
- [ ] **PAGE-02**: Page banner titles and descriptions editable from CMS

### Collections

- [ ] **COLL-01**: Regulatory updates manageable as individual entries (add/edit/remove)
- [ ] **COLL-02**: Certifications manageable as individual entries with filterable fields
- [ ] **COLL-03**: Programmes manageable as individual entries

### Site Config

- [ ] **CONF-01**: News scroller content editable from CMS

### Migration

- [ ] **MIGR-01**: All existing hardcoded content extracted into CMS database via seed scripts
- [ ] **MIGR-02**: Visual design remains identical after migration

### Deployment

- [ ] **DEPL-01**: App deployed on AWS with container-based hosting (ECS/App Runner)
- [ ] **DEPL-02**: PostgreSQL database provisioned on AWS (RDS or similar)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Advanced CMS

- **ADV-01**: Draft/preview mode for content changes before publishing
- **ADV-02**: Content scheduling (publish at a future date)
- **ADV-03**: Role-based access control (different editor permissions)

### Media

- **MEDIA-01**: S3-based media storage for production
- **MEDIA-02**: Image optimization/transforms via Payload

### Navigation

- **NAV-01**: Header navigation links editable from CMS
- **NAV-02**: Footer links editable from CMS

## Out of Scope

| Feature | Reason |
|---------|--------|
| Site visitor authentication | CMS is admin-only, not user-facing |
| Multi-language / i18n | Single language site |
| Complex editorial workflows | Only 1-2 editors, simple workflow sufficient |
| Search functionality | Not requested |
| E-commerce / payments | Not applicable |
| GraphQL API | REST/Local API sufficient for this use case |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CMS-01 | — | Pending |
| CMS-02 | — | Pending |
| CMS-03 | — | Pending |
| AUTH-01 | — | Pending |
| AUTH-02 | — | Pending |
| AUDIT-01 | — | Pending |
| AUDIT-02 | — | Pending |
| HOME-01 | — | Pending |
| HOME-02 | — | Pending |
| HOME-03 | — | Pending |
| HOME-04 | — | Pending |
| HOME-05 | — | Pending |
| HOME-06 | — | Pending |
| PAGE-01 | — | Pending |
| PAGE-02 | — | Pending |
| COLL-01 | — | Pending |
| COLL-02 | — | Pending |
| COLL-03 | — | Pending |
| CONF-01 | — | Pending |
| MIGR-01 | — | Pending |
| MIGR-02 | — | Pending |
| DEPL-01 | — | Pending |
| DEPL-02 | — | Pending |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 0
- Unmapped: 23 ⚠️

---
*Requirements defined: 2026-04-11*
*Last updated: 2026-04-11 after initial definition*
