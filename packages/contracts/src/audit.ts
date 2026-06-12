export type AuditSeverity = "info" | "warning" | "critical" | "security";

export type AuditActorType =
  | "user"
  | "service_principal"
  | "agent"
  | "n8n_workflow"
  | "system";

export interface AuditEntry {
  auditId: string;
  actorType: AuditActorType;
  actorId: string;
  platform:
    | "HD-CORE"
    | "HD-CRM"
    | "HD-RH"
    | "HD-BRAIN"
    | "HD-OPERATIONS"
    | "HD-ADMIN"
    | "HD-WEB";
  action: string;
  resourceType: string;
  resourceId: string;
  correlationId: string;
  ipAddress?: string;
  userAgent?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  severity: AuditSeverity;
}

export interface AuditContext {
  correlationId: string;
  actorId: string;
  actorType: AuditActorType;
  platform: AuditEntry["platform"];
}
