import { Prisma } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ChatMessageDocumentEmbeddingDto {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
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
}
