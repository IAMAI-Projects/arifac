# Payload CMS Live Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable server-side Live Preview in the Payload admin panel across all frontend pages, with responsive breakpoints and draft support.

**Architecture:** Add `livePreview` config to Payload's `admin` block with a dynamic URL resolver. Enable drafts on all collections/globals. Create a shared `RefreshRouteOnSave` client component and add it (plus `draft: true` fetching) to every frontend page. The existing `NEXT_PUBLIC_SERVER_URL` env var is reused for the server URL.

**Tech Stack:** Payload CMS 3.x, `@payloadcms/live-preview-react`, Next.js App Router, React Server Components

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/components/RefreshRouteOnSave.tsx` | Client component that triggers `router.refresh()` on admin save |
| Modify | `src/payload.config.ts` | Add `livePreview` block with URL resolver, breakpoints, collection/global list |
| Modify | `src/collections/Pages.ts` | Change `drafts: false` to `drafts: true` |
| Modify | `src/collections/RegulatoryUpdates.ts` | Change `drafts: false` to `drafts: true` |
| Modify | `src/collections/Certifications.ts` | Change `drafts: false` to `drafts: true` |
| Modify | `src/collections/NewsItems.ts` | Change `drafts: false` to `drafts: true` |
| Modify | `src/collections/Members.ts` | Add `versions: { drafts: true }` |
| Modify | `src/globals/Programmes.ts` | Change `drafts: false` to `drafts: true` |
| Modify | `src/app/(frontend)/page.tsx` | Add `draft: true` + `RefreshRouteOnSave` |
| Modify | `src/app/(frontend)/[slug]/page.tsx` | Add `draft: true` + `RefreshRouteOnSave` |
| Modify | `src/app/(frontend)/about/page.tsx` | Add `draft: true` + `RefreshRouteOnSave` |
| Modify | `src/app/(frontend)/programmes/page.tsx` | Add `draft: true` + `RefreshRouteOnSave` |
| Modify | `src/app/(frontend)/updates/page.tsx` | Add `draft: true` + `RefreshRouteOnSave` |
| Modify | `src/app/(frontend)/certifications/page.tsx` | Add `draft: true` + `RefreshRouteOnSave` |
| Modify | `src/app/(frontend)/members/page.tsx` | Add `draft: true` + `RefreshRouteOnSave` |
| Modify | `src/app/(frontend)/training-leads/page.tsx` | Add `draft: true` + `RefreshRouteOnSave` |
| Modify | `src/app/(frontend)/sectoral-nodal-officers/page.tsx` | Add `draft: true` + `RefreshRouteOnSave` |

---

### Task 1: Install dependency

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install `@payloadcms/live-preview-react`**

```bash
pnpm add @payloadcms/live-preview-react
```

- [ ] **Step 2: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: add @payloadcms/live-preview-react dependency"
```

---

### Task 2: Enable drafts on all collections and globals

**Files:**
- Modify: `src/collections/Pages.ts:17` — change `drafts: false` to `drafts: true`
- Modify: `src/collections/RegulatoryUpdates.ts:10` — change `drafts: false` to `drafts: true`
- Modify: `src/collections/Certifications.ts:9` — change `drafts: false` to `drafts: true`
- Modify: `src/collections/NewsItems.ts:10` — change `drafts: false` to `drafts: true`
- Modify: `src/collections/Members.ts:8` — add `versions` block after `admin` block
- Modify: `src/globals/Programmes.ts:6` — change `drafts: false` to `drafts: true`

- [ ] **Step 1: Enable drafts in Pages**

In `src/collections/Pages.ts`, change line 17:

```ts
// Before:
  drafts: false,
// After:
  drafts: true,
```

- [ ] **Step 2: Enable drafts in RegulatoryUpdates**

In `src/collections/RegulatoryUpdates.ts`, change line 10:

```ts
// Before:
  drafts: false,
// After:
  drafts: true,
```

- [ ] **Step 3: Enable drafts in Certifications**

In `src/collections/Certifications.ts`, change line 9:

```ts
// Before:
  drafts: false,
// After:
  drafts: true,
```

- [ ] **Step 4: Enable drafts in NewsItems**

In `src/collections/NewsItems.ts`, change line 10:

```ts
// Before:
  drafts: false,
// After:
  drafts: true,
```

- [ ] **Step 5: Add versions with drafts to Members**

