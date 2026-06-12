# Plan Maestro Unificado — Ecosistema Heavenly Dreams 2026-2030

**Versión:** 1.0.0
**Fecha:** 2026-06-12
**Estado:** Aprobado — En Ejecución
**Propietario:** HD-CORE / Architecture

---

## Sección 1: Visión y Principio Rector

Heavenly Dreams es una empresa de servicios que opera mediante un ecosistema SaaS propio, diseñado para eliminar la dependencia de plataformas genéricas y construir una ventaja competitiva sostenida a través de software propietario, inteligencia artificial aplicada y automatización inteligente.

### Principio Rector

> **"Un dominio, un repositorio, una fuente de verdad."**

Cada plataforma del ecosistema es propietaria exclusiva de su dominio. Ninguna plataforma accede directamente a la base de datos de otra. Toda integración ocurre mediante eventos, snapshots o APIs controladas, con trazabilidad completa.

### Objetivos Estratégicos 2026-2030

1. Reemplazar completamente el monolito `heavenlydreamslovera` con las 7 plataformas HD-*
2. Alcanzar cobertura operacional completa: CRM, RH, Operaciones, Administración, Brain y Web pública
3. Implementar 5 agentes de IA especializados con gobernanza estricta
4. Automatizar el 60% de tareas repetitivas mediante n8n con audit trail completo
5. Construir un Knowledge Hub institucional con +100 documentos aprobados
6. Operar con zero-downtime, observabilidad full-stack y seguridad enterprise
7. Escalar a mercados LATAM con arquitectura multi-tenant lista para 2028

---

## Sección 2: Repositorios y Dominios

### Mapa del Ecosistema

```
/home/user/
├── HD-CORE/          # Fuente de verdad: contratos, RBAC, eventos, tipos
├── HD-CRM/           # Gestión de clientes, cuentas vencidas, conversaciones
├── HD-RH/            # Reclutamiento, candidatos, entrevistas, contratación
├── HD-BRAIN/         # Centro de control: KPIs, riesgo, recomendaciones
├── HD-OPERATIONS/    # Ops diarias, tareas, agenda, productividad
├── HD-ADMIN/         # Usuarios, roles, permisos, finanzas, auditoría
├── HD-WEB/           # Sitio público, SEO, captura de leads únicamente
└── heavenlydreamslovera/   # Monolito legado (en proceso de migración)
```

### Descripción por Plataforma

#### HD-CORE
- **Rol:** Fuente de verdad compartida. No posee datos de dominio.
- **Contiene:** Contratos TypeScript, constantes de eventos, definiciones RBAC, tipos de agentes, política de automatización, esquemas de auditoría, design tokens, componentes UI headless.
- **Regla:** Ningún repo dependiente redefine lo que HD-CORE ya define.
- **Paquetes:** `@hd/core-contracts`, `@hd/core-tokens`, `@hd/core-ui`, `@hd/core-rbac`, `@hd/core-types`, `@hd/core-validation`

#### HD-CRM
- **Dominio:** Clientes, leads, conversaciones, compromisos de pago, cuentas morosas.
- **Agente:** `CRM_AGENT` — asistencia en seguimiento, priorización y resúmenes.
- **Prohibido:** Decisiones de contratación, finanzas del tesoro, permisos globales.
- **Stack:** Express + React + PostgreSQL + Redis + BullMQ

#### HD-RH
- **Dominio:** Candidatos, vacantes, entrevistas, evaluaciones, proceso de contratación.
- **Agente:** `RH_AGENT` — resúmenes de candidatos, preparación de entrevistas, reportes.
- **Prohibido:** Clientes CRM, finanzas, permisos globales.
- **Stack:** Express + Vite + React + PostgreSQL

#### HD-BRAIN
- **Dominio:** KPIs, señales de riesgo, recomendaciones estratégicas, log de decisiones.
- **Agente:** `BRAIN_AGENT` — detección de riesgos, recomendaciones, revisión de automatizaciones.
- **Prohibido:** Mutaciones transaccionales en cualquier plataforma (estrictamente de lectura).
- **Stack:** Express + React + Dashboard + PostgreSQL (read-only replicas)

