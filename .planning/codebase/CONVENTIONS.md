# Conventions

## Code Style

### Component Pattern
- Default exports for all components and pages
- No prop destructuring in function signature for simple components
- Interface definitions above component for typed props (`PageBannerProps`, `StaticPageLayoutProps`)
- Data arrays defined as constants outside component body (e.g., `programs`, `updates`, `certifications`)

### Styling Approach
- **Primary**: Tailwind CSS v4 utility classes applied inline
- **Custom CSS**: `src/app/globals.css` for reusable patterns (`editorial-card`, `bg-grid-subtle`, `glass`, `animate-in`)
- **CSS Variables**: Theme colors defined via `@theme inline` block in globals.css
- **Design Tokens**: `src/design-tokens.ts` exports a comprehensive token system, but components mostly use Tailwind classes directly rather than referencing tokens
- **No CSS Modules or styled-components**

### Color Usage Pattern
Colors are applied via a mix of:
1. **Custom Tailwind colors** defined in `@theme inline`: `brand`, `brand-light`, `navy`, `navy-dark`
2. **Tailwind slate palette**: `slate-50` through `slate-900` for grays
3. **Hardcoded values**: Some components use direct hex/rgba values
4. **Opacity modifiers**: Extensive use of `bg-brand/10`, `text-navy/40`, `border-white/20` patterns

### Typography Pattern
- Font sizes specified as pixel values in brackets: `text-[13px]`, `text-[11px]`, `text-[16px]`
- Font weights via Tailwind: `font-bold`, `font-extrabold`, `font-black`
- Uppercase tracking-widest labels: `text-[11px] font-bold text-brand tracking-widest uppercase`
- Two font families: Plus Jakarta Sans (headings), Inter (body)

### Layout Pattern
- Max-width container: `max-w-[1240px] mx-auto px-6`
- Grid-based layouts: `grid md:grid-cols-3`, `grid lg:grid-cols-12`
- Section padding: `py-12 lg:py-16` or `py-16 md:py-24`

## Import Organization
1. React/Next.js imports (`Image`, `Link`, `useState`, `useMemo`)
2. Local component imports (`@/components/...`)
3. No third-party UI libraries

## Error Handling
- No error boundaries implemented
- No loading states
- No error pages (`error.tsx`, `not-found.tsx`)

## Border Radius
- Global override in `globals.css`: `border-radius: 0 !important` on all elements
- Design is intentionally sharp/angular with no rounded corners
