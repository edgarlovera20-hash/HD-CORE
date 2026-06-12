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
  servicePrincipalId: string;
  requiredPermissions: string[];
  humanReviewRequired: boolean;
  idempotencyKey: string;
  retryPolicy: { maxAttempts: number; backoffMs: number };
  errorPolicy: "fail_silent" | "alert_admin" | "escalate_to_human";
}

export const hdPermittedWorkflows: HdN8nWorkflowId[] = [
  "WEB_LEAD_TO_CRM",
  "CRM_OVERDUE_ALERT",
  "CRM_PAYMENT_COMMITMENT_REMINDER",
  "RH_CANDIDATE_FOLLOWUP_DRAFT",
  "OPERATIONS_TASK_REMINDER",
  "ADMIN_FINANCE_ANOMALY_ALERT",
  "BRAIN_RISK_REVIEW_REQUEST",
];

export const hdForbiddenWorkflowActions = [
  "direct_role_or_permission_change",
  "direct_client_debt_forgiveness",
  "direct_candidate_hiring_or_rejection",
  "direct_finance_record_deletion",
  "direct_client_contact_without_consent",
  "direct_platform_api_bypass",
  "direct_database_mutation",
] as const;

export type HdForbiddenWorkflowAction = typeof hdForbiddenWorkflowActions[number];
