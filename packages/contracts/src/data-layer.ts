export type HdDataSourcePlatform =
  | "HD-WEB"
  | "HD-RH"
  | "HD-CRM"
  | "HD-OPERATIONS"
  | "HD-ADMIN"
  | "HD-BRAIN";

export type HdDataMechanism = "events" | "snapshots" | "approved-snapshots";

export interface HdKpiSnapshot<TMetrics = Record<string, number>> {
  snapshotId: string;
  schemaVersion: string;
  sourcePlatform: HdDataSourcePlatform;
  producedAt: string;
  correlationId: string;
  period?: string;
  metrics: TMetrics;
}

export type HdKpiFrequency =
  | "per_event"
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly";

export interface HdKpiDefinition {
  kpiId: string;
  name: string;
  description: string;
  sourcePlatform: HdDataSourcePlatform;
  mechanism: HdDataMechanism;
  frequency: HdKpiFrequency;
  requiresFinanceApproval?: boolean;
}
