export interface FollowupJobPayload {
  clientId: string;
  followupTaskId: string;
  dueAt: string;
}

export function shouldEscalateFollowup(attempts: number, hasResponse: boolean): boolean {
  return attempts >= 3 && !hasResponse;
}
