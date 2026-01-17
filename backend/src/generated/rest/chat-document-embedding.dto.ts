import { Prisma } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ChatDocumentEmbeddingDto {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  content!: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  graphContent!: string | null;
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
    format: 'date-time',
  })
  createdAt!: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt!: Date;
}
