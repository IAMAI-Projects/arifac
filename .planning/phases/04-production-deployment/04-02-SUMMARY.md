---
phase: 04-production-deployment
plan: 02
subsystem: infrastructure
tags: [terraform, aws, ecr, ecs, rds, deploy-script]
dependency_graph:
  requires: [dockerfile, health-endpoint, standalone-output]
  provides: [terraform-infra, ecr-repository, ecs-task-definition, rds-postgres, deploy-script]
  affects: [.gitignore]
tech_stack:
  added: [terraform, aws-ecr, aws-ecs-fargate, aws-rds-postgres]
  patterns: [infrastructure-as-code, container-registry, managed-database, fargate-serverless]
key_files:
  created:
    - infra/main.tf
    - infra/variables.tf
    - infra/outputs.tf
    - infra/ecr.tf
    - infra/ecs.tf
    - infra/rds.tf
    - infra/terraform.tfvars.example
    - scripts/deploy.sh
  modified:
    - .gitignore
decisions:
  - Fargate task definition with commented-out ECS service block pending user VPC details
  - Local Terraform backend for v1 simplicity, S3 backend recommended for production
  - Deploy script does not automate migrations to allow manual verification before service update
metrics:
  duration: 2m
  completed: "2026-04-12T13:25:00Z"
  tasks_completed: 2
  tasks_total: 3
  files_changed: 9
---

# Phase 04 Plan 02: AWS Infrastructure Summary

Terraform configs for ECR container registry, ECS Fargate task definition, and RDS PostgreSQL with SSL enforcement, plus a deploy script that builds, pushes, and triggers ECS redeployment.

## Task Results

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create Terraform infrastructure files | 5240498 | infra/main.tf, infra/variables.tf, infra/ecr.tf, infra/ecs.tf, infra/rds.tf, infra/outputs.tf, infra/terraform.tfvars.example, .gitignore |
| 2 | Create deployment script | ed70041 | scripts/deploy.sh |
| 3 | Verify Terraform validates and Docker builds locally | -- | CHECKPOINT (awaiting human verification) |

## Changes Made

### Task 1: Terraform infrastructure files

- Created infra/main.tf with AWS provider (ap-south-1 default), local backend, and default project tags
- Created infra/variables.tf with 7 variables including sensitive db_password and payload_secret
- Created infra/ecr.tf with ECR repository (scan-on-push enabled) and lifecycle policy keeping last 5 images
- Created infra/ecs.tf with ECS Fargate cluster module, task definition (512 CPU / 1024 MB, port 3000, health check on /api/health, DATABASE_URI + PAYLOAD_SECRET env vars), IAM execution and task roles, CloudWatch log group (14-day retention). ECS service resource is commented out pending user VPC configuration.
- Created infra/rds.tf with PostgreSQL 16 instance (encrypted storage, forced SSL via parameter group, 7-day backup retention, not publicly accessible, final snapshot enabled). VPC security group and subnet group omitted pending user configuration.
- Created infra/outputs.tf exposing ECR URL, RDS endpoint, database URI (sensitive), cluster name, and task definition ARN
- Created infra/terraform.tfvars.example with CHANGE_ME placeholders for secrets
- Updated .gitignore to exclude terraform state files, .terraform directory, and terraform.tfvars (contains real secrets)

### Task 2: Deployment script

- Created scripts/deploy.sh as executable bash script with strict error handling (set -euo pipefail)
- Validates PAYLOAD_SECRET and NEXT_PUBLIC_SERVER_URL env vars before any AWS operations
- Authenticates to ECR via aws ecr get-login-password
- Builds Docker image with --platform linux/amd64 (Fargate compatibility, important for Apple Silicon builds)
- Tags images with both :latest and git short SHA for traceability
- Pushes both tags to ECR then triggers ECS force-new-deployment
- DATABASE_URI is NOT passed as a build arg (only as runtime env var in ECS task definition)
- Prints migration instructions as a separate manual step

## Decisions Made

1. **Commented-out ECS service**: The ECS service resource requires VPC subnet IDs, security groups, and ALB target group that are specific to the user's AWS account. Rather than assume or create a VPC, the task definition is complete and the service block is provided as a commented template. Users can either create the service via AWS Console ECS Express Mode or uncomment and configure the Terraform resource.

2. **Local Terraform backend**: Using `backend "local" {}` for simplicity in v1. The state file contains sensitive values (db_password, payload_secret) and is excluded from git via .gitignore. For production multi-person use, migrate to S3 backend with encryption and DynamoDB locking.

3. **Separate migration step**: The deploy script does not run database migrations automatically. This is intentional -- migrations should be verified before updating the running service, especially for schema changes that could break the existing deployment.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Security] Added Terraform entries to .gitignore**
- **Found during:** Task 1
- **Issue:** Threat model T-04-06 and T-04-07 require terraform state and tfvars to be excluded from git
- **Fix:** Added infra/.terraform/, infra/*.tfstate, infra/*.tfstate.backup, infra/terraform.tfvars, and infra/.terraform.lock.hcl to .gitignore
- **Files modified:** .gitignore
- **Commit:** 5240498

## Threat Surface Scan

All threat mitigations from the plan's threat model are implemented:
- T-04-06: terraform.tfstate excluded from git via .gitignore; local backend documented with S3 migration recommendation
- T-04-07: terraform.tfvars excluded from git; terraform.tfvars.example has CHANGE_ME placeholders only
- T-04-08: Accepted for v1 -- DATABASE_URI and PAYLOAD_SECRET as plaintext env vars in task definition
- T-04-09: rds.force_ssl = 1 parameter group enforces SSL; storage_encrypted = true for at-rest encryption
- T-04-10: publicly_accessible = false on RDS prevents direct internet access
- T-04-11: Deploy script derives account ID from aws sts get-caller-identity; ECR login uses IAM

No additional threat surface introduced beyond what is documented in the plan.

## Self-Check: PENDING

Verification deferred -- awaiting Task 3 checkpoint completion.
