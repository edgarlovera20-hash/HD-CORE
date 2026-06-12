export interface HdDesignTokens {
  version: string;
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    background: { base: string; surface: string; elevated: string };
    text: { primary: string; secondary: string; muted: string };
    border: { default: string; strong: string };
  };
  typography: {
    fontSans: string;
    fontHeading: string;
    fontMono: string;
  };
}

export const hdDesignSystemVersion = "1.0.0";

export const hdOfficialTokens: HdDesignTokens = {
  version: hdDesignSystemVersion,
  colors: {
    primary: "#0066FF",
    secondary: "#00A3FF",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    background: { base: "#0A0F1C", surface: "#111827", elevated: "#161F33" },
    text: { primary: "#F9FAFB", secondary: "#E5E7EB", muted: "#9CA3AF" },
    border: { default: "#1F2937", strong: "#334155" },
  },
  typography: {
    fontSans: "Inter, system-ui, sans-serif",
    fontHeading: "Poppins, Inter, system-ui, sans-serif",
    fontMono: "JetBrains Mono, Fira Code, monospace",
  },
};