In `src/collections/Members.ts`, add after the `admin` block (after line 8):

```ts
  versions: {
    drafts: true,
  },
```

- [ ] **Step 6: Enable drafts in Programmes global**

In `src/globals/Programmes.ts`, change line 6:

```ts
// Before:
  drafts: false,
// After:
  drafts: true,
```

- [ ] **Step 7: Verify build**

```bash
pnpm build
```

Expected: Build succeeds. Payload will add `_status` field to all draft-enabled collections.

- [ ] **Step 8: Commit**

```bash
git add src/collections/ src/globals/
git commit -m "feat: enable drafts on all collections and globals"
```

---

### Task 3: Add livePreview config to payload.config.ts

**Files:**
- Modify: `src/payload.config.ts:29-35` — add `livePreview` inside the `admin` block

- [ ] **Step 1: Add livePreview config**

In `src/payload.config.ts`, replace the `admin` block (lines 29-35) with:

```ts
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname, '..'),
      importMapFile: path.resolve(dirname, 'app/(payload)/admin/importMap.js'),
    },
    livePreview: {
      url: ({ data, collectionConfig, globalConfig }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

        if (globalConfig) {
          if (globalConfig.slug === 'programmes') return `${baseUrl}/programmes`
        }

        if (collectionConfig) {
          if (collectionConfig.slug === 'pages') {
            const slug = data?.slug
            return slug === 'home' ? baseUrl : `${baseUrl}/${slug}`
          }
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

- [ ] **Step 2: Verify build**

```bash
pnpm build
```

Expected: Build succeeds. The admin panel now shows a "Live Preview" button when editing pages, certifications, regulatory updates, news items, members, or programmes.

- [ ] **Step 3: Commit**

```bash
git add src/payload.config.ts
git commit -m "feat: add Live Preview config with URL resolver and breakpoints"
```

---

### Task 4: Create RefreshRouteOnSave component

**Files:**
- Create: `src/components/RefreshRouteOnSave.tsx`

- [ ] **Step 1: Create the component**

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

- [ ] **Step 2: Verify build**

```bash
pnpm build
```

Expected: Build succeeds. Component compiles without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/RefreshRouteOnSave.tsx
git commit -m "feat: add RefreshRouteOnSave client component for Live Preview"
```

---

### Task 5: Add Live Preview to Home page

**Files:**
- Modify: `src/app/(frontend)/page.tsx`

- [ ] **Step 1: Add import**

Add at line 4 (after the BlockRenderer import):

```tsx
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
```

- [ ] **Step 2: Add `draft: true` to both payload.find calls**

Change line 10-13:

```tsx
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    draft: true,
  })
```

Change line 19-23:

```tsx
  const updatesResult = await payload.find({
    collection: 'regulatory-updates',
    sort: '-date',
    limit: 3,
    draft: true,
  })
```

- [ ] **Step 3: Add RefreshRouteOnSave to JSX**

Change line 26 (`return (`) to wrap with RefreshRouteOnSave:

```tsx
  return (
    <>
      <RefreshRouteOnSave />
      {page.layout && page.layout.length > 0 && (
        <BlockRenderer
          blocks={page.layout.filter(block => block.blockType !== 'featuredPrograms')}
          regulatoryUpdates={updatesResult.docs}
        />
      )}
    </>
  )
```

- [ ] **Step 4: Commit**

```bash
git add src/app/\(frontend\)/page.tsx
git commit -m "feat: add Live Preview support to Home page"
```

---

### Task 6: Add Live Preview to dynamic [slug] page

**Files:**
- Modify: `src/app/(frontend)/[slug]/page.tsx`

- [ ] **Step 1: Add import**

Add after line 5 (after the SerializedEditorState import):

```tsx
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
```

- [ ] **Step 2: Add `draft: true` to the `generateStaticParams` fetch**

Change lines 10-15:

```tsx
  const result = await payload.find({
    collection: 'pages',
    where: { pageType: { not_equals: 'home' } },
    limit: 100,
    select: { slug: true },
    draft: true,
  })
```

- [ ] **Step 3: Add `draft: true` to the page fetch**

Change lines 23-27:

```tsx
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    draft: true,
  })
```

- [ ] **Step 4: Add RefreshRouteOnSave to JSX**

Change the return (lines 33-48) to:

