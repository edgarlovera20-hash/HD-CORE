export type HdN8nWorkflowId =
  | "WEB_LEAD_TO_CRM"
  | "CRM_OVERDUE_ALERT"
  | "CRM_PAYMENT_COMMITMENT_REMINDER"
  | "RH_CANDIDATE_FOLLOWUP_DRAFT"
  | "OPERATIONS_TASK_REMINDER"
  | "ADMIN_FINANCE_ANOMALY_ALERT"
  | "BRAIN_RISK_REVIEW_REQUEST";

export interface HdN8nWorkflowDefinition {
  workflowId: HdN8nWorkflowId;
  ownerPlatform: string;
  trigger: string;
  requiredServicePrincipal: string;
  requiredPermissions: string[];
  requiredMetadata: string[];
  auditRequired: true;
  humanReviewRequired: boolean;
  forbiddenActions: string[];
}

export interface HdN8nExecutionContext {
  workflowId: HdN8nWorkflowId;
  correlationId: string;
  idempotencyKey: string;
  servicePrincipalId: string;
  triggeredAt: string;
}

export const hdForbiddenWorkflowActions = [
  "direct_role_or_permission_change",
  "direct_client_debt_forgiveness",
  "direct_candidate_hiring_or_rejection",
  "direct_finance_record_deletion",
  "direct_client_contact_without_consent",
  "direct_bypass_of_platform_api",
  "direct_database_mutation"
] as const;
