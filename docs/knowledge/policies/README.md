# Policies

**Tipo:** `policy`
**Directorio:** `docs/knowledge/policies/`
**Contrato:** `contracts/knowledge-hub.v1.json`

## ¿Qué es una Policy?

Una Policy es un documento que establece normas de comportamiento, restricciones y principios de gobernanza para el ecosistema o para una plataforma específica. Las políticas son de cumplimiento obligatorio.

**Cuándo crear una Policy:**
- Existe una regla de negocio o compliance que todo el equipo debe seguir
- Se necesita documentar qué está permitido y qué está prohibido
- Un área específica tiene regulaciones o estándares que cumplir
- Se quiere establecer precedente para decisiones futuras

## Ciclo de Vida

```
draft → review → approved → deprecated
```

Las policies requieren aprobación de liderazgo antes de ser consideradas `approved`.

## Convención de Nomenclatura

```
{SCOPE}_{TYPE}_{SLUG}.md
Ejemplos:
  GLOBAL_POLICY_uso-de-ia.md
  GLOBAL_POLICY_retencion-de-datos.md
  ADMIN_POLICY_gestion-de-accesos.md
  CRM_POLICY_contacto-con-clientes.md
  RH_POLICY_evaluacion-de-candidatos.md
  GLOBAL_POLICY_seguridad-de-informacion.md
```

## Template de Policy

```markdown
---
docId: {UUID}
title: "{Título descriptivo}"
type: policy
status: draft
platform: {PLATFORM | GLOBAL}
version: "1.0.0"
tags: [tag1, tag2]
createdAt: {ISO 8601}
updatedAt: {ISO 8601}
approvedBy: {userId cuando sea aprobado}
approvedAt: {ISO 8601 cuando sea aprobado}
---

## Alcance

{A quién aplica esta política: roles, plataformas, situaciones.}

## Principio

{La declaración central de la política en 1-3 oraciones.}

## Reglas

### Permitido

- {Acción/comportamiento permitido}
- ...

### Prohibido

- {Acción/comportamiento prohibido}
- ...

## Excepciones

{Casos donde la política puede no aplicar o requiere aprobación especial.}

## Consecuencias de Incumplimiento

{Qué pasa si se viola esta política.}

## Revisión

Esta política se revisa {anualmente/cada 6 meses/según necesidad}.
Próxima revisión: {fecha}.
```

## Documentos Disponibles

*No hay políticas aprobadas aún. Esta lista se actualiza conforme se aprueban documentos.*

| Doc ID | Título | Alcance | Versión | Estado |
|--------|--------|---------|---------|--------|
| — | — | — | — | — |
