# ARIFAC LMS Design System Brief

Use this document as the single source of truth for visual design when building the ARIFAC Learning Management System. Every UI element must follow these specifications to maintain brand consistency with the main ARIFAC website.

---

## Design Philosophy

Corporate-professional aesthetic conveying **trust, authority, and expertise** in the AML/CFT compliance domain. The visual language is deliberately **sharp, angular, and editorial** — no rounded corners anywhere. Think high-end consulting firm, not friendly SaaS.

---

## Colors

### Brand Red (Primary Action Color)
| Token | Hex | Usage |
|-------|-----|-------|
| `brand` | `#C41E24` | Primary CTAs, active states, eyebrow labels, links, accent lines |
| `brand-light` | `#DE5358` | Hover states, gradients, secondary accents |
| `brand-subtle` | `#FEF2F2` | Light backgrounds behind brand elements |

### Dark Palette (Backgrounds & Text)
| Token | Hex | Usage |
|-------|-----|-------|
| `brand-dark` | `#1E293B` | Dark UI elements, secondary backgrounds |
| `brand-darker` / dark sections | `#0F172A` | Top bars, dark sections (stats strips, hero overlays) |
| `foreground` | `#081329` | Default body text color (Elite Midnight Blue) |

### Neutrals (Slate-Blue Tinted)
| Token | Hex | Usage |
|-------|-----|-------|
| `neutral-50` | `#F8FAFC` | Page backgrounds, hover states on cards |
| `neutral-100` | `#F1F5F9` | Subtle section dividers, light backgrounds |
| `neutral-200` | `#E2E8F0` | Borders, card outlines, dividers |
| `neutral-300` | `#CBD5E1` | Hover borders, subtle separators |
| `neutral-400` | `#94A3B8` | Placeholder text, tertiary labels |
| `neutral-500` | `#64748B` | Secondary text |
| `neutral-600` | `#475569` | Body text (descriptions, paragraphs) |
| `neutral-700` | `#334155` | Emphasized body text |
| `neutral-800` | `#1C2541` | Navigation links, strong labels |
| `neutral-900` | `#081329` | Headings, primary text |

### Semantic Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#0D8A56` | Pass states, completion indicators |
| `warning` | `#E5A100` | Alerts, deadline warnings |
| `error` | `#D1293D` | Errors, failed states |
| `info` | `#4BA9D9` | Informational badges, tips |

---

## Typography

### Font Families
| Purpose | Font | CSS Variable |
|---------|------|-------------|
| **Headings** | Plus Jakarta Sans | `--font-heading` / `var(--font-plus-jakarta)` |
| **Body text** | Inter | `--font-body` / `var(--font-inter)` |

### Type Scale

**Display (Hero/Feature sections):**
- `display-xl`: 4rem / line-height 1.1 / letter-spacing -0.02em / weight 800
- `display-lg`: 3.25rem / line-height 1.1 / letter-spacing -0.02em / weight 800
- `display-md`: 2.5rem / line-height 1.15 / letter-spacing -0.01em / weight 700

**Headings:**
- `heading-xl`: 2rem / line-height 1.2 / letter-spacing -0.01em / weight 700
- `heading-lg`: 1.5rem / line-height 1.3 / weight 600
- `heading-md`: 1.25rem / line-height 1.4 / weight 600
- `heading-sm`: 1.125rem / line-height 1.4 / weight 600

**Body:**
- `body-lg`: 1.125rem / line-height 1.7 / weight 400
- `body-md`: 1rem / line-height 1.7 / weight 400
- `body-sm`: 0.875rem / line-height 1.6 / weight 400
- `body-xs`: 0.75rem / line-height 1.5 / weight 400

**Labels / Eyebrows:**
- `label-lg`: 0.875rem / line-height 1.4 / weight 600 / letter-spacing 0.025em
- `label-md`: 0.75rem / line-height 1.4 / weight 600 / letter-spacing 0.05em