#### HD-OPERATIONS
- **Dominio:** Tareas operativas, slots de agenda, reportes de productividad, supervisión diaria.
- **Agente:** `SUPERVISOR_AGENT` — gestión de tareas, agenda, soporte a supervisores.
- **Prohibido:** Cobro de deudas CRM, finanzas, administración global.
- **Stack:** Express + React + PostgreSQL + Redis

#### HD-ADMIN
- **Dominio:** Usuarios, roles, permisos, registros financieros, audit log, configuración del sistema.
- **Agente:** `FINANCE_AGENT` — resúmenes financieros, detección de anomalías, preparación de auditorías.
- **Prohibido:** Conversaciones CRM, evaluación de candidatos, workflow de contratación.
- **Stack:** Express + React + PostgreSQL + audit DB separada

#### HD-WEB
- **Dominio:** Páginas públicas, SEO, captura de leads, listado de vacantes.
- **Agente:** Ninguno (plataforma pública, sin agente IA interno).
- **Prohibido:** Acceso a datos internos de cualquier plataforma.
- **Stack:** Remix / Astro + TailwindCSS + edge deployment

---

## Sección 3: Reglas Obligatorias

Las siguientes 18 reglas son de cumplimiento obligatorio en todo el ecosistema. Ningún PR puede ser mergeado si viola alguna de ellas.

1. **HD-CORE es la fuente de verdad.** Todos los tipos, eventos, roles y tokens se importan desde `@hd/core-contracts` o `@hd/core-tokens`. Nunca se redefinen.

2. **Separación estricta de dominios.** Cada plataforma posee exclusivamente su dominio. El acceso cruzado de datos se realiza únicamente mediante eventos o APIs controladas.

3. **RBAC obligatorio.** Todo acceso a recursos requiere verificación de roles y permisos mediante `@hd/core-rbac`. Los agentes de IA no pueden eludir el RBAC.

4. **Audit trail inmutable.** Cada mutación, acción de agente y ejecución de workflow n8n produce un `AuditEntry` con todos los campos requeridos. Los registros de auditoría son inmutables.

5. **correlationId cruzando fronteras.** Toda operación multi-plataforma debe propagar el mismo `correlationId` (UUID) a través de todas las plataformas involucradas.

6. **Un agente por plataforma.** Cada plataforma tiene exactamente un agente de IA permitido. Ningún agente puede actuar en una plataforma que no es la suya.

7. **Human-in-the-loop para acciones sensibles.** Las acciones marcadas como `humanReviewRequired: true` deben encolarse para aprobación humana antes de ejecutarse.

8. **Solo workflows autorizados.** Únicamente los 7 workflows definidos en `n8n-workflows.v1.json` están autorizados. Ningún workflow nuevo puede desplegarse sin actualizar el contrato en HD-CORE.

9. **Knowledge Hub: solo documentos aprobados.** Los agentes solo pueden consumir documentos con `status: "approved"`. Ningún agente accede a borradores o documentos en revisión.

10. **Design tokens desde @hd/core-tokens.** Ninguna plataforma redefine colores, tipografía o espaciado. Todos los valores vienen de `@hd/core-tokens`.

11. **Arquitectura event-driven para integración.** Las plataformas se integran mediante eventos `HdEventEnvelope<T>` publicados en el bus de eventos. No hay llamadas directas a DBs de otras plataformas.

12. **Snapshots para datos analíticos.** HD-BRAIN consume KPI snapshots, no consultas directas a DBs transaccionales.

13. **Environments separados.** Producción, staging y desarrollo son environments completamente separados. Las credenciales de producción nunca se usan en dev/staging.

14. **Secrets en vault, nunca en código.** Las API keys, tokens y credenciales se gestionan en el API Key Vault. Nunca se hardcodean en el código fuente.

15. **CI/CD obligatorio.** Todo cambio pasa por CI antes de mergearse. El branch activo es `claude/laughing-hawking-pau9wz`. Los checks deben estar en verde.

16. **TypeScript estricto.** `strict: true`, `noEmit: true`, `moduleResolution: "bundler"`. No se permiten `any` implícitos ni errores de tipo ignorados.

