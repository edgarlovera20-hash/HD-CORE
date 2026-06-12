export type PlatformId =
  | "hd-web"
  | "hd-rh"
  | "hd-operations"
  | "hd-admin"
  | "hd-crm"
  | "hd-core"
  | "hd-brain";

export type UserRole =
  | "super_admin"
  | "executive"
  | "rh_manager"
  | "operations_supervisor"
  | "crm_agent"
  | "crm_supervisor"
  | "finance_manager"
  | "brain_operator";

export interface AuditEnvelope {
  actorId: string;
  actorType: "user" | "service_principal" | "system";
  platformId: PlatformId;
  correlationId: string;
  occurredAt: string;
}