### Typography Patterns
- **Eyebrow labels**: `11px`, bold, `text-brand`, `uppercase`, `tracking-[0.25em]` — always paired with a short accent line (`w-2 h-[2px] bg-brand`)
- **Page titles**: `28–36px`, `font-extrabold`, `text-neutral-900`, tight leading (1.12), tight tracking
- **Section headings**: `24–34px`, `font-extrabold`, `text-neutral-900`, tight leading
- **Card titles**: `18px`, `font-bold`, `text-neutral-900`
- **Body/descriptions**: `14–16px`, `text-neutral-600`, relaxed leading (1.7–1.75)
- **Micro labels**: `10–11px`, `font-bold`, `uppercase`, `tracking-widest`
- **Nav links**: `13px`, `font-bold`

---

## Spacing

### Section Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 32px (2rem) | Tight sections |
| `sm` | 48px (3rem) | Default section padding |
| `md` | 64px (4rem) | Standard sections |
| `lg` | 80px (5rem) | Generous sections |
| `xl` | 96px (6rem) | Hero/feature sections |
| `2xl` | 128px (8rem) | Maximum breathing room |

**Common section padding pattern:** `py-12 lg:py-16` (48px mobile, 64px desktop)

### Container
- **Max width**: `1240px` (`max-w-[1240px]`)
- **Horizontal padding**: `24px` (`px-6`) on all breakpoints
- **Pattern**: `max-w-[1240px] mx-auto px-6`

### Component Spacing
- **Card internal padding**: `24px` mobile, `32px` desktop (`p-6 lg:p-8`)
- **Grid gaps**: `32px` mobile, `40px` desktop (`gap-8 md:gap-10`)
- **Element stacking (inside cards)**: `mb-2` to `mb-6` depending on hierarchy
- **Section header to content gap**: `28–32px` (`mb-7` or `mb-8`)

---

## Border Radius

**CRITICAL: All border-radius is forced to 0 globally.**

```css
*, *::before, *::after {
  border-radius: 0 !important;
}
```

Every element is sharp/angular. No rounded corners on buttons, cards, inputs, avatars, badges — nothing. This is a core brand decision.

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `card` | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | Default card rest state |
| `card-hover` | `0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)` | Card hover state |
| `nav` | `0 2px 8px rgba(0,0,0,0.08)` | Sticky nav/header |
| `sm` | `0 1px 2px 0 rgba(0,0,0,0.05)` | Subtle elevation |
| `md` | `0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)` | Dropdowns, popovers |
| `lg` | `0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.05)` | Modals, overlays |

Shadows are deliberately subtle — the aesthetic is **flat and editorial**, not Material Design. Elevation is communicated through borders and whitespace, not heavy shadows.

---

## Component Patterns

### Cards
- White background (`bg-white`)
- 1px border: `border border-neutral-200`
- Hover: border changes to `border-brand`, subtle shadow increase, `translateY(-2px)`
- Transition: `transition-all 0.4s ease`
- Internal layout: image on top (aspect `16/10`), content below with `p-6 lg:p-8`
- Use `group` on card wrapper for coordinated hover effects on children

### Buttons / CTAs
- **Primary link style**: `text-neutral-900 font-bold border-b-2 border-brand pb-0.5 text-[13px] hover:text-brand uppercase tracking-widest`
- **Inline action links**: `text-[11px] font-bold text-neutral-900 uppercase tracking-widest hover:text-brand` with arrow icon
- No pill/rounded buttons — all sharp edges
- Arrow icons use `strokeLinecap="square"` and `strokeLinejoin="miter"` (sharp, not rounded)

### Page Banners (Section Headers)
- White background with bottom border (`border-b border-neutral-200`)
- Padding: `pt-12 pb-10 lg:pt-14 lg:pb-12`
- Contains: eyebrow label + title + description
- Content constrained to `max-w-3xl`

### Eyebrow Labels
Always follow this pattern:
```
<span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-3 block">
  LABEL TEXT
</span>
```
Often preceded by a short accent line: `<span className="w-2 h-[2px] bg-brand" />`

### Section Dividers
- Light: `border-b border-neutral-100`
- Standard: `border-b border-neutral-200`
- Dark sections use: `border-y border-brand/20`

### Dark Sections (Stats, Banners)
- Background: `bg-[#0f172a]`
- Text: white for values, `text-slate-400` for labels
- Subtle texture overlays: `bg-noise` at `opacity-[0.02]` + `bg-grid-subtle` at `opacity-[0.03]`
- Optional accent glows: `bg-brand/10 blur-[80px]` positioned absolutely