17. **BRAIN_AGENT es read-only.** El agente de HD-BRAIN nunca ejecuta mutaciones. Solo lee, analiza y recomienda. Las recomendaciones requieren aprobación humana para ejecutarse.

18. **Bases de datos de auditoría separadas.** Los `AuditEntry` se almacenan en una base de datos separada de los datos operacionales. No pueden ser modificados ni eliminados.

---

## Sección 4: Identidad Visual Unificada

### Tipografía Oficial

| Uso | Fuente |
|-----|--------|
| Elementos UI, formularios, tablas, texto operacional | **Inter** |
| Títulos, secciones hero, marketing, branding | **Poppins** |
| Código, terminales, datos técnicos | **JetBrains Mono** |

**Regla:** Inter para todo lo operacional. Poppins para branding y encabezados principales. Nunca mezclar arbitrariamente.

### Paleta de Colores Oficial

| Token | Hex | Uso |
|-------|-----|-----|
| `primary` | `#0066FF` | Acciones primarias, CTAs, links activos |
| `primaryHover` | `#0052CC` | Hover de acciones primarias |
| `secondary` | `#00A3FF` | Acciones secundarias, información |
| `secondaryHover` | `#0080CC` | Hover de acciones secundarias |
| `success` | `#10B981` | Estados exitosos, confirmaciones |
| `warning` | `#F59E0B` | Advertencias, atención requerida |
| `error` | `#EF4444` | Errores, alertas críticas |
| `background.base` | `#0A0F1C` | Fondo base de la aplicación |
| `background.surface` | `#111827` | Superficie de cards y paneles |
| `background.elevated` | `#161F33` | Elementos elevados (modales, dropdowns) |
| `text.primary` | `#F9FAFB` | Texto principal |
| `text.secondary` | `#E5E7EB` | Texto secundario |
| `text.muted` | `#9CA3AF` | Texto silenciado, placeholders |
| `border.default` | `#1F2937` | Bordes estándar |
| `border.strong` | `#334155` | Bordes con énfasis |

### Importación desde HD-CORE

```typescript
// Tokens de diseño
import { hdColors, hdTypography, hdSpacing, hdRadius, hdShadows, hdMotion } from "@hd/core-tokens";

// Componentes UI headless
import { createButtonClassName, createCardClassName, createTableClassName } from "@hd/core-ui";
```

---

## Sección 5: Sistema de Agentes IA

### 5.1 Agentes Iniciales (5 Agentes)

| Agente | Plataforma | Propósito Principal |
|--------|-----------|---------------------|
| `CRM_AGENT` | HD-CRM | Seguimiento de clientes, priorización de morosos, resúmenes CRM |
| `RH_AGENT` | HD-RH | Asistencia en reclutamiento, resúmenes de candidatos, preparación de entrevistas |
| `BRAIN_AGENT` | HD-BRAIN | Detección de riesgos cross-platform, recomendaciones estratégicas |
| `SUPERVISOR_AGENT` | HD-OPERATIONS | Soporte a supervisores, gestión de tareas, productividad |
| `FINANCE_AGENT` | HD-ADMIN | Resúmenes financieros, detección de anomalías, preparación de auditorías |

### 5.2 Reglas Globales de Agentes

- RBAC obligatorio: los agentes no pueden eludir la verificación de permisos
- Audit trail: toda acción de agente usa `actorType: "agent"` en `AuditEntry`
- Principio de mínimo privilegio: los agentes solo acceden a lo estrictamente necesario
- Human-in-the-loop para acciones sensibles
- Los agentes no pueden cruzar fronteras de plataformas

### 5.3 Acciones Sensibles que Requieren Revisión Humana

- Rechazo o contratación de candidatos
- Contacto con clientes
- Compromisos de pago
- Escalamiento de cuentas morosas
- Reasignación de tareas
- Ajustes financieros
- Solicitudes de automatización
- Escalamiento de riesgos críticos
- Cualquier acción cross-platform

### 5.4 Agentes Estratégicos Futuros (8 Agentes)

