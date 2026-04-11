---
status: partial
phase: 02-content-modeling-frontend-integration
source: [02-VERIFICATION.md]
started: 2026-04-12T14:45:00Z
updated: 2026-04-12T14:45:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Admin Panel Collection Visibility
expected: Open `/admin` and verify all collections (Pages, RegulatoryUpdates, Certifications, NewsItems) and globals (Programmes) appear with correct fields
result: [pending]

### 2. Home Page End-to-End CMS Rendering
expected: Create home page document with blocks, verify frontend renders all 6 sections (hero, stats, capability matrix, regulatory dashboard, featured programs, CTA)
result: [pending]

### 3. Static Pages via Dynamic Route
expected: Create page documents with various slugs, visit them, verify banner + rich text body rendering via [slug] route
result: [pending]

### 4. News Scroller Integration
expected: Add news items in admin, verify Header scroller displays them on all pages. When empty, top bar should hide.
result: [pending]

### 5. Version History / Audit Trail
expected: Edit content in admin, verify version history shows who changed what and when (AUDIT-01, AUDIT-02)
result: [pending]

### 6. Visual Fidelity
expected: Compare CMS-driven pages against pre-CMS design — layout, colors, typography, spacing should be identical
result: [pending]

## Summary

total: 6
passed: 0
issues: 0
pending: 6
skipped: 0
blocked: 0

## Gaps
