#!/bin/bash
set -euo pipefail

# ============================================================
#  ARIFAC UAT Infrastructure Setup — AWS CLI
#  Region: ap-south-1
#
#  Creates: VPC resources (if needed), RDS, ALB, ECS Cluster,
#           Task Definition, and ECS Service.
#
#  Prerequisites:
#    - AWS CLI v2 configured with sufficient permissions
#    - ECR repo "arifac" already exists (shared with prod)
#
#  IMPORTANT: Review and update the variables below before running.
# ============================================================

REGION="ap-south-1"
PROJECT="arifac-uat"

# ---------- STEP 0: Discover existing VPC (reuse prod VPC) ----------
# Replace these if you want to use specific values.
# Otherwise, this picks the first available VPC + subnets.

echo "==> Discovering VPC and subnets..."
VPC_ID=$(aws ec2 describe-vpcs \
  --region "$REGION" \
  --filters "Name=isDefault,Values=true" \
  --query "Vpcs[0].VpcId" --output text)

if [ "$VPC_ID" = "None" ]; then
  echo "No default VPC found. Listing all VPCs:"
  aws ec2 describe-vpcs --region "$REGION" --query "Vpcs[*].[VpcId,Tags[?Key=='Name'].Value|[0]]" --output table
  echo "Set VPC_ID manually and re-run."
  exit 1
fi

echo "Using VPC: $VPC_ID"

# Get 2 public subnets in different AZs (needed for ALB)
SUBNET_IDS=$(aws ec2 describe-subnets \
  --region "$REGION" \
  --filters "Name=vpc-id,Values=$VPC_ID" \
  --query "Subnets[?MapPublicIpOnLaunch==\`true\`] | sort_by(@, &AvailabilityZone)[0:2].SubnetId" \
  --output text)

SUBNET_1=$(echo "$SUBNET_IDS" | awk '{print $1}')
SUBNET_2=$(echo "$SUBNET_IDS" | awk '{print $2}')

if [ -z "$SUBNET_1" ] || [ -z "$SUBNET_2" ]; then
  echo "Could not find 2 public subnets. List subnets manually:"
  aws ec2 describe-subnets --region "$REGION" --filters "Name=vpc-id,Values=$VPC_ID" \
    --query "Subnets[*].[SubnetId,AvailabilityZone,MapPublicIpOnLaunch]" --output table
  exit 1
fi

echo "Using subnets: $SUBNET_1, $SUBNET_2"

# Get private subnets for RDS (if available, else use public)
PRIVATE_SUBNET_IDS=$(aws ec2 describe-subnets \
  --region "$REGION" \
  --filters "Name=vpc-id,Values=$VPC_ID" "Name=map-public-ip-on-launch,Values=false" \
  --query "Subnets | sort_by(@, &AvailabilityZone)[0:2].SubnetId" \
  --output text)

PRIV_SUBNET_1=$(echo "$PRIVATE_SUBNET_IDS" | awk '{print $1}')
PRIV_SUBNET_2=$(echo "$PRIVATE_SUBNET_IDS" | awk '{print $2}')

# Fallback to public subnets if no private ones
if [ -z "$PRIV_SUBNET_1" ] || [ -z "$PRIV_SUBNET_2" ]; then
  PRIV_SUBNET_1="$SUBNET_1"
  PRIV_SUBNET_2="$SUBNET_2"
  echo "No private subnets found, using public subnets for RDS."
fi

# ---------- STEP 1: Security Groups ----------
echo ""
echo "==> Creating Security Groups..."

# ALB SG — allow HTTP from internet
ALB_SG=$(aws ec2 create-security-group \
  --region "$REGION" \
  --group-name "${PROJECT}-alb-sg" \
  --description "ALB SG for ${PROJECT}" \
  --vpc-id "$VPC_ID" \
  --query "GroupId" --output text)

aws ec2 authorize-security-group-ingress \
  --region "$REGION" \
  --group-id "$ALB_SG" \
  --protocol tcp --port 80 --cidr 0.0.0.0/0

echo "ALB SG: $ALB_SG"

# ECS SG — allow traffic from ALB only
ECS_SG=$(aws ec2 create-security-group \
  --region "$REGION" \
  --group-name "${PROJECT}-ecs-sg" \
  --description "ECS SG for ${PROJECT}" \
  --vpc-id "$VPC_ID" \
  --query "GroupId" --output text)