```tsx
  return (
    <StaticPageLayout
      label={page.banner?.label || ''}
      title={page.banner?.title || page.title}
      description={page.banner?.description || ''}
    >
      <RefreshRouteOnSave />
      {page.body && (
        <section className="py-10 lg:py-14">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="max-w-3xl prose prose-neutral">
              <RichText data={page.body as unknown as SerializedEditorState} />
            </div>
          </div>
        </section>
      )}
    </StaticPageLayout>
  )
```

- [ ] **Step 5: Commit**

```bash
git add src/app/\(frontend\)/\[slug\]/page.tsx
git commit -m "feat: add Live Preview support to dynamic [slug] pages"
```

---

### Task 7: Add Live Preview to About page

**Files:**
- Modify: `src/app/(frontend)/about/page.tsx`

- [ ] **Step 1: Add import**

Add after line 6 (after the Link import):

```tsx
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
```

- [ ] **Step 2: Add `draft: true` to the fetch**

Change lines 10-14:

```tsx
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
    draft: true,
  })
```

- [ ] **Step 3: Add RefreshRouteOnSave to JSX**

Add `<RefreshRouteOnSave />` as the first child inside the top-level `<>` fragment, right after line 23 (`return (`):

```tsx
  return (
    <>
      <RefreshRouteOnSave />
      <PageBanner
```

- [ ] **Step 4: Commit**

```bash
git add src/app/\(frontend\)/about/page.tsx
git commit -m "feat: add Live Preview support to About page"
```

---

### Task 8: Add Live Preview to Programmes page

**Files:**
- Modify: `src/app/(frontend)/programmes/page.tsx`

- [ ] **Step 1: Add import**

Add after line 3 (after the PageBanner import):

```tsx
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
```

- [ ] **Step 2: Add `draft: true` to the findGlobal call**

Change line 7:

```tsx
  const programmes = await payload.findGlobal({ slug: 'programmes', draft: true })
```

- [ ] **Step 3: Add RefreshRouteOnSave to JSX**

Add `<RefreshRouteOnSave />` as the first child inside the top-level `<>` fragment, right after line 14 (`return (`):

```tsx
  return (
    <>
      <RefreshRouteOnSave />
      <PageBanner
```

- [ ] **Step 4: Commit**

```bash
git add src/app/\(frontend\)/programmes/page.tsx
git commit -m "feat: add Live Preview support to Programmes page"
```

---

### Task 9: Add Live Preview to Updates page

**Files:**
- Modify: `src/app/(frontend)/updates/page.tsx`

- [ ] **Step 1: Add import**

Add after line 4 (after the UpdatesFilter import):

```tsx
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
```

- [ ] **Step 2: Add `draft: true` to the fetch**

Change lines 8-12:

```tsx
  const { docs: updates } = await payload.find({
    collection: 'regulatory-updates',
    sort: '-date',
    limit: 100,
    draft: true,
  })
```

- [ ] **Step 3: Add RefreshRouteOnSave to JSX**

Add `<RefreshRouteOnSave />` as the first child inside the top-level `<>` fragment, right after line 15 (`return (`):

```tsx
  return (
    <>
      <RefreshRouteOnSave />
      <PageBanner
```

- [ ] **Step 4: Commit**

```bash
git add src/app/\(frontend\)/updates/page.tsx
git commit -m "feat: add Live Preview support to Updates page"
```

---

### Task 10: Add Live Preview to Certifications page

**Files:**
- Modify: `src/app/(frontend)/certifications/page.tsx`

- [ ] **Step 1: Add import**

Add after line 4 (after the CertificationsFilter import):

```tsx
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
```

- [ ] **Step 2: Add `draft: true` to the fetch**

Change lines 8-12:

```tsx
  const { docs: certifications } = await payload.find({
    collection: 'certifications',
    limit: 100,
    sort: 'title',
    draft: true,
  })
```

- [ ] **Step 3: Add RefreshRouteOnSave to JSX**

Add `<RefreshRouteOnSave />` as the first child inside the top-level `<>` fragment, right after line 14 (`return (`):

```tsx
  return (
    <>
      <RefreshRouteOnSave />
      <PageBanner
```

- [ ] **Step 4: Commit**

```bash
git add src/app/\(frontend\)/certifications/page.tsx
git commit -m "feat: add Live Preview support to Certifications page"
```

---

### Task 11: Add Live Preview to Members page

**Files:**
- Modify: `src/app/(frontend)/members/page.tsx`

- [ ] **Step 1: Add import**

