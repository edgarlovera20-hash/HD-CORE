# HD Data Layer Strategy

**Versión:** 1.0.0
**Propietario:** HD-BRAIN / HD-CORE Architecture
**Contrato:** `contracts/data-layer.v1.json`

---

## Principio Fundamental

> **Cada plataforma posee exclusivamente su base de datos transaccional.**
> El data layer de análisis (HD-BRAIN) consume únicamente eventos, snapshots o APIs controladas.
> Nunca hay acceso directo entre bases de datos de plataformas distintas.

Este principio es no negociable. Violarlo introduce acoplamiento estructural, rompe los contratos de dominio y compromete la integridad del ecosistema.

---

## Patrones Prohibidos

Los siguientes patrones están **estrictamente prohibidos** en todo el ecosistema:

| Patrón | Por qué está prohibido |
|--------|----------------------|
| `direct_cross_platform_db_join` | Las plataformas no comparten esquemas de DB. Un JOIN cruzado viola la propiedad del dominio. |
| `shared_transactional_db` | Una DB compartida crea acoplamiento que impide el escalado y la evolución independiente. |
| `direct_db_access_between_platforms` | Solo el propietario del dominio puede acceder a su DB directamente. |
| `mutation_from_brain_agent` | HD-BRAIN y su agente son estrictamente de lectura. No pueden mutar datos transaccionales. |

**Si encuentras código que viola alguno de estos patrones, es un bug crítico de arquitectura que debe corregirse antes de hacer merge.**

---

## Flujo de Datos Aprobado

### Integración via Eventos

```
Plataforma A                     Bus de Eventos (Redis/Queue)
    │                                      │
    ├─ operación de negocio ──────────────►│
    │  (crea AuditEntry)                   │
    │                                      │
    │                              Plataforma B
    │                                  (escucha evento)
    │                                  (reacciona)
    │                                  (crea su propio AuditEntry)
```

**Características del bus de eventos:**
- Todos los mensajes usan `HdEventEnvelope<TPayload>` del contrato HD-CORE
- Cada evento lleva `correlationId`, `eventId`, `occurredAt`, `producer`, `actor`
- Los nombres de eventos vienen de `hdEvents` en `@hd/core-contracts`, nunca strings hardcodeados

### Integración via APIs Controladas

```
Plataforma A  ──── HTTP/API ────►  Plataforma B
    │                                  │
    │  (lleva correlationId)           │
    │  (autenticación requerida)       │
    │  (RBAC verificado)               │
    │  (genera AuditEntry en A y B)    │
```

### Integración via Snapshots (para HD-BRAIN)

```
Plataforma X                     HD-BRAIN
    │                                │
    ├─ genera KPI snapshot ─────────►│
    │  (HdKpiSnapshot)               │
    │                                ├─ agrega KPIs
    │                                ├─ detecta anomalías
    │                                └─ genera recomendaciones
```

---

## KPI Snapshot Schema

Cada snapshot de KPI que una plataforma publica hacia HD-BRAIN debe seguir este esquema:

```typescript
interface HdKpiSnapshot {
  snapshotId: string;           // UUID único del snapshot
  kpiId: string;                // Identificador del KPI (ej. "revenue_daily")
  value: number | string;       // Valor del KPI
  unit?: string;                // Unidad (ej. "MXN", "count", "%")
  schemaVersion: "1.0.0";       // Versión del schema
  sourcePlatform: HdKpiSource;  // Plataforma que produce el snapshot
  producedAt: string;           // ISO 8601 timestamp
  correlationId: string;        // UUID de correlación
  metadata?: Record<string, unknown>; // Datos adicionales opcionales
}
```

**Campos requeridos:** `snapshotId`, `kpiId`, `schemaVersion`, `sourcePlatform`, `producedAt`, `correlationId`, `value`

---

## Dashboard Ejecutivo (HD-BRAIN)

HD-BRAIN es el propietario del dashboard ejecutivo. Consolida KPIs de todas las plataformas.

### Arquitectura del Dashboard