| Agente Futuro | Propósito |
|---------------|-----------|
| `SALES_INTELLIGENCE_AGENT` | Análisis predictivo de conversión de leads |
| `RETENTION_AGENT` | Detección temprana de churn, intervención proactiva |
| `TALENT_ANALYTICS_AGENT` | Análisis de pipeline de talento, predicción de retención |
| `FINANCIAL_FORECASTING_AGENT` | Proyecciones financieras, modelado de escenarios |
| `COMPLIANCE_AGENT` | Monitoreo de cumplimiento regulatorio y auditorías |
| `CUSTOMER_SUCCESS_AGENT` | Orquestación de customer success post-venta |
| `MARKET_INTELLIGENCE_AGENT` | Inteligencia de mercado y análisis competitivo |
| `STRATEGIC_PLANNING_AGENT` | Síntesis de KPIs para planificación estratégica |

### 5.5 Fases de Implementación

| Fase | Período | Agentes |
|------|---------|---------|
| Fase 1 — MVP | 2026 Q1-Q2 | CRM_AGENT, RH_AGENT |
| Fase 2 — Expansión | 2026 Q3-Q4 | BRAIN_AGENT, SUPERVISOR_AGENT, FINANCE_AGENT |
| Fase 3 — Inteligencia | 2027 Q1-Q2 | SALES_INTELLIGENCE_AGENT, RETENTION_AGENT |
| Fase 4 — Analytics | 2027 Q3-Q4 | TALENT_ANALYTICS_AGENT, FINANCIAL_FORECASTING_AGENT |
| Fase 5 — Enterprise | 2028+ | COMPLIANCE_AGENT, CUSTOMER_SUCCESS_AGENT, MARKET_INTELLIGENCE_AGENT, STRATEGIC_PLANNING_AGENT |

---

## Sección 6: Data Layer y KPIs

### 6.1 Principio de Datos

> Cada plataforma posee su base de datos transaccional. El data layer de HD-BRAIN consume únicamente eventos, snapshots o APIs controladas.

### 6.2 Patrones Prohibidos

| Patrón Prohibido | Razón |
|------------------|-------|
| `direct_cross_platform_db_join` | Viola la separación de dominios |
| `shared_transactional_db` | Crea acoplamiento estructural |
| `direct_db_access_between_platforms` | Rompe el contrato de dominio |
| `mutation_from_brain_agent` | BRAIN es estrictamente read-only |

### 6.3 Flujo de Datos Aprobado

```
Plataforma → Evento (HdEventEnvelope) → Bus de Eventos
                                            ↓
                              HD-BRAIN consume snapshots/eventos
                                            ↓
                              Dashboard ejecutivo con KPIs consolidados
```

### 6.4 KPI Snapshot Schema

```typescript
{
  snapshotId: string;      // UUID
  kpiId: string;           // Identificador del KPI
  value: number | string;  // Valor del KPI
  unit?: string;           // Unidad de medida
  schemaVersion: "1.0.0";
  sourcePlatform: HdKpiSource;
  producedAt: string;      // ISO 8601
  correlationId: string;   // UUID
  metadata?: Record<string, unknown>;
}
```

### 6.5 KPIs del Dashboard Ejecutivo (HD-BRAIN)

| # | KPI | Fuente | Frecuencia |
|---|-----|--------|-----------|
| 1 | Revenue | HD-ADMIN | Diaria |
| 2 | EBITDA | HD-ADMIN | Mensual |
| 3 | MRR | HD-ADMIN | Diaria |
| 4 | ARR | HD-ADMIN | Mensual |
| 5 | CAC | HD-CRM + HD-ADMIN | Mensual |
| 6 | LTV | HD-CRM + HD-ADMIN | Mensual |
| 7 | Churn | HD-CRM | Semanal |
| 8 | NPS | HD-CRM | Semanal |
| 9 | CashFlow | HD-ADMIN | Diaria |
| 10 | Growth | HD-ADMIN | Mensual |
| 11 | Productividad | HD-OPERATIONS | Diaria |
| 12 | TiempoContratacion | HD-RH | Semanal |
| 13 | Retencion | HD-RH + HD-ADMIN | Mensual |
| 14 | Conversion | HD-CRM + HD-WEB | Diaria |
| 15 | ClientesMorosos | HD-CRM | Diaria |
| 16 | RiesgosAbiertos | HD-BRAIN | Diaria |

