# n8n Automation Policy

## Diagnóstico

n8n será el orquestador central de automatizaciones del ecosistema Heavenly Dreams.

## Riesgos

- Automatizaciones sin auditoría.
- Flujos que modifican datos directamente.
- Falta de trazabilidad.
- Reintentos duplicados sin idempotencia.
- Ejecución de acciones sensibles sin aprobación.

## Solución Propuesta

Cada workflow de n8n debe cumplir:

1. Usar service principal.
2. Respetar RBAC.
3. Generar correlationId.
4. Ser idempotente.
5. Registrar auditoría.
6. Usar APIs oficiales.
7. Evitar acceso directo a bases de datos.
8. Requerir aprobación humana para acciones sensibles.

## Acciones prohibidas

- Cambiar roles directamente.
- Cambiar permisos directamente.
- Perdonar deuda directamente.
- Contratar o rechazar candidatos directamente.
- Eliminar registros financieros directamente.
- Contactar clientes sin consentimiento.
- Bypassear APIs de plataforma.

## Criterio de aprobación

Un workflow no debe activarse en producción si no tiene owner, service principal, logs, auditoría, control de errores, correlationId y política de reintentos.
