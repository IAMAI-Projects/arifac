# Red Color Scheme Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the entire blue/navy color scheme with a bright red scheme (`#E72A2F`) and tokenize all colors so future changes require editing only `globals.css`.

**Architecture:** Update CSS custom properties in `globals.css` as the single source of truth. Then sweep every component and page to replace hardcoded navy/blue Tailwind classes with token-based classes. Update `design-tokens.ts` to match.

**Tech Stack:** Tailwind CSS v4, Next.js App Router, CSS custom properties via `@theme inline`

**Spec:** `docs/superpowers/specs/2026-04-11-red-color-scheme-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/globals.css` | Modify | Token definitions (single source of truth) |
| `src/design-tokens.ts` | Modify | JS-side color palette documentation |
| `src/components/Header.tsx` | Modify | Top bar + nav color refs (3 occurrences) |
| `src/components/Footer.tsx` | Modify | Footer bg + section headings (4 occurrences) |
| `src/components/Hero.tsx` | Modify | Heading + CTA colors (4 occurrences) |
| `src/components/StatsStrip.tsx` | Modify | Stats section bg + labels (2 occurrences) |
| `src/components/PageBanner.tsx` | Modify | Banner bg (1 occurrence) |
| `src/components/CapabilityMatrix.tsx` | Modify | Heading + link colors (3 occurrences) |
| `src/components/FeaturedPrograms.tsx` | Modify | Hover overlay color (1 occurrence) |
| `src/components/RegulatoryDashboard.tsx` | Modify | Badge colors (1 occurrence) |
| `src/components/CommunitySection.tsx` | Modify | Section bg + accent colors (12 occurrences) |
| `src/components/StaticPageLayout.tsx` | Modify | Heading color (1 occurrence) |
| `src/app/page.tsx` | Modify | CTA section colors (2 occurrences) |
| `src/app/about/page.tsx` | Modify | Section bgs + headings (10 occurrences) |
| `src/app/certifications/page.tsx` | Modify | Sidebar + cards + badges (11 occurrences) |
| `src/app/updates/page.tsx` | Modify | Badge colors + pagination (9 occurrences) |
| `src/app/programmes/page.tsx` | Modify | Headings + table header (9 occurrences) |
| `src/app/gallery/page.tsx` | Modify | CTA section (3 occurrences) |
| `src/app/member-benefits/page.tsx` | Modify | CTA section (3 occurrences) |
| `src/app/contact/page.tsx` | Modify | Heading + link colors (3 occurrences) |
| `src/app/resources/page.tsx` | Modify | Heading + link colors (2 occurrences) |
| `src/app/help/page.tsx` | Modify | Link colors (2 occurrences) |
| `src/app/training-leads/page.tsx` | Modify | Heading + badge colors (2 occurrences) |
| `src/app/privacy/page.tsx` | Modify | Heading colors (2 occurrences) |
| `src/app/faqs/page.tsx` | Modify | Heading color (1 occurrence) |
| `src/app/meetings/page.tsx` | Modify | Item text color (1 occurrence) |
| `src/app/sectoral-nodal-officers/page.tsx` | Modify | Heading color (1 occurrence) |
| `src/app/membership/launching-soon/page.tsx` | Modify | Button color (1 occurrence) |
| `src/app/layout.tsx` | Modify | Body class color ref |

---

### Task 1: Update Color Tokens in globals.css

**Files:**
- Modify: `src/app/globals.css:1-13`

This is the foundation — everything else depends on these tokens being correct.

- [ ] **Step 1: Replace the `@theme inline` block**

In `src/app/globals.css`, replace the current `@theme inline` block:

```css
@theme inline {
  --color-brand: #005A87;
  --color-brand-light: #4BA9D9; 
  --color-navy: #0A1932;
  --color-navy-dark: #020617;
}
```

With:

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

- [ ] **Step 2: Update the `:root` foreground color**

Change:

```css
:root {
  --background: #ffffff;
  --foreground: #0f172a; /* Slate 900 */
}
```

To:

```css
:root {
  --background: #ffffff;
  --foreground: #1a1a1a;
}
```

