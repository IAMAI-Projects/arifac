# About Page — UI Review

**Audited:** 2026-04-10
**Baseline:** Abstract 6-pillar standards (no UI-SPEC.md)
**Screenshots:** Not captured (Playwright browsers not installed)
**File under review:** `src/app/about/page.tsx`

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 4/4 | Institutional tone is consistent; CTAs are specific and action-oriented |
| 2. Visuals | 3/4 | Strong hierarchy via brand accents and numbered cards; no icons or imagery on a text-heavy page |
| 3. Color | 4/4 | Palette strictly uses design-system tokens; no hardcoded hex values in component |
| 4. Typography | 3/4 | Clear hierarchy but 10 distinct arbitrary font sizes creates maintenance risk |
| 5. Spacing | 3/4 | Consistent section rhythm with max-w-[1240px]/px-6; sections feel vertically compressed |
| 6. Experience Design | 2/4 | No loading/error/empty states; static page has limited interactivity beyond hover |

**Overall: 19/24**

---

## Top 3 Priority Fixes

1. **Hero section vertical padding is compressed compared to homepage** — The About hero uses `pt-10 pb-10 lg:pt-14 lg:pb-14` while the homepage hero uses `pt-12 pb-10 lg:pt-16 lg:pb-20`. This makes the About page feel less authoritative on landing. Fix: increase to `pt-12 pb-12 lg:pt-16 lg:pb-20` to match homepage rhythm.

2. **9px label text in "Aligned With" card is too small for readability** — `text-[9px]` at line 84 is below the 10px minimum stated in the design language. On mobile, this risks being illegible. Fix: increase to `text-[10px]` to match the smallest label size used elsewhere.

3. **No accessibility attributes on any interactive or structural elements** — Zero `aria-*` labels, `role` attributes, or `sr-only` text found. The decorative brand bars (1px-wide colored divs) have no semantic meaning but the section structure lacks landmarks. Fix: add `aria-label` to each `<section>`, add `sr-only` labels to the decorative line+label pattern in the hero.

---

## Detailed Findings

### Pillar 1: Copywriting (4/4)

The page copy is strong. Specific findings:

- **No generic labels found.** Zero instances of "Submit", "Click Here", "OK", "Cancel", or "Save".
- **CTAs are specific and action-oriented:** "Contact Secretariat" (line 205) and "Membership Details" (line 208) clearly communicate destination and intent.
- **Section headings are scannable:** "Why ARIFAC", "What ARIFAC Does", "Who Should Engage", "Want to learn more?" form a logical narrative arc that guides the reader.
- **Institutional tone maintained:** Language like "reporting entities", "capacity building", "regulatory alignment" matches the editorial/consulting voice established on the homepage.
- **Bullet points in "What ARIFAC Does" are well-structured:** Each of the 4 capability cards has exactly 3 bullet points, creating scannable symmetry.
- **Minor note:** The hero paragraph (line 32) is a single 45-word sentence. Consider breaking into two sentences for better mobile readability.

### Pillar 2: Visuals (3/4)

- **Clear visual hierarchy through multiple devices:** Brand-colored accent bars (`w-1 h-3.5 bg-brand`, `w-1 h-4 bg-brand`), numbered labels ("01"--"04"), and the navy card in the "Why ARIFAC" section create focal points.
- **The navy "Aligned With" card (line 70)** is an effective visual anchor in an otherwise white/slate layout. The corner accent (`w-16 h-16 bg-brand/10`) adds a subtle branded touch.
- **"What ARIFAC Does" grid (line 106)** uses `gap-px bg-slate-200` to create a hairline-rule grid effect -- an elegant editorial pattern matching CapabilityMatrix.tsx card style.
- **Gap: No icons or imagery anywhere on the page.** The homepage hero features an FIU-India card with a logo. The About page is entirely text-driven across all 5 sections. Even simple SVG icons beside the threat items ("Cyber fraud", "Mule account networks") or capability card titles would improve visual engagement and scannability.
- **Gap: No decorative background treatment in the CTA section (line 194).** Compare with the homepage CTA (page.tsx line 29-30) which uses a navy card with a branded circle accent. The About CTA is plain white, making the page end feel flat.

### Pillar 3: Color (4/4)

