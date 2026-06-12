# Plan Maestro Unificado de Producción — Ecosistema Heavenly Dreams

> Documento maestro. Unifica el plan de producción real y el plan de unificación visual, agentes IA, data layer, conocimiento, automatización y arquitectura enterprise 2026–2030.

## 1. Estado del Ecosistema

7 repositorios, todos conectados a HD-CORE mediante dependencias `file:../HD-CORE/packages/...`:

| Repo | Rol |
|---|---|
| HD-CORE | Fuente oficial de contratos, RBAC, eventos, agentes, automatización, auditoría y gobernanza |
| HD-WEB | Superficie pública y leads |
| HD-RH | Reclutamiento, talento y RH |
| HD-CRM | Clientes, seguimiento, morosos y conversaciones |
| HD-OPERATIONS | Tareas, agenda, productividad y operación diaria |
| HD-ADMIN | Usuarios, roles, permisos, finanzas, auditoría e integraciones |
| HD-BRAIN | KPIs, riesgos, recomendaciones y solicitudes de automatización revisadas |

## 2. Principio Rector

Heavenly Dreams opera como **un solo ecosistema empresarial inteligente, sin ser un monolito**. Existe:

- 1 identidad visual · 1 design system · 1 capa de contratos · 1 RBAC compartido
- 1 política de auditoría · 1 sistema de agentes IA gobernados · 1 knowledge hub
- 1 capa de datos ejecutiva · 1 estrategia de automatización · 1 dashboard ejecutivo global
- 1 arquitectura cloud escalable

Cada plataforma conserva su dominio. Ninguna asume responsabilidades de otra.

## 3. Reglas Obligatorias

1. No borrar archivos sin revisar contenido.
2. No mezclar dominios entre plataformas.
3. No duplicar contratos de HD-CORE.
4. No crear eventos compartidos fuera de HD-CORE.
5. No crear permisos compartidos fuera de HD-CORE.
6. No crear roles compartidos fuera de HD-CORE.
7. No introducir secretos reales.
8. No hardcodear claves, tokens, passwords ni credenciales.
9. No permitir agentes IA con permisos excesivos.
10. No permitir n8n sin service principal, RBAC, audit log, correlationId e idempotencia.
11. No permitir que HD-BRAIN modifique datos transaccionales directamente.
12. No permitir que HD-WEB exponga lógica interna.
13. No permitir que CRM contacte clientes sin consentimiento y plantilla aprobada.
14. No permitir que RH contrate o rechace candidatos sin revisión humana.
15. No permitir que Admin cambie roles, permisos o finanzas sin auditoría.
16. No permitir acceso directo a bases de datos entre plataformas.
17. No saltar a producción sin staging, backups, logs, rollback y monitoreo.
18. No implementar pantallas complejas antes de cerrar contratos, RBAC, auditoría y ambiente.

## 4. Arquitectura Canónica

### 4.1 HD-CORE — Repositorio Maestro

Responsabilidad: autenticación global, roles y permisos, contratos compartidos, eventos, tipos, validaciones, design tokens, UI compartida, API client, feature flags, configuración global, service principals, auditoría, event bus contracts, políticas de agentes IA, políticas n8n, gobernanza enterprise.

Paquetes (existentes y evolutivos):

```text
packages/contracts      packages/types          packages/rbac
packages/validation     packages/tokens         packages/ui
packages/api-client     packages/telemetry*     packages/feature-flags*
packages/config*                                (* = futuro)
```

Contratos esperados:

```text
contracts/ecosystem-boundaries.v1.json   contracts/ai-agents.v1.json
contracts/automation-policy.v1.json      contracts/audit.v1.json
contracts/n8n-workflows.v1.json          contracts/design-system.v1.json
contracts/data-layer.v1.json             contracts/knowledge-hub.v1.json
```

### 4.2 HD-WEB — heavenlydreams.com.mx

Responsabilidad: portal corporativo, landing principal, marketing, SEO, blog, funnels, captura de leads, formularios públicos, portal institucional, redirección hacia RH/CRM/Operations.

KPIs: tráfico, conversiones, CAC, leads, tasa de conversión por landing, origen de leads.

No maneja: usuarios internos, finanzas, morosos, candidatos, administración, automatizaciones sensibles, dashboards privados.

### 4.3 HD-RH — rh.heavenlydreams.com.mx

