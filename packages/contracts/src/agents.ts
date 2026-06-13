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

export const hdOdysseusAgents = [
  {
    id: "recruitment_evaluator",
    name: "Agente Evaluador de Candidatos",
    module: "recruitment",
    description: "Analiza candidatos: score, resumen, riesgos y preguntas de entrevista. No contrata ni rechaza.",
    riskLevel: "medium",
    allowedRoles: ["admin", "rh", "supervisor"],
    tools: ["crm.read", "crm.write", "memory.read", "memory.write"],
    requiresApproval: false,
    canWriteData: true,
    canSendMessages: false,
    canAccessFiles: false,
    canAccessEmail: false,
    enabled: true
  },
  {
    id: "whatsapp_recruitment",
    name: "Agente WhatsApp Reclutamiento",
    module: "whatsapp",
    description: "Sugiere mensajes WhatsApp para candidatos. Requiere aprobación humana antes de enviar.",
    riskLevel: "medium",
    allowedRoles: ["admin", "rh"],
    tools: ["whatsapp.send", "crm.read", "crm.write"],
    requiresApproval: true,
    canWriteData: false,
    canSendMessages: true,
    canAccessFiles: false,
    canAccessEmail: false,
    enabled: true
  },
  {
    id: "siac_excel",
    name: "Agente SIAC / Excel",
    module: "siac",
    description: "Detecta columnas equivalentes, valida folios y sugiere normalización. No modifica archivos directamente.",
    riskLevel: "high",
    allowedRoles: ["admin", "operations"],
    tools: ["files.read", "excel.process", "memory.write"],
    requiresApproval: true,
    canWriteData: false,
    canSendMessages: false,
    canAccessFiles: true,
    canAccessEmail: false,
    enabled: true
  },
  {
    id: "morosidad",
    name: "Agente Morosidad",
    module: "morosidad",
    description: "Analiza reporte de morosidad, cruza folios con SIAC y genera resumen de deuda.",
    riskLevel: "high",
    allowedRoles: ["admin", "finance"],
    tools: ["excel.process", "crm.read"],
    requiresApproval: true,
    canWriteData: false,
    canSendMessages: false,
    canAccessFiles: true,
    canAccessEmail: false,
    enabled: true
  },
  {
    id: "email_triage",
    name: "Agente Clasificador de Correos",
    module: "email",
    description: "Clasifica, resume y sugiere respuestas para correos. Requiere aprobación para envíos.",
    riskLevel: "high",
    allowedRoles: ["admin"],
    tools: ["email.read", "email.draft", "drive.read", "memory.write"],
    requiresApproval: true,
    canWriteData: false,
    canSendMessages: true,
    canAccessFiles: true,
    canAccessEmail: true,
    enabled: true
  },
  {
    id: "drive_manager",
    name: "Agente Gestor de Drive",
    module: "documents",
    description: "Indexa, busca y organiza documentos en Drive. Escritura requiere aprobación.",
    riskLevel: "high",
    allowedRoles: ["admin"],
    tools: ["drive.read", "drive.write", "files.index"],
    requiresApproval: true,
    canWriteData: true,
    canSendMessages: false,
    canAccessFiles: true,
    canAccessEmail: false,
    enabled: true
  },
  {
    id: "supervisor",
    name: "Agente Supervisor General",
    module: "central",
    description: "Supervisa estado del ecosistema. Solo lectura de auditoría y tareas.",
    riskLevel: "critical",
    allowedRoles: ["admin"],
    tools: ["audit.read", "tasks.read", "agents.manage"],
    requiresApproval: true,
    canWriteData: false,
    canSendMessages: false,
    canAccessFiles: false,
    canAccessEmail: false,
    enabled: true
  }
] as const;

export type HdOdysseusAgentId = typeof hdOdysseusAgents[number]["id"];