```
HD-CRM ──────────────────────────────────┐
HD-RH  ──────────────────────────────────┤
HD-OPERATIONS ───────────── KPI Snapshots ──► HD-BRAIN Dashboard
HD-ADMIN ────────────────────────────────┤   (Executive View)
HD-WEB ──────────────────────────────────┘
```

### KPIs del Dashboard Ejecutivo

| # | KPI | Fuente | Frecuencia | Tipo |
|---|-----|--------|-----------|------|
| 1 | Revenue | HD-ADMIN | Diaria | Financiero |
| 2 | EBITDA | HD-ADMIN | Mensual | Financiero |
| 3 | MRR (Monthly Recurring Revenue) | HD-ADMIN | Diaria | Financiero |
| 4 | ARR (Annual Recurring Revenue) | HD-ADMIN | Mensual | Financiero |
| 5 | CAC (Customer Acquisition Cost) | HD-CRM + HD-ADMIN | Mensual | Marketing |
| 6 | LTV (Lifetime Value) | HD-CRM + HD-ADMIN | Mensual | Marketing |
| 7 | Churn Rate | HD-CRM | Semanal | Retención |
| 8 | NPS (Net Promoter Score) | HD-CRM | Semanal | Satisfacción |
| 9 | CashFlow | HD-ADMIN | Diaria | Financiero |
| 10 | Growth Rate | HD-ADMIN | Mensual | Crecimiento |
| 11 | Productividad | HD-OPERATIONS | Diaria | Operacional |
| 12 | TiempoContratacion | HD-RH | Semanal | RH |
| 13 | Retención de Empleados | HD-RH + HD-ADMIN | Mensual | RH |
| 14 | Tasa de Conversión | HD-CRM + HD-WEB | Diaria | Ventas |
| 15 | Clientes Morosos | HD-CRM | Diaria | Riesgo |
| 16 | Riesgos Abiertos | HD-BRAIN | Diaria | Riesgo |

### KPI Definitions

Los KPIs se definen usando la interfaz `HdKpiDefinition`:

```typescript
interface HdKpiDefinition {
  kpiId: string;
  name: string;
  description: string;
  sourcePlatform: HdKpiSource;
  mechanism: "event" | "snapshot" | "api";
  frequency: HdKpiFrequency;
  unit?: string;
}
```

---

## Evolución Futura: Data Cloud (2028)

A medida que el ecosistema madura, se prevé la introducción de un Data Cloud:

### Arquitectura Target (2028)

```
Plataformas HD-*
       │
       ▼ (eventos + snapshots)
  Event Stream (Kafka / Redis Streams)
       │
       ▼
  Data Warehouse (BigQuery / Snowflake)
       │
       ├── Analytics Layer (dbt transformations)
       ├── ML Pipeline (modelos predictivos)
       └── HD-BRAIN Dashboard (visualización)
```

### Principios que se Mantienen

Incluso con un Data Cloud, los principios fundamentales no cambian:
- Ninguna plataforma accede directamente a la DB de otra
- Los datos del warehouse son read-only (copias analíticas, no transaccionales)
- El `correlationId` se propaga hasta el warehouse para trazabilidad end-to-end
- HD-BRAIN sigue siendo el único punto de consolidación ejecutiva

---

## Implementación Práctica

### Para plataformas que producen KPIs

1. Calcular el KPI según la frecuencia definida (job/cron)
2. Construir un `HdKpiSnapshot` con todos los campos requeridos
3. Publicar al bus de eventos con el topic apropiado
4. Registrar un `AuditEntry` con `action: "trigger"` y `resourceType: "kpi_snapshot"`

### Para HD-BRAIN que consume KPIs

1. Escuchar los snapshots del bus de eventos
2. Almacenarlos en su DB de lectura (NO en la DB de la plataforma fuente)
3. Calcular trends, anomalías y señales de riesgo
4. Las recomendaciones generadas por `BRAIN_AGENT` requieren aprobación humana antes de ejecutarse
5. Todo lo que BRAIN escribe es en su propia DB, nunca en la DB de otra plataforma

---

*Versión 1.0.0 — 2026-06-12*
