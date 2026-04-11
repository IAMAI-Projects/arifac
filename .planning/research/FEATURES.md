# Feature Landscape

**Domain:** CMS-powered organizational website (regulatory compliance industry body)
**Researched:** 2026-04-11

## Table Stakes

Features editors expect from a CMS. Missing any of these means the admin panel is not usable for day-to-day content management.

### Content Modeling & Collections

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Pages collection (static content pages) | ~18 pages currently hardcoded in StaticPageLayout pattern. Editors must be able to update page banner (label, title, description) and body content without code changes. | Medium | Map existing StaticPageLayout props (label, title, description) + body sections to Payload fields. Each page has unique section structure, so use a flexible blocks-based body. |
| Regulatory Updates collection | Currently a large hardcoded array with structured fields (regulator, category, title, circularRef, issuedOn, link). This is the most frequently updated content -- new circulars arrive regularly. | Low | Direct mapping: each update is a document with typed fields. Regulator and category as select fields with predefined options. |
| Certifications collection | 4+ certification items with structured data (title, level, focus, category, format, description, curriculum array, duration). Editors need to add/edit certifications. | Low | Straightforward collection with text, select, and array fields. |
| Programmes collection | Engagement formats and programme schedules currently hardcoded. Mix of structured data (tables) and descriptive content (formats with bullet points). | Low-Medium | Split into engagement formats (blocks or array of groups) and programme schedule entries (simple collection). |
| Site-wide settings (Global) | Navigation links, footer content, news scroller items in the Header -- these appear on every page and must be editable. | Low | Payload Global with arrays for nav items, footer links, and scroller messages. |

### Admin Panel Essentials

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Rich text editing (Lexical) | Content pages have prose paragraphs, bullet lists, links, and occasional bold/emphasis. Editors need a familiar word-processor-like experience. | Low | Payload ships Lexical by default. Use default features (headings, lists, links, bold, italic). No need for custom Lexical features. |
| Media uploads (local storage) | Site has images (hero, programme cards, logos). Editors must upload and manage images. | Low | Payload's built-in Upload collection with `imageSizes` for auto-resizing via sharp. Local storage is fine initially; S3 adapter can be added later. |
| Basic access control | Admin users who can log in and edit content. Even with 1-2 editors, authentication is required to protect the admin panel. | Low | Payload's built-in auth on Users collection. Single "admin" role is sufficient. No complex RBAC needed for 1-2 editors. |
| SEO metadata per page | Every page needs a title tag, meta description, and OG image for sharing. Without this, editors lose control over how pages appear in search and social. | Low | Use `@payloadcms/plugin-seo` -- adds meta title, description, image fields to collections. Auto-generate from page title/description as defaults. |
| Content migration (one-time) | All ~20 pages of hardcoded content must be seeded into the CMS database so nothing is lost. | Medium | Write seed scripts that create documents from existing hardcoded data. This is a one-time effort but critical for launch. Must be thorough -- every page, every section. |

### Rendering & Integration

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Server-side data fetching from Payload Local API | Pages must fetch content from the CMS and render it. Payload's Local API (no HTTP overhead) is the standard pattern when Payload runs inside the same Next.js app. | Medium | Replace hardcoded data in page components with `getPayload()` calls. Convert `"use client"` pages to server components where possible (most pages don't need client-side state). |
| Dynamic rendering of CMS content | Rich text fields and block-based content need to render as React components matching the existing design. | Medium | Build a block renderer that maps Payload block types to existing React components (ContentSection, cards, lists, etc.). Lexical rich text needs a serializer to JSX. |
| Home page sections as Globals or blocks | Home page is composite (Hero, CapabilityMatrix, StatsStrip, FeaturedPrograms, RegulatoryDashboard, CTA). Each section's content must be editable. | Medium-High | Model as a Global with tab fields for each section, or as a single Page document with ordered blocks. Tabs-per-section is simpler and maps better to the fixed home page layout. |

## Differentiators

