# HD n8n Workflow Catalog

**Versión:** 1.0.0
**Propietario:** HD-CORE / Architecture
**Contrato:** `contracts/n8n-workflows.v1.json`

---

## Principio

Solo los workflows explícitamente listados en este catálogo están autorizados en el ecosistema Heavenly Dreams. Ningún workflow nuevo puede desplegarse sin:

1. Actualizar `contracts/n8n-workflows.v1.json` en HD-CORE
2. Actualizar este catálogo
3. Revisión y aprobación de arquitectura
4. PR mergeado en `claude/laughing-hawking-pau9wz`

---

## Workflows Autorizados (7)

### 1. WEB_LEAD_TO_CRM

| Campo | Valor |
|-------|-------|
| **ID** | `WEB_LEAD_TO_CRM` |
| **Propietario** | HD-WEB |
| **Trigger** | `form_submission` — cuando un visitante envía el formulario de contacto/lead en HD-WEB |
| **Acción** | Enruta el lead capturado en HD-WEB hacia HD-CRM para su registro |
| **Human Review** | No requerido |
| **Propósito** | Automatizar la captura de leads del sitio público hacia el CRM sin intervención manual |

**Flujo:**
```
HD-WEB form submit
    │
    ▼
n8n WEB_LEAD_TO_CRM workflow
    │
    ├── Validar datos del lead
    ├── Generar correlationId
    ├── POST a HD-CRM API /leads
    ├── Generar AuditEntry (actorType: "n8n_workflow")
    └── Notificar al equipo CRM (si configurado)
```

---

### 2. CRM_OVERDUE_ALERT

| Campo | Valor |
|-------|-------|
| **ID** | `CRM_OVERDUE_ALERT` |
| **Propietario** | HD-CRM |
| **Trigger** | `scheduled_daily` — ejecuta cada día a la hora configurada |
| **Acción** | Consulta cuentas vencidas en HD-CRM y envía alertas al equipo de cobranza |
| **Human Review** | No requerido |
| **Propósito** | Asegurar que ninguna cuenta morosa pase desapercibida; mantener al equipo informado diariamente |

**Flujo:**
```
Scheduler (daily)
    │
    ▼
n8n CRM_OVERDUE_ALERT workflow
    │
    ├── GET HD-CRM API /accounts?status=overdue
    ├── Filtrar cuentas según umbral configurado
    ├── Enviar alertas (email/WhatsApp/Slack)
    ├── Generar AuditEntry
    └── (NO modifica ningún registro)
```

---

### 3. CRM_PAYMENT_COMMITMENT_REMINDER

| Campo | Valor |
|-------|-------|
| **ID** | `CRM_PAYMENT_COMMITMENT_REMINDER` |
| **Propietario** | HD-CRM |
| **Trigger** | `commitment_date_minus_1d` — 24 horas antes de la fecha de compromiso de pago |
| **Acción** | Envía recordatorio al cliente sobre su compromiso de pago pendiente |
| **Human Review** | No requerido |
| **Propósito** | Reducir el incumplimiento de compromisos de pago mediante recordatorios oportunos |

**Flujo:**
```
Trigger: 24h antes de commitment_date
    │
    ▼
n8n CRM_PAYMENT_COMMITMENT_REMINDER workflow
    │
    ├── GET HD-CRM API /commitments?due_in=24h
    ├── Para cada compromiso: enviar recordatorio con plantilla aprobada
    ├── Registrar envío en HD-CRM
    ├── Generar AuditEntry
    └── (NUNCA contactar sin plantilla aprobada)
```

---

### 4. RH_CANDIDATE_FOLLOWUP_DRAFT

| Campo | Valor |
|-------|-------|
| **ID** | `RH_CANDIDATE_FOLLOWUP_DRAFT` |
| **Propietario** | HD-RH |
| **Trigger** | `candidate_stage_change` — cuando un candidato cambia de etapa en el pipeline de reclutamiento |
| **Acción** | Genera un borrador de seguimiento para el candidato; lo encola para revisión humana |
| **Human Review** | **Sí — REQUERIDO** |
| **Propósito** | Agilizar la comunicación con candidatos; el reclutador revisa y aprueba antes del envío |

