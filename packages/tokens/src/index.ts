export const hdColors = {
  primary: "#0066FF",
  primaryHover: "#0052CC",
  secondary: "#00A3FF",
  secondaryHover: "#0080CC",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  background: {
    base: "#0A0F1C",
    surface: "#111827",
    elevated: "#161F33",
  },
  text: {
    primary: "#F9FAFB",
    secondary: "#E5E7EB",
    muted: "#9CA3AF",
  },
  border: {
    default: "#1F2937",
    strong: "#334155",
  },
} as const;

export const hdTypography = {
  fontSans: "Inter, system-ui, sans-serif",
  fontHeading: "Poppins, Inter, system-ui, sans-serif",
  fontMono: "JetBrains Mono, Fira Code, monospace",
  sizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
  weights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
} as const;

export const hdSpacing = {
  px: "1px",
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
} as const;

export const hdRadius = {
  none: "0",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;

export const hdShadows = {
  sm: "0 1px 2px rgba(0,0,0,0.4)",
  md: "0 4px 6px rgba(0,0,0,0.4)",
  lg: "0 10px 15px rgba(0,0,0,0.4)",
  xl: "0 20px 25px rgba(0,0,0,0.4)",
  glow: "0 0 20px rgba(0,102,255,0.4)",
  glowSuccess: "0 0 20px rgba(16,185,129,0.4)",
  glowWarning: "0 0 20px rgba(245,158,11,0.4)",
  glowError: "0 0 20px rgba(239,68,68,0.4)",
} as const;

export const hdZIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  toast: 600,
  tooltip: 700,
} as const;

export const hdBreakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const hdMotion = {
  duration: {
    fast: "100ms",
    normal: "200ms",
    slow: "300ms",
    slower: "500ms",
  },
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
} as const;
