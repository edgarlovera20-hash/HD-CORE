// @hd/core-ui — headless component stubs.
// Class-name builders + typed props so HD-CORE stays framework-agnostic.
// React implementations arrive in Stage 1 of the master roadmap.

export interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
}

export function createButtonClassName(props: ButtonProps): string {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors";
  const variant = props.variant ?? "primary";

  const variants = {
    primary: "bg-[#0066FF] text-[#F9FAFB] hover:bg-[#00A3FF]",
    secondary: "bg-[#161F33] text-[#E5E7EB] border border-[#334155]",
    danger: "bg-[#EF4444] text-[#F9FAFB]",
    ghost: "bg-transparent text-[#9CA3AF] hover:text-[#F9FAFB]"
  };

  return [base, variants[variant], props.disabled ? "opacity-50 pointer-events-none" : ""]
    .filter(Boolean)
    .join(" ");
}

export interface InputProps {
  invalid?: boolean;
  disabled?: boolean;
}

export function createInputClassName(props: InputProps = {}): string {
  const base =
    "w-full rounded-lg bg-[#111827] px-3 py-2 text-sm text-[#F9FAFB] placeholder-[#9CA3AF] border focus:outline-none focus:ring-2 focus:ring-[#0066FF]";
  const border = props.invalid ? "border-[#EF4444]" : "border-[#1F2937]";
  return [base, border, props.disabled ? "opacity-50 pointer-events-none" : ""]
    .filter(Boolean)
    .join(" ");
}

export interface CardProps {
  elevated?: boolean;
}

export function createCardClassName(props: CardProps = {}): string {
  const surface = props.elevated ? "bg-[#161F33]" : "bg-[#111827]";
  return `rounded-lg border border-[#1F2937] p-4 ${surface}`;
}

export interface TableColumn {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
}

export function createTableClassName(): string {
  return "w-full text-sm text-[#E5E7EB] border-collapse [&_th]:text-left [&_th]:font-semibold [&_th]:text-[#9CA3AF] [&_td]:border-t [&_td]:border-[#1F2937] [&_td]:py-2";
}

export interface SidebarItem {
  label: string;
  href: string;
  icon?: string;
  active?: boolean;
}

export function createSidebarClassName(): string {
  return "flex h-full w-64 flex-col gap-1 bg-[#0A0F1C] border-r border-[#1F2937] p-3";
}

export function createNavbarClassName(): string {
  return "flex h-14 items-center justify-between bg-[#0A0F1C] border-b border-[#1F2937] px-4";
}

export interface ModalProps {
  open: boolean;
}

export function createModalClassName(props: ModalProps): string {
  const base =
    "fixed inset-0 z-[1400] flex items-center justify-center bg-black/60 backdrop-blur-sm";
  return props.open ? base : `${base} hidden`;
}

export function createModalPanelClassName(): string {
  return "w-full max-w-lg rounded-lg bg-[#161F33] border border-[#334155] p-6 shadow-lg";
}

export type ToastVariant = "info" | "success" | "warning" | "error";

export function createToastClassName(variant: ToastVariant = "info"): string {
  const base =
    "pointer-events-auto z-[1500] flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-[#F9FAFB] shadow-md border";
  const variants = {
    info: "bg-[#161F33] border-[#0066FF]",
    success: "bg-[#161F33] border-[#10B981]",
    warning: "bg-[#161F33] border-[#F59E0B]",
    error: "bg-[#161F33] border-[#EF4444]"
  };
  return `${base} ${variants[variant]}`;
}

export interface DashboardLayoutSlots {
  sidebar: boolean;
  navbar: boolean;
}

export function createDashboardLayoutClassName(slots: DashboardLayoutSlots = { sidebar: true, navbar: true }): string {
  const grid = slots.sidebar ? "grid-cols-[16rem_1fr]" : "grid-cols-1";
  const rows = slots.navbar ? "grid-rows-[3.5rem_1fr]" : "grid-rows-1";
  return `grid min-h-screen bg-[#0A0F1C] text-[#F9FAFB] ${grid} ${rows}`;
}