**Flujo:**
```
Candidate stage_change event
    │
    ▼
n8n RH_CANDIDATE_FOLLOWUP_DRAFT workflow
    │
    ├── GET candidato de HD-RH API
    ├── Generar borrador de comunicación (via RH_AGENT)
    ├── **Encolar para revisión humana** (humanReviewRequired: true)
    ├── Notificar al reclutador: "Borrador listo para revisión"
    └── Generar AuditEntry
         (el borrador NO se envía sin aprobación)
```

---

### 5. OPERATIONS_TASK_REMINDER

| Campo | Valor |
|-------|-------|
| **ID** | `OPERATIONS_TASK_REMINDER` |
| **Propietario** | HD-OPERATIONS |
| **Trigger** | `task_due_minus_1h` — 1 hora antes del vencimiento de una tarea |
| **Acción** | Envía recordatorio al responsable de la tarea próxima a vencer |
| **Human Review** | No requerido |
| **Propósito** | Reducir tareas vencidas y mejorar la puntualidad operacional del equipo |

**Flujo:**
```
Trigger: 1h antes de task.dueDate
    │
    ▼
n8n OPERATIONS_TASK_REMINDER workflow
    │
    ├── GET HD-OPERATIONS API /tasks?due_in=1h
    ├── Para cada tarea: notificar al responsable
    ├── Generar AuditEntry
    └── (NO reasigna tareas automáticamente)
```

---

### 6. ADMIN_FINANCE_ANOMALY_ALERT

| Campo | Valor |
|-------|-------|
| **ID** | `ADMIN_FINANCE_ANOMALY_ALERT` |
| **Propietario** | HD-ADMIN |
| **Trigger** | `anomaly_detected` — cuando el FINANCE_AGENT detecta una anomalía financiera |
| **Acción** | Alerta al equipo de finanzas y administración; encola para revisión humana |
| **Human Review** | **Sí — REQUERIDO** |
| **Propósito** | Detectar y escalar anomalías financieras (gastos inusuales, transacciones sospechosas) a tiempo |

**Flujo:**
```
FINANCE_AGENT detecta anomalía
    │
    ▼
n8n ADMIN_FINANCE_ANOMALY_ALERT workflow
    │
    ├── Recibir señal de anomalía de HD-ADMIN API
    ├── Enriquecer con contexto (FINANCE_AGENT)
    ├── **Encolar para revisión humana** (humanReviewRequired: true)
    ├── Notificar al Director Financiero / Admin
    └── Generar AuditEntry severity: "warning" o "critical"
```

---

### 7. BRAIN_RISK_REVIEW_REQUEST

| Campo | Valor |
|-------|-------|
| **ID** | `BRAIN_RISK_REVIEW_REQUEST` |
| **Propietario** | HD-BRAIN |
| **Trigger** | `risk_signal_threshold` — cuando BRAIN_AGENT detecta que una señal de riesgo supera el umbral definido |
| **Acción** | Escala la señal de riesgo al liderazgo para revisión y decisión |
| **Human Review** | **Sí — REQUERIDO** |
| **Propósito** | Garantizar que riesgos estratégicos significativos siempre llegan a manos humanas para decisión |

**Flujo:**
```
BRAIN_AGENT detecta riesgo > threshold
    │
    ▼
n8n BRAIN_RISK_REVIEW_REQUEST workflow
    │
    ├── Recibir señal de riesgo de HD-BRAIN API
    ├── Agregar contexto y KPIs relacionados
    ├── **Encolar para revisión humana** (humanReviewRequired: true)
    ├── Notificar al liderazgo (Director General / CTO)
    └── Generar AuditEntry severity: "warning" o "critical"
         (BRAIN_AGENT NUNCA ejecuta acciones correctivas directamente)
```

---

## Acciones Prohibidas en Workflows (7)

Las siguientes acciones están estrictamente prohibidas en cualquier workflow n8n, independientemente del propósito:

