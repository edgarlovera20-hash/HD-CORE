# Runbooks

**Tipo:** `runbook`
**Directorio:** `docs/knowledge/runbooks/`
**Contrato:** `contracts/knowledge-hub.v1.json`

## ¿Qué es un Runbook?

Un Runbook es una guía de respuesta a incidentes, situaciones de emergencia o procedimientos operacionales que requieren ejecución rápida y precisa bajo presión. Los runbooks están optimizados para ser ejecutados cuando algo sale mal.

**Cuándo crear un Runbook:**
- Un tipo de incidente ha ocurrido o puede ocurrir
- El tiempo de respuesta importa (cada minuto de downtime cuenta)
- El proceso de resolución tiene pasos que no deben olvidarse bajo presión
- Diferentes personas del equipo deben poder responder al incidente

## Ciclo de Vida

```
draft → review → approved → deprecated
```

Los runbooks deben ser probados (simulacro) antes de ser aprobados para incidentes críticos.

## Convención de Nomenclatura

```
{SCOPE}_{TYPE}_{SLUG}.md
Ejemplos:
  GLOBAL_RUNBOOK_caida-de-produccion.md
  GLOBAL_RUNBOOK_brecha-de-seguridad.md
  ADMIN_RUNBOOK_restauracion-de-backup.md
  CRM_RUNBOOK_falla-en-whatsapp.md
  GLOBAL_RUNBOOK_degradacion-de-performance.md
```

## Template de Runbook

```markdown
---
docId: {UUID}
title: "{Título descriptivo}"
type: runbook
status: draft
platform: {PLATFORM | GLOBAL}
version: "1.0.0"
tags: [incident, tag1, tag2]
createdAt: {ISO 8601}
updatedAt: {ISO 8601}
approvedBy: {userId cuando sea aprobado}
approvedAt: {ISO 8601 cuando sea aprobado}
---

## Severidad

`CRITICAL | HIGH | MEDIUM | LOW`

## Descripción del Incidente

{Qué está pasando cuando este runbook aplica. Síntomas observables.}

## Impacto

{Qué sistemas, usuarios o procesos se ven afectados.}

## Tiempo Máximo de Resolución (RTO)

{Cuánto tiempo máximo se tiene para resolver antes de escalar.}

## Respuesta Inmediata (primeros 5 minutos)

1. {Acción inmediata 1}
2. {Acción inmediata 2}
3. Notificar a: {lista de personas}

## Diagnóstico

### Comandos de Diagnóstico

```bash
# Verificar estado de servicio
{comando}

# Verificar logs
{comando}
```

### Verificaciones

- [ ] {verificación 1}
- [ ] {verificación 2}

## Resolución

### Opción A: {Causa más común}

1. {paso}
2. {paso}

### Opción B: {Causa alternativa}

1. {paso}
2. {paso}

## Verificación Post-Resolución

- [ ] {verificar que el sistema está normal}
- [ ] {verificar que no hay efectos secundarios}

## Comunicación

**Durante el incidente:**
- Actualizar cada 15 minutos en {canal}

**Post-incidente:**
- Post-mortem en 24-48 horas

## Escalamiento

Si no se resuelve en {tiempo}: escalar a {persona/equipo} via {canal}.
```

## Documentos Disponibles

*No hay runbooks aprobados aún. Esta lista se actualiza conforme se aprueban documentos.*

| Doc ID | Título | Severidad | Plataforma | Versión | Estado |
|--------|--------|-----------|-----------|---------|--------|
| — | — | — | — | — | — |
