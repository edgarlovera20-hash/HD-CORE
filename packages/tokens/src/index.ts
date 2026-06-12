export const hdColors = {
  primary: "#0066FF",
  secondary: "#00A3FF",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  danger: "#EF4444",
  neutral: "#334155",
  background: {
    base: "#0A0F1C",
    surface: "#111827",
    elevated: "#161F33"
  },
  text: {
    primary: "#F9FAFB",
    secondary: "#E5E7EB",
    muted: "#9CA3AF"
  },
  border: {
    subtle: "#1F2937",
    strong: "#334155"
  }
} as const;

export const hdTypography = {
  fontSans: "Inter, system-ui, sans-serif",
  fontHeading: "Poppins, Inter, system-ui, sans-serif",
  fontMono: "ui-monospace, SFMono-Regular, monospace",
  sizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem"
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
} as const;

export const hdSpacing = {
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
  16: "4rem"
} as const;

export const hdRadius = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  full: "9999px"
} as const;

export const hdShadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.3)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.4)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.5)",
  glow: "0 0 20px 0 rgb(0 102 255 / 0.25)"
} as const;

export const hdZIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1300,
  modal: 1400,
  toast: 1500
} as const;

export const hdBreakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
} as const;

export const hdMotion = {
  durationFast: "150ms",
  durationBase: "250ms",
  durationSlow: "400ms",
  easing: "cubic-bezier(0.4, 0, 0.2, 1)"
} as const;
