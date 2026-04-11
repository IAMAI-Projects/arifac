# Technology Stack

**Analysis Date:** 2026-04-11

## Languages

**Primary:**
- TypeScript ~5.x - All application code (`src/**/*.ts`, `src/**/*.tsx`)

**Secondary:**
- CSS - Global styles and Tailwind (`src/app/globals.css`)
- JSON - Manifest and configuration (`src/app/manifest.json`, `package.json`, `tsconfig.json`)

## Runtime

**Environment:**
- Node.js (version not pinned; no `.nvmrc` or `.node-version` present)

**Package Manager:**
- pnpm (latest, activated via corepack in `amplify.yml`)
- Lockfile: `pnpm-lock.yaml` present

## Frameworks

**Core:**
- Next.js 16.2.3 - Full-stack React framework (App Router)
- React 19.2.4 - UI library
- React DOM 19.2.4 - DOM rendering

**Testing:**
- None detected - No test framework configured

**Build/Dev:**
- TypeScript ~5.x - Type checking
- ESLint ~9.x - Linting (`eslint.config.mjs`)
- PostCSS with `@tailwindcss/postcss` - CSS processing (`postcss.config.mjs`)

## Key Dependencies

**Critical (runtime):**
- `next` 16.2.3 - Application framework, routing, image optimization, font optimization
- `react` 19.2.4 - Component rendering
- `react-dom` 19.2.4 - DOM rendering

**Styling:**
- `tailwindcss` ^4 - Utility-first CSS framework (v4, using `@import "tailwindcss"` syntax in `src/app/globals.css`)
- `@tailwindcss/postcss` ^4 - PostCSS integration for Tailwind v4

**Dev tooling:**
- `@types/node` ^20 - Node.js type definitions
- `@types/react` ^19 - React type definitions
- `@types/react-dom` ^19 - React DOM type definitions
- `eslint-config-next` 16.2.3 - Next.js ESLint preset (core-web-vitals + typescript)

## Configuration

**TypeScript (`tsconfig.json`):**
- Target: ES2017
- Module resolution: bundler
- Strict mode: enabled
- Path alias: `@/*` maps to `./src/*`
- JSX: react-jsx
- Incremental compilation: enabled
- Next.js plugin active

**ESLint (`eslint.config.mjs`):**
- Uses flat config (ESLint 9)
- Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

**PostCSS (`postcss.config.mjs`):**
- Single plugin: `@tailwindcss/postcss`

**Next.js (`next.config.ts`):**
- Empty configuration (no custom options set)

**Tailwind v4 (configured in `src/app/globals.css`):**
- Uses `@theme inline` directive for custom colors
- Custom colors: `--color-brand`, `--color-brand-light`, `--color-navy`, `--color-navy-dark`
- No separate `tailwind.config.*` file (v4 CSS-first configuration)

**Fonts (via `next/font/google` in `src/app/layout.tsx`):**
- Plus Jakarta Sans (headings) - CSS variable `--font-heading`
- Inter (body text) - CSS variable `--font-body`

**PWA Manifest (`src/app/manifest.json`):**
- App name: ARIFAC
- Display: standalone
- Icons: 192x192 and 512x512 maskable PNGs

## Platform Requirements

**Development:**
- Node.js with corepack support (for pnpm)
- pnpm package manager
- Commands: `pnpm dev` (dev server), `pnpm build` (production build), `pnpm lint` (ESLint)

**Production:**
- AWS Amplify (configured via `amplify.yml`)
- Build output: `.next/` directory
- Caching: `node_modules/` and `.next/cache/`

---

*Stack analysis: 2026-04-11*
