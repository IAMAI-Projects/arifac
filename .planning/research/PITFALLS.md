# Domain Pitfalls

**Domain:** Payload CMS integration into existing Next.js static site
**Researched:** 2026-04-11

## Critical Pitfalls

Mistakes that cause rewrites, deployment failures, or data loss.

### Pitfall 1: AWS Amplify Does Not Support Next.js 16

**What goes wrong:** The project runs Next.js 16.2.3. AWS Amplify officially supports Next.js versions 12 through 15 only. The `@aws-amplify/adapter-nextjs` peer dependency restricts to `<16.0.0`. Deploying the current stack on Amplify will fail or produce undefined SSR behavior.

**Why it happens:** Amplify's Next.js 16 support depends on the new stable Adapter API (shipped in Next.js 16.2) and OpenNext adapters, which are still under development. The OpenNext team targets end-of-2026 for all three cloud adapters (AWS, Cloudflare, Netlify).

**Consequences:** SSR features required by Payload CMS (admin panel, API routes, server actions) will not work on Amplify. The project currently deploys to Amplify as a static site (the `amplify.yml` config confirms this), but Payload requires a persistent Node.js server runtime.

**Prevention:**
- **Option A (Recommended):** Migrate from AWS Amplify to a container-based AWS deployment: ECS Fargate, App Runner, or EC2 with Docker. Payload's self-hosted guide recommends this approach. The project stays on AWS as required.
- **Option B:** Downgrade to Next.js 15.4.x (the last supported version by both Payload and Amplify). This sacrifices Next.js 16 features and Turbopack performance gains.
- **Option C:** Wait for OpenNext adapter support, but the timeline is uncertain and likely late 2026.

**Detection:** Build/deploy failures on Amplify; admin panel 500 errors; SSR routes returning static 404s.

**Phase:** Must be resolved in Phase 1 (infrastructure setup), before any Payload integration begins.