Responsabilidad: RH, reclutamiento, vacantes, candidatos, entrevistas, evaluaciones, expedientes, capacitación interna, gestión de talento, reportes RH, RH Agent bajo revisión humana.

KPIs: tiempo de contratación, retención, productividad, candidatos activos, entrevistas completadas, tasa de contratación, calidad de candidatos.

No maneja: morosos, finanzas globales, roles/permisos globales, control tower decisions.

### 4.4 HD-CRM — crm.heavenlydreams.com.mx

Responsabilidad: clientes, ventas, pipeline, seguimiento, morosos, conversaciones auditadas, compromisos de pago, plantillas aprobadas, customer success, facturación operativa si aplica, reportes CRM, CRM Agent con revisión humana.

KPIs: MRR, ARR, conversión, ticket promedio, LTV, churn, clientes activos, morosos, compromisos cumplidos, tiempo de seguimiento.

No maneja: contratación RH, roles/permisos globales, finance treasury ownership, automatización autónoma de cobranza sin revisión.

### 4.5 HD-OPERATIONS — app.heavenlydreams.com.mx

Responsabilidad: ERP operativo interno, operación diaria, tareas, agenda, productividad, tickets internos, procesos, supervisor workbench, notificaciones internas, reportes operativos, Supervisor Agent.

KPIs: tareas completadas, tiempo de resolución, productividad, cumplimiento operativo, carga por colaborador, procesos atrasados.

No maneja: CRM debt collection ownership, finanzas globales, roles globales, control tower, candidatos RH.

### 4.6 HD-ADMIN — admin.heavenlydreams.com.mx

Responsabilidad: usuarios, roles, permisos, finanzas, billing, auditoría, integraciones, organizaciones, feature flags, configuración global, service principals, BI administrativo, Finance/Admin Agent con revisión humana.

KPIs: usuarios activos, acciones auditadas, errores de permisos, pagos revisados, anomalías financieras, integraciones activas.

No maneja: sitio público, candidatos como owner principal, conversaciones CRM como owner principal, recomendaciones directas de Brain.

### 4.7 HD-BRAIN — brain.heavenlydreams.com.mx

Responsabilidad: centro de inteligencia, torre de control, KPIs globales, señales de riesgo, recomendaciones, decision logs, agent runs, automatizaciones revisadas, dashboard ejecutivo, forecasting, data insights.

KPIs: Revenue, EBITDA, CAC, LTV, churn, NPS, cash flow, growth, productividad, riesgos abiertos, recomendaciones aceptadas, automatizaciones solicitadas.

No puede: modificar datos transaccionales directamente, contactar clientes, contratar o rechazar candidatos, cambiar roles o permisos, evadir RBAC, ejecutar automatizaciones críticas sin revisión.

## 5. Capacidades Futuras (No crear repos nuevos sin aprobación)

| Capacidad | Implementación inicial | Evolución futura |
|---|---|---|
| **Academy** (LMS, cursos, certificaciones, onboarding) | Módulo dentro de HD-RH | Repo HD-ACADEMY cuando el MVP esté estable |
| **AI** | HD-BRAIN + contratos en HD-CORE + agentes por plataforma + n8n | No crear HD-AI todavía |
| **Mobile** | Preparar APIs oficiales consumibles | App móvil que NUNCA accede directo a DB |
| **Data Cloud** | HD-BRAIN (dashboard ejecutivo) + HD-CORE (contratos de datos) + HD-ADMIN (BI) | HD-DATA-CLOUD con DW, BI, ML, forecasting, data lake — solo con fuentes productivas reales |

## 6. Identidad Visual Unificada

Ver `docs/DESIGN_SYSTEM.md` y `contracts/design-system.v1.json`.

- **Fuentes**: Inter (UI, formularios, tablas, textos operativos) · Poppins (headings, hero, marketing, branding)
- **Primario** `#0066FF` · **Secundario** `#00A3FF` · **Éxito** `#10B981` · **Advertencia** `#F59E0B` · **Error** `#EF4444`
- **Fondos** `#0A0F1C` `#111827` `#161F33` · **Texto** `#F9FAFB` `#E5E7EB` `#9CA3AF` · **Bordes** `#1F2937` `#334155`

Todos los repos consumen tokens y UI desde HD-CORE (`@hd/core-tokens`, `@hd/core-ui`). No rediseñar cada repo por separado.

## 7. Sistema de Agentes IA

AI Operating System gobernado por HD-CORE, ejecutado por cada plataforma y observado por HD-BRAIN.

