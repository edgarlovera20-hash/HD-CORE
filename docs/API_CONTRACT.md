# API Contract — HD-CORE

## Rol

HD-CORE expondrá (Fase 3 del roadmap) los servicios transversales del ecosistema: identidad, introspección RBAC y registro de service principals. No expone datos de dominio de ninguna plataforma.

## Base URL futura

```
https://core.heavenlydreams.com.mx/api/v1
```

## Recursos Previstos

### Identidad

| Method | Endpoint | Permiso | Descripción |
|---|---|---|---|
| POST | /auth/login | público (rate-limited) | Emisión de JWT |
| POST | /auth/refresh | token válido | Refresh de token |
| POST | /auth/revoke | token válido | Revocación |

### RBAC

| Method | Endpoint | Permiso | Descripción |
|---|---|---|---|
| GET | /rbac/permissions/:userId | `admin.users.read` o self | Permisos efectivos |
| POST | /rbac/introspect | service principal | Validación de permiso para una acción |

### Service Principals

| Method | Endpoint | Permiso | Descripción |
|---|---|---|---|
| GET | /service-principals | `admin.*` | Listar |
| POST | /service-principals | `admin.*` | Registrar (auditado, severity: critical) |

## Reglas

- Toda emisión/revocación de tokens produce AuditEntry.
- MFA obligatorio para cuentas admin (Etapa 3 del plan maestro).
- Errores siguen el contrato estándar: 400/401/403/404/409/429/500, sin stack traces.
- Ninguna otra plataforma emite JWTs: la identidad es exclusiva de HD-CORE.
- Prohibido el acceso directo a la base de identidad desde otras plataformas.
