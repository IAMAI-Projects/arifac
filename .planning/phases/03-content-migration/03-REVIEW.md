---
phase: 03-content-migration
reviewed: 2026-04-12T12:00:00Z
depth: standard
files_reviewed: 4
files_reviewed_list:
  - src/app/(frontend)/about/page.tsx
  - src/app/(payload)/api/seed/route.ts
  - src/collections/Pages.ts
  - src/payload-types.ts
findings:
  critical: 1
  warning: 2
  info: 1
  total: 4
status: issues_found
---

# Phase 3: Code Review Report

**Reviewed:** 2026-04-12T12:00:00Z
**Depth:** standard
**Files Reviewed:** 4
**Status:** issues_found

## Summary

Reviewed the CMS content migration files: the About page (Server Component fetching from Payload), the seed endpoint, the Pages collection config, and hand-written Payload types. The About page is well-structured with proper null coalescing and `notFound()` handling. The Pages collection schema is clean and correctly uses conditional admin visibility. The primary concerns are an unauthenticated seed endpoint exposed as a GET handler and type mismatches between the seed data and the Programme global type definition.

## Critical Issues

### CR-01: Seed endpoint has no authentication and uses GET for a write operation

**File:** `src/app/(payload)/api/seed/route.ts:73`
**Issue:** The seed endpoint is a `GET` handler with no authentication check. Any user or bot that discovers `/api/seed` can trigger database writes (creating pages, regulatory updates, news items, certifications, and updating globals). Using GET for a write operation also violates HTTP semantics -- crawlers, prefetch mechanisms, and link previews could inadvertently trigger it.
**Fix:** Add authentication and switch to POST. At minimum, gate on an environment variable or restrict to development:
```typescript
export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Seed endpoint disabled in production' }, { status: 403 })
  }

  const payload = await getPayload({ config: configPromise })
  // ... rest of seed logic
}
```
If this must remain accessible in non-dev environments, add Payload auth verification:
```typescript
const { user } = await payload.auth({ headers: req.headers })
if (!user || user.role !== 'admin') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

## Warnings

### WR-01: Programme global seed data has field name mismatches with type definition

**File:** `src/app/(payload)/api/seed/route.ts:211-217`
**Issue:** The seed data for the `programmes` global uses field names that do not match the `Programme` type in `payload-types.ts`. Specifically:

- `programmeSchedule` items use `{ title, date, location, status }` but the type expects `{ name, type, date }` (lines 303-308 of payload-types.ts). The field `title` should be `name`, `location` should be `type`, and `status` does not exist on the type.
- `annualMeetings` items use `{ title, date, location, status }` but the type expects `{ name, date, location }` (lines 309-314). The field `title` should be `name`, and `status` does not exist on the type.

This will cause the seed data to be stored with wrong field names, meaning the frontend reading these fields by their typed names will get `undefined`.
**Fix:** Align the seed data with the type definition:
```typescript
programmeSchedule: [
  { name: 'Q1 2026: AML Fundamentals Bootcamp', type: 'Workshop', date: '2026-01-15' },
  { name: 'Q2 2026: Advanced Transaction Monitoring', type: 'Training', date: '2026-04-10' },
],
annualMeetings: [
  { name: 'ARIFAC Annual Conference 2026', date: '2026-09-15', location: 'Mumbai' },
],
```

### WR-02: Page body type definition does not match Lexical rich text structure

**File:** `src/payload-types.ts:95`
**Issue:** The `body` field on the `Page` type is defined as `Record<string, unknown>[] | null` (an array of objects). However, Payload's Lexical rich text editor stores data as a single root object `{ root: { type: 'root', children: [...] } }`, which is what the seed route correctly produces via `lexicalRoot()`. The type mismatch means TypeScript will not catch structural errors in rich text data, and consumers of the type may incorrectly assume `body` is an array rather than a Lexical document object.
**Fix:** Update the type to match the actual Lexical structure:
```typescript
body?: {
  root: {
    type: 'root'
    children: unknown[]
    direction: 'ltr' | 'rtl' | null
    format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'
    indent: number
    version: number
  }
} | null
```
Alternatively, regenerate types once Payload CLI compatibility is resolved (as noted in the file header comment).

## Info

### IN-01: Audience numbering format will break at 10+ items

**File:** `src/app/(frontend)/about/page.tsx:149`
**Issue:** The audience index display uses template literal ``0{idx + 1}`` which produces `01` through `09` correctly but would show `010`, `011`, etc. for items at index 9+. Currently there are 8 audiences so this is not a bug today, but the format is fragile if editors add more audiences via CMS.
**Fix:** Use `String.prototype.padStart` for consistent formatting:
```typescript
<span className="...">{String(idx + 1).padStart(2, '0')}</span>
```

---

_Reviewed: 2026-04-12T12:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