### Agentes operativos iniciales

```text
RH_AGENT · CRM_AGENT · SUPERVISOR_AGENT · FINANCE_AGENT · BRAIN_AGENT
```

### Agentes estratégicos futuros (mapeo a repos actuales)

| Agente | Plataforma(s) |
|---|---|
| CEO Agent | HD-BRAIN |
| COO Agent | HD-BRAIN + HD-OPERATIONS |
| CFO Agent | HD-ADMIN + HD-BRAIN |
| CMO Agent | HD-WEB + HD-BRAIN |
| CTO Agent | HD-CORE + HD-BRAIN |
| HR Agent | HD-RH |
| Sales Agent | HD-CRM |
| Customer Success Agent | HD-CRM |
| Legal Agent | HD-ADMIN |
| Data Scientist Agent | HD-BRAIN |

### Reglas globales de agentes

RBAC obligatorio · auditoría obligatoria · permisos mínimos · service principal · correlationId · logs de ejecución · human review en acciones sensibles · sin acceso directo a DB · sin acciones fuera de dominio · sin bypass de APIs oficiales.

### Fases IA

1. **Solo lectura**: resúmenes, clasificación, análisis, detección de riesgo, reportes.
2. **Borradores**: mensajes sugeridos, notas internas, preguntas de entrevista, recomendaciones, documentos preliminares.
3. **Solicitudes revisadas**: contacto, automatización, escalación, corrección, aprobación.
4. **Automatización parcial**: solo bajo riesgo, idempotente, auditada y reversible.
5. **Producción controlada**: solo con métricas, monitoreo, aprobación humana, logs y rollback.

### Skill System

Cada agente requiere: **conocimiento** (SOPs, manuales, políticas, playbooks, runbooks aprobados), **memoria** (vector DB, historial de decisiones, memoria por agente/plataforma/incidente — datos de clientes/candidatos solo con permisos y privacidad), **skills** (análisis, planeación, forecasting, clasificación, priorización, resumen, detección de anomalías, reportes) y **herramientas** futuras (GitHub, Notion, Supabase, PostgreSQL, OpenAI, Claude, Gemini, Stripe, Google Workspace, n8n, Vercel, monitoring). Sin credenciales reales en repos: solo `.env.example`, contratos y documentación.

## 8. Data Layer Unificada

Ver `docs/DATA_LAYER_STRATEGY.md` y `contracts/data-layer.v1.json`.

Regla central: cada plataforma conserva su base operativa; el Data Layer consume **eventos, snapshots o APIs controladas**. Prohibido hacer joins directos entre bases productivas sin política aprobada.

Dashboard ejecutivo inicial en HD-BRAIN (`docs/EXECUTIVE_DASHBOARD.md`, `docs/KPI_CATALOG.md`).

## 9. Automatización Empresarial (n8n)

Orquestador central: n8n. Catálogo autoritativo: `contracts/n8n-workflows.v1.json`.

### Workflows permitidos

```text
WEB_LEAD_TO_CRM · CRM_OVERDUE_ALERT · CRM_PAYMENT_COMMITMENT_REMINDER
RH_CANDIDATE_FOLLOWUP_DRAFT · OPERATIONS_TASK_REMINDER
ADMIN_FINANCE_ANOMALY_ALERT · BRAIN_RISK_REVIEW_REQUEST
```

### Workflows prohibidos

Cambio directo de roles/permisos · condonación directa de deuda · contratación/rechazo directo de candidatos · borrado directo de registros financieros · contacto directo a clientes sin consentimiento · bypass de API de plataforma · mutación directa de base de datos.

Cada workflow requiere: `workflowId`, `ownerPlatform`, `trigger`, `servicePrincipalId`, `requiredPermissions`, `correlationId`, `idempotencyKey`, `auditLog`, `retryPolicy`, `errorPolicy`, `humanReviewRequired`.

## 10. Knowledge Hub

Ver `docs/KNOWLEDGE_HUB_STRATEGY.md` y `contracts/knowledge-hub.v1.json`. Estructura inicial en `docs/knowledge/` (sops, playbooks, prompts, policies, runbooks, templates). Regla: los agentes IA solo usan conocimiento aprobado y versionado.

## 11. Infraestructura Enterprise 2026–2030

Stack objetivo: Next.js · React · TypeScript · Tailwind · Supabase · PostgreSQL · Redis · Vercel · Docker · Kubernetes (futuro, no al inicio) · n8n · OpenTelemetry.

