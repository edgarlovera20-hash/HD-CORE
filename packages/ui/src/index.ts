// Official HD palette constants (inline to avoid circular imports)
const C = {
  primary: "#0066FF",
  primaryHover: "#0052CC",
  secondary: "#00A3FF",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  bgBase: "#0A0F1C",
  bgSurface: "#111827",
  bgElevated: "#161F33",
  textPrimary: "#F9FAFB",
  textSecondary: "#E5E7EB",
  textMuted: "#9CA3AF",
  border: "#1F2937",
  borderStrong: "#334155",
} as const;

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "success";
export interface ButtonProps { variant?: ButtonVariant; size?: "sm" | "md" | "lg"; disabled?: boolean; fullWidth?: boolean; }
export function createButtonClassName(props: ButtonProps = {}): string {
  const { variant = "primary", size = "md", disabled, fullWidth } = props;
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  const variants: Record<ButtonVariant, string> = {
    primary: `bg-[${C.primary}] hover:bg-[${C.primaryHover}] text-white focus:ring-[${C.primary}]`,
    secondary: `bg-[${C.bgElevated}] hover:bg-[${C.borderStrong}] text-[${C.textPrimary}] border border-[${C.border}] focus:ring-[${C.secondary}]`,
    danger: `bg-[${C.error}] hover:opacity-90 text-white focus:ring-[${C.error}]`,
    ghost: `bg-transparent hover:bg-[${C.bgElevated}] text-[${C.textSecondary}] focus:ring-[${C.border}]`,
    success: `bg-[${C.success}] hover:opacity-90 text-white focus:ring-[${C.success}]`,
  };
  return [base, sizes[size], variants[variant], disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "", fullWidth ? "w-full" : ""].filter(Boolean).join(" ");
}

export interface InputProps { error?: boolean; size?: "sm" | "md" | "lg"; }
export function createInputClassName(props: InputProps = {}): string {
  const { error, size = "md" } = props;
  const base = `w-full rounded-lg border bg-[${C.bgSurface}] text-[${C.textPrimary}] placeholder-[${C.textMuted}] focus:outline-none focus:ring-2 transition-colors`;
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-3 py-2 text-sm", lg: "px-4 py-3 text-base" };
  const border = error ? `border-[${C.error}] focus:ring-[${C.error}]` : `border-[${C.border}] focus:border-[${C.primary}] focus:ring-[${C.primary}]`;
  return [base, sizes[size], border].join(" ");
}

export interface CardProps { elevated?: boolean; bordered?: boolean; padding?: "sm" | "md" | "lg" | "none"; }
export function createCardClassName(props: CardProps = {}): string {
  const { elevated, bordered = true, padding = "md" } = props;
  const bg = elevated ? `bg-[${C.bgElevated}]` : `bg-[${C.bgSurface}]`;
  const border = bordered ? `border border-[${C.border}]` : "";
  const paddings = { none: "", sm: "p-3", md: "p-4", lg: "p-6" };
  return [bg, border, "rounded-xl", paddings[padding]].filter(Boolean).join(" ");
}

export function createTableClassName(): { wrapper: string; table: string; thead: string; th: string; tbody: string; tr: string; td: string; } {
  return {
    wrapper: `overflow-x-auto rounded-xl border border-[${C.border}]`,
    table: "min-w-full divide-y divide-[#1F2937]",
    thead: `bg-[${C.bgElevated}]`,
    th: `px-4 py-3 text-left text-xs font-semibold text-[${C.textMuted}] uppercase tracking-wider`,
    tbody: `bg-[${C.bgSurface}] divide-y divide-[${C.border}]`,
    tr: `hover:bg-[${C.bgElevated}] transition-colors`,
    td: `px-4 py-3 text-sm text-[${C.textSecondary}]`,
  };
}

export function createSidebarClassName(): { sidebar: string; nav: string; item: string; itemActive: string; section: string; } {
  return {
    sidebar: `flex flex-col h-full w-64 bg-[${C.bgSurface}] border-r border-[${C.border}]`,
    nav: "flex-1 overflow-y-auto py-4 px-3",
    item: `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[${C.textSecondary}] hover:bg-[${C.bgElevated}] hover:text-[${C.textPrimary}] transition-colors`,
    itemActive: `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium bg-[${C.primary}] text-white`,
    section: `px-3 py-2 text-xs font-semibold text-[${C.textMuted}] uppercase tracking-wider mt-4 mb-1`,
  };
}

export function createNavbarClassName(): { navbar: string; brand: string; nav: string; actions: string; } {
  return {
    navbar: `flex items-center justify-between h-16 px-6 bg-[${C.bgSurface}] border-b border-[${C.border}]`,
    brand: `text-lg font-bold text-[${C.textPrimary}] font-[Poppins]`,
    nav: "flex items-center gap-1",
    actions: "flex items-center gap-2",
  };
}

export function createModalClassName(): { backdrop: string; container: string; header: string; body: string; footer: string; } {
  return {
    backdrop: "fixed inset-0 bg-black/60 backdrop-blur-sm z-[400] flex items-center justify-center p-4",
    container: `relative bg-[${C.bgSurface}] border border-[${C.border}] rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto`,
    header: `flex items-center justify-between p-6 border-b border-[${C.border}]`,
    body: "p-6",
    footer: `flex items-center justify-end gap-3 p-6 border-t border-[${C.border}]`,
  };
}

export type ToastVariant = "success" | "error" | "warning" | "info";
export function createToastClassName(variant: ToastVariant = "info"): string {
  const base = `flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium max-w-sm`;
  const variants: Record<ToastVariant, string> = {
    success: `bg-[${C.bgElevated}] border-[${C.success}] text-[${C.textPrimary}]`,
    error: `bg-[${C.bgElevated}] border-[${C.error}] text-[${C.textPrimary}]`,
    warning: `bg-[${C.bgElevated}] border-[${C.warning}] text-[${C.textPrimary}]`,
    info: `bg-[${C.bgElevated}] border-[${C.primary}] text-[${C.textPrimary}]`,
  };
  return [base, variants[variant]].join(" ");
}

export function createDashboardLayoutClassName(): { layout: string; sidebar: string; main: string; header: string; content: string; } {
  return {
    layout: `flex h-screen bg-[${C.bgBase}] overflow-hidden`,
    sidebar: "flex-shrink-0",
    main: "flex flex-col flex-1 overflow-hidden",
    header: "flex-shrink-0",
    content: "flex-1 overflow-y-auto p-6",
  };
}

export function createBadgeClassName(variant: "default" | "primary" | "success" | "warning" | "error" = "default"): string {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const variants = {
    default: `bg-[${C.bgElevated}] text-[${C.textMuted}]`,
    primary: `bg-[${C.primary}]/20 text-[${C.secondary}]`,
    success: `bg-[${C.success}]/20 text-[${C.success}]`,
    warning: `bg-[${C.warning}]/20 text-[${C.warning}]`,
    error: `bg-[${C.error}]/20 text-[${C.error}]`,
  };
  return [base, variants[variant]].join(" ");
}

export function createEmptyStateClassName(): { container: string; icon: string; title: string; description: string; } {
  return {
    container: "flex flex-col items-center justify-center py-12 text-center",
    icon: `text-[${C.textMuted}] mb-4`,
    title: `text-lg font-semibold text-[${C.textPrimary}] mb-2`,
    description: `text-sm text-[${C.textMuted}] max-w-sm`,
  };
}
