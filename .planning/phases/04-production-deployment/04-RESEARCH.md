# Phase 4: Production Deployment - Research

**Researched:** 2026-04-12
**Domain:** AWS container deployment, PostgreSQL RDS, Docker, Payload CMS production
**Confidence:** HIGH

## Summary

This phase deploys the Payload CMS + Next.js 16 application to AWS using container-based hosting with a managed PostgreSQL database. The project currently runs locally with a PostgreSQL database and has no Dockerfile, no `output: 'standalone'` config, and no infrastructure-as-code.

The recommended approach is **ECS Express Mode** (released re:Invent 2025) which dramatically simplifies container deployment on AWS -- it auto-provisions an ALB, auto-scaling, TLS, and networking from just a container image and two IAM roles. This replaces the traditional ECS Fargate setup (which requires configuring VPC, subnets, NAT gateway, ALB, security groups, etc.) and avoids AWS App Runner which is now in maintenance mode (closed to new customers April 30, 2026). For the database, use **RDS PostgreSQL db.t4g.micro** (free tier eligible, ~$12-15/month after).

A key technical challenge is that Payload CMS 3 requires a database connection during `next build` for static generation. The solution is to either provide the database URI at build time or use `--experimental-build-mode compile` to skip SSG. Since this is a CMS with dynamic content, using compile mode (all pages rendered at request time) is the pragmatic choice for Docker builds.

**Primary recommendation:** Use ECS Express Mode with Terraform, RDS PostgreSQL db.t4g.micro, ECR for container images, and a multi-stage Dockerfile with `output: 'standalone'`.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DEPL-01 | App deployed on AWS with container-based hosting (ECS/App Runner) | ECS Express Mode on Fargate -- Dockerfile, ECR, Terraform module documented below |
| DEPL-02 | PostgreSQL database provisioned on AWS (RDS or similar) | RDS PostgreSQL db.t4g.micro with SSL -- Terraform aws_db_instance resource, pool SSL config documented |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Tech stack**: Next.js 16.2.3 / React 19.2.4 / Tailwind 4 / Payload CMS 3.82.1 / pnpm
- **Hosting**: Must deploy on AWS with PostgreSQL (RDS or similar) alongside containerized app
- **Auth**: Email/password login for editors (built into Payload)
- **Border radius**: `border-radius: 0 !important` globally -- no rounded corners
- **Design continuity**: Visual design must remain identical
- **No test framework**: None configured (nyquist_validation disabled in config)
- **GSD workflow enforcement**: Must use GSD commands for file changes
- **AGENTS.md warning**: Next.js 16 has breaking changes -- read `node_modules/next/dist/docs/` before writing code

## Standard Stack

### Core

| Library/Tool | Version | Purpose | Why Standard |
|-------------|---------|---------|--------------|
| Docker | 29.1.5 (local) | Container image build | Industry standard, required for ECS [VERIFIED: local `docker --version`] |
| Terraform | 1.14.3 (local) | Infrastructure provisioning | IaC standard, ECS Express Mode support via terraform-aws-modules [VERIFIED: local `terraform --version`] |
| AWS CLI | 2.33.6 (local) | AWS resource management, ECR push | Required for ECR authentication [VERIFIED: local `aws --version`] |
| terraform-aws-modules/ecs/aws | ~7.5.0 | ECS cluster + Express Mode service | Official community module with express-service submodule [CITED: registry.terraform.io/modules/terraform-aws-modules/ecs/aws] |
| @payloadcms/storage-s3 | 3.82.1 | S3 media storage in production | **NOTE: MEDIA-01 is v2/deferred** -- only add if the phase scope expands [VERIFIED: npm registry] |

### Supporting

