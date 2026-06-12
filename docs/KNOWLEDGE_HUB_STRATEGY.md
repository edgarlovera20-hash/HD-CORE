# Knowledge Hub Strategy — Heavenly Dreams

## Objetivo

Crear una memoria organizacional central, versionada y gobernada. Inicialmente vive como documentación en `HD-CORE/docs/knowledge/`. Posteriormente puede migrar a Notion, vector DB o plataforma dedicada.

Contrato machine-readable: `contracts/knowledge-hub.v1.json`.

## Regla Central

> Los agentes IA solo pueden usar conocimiento **aprobado y versionado**.

Ningún agente consume documentos en estado `draft`. El conocimiento no aprobado no entra a pipelines RAG.

## Estructura

```text
docs/knowledge/sops/        Procedimientos operativos estándar
docs/knowledge/playbooks/   Guías de acción por escenario
docs/knowledge/prompts/     Prompts aprobados para agentes IA
docs/knowledge/policies/    Políticas internas
docs/knowledge/runbooks/    Respuesta a incidentes y operación
docs/knowledge/templates/   Plantillas aprobadas (mensajes, documentos)
```

## Contenido Esperado

SOPs · manuales · procesos · prompts · entrenamiento IA · casos de éxito · playbooks · políticas · runbooks · lecciones aprendidas · guías de soporte · plantillas aprobadas.

## Ciclo de Vida del Conocimiento

```text
draft → review → approved → (deprecated)
```

| Estado | Visible para agentes IA |
|---|---|
| draft | No |
| review | No |
| approved | Sí |
| deprecated | No |

## Metadatos Obligatorios por Documento

- `documentId` · `category` (sop/playbook/prompt/policy/runbook/template)
- `version` · `status` · `ownerPlatform` · `approvedBy` · `updatedAt`
- `aiUsageAllowed` (boolean) · `sensitivity` (public/internal/confidential)

## Evolución RAG (Etapa 7 del roadmap)

1. Vector DB con embeddings solo de documentos `approved` con `aiUsageAllowed: true`.
2. Re-indexación automática al aprobar nuevas versiones.
3. Trazabilidad: toda respuesta de agente cita los documentIds usados.
4. Gobernanza RAG: HD-CORE define qué fuentes entran al índice.
