/**
 * ARIFAC Design Tokens
 *
 * Design philosophy: Corporate-professional aesthetic inspired by ACAMS.org
 * Conveys trust, authority, and expertise in AML/CFT compliance domain.
 * Built around ARIFAC's brand blue with a deep navy primary for authority.
 */

export const tokens = {
  colors: {
    // === PRIMARY: Deep Navy — authority, trust, professionalism ===
    primary: {
      50: '#EBF0F7',
      100: '#D7E1EF',
      200: '#AFC3DF',
      300: '#87A5CF',
      400: '#5F87BF',
      500: '#1B3A5C',  // Main primary — deep navy
      600: '#173252',
      700: '#122A47',
      800: '#0E213D',
      900: '#0A1932',
      950: '#061028',
    },

    // === BRAND BLUE: ARIFAC's signature blue from the logo ===
    brand: {
      50: '#EEF7FC',
      100: '#DCEEF9',
      200: '#B9DEF3',
      300: '#97CDED',
      400: '#74BDE7',
      500: '#4BA9D9',  // Main brand blue — from ARIFAC logo
      600: '#3191C4',
      700: '#2577A5',
      800: '#1C5C80',
      900: '#13415B',
      950: '#0A2637',
    },

    // === ACCENT TEAL: Used for CTAs, highlights, interactive elements ===
    accent: {
      50: '#EDFAFA',
      100: '#D5F5F5',
      200: '#ABEBEB',
      300: '#81E0E0',
      400: '#57D6D6',
      500: '#0FB5AE',  // Teal accent — modern, energetic
      600: '#0D9A94',
      700: '#0A7F7A',
      800: '#086461',
      900: '#054947',
      950: '#032E2D',
    },

    // === GOLD: Regulatory authority, importance, warnings ===
    gold: {
      50: '#FDF8ED',
      100: '#FBF0D4',
      200: '#F7E1A9',
      300: '#F3D17E',
      400: '#EFC253',
      500: '#C2A030',  // ARIFAC's gold accent
      600: '#A38628',
      700: '#846C20',
      800: '#655218',
      900: '#463910',
      950: '#271F08',
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
    info: '#4BA9D9',
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