| Tool | Purpose | When to Use |
|------|---------|-------------|
| Amazon ECR | Container image registry | Store Docker images for ECS deployment |
| Amazon RDS PostgreSQL | Managed database | Production database with automated backups, SSL |
| AWS S3 | Media/upload storage | Only if MEDIA-01 is pulled into v1 scope |
| Amazon CloudWatch | Logging + monitoring | ECS Express Mode auto-configures log groups |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| ECS Express Mode | Traditional ECS Fargate | 2-4 hours more setup (VPC, ALB, subnets, NAT, security groups) for same result [CITED: aws.amazon.com/blogs/aws/build-production-ready-applications-without-infrastructure-complexity-using-amazon-ecs-express-mode/] |
| ECS Express Mode | AWS App Runner | **App Runner is in maintenance mode** -- closed to new customers April 30, 2026 [CITED: docs.aws.amazon.com/apprunner/latest/dg/apprunner-availability-change.html] |
| Terraform | AWS CDK | CDK better for AWS-only shops with TypeScript devs; Terraform is more portable and already installed locally |
| Terraform | AWS Console (manual) | One-time click-ops is faster but not reproducible; Terraform enables teardown/recreate |

## Architecture Patterns

### Recommended Project Structure (new files)

```
/
├── Dockerfile                    # Multi-stage build with standalone output
├── .dockerignore                 # Exclude node_modules, .next, .env, etc.
├── infra/                        # Terraform infrastructure code
│   ├── main.tf                   # Provider, backend config
│   ├── variables.tf              # Input variables (region, db password, etc.)
│   ├── outputs.tf                # ECR URI, ECS service URL, RDS endpoint
│   ├── ecr.tf                    # ECR repository
│   ├── ecs.tf                    # ECS cluster + Express Mode service
│   ├── rds.tf                    # RDS PostgreSQL instance
│   └── terraform.tfvars.example  # Example variable values (no secrets)
└── scripts/
    └── deploy.sh                 # Build, push to ECR, update ECS service
```

### Pattern 1: Multi-Stage Dockerfile for Payload + Next.js

**What:** Three-stage Docker build (deps, builder, runner) using `output: 'standalone'`
**When to use:** Always for this project -- containerized deployment is a locked decision

The official Payload CMS template Dockerfile follows the Next.js with-docker pattern:

```dockerfile
# Source: github.com/payloadcms/payload/blob/main/templates/blank/Dockerfile
FROM node:22.17.0-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Build requires DATABASE_URI and PAYLOAD_SECRET at build time
# Option A: Provide real DB (if accessible from build environment)
# Option B: Use --experimental-build-mode compile to skip SSG
RUN corepack enable pnpm && pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
RUN mkdir .next && chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD HOSTNAME="0.0.0.0" node server.js
```

[CITED: github.com/payloadcms/payload/blob/main/templates/blank/Dockerfile]

### Pattern 2: Database Connection at Build Time

**What:** Payload CMS 3 requires DATABASE_URI during `next build` because Next.js SSG calls the Payload Local API
**When to use:** When Docker build needs to produce optimized static pages

**Option A -- Provide DB at build time (recommended for this project):**
Pass `DATABASE_URI` and `PAYLOAD_SECRET` as Docker build args. The RDS instance must be accessible from the build environment.

```dockerfile
# In builder stage:
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ENV DATABASE_URI=${DATABASE_URI}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
RUN corepack enable pnpm && pnpm run build
```

**Option B -- Skip SSG with compile mode:**
```bash
pnpm next build --experimental-build-mode compile
```
This avoids the DB connection requirement but disables static generation -- all pages are server-rendered at request time. For a CMS where content changes frequently, this is acceptable.

[CITED: payloadcms.com/docs/production/building-without-a-db-connection]
[CITED: github.com/payloadcms/payload/discussions/9028]

### Pattern 3: ECS Express Mode Deployment

**What:** Simplified ECS deployment that auto-provisions ALB, auto-scaling, TLS, networking
**When to use:** New AWS container deployments in 2025-2026

