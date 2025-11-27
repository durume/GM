/**
 * Professional Design System - Theme Constants
 * Modern, data-driven design for 광명푸드뱅크마켓센터
 * Optimized for trust, clarity, and visual impact
 */

// Enhanced Color Palette - Professional & Warm
export const colors = {
  // Primary Brand Colors (Sophisticated Warmth)
  primary: {
    50: '#FFF3E0',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',  // Warm Amber
    500: '#FF9800',
    600: '#FB8C00',
    700: '#F57C00',
    800: '#EF6C00',
    900: '#E65100',  // Deep Orange - Main Brand
  },

  // Accent Colors (Vibrant Energy)
  accent: {
    coral: '#FF6E40',      // Vibrant accent
    peach: '#FFAB91',      // Soft accent
    sunset: '#FF7043',     // Warm highlight
  },

  // Secondary Colors (Trust & Professionalism)
  secondary: {
    50: '#E0F2F1',
    100: '#B2DFDB',  // Soft Mint
    200: '#80CBC4',
    300: '#4DB6AC',
    400: '#26A69A',
    500: '#009688',
    600: '#00897B',
    700: '#00796B',
    800: '#00695C',  // Deep Teal
    900: '#004D40',
  },

  // Data Visualization Colors
  data: {
    blue: '#0288D1',       // Ocean Blue
    green: '#43A047',      // Success Green
    amber: '#FFA726',      // Warning/Highlight
    red: '#E53935',        // Error/Alert
    purple: '#8E24AA',     // Premium
    teal: '#00897B',       // Secondary data
  },

  // Neutral Colors (Modern & Clean)
  neutral: {
    50: '#FAFAFA',   // Soft Gray background
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',  // Slate body text
    900: '#212121',  // Charcoal headings
  },

  // Semantic Colors
  success: '#43A047',
  warning: '#FFA726',
  error: '#E53935',
  info: '#0288D1',

  // Background Colors
  background: '#FAFAFA',
  backgroundAlt: '#FFFFFF',
  backgroundDark: '#212121',

  // Text Colors
  textPrimary: '#212121',     // Charcoal
  textSecondary: '#616161',   // Medium gray
  textTertiary: '#9E9E9E',    // Light gray
  textInverse: '#FFFFFF',
  textOnPrimary: '#FFFFFF',
  textOnSecondary: '#FFFFFF',
};

// Enhanced Spacing System (8pt grid + larger scales for impact)
export const spacing = {
  0: '0',
  1: '4px',     // 0.25rem
  2: '8px',     // 0.5rem
  3: '12px',    // 0.75rem
  4: '16px',    // 1rem
  5: '20px',    // 1.25rem
  6: '24px',    // 1.5rem
  7: '28px',    // 1.75rem
  8: '32px',    // 2rem
  10: '40px',   // 2.5rem
  12: '48px',   // 3rem
  14: '56px',   // 3.5rem
  16: '64px',   // 4rem
  20: '80px',   // 5rem
  24: '96px',   // 6rem
  32: '128px',  // 8rem
  40: '160px',  // 10rem
  48: '192px',  // 12rem
};

// Professional Typography System
export const typography = {
  fontFamily: {
    sans: "'Inter', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "'Roboto Mono', 'SF Mono', 'Courier New', Courier, monospace",
    display: "'Inter', 'Pretendard', system-ui, sans-serif",
  },

  fontSize: {
    xs: '12px',
    sm: '13px',
    base: '15px',    // Increased from 14px for better readability
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
    '5xl': '40px',
    '6xl': '56px',
    '7xl': '72px',   // Hero headlines
    '8xl': '96px',   // Impact numbers
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  lineHeight: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
};

// Enhanced Border Radius (Modern, softer curves)
export const borderRadius = {
  none: '0',
  sm: '6px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
};

// Professional Shadow System (Elevation)
export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  '2xl': '0 30px 60px -15px rgba(0, 0, 0, 0.3)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  outline: '0 0 0 3px rgba(255, 152, 0, 0.4)',
  focus: '0 0 0 3px rgba(255, 152, 0, 0.5)',
  glow: '0 0 20px rgba(255, 152, 0, 0.3)',
};

// Smooth Transitions
export const transitions = {
  duration: {
    instant: '100ms',
    fast: '150ms',
    base: '200ms',
    medium: '300ms',
    slow: '400ms',
    slower: '600ms',
  },

  timing: {
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    linear: 'linear',
  },

  // Preset combinations
  default: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  medium: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  color: 'color 150ms ease-in-out',
  background: 'background-color 200ms ease-in-out',
  shadow: 'box-shadow 200ms ease-in-out',
};

// Z-Index Scale
export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  notification: 800,
  max: 9999,
};

// Responsive Breakpoints (Mobile-First)
export const breakpoints = {
  xs: '320px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Layout Constants
export const layout = {
  maxWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    full: '100%',
  },

  containerPadding: {
    mobile: '20px',
    tablet: '32px',
    desktop: '40px',
  },

  headerHeight: {
    mobile: '64px',
    desktop: '80px',
  },

  footerHeight: {
    mobile: '320px',
    desktop: '280px',
  },
};

// Accessibility Standards
export const accessibility = {
  // WCAG 2.1 AA Contrast Ratios
  contrast: {
    normalText: 4.5,    // Minimum for normal text
    largeText: 3.0,     // Minimum for large text
    aa: 4.5,
    aaa: 7.0,
  },

  // Minimum Touch Target Size
  touchTarget: {
    mobile: '44px',
    android: '48px',
    recommended: '48px',
  },

  // Focus Styles
  focusOutline: `3px solid ${colors.primary[500]}`,
  focusOutlineOffset: '2px',
  focusRing: '0 0 0 3px rgba(255, 152, 0, 0.5)',
};

