import { AuthUserController } from './auth-user.controller';
import { AuthSessionController } from './auth-session.controller';
import { ChatDocumentEmbeddingController } from './chat-document-embedding.controller';
import { ChatDialogController } from './chat-dialog.controller';
import { ChatMessageController } from './chat-message.controller';
import { ChatMessageDocumentEmbeddingController } from './chat-message-document-embedding.controller';
import { ChatLlmRequestController } from './chat-llm-request.controller';
import { ChatLlmModelController } from './chat-llm-model.controller';
import { EmbeddingModelController } from './embedding-model.controller';

export const CONTROLLERS = [
  AuthUserController,
  AuthSessionController,
  ChatDocumentEmbeddingController,
  ChatDialogController,
  ChatMessageController,
  ChatMessageDocumentEmbeddingController,
  ChatLlmRequestController,
  ChatLlmModelController,
  EmbeddingModelController,
];
