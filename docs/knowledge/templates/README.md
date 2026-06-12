# Templates

**Tipo:** `template`
**Directorio:** `docs/knowledge/templates/`
**Contrato:** `contracts/knowledge-hub.v1.json`

## ¿Qué es un Template?

Un Template es una plantilla reutilizable para documentos, comunicaciones, reportes o cualquier artefacto que se genera repetidamente con estructura consistente. Los templates reducen el tiempo de creación y garantizan consistencia.

**Cuándo crear un Template:**
- Un tipo de documento se genera frecuentemente con la misma estructura
- La consistencia del formato es importante (profesionalismo, compliance)
- Diferentes personas del equipo crean el mismo tipo de documento
- Los agentes de IA necesitan generar documentos en un formato específico

## Ciclo de Vida

```
draft → review → approved → deprecated
```

Los agentes de IA solo pueden usar templates con `status: "approved"` para generar contenido.

## Convención de Nomenclatura

```
{PLATFORM}_{TYPE}_{SLUG}.md
Ejemplos:
  RH_TEMPLATE_oferta-de-trabajo.md
  RH_TEMPLATE_rechazo-candidato.md
  CRM_TEMPLATE_propuesta-comercial.md
  CRM_TEMPLATE_recordatorio-pago.md
  OPERATIONS_TEMPLATE_reporte-semanal.md
  ADMIN_TEMPLATE_reporte-financiero-mensual.md
```

## Template de Template (meta-template)

```markdown
---
docId: {UUID}
title: "{Título descriptivo}"
type: template
status: draft
platform: {PLATFORM}
version: "1.0.0"
tags: [tag1, tag2]
createdAt: {ISO 8601}
updatedAt: {ISO 8601}
approvedBy: {userId cuando sea aprobado}
approvedAt: {ISO 8601 cuando sea aprobado}
---

## Propósito

{Para qué se usa este template. Una oración.}

## Cuándo Usar

{Contexto y condiciones para usar este template.}

## Variables Disponibles

| Variable | Descripción | Ejemplo |
|---------|-------------|---------|
| `{{variable}}` | {descripción} | {ejemplo} |

## Template

---

{Contenido del template con {{variables}} marcadas}

---

## Notas de Uso

{Instrucciones adicionales para completar o personalizar el template.}

## Prohibiciones

- NO personalizar la estructura sin aprobación
- NO cambiar el tono sin revisión
- NO omitir secciones marcadas como requeridas
```

## Tipos de Templates Comunes

| Tipo | Ejemplos |
|------|---------|
| Comunicaciones con candidatos | Oferta de trabajo, rechazo, invitación a entrevista |
| Comunicaciones con clientes | Recordatorio de pago, propuesta comercial, welcome email |
| Reportes internos | Reporte semanal de ops, reporte financiero mensual |
| Documentos legales/contractuales | Contratos de trabajo, NDAs, acuerdos de servicio |
| Notificaciones automatizadas | Alertas de sistema, confirmaciones, bienvenidas |

## Documentos Disponibles

*No hay templates aprobados aún. Esta lista se actualiza conforme se aprueban documentos.*

| Doc ID | Título | Plataforma | Versión | Estado |
|--------|--------|-----------|---------|--------|
| — | — | — | — | — |
