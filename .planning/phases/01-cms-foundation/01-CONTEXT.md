# Phase 1: CMS Foundation - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Payload CMS installed inside the existing Next.js 16 app with a working admin panel at `/admin`, editor authentication (email/password), and PostgreSQL database connected.

</domain>

<decisions>
## Implementation Decisions

### Database
- **D-01:** Use AWS-hosted RDS PostgreSQL for the database (not local Docker or local install)

### Claude's Discretion
- Route group restructure approach (how to organize `src/app/` for Payload + frontend coexistence)
- Rich text editor choice (Lexical is Payload default — use it unless there's a reason not to)
- Admin seeding strategy (Payload's built-in first-user flow is standard)
- Payload version selection (3.73.0+ per STATE.md constraint for Next.js 16 compatibility)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above and in:
- `.planning/REQUIREMENTS.md` — CMS-01, CMS-02, CMS-03, AUTH-01, AUTH-02
- `.planning/PROJECT.md` — Constraints and key decisions
- `.planning/ROADMAP.md` — Phase 1 success criteria

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/layout.tsx` — Root layout with fonts, metadata (must wrap Payload admin too)
- `src/components/` — 10 shared components (Header, Footer, Hero, PageBanner, etc.)
- `src/app/globals.css` — Tailwind v4 theme config with brand colors

### Established Patterns
- App Router with flat page structure (~20 routes directly under `src/app/`)
- No route groups currently — all pages at top level
- `StaticPageLayout` wrapper used by most content pages
- All content hardcoded in components (no data fetching layer)

### Integration Points
- `src/app/layout.tsx` — Root layout needs to accommodate Payload admin route group
- `next.config.ts` — Currently empty, will need Payload's `withPayload()` wrapper
- `package.json` — New dependencies: `payload`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`, etc.

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-cms-foundation*
*Context gathered: 2026-04-11*
