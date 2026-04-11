# Design: Red Color Scheme Migration

**Date:** 2026-04-11
**Status:** Approved
**Scope:** Full color scheme transformation from blue/navy to red, with tokenized color architecture

## Summary

Replace the entire blue/navy color scheme with a bright red scheme based on the IAMAI red (`#E72A2F`). Simultaneously refactor the color system so all colors flow from CSS custom properties defined in one place (`globals.css`), making future color changes a 5-line edit.

## Color Palette

### New Tokens

| Token | Hex | Role |
|-------|-----|------|
| `--color-brand` | `#E72A2F` | Primary brand red. Header bar, footer, stats strip, page banners, CTA blocks, buttons, accent text, hover highlights |
| `--color-brand-light` | `#F06668` | Lighter red for gradients, subtle accents on banners, badge backgrounds |
| `--color-brand-dark` | `#B81F23` | Darker red for footer background, button hover states on red backgrounds |
| `--color-brand-darker` | `#8B1A1A` | Darkest variant for deep hover states |
| `--color-brand-subtle` | `#FEE2E2` | Very light red for badge/tag backgrounds (replaces `blue-50`) |
| `--color-brand-on-dark` | `rgba(255, 255, 255, 0.85)` | Label/accent text on red backgrounds (replaces `cyan-400`) |

### Unchanged

| Element | Value | Notes |
|---------|-------|-------|
| Text hierarchy | `slate-900` through `slate-300` | No change to gray text colors |
| Light backgrounds | `white`, `slate-50` | Section alternation stays |
| Borders | `slate-100/200/300` | Card and divider borders stay |
| Text selection | `selection:bg-brand selection:text-white` | Updates automatically via token |

### Mapping: Old to New

| Old Value | Old Role | New Token | New Value |
|-----------|----------|-----------|-----------|
| `#005A87` / `bg-brand` / `text-brand` | Brand blue accent | `brand` | `#E72A2F` |
| `#4BA9D9` / `bg-brand-light` / `text-brand-light` | Light blue accent | `brand-light` | `#F06668` |
| `#0A1932` / `bg-navy` / `text-navy` | Navy dark sections | `brand` | `#E72A2F` (bright red base) |
| `#020617` / `bg-navy-dark` | Darkest navy | `brand-dark` | `#B81F23` |
| `cyan-400` / `text-cyan-400` | Secondary accent on dark | `brand-on-dark` | `rgba(255,255,255,0.85)` |
| `blue-50` | Badge background | `brand-subtle` | `#FEE2E2` |
| `blue-600` | Badge text | `brand` | `#E72A2F` |
| `text-navy` (on white backgrounds) | Heading color | `text-slate-900` | Standard dark text |

## Color Architecture

### Single Source of Truth: `globals.css`

All color tokens defined via Tailwind v4 `@theme inline` block:

```css
@theme inline {
  --color-brand: #E72A2F;
  --color-brand-light: #F06668;
  --color-brand-dark: #B81F23;
  --color-brand-darker: #8B1A1A;
  --color-brand-subtle: #FEE2E2;
  --color-brand-on-dark: rgba(255, 255, 255, 0.85);
}
```

This generates Tailwind utility classes: `bg-brand`, `text-brand-light`, `hover:bg-brand-dark`, `bg-brand-subtle`, etc.

### Remove Old Tokens

Delete from `@theme inline`:
- `--color-navy`
- `--color-navy-dark`

These are replaced by `brand` and `brand-dark`.

### Update `design-tokens.ts`

Update the exported `tokens.colors` object to match the new CSS variables. This file serves as documentation and for any JS-side color references. CSS variables remain the primary source of truth.

### `:root` Variables

Update CSS custom properties:

```css
:root {
  --background: #ffffff;
  --foreground: #1a1a1a;
}
```

Change `--foreground` from `#0f172a` (slate-900 with blue undertone) to `#1a1a1a` (neutral dark).

## Component Changes

### What Changes in Every Component

Replace all hardcoded color references with token-based classes:

