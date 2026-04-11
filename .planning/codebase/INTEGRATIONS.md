# External Integrations

**Analysis Date:** 2026-04-11

## APIs & External Services

**None detected.**

The application is entirely static with no external API calls, fetch requests, or third-party SDK imports. All content (regulatory updates, certification information, member data) is hardcoded directly in page components.

## Data Storage

**Databases:**
- None - No database connection or ORM configured

**File Storage:**
- Local filesystem only - Static images served from `public/` directory

**Caching:**
- Next.js built-in `.next/cache/` only (configured in `amplify.yml`)

## Authentication & Identity

**Auth Provider:**
- None implemented
- Login links exist in the Header (`/login/member`, `/login/learner`) at `src/components/Header.tsx` but route to non-existent pages - these are placeholder navigation items

## Monitoring & Observability

**Error Tracking:**
- None

**Logs:**
- None configured (no logging library or custom logging)

**Analytics:**
- None detected (no Google Analytics, Vercel Analytics, or similar)

## CI/CD & Deployment

**Hosting:**
- AWS Amplify
- Configuration: `amplify.yml`
- Build phases: corepack enable, pnpm install, pnpm build
- Artifacts: `.next/` directory

**CI Pipeline:**
- AWS Amplify built-in (triggered by git push)
- No separate CI configuration (no `.github/workflows/`, no `Jenkinsfile`, etc.)

## Environment Configuration

**Required env vars:**
- None detected - No `.env` files present, no `process.env` references found in source code

**Secrets location:**
- Not applicable - No secrets required for current functionality

## Webhooks & Callbacks

**Incoming:**
- None - No API route handlers (`route.ts`) exist

**Outgoing:**
- None

## External Assets

**Google Fonts (via `next/font`):**
- Plus Jakarta Sans - loaded at build time via `next/font/google` in `src/app/layout.tsx`
- Inter - loaded at build time via `next/font/google` in `src/app/layout.tsx`
- These are self-hosted by Next.js after build (no runtime external requests)

**Static Images (`public/`):**
- `logo.png` - ARIFAC logo
- `fiu-logo.png` - FIU India logo
- `about-hero.png` - About page hero image
- `cert-associate.png`, `cert-professional.png`, `cert-specialist.png` - Certification level images
- `certificate-mockup.png` - Certificate preview
- `hero-expertise.png` - Hero section image
- PWA icons: `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png`
- Next.js/Vercel defaults: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`

## Integration Readiness

The codebase has no external integrations. When adding integrations in the future, consider:

- **CMS/API for content**: All page content is currently hardcoded. A headless CMS or API would be needed for dynamic content (regulatory updates, certifications catalog, member directory).
- **Authentication**: Login routes exist as navigation items but have no implementation. An auth provider (e.g., NextAuth, Clerk, AWS Cognito) would be needed.
- **Form handling**: The contact page (`src/app/contact/page.tsx`) and membership pages exist but have no form submission logic. A backend API or form service would be needed.
- **Analytics**: No analytics tracking is configured.

---

*Integration audit: 2026-04-11*
