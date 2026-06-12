# Architecture Governance

## Diagnóstico

El ecosistema Heavenly Dreams está dividido en siete plataformas. Cada plataforma tiene una frontera funcional clara y debe consumir contratos compartidos desde HD-CORE.

## Riesgos

- Mezclar responsabilidades entre plataformas.
- Duplicar permisos, eventos o tipos.
- Crear automatizaciones sin auditoría.
- Permitir que agentes IA modifiquen datos fuera de su dominio.
- Romper CI/CD por dependencias no alineadas.

## Solución Propuesta

HD-CORE será la fuente oficial para plataformas, eventos, roles, permisos, acciones sensibles, tipos compartidos, validaciones, dependencias y reglas de arquitectura.

## Reglas obligatorias

1. Ningún repositorio debe redefinir contratos existentes en HD-CORE.
2. Ninguna plataforma debe asumir responsabilidades de otra.
3. HD-BRAIN solo observa, correlaciona, recomienda y solicita automatizaciones revisadas.
4. HD-CRM es el único dueño de clientes, seguimiento y morosos.
5. HD-RH es el único dueño de candidatos y procesos de contratación.
6. HD-ADMIN es el único dueño de usuarios, roles, permisos, finanzas y auditoría.
7. HD-WEB solo maneja superficie pública, SEO, marketing y leads.
8. HD-OPERATIONS solo maneja operación diaria, tareas, agenda y productividad.
9. Todo evento sensible debe ser auditable.
10. Toda automatización crítica debe pasar por permisos, logs y revisión humana cuando aplique.

## Criterio de aprobación

Una PR debe rechazarse si duplica contratos de HD-CORE, mezcla dominios, evade RBAC, agrega acciones sensibles sin auditoría o permite a un agente IA modificar datos críticos sin control.