---

## Sección 7: Knowledge Hub

### 7.1 Propósito

El Knowledge Hub es la memoria institucional de Heavenly Dreams. Centraliza SOPs, playbooks, prompts de agentes, políticas, runbooks, templates y materiales de entrenamiento. Los agentes de IA solo pueden consumir documentos con `status: "approved"`.

### 7.2 Tipos de Documentos

| Tipo | Descripción |
|------|-------------|
| `sop` | Procedimientos estándar de operación |
| `playbook` | Guías tácticas para situaciones específicas |
| `prompt` | Prompts aprobados para agentes de IA |
| `policy` | Políticas organizacionales |
| `runbook` | Guías de respuesta a incidentes |
| `template` | Plantillas reutilizables |
| `training` | Materiales de entrenamiento |

### 7.3 Ciclo de Vida

```
draft → review → approved → deprecated
```

- **draft:** Documento en elaboración, no visible para agentes
- **review:** En revisión por stakeholders, no visible para agentes
- **approved:** Listo para uso, accesible para agentes
- **deprecated:** Obsoleto, reemplazado por versión más nueva

### 7.4 Estructura de Directorios

```
docs/knowledge/
├── sops/          # Procedimientos estándar
├── playbooks/     # Guías tácticas
├── prompts/       # Prompts de agentes
├── policies/      # Políticas organizacionales
├── runbooks/      # Guías de incidentes
└── templates/     # Plantillas
```

### 7.5 Metadata Requerida

Cada documento debe tener: `docId`, `title`, `type`, `status`, `platform`, `version`, `createdAt`, `updatedAt`.

---

## Sección 8: Automatización n8n

### 8.1 Workflows Permitidos (7)

| ID | Propietario | Trigger | Human Review |
|----|------------|---------|-------------|
| `WEB_LEAD_TO_CRM` | HD-WEB | form_submission | No |
| `CRM_OVERDUE_ALERT` | HD-CRM | scheduled_daily | No |
| `CRM_PAYMENT_COMMITMENT_REMINDER` | HD-CRM | commitment_date_minus_1d | No |
| `RH_CANDIDATE_FOLLOWUP_DRAFT` | HD-RH | candidate_stage_change | **Sí** |
| `OPERATIONS_TASK_REMINDER` | HD-OPERATIONS | task_due_minus_1h | No |
| `ADMIN_FINANCE_ANOMALY_ALERT` | HD-ADMIN | anomaly_detected | **Sí** |
| `BRAIN_RISK_REVIEW_REQUEST` | HD-BRAIN | risk_signal_threshold | **Sí** |

### 8.2 Acciones Prohibidas en Workflows (7)

1. `direct_role_or_permission_change` — Solo HD-ADMIN puede cambiar permisos
2. `direct_client_debt_forgiveness` — Requiere aprobación humana en HD-CRM
3. `direct_candidate_hiring_or_rejection` — Solo recursos humanos puede decidir
4. `direct_finance_record_deletion` — Registros financieros son inmutables
5. `direct_client_contact_without_consent` — Requiere plantilla aprobada y consentimiento
6. `direct_platform_api_bypass` — Toda integración pasa por APIs controladas
7. `direct_database_mutation` — Los workflows no acceden directamente a DBs

### 8.3 Campos Requeridos por Ejecución

```json
{
  "workflowId": "string",
  "ownerPlatform": "string",
  "servicePrincipalId": "string",
  "correlationId": "uuid",
  "idempotencyKey": "string",
  "auditLog": "AuditEntry"
}
```

---

## Sección 9: Infraestructura 2026-2030

### 9.1 Stack Tecnológico

