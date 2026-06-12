export type Permission =
  | "admin.*"
  | "users.*"
  | "roles.*"
  | "permissions.*"
  | "audit.view"
  | "crm.clients.view"
  | "crm.clients.create"
  | "crm.clients.update"
  | "crm.followups.create"
  | "crm.conversations.reply"
  | "crm.conversations.review"
  | "crm.reports.view"
  | "rh.candidates.read"
  | "rh.reports.view"
  | "operations.reports.view"
  | "brain.view_global_kpis"
  | "brain.view_risk_alerts"
  | "brain.view_audit_logs";

export function hasPermission(
  userPermissions: readonly string[],
  requiredPermission: string
): boolean {
  return userPermissions.includes(requiredPermission) || userPermissions.some((permission) => {
    if (!permission.endsWith(".*")) return false;
    const namespace = permission.replace(".*", "");
    return requiredPermission.startsWith(namespace + ".");
  });
}
