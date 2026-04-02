const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/arifac-membership"
});

const sql = `
DO $$ 
BEGIN
    -- Set 1 Enums
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status') THEN
        CREATE TYPE application_status AS ENUM ('INIT', 'BASIC_SUBMITTED', 'UNDER_REVIEW', 'REJECTED', 'APPROVED', 'FULL_FORM_PENDING', 'FULL_FORM_SUBMITTED', 'VERIFIED', 'FEE_CALCULATED', 'PAYMENT_PENDING', 'PAYMENT_SUCCESS', 'ACTIVATION_PENDING', 'ACTIVE');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_type') THEN
        CREATE TYPE application_type AS ENUM ('PRE_APPROVED', 'NON_PRE_APPROVED');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'identifier_type') THEN
        CREATE TYPE identifier_type AS ENUM ('CIN', 'GST', 'PAN', 'LLPIN', 'TAN', 'FIU_REG', 'SEBI', 'RBI', 'IRDAI', 'OTHER');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'membership_status') THEN
        CREATE TYPE membership_status AS ENUM ('ACTIVE', 'EXPIRED', 'SUSPENDED', 'PENDING');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status') THEN
        CREATE TYPE payment_status AS ENUM ('INITIATED', 'SUCCESS', 'FAILED', 'REFUNDED');
    END IF;

    -- Set 2 Enums
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'UserStatus') THEN
        CREATE TYPE "UserStatus" AS ENUM ('INITIATED', 'FORM_B_SUBMITTED', 'UNDER_ADMIN_REVIEW', 'APPROVED_STAGE1', 'RESUME_PENDING', 'IAMAI_PENDING', 'PAYMENT_PENDING', 'POST_FORM_SUBMITTED', 'FINAL_REVIEW', 'ACTIVE');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'FormBStatus') THEN
        CREATE TYPE "FormBStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ApprovalStage') THEN
        CREATE TYPE "ApprovalStage" AS ENUM ('FORM_B', 'FINAL');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ApprovalStatus') THEN
        CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'AdminRole') THEN
        CREATE TYPE "AdminRole" AS ENUM ('ARIFAC_ADMIN', 'Admin');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PaymentStatus') THEN
        CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');
    END IF;
END $$;

-- Set 1 Tables
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

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT,
  entity_id UUID,
  action TEXT,
  performed_by UUID,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set 2 Tables
CREATE TABLE IF NOT EXISTS "User" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT,
  status "UserStatus" DEFAULT 'INITIATED',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "FormB" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID UNIQUE NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "organisationName" TEXT NOT NULL,
  details JSONB NOT NULL,
  status "FormBStatus" DEFAULT 'PENDING',
  "submittedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Admin" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role "AdminRole" DEFAULT 'Admin'
);

CREATE TABLE IF NOT EXISTS "Approval" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  stage "ApprovalStage" NOT NULL,
  status "ApprovalStatus" DEFAULT 'PENDING',
  "reviewedBy" TEXT,
  remarks TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "ResumeToken" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID UNIQUE NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS "Payment" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID UNIQUE NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  status "PaymentStatus" DEFAULT 'PENDING',
  amount DECIMAL(12, 2) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

async function main() {
  await client.connect();
  console.log('Running SQL to create all tables...');
  await client.query(sql);
  console.log('All tables created successfully!');
  await client.end();
}

main().catch(console.error);
