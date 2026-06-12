# HD Knowledge Hub Strategy

**Versión:** 1.0.0
**Propietario:** HD-CORE / Architecture
**Contrato:** `contracts/knowledge-hub.v1.json`

---

## Propósito

El Knowledge Hub es la **memoria institucional** de Heavenly Dreams. Su misión es capturar, organizar, versionar y distribuir el conocimiento operacional y estratégico de la organización para que sea accesible de forma confiable por el equipo y los agentes de IA.

### Por qué importa

- Los agentes de IA solo son tan buenos como el conocimiento que consumen
- Sin un hub centralizado, el conocimiento vive disperso en chats, emails y memorias individuales
- La gobernanza del conocimiento previene que agentes consuman información desactualizada o incorrecta
- El ciclo de vida estructurado (draft → review → approved) garantiza calidad antes de que llegue a producción

---

## Tipos de Documentos

El sistema reconoce 7 tipos de documentos, cada uno con un propósito específico:

| Tipo | Descripción | Ejemplos |
|------|-------------|---------|
| `sop` | Standard Operating Procedure — pasos exactos para ejecutar un proceso | "Cómo registrar un cliente moroso", "Proceso de onboarding" |
| `playbook` | Guía táctica para situaciones específicas y repetibles | "Playbook de cobranza", "Playbook de entrevistas técnicas" |
| `prompt` | Prompts aprobados para uso por agentes de IA | "Prompt de resumen de candidato para RH_AGENT", "Prompt de priorización de morosos" |
| `policy` | Políticas organizacionales con normas de comportamiento | "Política de uso de IA", "Política de retención de datos" |
| `runbook` | Guía de respuesta a incidentes o situaciones de emergencia | "Runbook de caída de producción", "Runbook de brecha de datos" |
| `template` | Plantillas reutilizables para documentos, emails, reportes | "Template de reporte semanal", "Template de oferta de trabajo" |
| `training` | Materiales de entrenamiento para el equipo | "Entrenamiento de uso del CRM", "Guía de onboarding para nuevos devs" |

---

## Ciclo de Vida

Todos los documentos siguen este ciclo de vida obligatorio:

```
  draft
    │
    │  (autor termina el borrador)
    ▼
  review
    │
    │  (stakeholder aprueba)
    ▼
  approved ──────────────────────────────► (accessible para agentes IA)
    │
    │  (documento reemplazado por versión nueva)
    ▼
  deprecated
```

### Definición de cada estado

| Estado | Descripción | ¿Visible para agentes? |
|--------|-------------|----------------------|
| `draft` | Borrador en elaboración | **No** |
| `review` | En revisión por stakeholders | **No** |
| `approved` | Aprobado y listo para uso | **Sí** |
| `deprecated` | Obsoleto, reemplazado | **No** |

### Regla de Agentes

> **Los agentes de IA solo pueden consumir documentos con `status: "approved"`.**

Esta regla es absoluta. Si un agente necesita información de un documento en draft, la solución es acelerar el proceso de aprobación, no relajar la regla.

---

## Metadata Requerida

Cada documento del Knowledge Hub debe tener los siguientes campos:

```typescript
interface HdKnowledgeDoc {
  docId: string;              // UUID único
  title: string;              // Título claro y descriptivo
  type: KnowledgeDocType;     // sop | playbook | prompt | policy | runbook | template | training
  status: KnowledgeDocStatus; // draft | review | approved | deprecated
  platform: string;           // Plataforma dueña: HD-CRM, HD-RH, etc. (o "global")
  version: string;            // Semver: "1.0.0"
  tags: string[];             // Tags para búsqueda
  createdAt: string;          // ISO 8601
  updatedAt: string;          // ISO 8601
  approvedBy?: string;        // ID del usuario que aprobó
  approvedAt?: string;        // ISO 8601
  deprecatedAt?: string;      // ISO 8601
  content?: string;           // Contenido del documento (markdown)
}
```

---

## Estructura de Directorios