**Confidence:** HIGH -- confirmed via [AWS Amplify docs](https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html) and [GitHub issue #14600](https://github.com/aws-amplify/amplify-js/issues/14600).

---

### Pitfall 2: Payload Version / Next.js 16 Compatibility Window

**What goes wrong:** Not all Payload versions work with Next.js 16. Versions before 3.73.0 have Turbopack HMR bugs that crash the admin panel. Next.js versions 15.5 through 16.1.x are explicitly unsupported by Payload and will never be.

**Why it happens:** A critical Turbopack HMR bug ("Could not find the module X in the React Client Manifest") blocked compatibility. The fix required coordinated changes in both Next.js and Payload.

**Consequences:** Admin panel crashes during development, broken hot module replacement, mysterious "module not found" errors.

**Prevention:**
- Pin Payload to 3.73.0+ (check latest stable at integration time).
- Pin Next.js to 16.2.2+ (the minimum version Payload requires for Next.js 16 support).
- The current project uses 16.2.3, which is compatible.
- Ensure ALL `@payloadcms/*` packages are on the exact same version. Use `pnpm` (already in use) which handles deduplication better than npm.

**Detection:** "Could not find the module" errors; admin panel white screen; HMR failures during development.

**Phase:** Phase 1 (dependency setup). Create a lockfile verification step.

**Confidence:** HIGH -- confirmed via [Payload releases](https://github.com/payloadcms/payload/releases) and [compatibility guide](https://www.buildwithmatija.com/blog/payload-cms-nextjs-16-compatibility-breakthrough).

---

### Pitfall 3: Mixing `db push` and Migrations Corrupts Production Database State

**What goes wrong:** During development, Payload auto-pushes schema changes to the database (convenient). When you later switch to proper migrations for production, the dev database and prod database end up in different states. Migrations fail because the schema was never tracked via migration files.

**Why it happens:** `db push` modifies the database directly without creating migration records. If `NODE_ENV` is not set during the first build, Payload defaults to push mode. Later adding migrations creates a mismatch between what the database looks like and what migration history says.

**Consequences:** Production deploy fails with migration errors. Rolling back requires manual database surgery. Schema drift between environments.

**Prevention:**
- Set `push: false` in the Postgres adapter config from day one, even in development.
- Run `payload migrate:create` locally after every schema change.
- Commit migration files to git (never `.gitignore` the migrations folder).
- Run `payload migrate` as a build step, before the application starts.
- Use the same migration workflow across local, staging, and production.

**Detection:** "Migration failed" errors in CI/CD; tables existing in database that migration history doesn't know about.

**Phase:** Phase 1 (database setup). Establish migration discipline before creating any collections.

**Confidence:** HIGH -- confirmed via [Payload migration docs](https://payloadcms.com/docs/database/migrations) and [production migration guide](https://www.buildwithmatija.com/blog/payloadcms-postgres-push-to-migrations).

---

### Pitfall 4: Content Migration Data Loss -- Hardcoded Content Not Fully Captured

**What goes wrong:** The project has ~20 pages of hardcoded content in React components. When migrating to CMS, content is manually re-entered into the admin panel or scripted via seed files. Subtle content gets missed: specific CSS classes driving visual behavior, conditional rendering logic embedded in JSX, image alt text, link targets, etc.

**Why it happens:** Content in React components is interleaved with presentation logic. A "simple" paragraph might have inline styles, conditional classes, or fragment-level formatting that doesn't map cleanly to CMS fields. Developers focus on text content and miss structural content.

**Consequences:** Pages look different after migration. Missing content discovered weeks later. Editors can't reproduce formatting that was baked into components.

**Prevention:**
- Create a content audit spreadsheet before writing any CMS code. For each page, catalog every piece of dynamic content: text, images, links, stats, lists, conditional sections.
- Write seed scripts using Payload's Local API that programmatically populate the database from extracted content. Do not manually re-enter content through the admin panel.
- Side-by-side visual regression testing: screenshot every page before and after migration, diff them.
- Keep hardcoded components as fallbacks during transition (render CMS content if available, fall back to static).

**Detection:** Visual differences between old and new pages; content audit checklist items unchecked; editors reporting missing content.

**Phase:** Phase 2-3 (content modeling and migration). The content audit happens before modeling; migration scripts happen after.

**Confidence:** MEDIUM -- based on general migration patterns and the specific codebase structure observed (StaticPageLayout wrapper, hardcoded stats, filtering logic).

---

### Pitfall 5: Root Layout Conflict When Adding Payload Admin Routes

**What goes wrong:** Payload's admin panel needs its own layout (no site header/footer). The existing `src/app/layout.tsx` wraps all routes with the site's fonts, body classes, and potentially Header/Footer. Adding Payload's `(payload)` route group causes layout collisions.

**Why it happens:** Next.js App Router uses the root `layout.tsx` for all routes unless route groups have their own layouts. Payload's admin panel at `/admin` inherits the site's root layout, getting the site's fonts, body styles, and potentially Header/Footer components injected around the admin UI.

**Consequences:** Admin panel renders with site styling artifacts. Broken admin UI. Font conflicts. Double body tags.

**Prevention:**
- Restructure the app directory using route groups immediately:
  - `src/app/(frontend)/` -- all existing site pages, with its own `layout.tsx` containing Header/Footer
  - `src/app/(payload)/` -- Payload admin routes, copied from Payload's blank template
  - `src/app/layout.tsx` -- minimal root layout (html/body tags, fonts only, no Header/Footer)
- Move the existing root layout content (Header, Footer, navigation) into `(frontend)/layout.tsx`.
- Copy Payload's admin route structure from the official blank template or `create-payload-app`.

**Detection:** Admin panel at `/admin` shows site header/footer/nav; admin styles look broken; console errors about hydration mismatches in admin.

**Phase:** Phase 1 (project restructuring). This must happen before any Payload routes are added.

**Confidence:** HIGH -- this is the documented approach in [Payload's installation docs](https://payloadcms.com/docs/getting-started/installation) and [community guidance](https://payloadcms.com/community-help/discord/adding-payload-to-an-existing-project).

---

## Moderate Pitfalls

### Pitfall 6: `withPayload` Plugin Breaks Turbopack Default in Next.js 16

**What goes wrong:** The `withPayload` Next.js config wrapper historically injected a `webpack()` hook unconditionally. Next.js 16 defaults to Turbopack. If the Payload version is not recent enough, `withPayload` forces webpack mode or crashes Turbopack.

**Prevention:**
- Use Payload 3.73.0+ which includes the Turbopack-compatible `withPayload` fix (PR #14475).
- If dev server fails with webpack-related errors after adding `withPayload`, check that the Payload version includes the Turbopack fix.
- The `next.config.ts` (TypeScript config) is ESM-compatible, which is required by Payload.

**Detection:** Dev server crash on `pnpm dev`; errors mentioning webpack config in Turbopack mode.

**Phase:** Phase 1 (Payload installation).

**Confidence:** HIGH -- [confirmed via GitHub issue #14354](https://github.com/payloadcms/payload/issues/14354).

---

### Pitfall 7: Media Uploads Fail Without S3 Storage Adapter

**What goes wrong:** By default, Payload stores uploaded files to the local filesystem. In containerized or serverless deployments, the filesystem is ephemeral. Uploaded media disappears after redeployment or container restart.

**Prevention:**
- Install `@payloadcms/storage-s3` and configure it from the start, not as an afterthought.
- Create a dedicated S3 bucket for media with appropriate IAM permissions (PutObject, GetObject, DeleteObject only).
- Configure CORS on the S3 bucket to allow PUT from your domain.
- Set `disableLocalStorage: true` on the Media collection (the S3 adapter does this automatically).

**Detection:** Images missing after redeployment; 404s on previously uploaded media; upload errors in admin panel.

**Phase:** Phase 1 (infrastructure setup). Configure S3 alongside database.

**Confidence:** HIGH -- [confirmed via Payload storage adapter docs](https://payloadcms.com/docs/upload/storage-adapters).

---

### Pitfall 8: PostgreSQL SSL Connection Failure with AWS RDS

**What goes wrong:** Connecting Payload's Postgres adapter to AWS RDS without proper SSL configuration causes connection failures. RDS requires SSL by default, but the Payload/Drizzle connection string doesn't include SSL params unless explicitly configured.

**Prevention:**
- Pass SSL configuration in the Postgres adapter's `pool` options, including the AWS RDS CA certificate.
- Use `DATABASE_URL` with `?sslmode=require` or pass `ssl: { rejectUnauthorized: true }` in the adapter config.
- Test database connectivity from the deployment environment before deploying the full application.
- Use PostgreSQL 17 or lower (PostgreSQL 18 has reported compatibility issues with Payload).

**Detection:** "Connection refused" or SSL handshake errors in build/deploy logs; Payload init hanging on database connection.

**Phase:** Phase 1 (database provisioning).

**Confidence:** MEDIUM -- [referenced in community help](https://payloadcms.com/community-help/discord/aws-rds-ssl-cert-with-postgres-adapter) and [GitHub issue #12231](https://github.com/payloadcms/payload/issues/12231).

---

### Pitfall 9: Collections vs. Globals Mismodeling

**What goes wrong:** Modeling the Home page as a Collection (when it should be a Global) or modeling Navigation as a Collection. Conversely, modeling pages like "About" as Globals prevents them from appearing in Relationship fields, breaking internal link selection for editors.

**Why it happens:** The distinction is subtle. Globals = single-instance data (one homepage, one site navigation, one footer). Collections = multiple documents of the same type (multiple programmes, multiple regulatory updates, multiple certifications).

**Prevention:**
- **Globals for:** Site Navigation/Header, Footer, Homepage (it is unique)
- **Collections for:** Pages (About, Contact, etc. -- even if they feel unique, using a Collection with a "Pages" type enables Relationship links between them), Programmes, Certifications, Regulatory Updates, Media
- If a "unique" page needs to appear in a link picker or relationship field, it must be a Collection document, not a Global.
- Keep collection/global configs in separate files, organized by feature.

**Detection:** Editors unable to link to certain pages from the admin panel; "this page type doesn't appear in the link field" complaints.

**Phase:** Phase 2 (content modeling).

**Confidence:** HIGH -- [confirmed via Payload discussion #4650](https://github.com/payloadcms/payload/discussions/4650) and [collection structure best practices](https://www.buildwithmatija.com/blog/payload-cms-collection-structure-best-practices).

---

### Pitfall 10: Existing `"use client"` Boundaries Conflict with Payload's Server-First Architecture

**What goes wrong:** The existing codebase has inconsistent `"use client"` directives (noted in CONCERNS.md). The home page is unnecessarily marked as a client component. Payload's data fetching relies on Server Components using the Local API. If pages are client components, they cannot call `getPayload()` directly and require additional API roundtrips.

**Prevention:**
- During the route group restructure (Pitfall 5), audit every page for unnecessary `"use client"` directives.
- Convert the home page and other pages to Server Components where possible.
- Use `getPayload()` in Server Components to fetch CMS data with zero network overhead (Local API runs in-process).
- For truly interactive sections (certifications filtering), keep `"use client"` on the interactive component only, not the entire page. Fetch data in a parent Server Component and pass it down as props.

**Detection:** Pages making REST API calls to Payload instead of using Local API; unnecessary loading states; "cannot use getPayload in client component" errors.

**Phase:** Phase 1 (restructuring) and Phase 2 (integration).

**Confidence:** HIGH -- this is specific to the codebase (confirmed via CONCERNS.md and `src/app/page.tsx` analysis).

---

### Pitfall 11: 220MB Build Output Limit (If Staying on Amplify)

**What goes wrong:** AWS Amplify caps SSR build output at 220MB. Adding Payload CMS with its admin panel, Drizzle ORM, and supporting libraries significantly increases bundle size. The `sharp` image processing library alone adds substantial weight.

**Prevention:**
- This is largely moot if migrating off Amplify (see Pitfall 1).
- If attempting Amplify deployment: monitor build output size from the first Payload integration, use `@next/bundle-analyzer` to track, and aggressively tree-shake.

**Detection:** Build failures with "output exceeds maximum allowed size" in Amplify.

**Phase:** Phase 1 (deployment platform decision).

**Confidence:** MEDIUM -- confirmed limit exists, uncertain if this project would hit it.

---

## Minor Pitfalls

### Pitfall 12: Hook Infinite Loops in Payload Collections

**What goes wrong:** Calling `payload.update()` on the same collection inside a `beforeRead` or `afterRead` hook creates an infinite recursion loop. The update triggers another read, which triggers the hook again.

**Prevention:**
- Use the `context` property on the `req` object to set a flag before calling nested operations. Check the flag at hook entry to break the cycle.
- Always pass `req` to nested Payload operations to maintain the transaction context.
- Never use `setImmediate()` or `setTimeout()` to defer operations inside hooks (breaks PostgreSQL transaction boundaries).

**Detection:** Server hangs or crashes; PostgreSQL connection pool exhaustion; "maximum call stack exceeded" errors.

**Phase:** Phase 3 (custom logic/hooks, if needed).

**Confidence:** HIGH -- [confirmed via Payload hook guide](https://www.buildwithmatija.com/blog/payload-cms-hooks-safe-data-manipulation-postgresql).

---

### Pitfall 13: `sharp` Missing in Production Container

**What goes wrong:** The `sharp` image processing library (required by Payload for image optimization in standalone mode) is installed during the build stage but not copied to the production stage in a multi-stage Docker build.

**Prevention:**
- Install `sharp` in the runner/production stage of the Dockerfile, not just the builder stage.
- Or configure `output: 'standalone'` in `next.config.ts` and ensure `sharp` is included in the standalone output.

**Detection:** Runtime errors mentioning "'sharp' is required to be installed in standalone mode."

**Phase:** Phase 1 (Docker/deployment setup).

**Confidence:** HIGH -- this is a well-documented and frequently reported issue.

---

### Pitfall 14: CORS and CSRF Misconfiguration for Admin Panel

**What goes wrong:** The Payload admin panel fails to authenticate or save content because CORS headers block requests, or CSRF validation rejects the admin panel's domain.

**Prevention:**
- Configure `cors` in the Payload config to allow the deployment domain.
- Add the deployment domain to `csrf` allowed domains.
- Do not use wildcard `'*'` for CORS in production.
- When using a custom domain with CloudFront/CDN, ensure the origin domain (not just the CDN domain) is in the allowed list.

**Detection:** Login works locally but fails in production; 403 errors when saving content; browser console showing CORS errors.

**Phase:** Phase 1 (Payload config) and Phase 4 (production deployment).

**Confidence:** MEDIUM -- [referenced in Payload troubleshooting docs](https://payloadcms.com/docs/troubleshooting/troubleshooting).

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Infrastructure/deployment setup | Amplify does not support Next.js 16 (Pitfall 1) | Migrate to ECS Fargate / App Runner before any Payload work |
| Infrastructure/deployment setup | S3 not configured for media (Pitfall 7) | Set up S3 bucket alongside RDS PostgreSQL |
| Infrastructure/deployment setup | RDS SSL connection (Pitfall 8) | Test DB connectivity in isolation first |
| Payload installation | Version mismatch crashes (Pitfall 2) | Pin exact versions, verify with `pnpm why` |
| Payload installation | withPayload breaks Turbopack (Pitfall 6) | Use Payload 3.73.0+ |
| Project restructuring | Root layout conflict (Pitfall 5) | Route groups: `(frontend)` + `(payload)` |
| Project restructuring | use client boundaries (Pitfall 10) | Audit and fix before integrating CMS data |
| Content modeling | Collections vs Globals confusion (Pitfall 9) | Follow the decision matrix in prevention |
| Content migration | Data loss from incomplete extraction (Pitfall 4) | Content audit spreadsheet + seed scripts + visual regression |
| Database management | Push/migration state corruption (Pitfall 3) | Disable push from day one, migration-only workflow |
| Production deployment | CORS/CSRF blocks admin (Pitfall 14) | Configure allowed domains before go-live |

## Sources

- [Payload CMS Installation Docs](https://payloadcms.com/docs/getting-started/installation)
- [Payload CMS Troubleshooting](https://payloadcms.com/docs/troubleshooting/troubleshooting)
- [Payload CMS Migration Docs](https://payloadcms.com/docs/database/migrations)
- [Payload CMS Storage Adapters](https://payloadcms.com/docs/upload/storage-adapters)
- [Payload CMS + Next.js 16 Compatibility](https://www.buildwithmatija.com/blog/payload-cms-nextjs-16-compatibility-breakthrough)
- [Payload CMS Hooks Guide](https://www.buildwithmatija.com/blog/payload-cms-hooks-safe-data-manipulation-postgresql)
- [Payload CMS Collection Best Practices](https://www.buildwithmatija.com/blog/payload-cms-collection-structure-best-practices)
- [Payload CMS Production Migrations](https://www.buildwithmatija.com/blog/payloadcms-postgres-push-to-migrations)
- [AWS Amplify Next.js Support](https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html)
- [AWS Amplify Next.js 16 Request - Issue #14600](https://github.com/aws-amplify/amplify-js/issues/14600)
- [withPayload Turbopack Issue #14354](https://github.com/payloadcms/payload/issues/14354)
- [Collections vs Globals Discussion #4650](https://github.com/payloadcms/payload/discussions/4650)
- [Payload Deploy Guide for Next.js 16](https://www.buildwithmatija.com/blog/deploy-payload-cms-nextjs-16-self-hosted)
- [Next.js Adapter API / OpenNext](https://opennext.js.org/news/2026-03-25-3-years-of-opennext)