```hcl
# Source: terraform-aws-modules/ecs/aws express-service submodule
module "ecs_cluster" {
  source  = "terraform-aws-modules/ecs/aws//modules/cluster"
  version = "~> 7.5"

  cluster_name = "arifac-cluster"
}

module "ecs_express_service" {
  source  = "terraform-aws-modules/ecs/aws//modules/express-service"
  version = "~> 7.5"

  name       = "arifac-web"
  cluster_id = module.ecs_cluster.id

  container_definitions = {
    app = {
      image = "${aws_ecr_repository.app.repository_url}:latest"
      port  = 3000
      environment = [
        { name = "DATABASE_URI", value = "..." },
        { name = "PAYLOAD_SECRET", value = "..." },
        { name = "NEXT_PUBLIC_SERVER_URL", value = "https://..." },
      ]
    }
  }

  cpu    = 512   # 0.5 vCPU
  memory = 1024  # 1 GB (Payload needs ~512MB minimum)
}
```
[ASSUMED -- express-service submodule API inferred from terraform-aws-modules conventions; exact parameters need verification against module docs]

### Pattern 4: RDS PostgreSQL with SSL

**What:** Connect Payload's db-postgres adapter to RDS with SSL
**When to use:** Always in production

```typescript
// In payload.config.ts -- update the db adapter config
db: postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URI,
    // Do NOT include sslmode in the connection string
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false } // For RDS with default certs
      : false,
  },
}),
```

For stricter SSL verification (production best practice):
```typescript
ssl: {
  rejectUnauthorized: true,
  ca: Buffer.from(process.env.RDS_CA_CERT_BASE64 || '', 'base64').toString('utf-8'),
}
```

[CITED: payloadcms.com/community-help/discord/aws-rds-ssl-cert-with-postgres-adapter]
[CITED: node-postgres.com/features/ssl]

### Anti-Patterns to Avoid

- **Including .env in Docker image:** Never bake secrets into the image. Pass via ECS task definition environment or AWS Secrets Manager.
- **Using `sslmode=require` in DATABASE_URI with an `ssl` object:** The connection string SSL params overwrite the `pool.ssl` object in node-postgres. Use one or the other, not both.
- **Using `db push` in production:** The project decision requires migration workflow from day one. Always use `pnpm payload migrate` in production.
- **Running as root in container:** The Dockerfile creates a `nextjs` user -- always use `USER nextjs`.
- **Skipping health checks:** ECS needs a health check endpoint. Next.js serves pages by default, so `/` works, but a dedicated `/api/health` is better practice.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Container orchestration | Custom EC2 + Docker Compose | ECS Express Mode | Auto-scaling, ALB, TLS, monitoring out of the box |
| Database provisioning | Manual RDS setup via console | Terraform `aws_db_instance` | Reproducible, version-controlled, teardown-able |
| SSL certificates | Self-signed certs, manual ACM | ECS Express Mode auto-TLS | Express Mode provisions ACM certs and ALB listeners automatically |
| Container registry | Docker Hub or self-hosted | Amazon ECR | Integrated with ECS IAM, no separate auth needed |
| Log aggregation | File-based logging | CloudWatch Logs | ECS auto-configures log groups; searchable, alertable |
| Secret management | .env files on server | ECS environment variables (or Secrets Manager for sensitive values) | Secrets never touch disk in the container |

## Common Pitfalls

### Pitfall 1: Payload Build Requires Database Connection
**What goes wrong:** Docker build fails with "Cannot connect to database" error during `next build`
**Why it happens:** Payload CMS 3 boots during Next.js static generation and tries to connect to the database
**How to avoid:** Either (a) make RDS accessible from the build environment and pass DATABASE_URI as a build arg, or (b) use `--experimental-build-mode compile` to skip SSG
**Warning signs:** Build hangs or throws connection timeout errors in the builder stage

### Pitfall 2: Missing `output: 'standalone'` in next.config
**What goes wrong:** No `.next/standalone` directory created, Dockerfile COPY fails
**Why it happens:** `output: 'standalone'` is not set in next.config.ts -- this project currently lacks it
**How to avoid:** Add `output: 'standalone'` to the nextConfig object before the `withPayload` wrapper
**Warning signs:** `.next/standalone` directory does not exist after build

