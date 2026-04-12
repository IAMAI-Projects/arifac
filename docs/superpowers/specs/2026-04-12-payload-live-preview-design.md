# Payload CMS Live Preview

**Date:** 2026-04-12
**Status:** Approved
**Approach:** Server-Side Live Preview (RefreshRouteOnSave)

## Summary

Enable Payload CMS Live Preview across all frontend pages so editors can see a real-time preview of their content in a side-by-side iframe within the admin panel. Preview updates on save (not keystroke-by-keystroke). Responsive breakpoints allow editors to preview at mobile, tablet, and desktop sizes.

This is phase 1. Phase 2 (future) will add inline/visual editing (click-to-edit on the preview).

## Decisions

- **Server-side approach** over client-side `useLivePreview` hook — avoids rewriting Server Components to client components, simpler maintenance, same rendering path as production.
- **Drafts enabled on all collections and globals** — required for editors to preview unpublished changes without affecting the live site.
- **Always pass `draft: true` in fetches** — for published content with no pending draft this returns the same data; avoids conditional logic.
- **Responsive breakpoints** — Mobile (375x667), Tablet (768x1024), Desktop (1440x900).

## New Dependency

- `@payloadcms/live-preview-react` — provides `RefreshRouteOnSave` component (and `useLivePreview` hook for future phase 2).

## Environment Variable

- `NEXT_PUBLIC_SERVER_URL` — already exists in `.env.example`. Reused for the Live Preview server URL (no new env var needed).

## Changes

### 1. Payload Config (`src/payload.config.ts`)

Add `livePreview` to the `admin` block:

```ts
admin: {
  // ...existing config
  livePreview: {
    url: ({ data, collectionConfig, globalConfig }) => {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

      // Globals
      if (globalConfig) {
        if (globalConfig.slug === 'programmes') return `${baseUrl}/programmes`
      }

      // Collections
      if (collectionConfig) {
        if (collectionConfig.slug === 'pages') {
          const slug = data?.slug
          return slug === 'home' ? baseUrl : `${baseUrl}/${slug}`
        }
        // Listing pages for other collections
        if (collectionConfig.slug === 'regulatory-updates') return `${baseUrl}/updates`
        if (collectionConfig.slug === 'certifications') return `${baseUrl}/certifications`
        if (collectionConfig.slug === 'news-items') return `${baseUrl}`
        if (collectionConfig.slug === 'members') return `${baseUrl}/members`
      }

      return baseUrl
    },
    collections: ['pages', 'regulatory-updates', 'certifications', 'news-items', 'members'],
    globals: ['programmes'],
    breakpoints: [
      { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
      { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
      { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
    ],
  },
},
```

### 2. Enable Drafts

Update `versions` config on all collections and the Programmes global:

| Collection/Global | Current | Change to |
|---|---|---|
| `Pages` | `versions: { drafts: false, maxPerDoc: 20 }` | `versions: { drafts: true, maxPerDoc: 20 }` |
| `RegulatoryUpdates` | `versions: { drafts: false, maxPerDoc: 20 }` | `versions: { drafts: true, maxPerDoc: 20 }` |
| `Certifications` | `versions: { drafts: false, maxPerDoc: 20 }` | `versions: { drafts: true, maxPerDoc: 20 }` |
| `NewsItems` | `versions: { drafts: false, maxPerDoc: 20 }` | `versions: { drafts: true, maxPerDoc: 20 }` |
| `Members` | no versions config | `versions: { drafts: true }` |
| `Programmes` (global) | `versions: { drafts: false, max: 20 }` | `versions: { drafts: true, max: 20 }` |

### 3. New Component: `RefreshRouteOnSave`

Create `src/components/RefreshRouteOnSave.tsx`:

```tsx
'use client'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation.js'
import React from 'react'

export const RefreshRouteOnSave: React.FC = () => {
  const router = useRouter()
  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL || ''}
    />
  )
}
```

### 4. Frontend Page Modifications

Every frontend page needs two changes:

1. Import and render `<RefreshRouteOnSave />` in the JSX
2. Add `draft: true` to all `payload.find()` / `payload.findGlobal()` calls

**Pages to modify:**

- `src/app/(frontend)/page.tsx` — Home page
- `src/app/(frontend)/[slug]/page.tsx` — Dynamic pages (simple, about, contact)
- `src/app/(frontend)/programmes/page.tsx` — Programmes listing
- `src/app/(frontend)/updates/page.tsx` — Regulatory updates listing
- `src/app/(frontend)/certifications/page.tsx` — Certifications listing
- `src/app/(frontend)/members/page.tsx` — Members listing
- `src/app/(frontend)/about/page.tsx` — About page
- `src/app/(frontend)/training-leads/page.tsx` — Training leads
- `src/app/(frontend)/sectoral-nodal-officers/page.tsx` — Sectoral nodal officers

**Pattern for each page:**

```tsx
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

export default async function SomePage() {
  const result = await payload.find({
    collection: 'some-collection',
    draft: true, // <-- add this
    // ...existing params
  })

  return (
    <>
      <RefreshRouteOnSave /> {/* <-- add this */}
      {/* ...existing JSX */}
    </>
  )
}
```

## Out of Scope

- Inline/visual editing (click-to-edit) — phase 2
- Preview authentication/token gating
- Preview API route (`/api/preview`)
- Changes to existing component rendering logic
