# Data Layer Strategy — Heavenly Dreams

## Objetivo

Centralizar métricas ejecutivas sin mezclar dominios transaccionales.

Contrato machine-readable: `contracts/data-layer.v1.json`.

## Regla Central

Cada plataforma conserva su base de datos operativa. El Data Layer consume **eventos, snapshots o APIs controladas** — nunca acceso directo a bases productivas de otra plataforma. **Prohibido hacer joins directos entre bases productivas sin política aprobada.**

## Fuentes Iniciales

| Fuente | Plataforma | Mecanismo |
|---|---|---|
| CRM (clientes, morosos, compromisos) | HD-CRM | Eventos + snapshots |
| RH (candidatos, contrataciones) | HD-RH | Eventos + snapshots |
| Marketing / Web (leads, conversión) | HD-WEB | Eventos |
| Ventas (pipeline, MRR) | HD-CRM | Snapshots |
| Finanzas | HD-ADMIN | Snapshots aprobados |
| Operaciones (tareas, productividad) | HD-OPERATIONS | Eventos + snapshots |
| Academy (futuro) | HD-RH módulo | Eventos |

## Consumidor Principal

HD-BRAIN materializa los KPI snapshots y alimenta el dashboard ejecutivo (`HD-BRAIN/docs/EXECUTIVE_DASHBOARD.md`, `HD-BRAIN/docs/KPI_CATALOG.md`).

## Evolución Futura (no implementar todavía)

Data Warehouse · BI · Dashboards avanzados · Machine Learning · Forecasting · Data quality · Data lineage · posible repo `HD-DATA-CLOUD` — solo cuando existan fuentes productivas reales.

## Reglas

1. Todo snapshot lleva `correlationId`, `producedAt`, `sourcePlatform` y `schemaVersion`.
2. Los snapshots financieros requieren aprobación de HD-ADMIN antes de exponerse.
3. PII nunca viaja en snapshots agregados — solo identificadores y agregaciones.
4. La frecuencia de snapshot se define por KPI en el KPI Catalog.
5. Data quality: cada productor es responsable de la validez de sus snapshots.
