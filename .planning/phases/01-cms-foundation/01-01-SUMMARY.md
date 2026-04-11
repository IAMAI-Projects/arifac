---
phase: 01-cms-foundation
plan: 01
subsystem: cms-core
tags: [payload-cms, postgresql, configuration, foundation]
dependency_graph:
  requires: []
  provides: [payload-config, users-collection, db-adapter, next-payload-integration]
  affects: [next.config.ts, tsconfig.json, package.json]
tech_stack:
  added: [payload@3.82.1, "@payloadcms/next@3.82.1", "@payloadcms/db-postgres@3.82.1", "@payloadcms/richtext-lexical@3.82.1", "@payloadcms/ui@3.82.1", sharp@0.34.5, graphql@16.13.2]
  patterns: [payload-buildConfig, withPayload-wrapper, postgres-adapter-pool]
key_files:
  created: [src/payload.config.ts, .env.example]
  modified: [package.json, pnpm-lock.yaml, tsconfig.json, next.config.ts, .gitignore]
decisions:
  - Used Payload 3.82.1 (latest, well above 3.73.0 minimum for Next.js 16 compatibility)
  - Added !.env.example to .gitignore so env template can be committed while .env stays secret
metrics:
  duration: 2m 33s
  completed: "2026-04-11T11:08:05Z"
---

# Phase 1 Plan 1: Install Payload CMS and Create Core Config Summary

Payload CMS 3.82.1 installed with PostgreSQL adapter, Lexical editor, and Users collection with role-based auth; Next.js build pipeline wrapped with withPayload().

## What Was Done

### Task 1: Install Payload CMS packages and configure environment
- Installed 7 packages: payload, @payloadcms/next, @payloadcms/db-postgres, @payloadcms/richtext-lexical, @payloadcms/ui, sharp, graphql
- Created `.env.example` documenting DATABASE_URI and PAYLOAD_SECRET with format guidance
- Created `.env` with empty DATABASE_URI (user must provide AWS RDS connection string)
- Updated `tsconfig.json`: target ES2017 -> ES2022 (required for Payload top-level await), added `@payload-config` path alias
- Updated `.gitignore` to allow `.env.example` while keeping `.env*` pattern for secrets
- **Commit:** 0f416aa

### Task 2: Create Payload config and wire into Next.js
- Created `src/payload.config.ts` with:
  - Users collection with `auth: true` for email/password login
  - Role field (admin/editor) with editor as default
  - PostgreSQL adapter reading `DATABASE_URI` env var
  - Lexical rich text editor
  - Sharp for image processing
  - Import map baseDir for admin panel component resolution
- Updated `next.config.ts` to wrap config with `withPayload()`
- **Commit:** 0d62e0a

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] .gitignore pattern blocked .env.example commit**
- **Found during:** Task 1
- **Issue:** Existing `.env*` pattern in `.gitignore` prevented committing `.env.example`
- **Fix:** Added `!.env.example` exception to `.gitignore`
- **Files modified:** `.gitignore`
- **Commit:** 0f416aa (included in Task 1 commit)

## Verification Results

- payload 3.82.1 installed (>= 3.73.0 requirement met)
- `src/payload.config.ts` exists with buildConfig, postgresAdapter, users collection with auth: true
- `next.config.ts` contains withPayload wrapping
- `.env.example` documents all required environment variables
- `.env` is gitignored (covered by `.env*` pattern)
- `tsconfig.json` contains @payload-config path alias and ES2022 target

## Threat Surface Scan

No new threat surfaces beyond those documented in the plan's threat model. The `.env` file is properly gitignored, `.env.example` contains only placeholder values, and `PAYLOAD_SECRET` dev value is clearly marked as replace-in-production.

## Self-Check: PASSED

- All 7 key files verified present on disk
- Commit 0f416aa verified in git log
- Commit 0d62e0a verified in git log
