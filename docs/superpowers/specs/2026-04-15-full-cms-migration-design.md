# Full CMS Migration Design

**Date:** 2026-04-15
**Goal:** Migrate all hardcoded website content to Payload CMS so non-technical editors can manage everything through the admin panel.
**Approach:** Extend existing schema — reuse Pages collection's `pageType` pattern, add globals for site-wide elements, new collections for repeating data.

---

## 1. New Globals

### Header Global (`slug: 'header'`)

| Field | Type | Description |
|---|---|---|
| `navigation` | array | Top-level nav items |
| `navigation.*.label` | text | Display label — "About", "Engage" |
| `navigation.*.link` | text | URL path — "/about" |
| `navigation.*.hasDropdown` | checkbox | Whether item has a dropdown |
| `navigation.*.dropdownLabel` | text | Dropdown eyebrow — "Certification & Training" |
| `navigation.*.dropdownItems` | array | Dropdown links |
| `navigation.*.dropdownItems.*.label` | text | Link label |
| `navigation.*.dropdownItems.*.description` | text | Subtitle — "Join our network" |
| `navigation.*.dropdownItems.*.link` | text | URL path |
| `memberPortalLabel` | text | "Member" |
| `memberPortalUrl` | text | Uses env var currently |
| `learnerPortalLabel` | text | "Learner" |
| `learnerPortalUrl` | text | Currently hardcoded to stage.learning.arifac.com |
| `fiuLogoLink` | text | "https://fiuindia.gov.in/" |
| `linkedinUrl` | text | "https://www.linkedin.com/company/arifac/" |

### Footer Global (`slug: 'footer'`)

| Field | Type | Description |
|---|---|---|
| `tagline` | textarea | "Empowering India's financial ecosystem..." |
| `initiativeLabel` | text | "An IAMAI Initiative" |
| `linkGroups` | array | Footer link columns |
| `linkGroups.*.title` | text | "Alliance", "Programmes", "Support" |
| `linkGroups.*.links` | array | Links in the group |
| `linkGroups.*.links.*.label` | text | Link display text |
| `linkGroups.*.links.*.url` | text | URL path |
| `bottomLinks` | array | Legal/bottom bar links |
| `bottomLinks.*.label` | text | "Terms", "Privacy" |
| `bottomLinks.*.url` | text | URL path |
| `copyrightText` | text | "ARIFAC | IAMAI. All rights reserved." |

---

## 2. New Collections

### Legal Pages (`slug: 'legal-pages'`)

| Field | Type | Description |
|---|---|---|
| `title` | text, required | "Terms of Use", "Privacy Policy", "Disclaimer" |
| `slug` | text, required, unique | "terms-of-use", "privacy-policy", "disclaimer" |
| `contactEmail` | text, optional | "help.arifac@iamai.in" |
| `sections` | array | Numbered sections of the legal document |
| `sections.*.title` | text | Section heading |
| `sections.*.body` | richText | Section content |
| `acknowledgment` | group, optional | Final acknowledgment block |
| `acknowledgment.heading` | text | Acknowledgment heading |
| `acknowledgment.body` | richText | Acknowledgment content |

### Nodal Officers (`slug: 'nodal-officers'`)

| Field | Type | Description |
|---|---|---|
| `name` | text, required | Officer name |
| `designation` | text, required | Role/title |
| `organization` | text, required | Company/institution |
| `sector` | text, required | "Banking", "Insurance", etc. |
| `order` | number | Manual sort order |

### Training Leads (`slug: 'training-leads-directory'`)

| Field | Type | Description |
|---|---|---|
| `name` | text, required | Lead name |
| `designation` | text, required | Role/title |
| `organization` | text, required | Company/institution |
| `specialization` | text, required | Area of expertise |
| `order` | number | Manual sort order |

---

## 3. Extended Page Types (Pages Collection)

Add new options to the existing `pageType` select: `'membership'`, `'learners'`, `'contributor'`, `'certifications'`, `'updates'`.

### Membership (`pageType: 'membership'`)

| Field | Type | Description |
|---|---|---|
| `membershipIntro` | group | Intro content below banner |
| `membershipIntro.subheading` | text | "Two engagement pathways..." |
| `membershipIntro.description` | textarea | Detailed explanation |
| `benefits` | array | Benefit categories |
| `benefits.*.category` | text | "Industry Consultation", etc. |
| `benefits.*.items` | array | Items within category |
| `benefits.*.items.*.title` | text | Benefit title |
| `benefits.*.items.*.description` | text | Benefit description |
| `responsibilities` | array | Member responsibilities |
| `responsibilities.*.title` | text | Responsibility title |
| `responsibilities.*.description` | text | Responsibility description |
| `validityTerms` | array | Validity & renewal terms |
| `validityTerms.*.text` | text | Term text |
| `feeTables` | group | Fee structure |
| `feeTables.turnoverBased` | array | Turnover-based tiers |
| `feeTables.turnoverBased.*.tier` | text | "Up to INR 100 Cr" |
| `feeTables.turnoverBased.*.fee` | text | "25,000" |
| `feeTables.aumBased` | array | AUM-based tiers |
| `feeTables.aumBased.*.tier` | text | Tier label |
| `feeTables.aumBased.*.fee` | text | Fee amount |
| `ctaLabel` | text | CTA button text |
| `ctaLink` | text | CTA URL |

### Learners (`pageType: 'learners'`)

| Field | Type | Description |
|---|---|---|
| `accessItems` | array | What registering gives access to |
| `accessItems.*.title` | text | "Knowledge & Intelligence" |
| `accessItems.*.description` | text | Item description |
| `ctaSection` | group | Bottom CTA |
| `ctaSection.heading` | text | CTA heading |
| `ctaSection.description` | textarea | CTA description |
| `ctaSection.buttonLabel` | text | Button text |
| `ctaSection.buttonLink` | text | Button URL |

