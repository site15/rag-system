export type EventType = {
  messageId: string;
  dialogId: string;
  userId: string;
  maxRetries: number;
  provider?: string;
  model?: string;
  temperature?: number;
  chunkSize?: number;
};
