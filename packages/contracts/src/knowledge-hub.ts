export type HdKnowledgeCategory =
  | "sop"
  | "playbook"
  | "prompt"
  | "policy"
  | "runbook"
  | "template";

export type HdKnowledgeStatus = "draft" | "review" | "approved" | "deprecated";

export type HdKnowledgeSensitivity = "public" | "internal" | "confidential";

export interface HdKnowledgeDocument {
  documentId: string;
  category: HdKnowledgeCategory;
  version: string;
  status: HdKnowledgeStatus;
  ownerPlatform: string;
  approvedBy?: string;
  updatedAt: string;
  aiUsageAllowed: boolean;
  sensitivity: HdKnowledgeSensitivity;
}

export function isAgentUsableKnowledge(doc: HdKnowledgeDocument): boolean {
  return doc.status === "approved" && doc.aiUsageAllowed === true;
}
