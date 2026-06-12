# HD Design System

**Versión:** 1.0.0
**Paquetes:** `@hd/core-tokens`, `@hd/core-ui`
**Regla:** Todas las plataformas importan desde estos paquetes. Nunca redefinir colores, tipografía ni espaciado en repos de plataforma.

---

## Paleta de Colores Oficial

```typescript
import { hdColors } from "@hd/core-tokens";
```

### Colores Principales

| Token | Hex | Uso |
|-------|-----|-----|
| `hdColors.primary` | `#0066FF` | Botones CTA, links activos, foco |
| `hdColors.primaryHover` | `#0052CC` | Hover de acciones primarias |
| `hdColors.secondary` | `#00A3FF` | Acciones secundarias, badges de info |
| `hdColors.secondaryHover` | `#0080CC` | Hover de acciones secundarias |

### Colores de Estado

| Token | Hex | Uso |
|-------|-----|-----|
| `hdColors.success` | `#10B981` | Confirmaciones, estados exitosos |
| `hdColors.warning` | `#F59E0B` | Advertencias, atención requerida |
| `hdColors.error` | `#EF4444` | Errores, estados fallidos, alertas críticas |

### Fondos

| Token | Hex | Uso |
|-------|-----|-----|
| `hdColors.background.base` | `#0A0F1C` | Fondo base de la aplicación (body) |
| `hdColors.background.surface` | `#111827` | Cards, paneles, sidebars |
| `hdColors.background.elevated` | `#161F33` | Modales, dropdowns, tooltips |

### Texto

| Token | Hex | Uso |
|-------|-----|-----|
| `hdColors.text.primary` | `#F9FAFB` | Texto principal |
| `hdColors.text.secondary` | `#E5E7EB` | Texto secundario, labels |
| `hdColors.text.muted` | `#9CA3AF` | Texto silenciado, placeholders, captions |

### Bordes

| Token | Hex | Uso |
|-------|-----|-----|
| `hdColors.border.default` | `#1F2937` | Bordes estándar de cards y contenedores |
| `hdColors.border.strong` | `#334155` | Bordes con mayor énfasis visual |

---

## Tipografía

```typescript
import { hdTypography } from "@hd/core-tokens";
```

### Fuentes

| Token | Valor | Uso |
|-------|-------|-----|
| `hdTypography.fontSans` | `Inter, system-ui, sans-serif` | Todo el texto UI: formularios, tablas, navegación, texto operacional |
| `hdTypography.fontHeading` | `Poppins, Inter, system-ui, sans-serif` | Encabezados (h1-h3), secciones hero, nombre de marca |
| `hdTypography.fontMono` | `JetBrains Mono, Fira Code, monospace` | Código, terminales, IDs técnicos |

### Regla de Tipografía

> **Inter** para todo lo operacional y funcional.
> **Poppins** para branding, headings principales y marketing.
> Nunca mezclar arbitrariamente.

### Tamaños

| Token | Valor | Equivalente |
|-------|-------|-------------|
| `hdTypography.sizes.xs` | `0.75rem` | 12px |
| `hdTypography.sizes.sm` | `0.875rem` | 14px |
| `hdTypography.sizes.base` | `1rem` | 16px |
| `hdTypography.sizes.lg` | `1.125rem` | 18px |
| `hdTypography.sizes.xl` | `1.25rem` | 20px |
| `hdTypography.sizes["2xl"]` | `1.5rem` | 24px |
| `hdTypography.sizes["3xl"]` | `1.875rem` | 30px |
| `hdTypography.sizes["4xl"]` | `2.25rem` | 36px |
| `hdTypography.sizes["5xl"]` | `3rem` | 48px |

### Pesos

| Token | Valor | Uso |
|-------|-------|-----|
| `hdTypography.weights.normal` | `400` | Texto de cuerpo |
| `hdTypography.weights.medium` | `500` | Labels, navegación |
| `hdTypography.weights.semibold` | `600` | Subtítulos, encabezados de sección |
| `hdTypography.weights.bold` | `700` | Encabezados principales |
| `hdTypography.weights.extrabold` | `800` | Display, hero headings |

---

## Espaciado

```typescript
import { hdSpacing } from "@hd/core-tokens";
```

| Token | Valor | Uso común |
|-------|-------|-----------|
| `hdSpacing[1]` | `0.25rem` | Gap mínimo, padding de badge |
| `hdSpacing[2]` | `0.5rem` | Padding de iconos |
| `hdSpacing[3]` | `0.75rem` | Padding sm de buttons/inputs |
| `hdSpacing[4]` | `1rem` | Padding estándar de elementos |
| `hdSpacing[6]` | `1.5rem` | Padding de cards |
| `hdSpacing[8]` | `2rem` | Secciones internas |
| `hdSpacing[12]` | `3rem` | Separación de secciones |
| `hdSpacing[16]` | `4rem` | Padding de páginas |
| `hdSpacing[24]` | `6rem` | Secciones hero |

---

## Border Radius

```typescript
import { hdRadius } from "@hd/core-tokens";
```

| Token | Valor | Uso |
|-------|-------|-----|
| `hdRadius.none` | `0` | Sin radius |
| `hdRadius.sm` | `0.25rem` | Badges, tags pequeños |
| `hdRadius.md` | `0.5rem` | Inputs, botones |
| `hdRadius.lg` | `0.75rem` | Cards, paneles |
| `hdRadius.xl` | `1rem` | Cards grandes, modales |
| `hdRadius["2xl"]` | `1.5rem` | Modales principales |
| `hdRadius.full` | `9999px` | Badges circulares, avatares |

---

## Sombras

```typescript
import { hdShadows } from "@hd/core-tokens";
```

