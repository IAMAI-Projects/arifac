## Payload CMS Migrations

Schema changes are tracked here. Payload's db-postgres adapter uses Drizzle ORM
and applies schema changes when the application starts.

### Pending Schema Changes

- **03-01: About page fields** (2026-04-11)
  - Added `whySection`, `whatSection`, `whoSection` group fields to Pages collection
  - These fields are conditional on `pageType === 'about'`
  - Schema will be applied on next `pnpm dev` or `pnpm build` with DATABASE_URI configured

### Running Migrations

With a running PostgreSQL database:

```bash
# Set environment variables
export DATABASE_URI=postgresql://user:pass@localhost:5432/arifac
export PAYLOAD_SECRET=your-secret

# Start the dev server (auto-applies schema)
pnpm dev

# Or explicitly run migrations
npx payload migrate
```
