# Prompts

**Tipo:** `prompt`
**Directorio:** `docs/knowledge/prompts/`
**Contrato:** `contracts/knowledge-hub.v1.json`

## ¿Qué es un Prompt?

Un Prompt es un texto de instrucción aprobado para uso por agentes de IA en el ecosistema Heavenly Dreams. Los prompts son el "lenguaje" con el que las plataformas le hablan a los agentes.

**Regla crítica:** Los agentes solo pueden usar prompts con `status: "approved"`. Un agente no puede improvisar o crear sus propios prompts en tiempo de ejecución para acciones sensibles.

**Cuándo crear un Prompt:**
- Un agente necesita ejecutar una tarea de forma consistente y repetible
- La formulación del prompt afecta directamente la calidad del output
- El prompt maneja información sensible (clientes, candidatos, finanzas)
- El prompt genera contenido que será revisado o enviado a usuarios reales

## Ciclo de Vida

```
draft → review → approved → deprecated
```

El proceso de aprobación de prompts es más riguroso que otros documentos porque los prompts afectan directamente el comportamiento de los agentes de IA.

## Convención de Nomenclatura

```
{AGENT}_{TYPE}_{SLUG}.md
Ejemplos:
  CRM_PROMPT_priorizacion-morosos.md
  CRM_PROMPT_resumen-cliente.md
  RH_PROMPT_resumen-candidato.md
  RH_PROMPT_draft-comunicacion-candidato.md
  BRAIN_PROMPT_analisis-riesgo.md
  FINANCE_PROMPT_reporte-anomalia.md
```

## Template de Prompt

```markdown
---
docId: {UUID}
title: "{Título descriptivo}"
type: prompt
status: draft
platform: {HD-CRM | HD-RH | HD-OPERATIONS | HD-ADMIN | HD-BRAIN}
version: "1.0.0"
tags: [tag1, tag2, agent-name]
createdAt: {ISO 8601}
updatedAt: {ISO 8601}
approvedBy: {userId cuando sea aprobado}
approvedAt: {ISO 8601 cuando sea aprobado}
---

## Agente

`{CRM_AGENT | RH_AGENT | SUPERVISOR_AGENT | FINANCE_AGENT | BRAIN_AGENT}`

## Propósito

{Qué tarea ejecuta este prompt. Una oración clara.}

## Variables de Input

| Variable | Tipo | Descripción | Requerida |
|---------|------|-------------|---------|
| `{variable}` | `string` | {descripción} | Sí/No |

## Prompt

```
{El texto del prompt con {{variables}} marcadas con doble llave}
```

## Ejemplo de Uso

**Input:**
```json
{
  "variable1": "valor de ejemplo"
}
```

**Output esperado:**
```
{Ejemplo de salida del modelo}
```

## Restricciones

- {Qué NO debe hacer el agente con este prompt}
- {Límites de uso}

## Criterio de Evaluación

{Cómo evaluar si el output del prompt es correcto y de calidad.}
```

## Documentos Disponibles

*No hay prompts aprobados aún. Esta lista se actualiza conforme se aprueban documentos.*

| Doc ID | Título | Agente | Versión | Estado |
|--------|--------|--------|---------|--------|
| — | — | — | — | — |
