# Architecture Patterns

**Domain:** CMS integration into existing static Next.js site
**Researched:** 2026-04-11

## Recommended Architecture

Payload CMS 3.x embeds directly into the Next.js app as a peer route group. The existing frontend and the CMS admin panel share a single Next.js process, a single deployment, and a single `node_modules`. Data flows from PostgreSQL through Payload's Local API into React Server Components that render the existing design.

### High-Level System Diagram

```
                        Next.js 16 Process
                   ┌─────────────────────────────┐
                   │                               │
  Browser ────────►│  /(frontend)    /(payload)    │
                   │  Public pages   Admin panel    │
                   │       │              │         │
                   │       ▼              ▼         │
                   │   ┌──────────────────────┐    │
                   │   │   Payload Local API   │    │
                   │   │   (no HTTP layer)     │    │
                   │   └──────────┬───────────┘    │
                   │              │                 │
                   └──────────────┼─────────────────┘
                                  │
                                  ▼
                          ┌──────────────┐
                          │  PostgreSQL   │
                          │  (RDS / local)│
                          └──────────────┘
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **`/(frontend)` route group** | All public-facing pages. Contains existing pages moved from `src/app/`. Renders CMS data using Server Components. | Payload Local API (server-side, no HTTP) |
| **`/(payload)` route group** | Admin panel UI, REST API endpoints, GraphQL API endpoints. Static files provided by `@payloadcms/next` -- never edited. | Payload core, PostgreSQL via adapter |
| **`payload.config.ts`** | Central CMS configuration. Defines all collections, globals, plugins, database adapter, upload storage. | Referenced by both route groups at startup |
| **`src/collections/`** | Schema definitions for repeating content types (Pages, Programmes, Certifications, RegulatoryUpdates, Media). | Imported by `payload.config.ts` |
| **`src/globals/`** | Schema definitions for singleton content (Header/Navigation, Footer, Homepage sections). | Imported by `payload.config.ts` |
| **`src/blocks/`** | Reusable content block definitions for the Blocks field (ContentSection, StatsStrip, CTABanner, CardGrid, etc.). | Imported by collection/global schemas |
| **`src/components/`** | Existing React components (Header, Footer, PageBanner, etc.). Remain as presentation layer, but receive CMS data as props instead of hardcoding. | Receives data from page-level Server Components |
| **PostgreSQL** | Stores all CMS content, user accounts, media references. | Accessed exclusively through Payload's DB adapter |

## File Structure After Integration

The key structural change is wrapping the existing app in a route group and adding Payload's route group alongside it.

```
src/
├── app/
│   ├── layout.tsx                    # Minimal shared root layout (html + body only)
│   │
│   ├── (frontend)/                   # YOUR EXISTING APP (renamed route group)
│   │   ├── layout.tsx                # Frontend layout (fonts, metadata, global styles)
│   │   ├── page.tsx                  # Home page (now Server Component fetching from CMS)
│   │   ├── about/page.tsx
│   │   ├── certifications/page.tsx
│   │   ├── programmes/page.tsx
│   │   ├── regulatory-updates/page.tsx
│   │   ├── [slug]/page.tsx           # Dynamic catch-all for CMS-driven content pages
│   │   └── ... (remaining pages)
│   │
│   ├── (payload)/                    # PAYLOAD ADMIN + API (static, never edit)
│   │   ├── layout.tsx                # Payload's own layout
│   │   ├── admin/
│   │   │   └── [[...segments]]/
│   │   │       └── page.tsx          # Admin panel catch-all
│   │   │       └── not-found.tsx
│   │   ├── api/
│   │   │   └── [...slug]/
│   │   │       └── route.ts          # REST API
│   │   └── graphql/                  # GraphQL API (optional)
│   │
│   └── my-route/                     # Any non-grouped routes if needed
│
├── collections/                      # Payload collection schemas
│   ├── Pages.ts
│   ├── Programmes.ts
│   ├── Certifications.ts
│   ├── RegulatoryUpdates.ts
│   ├── Media.ts
│   └── Users.ts
│
├── globals/                          # Payload global schemas
│   ├── Header.ts                     # Navigation links, news scroller items
│   ├── Footer.ts                     # Footer links and content
│   └── Homepage.ts                   # Hero, stats, featured programs config
│
├── blocks/                           # Reusable Payload block definitions
│   ├── ContentSection.ts             # Maps to existing ContentSection component
│   ├── CardGrid.ts                   # Grid of cards (used on about, membership, etc.)
│   ├── CTABanner.ts                  # Call-to-action banners
│   ├── StatsStrip.ts                 # Statistics counters
│   └── RichText.ts                   # Simple rich text section
│
├── components/                       # EXISTING components (unchanged location)
│   ├── Header.tsx                    # Now receives nav data as props
│   ├── Footer.tsx                    # Now receives footer data as props
│   ├── PageBanner.tsx                # Unchanged -- already prop-driven
│   ├── StaticPageLayout.tsx          # Unchanged -- already prop-driven
│   └── ...
│
├── payload.config.ts                 # Central Payload configuration
├── payload-types.ts                  # Auto-generated TypeScript types
└── design-tokens.ts                  # Unchanged
```

## Data Flow

### Pattern 1: Content Pages (Server Component + Local API)

This is the primary pattern. Pages become React Server Components that fetch from Payload's Local API, then pass data as props to existing presentation components.

```
1. Browser requests /about
2. Next.js routes to (frontend)/about/page.tsx (Server Component)
3. Server Component calls payload.find({ collection: 'pages', where: { slug: { equals: 'about' } } })
4. Payload Local API queries PostgreSQL directly (no HTTP)
5. Returns typed document with title, description, layout blocks
6. Server Component maps blocks to React components
7. Components render with CMS data as props (same visual output)
```

**Before (current):**
```tsx
// src/app/about/page.tsx
"use client";
export default function AboutPage() {
  return (
    <StaticPageLayout label="About ARIFAC" title="India's Industry Platform...">
      <section>/* hardcoded content */</section>
    </StaticPageLayout>
  );
}
```

**After (with Payload):**
```tsx
// src/app/(frontend)/about/page.tsx  -- NO "use client" directive
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import StaticPageLayout from '@/components/StaticPageLayout'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })
  const data = page.docs[0]

  return (
    <StaticPageLayout label={data.label} title={data.title} description={data.description}>
      <RenderBlocks blocks={data.layout} />
    </StaticPageLayout>
  )
}
```

### Pattern 2: Globals (Header, Footer)

Globals are fetched once per request in layout components, then passed down.

```
1. (frontend)/layout.tsx (Server Component) calls payload.findGlobal({ slug: 'header' })
2. Header data (nav links, news scroller items) passed as props to <Header> component
3. Same for Footer
```

### Pattern 3: Listing Pages (Collections)

Pages like /certifications, /regulatory-updates, /programmes fetch from their respective collections.

```
1. Server Component calls payload.find({ collection: 'certifications', limit: 50, sort: '-createdAt' })
2. Returns array of typed documents
3. Component renders list, can still have client-side filtering via "use client" child component
```

### Pattern 4: Dynamic Routes

A `[slug]/page.tsx` catch-all handles any CMS-created page not explicitly coded.

```
1. Browser requests /new-page-from-cms
2. Next.js routes to (frontend)/[slug]/page.tsx
3. Server Component fetches page by slug from 'pages' collection
4. Renders using same StaticPageLayout + block renderer
```

## Collection and Global Schema Design

### Collections (Repeating Content)

| Collection | Purpose | Key Fields | Maps To |
|------------|---------|------------|---------|
| **Pages** | All content pages (about, privacy, legal, etc.) | `slug`, `label`, `title`, `description`, `layout` (blocks) | `StaticPageLayout` pages |
| **Programmes** | Training/certification programmes | `title`, `description`, `image`, `category`, `status` | `/programmes` listing |
| **Certifications** | Certification offerings | `title`, `level`, `description`, `category`, `tags` | `/certifications` listing with filtering |
| **RegulatoryUpdates** | News/regulatory items | `title`, `date`, `summary`, `body`, `source` | `/regulatory-updates` listing + Header news scroller |
| **Media** | Uploaded images and files | `filename`, `alt`, `url` (auto-managed by Payload) | Used across all content |
| **Users** | CMS admin accounts | `email`, `password`, `role` | Admin panel access only |

### Globals (Singletons)

| Global | Purpose | Key Fields |
|--------|---------|------------|
| **SiteHeader** | Navigation and news scroller | `navLinks[]`, `newsItems[]` |
| **SiteFooter** | Footer content | `columns[]`, `bottomLinks[]`, `copyright` |
| **Homepage** | Home page section configuration | `hero{}`, `stats[]`, `featuredProgrammes[]`, `ctaBanner{}` |

### Block Types (Reusable Layout Blocks)

| Block | Purpose | Fields | Renders As |
|-------|---------|--------|------------|
| **RichTextBlock** | Free-form rich text content | `content` (Lexical rich text) | Styled prose section |
| **ContentSectionBlock** | Eyebrow + title + description + children | `eyebrow`, `title`, `description`, `content` | Existing `ContentSection` component |
| **CardGridBlock** | Grid of cards | `cards[]{title, description, icon?}`, `columns` | Grid layout (used on about, membership pages) |
| **CTABlock** | Call-to-action banner | `heading`, `body`, `primaryLink`, `secondaryLink`, `style` | CTA sections |
| **StatsBlock** | Statistics counters | `stats[]{label, value, suffix}` | Existing `StatsStrip` component |
| **NumberedListBlock** | Numbered feature list | `items[]{number, title, points[]}` | "What ARIFAC Does" style sections |

## Patterns to Follow

### Pattern: Block Renderer Component

A single `RenderBlocks` component maps Payload block types to React components. This is the central integration point between CMS data and the existing design system.

```tsx
// src/blocks/RenderBlocks.tsx
import { ContentSectionBlock } from './ContentSection'
import { CardGridBlock } from './CardGrid'
import { CTABlock } from './CTA'
// ... etc

