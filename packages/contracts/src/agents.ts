export const hdAgents = {
  rhAgent: {
    id: "RH_AGENT",
    platform: "hd-rh",
    purpose: "Recruitment assistance, candidate summaries, interview preparation and RH reports"
  },
  crmAgent: {
    id: "CRM_AGENT",
    platform: "hd-crm",
    purpose: "Client follow-up, overdue account prioritization and CRM summaries"
  },
  supervisorAgent: {
    id: "SUPERVISOR_AGENT",
    platform: "hd-operations",
    purpose: "Operational task, agenda, productivity and supervisor support"
  },
  financeAgent: {
    id: "FINANCE_AGENT",
    platform: "hd-admin",
    purpose: "Finance summaries, anomaly detection and audit preparation"
  },
  brainAgent: {
    id: "BRAIN_AGENT",
    platform: "hd-brain",
    purpose: "Cross-platform risk detection, recommendations and reviewed automation requests"
  }
} as const;

export type HdAgentKey = keyof typeof hdAgents;
export type HdAgentId = typeof hdAgents[HdAgentKey]["id"];

export const hdAgentGlobalRules = {
  rbacRequired: true,
  auditRequired: true,
  leastPrivilegeRequired: true,
  humanReviewRequiredForSensitiveActions: true,
  agentsCannotBypassPlatformBoundaries: true
} as const;

export const hdAgentHumanReviewActions = [
  "candidate rejection",
  "candidate hiring recommendation",
  "client contact",
  "payment commitment",
  "overdue escalation",
  "task reassignment",
  "finance adjustment",
  "automation request",
  "critical risk escalation",
  "cross-platform action"
] as const;
