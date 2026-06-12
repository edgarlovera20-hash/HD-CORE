export type ClientStatus =
  | "new"
  | "active"
  | "follow_up"
  | "overdue"
  | "recovered"
  | "inactive";

export type ConsentStatus =
  | "unknown"
  | "granted"
  | "revoked"
  | "not_required";

export interface Client {
  id: string;
  fullName: string;
  phone?: string;
  email?: string;
  status: ClientStatus;
  consentStatus: ConsentStatus;
  assignedTo?: string;
  riskScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface FollowupTask {
  id: string;
  clientId: string;
  assignedTo: string;
  dueAt: string;
  status: "pending" | "completed" | "cancelled";
  notes?: string;
}

export interface PaymentCommitment {
  id: string;
  clientId: string;
  amount: number;
  dueAt: string;
  status: "open" | "met" | "missed" | "cancelled";
}
