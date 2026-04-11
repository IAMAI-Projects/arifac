# Phase 2: Content Modeling & Frontend Integration - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-11
**Phase:** 02-content-modeling-frontend-integration
**Areas discussed:** Content schema design, Collection structure, Frontend data fetching, Audit trail approach

---

## Content Schema Design

### Home Page Modeling

| Option | Description | Selected |
|--------|-------------|----------|
| One Home Page global | Single Payload Global with grouped fields for each section | |
| Separate global per section | Individual globals for Hero, Stats Strip, etc. | |
| Pages collection with blocks | Generic Pages collection with block field type — editor composes from reusable blocks | ✓ |

**User's choice:** Pages collection with blocks
**Notes:** User wants composable home page sections using Payload's block system.

### Static Pages Modeling

| Option | Description | Selected |
|--------|-------------|----------|
| Pages collection | One collection with slug, banner fields, and rich text body | ✓ |
| Individual globals per page | Each static page gets its own Global | |
| Pages with structured blocks | Pages collection with block-based body instead of rich text | |

**User's choice:** Pages collection with slug, banner fields, and rich text body
**Notes:** Maps 1:1 to existing StaticPageLayout pattern.

### Complex Static Pages

| Option | Description | Selected |
|--------|-------------|----------|
| Rich text + custom components | Rich text for body, keep complex layouts as hardcoded React | |
| All content from CMS | Model every section as structured CMS fields, layouts stay in React | ✓ |
| Block-based composition | Reusable Payload blocks for page sections | |

**User's choice:** All content from CMS — structured fields for everything
**Notes:** User asked about Payload's visual editor. Clarified that Live Preview is a v2 feature (ADV-01) and Payload is a structured content CMS, not a drag-and-drop page builder. Modeling decisions still apply.

### Home Page Location

| Option | Description | Selected |
|--------|-------------|----------|
| In Pages collection | Home is a document with slug 'home' using block-based layout field | ✓ |
| Separate Home Page global | Guaranteed to exist, dedicated admin screen | |
| Separate Home Page collection | Dedicated collection limited to single document | |

**User's choice:** In Pages collection
**Notes:** None

### Complex Pages Location

| Option | Description | Selected |
|--------|-------------|----------|
| Same Pages collection | Complex pages get additional structured fields via pageType | ✓ |
| Separate collections | Each complex page gets its own collection | |

**User's choice:** Same Pages collection with pageType field
**Notes:** None

---

## Collection Structure

### Regulatory Updates Fields

| Option | Description | Selected |
|--------|-------------|----------|
| Match current display | Title, date, ref number, category, issuing body | ✓ |
| Extended with body content | Add rich text body and source URL for detail pages | |
| You decide | Claude picks | |

**User's choice:** Match current display — minimal fields
**Notes:** None

### Certifications Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Keep hardcoded for now | Leave as hardcoded data, LMS comes later | |
| Temporary CMS collection | Create Payload collection now, replace with LMS API later | ✓ |
| CMS collection as permanent source | Keep in Payload long-term | |

**User's choice:** Temporary CMS collection
**Notes:** User revealed that certifications will eventually come from an LMS API — this is not permanent CMS content. Collection should be designed to be easily removable.

### Programmes Modeling

| Option | Description | Selected |
|--------|-------------|----------|
| Global | Single Programmes Global with three array fields | ✓ |
| In Pages collection | Document in Pages with pageType 'programmes' | |

**User's choice:** Global (after clarification of Global vs Collection difference)
**Notes:** User asked for clarification on the difference between a Pages collection entry and a Global. Explained: Globals are single fixed documents that can't be deleted, Collections are lists of documents. User chose Global for programmes since it's a one-off page with fixed structure.

### News Scroller

| Option | Description | Selected |
|--------|-------------|----------|
| Site Config global | News scroller array in a site-wide config Global | |
| News Items collection | Separate collection, individual publish/unpublish | ✓ |

**User's choice:** News Items collection
**Notes:** User prefers granular control over individual news items.

---

## Frontend Data Fetching

### Data Fetch Method

| Option | Description | Selected |
|--------|-------------|----------|
| Payload Local API | Direct database queries, no HTTP overhead | |
| Payload REST API | HTTP fetch from auto-generated endpoints | |
| You decide | Claude picks | ✓ |

**User's choice:** You decide (Claude's discretion)
**Notes:** Local API is the standard approach for Payload running inside Next.js.

### Server/Client Component Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Server pages + client islands | Pages become server components, interactive parts stay client | ✓ |
| Keep all pages client-side | Keep 'use client', fetch via REST/useEffect | |
| You decide | Claude picks | |

**User's choice:** Server pages + client islands
**Notes:** None

### Empty State Handling

| Option | Description | Selected |
|--------|-------------|----------|
| Show placeholder text | Display 'Content coming soon' for missing content | |
| Fall back to hardcoded content | Use original hardcoded content as defaults | |
| Show nothing / hide section | Empty fields = hidden, missing pages = 404 | ✓ |
| You decide | Claude picks | |

**User's choice:** Show nothing / hide section — strict approach
**Notes:** Forces editors to populate everything. Clean but can look sparse during initial setup.

---

## Audit Trail

### Audit Implementation

| Option | Description | Selected |
|--------|-------------|----------|
| Payload Versions | Built-in version tracking on all collections/globals | ✓ |
| Custom audit log collection | Separate collection with hooks for logging | |
| You decide | Claude picks | |

**User's choice:** Payload Versions — zero custom code
**Notes:** None

### Version Restore

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, allow restore | Editors can revert to previous versions | ✓ |
| View only, no restore | History visible but no revert capability | |
| You decide | Claude picks | |

**User's choice:** Allow restore
**Notes:** Payload's default behavior, no customization needed.

---

## Claude's Discretion

- Local API vs REST for data fetching
- Block type definitions and field granularity
- pageType conditional field implementation
- Version retention count (maxPerDoc)
- Dynamic route setup

## Deferred Ideas

- LMS API integration for certifications (future phase)
- Payload Live Preview / visual editing (v2 requirement ADV-01)