const blockComponents = {
  contentSection: ContentSectionBlock,
  cardGrid: CardGridBlock,
  cta: CTABlock,
  richText: RichTextBlock,
  stats: StatsBlock,
  numberedList: NumberedListBlock,
}

export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  return blocks?.map((block, i) => {
    const Component = blockComponents[block.blockType]
    if (!Component) return null
    return <Component key={block.id ?? i} {...block} />
  })
}
```

### Pattern: Payload Config with withPayload Wrapper

The `next.config.ts` must be wrapped with Payload's plugin. This is a one-time change.

```ts
// next.config.ts
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = { /* existing config */ }

export default withPayload(nextConfig)
```

### Pattern: Separate "use client" Interactivity

For pages that need client-side interactivity (like certifications filtering), the Server Component fetches data and passes it to a Client Component child.

```tsx
// Server Component: fetches data
export default async function CertificationsPage() {
  const payload = await getPayload({ config: configPromise })
  const certs = await payload.find({ collection: 'certifications', limit: 100 })
  return <CertificationsClient data={certs.docs} />
}

// Client Component: handles filtering state
'use client'
function CertificationsClient({ data }: { data: Certification[] }) {
  const [filter, setFilter] = useState('all')
  // ... filtering logic, same as current implementation
}
```

## Anti-Patterns to Avoid

### Anti-Pattern: Fetching Payload Data via REST API from Server Components

**What:** Using `fetch('/api/pages')` instead of the Local API from Server Components.
**Why bad:** Adds an unnecessary HTTP round-trip when the code is already running on the same server. The Local API talks directly to the database.
**Instead:** Always use `payload.find()`, `payload.findByID()`, `payload.findGlobal()` in Server Components.

### Anti-Pattern: Keeping "use client" on Data-Fetching Pages

**What:** Leaving the existing `"use client"` directives on page components that now need to fetch CMS data.
**Why bad:** Client Components cannot use the Payload Local API. You would be forced to use REST API calls, losing type safety and adding latency.
**Instead:** Remove `"use client"` from page-level components. Move interactive logic into child Client Components.

### Anti-Pattern: One Monolithic "Page" Collection with Conditional Fields

**What:** Putting programmes, certifications, regulatory updates, and content pages all in a single "Pages" collection with conditional field visibility.
**Why bad:** Makes the admin panel confusing for editors, creates overly complex schemas, and makes querying difficult.
**Instead:** Use separate collections for distinct content types. Use a shared "Pages" collection only for generic content pages that share the same structure.

### Anti-Pattern: Duplicating Layout in Payload Blocks

**What:** Trying to replicate every CSS class and layout detail inside Payload block schemas.
**Why bad:** CMS should store content, not presentation. Layout decisions belong in React components.
**Instead:** Blocks store structured content data. React components handle all visual rendering using the existing Tailwind design system.

## Build Order (Dependencies Between Components)

The integration has a clear dependency chain. Each step depends on the previous.

```
Phase 1: Foundation (no content migration yet)
  ├── 1a. Install Payload packages + PostgreSQL adapter
  ├── 1b. Create payload.config.ts with database connection
  ├── 1c. Restructure /app into route groups: (frontend) + (payload)
  ├── 1d. Add (payload) admin panel files (static, copy from template)
  ├── 1e. Wrap next.config.ts with withPayload()
  └── 1f. Verify: admin panel loads at /admin, existing site works at all routes
      GATE: Both admin panel and existing site render correctly

