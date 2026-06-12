# SOPs — Standard Operating Procedures

**Tipo:** `sop`
**Directorio:** `docs/knowledge/sops/`
**Contrato:** `contracts/knowledge-hub.v1.json`

## ¿Qué es un SOP?

Un Standard Operating Procedure (SOP) describe los pasos exactos y secuenciales para ejecutar un proceso operacional de manera consistente. Los SOPs son el tipo de documento más granular: definen exactamente QUÉ hacer, CUÁNDO hacerlo, y CÓMO verificar que se hizo correctamente.

**Cuándo crear un SOP:**
- Un proceso se repite con frecuencia (semanal o más)
- El proceso tiene pasos específicos que no deben omitirse
- Existe riesgo operacional si el proceso se ejecuta incorrectamente
- El proceso puede ser ejecutado por diferentes personas del equipo

## Ciclo de Vida

```
draft → review → approved → deprecated
```

Los agentes de IA solo consumen SOPs con `status: "approved"`.

## Convención de Nomenclatura

```
{PLATFORM}_{TYPE}_{SLUG}.md
Ejemplos:
  CRM_SOP_registro-cliente-nuevo.md
  CRM_SOP_proceso-cobranza-moroso.md
  RH_SOP_onboarding-candidato.md
  ADMIN_SOP_creacion-usuario.md
  GLOBAL_SOP_manejo-incidente-critico.md
```

## Template de SOP

```markdown
---
docId: {UUID}
title: "{Título descriptivo}"
type: sop
status: draft
platform: {HD-CRM | HD-RH | HD-OPERATIONS | HD-ADMIN | HD-BRAIN | HD-WEB | GLOBAL}
version: "1.0.0"
tags: [tag1, tag2]
createdAt: {ISO 8601}
updatedAt: {ISO 8601}
---

## Objetivo

{Una oración que describe el resultado deseado de este SOP.}

## Cuándo Aplicar

{Condiciones o triggers que inician este procedimiento.}

## Roles Involucrados

- **Responsable:** {Rol}
- **Aprobador:** {Rol}
- **Notificados:** {Roles}

## Pasos

1. **{Paso 1}**
   - Acción: {qué hacer exactamente}
   - Herramienta: {plataforma o herramienta usada}
   - Verificación: {cómo saber que se completó correctamente}

2. **{Paso 2}**
   ...

## Criterio de Éxito

{Cómo saber que el SOP se completó exitosamente.}

## Excepciones y Escalamiento

{Qué hacer si algo sale mal o una condición esperada no se cumple.}
```

## Documentos Disponibles

*No hay SOPs aprobados aún. Esta lista se actualiza conforme se aprueban documentos.*

| Doc ID | Título | Plataforma | Versión | Estado |
|--------|--------|-----------|---------|--------|
| — | — | — | — | — |
