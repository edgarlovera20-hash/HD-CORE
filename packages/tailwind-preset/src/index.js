/** @type {import('tailwindcss').Config} */
const preset = {
  theme: {
    extend: {
      colors: {
        hd: {
          primary: "#0066FF",
          "primary-hover": "#0052CC",
          secondary: "#00A3FF",
          "secondary-hover": "#0080CC",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          "bg-base": "#0A0F1C",
          "bg-surface": "#111827",
          "bg-elevated": "#161F33",
          "text-primary": "#F9FAFB",
          "text-secondary": "#E5E7EB",
          "text-muted": "#9CA3AF",
          border: "#1F2937",
          "border-strong": "#334155",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        "hd-sm": "0 1px 2px rgba(0,0,0,0.4)",
        "hd-md": "0 4px 6px rgba(0,0,0,0.4)",
        "hd-lg": "0 10px 15px rgba(0,0,0,0.4)",
        "hd-glow": "0 0 20px rgba(0,102,255,0.4)",
        "hd-glow-success": "0 0 20px rgba(16,185,129,0.4)",
        "hd-glow-error": "0 0 20px rgba(239,68,68,0.4)",
      },
      transitionDuration: {
        fast: "100ms",
        normal: "200ms",
        slow: "300ms",
      },
      transitionTimingFunction: {
        "hd-default": "cubic-bezier(0.4, 0, 0.2, 1)",
        "hd-spring": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [],
};

module.exports = preset;