aws ec2 authorize-security-group-ingress \
  --region "$REGION" \
  --group-id "$ECS_SG" \
  --protocol tcp --port 3000 --source-group "$ALB_SG"

echo "ECS SG: $ECS_SG"

# RDS SG — allow Postgres from ECS only
RDS_SG=$(aws ec2 create-security-group \
  --region "$REGION" \
  --group-name "${PROJECT}-rds-sg" \
  --description "RDS SG for ${PROJECT}" \
  --vpc-id "$VPC_ID" \
  --query "GroupId" --output text)

aws ec2 authorize-security-group-ingress \
  --region "$REGION" \
  --group-id "$RDS_SG" \
  --protocol tcp --port 5432 --source-group "$ECS_SG"

echo "RDS SG: $RDS_SG"

# ---------- STEP 2: RDS PostgreSQL ----------
echo ""
echo "==> Creating RDS Subnet Group..."

aws rds create-db-subnet-group \
  --region "$REGION" \
  --db-subnet-group-name "${PROJECT}-db-subnet-group" \
  --db-subnet-group-description "UAT DB subnet group" \
  --subnet-ids "$PRIV_SUBNET_1" "$PRIV_SUBNET_2"

echo "==> Creating RDS instance (this takes ~5-10 min)..."
# CHANGE the master password before running!
DB_PASSWORD="CHANGE_ME_$(openssl rand -hex 8)"

aws rds create-db-instance \
  --region "$REGION" \
  --db-instance-identifier "${PROJECT}-db" \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version "16.4" \
  --master-username arifac_admin \
  --master-user-password "$DB_PASSWORD" \
  --allocated-storage 20 \
  --db-name arifac_uat \
  --vpc-security-group-ids "$RDS_SG" \
  --db-subnet-group-name "${PROJECT}-db-subnet-group" \
  --no-publicly-accessible \
  --backup-retention-period 7 \
  --storage-type gp3 \
  --no-multi-az

echo ""
echo "============================================"
echo "  RDS Master Password: $DB_PASSWORD"
echo "  SAVE THIS — it won't be shown again!"
echo "============================================"
echo ""

echo "Waiting for RDS to become available..."
aws rds wait db-instance-available \
  --region "$REGION" \
  --db-instance-identifier "${PROJECT}-db"

# Get RDS endpoint
RDS_ENDPOINT=$(aws rds describe-db-instances \
  --region "$REGION" \
  --db-instance-identifier "${PROJECT}-db" \
  --query "DBInstances[0].Endpoint.Address" --output text)

DATABASE_URL="postgresql://arifac_admin:${DB_PASSWORD}@${RDS_ENDPOINT}:5432/arifac_uat"
echo "RDS Endpoint: $RDS_ENDPOINT"
echo "DATABASE_URL: $DATABASE_URL"

# ---------- STEP 3: ALB + Target Group ----------
echo ""
echo "==> Creating ALB..."

ALB_ARN=$(aws elbv2 create-load-balancer \
  --region "$REGION" \
  --name "${PROJECT}-alb" \
  --subnets "$SUBNET_1" "$SUBNET_2" \
  --security-groups "$ALB_SG" \
  --scheme internet-facing \
  --type application \
  --query "LoadBalancers[0].LoadBalancerArn" --output text)

ALB_DNS=$(aws elbv2 describe-load-balancers \
  --region "$REGION" \
  --load-balancer-arns "$ALB_ARN" \
  --query "LoadBalancers[0].DNSName" --output text)

echo "ALB ARN: $ALB_ARN"
echo "ALB DNS: $ALB_DNS"

echo "==> Creating Target Group..."

TG_ARN=$(aws elbv2 create-target-group \
  --region "$REGION" \
  --name "${PROJECT}-tg" \
  --protocol HTTP \
  --port 3000 \
  --vpc-id "$VPC_ID" \
  --target-type ip \
  --health-check-path "/" \
  --health-check-interval-seconds 30 \
  --healthy-threshold-count 2 \
  --unhealthy-threshold-count 3 \
  --query "TargetGroups[0].TargetGroupArn" --output text)

echo "Target Group ARN: $TG_ARN"

echo "==> Creating ALB Listener (HTTP:80 -> TG)..."

