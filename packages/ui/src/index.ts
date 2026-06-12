export interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export function createButtonClassName(props: ButtonProps): string {
  const base = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium";
  const variant = props.variant ?? "primary";

  const variants = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-zinc-100 text-zinc-900",
    danger: "bg-rose-600 text-white"
  };

  return [base, variants[variant], props.disabled ? "opacity-50 pointer-events-none" : ""]
    .filter(Boolean)
    .join(" ");
}
