# Design System — Heavenly Dreams

## Objetivo

Eliminar diferencias visuales entre repositorios. Todas las plataformas comparten una identidad Heavenly Dreams consistente, consumida desde `@hd/core-tokens` y `@hd/core-ui`. **No rediseñar cada repo por separado.**

Contrato machine-readable: `contracts/design-system.v1.json`.

## Tipografía

| Fuente | Uso |
|---|---|
| **Inter** | UI, formularios, tablas y textos operativos |
| **Poppins** | Headings, hero sections, marketing y branding |

## Paleta Oficial

### Semánticos

| Token | Valor | Uso |
|---|---|---|
| `primary` | `#0066FF` | Acciones principales, links, énfasis de marca |
| `secondary` | `#00A3FF` | Acentos, estados activos secundarios |
| `success` | `#10B981` | Confirmaciones, estados saludables |
| `warning` | `#F59E0B` | Advertencias, riesgos medios |
| `error` | `#EF4444` | Errores, riesgos críticos, acciones destructivas |

### Fondos (dark-first)

| Token | Valor |
|---|---|
| `background.base` | `#0A0F1C` |
| `background.surface` | `#111827` |
| `background.elevated` | `#161F33` |

### Texto

| Token | Valor |
|---|---|
| `text.primary` | `#F9FAFB` |
| `text.secondary` | `#E5E7EB` |
| `text.muted` | `#9CA3AF` |

### Bordes

| Token | Valor |
|---|---|
| `border.subtle` | `#1F2937` |
| `border.strong` | `#334155` |

## Tokens en `@hd/core-tokens`

El paquete exporta: `colors`, `typography`, `spacing`, `radius`, `shadows`, `zIndex`, `breakpoints`, `motion`.

## Componentes base en `@hd/core-ui`

Catálogo objetivo (los marcados ✓ ya tienen stub):

```text
✓ Button        ✓ Input         ✓ Card          ✓ Table
✓ Sidebar       ✓ Navbar        ✓ Modal         ✓ Toast
✓ DashboardLayout              Textarea       Select
Footer         Dialog         Badge          Tabs
Charts         FormField      DataTable      EmptyState
LoadingState   ErrorState
```

Los stubs actuales son headless (builders de clases + interfaces tipadas) para no acoplar HD-CORE a un framework de render. La implementación React/Tailwind llega en Etapa 1 del roadmap maestro.

## Reglas

1. Ningún repo define colores, fuentes o espaciados propios fuera de tokens.
2. Cambios a la paleta o tipografía se hacen únicamente en HD-CORE vía PR.
3. HD-WEB puede extender con estilos de marketing, pero partiendo de los tokens base.
4. Todo componente nuevo compartido se propone primero en `packages/ui`.
