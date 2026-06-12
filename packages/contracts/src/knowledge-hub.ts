export type KnowledgeDocStatus = "draft" | "review" | "approved" | "deprecated";
export type KnowledgeDocType = "sop" | "playbook" | "prompt" | "policy" | "runbook" | "template" | "training";

export interface HdKnowledgeDoc {
  docId: string;
  title: string;
  type: KnowledgeDocType;
  status: KnowledgeDocStatus;
  platform: string;
  version: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  deprecatedAt?: string;
  content?: string;
}

export interface HdKnowledgeHubPolicy {
  version: string;
  agentAccessRule: string;
  lifecycle: KnowledgeDocStatus[];
  requiredForAgentConsumption: KnowledgeDocStatus;
}

export const hdKnowledgeHubPolicy: HdKnowledgeHubPolicy = {
  version: "1.0.0",
  agentAccessRule: "Agents may only consume knowledge with status 'approved'.",
  lifecycle: ["draft", "review", "approved", "deprecated"],
  requiredForAgentConsumption: "approved",
};
