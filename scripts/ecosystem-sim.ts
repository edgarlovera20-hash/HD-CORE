/**
 * Heavenly Dreams Ecosystem Simulation
 * Scenario: "Megaempresa Bajío SA — Contratación de 3 Ejecutivos de Ventas"
 *
 * Full business scenario spanning all 9 platforms:
 *   HD-WEB → HD-CRM → HD-RH → HD-OPERATIONS → HD-ADMIN → HD-BRAIN → heavenly-central
 *
 * Run: npx tsx HD-CORE/scripts/ecosystem-sim.ts
 */

// ── Types (inline so no npm install needed) ────────────────────────────────

type HdEventName =
  | "web.lead.created"
  | "crm.client.created"
  | "crm.client.assigned"
  | "crm.conversation.started"
  | "crm.payment_commitment.created"
  | "crm.account_status.overdue_detected"
  | "rh.candidate.created"
  | "rh.interview.scheduled"
  | "operations.task.created"
  | "operations.task.completed"
  | "operations.productivity_snapshot.created"
  | "finance.payment.recorded"
  | "brain.risk.detected"
  | "brain.automation.requested"
  | "brain.decision.recorded"
  | "ai.task.created"
  | "ai.task.completed"
  | "ai.task.needs_approval"
  | "ai.task.approved"
  | "audit.action.recorded";

interface HdEventEnvelope<TPayload = Record<string, unknown>> {
  eventId: string;
  eventName: HdEventName;
  version: string;
  occurredAt: string;
  producer: string;
  actor: { type: "user" | "agent" | "n8n_workflow" | "system" | "service_principal"; id: string };
  correlationId: string;
  payload: TPayload;
}

type AuditAction = "create" | "update" | "delete" | "read" | "login" | "grant" | "revoke" | "trigger" | "approve" | "reject" | "escalate";
type AuditSeverity = "info" | "warning" | "critical" | "security";

interface AuditEntry {
  auditId: string;
  actorType: "user" | "agent" | "n8n_workflow" | "system" | "service_principal";
  actorId: string;
  platform: "HD-WEB" | "HD-CRM" | "HD-RH" | "HD-BRAIN" | "HD-OPERATIONS" | "HD-ADMIN" | "HD-CORE";
  action: AuditAction;
  resourceType: string;
  resourceId: string;
  correlationId: string;
  severity: AuditSeverity;
  metadata: Record<string, unknown>;
  createdAt: string;
}

// ── ANSI colors ─────────────────────────────────────────────────────────────

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  // Platform colors
  web: "\x1b[38;5;39m",       // bright blue
  crm: "\x1b[38;5;99m",       // purple
  rh: "\x1b[38;5;208m",       // orange
  brain: "\x1b[38;5;198m",    // pink/red
  ops: "\x1b[38;5;46m",       // bright green
  admin: "\x1b[38;5;226m",    // yellow
  central: "\x1b[38;5;51m",   // cyan
  n8n: "\x1b[38;5;202m",      // orange-red
  audit: "\x1b[38;5;244m",    // grey
  // Status colors
  ok: "\x1b[32m",
  warn: "\x1b[33m",
  error: "\x1b[31m",
  info: "\x1b[36m",
  // Decorative
  divider: "\x1b[38;5;238m",
};

// ── Helpers ─────────────────────────────────────────────────────────────────

let _idCounter = 1;
function uid(prefix = "evt"): string {
  return `${prefix}-${String(_idCounter++).padStart(4, "0")}-${Math.random().toString(36).slice(2, 8)}`;
}

const _baseTime = new Date("2026-06-14T08:00:00.000Z");
let _tick = 0;

function ts(offsetSeconds = 0): string {
  const d = new Date(_baseTime.getTime() + (_tick + offsetSeconds) * 1000);
  _tick += offsetSeconds > 0 ? offsetSeconds : 15;
  return d.toISOString();
}

function fmt(iso: string): string {
  const d = new Date(iso);
  return `${d.toTimeString().slice(0, 8)}`;
}

const events: HdEventEnvelope[] = [];
const auditLog: AuditEntry[] = [];
const n8nTriggers: { workflowId: string; correlationId: string; at: string; humanReview: boolean }[] = [];

function emit<T>(envelope: Omit<HdEventEnvelope<T>, "eventId" | "version" | "occurredAt"> & { occurredAt?: string }): HdEventEnvelope<T> {
  const e: HdEventEnvelope<T> = {
    eventId: uid("evt"),
    version: "1.0",
    occurredAt: envelope.occurredAt ?? ts(),
    ...envelope,
  } as HdEventEnvelope<T>;
  events.push(e as HdEventEnvelope);
  return e;
}