- [ ] **Step 3: Verify the dev server compiles without errors**

Run: `pnpm dev` (or check existing dev server terminal)
Expected: No CSS compilation errors. The site should already show red accents where `bg-brand` / `text-brand` were used, since those classes now resolve to `#E72A2F`. Sections using `bg-navy` will break (class no longer defined) — that's expected and fixed in subsequent tasks.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: update color tokens from blue/navy to red scheme"
```

---

### Task 2: Update design-tokens.ts

**Files:**
- Modify: `src/design-tokens.ts`

- [ ] **Step 1: Replace the entire colors object**

Replace the `colors` property of the `tokens` object in `src/design-tokens.ts` with:

```typescript
colors: {
    // === PRIMARY: Brand Red — IAMAI Red ===
    brand: {
      50: '#FEE2E2',
      100: '#FECACA',
      200: '#FCA5A5',
      300: '#F87171',
      400: '#F06668',
      500: '#E72A2F',  // Main brand — IAMAI Red
      600: '#B81F23',
      700: '#8B1A1A',
      800: '#5C1414',
      900: '#3D0C0C',
      950: '#1A0505',
    },

    // === NEUTRALS: Clean, professional grays ===
    neutral: {
      0: '#FFFFFF',
      50: '#F8F9FA',
      100: '#F1F3F5',
      200: '#E9ECEF',
      300: '#DEE2E6',
      400: '#CED4DA',
      500: '#ADB5BD',
      600: '#868E96',
      700: '#495057',
      800: '#343A40',
      900: '#212529',
      950: '#0D0F11',
    },

    // === SEMANTIC ===
    success: '#0D8A56',
    warning: '#E5A100',
    error: '#D1293D',
    info: '#E72A2F',
  },
```

- [ ] **Step 2: Commit**

```bash
git add src/design-tokens.ts
git commit -m "feat: update design tokens to red color palette"
```

---

### Task 3: Migrate Shared Components (Header, Footer, Hero, StatsStrip, PageBanner)

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/StatsStrip.tsx`
- Modify: `src/components/PageBanner.tsx`

These are the highest-impact components — they appear on every page.

- [ ] **Step 1: Update Header.tsx**

In `src/components/Header.tsx`:

Line 8 — top bar background:
```
bg-navy text-white
```
Replace with:
```
bg-brand text-white
```

Line 8 — border on top bar:
```
border-b border-white/5
```
Replace with:
```
border-b border-white/10
```

Line 92 — dropdown link "All Certifications":
```
text-navy block leading-tight group-hover/item:text-brand
```
Replace with:
```
text-slate-900 block leading-tight group-hover/item:text-brand
```

Line 103 — dropdown link "Training Leads" (same pattern):
```
text-navy block leading-tight group-hover/item:text-brand
```
Replace with:
```
text-slate-900 block leading-tight group-hover/item:text-brand
```

- [ ] **Step 2: Update Footer.tsx**

In `src/components/Footer.tsx`:

Line 30 — footer background:
```
bg-navy text-white
```
Replace with:
```
bg-brand-dark text-white
```

Lines 50, 61, 72 — section headings (3 occurrences):
```
text-cyan-400
```
Replace all with:
```
text-brand-on-dark
```

- [ ] **Step 3: Update Hero.tsx**

In `src/components/Hero.tsx`:

Line 21 — hero heading:
```
text-navy leading-[1.1]
```
Replace with:
```
text-slate-900 leading-[1.1]
```

Line 30 — "Membership Benefits" button:
```
bg-navy text-white px-7 py-3.5 lg:px-8 lg:py-4 text-[14px] font-bold hover:bg-brand
```
Replace with:
```
bg-brand text-white px-7 py-3.5 lg:px-8 lg:py-4 text-[14px] font-bold hover:bg-brand-dark
```

Line 36 — "Explore Certifications" link:
```
text-navy font-bold text-[14px] border-b-2 border-navy hover:text-brand hover:border-brand
```
Replace with:
```
text-slate-900 font-bold text-[14px] border-b-2 border-slate-900 hover:text-brand hover:border-brand
```

