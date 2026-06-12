export const hdRoles = {
  superAdmin: "super_admin",
  executive: "executive",
  rhManager: "rh_manager",
  operationsSupervisor: "operations_supervisor",
  crmAgent: "crm_agent",
  crmSupervisor: "crm_supervisor",
  financeManager: "finance_manager",
  brainOperator: "brain_operator"
} as const;

export const hdPermissions = {
  adminAll: "admin.*",
  usersAll: "users.*",
  rolesAll: "roles.*",
  permissionsAll: "permissions.*",
  auditView: "audit.view",
  crmClientsView: "crm.clients.view",
  crmClientsCreate: "crm.clients.create",
  crmClientsUpdate: "crm.clients.update",
  crmFollowupsCreate: "crm.followups.create",
  crmConversationsReply: "crm.conversations.reply",
  crmConversationsReview: "crm.conversations.review",
  crmReportsView: "crm.reports.view",
  rhCandidatesRead: "rh.candidates.read",
  rhReportsView: "rh.reports.view",
  operationsReportsView: "operations.reports.view",
  operationsTasksCreate: "operations.tasks.create",
  operationsTasksUpdate: "operations.tasks.update",
  brainViewGlobalKpis: "brain.view_global_kpis",
  brainViewRiskAlerts: "brain.view_risk_alerts",
  brainViewAuditLogs: "brain.view_audit_logs",
  brainAutomationRequest: "brain.automation.request"
} as const;

export type HdRole = typeof hdRoles[keyof typeof hdRoles];
export type HdPermission = typeof hdPermissions[keyof typeof hdPermissions];

export const sensitiveActions = [
  "admin.roles.update",
  "admin.permissions.update",
  "finance.payment.recorded",
  "crm.conversation.started",
  "crm.payment_commitment.created",
  "rh.hiring.final_decision",
  "brain.automation.requested"
] as const;
