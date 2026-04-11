@AGENTS.md

<!-- GSD:project-start source:PROJECT.md -->
## Project

**ARIFAC Website — CMS Integration**

The ARIFAC website is a regulatory compliance organization's web presence, currently built as a static Next.js site with ~20 pages of hardcoded content. This project adds Payload CMS so non-technical editors can manage all page content through an admin panel with username/password login, without touching code.

**Core Value:** Non-technical editors can log in and update any page's content through a visual admin panel — no developer involvement needed for routine content changes.

### Constraints

- **Tech stack**: Must integrate with existing Next.js 16 / React 19 / Tailwind 4 stack — Payload CMS runs natively in Next.js
- **Hosting**: Must deploy on AWS — need PostgreSQL database (RDS or similar) alongside containerized app
- **Auth**: Editors must log in with email/password (no GitHub/OAuth dependency)
- **Content continuity**: All existing page content must be preserved during migration to CMS
- **Design continuity**: Visual design must remain identical after CMS integration — same components, same styling
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript ~5.x - All application code (`src/**/*.ts`, `src/**/*.tsx`)
- CSS - Global styles and Tailwind (`src/app/globals.css`)
- JSON - Manifest and configuration (`src/app/manifest.json`, `package.json`, `tsconfig.json`)
## Runtime
- Node.js (version not pinned; no `.nvmrc` or `.node-version` present)
- pnpm (latest, activated via corepack in `amplify.yml`)
- Lockfile: `pnpm-lock.yaml` present
## Frameworks
- Next.js 16.2.3 - Full-stack React framework (App Router)
- React 19.2.4 - UI library
- React DOM 19.2.4 - DOM rendering
- None detected - No test framework configured
- TypeScript ~5.x - Type checking
- ESLint ~9.x - Linting (`eslint.config.mjs`)
- PostCSS with `@tailwindcss/postcss` - CSS processing (`postcss.config.mjs`)
## Key Dependencies
- `next` 16.2.3 - Application framework, routing, image optimization, font optimization
- `react` 19.2.4 - Component rendering
- `react-dom` 19.2.4 - DOM rendering
- `tailwindcss` ^4 - Utility-first CSS framework (v4, using `@import "tailwindcss"` syntax in `src/app/globals.css`)
- `@tailwindcss/postcss` ^4 - PostCSS integration for Tailwind v4
- `@types/node` ^20 - Node.js type definitions
- `@types/react` ^19 - React type definitions
- `@types/react-dom` ^19 - React DOM type definitions
- `eslint-config-next` 16.2.3 - Next.js ESLint preset (core-web-vitals + typescript)
## Configuration
- Target: ES2017
- Module resolution: bundler
- Strict mode: enabled
- Path alias: `@/*` maps to `./src/*`
- JSX: react-jsx
- Incremental compilation: enabled
- Next.js plugin active
- Uses flat config (ESLint 9)
- Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`
- Single plugin: `@tailwindcss/postcss`
- Empty configuration (no custom options set)
- Uses `@theme inline` directive for custom colors
- Custom colors: `--color-brand`, `--color-brand-light`, `--color-navy`, `--color-navy-dark`
- No separate `tailwind.config.*` file (v4 CSS-first configuration)
- Plus Jakarta Sans (headings) - CSS variable `--font-heading`
- Inter (body text) - CSS variable `--font-body`
- App name: ARIFAC
- Display: standalone
- Icons: 192x192 and 512x512 maskable PNGs
## Platform Requirements
- Node.js with corepack support (for pnpm)
- pnpm package manager
- Commands: `pnpm dev` (dev server), `pnpm build` (production build), `pnpm lint` (ESLint)
- AWS Amplify (configured via `amplify.yml`)
- Build output: `.next/` directory
- Caching: `node_modules/` and `.next/cache/`
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Code Style
### Component Pattern
- Default exports for all components and pages
- No prop destructuring in function signature for simple components
- Interface definitions above component for typed props (`PageBannerProps`, `StaticPageLayoutProps`)
- Data arrays defined as constants outside component body (e.g., `programs`, `updates`, `certifications`)
### Styling Approach
- **Primary**: Tailwind CSS v4 utility classes applied inline
- **Custom CSS**: `src/app/globals.css` for reusable patterns (`editorial-card`, `bg-grid-subtle`, `glass`, `animate-in`)
- **CSS Variables**: Theme colors defined via `@theme inline` block in globals.css
- **Design Tokens**: `src/design-tokens.ts` exports a comprehensive token system, but components mostly use Tailwind classes directly rather than referencing tokens
- **No CSS Modules or styled-components**
### Color Usage Pattern
### Typography Pattern
- Font sizes specified as pixel values in brackets: `text-[13px]`, `text-[11px]`, `text-[16px]`
- Font weights via Tailwind: `font-bold`, `font-extrabold`, `font-black`
- Uppercase tracking-widest labels: `text-[11px] font-bold text-brand tracking-widest uppercase`
- Two font families: Plus Jakarta Sans (headings), Inter (body)
### Layout Pattern
- Max-width container: `max-w-[1240px] mx-auto px-6`
- Grid-based layouts: `grid md:grid-cols-3`, `grid lg:grid-cols-12`
- Section padding: `py-12 lg:py-16` or `py-16 md:py-24`
## Import Organization
## Error Handling
- No error boundaries implemented
- No loading states
- No error pages (`error.tsx`, `not-found.tsx`)
## Border Radius
- Global override in `globals.css`: `border-radius: 0 !important` on all elements
- Design is intentionally sharp/angular with no rounded corners
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern
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
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

| Skill | Description | Path |
|-------|-------------|------|
| frontend-design | Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics. | `.agents/skills/frontend-design/SKILL.md` |
| web-design-guidelines | Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices". | `.agents/skills/web-design-guidelines/SKILL.md` |
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
