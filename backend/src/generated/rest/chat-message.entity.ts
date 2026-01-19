import { Prisma } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { AuthUser } from './auth-user.entity';
import { ChatDialog } from './chat-dialog.entity';
import { ChatMessageDocumentEmbedding } from './chat-message-document-embedding.entity';
import { ChatLlmRequest } from './chat-llm-request.entity';

export class ChatMessage {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  userId!: string;
  @ApiProperty({
    type: 'string',
  })
  question!: string;
  @ApiProperty({
    type: 'string',
  })
  answer!: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  dialogId!: string | null;
  @ApiProperty({
    type: 'boolean',
  })
  isFound!: boolean;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  category!: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  transformedQuestion!: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  transformedEmbeddingQuery!: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  provider!: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  model!: string | null;
  @ApiProperty({
    type: 'number',
    format: 'float',
    nullable: true,
  })
  temperature!: number | null;
  @ApiProperty({
    type: 'boolean',
  })
  isGoodResponse!: boolean;
  @ApiProperty({
    type: 'boolean',
  })
  isBadResponse!: boolean;
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  trace!: Prisma.JsonValue | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt!: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt!: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  deletedAt!: Date | null;
  @ApiProperty({
    type: () => AuthUser,
    required: false,
  })
  AuthUser?: AuthUser;
  @ApiProperty({
    type: () => ChatDialog,
    required: false,
    nullable: true,
  })
  dialog?: ChatDialog | null;
  @ApiProperty({
    type: () => ChatMessageDocumentEmbedding,
    isArray: true,
    required: false,
  })
  ChatMessageDocumentEmbedding?: ChatMessageDocumentEmbedding[];
  @ApiProperty({
    type: () => ChatLlmRequest,
    isArray: true,
    required: false,
  })
  ChatLlmRequest?: ChatLlmRequest[];
}