| Hardcoded Pattern | Replace With |
|-------------------|-------------|
| `bg-navy` | `bg-brand` |
| `text-navy` (headings on white) | `text-slate-900` |
| `text-navy` (used as dark brand) | `text-brand-dark` |
| `bg-navy` (dark sections) | `bg-brand` |
| `text-brand` | `text-brand` (no change, token value updates) |
| `bg-brand` | `bg-brand` (no change, token value updates) |
| `text-cyan-400` | `text-brand-on-dark` |
| `bg-blue-50` | `bg-brand-subtle` |
| `text-blue-600` | `text-brand` |
| `border-white/5` | `border-white/10` (slightly more visible on red) |
| `bg-brand/10`, `bg-brand/5` etc. | Keep as-is (opacity modifiers work with new brand) |
| `hover:text-brand` | Keep as-is (updates automatically) |
| `hover:bg-brand` | `hover:bg-brand-dark` (on red backgrounds, darken on hover) |
| `from-brand via-brand-light` | Keep as-is (gradient tokens update automatically) |

### Files to Modify

1. **`src/app/globals.css`** — Update `@theme inline` tokens, update `:root` variables
2. **`src/design-tokens.ts`** — Update color palette to match new scheme
3. **`src/app/layout.tsx`** — Update body class if any hardcoded colors
4. **`src/app/page.tsx`** — Replace `bg-navy`, `text-navy` references
5. **`src/components/Header.tsx`** — Top bar `bg-navy` -> `bg-brand`, nav hover states
6. **`src/components/Hero.tsx`** — `text-navy` headings -> `text-slate-900`
7. **`src/components/Footer.tsx`** — `bg-navy` -> `bg-brand-dark`, `text-cyan-400` -> `text-brand-on-dark`
8. **`src/components/PageBanner.tsx`** — `bg-navy` -> `bg-brand`, accent line gradient
9. **`src/components/StaticPageLayout.tsx`** — Selection colors (automatic via token)
10. **`src/components/StatsStrip.tsx`** — `bg-navy` -> `bg-brand`, `text-cyan-400` -> `text-brand-on-dark`
11. **`src/components/CapabilityMatrix.tsx`** — `text-navy` -> `text-slate-900`
12. **`src/components/FeaturedPrograms.tsx`** — `text-navy` -> `text-slate-900`, hover states
13. **`src/components/RegulatoryDashboard.tsx`** — `bg-blue-50`/`text-blue-600` badges -> `bg-brand-subtle`/`text-brand`
14. **`src/components/CommunitySection.tsx`** — `bg-navy` -> `bg-brand`, `text-cyan-400` -> `text-brand-on-dark`
15. **`src/app/about/page.tsx`** — `bg-navy` sections, `text-navy` headings
16. **`src/app/certifications/page.tsx`** — Filter sidebar `bg-navy`, badge colors
17. **All other `src/app/*/page.tsx`** — Any that use `StaticPageLayout` get updates via component changes; pages with custom layouts need direct edits

### Button Behavior on Red Backgrounds

Current: `bg-brand text-white hover:bg-white hover:text-navy`
New: `bg-white text-brand hover:bg-brand-dark hover:text-white` (invert — white buttons on red backgrounds)

For CTAs currently styled as `bg-navy text-white hover:bg-brand`:
New: `bg-brand-dark text-white hover:bg-white hover:text-brand`

### Hover States

| Context | Current Hover | New Hover |
|---------|--------------|-----------|
| Nav links on white | `hover:text-brand` | `hover:text-brand` (same, auto-updates) |
| Buttons on white bg | `hover:bg-brand` | `hover:bg-brand` (same) |
| Buttons on red bg | N/A | `hover:bg-brand-dark` or `hover:bg-white hover:text-brand` |
| Card borders | `hover:border-brand/40` | `hover:border-brand/40` (same) |
| Card titles | `group-hover:text-brand` | `group-hover:text-brand` (same) |

## Out of Scope

- No layout or structural changes
- No typography changes
- No content changes
- No new components
- No accessibility fixes beyond what the color change requires
- Logo/image assets (these are external images, not affected by CSS)
