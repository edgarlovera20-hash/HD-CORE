export const crmEvents = {
  clientCreated: "crm.client.created",
  clientAssigned: "crm.client.assigned",
  overdueDetected: "crm.account_status.overdue_detected",
  conversationStarted: "crm.conversation.started",
  conversationEscalatedToHuman: "crm.conversation.escalated_to_human",
  paymentCommitmentCreated: "crm.payment_commitment.created",
  paymentCommitmentMissed: "crm.payment_commitment.missed"
} as const;

export type CrmEventName = typeof crmEvents[keyof typeof crmEvents];
