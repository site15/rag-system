import { Prisma } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { ChatMessage } from './chat-message.entity';
import { ChatDocumentEmbedding } from './chat-document-embedding.entity';

export class ChatMessageDocumentEmbedding {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  chatHistoryId!: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  embeddingDocumentId!: string | null;
  @ApiProperty({
    type: 'boolean',
  })
  isFound!: boolean;
  @ApiProperty({
    type: 'string',
    format: 'Decimal.js',
    nullable: true,
  })
  relevanceScore!: Prisma.Decimal | null;
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
    type: () => ChatMessage,
    required: false,
    nullable: true,
  })
  chatHistory?: ChatMessage | null;
  @ApiProperty({
    type: () => ChatDocumentEmbedding,
    required: false,
    nullable: true,
  })
  embeddingDocument?: ChatDocumentEmbedding | null;
}