### Pitfall 3: pnpm Not Available in Docker
**What goes wrong:** Build fails because pnpm is not installed in the Node.js Alpine image
**Why it happens:** Official Node images ship npm, not pnpm. Need `corepack enable pnpm` first.
**How to avoid:** Run `corepack enable pnpm` before `pnpm i` in both deps and builder stages
**Warning signs:** "pnpm: not found" error during Docker build

### Pitfall 4: SSL Connection String vs Object Conflict
**What goes wrong:** SSL connection to RDS fails silently or uses wrong settings
**Why it happens:** node-postgres replaces the `ssl` object if `sslmode` appears in the connection string
**How to avoid:** Use `pool.ssl` object OR connection string `?sslmode=...`, never both
**Warning signs:** "SSL required" errors despite having `ssl` config, or successful connection without expected cert verification

### Pitfall 5: Payload Migrations Not Run in Production
**What goes wrong:** Application starts but database schema is out of date, pages fail to load
**Why it happens:** Migrations are not run automatically on container start
**How to avoid:** Run `pnpm payload migrate` as part of the deployment pipeline (e.g., in deploy script before updating the ECS service, or as part of container startup)
**Warning signs:** "relation does not exist" errors in logs

### Pitfall 6: NEXT_PUBLIC_SERVER_URL Not Set
**What goes wrong:** Admin panel links, API URLs, and media URLs point to localhost
**Why it happens:** `NEXT_PUBLIC_SERVER_URL` must be set to the production domain at build time (it's inlined by Next.js)
**How to avoid:** Pass `NEXT_PUBLIC_SERVER_URL` as a build arg in the Dockerfile
**Warning signs:** Admin panel redirects to localhost:3000

### Pitfall 7: ECS Task Memory Too Low
**What goes wrong:** Container gets OOM-killed during request handling
**Why it happens:** Payload CMS needs ~512MB RAM minimum; with Next.js overhead, 512MB total is too tight
**How to avoid:** Set ECS task memory to at least 1024MB (1GB)
**Warning signs:** Task stopped with "OutOfMemoryError" in CloudWatch logs

## Code Examples

### next.config.ts with standalone output

```typescript
// Source: nextjs.org/docs/app/api-reference/config/next-config-js/output
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { withPayload } = require('@payloadcms/next/withPayload')

export default withPayload(nextConfig);
```

### .dockerignore

```
node_modules
.next
.git
.env
.env.*
.planning
*.md
```

### payload.config.ts SSL-aware db adapter

```typescript
// Update existing db config to support SSL in production
db: postgresAdapter({
  pool: {
    connectionString: databaseUri,
    ...(process.env.NODE_ENV === 'production' && {
      ssl: { rejectUnauthorized: false },
    }),
  },
}),
```

### Deploy script (scripts/deploy.sh)

```bash
#!/bin/bash
set -euo pipefail

AWS_REGION="${AWS_REGION:-ap-south-1}"
ECR_REPO="arifac-web"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_URI="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}"

# Login to ECR
aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$ECR_URI"

# Build image
docker build \
  --build-arg DATABASE_URI="$DATABASE_URI" \
  --build-arg PAYLOAD_SECRET="$PAYLOAD_SECRET" \
  --build-arg NEXT_PUBLIC_SERVER_URL="$NEXT_PUBLIC_SERVER_URL" \
  -t "$ECR_URI:latest" .

# Push to ECR
docker push "$ECR_URI:latest"

# Run migrations against production DB
pnpm payload migrate

# Force new deployment (picks up latest image)
aws ecs update-service \
  --cluster arifac-cluster \
  --service arifac-web \
  --force-new-deployment \
  --region "$AWS_REGION"

echo "Deployment initiated. Monitor at: https://${AWS_REGION}.console.aws.amazon.com/ecs/"
```

### Terraform RDS PostgreSQL

```hcl
# infra/rds.tf
resource "aws_db_instance" "postgres" {
  identifier     = "arifac-db"
  engine         = "postgres"
  engine_version = "16"
  instance_class = "db.t4g.micro"

  allocated_storage     = 20
  storage_type          = "gp2"  # gp2 is free-tier eligible
  storage_encrypted     = true

  db_name  = "arifac"
  username = "payload_admin"
  password = var.db_password  # Pass via tfvars or Secrets Manager

  publicly_accessible    = false
  skip_final_snapshot    = false
  final_snapshot_identifier = "arifac-db-final"

  backup_retention_period = 7
  backup_window          = "03:00-04:00"

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  tags = {
    Project = "arifac"
    Phase   = "production"
  }
}
```

### Terraform ECR Repository

```hcl
# infra/ecr.tf
resource "aws_ecr_repository" "app" {
  name                 = "arifac-web"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  lifecycle_policy {
    policy = jsonencode({
      rules = [{
        rulePriority = 1
        description  = "Keep last 5 images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 5
        }
        action = { type = "expire" }
      }]
    })
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| AWS App Runner | ECS Express Mode | Nov 2025 (re:Invent) | App Runner maintenance mode April 2026; Express Mode is the replacement [CITED: docs.aws.amazon.com/apprunner/latest/dg/apprunner-availability-change.html] |
| AWS Copilot CLI | Terraform / CDK | June 2026 (EOL) | Copilot CLI reaches end of support; migrate to IaC [CITED: aws.amazon.com/blogs/containers/announcing-the-end-of-support-for-the-aws-copilot-cli/] |
| ECS manual setup (VPC/ALB/subnets) | ECS Express Mode | Nov 2025 | 2-4 hours setup reduced to ~5 minutes [CITED: aws.amazon.com/blogs/aws/build-production-ready-applications-without-infrastructure-complexity-using-amazon-ecs-express-mode/] |
| Payload 2 `disableDBConnect` | Payload 3 `--experimental-build-mode compile` | 2024 | New approach for Docker builds without DB [CITED: payloadcms.com/docs/production/building-without-a-db-connection] |

**Deprecated/outdated:**
- **AWS App Runner**: Maintenance mode, closed to new customers April 30, 2026
- **AWS Copilot CLI**: End of support June 12, 2026
- **Payload `disableDBConnect`**: Payload 2 pattern, not available in Payload 3

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | ECS Express Mode terraform-aws-modules/ecs/aws express-service submodule API (exact parameters) | Architecture Patterns - Pattern 3 | Medium -- may need to adjust Terraform config based on actual module docs |
| A2 | AWS region ap-south-1 assumed for deploy script | Code Examples | Low -- user will set their own region |
| A3 | RDS db.t4g.micro is sufficient for this workload (1-2 editors, ~20 pages) | Standard Stack | Low -- can scale up if needed |
| A4 | `--experimental-build-mode compile` is still the recommended approach for Payload 3 Docker builds | Architecture Patterns - Pattern 2 | Medium -- Payload may have introduced better alternatives; verify against current docs |

## Open Questions

1. **AWS Region and Account**
   - What we know: AWS CLI is configured locally (v2.33.6)
   - What's unclear: Which AWS region and account to deploy to
   - Recommendation: Ask user for target region; default to ap-south-1 (India) based on ARIFAC being a regulatory body

2. **Domain Name / DNS**
   - What we know: ECS Express Mode provides an auto-generated HTTPS URL
   - What's unclear: Whether a custom domain is needed for v1
   - Recommendation: Deploy with auto-generated URL first, add custom domain as a follow-up

3. **S3 Media Storage Scope**
   - What we know: MEDIA-01 (S3 storage) is explicitly in v2 requirements, deferred
   - What's unclear: Whether editors will upload media in v1 production
   - Recommendation: Skip S3 adapter for v1. If media uploads are needed, local storage in the container is ephemeral -- flag this limitation to the user

4. **CI/CD Pipeline**
   - What we know: Project currently uses amplify.yml (which won't work for this stack)
   - What's unclear: Whether automated CI/CD is in scope for this phase
   - Recommendation: Provide a manual deploy script; CI/CD can be a follow-up

5. **Build-time Database Access**
   - What we know: Payload needs DB during build; two workarounds exist
   - What's unclear: Whether RDS will be accessible from the local build machine (or if builds happen in CI)
   - Recommendation: Use `--experimental-build-mode compile` in the Dockerfile to avoid build-time DB dependency; this is simpler and more portable

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Docker | Container build | Yes | 29.1.5 | -- |
| AWS CLI | ECR push, ECS management | Yes | 2.33.6 | -- |
| Terraform | Infrastructure provisioning | Yes | 1.14.3 | -- |
| Node.js | Local development | Yes | 25.8.0 | -- |
| pnpm | Package management | Yes | 10.28.1 | -- |
| PostgreSQL (local) | Development database | Unknown | -- | Docker postgres container |

**Missing dependencies with no fallback:** None

**Missing dependencies with fallback:** None -- all required tools are installed locally.

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | Yes (admin panel) | Payload built-in auth with email/password; already configured |
| V3 Session Management | Yes (admin sessions) | Payload handles session management internally |
| V4 Access Control | No (single role type) | Admin/editor roles in Payload users collection |
| V5 Input Validation | Yes (CMS input) | Payload handles field validation via collection schemas |
| V6 Cryptography | Yes (secrets, SSL) | PAYLOAD_SECRET for JWT signing; RDS SSL for data in transit |

### Known Threat Patterns for AWS Container + RDS Stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Database credential exposure | Information Disclosure | Use ECS task definition secrets (from Secrets Manager), not plaintext env vars |
| Container escape | Elevation of Privilege | Run as non-root user (nextjs:nodejs), use Fargate (no host access) |
| Unencrypted DB traffic | Information Disclosure | Enforce SSL on RDS connection (`rds.force_ssl = 1`) |
| Admin panel exposed to internet | Spoofing / Tampering | Rate limiting on /admin login (Payload built-in); consider WAF for additional protection |
| Docker image with secrets baked in | Information Disclosure | Pass secrets via build args (not in source), use multi-stage builds to exclude source from final image |

## Sources

### Primary (HIGH confidence)
- [Payload CMS official Dockerfile template](https://github.com/payloadcms/payload/blob/main/templates/blank/Dockerfile) - verified via GitHub API
- [Next.js output: standalone docs](https://nextjs.org/docs/app/api-reference/config/next-config-js/output) - official documentation
- [AWS App Runner availability change](https://docs.aws.amazon.com/apprunner/latest/dg/apprunner-availability-change.html) - official AWS notice
- [AWS ECS Express Mode announcement](https://aws.amazon.com/blogs/aws/build-production-ready-applications-without-infrastructure-complexity-using-amazon-ecs-express-mode/) - official AWS blog
- [@payloadcms/storage-s3 npm](https://www.npmjs.com/package/@payloadcms/storage-s3) - version 3.82.1 verified via npm registry

### Secondary (MEDIUM confidence)
- [Payload CMS community: RDS SSL configuration](https://payloadcms.com/community-help/discord/aws-rds-ssl-cert-with-postgres-adapter) - community-verified pattern
- [Payload CMS: building without DB connection](https://payloadcms.com/docs/production/building-without-a-db-connection) - official docs (content via WebSearch)
- [terraform-aws-modules/ecs/aws](https://registry.terraform.io/modules/terraform-aws-modules/ecs/aws) - Terraform Registry, v7.5.0 with express-service submodule

### Tertiary (LOW confidence)
- ECS Express Mode Terraform exact API parameters -- inferred from module conventions, not verified against actual module source

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all tools verified locally, versions confirmed
- Architecture (Dockerfile/Next.js standalone): HIGH - official Payload template verified via GitHub, Next.js docs confirmed
- Architecture (ECS Express Mode Terraform): MEDIUM - module exists and has express-service example, but exact API not verified
- Pitfalls: HIGH - community reports and official docs confirm all listed issues
- RDS configuration: HIGH - standard AWS service, well-documented

**Research date:** 2026-04-12
**Valid until:** 2026-05-12 (30 days -- stable infrastructure stack)