- **All colors use design-system tokens.** No hardcoded hex values in the component. Colors used: `text-navy`, `text-brand`, `text-brand-light`, `bg-navy`, `bg-brand`, `bg-brand/10`, `bg-brand/50`, `text-slate-600`, `text-slate-300`, `bg-slate-50`, `border-slate-200`, `border-slate-100`, `border-white/10`.
- **60/30/10 split is well-maintained:**
  - 60% white/slate-50 backgrounds (sections alternate correctly)
  - 30% navy (hero text, card background, button)
  - 10% brand (#005A87) for accents, labels, and hover states
- **Brand accent usage is controlled.** `bg-brand` appears on: decorative bars, label text, hover states. It is never used for large background areas on this page.
- **Navy dark card contrast:** White text on `bg-navy` (#0A1932) provides excellent contrast (estimated >15:1 ratio).
- **Section alternation is consistent:** white -> slate-50 -> white -> slate-50 -> white, with `border-y border-slate-100` on slate-50 sections.

### Pillar 4: Typography (3/4)

Distinct font sizes found in `page.tsx` (arbitrary values):

| Size | Usage | Count |
|------|-------|-------|
| `text-[9px]` | Aligned With labels | 1 |
| `text-[11px]` | Section labels, threat items | 4 |
| `text-[12px]` | Hero eyebrow label | 1 |
| `text-[13px]` | CTAs, values, stakeholder items | 4 |
| `text-[14px]` | Body text in cards | 2 |
| `text-[15px]` | CTA paragraph | 1 |
| `text-[16px]` | Section body paragraphs | 2 |
| `text-[17px]` | Hero body (base) | 1 |
| `text-[18px]` | Card titles | 1 |
| `text-[19px]` | Hero body (lg) | 1 |
| `text-[30px]` | CTA heading (lg) | 1 |
| `text-[34px]` | Section headings (lg) | 3 |
| `text-[50px]` | Hero h1 (lg) | 1 |

Plus Tailwind scale: `text-2xl` (base for h2), `text-3xl` (base for h1), `text-5xl` (md for h1).

**That is 13+ distinct arbitrary sizes plus 3 Tailwind scale tokens.** While the design language calls for specific pixel values (10-12px labels, 14-17px body, 30-50px headings), the implementation uses nearly every integer pixel value in those ranges. This is internally consistent on this page but creates maintenance fragility.

- **Font weights are well-constrained:** Only `font-bold` and `font-extrabold` are used. This is clean and consistent with the design language.
- **The 9px text (line 84) violates the stated 10-12px label floor.** Should be `text-[10px]`.
- **Positive: heading hierarchy is correct.** h1 > h2 > h3 follows both semantic and visual size ordering.

### Pillar 5: Spacing (3/4)

- **Consistent container pattern:** All sections use `max-w-[1240px] mx-auto px-6`, matching the homepage and design specification exactly.
- **Section vertical rhythm:**
  - Hero: `pt-10 pb-10 lg:pt-14 lg:pb-14`
  - Content sections: `py-10 lg:py-14`
  - CTA section: `py-10 lg:py-14`
- **Compared to homepage:** Hero uses `pt-12 pb-10 lg:pt-16 lg:pb-20`, CapabilityMatrix uses `py-12 lg:py-16`, featured programs likely similar. The About page sections are uniformly ~15% more compact vertically.
- **Card internal spacing is consistent:** `p-6 lg:p-8` used uniformly across all card elements.
- **Grid gaps are appropriate:** `gap-6` for the 2-col layout, `gap-px` for the 4-card grid, `gap-4` for the stakeholder grid, `gap-5` for CTA buttons.
- **Content width constraints are used well:** `max-w-3xl` on introductory text blocks, `max-w-2xl` on the hero paragraph and CTA section.
- **Minor inconsistency:** The "Who Should Engage" section has no body paragraph under the h2 (line 168-170), while all other sections do. This creates a slightly different visual rhythm for that section.

### Pillar 6: Experience Design (2/4)

- **No loading states:** The page is entirely static with hardcoded data, so no loading states are needed -- but there is also no progressive enhancement.
- **No error boundaries:** No `error.tsx` in the `/about` directory. If the page throws, the user sees Next.js default error.
- **Hover states are present but limited:**
  - "Who Should Engage" cards: `hover:border-brand/40 transition-colors` (line 184) -- subtle and appropriate.
  - CTA buttons: `hover:bg-brand transition-all` (line 204) and `hover:text-brand hover:border-brand transition-all` (line 207).
  - No hover states on the "What ARIFAC Does" cards or the "Emerging Threats" items.
- **No focus-visible styles declared:** Keyboard navigation users will see browser defaults only. The homepage CapabilityMatrix has `hover:border-brand/40 hover:shadow-xl` but neither page addresses `focus-visible`.
- **No scroll-based animations:** The homepage uses `animate-in` classes. The About page has none, making it feel static compared to the homepage.
- **No `metadata` export:** The page is marked `"use client"` (line 1) and has no metadata. This means the About page will have no custom `<title>` or `<meta description>` -- a significant SEO gap for a key informational page.
- **The `"use client"` directive on line 1 is unnecessary.** The page has no client-side hooks, state, effects, or event handlers. All content is static. Removing it would allow server-side rendering and enable a `metadata` export.

---

## Files Audited

- `/Users/vk/Desktop/projects/arifac-new/src/app/about/page.tsx` (primary)
- `/Users/vk/Desktop/projects/arifac-new/src/app/globals.css` (design tokens)
- `/Users/vk/Desktop/projects/arifac-new/src/components/Header.tsx` (shared layout)
- `/Users/vk/Desktop/projects/arifac-new/src/components/Footer.tsx` (shared layout)
- `/Users/vk/Desktop/projects/arifac-new/src/app/page.tsx` (homepage reference)
- `/Users/vk/Desktop/projects/arifac-new/src/components/Hero.tsx` (homepage hero reference)
- `/Users/vk/Desktop/projects/arifac-new/src/components/CapabilityMatrix.tsx` (card pattern reference)
