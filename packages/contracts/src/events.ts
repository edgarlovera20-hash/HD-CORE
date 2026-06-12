export const hdEvents = {
  webLeadCreated: "web.lead.created",
  rhCandidateCreated: "rh.candidate.created",
  rhInterviewScheduled: "rh.interview.scheduled",
  crmClientCreated: "crm.client.created",
  crmClientAssigned: "crm.client.assigned",
  crmAccountOverdueDetected: "crm.account_status.overdue_detected",
  crmConversationStarted: "crm.conversation.started",
  crmConversationEscalatedToHuman: "crm.conversation.escalated_to_human",
  crmPaymentCommitmentCreated: "crm.payment_commitment.created",
  crmPaymentCommitmentMissed: "crm.payment_commitment.missed",
  operationsTaskCreated: "operations.task.created",
  operationsTaskCompleted: "operations.task.completed",
  operationsProductivitySnapshotCreated: "operations.productivity_snapshot.created",
  financePaymentRecorded: "finance.payment.recorded",
  brainRiskDetected: "brain.risk.detected",
  brainAutomationRequested: "brain.automation.requested",
  brainDecisionRecorded: "brain.decision.recorded",
  auditActionRecorded: "audit.action.recorded"
} as const;

export type HdEventName = typeof hdEvents[keyof typeof hdEvents];

export interface HdEventEnvelope<TPayload = Record<string, unknown>> {
  eventId: string;
  eventName: HdEventName;
  version: string;
  occurredAt: string;
  producer: string;
  actor: {
    type: "user" | "service_principal" | "system";
    id: string;
  };
  correlationId: string;
  payload: TPayload;
}
