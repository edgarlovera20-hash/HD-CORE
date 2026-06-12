# Pull Request Review Checklist

## Arquitectura

- [ ] La PR respeta la frontera de la plataforma.
- [ ] No duplica contratos de HD-CORE.
- [ ] No introduce permisos locales si deben vivir en HD-CORE.
- [ ] No introduce eventos locales si deben vivir en HD-CORE.
- [ ] No mezcla responsabilidades de CRM, RH, Admin, Operations, Web o Brain.

## Seguridad

- [ ] Respeta RBAC.
- [ ] No expone secretos.
- [ ] No usa claves locales inseguras.
- [ ] No permite bypass de autenticación.
- [ ] No permite cambios críticos sin auditoría.

## Agentes IA

- [ ] El agente tiene permisos mínimos.
- [ ] El agente registra acciones.
- [ ] El agente no modifica datos fuera de su dominio.
- [ ] Las automatizaciones críticas requieren revisión humana.

## CI/CD

- [ ] npm install funciona.
- [ ] npm run typecheck funciona.
- [ ] npm test funciona.
- [ ] El workflow puede resolver HD-CORE.