| Capa | Tecnología | Notas |
|------|-----------|-------|
| Frontend | React 18 + Vite + TailwindCSS v4 | React Router v7 |
| Backend | Node.js ≥20 + Express + tsx | esbuild para producción |
| Mensajería | WhatsApp via Baileys | Solo HD-CRM |
| Queue | BullMQ + Redis | Tareas asíncronas |
| Auth | Firebase + JWT + bcryptjs | Multi-plataforma |
| AI | Google Genai + modelos locales | Agentes especializados |
| OCR | Ollama (local) | Procesamiento de documentos |
| Automatización | n8n | Solo workflows autorizados |
| Deploy | PM2 en Ubuntu | `scripts/deploy-server.sh` |
| Secretos | API Vault interno | Requiere `SECRETS_ENCRYPTION_KEY` |

### 9.2 Environments

| Environment | Propósito | Acceso |
|-------------|---------|--------|
| `development` | Desarrollo local | Developers |
| `staging` | QA y testing pre-producción | Dev team + QA |
| `production` | Producción real | Solo CI/CD pipeline |

**Regla:** Las credenciales de producción nunca se usan en dev/staging. Environments completamente aislados.

### 9.3 Observabilidad

- **Logging:** Structured JSON logs con `correlationId` en cada entrada
- **Metrics:** KPI snapshots hacia HD-BRAIN cada hora/día según frecuencia definida
- **Tracing:** `correlationId` propagado a través de todas las plataformas y workflows
- **Alerting:** Anomalías financieras y de riesgo alertadas via `ADMIN_FINANCE_ANOMALY_ALERT` y `BRAIN_RISK_REVIEW_REQUEST`
- **Audit:** Audit log inmutable en DB separada, accesible en HD-ADMIN

### 9.4 Seguridad

- RBAC basado en HD-CORE con roles y permisos centralizados
- Audit trail completo e inmutable
- Secrets en vault con rotación programada
- Zero-trust entre plataformas: toda llamada requiere autenticación
- Rate limiting en todos los endpoints públicos
- Validación de inputs con `@hd/core-validation`

### 9.5 Evolución Futura (2028-2030)

| Año | Capacidad |
|-----|-----------|
| 2027 | Multi-tenant: soporte para empresas clientes usando el SaaS |
| 2028 | Data Cloud: analítica avanzada con warehouse centralizado |
| 2029 | API pública: ecosistema de integraciones para terceros |
| 2030 | LATAM expansion: soporte multi-idioma y multi-moneda |

---

## Sección 10: MVP Recomendado

El MVP mínimo viable que permite operación real con valor inmediato:

### Alcance del MVP

1. **HD-CORE** — Contratos, tokens, UI headless (ya completo)
2. **HD-WEB** — Sitio público + captura de leads + listado de vacantes
3. **HD-CRM** — Gestión básica de clientes + alertas de morosos + CRM_AGENT
4. **HD-ADMIN básico** — Gestión de usuarios, roles y audit log mínimo

### Criterio de MVP

- El visitante del sitio HD-WEB puede enviar su información y el lead llega a HD-CRM
- El equipo CRM puede gestionar cuentas, ver morosos y recibir alertas diarias
- El admin puede crear usuarios, asignar roles y ver el audit log básico
- CI/CD funcionando con typecheck en verde

### Fuera de Scope del MVP

- HD-RH, HD-OPERATIONS, HD-BRAIN (segunda oleada)
- Agentes de IA (excepto CRM_AGENT básico)
- n8n workflows avanzados
- Dashboard ejecutivo

---

## Sección 11: Roadmap por Etapas

| Etapa | Nombre | Contenido | Estado |
|-------|--------|-----------|--------|
| Etapa 0 | Fundamentos | HD-CORE completo, CI/CD, contratos | En progreso |
| Etapa 1 | Web pública | HD-WEB: sitio, SEO, leads, vacantes | Pendiente |
| Etapa 2 | CRM básico | HD-CRM: clientes, morosos, alertas | Pendiente |
| Etapa 3 | Admin básico | HD-ADMIN: users, roles, audit | Pendiente |
| Etapa 4 | RH básico | HD-RH: candidatos, vacantes, entrevistas | Pendiente |
| Etapa 5 | Agentes IA | CRM_AGENT + RH_AGENT operacionales | Pendiente |
| Etapa 6 | Operaciones | HD-OPERATIONS: tareas, agenda, productividad | Pendiente |
| Etapa 7 | Brain MVP | HD-BRAIN: KPIs básicos, dashboard ejecutivo | Pendiente |
| Etapa 8 | n8n completo | Los 7 workflows autorizados operacionales | Pendiente |
| Etapa 9 | Knowledge Hub | +50 docs aprobados, agentes consumiendo KB | Pendiente |
| Etapa 10 | Enterprise | BRAIN_AGENT completo, 5 agentes activos, multi-tenant | Pendiente |

