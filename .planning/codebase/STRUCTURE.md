# Structure

## Directory Layout

```
src/
├── app/
│   ├── globals.css              # Global styles + Tailwind theme config
│   ├── layout.tsx               # Root layout (fonts, metadata)
│   ├── page.tsx                 # Home page
│   ├── manifest.json            # PWA manifest
│   ├── favicon.ico / icon*.png  # App icons
│   ├── about/page.tsx
│   ├── certifications/page.tsx
│   ├── contact/page.tsx
│   ├── disclaimer/page.tsx
│   ├── faqs/page.tsx
│   ├── gallery/page.tsx
│   ├── help/page.tsx
│   ├── legal/page.tsx
│   ├── member-benefits/page.tsx
│   ├── members/page.tsx
│   ├── meetings/page.tsx
│   ├── membership/
│   │   ├── page.tsx
│   │   └── launching-soon/page.tsx
│   ├── privacy/page.tsx
│   ├── programmes/page.tsx
│   ├── regulatory-updates/page.tsx
│   ├── resources/page.tsx
│   ├── sectoral-nodal-officers/page.tsx
│   ├── terms/page.tsx
│   ├── terms-of-use/page.tsx
│   ├── training-leads/page.tsx
│   └── updates/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Footer.tsx
│   ├── PageBanner.tsx
│   ├── StaticPageLayout.tsx
│   ├── CapabilityMatrix.tsx
│   ├── StatsStrip.tsx
│   ├── FeaturedPrograms.tsx
│   ├── RegulatoryDashboard.tsx
│   └── CommunitySection.tsx
└── design-tokens.ts             # Color palette, typography, spacing tokens
```

## Key Locations

| Purpose | Location |
|---------|----------|
| Pages | `src/app/*/page.tsx` |
| Shared components | `src/components/*.tsx` |
| Global CSS + theme | `src/app/globals.css` |
| Design tokens | `src/design-tokens.ts` |
| Static assets | `public/` |
| Build config | `amplify.yml`, `next.config.ts` |

## Naming Conventions
- **Pages**: kebab-case directories (`member-benefits/`, `regulatory-updates/`)
- **Components**: PascalCase files (`PageBanner.tsx`, `StaticPageLayout.tsx`)
- **CSS**: Tailwind utility classes inline; custom classes use kebab-case (`editorial-card`, `bg-grid-subtle`)
- **Design tokens**: Nested object structure with numeric scales (`colors.primary.500`)

## Where to Add New Code
- **New page**: `src/app/<page-name>/page.tsx`
- **New shared component**: `src/components/<ComponentName>.tsx`
- **New color/design value**: `src/design-tokens.ts` + `src/app/globals.css` @theme block
