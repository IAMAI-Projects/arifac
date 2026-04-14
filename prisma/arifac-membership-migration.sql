-- ARFIAC Membership System Migration (PostgreSQL)
-- This file contains all the tables, enums, and indexes for the arifac-membership database.

-- Enable pgcrypto extension for UUID generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 1. ENUMERATIONS
-- ==========================================

-- application_status: Status tracking for the main membership application process (Snake Case context)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status') THEN
        CREATE TYPE application_status AS ENUM (
            'INIT', 'BASIC_SUBMITTED', 'UNDER_REVIEW', 'REJECTED', 'APPROVED', 
            'FULL_FORM_PENDING', 'FULL_FORM_SUBMITTED', 'VERIFIED', 'FEE_CALCULATED', 
            'PAYMENT_PENDING', 'PAYMENT_SUCCESS', 'ACTIVATION_PENDING', 'ACTIVE'
        );
    END IF;
END $$;

-- application_type: Type of membership application (Snake Case context)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_type') THEN
        CREATE TYPE application_type AS ENUM ('PRE_APPROVED', 'NON_PRE_APPROVED');
    END IF;
END $$;

-- identifier_type: Types of organizational identifiers (Snake Case context)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'identifier_type') THEN
        CREATE TYPE identifier_type AS ENUM (
            'CIN', 'GST', 'PAN', 'LLPIN', 'TAN', 'FIU_REG', 'SEBI', 'RBI', 'IRDAI', 'OTHER'
        );
    END IF;
END $$;

-- membership_status: Current status of an active or inactive membership (Snake Case context)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'membership_status') THEN
        CREATE TYPE membership_status AS ENUM ('ACTIVE', 'EXPIRED', 'SUSPENDED', 'PENDING');
    END IF;
END $$;

-- payment_status: Status tracking for payments (Snake Case context)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status') THEN
        CREATE TYPE payment_status AS ENUM ('INITIATED', 'SUCCESS', 'FAILED', 'REFUNDED');
    END IF;
END $$;

-- UserStatus: Status tracking for the newer user application flow (Pascal Case context)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'UserStatus') THEN
        CREATE TYPE "UserStatus" AS ENUM (
            'INITIATED', 'FORM_B_SUBMITTED', 'UNDER_ADMIN_REVIEW', 'APPROVED_STAGE1', 
            'RESUME_PENDING', 'IAMAI_PENDING', 'PAYMENT_PENDING', 'POST_FORM_SUBMITTED', 
            'FINAL_REVIEW', 'ACTIVE'
        );
    END IF;
END $$;

-- FormBStatus: Status for Form B submissions (Pascal Case context)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'FormBStatus') THEN
        CREATE TYPE "FormBStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
    END IF;
END $$;

-- ApprovalStage: Stages of the approval workflow (Pascal Case context)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ApprovalStage') THEN
        CREATE TYPE "ApprovalStage" AS ENUM ('FORM_B', 'FINAL');
    END IF;
END $$;

-- ApprovalStatus: Status of reviews and approvals (Pascal Case context)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ApprovalStatus') THEN
        CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
    END IF;
END $$;

-- AdminRole: Role of administrators (Pascal Case context)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'AdminRole') THEN
        CREATE TYPE "AdminRole" AS ENUM ('ARIFAC_ADMIN', 'Admin');
    END IF;
END $$;

-- PaymentStatus: Status for newer payment system (Pascal Case context)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PaymentStatus') THEN
        CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');
    END IF;
END $$;

-- ==========================================
-- 2. TABLES
-- ==========================================

-- Organisations Table (Set 1)
CREATE TABLE IF NOT EXISTS organisations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    website TEXT,
    sector TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    registered_address TEXT NOT NULL,
    regulated_entity BOOLEAN NOT NULL,
    identifier_type identifier_type NOT NULL,
    identifier_value TEXT NOT NULL,
    fiu_registration_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(identifier_type, identifier_value)
);