| Token | Uso |
|-------|-----|
| `hdShadows.sm` | Sombra sutil en elementos flotantes |
| `hdShadows.md` | Cards y paneles estándar |
| `hdShadows.lg` | Dropdowns, popovers |
| `hdShadows.xl` | Modales |
| `hdShadows.glow` | Efecto glow azul (accent primary) |
| `hdShadows.glowSuccess` | Glow verde (éxito) |
| `hdShadows.glowWarning` | Glow amarillo (advertencia) |
| `hdShadows.glowError` | Glow rojo (error) |

---

## Movimiento y Animación

```typescript
import { hdMotion } from "@hd/core-tokens";
```

### Duraciones

| Token | Valor | Uso |
|-------|-------|-----|
| `hdMotion.duration.fast` | `100ms` | Hover states, micro-interactions |
| `hdMotion.duration.normal` | `200ms` | Transiciones estándar |
| `hdMotion.duration.slow` | `300ms` | Entradas de modales/panels |
| `hdMotion.duration.slower` | `500ms` | Animaciones de página |

### Easings

| Token | Uso |
|-------|-----|
| `hdMotion.easing.default` | Transiciones generales (ease-in-out) |
| `hdMotion.easing.in` | Elementos que salen de la vista |
| `hdMotion.easing.out` | Elementos que entran a la vista |
| `hdMotion.easing.spring` | Efectos elásticos, bounce |

---

## Z-Index

```typescript
import { hdZIndex } from "@hd/core-tokens";
```

| Token | Valor | Elemento |
|-------|-------|---------|
| `hdZIndex.base` | `0` | Contenido base |
| `hdZIndex.dropdown` | `100` | Dropdowns, selects |
| `hdZIndex.sticky` | `200` | Headers sticky |
| `hdZIndex.overlay` | `300` | Overlays de página |
| `hdZIndex.modal` | `400` | Modales y drawers |
| `hdZIndex.popover` | `500` | Popovers, tooltips de acción |
| `hdZIndex.toast` | `600` | Notificaciones toast |
| `hdZIndex.tooltip` | `700` | Tooltips de información |

---

## Breakpoints

```typescript
import { hdBreakpoints } from "@hd/core-tokens";
```

| Token | Valor | Descripción |
|-------|-------|-------------|
| `hdBreakpoints.sm` | `640px` | Teléfonos en landscape |
| `hdBreakpoints.md` | `768px` | Tablets |
| `hdBreakpoints.lg` | `1024px` | Laptops |
| `hdBreakpoints.xl` | `1280px` | Desktops |
| `hdBreakpoints["2xl"]` | `1536px` | Pantallas grandes |

---

## Componentes UI Headless

Todos los componentes son headless (solo generan class names). Sin dependencias de framework. Compatible con React, Vue, Astro, etc.

```typescript
import {
  createButtonClassName,
  createInputClassName,
  createCardClassName,
  createTableClassName,
  createSidebarClassName,
  createNavbarClassName,
  createModalClassName,
  createToastClassName,
  createDashboardLayoutClassName,
  createBadgeClassName,
  createEmptyStateClassName,
} from "@hd/core-ui";
```

### Button

```typescript
createButtonClassName({ variant: "primary", size: "md", disabled: false, fullWidth: false })
// Variantes: "primary" | "secondary" | "danger" | "ghost" | "success"
// Tamaños: "sm" | "md" | "lg"
```

### Input

```typescript
createInputClassName({ error: false, size: "md" })
// Tamaños: "sm" | "md" | "lg"
```

### Card

```typescript
createCardClassName({ elevated: false, bordered: true, padding: "md" })
// Padding: "none" | "sm" | "md" | "lg"
```

### Table

```typescript
const cls = createTableClassName();
// Retorna: { wrapper, table, thead, th, tbody, tr, td }
```

### Sidebar

```typescript
const cls = createSidebarClassName();
// Retorna: { sidebar, nav, item, itemActive, section }
```

### Navbar

```typescript
const cls = createNavbarClassName();
// Retorna: { navbar, brand, nav, actions }
```

### Modal

```typescript
const cls = createModalClassName();
// Retorna: { backdrop, container, header, body, footer }
```

### Toast

```typescript
createToastClassName("success") // "success" | "error" | "warning" | "info"
```

### Dashboard Layout

```typescript
const cls = createDashboardLayoutClassName();
// Retorna: { layout, sidebar, main, header, content }
```

### Badge

```typescript
createBadgeClassName("primary")
// Variantes: "default" | "primary" | "success" | "warning" | "error"
```

### Empty State

```typescript
const cls = createEmptyStateClassName();
// Retorna: { container, icon, title, description }
```

---

## Reglas de Uso por Plataforma

1. **NUNCA** redefinir colores, tipografía o espaciado en repos de plataforma
2. **SIEMPRE** importar desde `@hd/core-tokens` para tokens y `@hd/core-ui` para componentes
3. Los componentes headless se usan como base; las plataformas pueden extender con clases adicionales
4. El modo oscuro es el default y único modo soportado en el ecosistema (paleta dark-first)
5. Para TailwindCSS: los colores de la paleta oficial se configuran como CSS variables o tokens de Tailwind en cada plataforma apuntando a los valores de `@hd/core-tokens`

---

## Ejemplo de Integración en React

```tsx
import { createButtonClassName, createCardClassName } from "@hd/core-ui";
import { hdColors } from "@hd/core-tokens";

function MyComponent() {
  return (
    <div className={createCardClassName({ elevated: true, padding: "lg" })}>
      <h2 style={{ color: hdColors.text.primary }}>Título</h2>
      <button className={createButtonClassName({ variant: "primary", size: "md" })}>
        Acción
      </button>
    </div>
  );
}
```
