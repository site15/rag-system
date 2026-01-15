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
}