### Contributor (`pageType: 'contributor'`)

| Field | Type | Description |
|---|---|---|
| `expertiseAreas` | array | Options for expertise selector |
| `expertiseAreas.*.label` | text | "AML/CFT Compliance", etc. |
| `whyContribute` | group | Sidebar content |
| `whyContribute.heading` | text | Sidebar heading |
| `whyContribute.points` | array | Bullet points |
| `whyContribute.points.*.text` | text | Point text |
| `formSubmitUrl` | text, optional | External form endpoint |

### Certifications (`pageType: 'certifications'`)

| Field | Type | Description |
|---|---|---|
| `pathwayTiers` | array | Tier highlight cards |
| `pathwayTiers.*.title` | text | "Recognised Standards" |
| `pathwayTiers.*.description` | text | Tier description |

(Banner already covered by existing `banner` group)

### Updates (`pageType: 'updates'`)

No extra fields needed — existing `banner` group is sufficient.

---

## 4. New Homepage Blocks

### Partnerships Block (`blockType: 'partnerships'`)

| Field | Type | Description |
|---|---|---|
| `label` | text | "Partnerships" |
| `heading` | text | "Built on shared standards" |
| `description` | textarea | Section description |
| `guidanceCard` | group | Strategic Guidance card |
| `guidanceCard.label` | text | "Strategic Guidance" |
| `guidanceCard.title` | text | "Financial Intelligence Unit – India (FIU-IND)" |
| `guidanceCard.logoUrl` | text, optional | Logo image path |
| `disclaimer` | text | Note text |

### Community Block (`blockType: 'community'`)

| Field | Type | Description |
|---|---|---|
| `label` | text | "National Network" |
| `heading` | text | Section heading |
| `description` | textarea | Section description |
| `links` | array | Feature link cards |
| `links.*.eyebrow` | text | "Network Hub" |
| `links.*.title` | text | "Sectoral Nodal Officers" |
| `links.*.href` | text | URL path |
| `stat` | group | Featured statistic |
| `stat.value` | text | "18+" |
| `stat.description` | text | Stat description |
| `ctaLabel` | text | "Join the Network" |
| `ctaLink` | text | "/membership" |

---

## 5. Programmes Global Extension

Add to existing `Programmes` global:

| Field | Type | Description |
|---|---|---|
| `banner` | group | Page banner content |
| `banner.label` | text | "Programmes" |
| `banner.title` | text | Page title |
| `banner.description` | textarea | Page description |
| `sectionHeadings` | group | Section header labels |
| `sectionHeadings.engagementStrategy` | text | "Engagement Strategy" |
| `sectionHeadings.programmeSchedule` | text | "Programme Schedule" |
| `sectionHeadings.recentConsultations` | text | "Recent Consultations" |
| `sectionHeadings.annualMeetings` | text | "Annual Meetings & Regulatory Fora" |

---

## 6. Component Updates

| Component | Data Source | Change |
|---|---|---|
| Header | `header` global (fetched in layout.tsx) | Replace hardcoded nav, URLs, labels with props |
| Footer | `footer` global (fetched in layout.tsx) | Replace hardcoded links, tagline, copyright with props |
| Partnerships | `partnerships` block via BlockRenderer | Accept `data` prop like other blocks |
| CommunitySection | `community` block via BlockRenderer | Accept `data` prop, wire into BlockRenderer |
| CertificationsFilter | Pathway tiers from page data | Remove hardcoded tier cards, accept as prop |
| Membership page | `pageType: 'membership'` fields | Replace all hardcoded content |
| Sectoral Nodal Officers page | `nodal-officers` collection | Fetch from CMS |
| Training Leads page | `training-leads-directory` collection | Fetch from CMS |
| Learners page | `pageType: 'learners'` fields | Replace hardcoded items |
| Contributor page | `pageType: 'contributor'` fields | Replace hardcoded sidebar/options |
| Legal pages | `legal-pages` collection | New dynamic route `[slug]` replaces 3 hardcoded pages |
| Programmes page | Extended `Programmes` global | Replace hardcoded banner/headers |
| About page | Existing about page fields | Remove remaining hardcoded paragraph/bullets |

---

## 7. Data Flow

```
layout.tsx
  ├── fetches header global  →  passes to <Header />
  ├── fetches footer global  →  passes to <Footer />
  └── renders children

page.tsx (homepage)
  ├── fetches 'home' page  →  layout blocks include partnerships + community
  └── BlockRenderer handles all blocks

page.tsx (other pages)
  ├── fetches page by slug  →  conditional fields based on pageType
  └── passes data to page components

[slug]/page.tsx (legal)
  └── fetches from legal-pages collection by slug

nodal-officers, training-leads
  └── fetched directly from their collections
```

---

## 8. Seed File

Extend `seed.ts` to populate:
- Header and Footer globals with current hardcoded content
- Legal pages with current terms/privacy/disclaimer text
- Nodal officers and training leads with current hardcoded data
- Membership, Learners, Contributor page fields
- Certifications page pathway tiers
- Homepage partnerships and community blocks
- Programmes global banner and section headings

All existing hardcoded content is preserved — zero content loss during migration.

---

## 9. Scope Exclusions

The following remain hardcoded as they are UI chrome, not content:
- Filter labels ("Search", "Level", "Format", "Clear Filters")
- Enum display mappings (`issuingBodyLabels`, `categoryLabels`)
- Button text like "View Circular", "Course Details"
- Form field labels and validation messages in Contributor page
- Empty state messages