Features that improve the editor experience but are not strictly required for the CMS to function. Build these after table stakes are solid.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Image optimization pipeline | Auto-generate multiple sizes (thumbnail, card, hero) on upload. Serves appropriately sized images to visitors, improving page load. | Low | Configure `imageSizes` in Payload Upload collection config. Sharp handles resizing. Wire up `next/image` with the generated sizes. |
| S3 storage adapter | Store media in AWS S3 instead of local filesystem. Required for production on AWS (Amplify/ECS instances are ephemeral). | Low-Medium | Use `@payloadcms/storage-s3`. Critical for AWS deployment -- local storage will not persist across deploys. **This is actually table stakes for production but can be deferred during development.** |
| Slug auto-generation | Auto-generate URL slugs from page/certification/programme titles. Prevents editors from manually typing slugs and ensures consistent URLs. | Low | Payload `beforeChange` hook that slugifies the title field. Standard pattern, well-documented. |
| Content filtering UI for Regulatory Updates | Editors can filter updates by regulator, category, date in the admin panel. Site visitors get the same filtering (already implemented client-side). | Low | Payload admin already provides column-based filtering for collections. Just define the right field types (select for regulator/category, date for issuedOn). |
| Admin panel branding | Custom logo, colors, and favicon in the Payload admin panel to match ARIFAC branding. Makes the CMS feel like a first-party tool. | Low | Payload admin config accepts custom `logo`, `icon`, `ogImage`, and CSS overrides. Straightforward config. |
| Reusable content blocks library | Define a set of blocks (TextBlock, CardGrid, StatsStrip, CTABanner, AccordionList) that editors can compose on any page. Enables flexible page layouts without developer involvement. | Medium-High | Requires designing block schemas, building block renderer components, and testing combinations. Powerful but adds complexity -- start with a small set of blocks matching existing section patterns. |
| Scheduled publishing for Regulatory Updates | Editors prepare updates in advance and set a publish date. Updates appear on the site automatically. | Medium | Payload's built-in `versions` with `drafts: true` handles draft/published states. Scheduled publishing requires a cron job or Payload's publish scheduling (if using Payload Cloud) or a custom solution on AWS. |
| Live preview / draft preview | Editors see how content looks on the actual site before publishing. | Medium-High | Payload has a Live Preview feature. Requires configuring preview URLs and ensuring draft content is fetchable. PROJECT.md explicitly lists this as out of scope ("not needed for 1-2 editors"), so only build if editors request it later. |

## Anti-Features

Features to deliberately NOT build. Each represents a complexity trap or scope creep risk for a 1-2 editor organizational website.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Visual page builder with drag-and-drop | Payload is code-first, not a visual builder. Attempting to replicate WordPress Gutenberg or Wix-style drag-and-drop is enormous effort, fragile, and fights Payload's design philosophy. | Use Payload's Blocks field with a predefined set of block types. Editors pick blocks from a list and fill in fields -- structured but flexible. |
| Multi-language / i18n content | Single-language site (English). i18n adds field duplication, locale switchers, and translation workflow complexity. | Hardcode locale to English. If needed later, Payload has built-in localization support that can be enabled. |
| Complex editorial workflows (approval chains, multi-stage review) | Only 1-2 editors. Approval workflows add UI complexity and slow down publishing for no benefit. | Simple draft/published toggle. An editor saves a draft, previews, and publishes. No approval step. |
| User-facing authentication / member portal | The site is informational, not a member portal. Adding user auth means session management, password reset flows, security concerns -- all for a feature not requested. | Keep the site fully public. Payload auth is admin-only. |
| GraphQL API | Payload supports both REST and GraphQL, but enabling GraphQL adds attack surface and complexity with zero benefit when using the Local API (which this project should use exclusively since Payload runs inside Next.js). | Use Payload Local API only. Disable GraphQL in config. Consider disabling REST API too if no external consumers need it. |
| Custom admin panel React components | Building custom field components, custom views, or custom dashboard widgets in the Payload admin is powerful but time-consuming. For a simple content site, the default admin UI is sufficient. | Use Payload's default field types and admin UI. Only build custom components if a specific editing need cannot be met by built-in fields. |
| Search functionality (Algolia, Elasticsearch) | Not requested. The site has ~20 pages -- browser ctrl+F or simple navigation suffices. Adding search infrastructure is overkill. | Rely on good navigation structure and Google site search if needed. |
| Webhooks / external integrations | No external systems need to be notified of content changes. Adding webhook infrastructure is premature. | If needed later, Payload hooks can trigger external calls. Don't build the plumbing until there's a consumer. |

