# Environment Configuration — HD-CORE

## Overview

HD-CORE es hoy una librería de packages; su superficie de runtime (identidad) llega en Fase 3. Variables mínimas para desarrollo y CI:

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NODE_ENV` | Entorno | `development` |
| `APP_NAME` | Identificador | `HD-CORE` |
| `HD_CORE_MODE` | Modo de resolución para dependientes | `local` o `registry` |
| `DATABASE_URL` | BD de identidad (futuro, Fase 3) | `postgresql://user:password@localhost:5432/hdcore` |
| `AUDIT_DB_URL` | BD de auditoría (append-only) | `postgresql://user:password@localhost:5432/hdaudit` |
| `JWT_SECRET` | Firma de tokens (futuro) | (nunca hardcodear) |
| `LOG_LEVEL` | Nivel de logs | `info` |

## Reglas

1. Nunca commitear `.env` con valores reales.
2. `JWT_SECRET` se rota inmediatamente si se expone.
3. La BD de auditoría es separada y append-only.