Line 51 — "FIU-INDIA" text:
```
text-navy leading-none
```
Replace with:
```
text-slate-900 leading-none
```

- [ ] **Step 4: Update StatsStrip.tsx**

In `src/components/StatsStrip.tsx`:

Line 10 — section background:
```
bg-navy border-y border-white/10
```
Replace with:
```
bg-brand border-y border-white/10
```

Line 16 — stat labels:
```
text-cyan-400
```
Replace with:
```
text-brand-on-dark
```

- [ ] **Step 5: Update PageBanner.tsx**

In `src/components/PageBanner.tsx`:

Line 9 — banner background:
```
bg-navy pt-10
```
Replace with:
```
bg-brand pt-10
```

- [ ] **Step 6: Verify in browser**

Open the home page and an inner page (e.g. `/about`). Check:
- Header top bar is red
- Footer is dark red
- Stats strip is red with cream labels
- Page banners are red
- Hero headings are dark neutral (not blue-toned)

- [ ] **Step 7: Commit**

```bash
git add src/components/Header.tsx src/components/Footer.tsx src/components/Hero.tsx src/components/StatsStrip.tsx src/components/PageBanner.tsx
git commit -m "feat: migrate shared components to red color scheme"
```

---

### Task 4: Migrate Remaining Shared Components

**Files:**
- Modify: `src/components/CapabilityMatrix.tsx`
- Modify: `src/components/FeaturedPrograms.tsx`
- Modify: `src/components/RegulatoryDashboard.tsx`
- Modify: `src/components/CommunitySection.tsx`
- Modify: `src/components/StaticPageLayout.tsx`

- [ ] **Step 1: Update CapabilityMatrix.tsx**

In `src/components/CapabilityMatrix.tsx`:

Line 34 — section heading:
```
text-navy leading-tight
```
Replace with:
```
text-slate-900 leading-tight
```

Line 55 — card title:
```
text-navy mb-5
```
Replace with:
```
text-slate-900 mb-5
```

Line 63 — card link:
```
text-navy font-bold
```
Replace with:
```
text-slate-900 font-bold
```

- [ ] **Step 2: Update FeaturedPrograms.tsx**

In `src/components/FeaturedPrograms.tsx`:

Line 49 — image hover overlay:
```
bg-navy opacity-0
```
Replace with:
```
bg-brand opacity-0
```

- [ ] **Step 3: Update RegulatoryDashboard.tsx**

In `src/components/RegulatoryDashboard.tsx`:

Line 45 — RBI badge:
```
bg-blue-50 text-blue-600
```
Replace with:
```
bg-brand-subtle text-brand
```

- [ ] **Step 4: Update CommunitySection.tsx**

In `src/components/CommunitySection.tsx`:

Line 5 — section background:
```
bg-navy text-white
```
Replace with:
```
bg-brand text-white
```

Lines 13, 21, 26, 31, 36 — all `text-cyan-400` labels (5 occurrences):
Replace all `text-cyan-400` with `text-brand-on-dark`

Lines 22, 27, 32, 37 — hover states on card titles (4 occurrences):
```
group-hover:text-cyan-400
```
Replace all with:
```
group-hover:text-brand-on-dark
```

Line 45 — large "18+" number:
```
text-cyan-400
```
Replace with:
```
text-brand-on-dark
```

Line 47 — "Join the Network" button:
```
hover:bg-white hover:text-navy
```
Replace with:
```
hover:bg-white hover:text-brand
```

- [ ] **Step 5: Update StaticPageLayout.tsx**

In `src/components/StaticPageLayout.tsx`:

Line 53 — ContentSection heading:
```
text-navy leading-tight
```
Replace with:
```
text-slate-900 leading-tight
```

- [ ] **Step 6: Verify in browser**

Check the home page sections: CapabilityMatrix cards, FeaturedPrograms hover, RegulatoryDashboard badges (red instead of blue), CommunitySection (red background with cream labels).

- [ ] **Step 7: Commit**

