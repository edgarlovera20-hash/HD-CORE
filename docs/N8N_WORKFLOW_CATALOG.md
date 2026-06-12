# N8N Workflow Catalog — Heavenly Dreams Ecosystem

## Overview

This document catalogs all permitted n8n automation workflows across the ecosystem. Only workflows listed here are authorized for production execution. The machine-readable contract is in `contracts/n8n-workflows.v1.json`.

## Authorization Rules

1. Every workflow must have a designated `ownerPlatform` and `requiredServicePrincipal`.
2. No workflow may perform actions outside its `requiredPermissions`.
3. Every execution must carry a `correlationId` and produce an `AuditEntry` with `actorType=n8n_workflow`.
4. Workflows with `humanReviewRequired=true` must queue their output for human approval before triggering downstream actions.
5. `forbiddenActions` are hard-blocked. Any attempt to call them must produce a `security` severity AuditEntry and be rejected.

## Workflow Catalog

### WEB_LEAD_TO_CRM
| Field | Value |
|---|---|
| Owner | HD-WEB |
| Trigger | `web_lead_form_submitted` |
| Service Principal | `n8n-web-sp` |
| Permissions | `crm:lead:create` |
| Human Review | Not required |
| Audit | Required |
| Forbidden | `crm:client:update`, `crm:payment:create`, `rbac:role:assign` |

### CRM_OVERDUE_ALERT
| Field | Value |
|---|---|
| Owner | HD-CRM |
| Trigger | `payment_overdue_detected` |
| Service Principal | `n8n-crm-sp` |
| Permissions | `crm:client:read`, `notification:send` |
| Human Review | Not required |
| Audit | Required |
| Forbidden | `crm:payment:create`, `crm:payment:delete`, `crm:client:delete` |

### CRM_PAYMENT_COMMITMENT_REMINDER
| Field | Value |
|---|---|
| Owner | HD-CRM |
| Trigger | `payment_commitment_due_soon` |
| Service Principal | `n8n-crm-sp` |
| Permissions | `crm:client:read`, `crm:commitment:read`, `notification:send` |
| Human Review | Not required |
| Audit | Required |
| Forbidden | `crm:payment:create`, `crm:payment:delete`, `crm:commitment:delete` |

### RH_CANDIDATE_FOLLOWUP_DRAFT
| Field | Value |
|---|---|
| Owner | HD-RH |
| Trigger | `candidate_interview_completed` |
| Service Principal | `n8n-rh-sp` |
| Permissions | `rh:candidate:read`, `rh:interview:read` |
| Human Review | **Required** |
| Audit | Required |
| Forbidden | `rh:candidate:hire`, `rh:candidate:reject`, `rh:offer:create` |

### OPERATIONS_TASK_REMINDER
| Field | Value |
|---|---|
| Owner | HD-OPERATIONS |
| Trigger | `task_due_approaching` |
| Service Principal | `n8n-operations-sp` |
| Permissions | `operations:task:read`, `notification:send` |
| Human Review | Not required |
| Audit | Required |
| Forbidden | `operations:task:delete`, `rbac:role:assign`, `crm:client:update` |

### ADMIN_FINANCE_ANOMALY_ALERT
| Field | Value |
|---|---|
| Owner | HD-ADMIN |
| Trigger | `finance_anomaly_detected` |
| Service Principal | `n8n-admin-sp` |
| Permissions | `admin:finance:read`, `notification:send` |
| Human Review | **Required** |
| Audit | Required |
| Forbidden | `admin:payment:create`, `admin:payment:delete`, `admin:finance:delete`, `rbac:role:assign` |

### BRAIN_RISK_REVIEW_REQUEST
| Field | Value |
|---|---|
| Owner | HD-BRAIN |
| Trigger | `risk_signal_threshold_exceeded` |
| Service Principal | `n8n-brain-sp` |
| Permissions | `brain:kpi:read`, `brain:risk:read`, `notification:send` |
| Human Review | **Required** |
| Audit | Required |
| Forbidden | `crm:client:update`, `admin:finance:update`, `rh:candidate:hire`, `rbac:role:assign` |

## Adding New Workflows

Before creating a new n8n workflow:
1. Add it to `contracts/n8n-workflows.v1.json` in a PR against HD-CORE.
2. Define `ownerPlatform`, `requiredServicePrincipal`, `requiredPermissions`, `forbiddenActions`.
3. Get approval from the platform owner and architecture team.
4. Only then implement in n8n.
