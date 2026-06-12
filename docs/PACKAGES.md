# HD-CORE Packages

## Paquetes iniciales

text
hd/core-tokens
hd/core-types
hd/core-rbac
hd/core-validation
hd/core-api-client
hd/core-ui


## Regla

Ninguna plataforma debe duplicar tokens, roles, permisos, validadores ni componentes base fuera de HD-CORE.

## Contratos enterprise

```text
@hd/core-contractscd ~/heavenly-dreams-ecosystem/HD-CORE

mkdir -p packages/contracts/src

cat > packages/contracts/src/platforms.ts <<'EOF'
export const hdPlatforms = {
  web: {
    id: "hd-web",
    repository: "HD-WEB",
    domain: "heavenlydreams.com.mx"
  },
  rh: {
    id: "hd-rh",
    repository: "HD-RH",
    domain: "rh.heavenlydreams.com.mx"
  },
  operations: {
    id: "hd-operations",
    repository: "HD-OPERATIONS",
    domain: "app.heavenlydreams.com.mx"
  },
  admin: {
    id: "hd-admin",
    repository: "HD-ADMIN",
    domain: "admin.heavenlydreams.com.mx"
  },
  crm: {
    id: "hd-crm",
    repository: "HD-CRM",
    domain: "crm.heavenlydreams.com.mx"
  },
  core: {
    id: "hd-core",
    repository: "HD-CORE",
    domain: "core.heavenlydreams.com.mx"
  },
  brain: {
    id: "hd-brain",
    repository: "HD-BRAIN",
    domain: "brain.heavenlydreams.com.mx"
  }
} as const;

export type HdPlatformKey = keyof typeof hdPlatforms;
export type HdPlatformId = typeof hdPlatforms[HdPlatformKey]["id"];

## Contratos enterprise

```text
@hd/core-contracts
cd ~/heavenly-dreams-ecosystem/HD-CORE

mkdir -p packages/contracts/src

cat > packages/contracts/src/platforms.ts <<'EOF'
export const hdPlatforms = {
  web: {
    id: "hd-web",
    repository: "HD-WEB",
    domain: "heavenlydreams.com.mx"
  },
  rh: {
    id: "hd-rh",
    repository: "HD-RH",
    domain: "rh.heavenlydreams.com.mx"
  },
  operations: {
    id: "hd-operations",
    repository: "HD-OPERATIONS",
    domain: "app.heavenlydreams.com.mx"
  },
  admin: {
    id: "hd-admin",
    repository: "HD-ADMIN",
    domain: "admin.heavenlydreams.com.mx"
  },
  crm: {
    id: "hd-crm",
    repository: "HD-CRM",
    domain: "crm.heavenlydreams.com.mx"
  },
  core: {
    id: "hd-core",
    repository: "HD-CORE",
    domain: "core.heavenlydreams.com.mx"
  },
  brain: {
    id: "hd-brain",
    repository: "HD-BRAIN",
    domain: "brain.heavenlydreams.com.mx"
  }
} as const;

export type HdPlatformKey = keyof typeof hdPlatforms;
export type HdPlatformId = typeof hdPlatforms[HdPlatformKey]["id"];

## Contratos enterprise

```text
@hd/core-contractscd ~/heavenly-dreams-ecosystem/HD-CORE

mkdir -p packages/contracts/src

cat > packages/contracts/src/platforms.ts <<'EOF'
export const hdPlatforms = {
  web: {
    id: "hd-web",
    repository: "HD-WEB",
    domain: "heavenlydreams.com.mx"
  },
  rh: {
    id: "hd-rh",
    repository: "HD-RH",
    domain: "rh.heavenlydreams.com.mx"
  },
  operations: {
    id: "hd-operations",
    repository: "HD-OPERATIONS",
    domain: "app.heavenlydreams.com.mx"
  },
  admin: {
    id: "hd-admin",
    repository: "HD-ADMIN",
    domain: "admin.heavenlydreams.com.mx"
  },
  crm: {
    id: "hd-crm",
    repository: "HD-CRM",
    domain: "crm.heavenlydreams.com.mx"
  },
  core: {
    id: "hd-core",
    repository: "HD-CORE",
    domain: "core.heavenlydreams.com.mx"
  },
  brain: {
    id: "hd-brain",
    repository: "HD-BRAIN",
    domain: "brain.heavenlydreams.com.mx"
  }
} as const;

export type HdPlatformKey = keyof typeof hdPlatforms;
export type HdPlatformId = typeof hdPlatforms[HdPlatformKey]["id"];

## Contratos enterprise

```text
@hd/core-contracts
cat >> docs/PACKAGES.md <<'EOF'
cat >> docs/PACKAGES.md <<'EOF'
$