```bash
git add src/components/CapabilityMatrix.tsx src/components/FeaturedPrograms.tsx src/components/RegulatoryDashboard.tsx src/components/CommunitySection.tsx src/components/StaticPageLayout.tsx
git commit -m "feat: migrate remaining shared components to red scheme"
```

---

### Task 5: Migrate Home Page and About Page

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Update page.tsx (home)**

In `src/app/page.tsx`:

Line 29 — CTA section background:
```
bg-navy p-8
```
Replace with:
```
bg-brand p-8
```

Line 38 — "Apply for Membership" button hover:
```
hover:bg-white hover:text-navy
```
Replace with:
```
hover:bg-white hover:text-brand
```

- [ ] **Step 2: Update about/page.tsx**

In `src/app/about/page.tsx`:

Lines 25, 85, 165 — section headings (3 occurrences):
```
text-navy leading-tight
```
Replace all with:
```
text-slate-900 leading-tight
```

Line 47 — risk item text:
```
text-navy uppercase
```
Replace with:
```
text-slate-900 uppercase
```

Line 54 — "Aligned With" section background:
```
bg-navy p-8 lg:p-10
```
Replace with:
```
bg-brand p-8 lg:p-10
```

Line 140 — card title:
```
text-navy mb-4
```
Replace with:
```
text-slate-900 mb-4
```

Line 171 — "Explore Membership" button:
```
bg-navy text-white px-6 py-3 text-[13px] font-bold hover:bg-brand
```
Replace with:
```
bg-brand text-white px-6 py-3 text-[13px] font-bold hover:bg-brand-dark
```

Line 193 — audience item icon background:
```
bg-navy/[0.06] group-hover:bg-brand/10
```
Replace with:
```
bg-brand/[0.06] group-hover:bg-brand/10
```

Line 194 — audience item number:
```
text-navy/40
```
Replace with:
```
text-slate-900/40
```

Line 197 — audience item name:
```
text-navy mb-1
```
Replace with:
```
text-slate-900 mb-1
```

- [ ] **Step 3: Verify in browser**

