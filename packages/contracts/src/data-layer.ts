export type HdKpiFrequency = "realtime" | "hourly" | "daily" | "weekly" | "monthly";
export type HdKpiSource = "HD-CRM" | "HD-RH" | "HD-OPERATIONS" | "HD-ADMIN" | "HD-BRAIN" | "HD-WEB";

export interface HdKpiDefinition {
  kpiId: string;
  name: string;
  description: string;
  sourcePlatform: HdKpiSource;
  mechanism: "event" | "snapshot" | "api";
  frequency: HdKpiFrequency;
  unit?: string;
}

export interface HdKpiSnapshot {
  snapshotId: string;
  kpiId: string;
  value: number | string;
  unit?: string;
  schemaVersion: string;
  sourcePlatform: HdKpiSource;
  producedAt: string;
  correlationId: string;
  metadata?: Record<string, unknown>;
}

export interface HdDataLayerPolicy {
  version: string;
  principle: string;
  forbiddenPatterns: string[];
  requiredFields: string[];
}

export const hdDataLayerPolicy: HdDataLayerPolicy = {
  version: "1.0.0",
  principle: "Each platform owns its transactional DB. Data layer consumes events, snapshots, or controlled APIs only.",
  forbiddenPatterns: [
    "direct_cross_platform_db_join",
    "shared_transactional_db",
    "direct_db_access_between_platforms",
    "mutation_from_brain_agent",
  ],
  requiredFields: ["snapshotId", "kpiId", "sourcePlatform", "producedAt", "correlationId"],
};
