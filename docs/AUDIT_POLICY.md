# Audit Policy — Heavenly Dreams Ecosystem

## Purpose

Every mutation, agent action, workflow execution, and permission change across the Heavenly Dreams platform ecosystem must produce an immutable `AuditEntry`. This policy is non-negotiable and applies to all 7 platforms.

## Contract Reference

The canonical schema is defined in:
- `contracts/audit.v1.json` (machine-readable)
- `packages/contracts/src/audit.ts` (TypeScript)

## Mandatory Fields

| Field | Type | Description |
|---|---|---|
| `auditId` | UUID | Unique identifier for this audit entry |
| `actorType` | enum | `user`, `service_principal`, `agent`, `n8n_workflow`, `system` |
| `actorId` | string | Identifier of the actor performing the action |
| `platform` | enum | Source platform |
| `action` | string | Verb: create, update, delete, read, login, grant, revoke, trigger, approve, reject |
| `resourceType` | string | Type of resource affected |
| `resourceId` | string | ID of the resource affected |
| `correlationId` | UUID | Links related events across platforms |
| `metadata` | object | Additional context specific to the action |
| `createdAt` | ISO 8601 | Timestamp of the event |
| `severity` | enum | `info`, `warning`, `critical`, `security` |

## Severity Levels

| Level | When to use |
|---|---|
| `info` | Normal operations: reads, logins, workflow executions |
| `warning` | Unusual patterns: repeated failures, near-threshold events |
| `critical` | High-impact mutations: bulk deletes, permission changes, financial records |
| `security` | Security events: failed auth, RBAC bypass attempt, token abuse |

## Rules

1. **Immutability**: AuditEntry records must never be deleted or mutated.
2. **Completeness**: Every platform boundary crossing must carry a `correlationId`.
3. **Agent accountability**: All AI agent-initiated mutations must use `actorType=agent`.
4. **n8n accountability**: All n8n workflow executions must use `actorType=n8n_workflow`.
5. **Retention**: Records must be retained for a minimum of 2 years.
6. **No secrets**: AuditEntry `metadata` must never contain credentials, tokens, or PII beyond what is operationally required.
7. **Separation**: Audit storage must be isolated from operational databases.

## What Must Be Audited

- All create / update / delete operations on domain entities
- All AI agent recommendations that trigger actions
- All n8n workflow executions (start, success, failure)
- All RBAC changes (role grants, revocations)
- All authentication events (login, logout, token refresh)
- All financial record mutations (HD-ADMIN)
- All CRM contact operations (HD-CRM)
- All candidate status changes (HD-RH)
