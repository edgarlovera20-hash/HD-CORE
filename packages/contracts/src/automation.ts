export const hdAutomationOrchestrator = {
  id: "n8n",
  name: "n8n",
  purpose: "Central automation orchestrator for Heavenly Dreams ecosystem"
} as const;

export const hdAutomationRules = {
  servicePrincipalRequired: true,
  rbacRequired: true,
  auditRequired: true,
  idempotencyRequired: true,
  correlationIdRequired: true,
  retryPolicyRequired: true,
  humanReviewRequiredForSensitiveActions: true
} as const;

export const hdAllowedAutomationTypes = [
  "lead routing",
  "candidate notification draft",
  "CRM follow-up reminder",
  "overdue risk alert",
  "operations task reminder",
  "finance anomaly alert",
  "brain recommendation review request",
  "audit log enrichment"
] as const;

export const hdForbiddenAutomationTypes = [
  "direct role or permission change",
  "direct client debt forgiveness",
  "direct candidate hiring or rejection",
  "direct finance record deletion",
  "direct client contact without consent",
  "direct bypass of platform API"
] as const;

export const hdAutomationRequiredMetadata = [
  "automationId",
  "workflowName",
  "triggerSource",
  "servicePrincipalId",
  "correlationId",
  "requestedBy",
  "approvedBy",
  "createdAt",
  "executionStatus"
] as const;
