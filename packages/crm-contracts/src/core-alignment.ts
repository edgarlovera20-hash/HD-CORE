import { hdEvents, hdPermissions, hdPlatforms } from "@hd/core-contracts";

export const crmCoreAlignment = {
  platform: hdPlatforms.crm,
  events: {
    clientCreated: hdEvents.crmClientCreated,
    clientAssigned: hdEvents.crmClientAssigned,
    overdueDetected: hdEvents.crmAccountOverdueDetected,
    conversationStarted: hdEvents.crmConversationStarted,
    conversationEscalatedToHuman: hdEvents.crmConversationEscalatedToHuman,
    paymentCommitmentCreated: hdEvents.crmPaymentCommitmentCreated,
    paymentCommitmentMissed: hdEvents.crmPaymentCommitmentMissed
  },
  permissions: {
    clientsView: hdPermissions.crmClientsView,
    clientsCreate: hdPermissions.crmClientsCreate,
    clientsUpdate: hdPermissions.crmClientsUpdate,
    followupsCreate: hdPermissions.crmFollowupsCreate,
    conversationsReply: hdPermissions.crmConversationsReply,
    conversationsReview: hdPermissions.crmConversationsReview,
    reportsView: hdPermissions.crmReportsView
  }
} as const;
