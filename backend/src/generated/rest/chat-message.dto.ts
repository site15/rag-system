import { ApiProperty } from '@nestjs/swagger';

export class ChatMessageDto {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  question!: string;
  @ApiProperty({
    type: 'string',
  })
  answer!: string;
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