// Animation Presets (scroll-triggered, micro-interactions)
export const animations = {
  // Fade animations
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },

  fadeInUp: {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },

  fadeInDown: {
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },

  // Slide animations
  slideUp: {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },

  slideDown: {
    from: { transform: 'translateY(-20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },

  slideLeft: {
    from: { transform: 'translateX(20px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  },

  slideRight: {
    from: { transform: 'translateX(-20px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  },

  // Scale animations
  scale: {
    from: { transform: 'scale(0.95)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
  },

  scaleIn: {
    from: { transform: 'scale(0.8)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
  },

  // Bounce
  bounce: {
    keyframes: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-10px)' },
    },
  },

  // Pulse
  pulse: {
    keyframes: {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.7 },
    },
  },
};

// Component-Specific Styles (Enhanced)
export const components = {
  // Card component
  card: {
    padding: spacing[8],
    borderRadius: borderRadius.lg,
    backgroundColor: colors.backgroundAlt,
    boxShadow: shadows.md,
    transition: transitions.default,
    border: `1px solid ${colors.neutral[200]}`,

    hover: {
      transform: 'translateY(-4px)',
      boxShadow: shadows.xl,
      borderColor: colors.primary[300],
    },
  },

  // Stat card (for impact numbers)
  statCard: {
    padding: spacing[10],
    borderRadius: borderRadius.xl,
    backgroundColor: colors.backgroundAlt,
    boxShadow: shadows.lg,
    textAlign: 'center' as const,
    border: `2px solid ${colors.neutral[200]}`,
    transition: transitions.medium,

    hover: {
      borderColor: colors.primary[500],
      boxShadow: shadows['2xl'],
      transform: 'translateY(-8px)',
    },
  },

  // Button variants
  button: {
    padding: `${spacing[3]} ${spacing[6]}`,
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    transition: transitions.fast,
    cursor: 'pointer',
    border: 'none',

    // Primary button
    primary: {
      backgroundColor: colors.primary[900],
      color: colors.textInverse,
      boxShadow: shadows.md,

      hover: {
        backgroundColor: colors.primary[800],
        boxShadow: shadows.lg,
        transform: 'translateY(-2px)',
      },

      active: {
        transform: 'translateY(0)',
        boxShadow: shadows.sm,
      },
    },

    // Secondary button
    secondary: {
      backgroundColor: colors.secondary[800],
      color: colors.textInverse,
      boxShadow: shadows.md,

      hover: {
        backgroundColor: colors.secondary[700],
        boxShadow: shadows.lg,
        transform: 'translateY(-2px)',
      },
    },

    // Outlined button
    outlined: {
      backgroundColor: 'transparent',
      color: colors.primary[900],
      border: `2px solid ${colors.primary[900]}`,

      hover: {
        backgroundColor: colors.primary[900],
        color: colors.textInverse,
      },
    },

    // Ghost button
    ghost: {
      backgroundColor: 'transparent',
      color: colors.primary[900],

      hover: {
        backgroundColor: colors.primary[50],
      },
    },

    // Large button (for CTAs)
    large: {
      padding: `${spacing[4]} ${spacing[10]}`,
      fontSize: typography.fontSize.lg,
    },
  },

  // Input fields
  input: {
    padding: `${spacing[3]} ${spacing[4]}`,
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.base,
    border: `2px solid ${colors.neutral[300]}`,
    backgroundColor: colors.backgroundAlt,
    transition: transitions.fast,

    focus: {
      outline: 'none',
      borderColor: colors.primary[500],
      boxShadow: shadows.focus,
    },

    error: {
      borderColor: colors.error,
    },
  },

  // Badge/Tag
  badge: {
    padding: `${spacing[1]} ${spacing[3]}`,
    borderRadius: borderRadius.full,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[1],
  },

  // Section container
  section: {
    padding: `${spacing[20]} ${spacing[6]}`,
    maxWidth: layout.maxWidth.xl,
    margin: '0 auto',
  },

  // Hero section
  hero: {
    padding: `${spacing[32]} ${spacing[6]}`,
    textAlign: 'center',
    background: `linear-gradient(135deg, ${colors.primary[900]} 0%, ${colors.primary[700]} 100%)`,
    color: colors.textInverse,
  },
};

// Media Query Helpers
export const mediaQuery = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,

  // Utility queries
  mobile: `@media (max-width: ${breakpoints.md})`,
  tablet: `@media (min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`,
  desktop: `@media (min-width: ${breakpoints.lg})`,

  // Motion preferences
  prefersReducedMotion: '@media (prefers-reduced-motion: reduce)',
  prefersDark: '@media (prefers-color-scheme: dark)',
};

// Gradient Utilities
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary[900]} 0%, ${colors.primary[700]} 100%)`,
  secondary: `linear-gradient(135deg, ${colors.secondary[800]} 0%, ${colors.secondary[600]} 100%)`,
  sunset: `linear-gradient(135deg, ${colors.primary[700]} 0%, ${colors.accent.coral} 100%)`,
  ocean: `linear-gradient(135deg, ${colors.data.blue} 0%, ${colors.secondary[700]} 100%)`,
  warm: `linear-gradient(135deg, ${colors.primary[400]} 0%, ${colors.accent.peach} 100%)`,
  overlay: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
};

// Export everything as default object
export default {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  layout,
  accessibility,
  animations,
  components,
  mediaQuery,
  gradients,
};
