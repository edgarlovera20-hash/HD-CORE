# AI Agents Governance

## Diagnóstico

El ecosistema Heavenly Dreams usará agentes IA para apoyar RH, CRM, Operations, Admin, Finance y Brain. Estos agentes deben operar bajo RBAC, auditoría, permisos mínimos y fronteras de plataforma.

## Riesgos

- Agentes con permisos excesivos.
- Contacto directo con clientes sin consentimiento.
- Decisiones de contratación sin revisión humana.
- Cambios financieros sin auditoría.
- Modificación directa de datos transaccionales.
- Automatizaciones fuera del dominio autorizado.

## Solución Propuesta

Todos los agentes deben seguir estas reglas:

1. Usar permisos mínimos.
2. Respetar RBAC.
3. Registrar auditoría.
4. Operar solo dentro de su plataforma.
5. No modificar datos críticos sin aprobación.
6. No ejecutar acciones sensibles sin revisión humana.
7. No contactar clientes sin consentimiento y plantilla aprobada.
8. No bypass de APIs oficiales.

## Agentes oficiales

- RH_AGENT para HD-RH.
- CRM_AGENT para HD-CRM.
- SUPERVISOR_AGENT para HD-OPERATIONS.
- FINANCE_AGENT para HD-ADMIN.
- BRAIN_AGENT para HD-BRAIN.

## Regla central

HD-BRAIN puede observar, correlacionar, recomendar y solicitar automatizaciones revisadas. No puede modificar directamente datos de CRM, RH, Admin, Operations o Web.