Add after line 3 (after the StaticPageLayout import):

```tsx
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
```

- [ ] **Step 2: Add `draft: true` to both fetch calls**

Change lines 8-11. The `Promise.all` calls need `draft: true`:

```tsx
  const [pageResult, membersResult] = await Promise.all([
    payload.find({ collection: 'pages', where: { slug: { equals: 'members' } }, limit: 1, draft: true }),
    payload.find({ collection: 'members', limit: 500, sort: 'name', draft: true }),
  ])
```

- [ ] **Step 3: Add RefreshRouteOnSave to JSX**

Add `<RefreshRouteOnSave />` as the first child inside `<StaticPageLayout>`, before the `<section>` (after line 21):

```tsx
    <StaticPageLayout
      label={page?.banner?.label || 'Our Members'}
      title={page?.banner?.title || `Our Members — ${members.length} leading organisations in the ecosystem.`}
      description={page?.banner?.description || ''}
    >
      <RefreshRouteOnSave />
      <section className="py-10 lg:py-14">
```

- [ ] **Step 4: Commit**

```bash
git add src/app/\(frontend\)/members/page.tsx
git commit -m "feat: add Live Preview support to Members page"
```

---

### Task 12: Add Live Preview to Training Leads page

**Files:**
- Modify: `src/app/(frontend)/training-leads/page.tsx`

- [ ] **Step 1: Add import**

Add after line 3 (after the StaticPageLayout import):

```tsx
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
```

- [ ] **Step 2: Add `draft: true` to the fetch**

Change lines 111-115:

```tsx
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'training-leads' } },
    limit: 1,
    draft: true,
  })
```

- [ ] **Step 3: Add RefreshRouteOnSave to JSX**

Add `<RefreshRouteOnSave />` as the first child inside `<StaticPageLayout>`, before the `<section>` (after line 123):

```tsx
    <StaticPageLayout
      label={page?.banner?.label || 'Training Leads'}
      title={page?.banner?.title || 'Training Leads'}
      description={page?.banner?.description || 'Leading experts driving excellence in professional certification across the ARIFAC ecosystem.'}
    >
      <RefreshRouteOnSave />
      <section className="py-10 lg:py-14">
```

- [ ] **Step 4: Commit**

```bash
git add src/app/\(frontend\)/training-leads/page.tsx
git commit -m "feat: add Live Preview support to Training Leads page"
```

---

### Task 13: Add Live Preview to Sectoral Nodal Officers page

**Files:**
- Modify: `src/app/(frontend)/sectoral-nodal-officers/page.tsx`

- [ ] **Step 1: Add import**

Add after line 3 (after the StaticPageLayout import):

```tsx
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
```

- [ ] **Step 2: Add `draft: true` to the fetch**

Change lines 115-119:

```tsx
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'sectoral-nodal-officers' } },
    limit: 1,
    draft: true,
  })
```

- [ ] **Step 3: Add RefreshRouteOnSave to JSX**

Add `<RefreshRouteOnSave />` as the first child inside `<StaticPageLayout>`, before the `<section>` (after line 129):

```tsx
    <StaticPageLayout
      label={page?.banner?.label || 'Ecosystem Leadership'}
      title={page?.banner?.title || 'Sectoral Nodal Officers'}
      description={page?.banner?.description || 'Facilitating coordination and mission delivery across the ARIFAC network through representation from major financial sectors.'}
    >
      <RefreshRouteOnSave />
      <section className="py-10 lg:py-14">
```

- [ ] **Step 4: Commit**

```bash
git add src/app/\(frontend\)/sectoral-nodal-officers/page.tsx
git commit -m "feat: add Live Preview support to Sectoral Nodal Officers page"
```

---

### Task 14: Final build verification

- [ ] **Step 1: Run full build**

```bash
pnpm build
```

Expected: Build succeeds with no errors. All pages compile.

- [ ] **Step 2: Manual verification checklist**

Start the dev server (`pnpm dev`) and verify:

1. Navigate to `/admin` — log in
2. Edit a Page (e.g., Home) — the "Live Preview" button should appear in the admin UI
3. Click Live Preview — an iframe should show the frontend page
4. Use the breakpoint toggles — Mobile/Tablet/Desktop viewport sizes should change the iframe
5. Edit a field and save — the iframe should refresh and show the updated content
6. Repeat for one collection item (e.g., a Regulatory Update) and the Programmes global
