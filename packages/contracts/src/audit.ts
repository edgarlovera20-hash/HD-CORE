export type AuditSeverity = "info" | "warning" | "critical" | "security";
export type AuditActorType = "user" | "service_principal" | "agent" | "n8n_workflow" | "system";
export type AuditAction = "create" | "update" | "delete" | "read" | "login" | "logout" | "grant" | "revoke" | "trigger" | "approve" | "reject" | "escalate";

export interface AuditEntry {
  auditId: string;
  actorType: AuditActorType;
  actorId: string;
  platform: "HD-CORE" | "HD-CRM" | "HD-RH" | "HD-BRAIN" | "HD-OPERATIONS" | "HD-ADMIN" | "HD-WEB";
  action: AuditAction | string;
  resourceType: string;
  resourceId: string;
  correlationId: string;
  requestId?: string;
  ipAddress?: string;
  userAgent?: string;
  severity: AuditSeverity;
  metadata: Record<string, unknown>;
  createdAt: string;
}