| Acción Prohibida | Razón |
|-----------------|-------|
| `direct_role_or_permission_change` | Los cambios de permisos solo pueden realizarlos usuarios autorizados en HD-ADMIN |
| `direct_client_debt_forgiveness` | Condonar deuda requiere autorización humana explícita, no puede automatizarse |
| `direct_candidate_hiring_or_rejection` | Las decisiones de contratación son exclusivamente humanas |
| `direct_finance_record_deletion` | Los registros financieros son inmutables; ningún workflow puede eliminarlos |
| `direct_client_contact_without_consent` | Todo contacto con clientes requiere plantilla aprobada y consentimiento previo |
| `direct_platform_api_bypass` | Toda integración pasa por APIs controladas con autenticación y RBAC |
| `direct_database_mutation` | Los workflows no acceden directamente a ninguna base de datos |

---

## Campos Requeridos por Ejecución de Workflow

Cada ejecución de un workflow n8n debe registrar los siguientes campos en su `AuditEntry`:

```typescript
{
  auditId: string;              // UUID nuevo por ejecución
  actorType: "n8n_workflow";    // Siempre este valor para workflows
  actorId: string;              // ID del service principal del workflow
  platform: string;             // Plataforma propietaria del workflow
  action: "trigger";            // Siempre "trigger" para ejecuciones de workflow
  resourceType: string;         // Tipo de recurso procesado (ej. "lead", "candidate")
  resourceId: string;           // ID del recurso procesado
  correlationId: string;        // UUID propagado desde el evento trigger
  severity: "info" | "warning"; // "warning" si requirió human review
  metadata: {
    workflowId: HdN8nWorkflowId;    // ID del workflow ejecutado
    idempotencyKey: string;          // Clave de idempotencia única
    servicePrincipalId: string;      // ID del service principal
    humanReviewRequired: boolean;    // Si requirió revisión humana
    humanReviewQueueId?: string;     // ID en la cola de revisión humana
    executionStatus: "success" | "failed" | "queued_for_review";
  };
  createdAt: string;            // ISO 8601
}
```

### Política de Idempotencia

Cada ejecución de workflow debe generar una `idempotencyKey` única derivada de:
- `workflowId` + `triggerId` + `resourceId` + `date`

Esto garantiza que un mismo evento no procese el mismo recurso múltiples veces (por reintentos, duplicados, etc.).

---

## Política de Reintentos

| Workflow | Max Intentos | Backoff |
|---------|-------------|---------|
| `WEB_LEAD_TO_CRM` | 3 | 1000ms |
| `CRM_OVERDUE_ALERT` | 3 | 5000ms |
| `CRM_PAYMENT_COMMITMENT_REMINDER` | 3 | 5000ms |
| `RH_CANDIDATE_FOLLOWUP_DRAFT` | 2 | 2000ms |
| `OPERATIONS_TASK_REMINDER` | 3 | 1000ms |
| `ADMIN_FINANCE_ANOMALY_ALERT` | 3 | 2000ms |
| `BRAIN_RISK_REVIEW_REQUEST` | 3 | 2000ms |

### Política de Error

| Tipo de Error | Acción |
|--------------|--------|
| Error de red temporal | Reintentar según política |
| Error de autenticación | `alert_admin` (no reintentar) |
| Error de validación | `fail_silent` + log |
| Error en lógica de negocio crítica | `escalate_to_human` |

---

## Agregar un Nuevo Workflow

1. Proponer en un issue o PR en HD-CORE con justificación de negocio
2. Definir: `workflowId`, `ownerPlatform`, `trigger`, `humanReviewRequired`, `servicePrincipalId`, `idempotencyKey`, `retryPolicy`, `errorPolicy`
3. Actualizar `contracts/n8n-workflows.v1.json`
4. Actualizar `packages/contracts/src/n8n-workflows.ts` (agregar el ID al tipo `HdN8nWorkflowId`)
5. Actualizar este catálogo con la documentación completa
6. PR revisado y aprobado por Architecture
7. Implementar el workflow en n8n usando el `servicePrincipalId` correcto

---

*Versión 1.0.0 — 2026-06-12*
