# Roadmap — HD-CORE

HD-CORE es la fuente de verdad del ecosistema. Su roadmap habilita a las demás plataformas.

## Fase 1: Base técnica

- [x] Monorepo de packages (contracts, types, rbac, validation, tokens, ui, api-client)
- [x] Contratos JSON versionados en contracts/
- [x] Quality gate (.github + docs/QUALITY_GATE.md)
- [ ] tsconfig compartido exportable para dependientes
- [ ] Versionado semántico de packages

## Fase 2: Dominio (contratos)

- [x] platforms, events, rbac, agents, automation, audit
- [x] design-system, data-layer, knowledge-hub, n8n-workflows
- [ ] Completar eventos faltantes referenciados por EVENTS.md de dependientes
- [ ] Validadores zod por contrato en packages/validation

## Fase 3: API (identidad y plataforma)

- [ ] Servicio de identidad (JWT issuance, refresh, revocación)
- [ ] Endpoint de introspección RBAC
- [ ] Registro de service principals

## Fase 4: UI (design system)

- [ ] Implementación React de componentes base sobre tokens
- [ ] Storybook o catálogo visual
- [ ] Guía de uso por plataforma

## Fase 5: Integraciones

- [ ] Event bus contracts implementados (envelope validation)
- [ ] api-client funcional con auth y correlationId automático

## Fase 6: Agentes IA

- [ ] Agent runtime governance helpers (RBAC check, audit emit)
- [ ] Registro central de agent runs

## Fase 7: Observabilidad

- [ ] packages/telemetry (logs estructurados, correlationId, requestId)
- [ ] Contratos de métricas y health checks

## Fase 8: Producción

- [ ] Publicación versionada de packages (registry mode)
- [ ] Pipeline de release con changelog
- [ ] Política de breaking changes