Phase 2: Schema Design
  ├── 2a. Define Media collection (dependency for all image fields)
  ├── 2b. Define Users collection (dependency for admin access)
  ├── 2c. Define block types in src/blocks/ (dependency for Pages collection)
  ├── 2d. Define Pages collection with layout blocks field
  ├── 2e. Define listing collections (Programmes, Certifications, RegulatoryUpdates)
  ├── 2f. Define globals (SiteHeader, SiteFooter, Homepage)
  └── 2g. Generate TypeScript types (payload generate:types)
      GATE: All schemas visible in admin panel, can create test content

Phase 3: Frontend Integration
  ├── 3a. Build RenderBlocks component (maps block types to React components)
  ├── 3b. Create block renderer components for each block type
  ├── 3c. Convert (frontend)/layout.tsx to Server Component fetching Header/Footer globals
  ├── 3d. Convert one simple page (e.g., privacy) to fetch from CMS -- proof of concept
  ├── 3e. Convert remaining StaticPageLayout pages
  ├── 3f. Convert listing pages (programmes, certifications, regulatory-updates)
  ├── 3g. Convert home page (composite sections from Homepage global)
  └── 3h. Add [slug]/page.tsx dynamic route for future CMS-created pages
      GATE: All pages render identically to current site, but from CMS data

