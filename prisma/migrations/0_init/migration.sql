-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "application_status" AS ENUM ('INIT', 'BASIC_SUBMITTED', 'UNDER_REVIEW', 'REJECTED', 'APPROVED', 'FULL_FORM_PENDING', 'FULL_FORM_SUBMITTED', 'VERIFIED', 'FEE_CALCULATED', 'PAYMENT_PENDING', 'PAYMENT_SUCCESS', 'ACTIVATION_PENDING', 'ACTIVE');

-- CreateEnum
CREATE TYPE "application_type" AS ENUM ('PRE_APPROVED', 'NON_PRE_APPROVED');

-- CreateEnum
CREATE TYPE "identifier_type" AS ENUM ('CIN', 'GST', 'PAN', 'LLPIN', 'TAN', 'FIU_REG', 'SEBI', 'RBI', 'IRDAI', 'OTHER');

-- CreateEnum
CREATE TYPE "membership_status" AS ENUM ('ACTIVE', 'EXPIRED', 'SUSPENDED', 'PENDING');

-- CreateEnum
CREATE TYPE "payment_status" AS ENUM ('INITIATED', 'SUCCESS', 'FAILED', 'REFUNDED');

-- CreateTable
CREATE TABLE "application_details" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "application_id" UUID,
    "sector" TEXT,
    "entity_type" TEXT,
    "aum_range" TEXT,
    "turnover_range" TEXT,
    "identifier_type" "identifier_type",
    "identifier_value" TEXT,
    "fiu_registration_number" TEXT,
    "iamai_certificate_url" TEXT,
    "iba_certificate_url" TEXT,
    "iba_membership_id" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "entity_type" TEXT,
    "entity_id" UUID,
    "action" TEXT,
    "performed_by" UUID,
    "metadata" JSONB,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flyway_schema_history" (
    "installed_rank" INTEGER NOT NULL,
    "version" VARCHAR(50),
    "description" VARCHAR(200) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "script" VARCHAR(1000) NOT NULL,
    "checksum" INTEGER,
    "installed_by" VARCHAR(100) NOT NULL,
    "installed_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "execution_time" INTEGER NOT NULL,
    "success" BOOLEAN NOT NULL,

    CONSTRAINT "flyway_schema_history_pk" PRIMARY KEY ("installed_rank")
);

-- CreateTable
CREATE TABLE "membership_applications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "application_type" "application_type" NOT NULL,
    "organisation_id" UUID,
    "user_id" UUID,
    "status" "application_status" NOT NULL DEFAULT 'INIT',
    "fee_amount" DECIMAL(12,2),
    "fee_waived" BOOLEAN DEFAULT false,
    "aum_range" TEXT,
    "turnover_range" TEXT,
    "is_iamai_member" BOOLEAN DEFAULT false,
    "is_iba_member" BOOLEAN DEFAULT false,
    "reviewed_by" UUID,
    "reviewed_at" TIMESTAMP(6),
    "rejection_reason" TEXT,
    "activation_token" TEXT,
    "activation_expiry" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "membership_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memberships" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organisation_id" UUID,
    "application_id" UUID,
    "status" "membership_status" NOT NULL DEFAULT 'ACTIVE',
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "certificate_url" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organisations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "website" TEXT,
    "sector" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "registered_address" TEXT NOT NULL,
    "regulated_entity" BOOLEAN NOT NULL,
    "identifier_type" "identifier_type" NOT NULL,
    "identifier_value" TEXT NOT NULL,
    "fiu_registration_number" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organisations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "application_id" UUID,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT DEFAULT 'INR',
    "status" "payment_status" NOT NULL,
    "provider" TEXT,
    "provider_payment_id" TEXT,
    "provider_order_id" TEXT,
    "paid_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organisation_id" UUID,
    "full_name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "aadhaar" TEXT,
    "passport" TEXT,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "is_primary" BOOLEAN DEFAULT true,
    "is_active" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "flyway_schema_history_s_idx" ON "flyway_schema_history"("success");

-- CreateIndex
CREATE INDEX "idx_application_status" ON "membership_applications"("status");

-- CreateIndex
CREATE UNIQUE INDEX "memberships_application_id_key" ON "memberships"("application_id");

-- CreateIndex
CREATE INDEX "idx_org_identifier" ON "organisations"("identifier_type", "identifier_value");

-- CreateIndex
CREATE UNIQUE INDEX "organisations_identifier_type_identifier_value_key" ON "organisations"("identifier_type", "identifier_value");

-- CreateIndex
CREATE UNIQUE INDEX "payments_provider_payment_id_key" ON "payments"("provider_payment_id");

-- CreateIndex
CREATE INDEX "idx_payment_status" ON "payments"("status");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "application_details" ADD CONSTRAINT "application_details_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "membership_applications"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "membership_applications" ADD CONSTRAINT "membership_applications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "membership_applications" ADD CONSTRAINT "membership_applications_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "organisations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "membership_applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "organisations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "membership_applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "organisations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

