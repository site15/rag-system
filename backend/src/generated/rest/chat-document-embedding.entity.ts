import { Prisma } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { EmbeddingModel } from './embedding-model.entity';
import { ChatMessageDocumentEmbedding } from './chat-message-document-embedding.entity';

export class ChatDocumentEmbedding {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  content!: string;
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  metadata!: Prisma.JsonValue | null;
  @ApiProperty({
    type: 'string',
  })
  contentHash!: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  embeddingModelId!: string | null;
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
    type: () => EmbeddingModel,
    required: false,
    nullable: true,
  })
  embeddingModel?: EmbeddingModel | null;
  @ApiProperty({
    type: () => ChatMessageDocumentEmbedding,
    isArray: true,
    required: false,
  })
  ChatMessageDocumentEmbedding?: ChatMessageDocumentEmbedding[];
}
