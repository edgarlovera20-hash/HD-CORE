export const hdDesignColors = {
  primary: "#0066FF",
  secondary: "#00A3FF",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444"
} as const;

export const hdDesignTypography = {
  ui: "Inter",
  headings: "Poppins"
} as const;

export type HdDesignTokenCategory =
  | "colors"
  | "typography"
  | "spacing"
  | "radius"
  | "shadows"
  | "zIndex"
  | "breakpoints"
  | "motion";

export type HdUiComponentName =
  | "Button"
  | "Input"
  | "Textarea"
  | "Select"
  | "Table"
  | "Card"
  | "Sidebar"
  | "Navbar"
  | "Footer"
  | "Modal"
  | "Dialog"
  | "Toast"
  | "Badge"
  | "Tabs"
  | "Charts"
  | "DashboardLayout"
  | "FormField"
  | "DataTable"
  | "EmptyState"
  | "LoadingState"
  | "ErrorState";
