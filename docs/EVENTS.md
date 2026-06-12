# Events — HD-CORE

## Rol de HD-CORE

HD-CORE no produce ni consume eventos de dominio: **define el catálogo oficial de nombres de eventos y el envelope compartido**. Toda plataforma importa los nombres desde `packages/contracts/src/events.ts` (`hdEvents`) y envuelve payloads en `HdEventEnvelope<T>`.

## Envelope Oficial

```typescript
interface HdEventEnvelope<TPayload> {
  eventId: string;
  eventName: HdEventName;   // siempre desde hdEvents
  version: string;
  occurredAt: string;        // ISO 8601
  producer: string;          // platform id
  actor: { type: "user" | "service_principal" | "system"; id: string };
  correlationId: string;
  payload: TPayload;
}
```

## Catálogo Actual (hdEvents)

| Constante | Nombre | Producer |
|---|---|---|
| webLeadCreated | web.lead.created | HD-WEB |
| rhCandidateCreated | rh.candidate.created | HD-RH |
| rhInterviewScheduled | rh.interview.scheduled | HD-RH |
| crmClientCreated | crm.client.created | HD-CRM |
| crmClientAssigned | crm.client.assigned | HD-CRM |
| crmAccountOverdueDetected | crm.account_status.overdue_detected | HD-CRM |
| crmConversationStarted | crm.conversation.started | HD-CRM |
| crmConversationEscalatedToHuman | crm.conversation.escalated_to_human | HD-CRM |
| crmPaymentCommitmentCreated | crm.payment_commitment.created | HD-CRM |
| crmPaymentCommitmentMissed | crm.payment_commitment.missed | HD-CRM |
| operationsTaskCreated | operations.task.created | HD-OPERATIONS |
| operationsTaskCompleted | operations.task.completed | HD-OPERATIONS |
| operationsProductivitySnapshotCreated | operations.productivity_snapshot.created | HD-OPERATIONS |
| financePaymentRecorded | finance.payment.recorded | HD-ADMIN |
| brainRiskDetected | brain.risk.detected | HD-BRAIN |
| brainAutomationRequested | brain.automation.requested | HD-BRAIN |
| brainDecisionRecorded | brain.decision.recorded | HD-BRAIN |
| auditActionRecorded | audit.action.recorded | todas |

## Reglas

1. Si una plataforma necesita un evento que no existe, se agrega **primero aquí** vía PR.
2. Los nombres siguen el patrón `<dominio>.<entidad>.<acción>` en snake_case por segmento.
3. Ningún repo hardcodea strings de evento: siempre `hdEvents.*`.
4. Todo payload excluye PII completa — solo identificadores.
5. Versionar con `version` en el envelope cuando cambie el payload.