-- Users Table (Set 1 - Primary user tracking)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id UUID REFERENCES organisations(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    designation TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    mobile TEXT NOT NULL,
    aadhaar TEXT,
    passport TEXT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Membership Applications Table (Set 1)
CREATE TABLE IF NOT EXISTS membership_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_type application_type NOT NULL,
    organisation_id UUID REFERENCES organisations(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status application_status DEFAULT 'INIT',
    fee_amount DECIMAL(12, 2),
    fee_waived BOOLEAN DEFAULT false,
    aum_range TEXT,
    turnover_range TEXT,
    is_iamai_member BOOLEAN DEFAULT false,
    is_iba_member BOOLEAN DEFAULT false,
    reviewed_by UUID,
    reviewed_at TIMESTAMP,
    rejection_reason TEXT,
    activation_token TEXT,
    activation_expiry TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Application Details Table (Set 1 - Deep details for an application)
CREATE TABLE IF NOT EXISTS application_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES membership_applications(id) ON DELETE CASCADE,
    sector TEXT,
    entity_type TEXT,
    aum_range TEXT,
    turnover_range TEXT,
    identifier_type identifier_type,
    identifier_value TEXT,
    fiu_registration_number TEXT,
    iamai_certificate_url TEXT,
    iba_certificate_url TEXT,
    iba_membership_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Memberships Table (Set 1 - Resulting memberships)
CREATE TABLE IF NOT EXISTS memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id UUID REFERENCES organisations(id) ON DELETE SET NULL,
    application_id UUID UNIQUE REFERENCES membership_applications(id) ON DELETE SET NULL,
    status membership_status DEFAULT 'ACTIVE',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    certificate_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments Table (Set 1 - Payment transactions)
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES membership_applications(id) ON DELETE SET NULL,
    amount DECIMAL(12, 2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    status payment_status NOT NULL,
    provider TEXT,
    provider_payment_id TEXT UNIQUE,
    provider_order_id TEXT,
    paid_at TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit Logs Table (Set 1 - Audit tracking)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT,
    entity_id UUID,
    action TEXT,
    performed_by UUID,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- password_reset_tokens Table (Set 1 - Token for password reset)
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 3. NEWER SYSTEM TABLES (Pascal Case Models)
-- ==========================================

-- User Table (Set 2 - Newer specific user model)
CREATE TABLE IF NOT EXISTS "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password TEXT,
    status "UserStatus" DEFAULT 'INITIATED',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FormB Table (Set 2 - Membership Form B data)
CREATE TABLE IF NOT EXISTS "FormB" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID UNIQUE NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "organisationName" TEXT NOT NULL,
    details JSONB NOT NULL,
    status "FormBStatus" DEFAULT 'PENDING',
    "submittedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Table (Set 2 - Administration users)
CREATE TABLE IF NOT EXISTS "Admin" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role "AdminRole" DEFAULT 'Admin'
);

-- Approval Table (Set 2 - Approval workflow tracking)
CREATE TABLE IF NOT EXISTS "Approval" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    stage "ApprovalStage" NOT NULL,
    status "ApprovalStatus" DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    remarks TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ResumeToken Table (Set 2 - Session resumption)
CREATE TABLE IF NOT EXISTS "ResumeToken" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID UNIQUE NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    token TEXT UNIQUE NOT NULL,
    "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    used BOOLEAN DEFAULT false
);

-- Payment Table (Set 2 - Newer specific payment model)
CREATE TABLE IF NOT EXISTS "Payment" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID UNIQUE NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    status "PaymentStatus" DEFAULT 'PENDING',
    amount DECIMAL(12, 2) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 4. MISCELLANEOUS TABLES
-- ==========================================

-- flyway_schema_history: Included for compatibility with migration managers
CREATE TABLE IF NOT EXISTS flyway_schema_history (
    installed_rank INTEGER NOT NULL,
    version VARCHAR(50),
    description VARCHAR(200) NOT NULL,
    type VARCHAR(20) NOT NULL,
    script VARCHAR(1000) NOT NULL,
    checksum INTEGER,
    installed_by VARCHAR(100) NOT NULL,
    installed_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    execution_time INTEGER NOT NULL,
    success BOOLEAN NOT NULL,

    CONSTRAINT "flyway_schema_history_pk" PRIMARY KEY ("installed_rank")
);

-- ==========================================
-- 5. INDEXES
-- ==========================================

CREATE INDEX IF NOT EXISTS "flyway_schema_history_s_idx" ON "flyway_schema_history"("success");
CREATE INDEX IF NOT EXISTS "idx_application_status" ON "membership_applications"("status");
CREATE INDEX IF NOT EXISTS "idx_org_identifier" ON "organisations"("identifier_type", "identifier_value");
CREATE INDEX IF NOT EXISTS "idx_payment_status" ON "payments"("status");
