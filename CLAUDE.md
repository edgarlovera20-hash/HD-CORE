# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`HD-CORE` is the **shared foundation** of the Heavenly Dreams (HD) enterprise ecosystem. It owns
no business domain data; instead it publishes reusable packages and the cross-repo governance
contracts that every other HD app (`HD-ADMIN`, `HD-BRAIN`, `HD-CRM`, `HD-OPERATIONS`, `HD-RH`,
`HD-WEB`) depends on.

> Note: `README.md` lists an aspirational "stack objetivo" (Next.js, NestJS, Shadcn). The code
> actually shipping in the ecosystem is React + Vite + Express + Prisma. Trust the code, not the README stack list.

## Critical: sibling checkout requirement

Consumer apps depend on this repo's packages through relative paths, e.g.
`"@hd/core-rbac": "file:../HD-CORE/packages/rbac"`. **All HD repos must be cloned as siblings under
one parent directory** (`HD-CORE`, `HD-ADMIN`, ... side by side). CI enforces this by checking out
`HD-CORE` next to the app being built (see any app's `.github/workflows/ci.yml`). Renaming this
directory or nesting it elsewhere breaks every downstream `npm install`.

## Layout

- `packages/` — the shared libraries consumed via `@hd/core-*`. Each package is `type: module` and
  exports straight from TypeScript source (`main: src/index.ts`); there is no build step — consumers
  compile the source directly.
  - `contracts`, `crm-contracts` — shared type/contract definitions
  - `rbac` — `Permission` union + `hasPermission()` (supports `namespace.*` wildcards)
  - `types`, `validation` (Zod), `tokens` / `tailwind-preset` (design system), `ui`, `api-client`,
    `crm-domain`, `crm-workers`
- `contracts/*.v1.json` — **versioned governance contracts** that define the whole ecosystem.
  `ecosystem-boundaries.v1.json` is the source of truth for what each platform is `allowed` /
  `forbidden` to do. Others cover `ai-agents`, `audit`, `automation-policy`, `data-layer`,
  `design-system`, `knowledge-hub`, `n8n-workflows`, `platform`.
- `apps/` (`api`, `web`) — reference/bootstrap apps.

## Commands

```bash
npm run typecheck   # tsc --noEmit  — the real quality gate
npm run lint        # placeholder (echo TODO)
npm run test        # placeholder (echo TODO)
npm run build       # placeholder (echo TODO)
```

`lint`/`test`/`build` are not yet implemented here; `typecheck` is what CI relies on.

## Working rules (enterprise governance)

These rules come from `README.md` and the contracts, and they shape how the whole ecosystem must change:

- Auth, RBAC, UI, types, and validation are consumed **from HD-CORE** — do not fork them into apps.
- Do not mix responsibilities across domains; respect `ecosystem-boundaries.v1.json`.
- A change to a `packages/*` public API or a `contracts/*.json` file is a **breaking cross-repo
  change**. Review the impact on every consumer before merging, and bump the contract version
  (`*.v1.json` → `*.v2.json`) rather than silently mutating an existing version.
- Audit sensitive actions; never persist sensitive data client-side.
