const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://postgres:postgres@localhost:5432/arifac-membership"
});

const sql = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id UUID,
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

-- And create organisations table if missing
CREATE TABLE IF NOT EXISTS organisations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  website TEXT,
  sector TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  registered_address TEXT NOT NULL,
  regulated_entity BOOLEAN NOT NULL,
  identifier_type TEXT NOT NULL,
  identifier_value TEXT NOT NULL,
  fiu_registration_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(identifier_type, identifier_value)
);

-- Associate users with organisations
ALTER TABLE users ADD CONSTRAINT fk_organisation FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON DELETE SET NULL;
`;

async function main() {
  await client.connect();
  console.log('Running SQL to create tables...');
  await client.query(sql);
  console.log('Tables created successfully!');
  await client.end();
}

main().catch(console.error);