## Feature Dependencies

```
Site-wide settings (Global) --> Header/Footer rendering (all pages depend on this)
Pages collection --> Server-side data fetching --> Dynamic rendering of CMS content
Regulatory Updates collection --> Content filtering UI (admin already provides this)
Media uploads --> SEO metadata (og:image needs upload support)
Content migration --> ALL features (nothing works until existing content is in the DB)
Rich text editing --> Dynamic rendering (need Lexical-to-JSX serializer)
Slug auto-generation --> Pages collection (URLs depend on slugs)
S3 storage adapter --> Media uploads (required for production deployment)
Reusable content blocks --> Home page sections (blocks enable flexible home page editing)
```

### Critical Path

```
1. Payload integration + database setup
2. Content modeling (collections + globals)
3. Media uploads (basic, local storage)
4. Rich text editing (Lexical defaults)
5. Server-side data fetching + rendering
6. Content migration (seed scripts)
7. SEO plugin
8. S3 storage adapter (before production deploy)
```

## MVP Recommendation

**Prioritize (Phase 1 -- Core CMS):**
1. Payload CMS integration into Next.js with PostgreSQL
2. Content models: Pages, Regulatory Updates, Certifications, Programmes collections
3. Site Settings global (nav, footer, news scroller)
4. Basic Users collection with admin auth
5. Media upload collection (local storage during dev)
6. Rich text editing with Lexical defaults

**Prioritize (Phase 2 -- Rendering + Migration):**
1. Server-side data fetching replacing hardcoded content
2. Block renderer for page sections
3. Home page Global with section-specific fields
4. Content migration seed scripts
5. SEO plugin integration

**Prioritize (Phase 3 -- Production Readiness):**
1. S3 storage adapter for media
2. Image optimization pipeline (imageSizes config)
3. Slug auto-generation
4. Admin panel branding
5. AWS deployment with RDS PostgreSQL

**Defer:**
- Reusable content blocks library: Start with fixed block types matching existing sections. Expand later based on editor feedback.
- Scheduled publishing: Only if editors express a need. Manual publish is fine for low-volume updates.
- Live preview: Explicitly out of scope per PROJECT.md.
- Visual drag-and-drop: Never build this.

## Content Type Summary

Based on analysis of the existing ~20 pages:

| Content Type | Count | Content Pattern | Recommended Model |
|---|---|---|---|
| Home page | 1 | Composite sections (Hero, Stats, Programs, Regulatory, CTA) | Global with tabbed fields per section |
| Static content pages | ~15 | PageBanner + prose sections with eyebrow/title/description/body | Pages collection with blocks-based body |
| Regulatory Updates | ~20+ items | Structured data (regulator, category, title, ref, date, link) | Collection with typed fields |
| Certifications | 4+ items | Structured data (title, level, focus, format, curriculum array) | Collection with typed fields + array for curriculum |
| Programmes | 1 page, complex | Engagement formats + schedule tables | Global or single-document collection with nested groups/arrays |
| About page | 1 | Complex layout with cards, grids, lists -- unique structure | Pages collection but with custom blocks matching its layout |

## Sources

- [Payload CMS Blocks Field Documentation](https://payloadcms.com/docs/fields/blocks)
- [Payload CMS Uploads Documentation](https://payloadcms.com/docs/upload/overview)
- [Payload CMS Storage Adapters](https://payloadcms.com/docs/upload/storage-adapters)
- [Payload CMS SEO Plugin](https://payloadcms.com/docs/plugins/seo)
- [Payload CMS Access Control](https://payloadcms.com/docs/access-control/overview)
- [Payload CMS Rich Text Editor (Lexical)](https://payloadcms.com/docs/rich-text/overview)
- [Building Flexible Layouts with Payload Blocks](https://payloadcms.com/posts/guides/how-to-build-flexible-layouts-with-payload-blocks)
- [Payload CMS RBAC Guide](https://payloadcms.com/posts/blog/build-your-own-rbac)
- [SEO Plugin Setup Guide](https://payloadcms.com/posts/guides/how-to-install-and-configure-the-payload-seo-plugin-nextjs-app)