---

## Sección 12: Criterio de Producción Real

Los 20 criterios que deben cumplirse antes de considerar el sistema en "producción real":

1. Todas las plataformas HD-* tienen su build sin errores de TypeScript
2. CI/CD pipeline verde en todos los repositorios
3. Tests unitarios con cobertura >70% en lógica de negocio crítica
4. RBAC implementado y verificado en todos los endpoints
5. Audit trail funcionando: cada mutación genera un `AuditEntry`
6. `correlationId` propagado correctamente a través de todas las operaciones
7. Agentes de IA operacionales con human-in-the-loop verificado
8. Los 7 workflows n8n funcionando con audit trail completo
9. Knowledge Hub con >30 documentos aprobados accesibles para agentes
10. Design tokens importados desde `@hd/core-tokens` en todas las plataformas
11. Environments prod/staging/dev completamente separados
12. Secrets en vault, ninguna credencial hardcodeada en código
13. Monolito `heavenlydreamslovera` en modo read-only (migración completa)
14. HD-BRAIN mostrando al menos 8 KPIs en el dashboard ejecutivo
15. Backup automático de todas las bases de datos con retención de 30 días
16. Rate limiting en todos los endpoints públicos
17. Logging estructurado con correlationId en todas las plataformas
18. Zero-downtime deployment verificado
19. Runbook de incidentes documentado y probado
20. Revisión de seguridad completada por un segundo par de ojos

---

## Sección 13: Criterio de Aceptación de Esta Fase

Los 12 criterios de aceptación para la fase actual (Etapa 0 — Fundamentos):

1. `packages/contracts/src/index.ts` exporta todos los módulos: platforms, events, rbac, agents, automation, audit, design-system, data-layer, knowledge-hub, n8n-workflows
2. `packages/tokens/src/index.ts` contiene todos los design tokens: hdColors, hdTypography, hdSpacing, hdRadius, hdShadows, hdZIndex, hdBreakpoints, hdMotion
3. `packages/ui/src/index.ts` contiene todos los componentes headless: Button, Input, Card, Table, Sidebar, Navbar, Modal, Toast, DashboardLayout, Badge, EmptyState
4. Todos los contratos JSON existen en `contracts/`: audit.v1.json, design-system.v1.json, data-layer.v1.json, knowledge-hub.v1.json, n8n-workflows.v1.json, ai-agents.v1.json, automation-policy.v1.json, ecosystem-boundaries.v1.json
5. Documentación en `docs/`: ARCHITECTURE.md, DESIGN_SYSTEM.md, DATA_LAYER_STRATEGY.md, KNOWLEDGE_HUB_STRATEGY.md, N8N_WORKFLOW_CATALOG.md, AI_AGENTS_GOVERNANCE.md, N8N_AUTOMATION_POLICY.md, MASTER_UNIFIED_PRODUCTION_PLAN.md
6. Knowledge Hub directory structure creada: `docs/knowledge/sops/`, `playbooks/`, `prompts/`, `policies/`, `runbooks/`, `templates/`
7. `npm run typecheck` pasa sin errores en HD-CORE
8. CI workflow `.github/workflows/ci.yml` existe y está configurado correctamente
9. Todas las reglas obligatorias de la Sección 3 están documentadas y auditables
10. El plan de KPIs de HD-BRAIN está definido con los 16 KPIs listados
11. Los 5 agentes iniciales tienen sus políticas documentadas
12. El commit está mergeado en `claude/laughing-hawking-pau9wz` con PR abierto

---

*Documento generado el 2026-06-12. Versión 1.0.0. Propietario: HD-CORE Architecture Team.*
*Este documento es la fuente de verdad para el plan de ejecución del ecosistema Heavenly Dreams 2026-2030.*
