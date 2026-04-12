---
phase: 04-production-deployment
plan: 01
subsystem: deployment
tags: [docker, containerization, health-check, ssl, standalone]
dependency_graph:
  requires: []
  provides: [dockerfile, dockerignore, health-endpoint, standalone-output, ssl-database-config]
  affects: [next.config.ts, src/payload.config.ts]
tech_stack:
  added: [docker-multi-stage-build]
  patterns: [compile-mode-build, non-root-container, conditional-ssl]
key_files:
  created:
    - Dockerfile
    - .dockerignore
    - src/app/(frontend)/api/health/route.ts
  modified:
    - next.config.ts
    - src/payload.config.ts
decisions:
  - Used compile mode build to avoid needing DATABASE_URI at Docker build time
  - SSL with rejectUnauthorized false for RDS default certificate compatibility
  - Health endpoint returns only status and timestamp, no DB check to avoid cascading restarts
metrics:
  duration: 2m
  completed: "2026-04-12T13:19:36Z"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 5
---

# Phase 04 Plan 01: Containerization Summary

Multi-stage Docker build with compile mode for Payload CMS, standalone Next.js output, SSL-aware PostgreSQL connection, and lightweight health endpoint for ECS ALB.

## Task Results

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Add standalone output, SSL database config, and health endpoint | fe562ca | next.config.ts, src/payload.config.ts, src/app/(frontend)/api/health/route.ts |
| 2 | Create Dockerfile and .dockerignore for multi-stage build | 238cab5 | Dockerfile, .dockerignore |

## Changes Made

### Task 1: Standalone output, SSL, and health endpoint

- Added `output: 'standalone'` to next.config.ts, enabling the `.next/standalone` directory that the Dockerfile copies into the runner stage
- Updated src/payload.config.ts to conditionally add `ssl: { rejectUnauthorized: false }` to the PostgreSQL pool config when NODE_ENV is production, using the spread operator pattern to keep dev unchanged
- Created src/app/(frontend)/api/health/route.ts as a minimal GET handler returning `{ status: 'ok', timestamp }` for ECS ALB health checks

### Task 2: Dockerfile and .dockerignore

- Created a four-stage Dockerfile (base, deps, builder, runner) using node:22.17.0-alpine
- Builder stage uses `--experimental-build-mode compile` so DATABASE_URI is not needed at build time -- all pages are server-rendered at request time
- NEXT_PUBLIC_SERVER_URL passed as build ARG (inlined by Next.js at build time); DATABASE_URI and PAYLOAD_SECRET are runtime-only env vars
- Runner stage runs as non-root user `nextjs` (UID 1001) for container security
- .dockerignore excludes node_modules, .next, .git, .env files, .planning, and other non-essential files while keeping src and public available for the build

## Decisions Made

1. **Compile mode over full build**: Using `--experimental-build-mode compile` avoids requiring a database connection during Docker image build. All pages are server-rendered at request time, which is appropriate for a CMS where content changes frequently.

2. **SSL rejectUnauthorized: false**: Uses the pool ssl object rather than sslmode in the connection string (node-postgres conflict if both used). rejectUnauthorized: false works with RDS default certificates without needing to bundle CA certs.

3. **No DB check in health endpoint**: A database-dependent health check causes cascading container restarts during DB maintenance windows. The lightweight status-only response lets ECS manage container lifecycle independently of transient DB issues.

## Deviations from Plan

None -- plan executed exactly as written.

## Threat Surface Scan

All threat mitigations from the plan's threat model are implemented:
- T-04-01: DATABASE_URI and PAYLOAD_SECRET are NOT build args in Dockerfile; .dockerignore excludes .env files
- T-04-02: SSL enabled on database connection in production via conditional ssl config
- T-04-03: Container runs as non-root user nextjs (UID 1001)
- T-04-04: Health endpoint returns only status and timestamp
- T-04-05: Health endpoint has no DB calls

No additional threat surface introduced beyond what is documented in the plan.

## Self-Check: PASSED

All 5 created/modified files verified present. Both task commits (fe562ca, 238cab5) verified in git log.