```
docs/knowledge/
├── sops/
│   ├── README.md          # Índice de SOPs disponibles
│   └── *.md               # Documentos SOP individuales
├── playbooks/
│   ├── README.md          # Índice de playbooks disponibles
│   └── *.md               # Playbooks individuales
├── prompts/
│   ├── README.md          # Índice de prompts disponibles
│   └── *.md               # Prompts aprobados individuales
├── policies/
│   ├── README.md          # Índice de políticas disponibles
│   └── *.md               # Políticas individuales
├── runbooks/
│   ├── README.md          # Índice de runbooks disponibles
│   └── *.md               # Runbooks individuales
└── templates/
    ├── README.md          # Índice de templates disponibles
    └── *.md               # Templates individuales
```

---

## Convenciones de Nomenclatura

Los archivos de documentos siguen la convención:

```
{PLATFORM}_{TYPE}_{SLUG}.md

Ejemplos:
  CRM_SOP_registro-cliente-moroso.md
  RH_PLAYBOOK_proceso-entrevista-tecnica.md
  CRM_PROMPT_priorizacion-morosos.md
  GLOBAL_POLICY_uso-de-ia.md
  ADMIN_RUNBOOK_caida-de-produccion.md
```

Para documentos globales (que aplican a todo el ecosistema): usar `GLOBAL_` como prefijo.

---

## Proceso de Creación y Aprobación

### 1. Crear borrador (draft)

```bash
# Crear el archivo con la metadata correcta
# docId: nuevo UUID
# status: "draft"
# version: "1.0.0" para documentos nuevos
```

### 2. Solicitar revisión (review)

- Cambiar `status` a `"review"`
- Asignar un revisor (stakeholder de la plataforma correspondiente)
- Actualizar `updatedAt`

### 3. Aprobar (approved)

- El revisor cambia `status` a `"approved"`
- Llenar `approvedBy` y `approvedAt`
- Actualizar `updatedAt`
- El documento queda disponible para agentes de IA

### 4. Deprecar cuando sea reemplazado

- Crear nueva versión como documento separado (status: draft → review → approved)
- Una vez aprobada la nueva versión, cambiar la anterior a `"deprecated"`
- Llenar `deprecatedAt`

---

## Versionamiento

Cada documento usa semver simplificado:

| Cambio | Versión |
|--------|---------|
| Correcciones menores, typos | `1.0.x` → `1.0.1` |
| Cambios de contenido no disruptivos | `1.x.0` → `1.1.0` |
| Reescritura completa o cambio de propósito | `x.0.0` → `2.0.0` |

Cuando se crea una versión `2.0.0`, la versión `1.x` debe ser deprecada.

---

## Integración con Agentes IA

### Cómo los agentes consumen el Knowledge Hub

1. El agente recibe una tarea que requiere conocimiento institucional
2. Busca documentos con `status: "approved"` y `type` relevante para la tarea
3. Los documentos de tipo `prompt` son especialmente importantes: contienen los prompts aprobados que el agente debe usar
4. El agente cita los `docId` de los documentos que utilizó en su `AuditEntry`

### Ejemplo: RH_AGENT usando un prompt aprobado

```typescript
// El agente busca el prompt aprobado para resúmenes de candidatos
const prompt = knowledgeHub.getApprovedDoc("RH_PROMPT_resumen-candidato");

// Usa el prompt aprobado
const summary = await agent.generate(prompt.content, candidateData);

// Registra en audit
const audit: AuditEntry = {
  // ...
  action: "trigger",
  resourceType: "knowledge_doc",
  resourceId: prompt.docId,
  metadata: { promptVersion: prompt.version }
};
```

---

## Objetivo: Knowledge Hub Completo (2026-2027)

| Tipo | Mínimo para producción | Meta 2027 |
|------|----------------------|-----------|
| SOPs | 10 | 30 |
| Playbooks | 5 | 15 |
| Prompts | 10 | 30 |
| Policies | 5 | 10 |
| Runbooks | 5 | 15 |
| Templates | 5 | 20 |
| **Total** | **40** | **120** |

---

*Versión 1.0.0 — 2026-06-12*