Check `/` CTA section (red background, white buttons). Check `/about` — all headings dark neutral, "Aligned With" section red, audience grid items properly colored.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/about/page.tsx
git commit -m "feat: migrate home and about pages to red scheme"
```

---

### Task 6: Migrate Certifications Page

**Files:**
- Modify: `src/app/certifications/page.tsx`

This page has the most color references (11 occurrences) and complex interactive states.

- [ ] **Step 1: Update tier strip icon backgrounds**

Line 160:
```
bg-navy/[0.03] text-brand
```
Replace with:
```
bg-brand/[0.06] text-brand
```

- [ ] **Step 2: Update tier strip heading**

Line 164:
```
text-navy uppercase
```
Replace with:
```
text-slate-900 uppercase
```

- [ ] **Step 3: Update filter sidebar header**

Line 188:
```
bg-navy px-5 py-4
```
Replace with:
```
bg-brand px-5 py-4
```

- [ ] **Step 4: Update filter button inactive states**

Lines 225 and 247 (two identical patterns for Level and Format filters):
```
text-navy hover:bg-slate-50 border border-transparent hover:border-slate-200
```
Replace both with:
```
text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200
```

- [ ] **Step 5: Update course card elements**

Line 286 — background index number:
```
text-navy/[0.04] group-hover:text-brand/[0.08]
```
Replace with:
```
text-slate-900/[0.04] group-hover:text-brand/[0.08]
```

Line 297 — card title:
```
text-navy mb-2
```
Replace with:
```
text-slate-900 mb-2
```

Lines 307 and 310 — meta tags (2 occurrences):
```
text-navy uppercase tracking-wider px-2.5 py-1 bg-navy/[0.04] border border-navy/10
```
Replace both with:
```
text-slate-900 uppercase tracking-wider px-2.5 py-1 bg-slate-900/[0.04] border border-slate-900/10
```

Line 323 — curriculum toggle button:
```
text-navy uppercase tracking-widest hover:text-brand
```
Replace with:
```
text-slate-900 uppercase tracking-widest hover:text-brand
```

Line 356 — "Enquire" button:
```
bg-navy text-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-brand
```
Replace with:
```
bg-brand text-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-brand-dark
```

- [ ] **Step 6: Verify in browser**

Check `/certifications` — filter sidebar header is red, active filter buttons are red, course cards have neutral headings, "Enquire" buttons are red with dark hover.

- [ ] **Step 7: Commit**

```bash
git add src/app/certifications/page.tsx
git commit -m "feat: migrate certifications page to red scheme"
```

---

### Task 7: Migrate Updates Page

**Files:**
- Modify: `src/app/updates/page.tsx`

- [ ] **Step 1: Update badge color mapping**

Line 166:
```
RBI: "bg-blue-50 text-blue-700 border-blue-200",
```
Replace with:
```
RBI: "bg-brand-subtle text-brand border-brand/20",
```

- [ ] **Step 2: Update all `text-navy` references**

Lines 284, 341, 342 — counter text (3 occurrences):
```
text-navy
```
Replace all with:
```
text-slate-900
```

Line 316 — card title:
```
text-navy leading-tight group-hover:text-brand
```
Replace with:
```
text-slate-900 leading-tight group-hover:text-brand
```

- [ ] **Step 3: Update pagination and button hover states**

Line 326 — "View" button hover:
```
hover:bg-navy hover:text-white hover:border-navy
```
Replace with:
```
hover:bg-brand hover:text-white hover:border-brand
```

Line 349 — prev button hover:
```
hover:bg-navy hover:text-white hover:border-navy
```
Replace with:
```
hover:bg-brand hover:text-white hover:border-brand
```

Line 358 — active page button:
```
bg-navy text-white border-navy
```
Replace with:
```
bg-brand text-white border-brand
```

Same line — inactive page button hover:
```
hover:border-navy hover:text-navy
```
Replace with:
```
hover:border-brand hover:text-brand
```

Line 367 — next button hover:
```
hover:bg-navy hover:text-white hover:border-navy
```
Replace with:
```
hover:bg-brand hover:text-white hover:border-brand
```

- [ ] **Step 4: Verify in browser**

Check `/updates` — RBI badges are red instead of blue, pagination buttons have red active/hover states.

- [ ] **Step 5: Commit**

```bash
git add src/app/updates/page.tsx
git commit -m "feat: migrate updates page to red scheme"
```

---

### Task 8: Migrate Programmes Page

**Files:**
- Modify: `src/app/programmes/page.tsx`

- [ ] **Step 1: Update all `text-navy` heading references**

Lines 237, 256, 296, 329, 346, 377, 406, 452 — headings and text that use `text-navy` (8 occurrences):
Replace all `text-navy` with `text-slate-900`

- [ ] **Step 2: Update table header**

Line 421:
```
bg-navy
```
Replace with:
```
bg-brand
```

- [ ] **Step 3: Verify in browser**

Check `/programmes` — all headings dark neutral, table header is red.

- [ ] **Step 4: Commit**

```bash
git add src/app/programmes/page.tsx
git commit -m "feat: migrate programmes page to red scheme"
```

---

### Task 9: Migrate Remaining Pages (Batch)

**Files:**
- Modify: `src/app/gallery/page.tsx`
- Modify: `src/app/member-benefits/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/resources/page.tsx`
- Modify: `src/app/help/page.tsx`
- Modify: `src/app/training-leads/page.tsx`
- Modify: `src/app/privacy/page.tsx`
- Modify: `src/app/faqs/page.tsx`
- Modify: `src/app/meetings/page.tsx`
- Modify: `src/app/sectoral-nodal-officers/page.tsx`
- Modify: `src/app/membership/launching-soon/page.tsx`
- Modify: `src/app/layout.tsx`

These pages have 1-3 occurrences each. Batch them together.

- [ ] **Step 1: Update gallery/page.tsx**

Line 49: `text-navy` → `text-slate-900`
Line 55: `bg-navy text-white` → `bg-brand text-white`
Line 59: `text-navy` in button → `text-brand`

- [ ] **Step 2: Update member-benefits/page.tsx**

Line 51: `text-navy` → `text-slate-900`
Line 56: `bg-navy text-white` → `bg-brand text-white`
Line 60: `hover:bg-white hover:text-navy` → `hover:bg-white hover:text-brand`

- [ ] **Step 3: Update contact/page.tsx**

Line 38: `text-navy` → `text-slate-900`
Line 40: `hover:text-navy` → `hover:text-slate-900`
Line 52: `text-navy hover:text-brand` → `text-slate-900 hover:text-brand`

- [ ] **Step 4: Update resources/page.tsx**

Line 44: `text-navy` → `text-slate-900`
Line 46: `hover:text-navy` → `hover:text-slate-900`

- [ ] **Step 5: Update help/page.tsx**

Line 21: `hover:text-navy` → `hover:text-slate-900`
Line 29: `text-navy hover:text-brand` → `text-slate-900 hover:text-brand`

- [ ] **Step 6: Update training-leads/page.tsx**

Line 74: `text-navy` → `text-slate-900`
Line 100: `text-navy/50 bg-navy/[0.04] border border-navy/[0.08]` → `text-slate-900/50 bg-slate-900/[0.04] border border-slate-900/[0.08]`

- [ ] **Step 7: Update privacy/page.tsx**

Lines 17, 24: `text-navy` → `text-slate-900` (2 occurrences)

- [ ] **Step 8: Update faqs/page.tsx**

Line 38: `text-navy` → `text-slate-900`

- [ ] **Step 9: Update meetings/page.tsx**

Line 25: `text-navy` → `text-slate-900`

- [ ] **Step 10: Update sectoral-nodal-officers/page.tsx**

Line 92: `text-navy` → `text-slate-900`

- [ ] **Step 11: Update membership/launching-soon/page.tsx**

Line 20: `bg-navy text-white ... hover:bg-brand` → `bg-brand text-white ... hover:bg-brand-dark`

- [ ] **Step 12: Update layout.tsx**

In `src/app/layout.tsx` line 33, the body class:
```
bg-white text-slate-900
```
No change needed — already uses `text-slate-900` which is correct.

- [ ] **Step 13: Verify in browser**

Spot-check 3-4 of these pages: `/gallery`, `/contact`, `/member-benefits`, `/membership/launching-soon`. Confirm no navy blue remains.

- [ ] **Step 14: Commit**

```bash
git add src/app/gallery/page.tsx src/app/member-benefits/page.tsx src/app/contact/page.tsx src/app/resources/page.tsx src/app/help/page.tsx src/app/training-leads/page.tsx src/app/privacy/page.tsx src/app/faqs/page.tsx src/app/meetings/page.tsx src/app/sectoral-nodal-officers/page.tsx src/app/membership/launching-soon/page.tsx
git commit -m "feat: migrate remaining pages to red scheme"
```

---

### Task 10: Final Verification Sweep

**Files:** None (read-only verification)

- [ ] **Step 1: Search for any remaining navy/blue references**

Run:
```bash
grep -rn 'bg-navy\|text-navy\|text-cyan-400\|bg-blue-50\|text-blue-600\|text-blue-700\|border-blue\|#005A87\|#4BA9D9\|#0A1932\|#020617' src/
```

Expected: **No results.** If any remain, fix them using the same replacement patterns.

- [ ] **Step 2: Search for any remaining hardcoded navy hex in globals.css**

Run:
```bash
grep -n 'navy' src/app/globals.css
```

Expected: **No results.**

- [ ] **Step 3: Full visual walkthrough**

Open these pages in order and verify red scheme is consistent:
1. `/` — Home (header, hero, stats, programs, regulatory, CTA, footer)
2. `/about` — About (banner, sections, audience grid)
3. `/certifications` — Certifications (filter sidebar, course cards)
4. `/updates` — Updates (badges, pagination)
5. `/programmes` — Programmes (headings, table)
6. `/contact` — Contact (headings, links)

- [ ] **Step 4: Commit any final fixes if needed**

```bash
git add -A
git commit -m "fix: clean up remaining color references"
```

Only run this step if Step 1 or 2 found remaining references.