### Navigation
- Sticky header: `sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm`
- Header height: `h-16 lg:h-24`
- Nav links: `13px`, `font-bold`, `text-neutral-800`, active state `text-brand`
- Dropdown menus: white bg, `border border-neutral-200`, top accent line (`h-[2px] bg-gradient-to-r from-brand via-brand-light to-transparent`)

### Grids
- 3-column: `grid md:grid-cols-3 gap-8 md:gap-10`
- 4-column stats: `grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16`
- 12-column for complex layouts: `grid lg:grid-cols-12`

---

## Animations & Transitions

### Entrance Animation
```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-in { opacity: 0; animation: fade-in-up 0.8s ease-out forwards; }
```
Staggered delays: `delay-100`, `delay-200`, `delay-300`

### Hover Transitions
- Default: `transition-colors` for simple color changes
- Cards: `transition-all 0.4s ease` for multi-property changes
- Transform effects: `group-hover:translate-x-1`, `group-hover:scale-105` with `duration-300` or `duration-500`

### Marquee (News Ticker)
- `animation: marquee 30s linear infinite`
- Content duplicated for seamless loop

---

## Icons

- Style: **Outline stroke icons** (not filled)
- Stroke properties: `strokeLinecap="square"`, `strokeLinejoin="miter"` (sharp, angular — matches the no-border-radius rule)
- Stroke width: `1.5` to `2.5` depending on size
- Default size: `w-3.5 h-3.5` to `w-5 h-5`
- Color follows parent text color, transitions on hover

---

## Responsive Breakpoints

Follow Tailwind defaults:
- `sm`: 640px
- `md`: 768px (cards go to grid, mobile nav collapses)
- `lg`: 1024px (full desktop layout)
- `xl`: 1280px (max content width reached)

### Key Responsive Patterns
- Font sizes scale up at `md` and `lg` (e.g., `text-[28px] md:text-[32px] lg:text-[36px]`)
- Section padding increases at `lg` (e.g., `py-12 lg:py-16`)
- Single column on mobile, grid on `md`+
- Navigation hidden on mobile (`hidden lg:flex`)

---

## Glass / Overlay Effects

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

Use sparingly for floating UI elements over dark backgrounds.

---

## LMS-Specific Guidance

When applying this design system to LMS components:

- **Course cards**: Follow the card pattern (white, 1px border, sharp corners, hover to brand border)
- **Progress bars**: Use `bg-brand` for fill, `bg-neutral-200` for track, `h-[2px]` or `h-1` — keep them thin and sharp
- **Sidebar navigation**: `bg-white` or `bg-neutral-50`, `border-r border-neutral-200`, nav items follow the `13px font-bold` pattern
- **Lesson content area**: Max-width `max-w-3xl` for readability, `text-neutral-600` body, generous line-height (1.7)
- **Badges / Tags**: Sharp rectangles, `text-[10px] font-bold uppercase tracking-widest`, brand-colored border or background
- **Form inputs**: Sharp edges (no rounding), `border border-neutral-200`, `focus:border-brand` outline
- **Tables**: Clean lines, `border-b border-neutral-100` between rows, `text-[13px]` body, bold `text-[11px] uppercase tracking-widest` headers
- **Modals/Dialogs**: Sharp corners, `border border-neutral-200`, top accent line like dropdowns
- **Status indicators**: Use semantic colors (success/warning/error) with the same sharp/angular badge pattern
- **Empty states**: Centered, `text-neutral-400`, minimal illustration if any

---

## Do / Don't

| Do | Don't |
|----|-------|
| Use sharp 0px border-radius everywhere | Round any corners, ever |
| Use `Plus Jakarta Sans` for headings | Mix in other display fonts |
| Use `Inter` for body text | Use system fonts |
| Keep shadows subtle and editorial | Use heavy drop shadows |
| Use `brand` (#C41E24) as the primary accent | Introduce new accent colors |
| Use uppercase tracking-widest for labels | Use sentence-case for micro labels |
| Let whitespace and borders create hierarchy | Rely on background color changes for hierarchy |
| Use `strokeLinecap="square"` on icons | Use rounded stroke caps |
| Animate with fade-in-up and subtle transforms | Use bouncy or spring animations |
| Maintain 1240px max-width container | Go full-bleed on content areas |
