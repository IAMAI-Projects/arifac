# Concerns

## Color System Fragmentation (Medium Priority)
- `src/design-tokens.ts` defines a comprehensive color palette with 5 color scales (primary, brand, accent, gold, neutral) + semantic colors
- `src/app/globals.css` defines a separate set of CSS custom properties via `@theme inline` (only `brand`, `brand-light`, `navy`, `navy-dark`)
- Components predominantly use Tailwind's built-in `slate-*` palette and the 4 custom theme colors, largely ignoring the design tokens file
- The `accent` (teal), `gold`, and full `primary` scales from design-tokens.ts are **not used anywhere** in actual components
- **Impact**: Changing the color scheme requires touching every component individually rather than updating a single source of truth

## Hardcoded Content (Low Priority)
- All page content, stats, certification data, regulatory updates are hardcoded in component files
- No CMS, no JSON data files, no external data sources
- Acceptable for current scope but limits content management

## Missing `"use client"` Directives
- `src/components/Header.tsx` — Uses no client features but is imported by client pages
- Most inner pages using `StaticPageLayout` don't have `"use client"` but some like `about/page.tsx` and `certifications/page.tsx` do
- Inconsistent server/client boundary

## No Error Handling Infrastructure
- No `error.tsx` or `not-found.tsx` pages
- No error boundaries
- No loading states

## Accessibility Gaps
- Navigation dropdown relies on CSS `:hover` only — not keyboard accessible
- News ticker marquee has no pause mechanism
- No skip-to-content links
- No ARIA labels on interactive elements

## SEO
- Root layout has metadata but individual pages don't export their own `metadata` objects
- No `robots.txt` or `sitemap.xml` generation

## Performance
- Home page marked `"use client"` unnecessarily — could be a Server Component since most sections have no interactivity
- No `next/image` optimization on some pages (images loaded as static assets)
- Marquee animation runs continuously with no `prefers-reduced-motion` respect