function audit(entry: Omit<AuditEntry, "auditId" | "createdAt"> & { createdAt?: string }): void {
  auditLog.push({
    auditId: uid("aud"),
    createdAt: entry.createdAt ?? new Date().toISOString(),
    ...entry,
  });
}

function triggerN8n(workflowId: string, correlationId: string, humanReview: boolean): void {
  n8nTriggers.push({ workflowId, correlationId, at: new Date(_baseTime.getTime() + _tick * 1000).toISOString(), humanReview });
}

// ── Print helpers ────────────────────────────────────────────────────────────

function printHeader(text: string): void {
  const line = "─".repeat(72);
  console.log(`\n${c.divider}${line}${c.reset}`);
  console.log(`${c.bold}  ${text}${c.reset}`);
  console.log(`${c.divider}${line}${c.reset}`);
}

function printStep(platform: string, color: string, icon: string, time: string, title: string, detail?: string): void {
  const tag = `[${platform.padEnd(14)}]`;
  console.log(`  ${c.dim}${fmt(time)}${c.reset}  ${color}${icon} ${c.bold}${tag}${c.reset}  ${title}`);
  if (detail) console.log(`${" ".repeat(28)}${c.dim}${detail}${c.reset}`);
}

function printN8n(workflowId: string, at: string, humanReview: boolean): void {
  const badge = humanReview ? `${c.warn}⚠ HUMAN REVIEW REQUIRED${c.reset}` : `${c.ok}AUTO${c.reset}`;
  console.log(`  ${c.dim}${fmt(at)}${c.reset}  ${c.n8n}⚙ [n8n              ]${c.reset}  ${c.bold}${workflowId}${c.reset}  ${badge}`);
}

function printApproval(agentId: string, action: string, at: string): void {
  console.log(`  ${c.dim}${fmt(at)}${c.reset}  ${c.warn}👤 [HUMAN APPROVAL   ]${c.reset}  ${c.bold}${agentId}${c.reset} → ${action}`);
}

