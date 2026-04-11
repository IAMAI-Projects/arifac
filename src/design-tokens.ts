/**
 * ARIFAC Design Tokens
 *
 * Design philosophy: Corporate-professional aesthetic inspired by ACAMS.org
 * Conveys trust, authority, and expertise in AML/CFT compliance domain.
 * Built around ARIFAC's brand blue with a deep navy primary for authority.
 */

export const tokens = {
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

  typography: {
    fontFamily: {
      heading: 'var(--font-plus-jakarta)',   // Plus Jakarta Sans — bold, modern
      body: 'var(--font-inter)',              // Inter — clean, readable
      mono: 'var(--font-geist-mono)',
    },
    fontSize: {
      // Display — hero sections
      'display-xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
      'display-lg': ['3.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
      'display-md': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
      // Headings
      'heading-xl': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
      'heading-lg': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
      'heading-md': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
      'heading-sm': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
      // Body
      'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
      'body-md': ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
      'body-sm': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
      'body-xs': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
      // Labels
      'label-lg': ['0.875rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.025em' }],
      'label-md': ['0.75rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.05em' }],
    },
  },

  spacing: {
    section: {
      xs: '2rem',     // 32px
      sm: '3rem',     // 48px
      md: '4rem',     // 64px
      lg: '5rem',     // 80px
      xl: '6rem',     // 96px
      '2xl': '8rem',  // 128px
    },
    container: {
      maxWidth: '1280px',
      padding: '1.5rem', // 24px mobile, scales up
    },
  },

  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
    card: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
    'card-hover': '0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04)',
    nav: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },
} as const;