Ambientes: `local` · `development` · `staging` · `production`.

Dominios producción: heavenlydreams.com.mx, rh., crm., app., admin., brain.
Staging: staging.heavenlydreams.com.mx y prefijo staging- por subdominio.

Observabilidad por plataforma: logs centralizados, alertas, monitoreo, auditoría, métricas, health checks, error tracking, uptime, correlationId, requestId.

Seguridad: RBAC, MFA, auditoría, encriptación, gestión de secretos, rate limiting, validación de inputs, sanitización, backups, anti-abuso en formularios públicos, política de privacidad, consentimiento de contacto.

## 12. Criterio de Producción Real (20 puntos)

1. Dominios reales funcionan · 2. SSL activo · 3. Autenticación real · 4. RBAC implementado · 5. Acciones sensibles auditadas · 6. BD productiva · 7. Backups automáticos · 8. Monitoreo y alertas · 9. CI/CD staging + producción · 10. Sin secretos en repos · 11. HD-CORE versionado · 12. Sin mezcla de dominios · 13. n8n con service principals · 14. Agentes sin permisos excesivos · 15. Privacidad y consentimiento · 16. Runbook de incidentes · 17. Rollback · 18. Flujos críticos con QA · 19. Usuarios reales operando · 20. Proceso de soporte y mantenimiento.

## 13. Roadmap Maestro por Etapas

| Etapa | Contenido | Duración |
|---|---|---|
| 0 | Cierre de arquitectura base: quality gate, contratos, gobernanza, CI/CD, roadmaps, audit, agent policy, n8n policy, knowledge hub strategy, design system strategy | 1–2 sem |
| 1 | Unificación visual y design system: tokens, UI base, paleta, tipografía oficial | 1–3 sem |
| 2 | Estandarización técnica: package.json, tsconfig, scripts, CI, .env.example | 1–2 sem |
| 3 | Seguridad, Auth, RBAC y auditoría: auth real, MFA admins, service principals, audit logs, consentimiento CRM, secrets management | 2–4 sem |
| 4 | Backend y datos por plataforma (prioridad: CRM → ADMIN → WEB → RH → OPERATIONS → BRAIN) | 4–8 sem |
| 5 | Frontend funcional por plataforma | 4–8 sem |
| 6 | Eventos, integraciones y data layer: event bus, webhooks, snapshots, KPI catalog, executive dashboard | 3–6 sem |
| 7 | Knowledge Hub y RAG: SOPs, playbooks, prompts, vector DB plan, RAG governance | 2–4 sem |
| 8 | Agentes IA gobernados: fases lectura → borradores → solicitudes → automatización parcial → producción controlada | 3–6 sem |
| 9 | n8n y automatización segura: catálogo, service principals, idempotencia, retry/error policy, sandbox | 3–6 sem |
| 10 | Infraestructura, staging y producción: DNS, SSL, hosting, BD productiva, backups, observabilidad, rollback, runbooks | 2–4 sem |

## 14. MVP Recomendado

Priorizar: **HD-WEB + HD-CRM + HD-ADMIN básico + HD-CORE**.

- **MVP HD-WEB**: sitio público, SEO básico, formulario de contacto, captura de leads, política de privacidad.
- **MVP HD-CRM**: clientes, estados, seguimiento, morosos, compromisos de pago, historial básico.
- **MVP HD-ADMIN**: login, usuarios, roles, permisos, auditoría básica, service principals básicos.
- **MVP HD-CORE**: contratos, RBAC, validaciones, eventos, auditoría, design tokens, agent governance, automation policy.

Fuera del MVP inicial: Brain avanzado, IA autónoma, finanzas complejas, automatizaciones críticas, BI avanzado, mobile app, Academy completa, Data Cloud separado, multi-tenant complejo.

## 15. Instrucción Final

No avanzar a implementación productiva de pantallas, APIs reales, IA autónoma o automatizaciones críticas hasta cerrar la fase de arquitectura, contratos, design system, data layer, knowledge hub, agentes, n8n y quality gates.

**Objetivo final**: construir Heavenly Dreams como ecosistema SaaS enterprise con plataformas separadas, identidad visual unificada, contratos compartidos, seguridad real, auditoría, automatización controlada, agentes IA gobernados, data layer ejecutivo, knowledge hub, CI/CD real y despliegue productivo estable.
