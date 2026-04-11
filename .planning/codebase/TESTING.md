# Testing

## Current State
- **No test framework installed** — No Jest, Vitest, Playwright, or Cypress in dependencies
- **No test files** exist anywhere in the project
- **No CI/CD test step** configured

## If Tests Are Added
Recommended setup based on the tech stack:
- **Unit/Component tests**: Vitest + React Testing Library
- **E2E tests**: Playwright
- **Test directory**: `__tests__/` or colocated `*.test.tsx` files
