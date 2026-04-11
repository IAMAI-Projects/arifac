# Architecture

## Pattern
Next.js App Router with static/client-side rendering. No server-side data fetching, no API routes, no database. Pure presentational website.

## Layers

### 1. Layout Layer
- `src/app/layout.tsx` — Root layout with font providers (Plus Jakarta Sans + Inter), metadata, and base styling
- No nested layouts

### 2. Page Layer
- **Home page** (`src/app/page.tsx`) — Composed of multiple section components, marked `"use client"`
- **Content pages** (~20 pages in `src/app/*/page.tsx`) — Most use `StaticPageLayout` wrapper component
- **Certifications page** (`src/app/certifications/page.tsx`) — Most complex page with client-side filtering state

### 3. Component Layer
- `src/components/Header.tsx` — Top bar (news scroller) + sticky navigation header
- `src/components/Hero.tsx` — Landing hero section
- `src/components/Footer.tsx` — Site-wide footer
- `src/components/PageBanner.tsx` — Reusable page header banner (navy background)
- `src/components/StaticPageLayout.tsx` — Layout wrapper for content pages (Header + PageBanner + Footer)
- `src/components/CapabilityMatrix.tsx` — 3-column mandate cards
- `src/components/StatsStrip.tsx` — Statistics counter strip
- `src/components/FeaturedPrograms.tsx` — Certification cards with images
- `src/components/RegulatoryDashboard.tsx` — Regulatory updates list
- `src/components/CommunitySection.tsx` — Network/community showcase

### 4. Design Tokens Layer
- `src/design-tokens.ts` — Centralized color palette, typography, spacing, shadows (exported as `tokens` const)
- `src/app/globals.css` — CSS custom properties for brand/navy colors + Tailwind theme inline config

## Data Flow
- **No external data fetching** — All content is hardcoded in component files
- **No state management** — Only local `useState` in certifications page for filtering
- **No API routes** — Pure static site

## Entry Points
- `src/app/layout.tsx` — App entry
- `src/app/page.tsx` — Home page entry
- `src/app/*/page.tsx` — Individual page entries

## Key Abstractions
- `StaticPageLayout` + `ContentSection` — Reusable layout pattern for content pages
- `PageBanner` — Consistent page headers across all inner pages
- Design tokens in `src/design-tokens.ts` — Centralized design system (partially adopted — many components use hardcoded Tailwind classes instead)