aws elbv2 create-listener \
  --region "$REGION" \
  --load-balancer-arn "$ALB_ARN" \
  --protocol HTTP \
  --port 80 \
  --default-actions "Type=forward,TargetGroupArn=$TG_ARN"

# ---------- STEP 4: ECS Cluster ----------
echo ""
echo "==> Creating ECS Cluster..."

aws ecs create-cluster \
  --region "$REGION" \
  --cluster-name "${PROJECT}-cluster"

# ---------- STEP 5: IAM Role for ECS Task ----------
echo ""
echo "==> Creating ECS Task Execution Role (if not exists)..."

EXECUTION_ROLE_NAME="ecsTaskExecutionRole"
EXECUTION_ROLE_ARN=$(aws iam get-role \
  --role-name "$EXECUTION_ROLE_NAME" \
  --query "Role.Arn" --output text 2>/dev/null || true)

if [ -z "$EXECUTION_ROLE_ARN" ] || [ "$EXECUTION_ROLE_ARN" = "None" ]; then
  aws iam create-role \
    --role-name "$EXECUTION_ROLE_NAME" \
    --assume-role-policy-document '{
      "Version": "2012-10-17",
      "Statement": [{
        "Effect": "Allow",
        "Principal": {"Service": "ecs-tasks.amazonaws.com"},
        "Action": "sts:AssumeRole"
      }]
    }'

  aws iam attach-role-policy \
    --role-name "$EXECUTION_ROLE_NAME" \
    --policy-arn "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"

  EXECUTION_ROLE_ARN=$(aws iam get-role \
    --role-name "$EXECUTION_ROLE_NAME" \
    --query "Role.Arn" --output text)
fi

echo "Execution Role: $EXECUTION_ROLE_ARN"

# ---------- STEP 6: Get ECR image URI ----------
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
ECR_IMAGE="${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/arifac:latest"

# ---------- STEP 7: ECS Task Definition ----------
echo ""
echo "==> Registering ECS Task Definition..."

cat > /tmp/arifac-uat-task-def.json <<TASKDEF
{
  "family": "${PROJECT}-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "${EXECUTION_ROLE_ARN}",
  "containerDefinitions": [
    {
      "name": "arifac",
      "image": "${ECR_IMAGE}",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {"name": "NODE_ENV", "value": "production"},
        {"name": "DATABASE_URL", "value": "${DATABASE_URL}"},
        {"name": "PORT", "value": "3000"},
        {"name": "HOSTNAME", "value": "0.0.0.0"}
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/${PROJECT}",
          "awslogs-region": "${REGION}",
          "awslogs-stream-prefix": "ecs",
          "awslogs-create-group": "true"
        }
      },
      "essential": true
    }
  ]
}
TASKDEF

aws ecs register-task-definition \
  --region "$REGION" \
  --cli-input-json file:///tmp/arifac-uat-task-def.json

# ---------- STEP 8: ECS Service ----------
echo ""
echo "==> Creating ECS Service..."

aws ecs create-service \
  --region "$REGION" \
  --cluster "${PROJECT}-cluster" \
  --service-name "${PROJECT}-service" \
  --task-definition "${PROJECT}-task" \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[$SUBNET_1,$SUBNET_2],securityGroups=[$ECS_SG],assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=$TG_ARN,containerName=arifac,containerPort=3000"

# ---------- STEP 9: Run Prisma Migrations ----------
echo ""
echo "============================================"
echo "  UAT INFRASTRUCTURE CREATED SUCCESSFULLY"
echo "============================================"
echo ""
echo "  ALB URL:      http://$ALB_DNS"
echo "  RDS Endpoint: $RDS_ENDPOINT"
echo "  DATABASE_URL: $DATABASE_URL"
echo "  DB Password:  $DB_PASSWORD"
echo ""
echo "  Next steps:"
echo "  1. Save the DATABASE_URL and password securely"
echo "  2. Run Prisma migrations against the UAT database:"
echo "     DATABASE_URL=\"$DATABASE_URL\" pnpm prisma migrate deploy"
echo "  3. Push to the 'uat' branch to trigger deployment"
echo "  4. Access the app at: http://$ALB_DNS"
echo ""
echo "  To add env vars later, update the task definition"
echo "  in the AWS Console or re-register via CLI."
echo "============================================"