Phase 4: Content Migration
  ├── 4a. Write seed script extracting current hardcoded content into Payload documents
  ├── 4b. Run seed script against database
  ├── 4c. Visual regression testing (before/after comparison)
  └── 4d. Remove old hardcoded page files replaced by dynamic routes
      GATE: Site is visually identical, all content lives in CMS

Phase 5: Deployment
  ├── 5a. Provision PostgreSQL (AWS RDS or Aurora Serverless)
  ├── 5b. Configure environment variables (DATABASE_URI, PAYLOAD_SECRET)
  ├── 5c. Update deployment config (move from static to server-rendered)
  └── 5d. Deploy and verify admin panel + public site in production
```

### Why This Order

1. **Foundation first** because nothing works without the route group restructure and Payload boot.
2. **Schema before frontend** because you cannot fetch data that has no schema.
3. **Media and Users before other collections** because they are referenced by other schemas.
4. **Blocks before Pages** because the Pages collection's `layout` field depends on block definitions.
5. **Frontend integration before content migration** because you need rendering code before you can verify migrated content looks correct.
6. **One page first as proof of concept** before converting all pages, to validate the pattern works.

## Scalability Considerations

| Concern | Current (static) | After CMS (1-2 editors) | Growth scenario |
|---------|-------------------|------------------------|-----------------|
| Content updates | Requires code deploy | Instant via admin panel | Same -- scales to any editor count |
| Build time | Fast (static) | Slightly slower (server rendering) | Add ISR/caching if needed |
| Database | None | Single PostgreSQL instance | RDS auto-scaling or Aurora Serverless |
| Media storage | `public/` folder | Local disk initially | Move to S3 adapter for production |

## Key Compatibility Notes

**Confidence: MEDIUM** (based on multiple web sources, not yet verified against live docs)

- Payload CMS supports Next.js 16 as of Payload version 3.73.0+. The project's Next.js 16.2.3 is compatible.
- Next.js 16 uses Turbopack by default. Payload 3.73.0+ supports Turbopack. Ensure Payload version is at minimum 3.73.0.
- The `withPayload()` wrapper in `next.config.ts` is required and handles bundler configuration automatically.
- All existing `"use client"` page components will need to drop that directive to become Server Components for Local API access. Interactive parts move to child components.

## Sources

- [Payload 3.0 Announcement](https://payloadcms.com/posts/blog/payload-30-the-first-cms-that-installs-directly-into-any-nextjs-app) -- architecture overview
- [Payload Installation Docs](https://payloadcms.com/docs/getting-started/installation) -- setup steps and file structure
- [Ultimate Guide to Next.js with Payload](https://payloadcms.com/posts/blog/the-ultimate-guide-to-using-nextjs-with-payload) -- route groups and Local API patterns
- [Payload Local API Docs](https://payloadcms.com/docs/local-api/overview) -- data fetching patterns
- [Payload Collections Docs](https://payloadcms.com/docs/configuration/collections) -- collection schema design
- [Payload Globals Docs](https://payloadcms.com/docs/configuration/globals) -- singleton content patterns
- [Payload Blocks Field Docs](https://payloadcms.com/docs/fields/blocks) -- flexible layout blocks
- [Flexible Layouts Guide](https://payloadcms.com/posts/guides/how-to-build-flexible-layouts-with-payload-blocks) -- block architecture best practices
- [Payload + Next.js 16 Compatibility](https://www.buildwithmatija.com/blog/payload-cms-nextjs-16-compatibility-breakthrough) -- version compatibility details
- [Payload + Next.js 16 Turbopack Issue](https://github.com/payloadcms/payload/issues/14354) -- resolved in 3.73.0+
