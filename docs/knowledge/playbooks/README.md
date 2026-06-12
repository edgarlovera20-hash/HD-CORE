# Playbooks

**Tipo:** `playbook`
**Directorio:** `docs/knowledge/playbooks/`
**Contrato:** `contracts/knowledge-hub.v1.json`

## ¿Qué es un Playbook?

Un Playbook es una guía táctica para situaciones específicas y repetibles que requieren juicio y adaptación, no solo ejecución mecánica. A diferencia de un SOP (que describe pasos exactos), un playbook describe estrategias, criterios de decisión y mejores prácticas para situaciones que pueden variar.

**Cuándo crear un Playbook:**
- Una situación se repite pero requiere adaptación según el contexto
- Existe conocimiento táctico en el equipo que debería documentarse
- El éxito depende de combinaciones de acciones, no solo de seguir pasos
- El equipo necesita saber cuándo aplicar qué estrategia

## Ciclo de Vida

```
draft → review → approved → deprecated
```

Los agentes de IA solo consumen playbooks con `status: "approved"`.

## Convención de Nomenclatura

```
{PLATFORM}_{TYPE}_{SLUG}.md
Ejemplos:
  CRM_PLAYBOOK_cobranza-morosos.md
  CRM_PLAYBOOK_recuperacion-cliente-perdido.md
  RH_PLAYBOOK_proceso-entrevista-tecnica.md
  RH_PLAYBOOK_negociacion-oferta-laboral.md
  OPERATIONS_PLAYBOOK_manejo-crisis-operacional.md
```

## Template de Playbook

```markdown
---
docId: {UUID}
title: "{Título descriptivo}"
type: playbook
status: draft
platform: {PLATFORM}
version: "1.0.0"
tags: [tag1, tag2]
createdAt: {ISO 8601}
updatedAt: {ISO 8601}
---

## Situación

{Describe la situación o escenario para el cual aplica este playbook.}

## Objetivo

{Resultado deseado al ejecutar este playbook.}

## Contexto y Criterios de Activación

{Cuándo usar este playbook vs. otras alternativas. Condiciones que lo hacen relevante.}

## Estrategias

### Estrategia A: {Nombre}
**Cuándo usar:** {condición}
**Pasos:**
1. ...
2. ...
**Indicadores de éxito:** ...

### Estrategia B: {Nombre}
...

## Señales de Alerta

{Red flags o señales que indican que el playbook no está funcionando y se debe escalar.}

## Escalamiento

{Cuándo y cómo escalar a un nivel superior.}

## Métricas de Seguimiento

{KPIs o métricas que medir para evaluar el resultado.}
```

## Documentos Disponibles

*No hay playbooks aprobados aún. Esta lista se actualiza conforme se aprueban documentos.*

| Doc ID | Título | Plataforma | Versión | Estado |
|--------|--------|-----------|---------|--------|
| — | — | — | — | — |
