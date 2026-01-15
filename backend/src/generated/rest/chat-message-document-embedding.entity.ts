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
  })
  chatHistoryId!: string;
  @ApiProperty({
    type: 'string',
  })
  embeddingDocumentId!: string;
  @ApiProperty({
    type: 'boolean',
  })
  isFound!: boolean;
  @ApiProperty({
    type: 'number',
    format: 'float',
    nullable: true,
  })
  relevanceScore!: number | null;
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
  })
  chatHistory?: ChatMessage;
  @ApiProperty({
    type: () => ChatDocumentEmbedding,
    required: false,
  })
  embeddingDocument?: ChatDocumentEmbedding;
}
