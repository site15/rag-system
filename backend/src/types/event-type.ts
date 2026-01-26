export type EventType = {
  messageId: string;
  dialogId: string;
  userId: string;
  provider?: string;
  model?: string;
  temperature?: number;
};