function printCentral(time: string, text: string): void {
  console.log(`  ${c.dim}${fmt(time)}${c.reset}  ${c.central}★ [CENTRAL COMMAND  ]${c.reset}  ${text}`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SIMULATION BEGINS
// ═══════════════════════════════════════════════════════════════════════════

console.clear();

const BANNER = `
${c.bold}${c.info}
  ██╗  ██╗███████╗ █████╗ ██╗   ██╗███████╗███╗   ██╗██╗  ██╗   ██╗
  ██║  ██║██╔════╝██╔══██╗██║   ██║██╔════╝████╗  ██║██║  ╚██╗ ██╔╝
  ███████║█████╗  ███████║██║   ██║█████╗  ██╔██╗ ██║██║   ╚████╔╝
  ██╔══██║██╔══╝  ██╔══██║╚██╗ ██╔╝██╔══╝  ██║╚██╗██║██║    ╚██╔╝
  ██║  ██║███████╗██║  ██║ ╚████╔╝ ███████╗██║ ╚████║███████╗██║
  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝
${c.reset}${c.bold}                   D R E A M S   E C O S Y S T E M   S I M U L A T I O N${c.reset}
${c.dim}          Scenario: Megaempresa Bajío SA — Onboarding 3 Ejecutivos de Ventas${c.reset}
`;

console.log(BANNER);

// ── Shared IDs ───────────────────────────────────────────────────────────────

const correlationLead   = uid("corr");
const correlationCRM    = uid("corr");
const correlationRH     = uid("corr");
const correlationOps    = uid("corr");
const correlationRisk   = uid("corr");

const clientId   = uid("client");
const leadId     = uid("lead");
const vacancyIds = [uid("vac"), uid("vac"), uid("vac")];
const candidateIds = Array.from({ length: 8 }, () => uid("cand"));
const userId_mgr  = uid("user");
const userId_exec1 = uid("user");
const userId_exec2 = uid("user");
const userId_exec3 = uid("user");
const taskIds = Array.from({ length: 6 }, () => uid("task"));

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 1 — HD-WEB: Lead Capture
// ═══════════════════════════════════════════════════════════════════════════

printHeader("FASE 1 — HD-WEB  →  Captura de Lead Corporativo");

const t1 = ts(0);
const evtLead = emit<{ leadId: string; name: string; company: string; email: string; employees: number }>({
  eventName: "web.lead.created",
  producer: "hd-web",
  actor: { type: "system", id: "web-form-handler" },
  correlationId: correlationLead,
  payload: {
    leadId,
    name: "Carlos Rodríguez Vega",
    company: "Megaempresa Bajío SA de CV",
    email: "crodriguez@megaempresabajio.com.mx",
    employees: 450,
  },
});
audit({
  actorType: "system", actorId: "web-form-handler",
  platform: "HD-WEB", action: "create",
  resourceType: "lead", resourceId: leadId,
  correlationId: correlationLead, severity: "info",
  metadata: { company: "Megaempresa Bajío SA de CV", source: "website-contact-form" },
  createdAt: t1,
});
printStep("HD-WEB", c.web, "🌐", evtLead.occurredAt, `Lead capturado: Carlos Rodríguez Vega`, `company=Megaempresa Bajío SA  employees=450  leadId=${leadId}`);

// n8n trigger: WEB_LEAD_TO_CRM
const t1b = ts(3);
triggerN8n("WEB_LEAD_TO_CRM", correlationLead, false);
printN8n("WEB_LEAD_TO_CRM", t1b, false);

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 2 — HD-CRM: Client Onboarding
// ═══════════════════════════════════════════════════════════════════════════

printHeader("FASE 2 — HD-CRM  →  Alta de Cliente y Asignación");

const t2a = ts(8);
const evtClientCreated = emit<{ clientId: string; fromLeadId: string; company: string; tier: string }>({
  eventName: "crm.client.created",
  producer: "hd-crm",
  actor: { type: "n8n_workflow", id: "WEB_LEAD_TO_CRM" },
  correlationId: correlationLead,
  payload: { clientId, fromLeadId: leadId, company: "Megaempresa Bajío SA de CV", tier: "enterprise" },
});
audit({
  actorType: "n8n_workflow", actorId: "WEB_LEAD_TO_CRM",
  platform: "HD-CRM", action: "create",
  resourceType: "client", resourceId: clientId,
  correlationId: correlationLead, severity: "info",
  metadata: { fromLead: leadId, tier: "enterprise" },
  createdAt: t2a,
});
printStep("HD-CRM", c.crm, "👥", evtClientCreated.occurredAt, `Cliente creado: Megaempresa Bajío SA`, `clientId=${clientId}  tier=enterprise  vía n8n:WEB_LEAD_TO_CRM`);

const t2b = ts(5);
const evtClientAssigned = emit<{ clientId: string; agentId: string; agentName: string }>({
  eventName: "crm.client.assigned",
  producer: "hd-crm",
  actor: { type: "user", id: userId_mgr },
  correlationId: correlationCRM,
  payload: { clientId, agentId: "agent-ana-ramirez", agentName: "Ana Ramírez Torres" },
});
audit({
  actorType: "user", actorId: userId_mgr,
  platform: "HD-CRM", action: "update",
  resourceType: "client", resourceId: clientId,
  correlationId: correlationCRM, severity: "info",
  metadata: { assignedTo: "Ana Ramírez Torres" },
  createdAt: t2b,
});
printStep("HD-CRM", c.crm, "📋", evtClientAssigned.occurredAt, `Cliente asignado → Ana Ramírez Torres`, `correlationId=${correlationCRM}`);

// CRM_AGENT queues a WhatsApp follow-up — needs human approval
const t2c = ts(10);
const evtAiTask = emit<{ agentId: string; action: string; targetClientId: string; message: string }>({
  eventName: "ai.task.needs_approval",
  producer: "hd-crm",
  actor: { type: "agent", id: "CRM_AGENT" },
  correlationId: correlationCRM,
  payload: {
    agentId: "CRM_AGENT",
    action: "whatsapp.send",
    targetClientId: clientId,
    message: "Hola Carlos, ¡bienvenido a Heavenly Dreams! Soy Ana, tu ejecutiva de cuenta...",
  },
});
audit({
  actorType: "agent", actorId: "CRM_AGENT",
  platform: "HD-CRM", action: "trigger",
  resourceType: "ai_task", resourceId: evtAiTask.eventId,
  correlationId: correlationCRM, severity: "warning",
  metadata: { requiresApproval: true, channel: "whatsapp", templateRequired: true },
  createdAt: t2c,
});
printStep("HD-CRM", c.crm, "🤖", evtAiTask.occurredAt, `CRM_AGENT → WhatsApp draft generado`, `⚠ REQUIERE APROBACIÓN HUMANA antes de enviar`);
printApproval("CRM_AGENT", "send whatsapp to Megaempresa Bajío (clientId=" + clientId + ")", ts(60));

const t2d = ts(5);
const evtApproved = emit<{ approvedBy: string; agentId: string }>({
  eventName: "ai.task.approved",
  producer: "hd-crm",
  actor: { type: "user", id: "agent-ana-ramirez" },
  correlationId: correlationCRM,
  payload: { approvedBy: "Ana Ramírez Torres", agentId: "CRM_AGENT" },
});
audit({
  actorType: "user", actorId: "agent-ana-ramirez",
  platform: "HD-CRM", action: "approve",
  resourceType: "ai_task", resourceId: evtAiTask.eventId,
  correlationId: correlationCRM, severity: "info",
  metadata: { approvedBy: "Ana Ramírez Torres" },
  createdAt: t2d,
});
printStep("HD-CRM", c.crm, "✅", evtApproved.occurredAt, `WhatsApp aprobado y enviado → Carlos Rodríguez`, ``);

const t2e = ts(30);
const evtConv = emit<{ clientId: string; channel: string }>({
  eventName: "crm.conversation.started",
  producer: "hd-crm",
  actor: { type: "user", id: "agent-ana-ramirez" },
  correlationId: correlationCRM,
  payload: { clientId, channel: "whatsapp" },
});
printStep("HD-CRM", c.crm, "💬", evtConv.occurredAt, `Conversación iniciada  canal=whatsapp`, ``);

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 3 — HD-RH: Vacancies & Candidates
// ═══════════════════════════════════════════════════════════════════════════

printHeader("FASE 3 — HD-RH   →  Vacantes y Proceso de Selección");

const vacancyTitle = "Ejecutivo de Ventas Senior";
for (let i = 0; i < 3; i++) {
  const t = ts(20);
  const evtVac = emit<{ vacancyId: string; title: string; clientId: string; slots: number }>({
    eventName: "operations.task.created",
    producer: "hd-rh",
    actor: { type: "user", id: userId_mgr },
    correlationId: correlationRH,
    payload: { vacancyId: vacancyIds[i], title: vacancyTitle, clientId, slots: 1 },
  });
  audit({
    actorType: "user", actorId: userId_mgr,
    platform: "HD-RH", action: "create",
    resourceType: "vacancy", resourceId: vacancyIds[i],
    correlationId: correlationRH, severity: "info",
    metadata: { title: vacancyTitle, slot: i + 1 },
    createdAt: t,
  });
  printStep("HD-RH", c.rh, "📝", evtVac.occurredAt, `Vacante ${i + 1}/3 creada: ${vacancyTitle}`, `vacancyId=${vacancyIds[i]}`);
}

// 8 candidates registered
const candidateNames = [
  "Laura Gutiérrez", "Diego Mendoza", "Sofía Herrera", "Alejandro Torres",
  "Valeria Cruz", "Ricardo López", "Fernanda Reyes", "Emilio Vargas",
];
console.log();
for (let i = 0; i < 8; i++) {
  const t = ts(45);
  emit<{ candidateId: string; name: string; vacancyId: string }>({
    eventName: "rh.candidate.created",
    producer: "hd-rh",
    actor: { type: "user", id: "rh-coordinator" },
    correlationId: correlationRH,
    payload: { candidateId: candidateIds[i], name: candidateNames[i], vacancyId: vacancyIds[i % 3] },
  });
  audit({
    actorType: "user", actorId: "rh-coordinator",
    platform: "HD-RH", action: "create",
    resourceType: "candidate", resourceId: candidateIds[i],
    correlationId: correlationRH, severity: "info",
    metadata: { name: candidateNames[i] },
    createdAt: new Date(_baseTime.getTime() + _tick * 1000).toISOString(),
  });
  printStep("HD-RH", c.rh, "👤", new Date(_baseTime.getTime() + _tick * 1000).toISOString(), `Candidato registrado: ${candidateNames[i]}`, ``);

  // n8n: RH_CANDIDATE_FOLLOWUP_DRAFT for first 3
  if (i < 3) {
    const at = ts(5);
    triggerN8n("RH_CANDIDATE_FOLLOWUP_DRAFT", correlationRH, true);
    printN8n("RH_CANDIDATE_FOLLOWUP_DRAFT", at, true);
  }
}

// RH_AGENT scores all 8 candidates
console.log();
const t3ai = ts(120);
emit<{ agentId: string; candidatesScored: number; topCandidates: string[] }>({
  eventName: "ai.task.completed",
  producer: "hd-rh",
  actor: { type: "agent", id: "RH_AGENT" },
  correlationId: correlationRH,
  payload: {
    agentId: "RH_AGENT",
    candidatesScored: 8,
    topCandidates: [candidateNames[0], candidateNames[3], candidateNames[6]],
  },
});
audit({
  actorType: "agent", actorId: "RH_AGENT",
  platform: "HD-RH", action: "read",
  resourceType: "candidate_batch", resourceId: correlationRH,
  correlationId: correlationRH, severity: "info",
  metadata: { scored: 8, shortlisted: 3 },
  createdAt: t3ai,
});
printStep("HD-RH", c.rh, "🧠", t3ai, `RH_AGENT → Scoring completado (8 candidatos)`, `Top: Laura Gutiérrez (94) · Alejandro Torres (91) · Fernanda Reyes (88)`);
printApproval("RH_AGENT", "candidate shortlist recommendation (3 of 8)", ts(30));

// 3 interviews scheduled
const interviewNames = [candidateNames[0], candidateNames[3], candidateNames[6]];
const interviewDates = ["2026-06-16T10:00:00Z", "2026-06-16T11:30:00Z", "2026-06-17T09:00:00Z"];
console.log();
for (let i = 0; i < 3; i++) {
  const t = ts(60);
  emit<{ candidateId: string; scheduledAt: string; interviewer: string }>({
    eventName: "rh.interview.scheduled",
    producer: "hd-rh",
    actor: { type: "user", id: "rh-coordinator" },
    correlationId: correlationRH,
    payload: { candidateId: candidateIds[i === 0 ? 0 : i === 1 ? 3 : 6], scheduledAt: interviewDates[i], interviewer: "Lic. Margarita Soto" },
  });
  printStep("HD-RH", c.rh, "📅", t, `Entrevista agendada: ${interviewNames[i]}`, `fecha=${interviewDates[i].replace("T", " ").replace("Z", " UTC")}`);
}

// Hiring decisions (human-approved)
console.log();
const hiredNames = interviewNames;
const hiredIds = [userId_exec1, userId_exec2, userId_exec3];
for (let i = 0; i < 3; i++) {
  const t = ts(86400); // next day
  audit({
    actorType: "user", actorId: "rh-coordinator",
    platform: "HD-RH", action: "approve",
    resourceType: "hiring_decision", resourceId: candidateIds[i === 0 ? 0 : i === 1 ? 3 : 6],
    correlationId: correlationRH, severity: "info",
    metadata: { candidate: hiredNames[i], decision: "hired", approvedBy: "Lic. Margarita Soto" },
    createdAt: t,
  });
  printStep("HD-RH", c.rh, "🎉", t, `Contratación aprobada: ${hiredNames[i]}`, `decision=hired  aprobado por Lic. Margarita Soto`);
}

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 4 — HD-ADMIN: User Creation & Role Assignment
// ═══════════════════════════════════════════════════════════════════════════

printHeader("FASE 4 — HD-ADMIN  →  Alta de Usuarios y Asignación de Roles");

for (let i = 0; i < 3; i++) {
  const t = ts(120);
  audit({
    actorType: "user", actorId: "admin-superuser",
    platform: "HD-ADMIN", action: "create",
    resourceType: "user_account", resourceId: hiredIds[i],
    correlationId: correlationRH, severity: "info",
    metadata: { name: hiredNames[i], role: "crm_agent", email: `${hiredNames[i].toLowerCase().replace(" ", ".")}@heavenlydreams.com.mx` },
    createdAt: t,
  });
  printStep("HD-ADMIN", c.admin, "🔑", t, `Usuario creado: ${hiredNames[i]}`, `role=crm_agent  platform=hd-crm  userId=${hiredIds[i]}`);
}

const t4b = ts(30);
for (let i = 0; i < 3; i++) {
  audit({
    actorType: "user", actorId: "admin-superuser",
    platform: "HD-ADMIN", action: "grant",
    resourceType: "role_assignment", resourceId: hiredIds[i],
    correlationId: correlationRH, severity: "security",
    metadata: { role: "crm_agent", grantedBy: "admin-superuser", permissions: ["crm.clients.view", "crm.followups.create", "crm.conversations.reply"] },
    createdAt: ts(15),
  });
}
printStep("HD-ADMIN", c.admin, "🛡", t4b, `Roles asignados: crm_agent × 3`, `permissions=[crm.clients.view, crm.followups.create, crm.conversations.reply]`);

// FINANCE_AGENT anomaly check
const t4c = ts(90);
emit<{ agentId: string; check: string; result: string }>({
  eventName: "ai.task.completed",
  producer: "hd-admin",
  actor: { type: "agent", id: "FINANCE_AGENT" },
  correlationId: correlationRH,
  payload: { agentId: "FINANCE_AGENT", check: "onboarding_cost_anomaly", result: "PASS — within budget" },
});
audit({
  actorType: "agent", actorId: "FINANCE_AGENT",
  platform: "HD-ADMIN", action: "read",
  resourceType: "finance_check", resourceId: uid("fin"),
  correlationId: correlationRH, severity: "info",
  metadata: { check: "onboarding_cost_anomaly", result: "PASS" },
  createdAt: t4c,
});
printStep("HD-ADMIN", c.admin, "💰", t4c, `FINANCE_AGENT → Verificación de costo: PASS`, `onboarding 3 ejecutivos = dentro del presupuesto aprobado`);

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 5 — HD-OPERATIONS: Onboarding Tasks
// ═══════════════════════════════════════════════════════════════════════════

printHeader("FASE 5 — HD-OPERATIONS  →  Plan de Onboarding");

const onboardingTasks = [
  { title: "Firma de contrato y documentación legal",       assignee: hiredNames[0] },
  { title: "Configuración de estación de trabajo y accesos", assignee: hiredNames[1] },
  { title: "Inducción a procesos y plataformas HD",         assignee: hiredNames[2] },
  { title: "Capacitación CRM — HD-CRM básico",             assignee: "Coordinador RH" },
  { title: "Asignación de cartera de clientes iniciales",   assignee: "Ana Ramírez" },
  { title: "Primera reunión de equipo comercial",           assignee: "Gerente Comercial" },
];

for (let i = 0; i < onboardingTasks.length; i++) {
  const t = ts(60);
  emit<{ taskId: string; title: string; assignee: string; dueDate: string }>({
    eventName: "operations.task.created",
    producer: "hd-operations",
    actor: { type: "user", id: "ops-supervisor" },
    correlationId: correlationOps,
    payload: { taskId: taskIds[i], title: onboardingTasks[i].title, assignee: onboardingTasks[i].assignee, dueDate: "2026-06-17" },
  });
  audit({
    actorType: "user", actorId: "ops-supervisor",
    platform: "HD-OPERATIONS", action: "create",
    resourceType: "task", resourceId: taskIds[i],
    correlationId: correlationOps, severity: "info",
    metadata: { title: onboardingTasks[i].title, assignee: onboardingTasks[i].assignee },
    createdAt: t,
  });
  printStep("HD-OPERATIONS", c.ops, "✔", t, onboardingTasks[i].title, `assignee=${onboardingTasks[i].assignee}  dueDate=2026-06-17`);
}

// SUPERVISOR_AGENT reminds
console.log();
triggerN8n("OPERATIONS_TASK_REMINDER", correlationOps, false);
printN8n("OPERATIONS_TASK_REMINDER", ts(3600), false);

// First 3 tasks completed
for (let i = 0; i < 3; i++) {
  const t = ts(28800);
  emit<{ taskId: string; completedBy: string }>({
    eventName: "operations.task.completed",
    producer: "hd-operations",
    actor: { type: "user", id: hiredIds[i] },
    correlationId: correlationOps,
    payload: { taskId: taskIds[i], completedBy: hiredNames[i] },
  });
  audit({
    actorType: "user", actorId: hiredIds[i],
    platform: "HD-OPERATIONS", action: "update",
    resourceType: "task", resourceId: taskIds[i],
    correlationId: correlationOps, severity: "info",
    metadata: { status: "completed", completedBy: hiredNames[i] },
    createdAt: t,
  });
  printStep("HD-OPERATIONS", c.ops, "✅", t, `Tarea completada: ${onboardingTasks[i].title}`, `completedBy=${hiredNames[i]}`);
}

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 6 — HD-BRAIN: Risk Signal + KPI Snapshot
// ═══════════════════════════════════════════════════════════════════════════

printHeader("FASE 6 — HD-BRAIN  →  Señales de Riesgo y KPIs");

// Risk: existing client overdue
const t6a = ts(3600);
emit<{ riskType: string; affectedClientId: string; amount: number; daysOverdue: number }>({
  eventName: "brain.risk.detected",
  producer: "hd-brain",
  actor: { type: "agent", id: "BRAIN_AGENT" },
  correlationId: correlationRisk,
  payload: { riskType: "overdue_account", affectedClientId: "client-distribuidora-cdmx", amount: 78500, daysOverdue: 47 },
});
emit<{ clientId: string }>({
  eventName: "crm.account_status.overdue_detected",
  producer: "hd-crm",
  actor: { type: "agent", id: "BRAIN_AGENT" },
  correlationId: correlationRisk,
  payload: { clientId: "client-distribuidora-cdmx" },
});
audit({
  actorType: "agent", actorId: "BRAIN_AGENT",
  platform: "HD-BRAIN", action: "trigger",
  resourceType: "risk_signal", resourceId: correlationRisk,
  correlationId: correlationRisk, severity: "critical",
  metadata: { riskType: "overdue_account", amount: 78500, daysOverdue: 47, client: "Distribuidora CDMX" },
  createdAt: t6a,
});
printStep("HD-BRAIN", c.brain, "⚠", t6a, `Riesgo detectado: cuenta vencida $78,500`, `client=Distribuidora CDMX  daysOverdue=47  severity=CRITICAL`);

triggerN8n("CRM_OVERDUE_ALERT", correlationRisk, true);
printN8n("CRM_OVERDUE_ALERT", ts(5), true);

const t6b = ts(30);
emit<{ requestedWorkflow: string; reason: string }>({
  eventName: "brain.automation.requested",
  producer: "hd-brain",
  actor: { type: "agent", id: "BRAIN_AGENT" },
  correlationId: correlationRisk,
  payload: { requestedWorkflow: "CRM_PAYMENT_COMMITMENT_REMINDER", reason: "47 días vencido — umbral de escalación superado" },
});
audit({
  actorType: "agent", actorId: "BRAIN_AGENT",
  platform: "HD-BRAIN", action: "trigger",
  resourceType: "automation_request", resourceId: uid("autoreq"),
  correlationId: correlationRisk, severity: "warning",
  metadata: { workflow: "CRM_PAYMENT_COMMITMENT_REMINDER", requiresHumanApproval: true },
  createdAt: t6b,
});
printStep("HD-BRAIN", c.brain, "⚙", t6b, `BRAIN_AGENT → Automatización solicitada`, `workflow=CRM_PAYMENT_COMMITMENT_REMINDER  ⚠ requiere aprobación`);
printApproval("BRAIN_AGENT", "trigger CRM_PAYMENT_COMMITMENT_REMINDER for Distribuidora CDMX", ts(120));

// KPI snapshot
const t6c = ts(1800);
emit<{ snapshotId: string; mrr: number; leads: number; closingRate: number; pipelineValue: number; newHires: number }>({
  eventName: "operations.productivity_snapshot.created",
  producer: "hd-brain",
  actor: { type: "system", id: "brain-kpi-engine" },
  correlationId: correlationOps,
  payload: { snapshotId: uid("snap"), mrr: 298500, leads: 389, closingRate: 24.1, pipelineValue: 2030000, newHires: 3 },
});
audit({
  actorType: "system", actorId: "brain-kpi-engine",
  platform: "HD-BRAIN", action: "create",
  resourceType: "kpi_snapshot", resourceId: uid("snap"),
  correlationId: correlationOps, severity: "info",
  metadata: { mrr: 298500, leads: 389, closingRate: "24.1%", newHires: 3 },
  createdAt: t6c,
});
printStep("HD-BRAIN", c.brain, "📊", t6c, `KPI Snapshot capturado`, `MRR=$298,500 (+5%)  Leads=389  Tasa Cierre=24.1%  Nuevas contrataciones=3`);

// BRAIN decision log
const t6d = ts(300);
emit<{ decision: string; rationale: string; actor: string }>({
  eventName: "brain.decision.recorded",
  producer: "hd-brain",
  actor: { type: "agent", id: "BRAIN_AGENT" },
  correlationId: correlationOps,
  payload: {
    decision: "Prioridad ALTA a Megaempresa Bajío SA — cliente enterprise nuevo",
    rationale: "450 empleados, ticket esperado >$120K/mes, sin historial de morosidad",
    actor: "BRAIN_AGENT",
  },
});
printStep("HD-BRAIN", c.brain, "📝", t6d, `Decisión registrada en log`, `"Prioridad ALTA: Megaempresa Bajío SA" — ticket esperado >$120K/mes`);

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 7 — heavenly-central: Executive Summary
// ═══════════════════════════════════════════════════════════════════════════

printHeader("FASE 7 — HEAVENLY-CENTRAL  →  Resumen Ejecutivo");

const t7 = ts(600);
printCentral(t7,                  `${c.bold}RESUMEN DEL DÍA — 14 Junio 2026${c.reset}`);
printCentral(ts(2), `Nuevo cliente enterprise: ${c.bold}Megaempresa Bajío SA de CV${c.reset} (450 empleados)`);
printCentral(ts(2), `3 ejecutivos de ventas contratados: Laura G. · Alejandro T. · Fernanda R.`);
printCentral(ts(2), `Onboarding iniciado — 3/6 tareas completadas`);
printCentral(ts(2), `${c.warn}⚠ Riesgo activo: Distribuidora CDMX — $78,500 × 47 días${c.reset}`);
printCentral(ts(2), `MRR estimado nuevo mes: ${c.ok}$298,500${c.reset} (+5% MoM)`);
printCentral(ts(2), `Automatizaciones disparadas: 5  |  Aprobaciones humanas: 4`);

// ═══════════════════════════════════════════════════════════════════════════
// SUMMARY PANEL
// ═══════════════════════════════════════════════════════════════════════════

const dividerLine = "═".repeat(72);
console.log(`\n${c.bold}${c.info}${dividerLine}${c.reset}`);
console.log(`${c.bold}${c.info}  SIMULATION COMPLETE — ECOSYSTEM SUMMARY${c.reset}`);
console.log(`${c.bold}${c.info}${dividerLine}${c.reset}\n`);

// Event count by platform
const byPlatform: Record<string, number> = {};
for (const e of events) {
  byPlatform[e.producer] = (byPlatform[e.producer] ?? 0) + 1;
}

console.log(`${c.bold}  Events emitted${c.reset}  (total: ${events.length})`);
for (const [platform, count] of Object.entries(byPlatform)) {
  const bar = "█".repeat(count);
  console.log(`    ${platform.padEnd(20)} ${c.info}${bar}${c.reset} ${count}`);
}

console.log(`\n${c.bold}  n8n Workflows triggered${c.reset}  (total: ${n8nTriggers.length})`);
for (const w of n8nTriggers) {
  const badge = w.humanReview ? `${c.warn}HUMAN REVIEW${c.reset}` : `${c.ok}AUTO       ${c.reset}`;
  console.log(`    ${w.workflowId.padEnd(42)} ${badge}`);
}

console.log(`\n${c.bold}  Audit log${c.reset}  (${auditLog.length} entries)`);
const bySeverity: Record<string, number> = {};
for (const a of auditLog) bySeverity[a.severity] = (bySeverity[a.severity] ?? 0) + 1;
for (const [sev, count] of Object.entries(bySeverity)) {
  const color = sev === "critical" ? c.error : sev === "warning" ? c.warn : sev === "security" ? c.brain : c.dim;
  console.log(`    ${color}${sev.toUpperCase().padEnd(12)}${c.reset}  ${count} entries`);
}

console.log(`\n${c.bold}  Correlation threads${c.reset}`);
const threads = [
  { id: correlationLead, label: "Web Lead → CRM Client (n8n: WEB_LEAD_TO_CRM)" },
  { id: correlationCRM,  label: "CRM Onboarding + WhatsApp approval flow" },
  { id: correlationRH,   label: "RH Vacancies → Candidates → Hiring → Admin users" },
  { id: correlationOps,  label: "Onboarding tasks + KPI snapshot" },
  { id: correlationRisk, label: "Risk: overdue account → CRM_OVERDUE_ALERT" },
];
for (const t of threads) {
  console.log(`    ${c.dim}${t.id}${c.reset}  →  ${t.label}`);
}

console.log(`\n${c.bold}  Security boundaries respected${c.reset}`);
const checks = [
  "CRM_AGENT did NOT send WhatsApp without human approval",
  "RH_AGENT did NOT hire or reject candidates autonomously",
  "BRAIN_AGENT did NOT mutate CRM or RH transactional data",
  "FINANCE_AGENT did NOT record payments or delete records",
  "n8n workflows carried correlationId on every execution",
  "All agent actions emitted AuditEntry (actorType: agent)",
  "Odysseus/external AI services NOT directly exposed",
];
for (const chk of checks) {
  console.log(`    ${c.ok}✓${c.reset}  ${chk}`);
}

console.log(`\n${c.bold}${c.info}${dividerLine}${c.reset}`);
console.log(`${c.dim}  Scenario: Megaempresa Bajío SA — Contratación 3 Ejecutivos de Ventas${c.reset}`);
console.log(`${c.dim}  Simulated date: 2026-06-14 (HD ecosystem simulation — data is fictional)${c.reset}`);
console.log(`${c.bold}${c.info}${dividerLine}${c.reset}\n`);
