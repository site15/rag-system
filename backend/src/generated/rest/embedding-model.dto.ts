import { ApiProperty } from '@nestjs/swagger';

export class EmbeddingModelDto {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  name!: string;
  @ApiProperty({
    type: 'string',
  })
  provider!: string;
  @ApiProperty({
    type: 'string',
  })
  model!: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  dimension!: number;
  @ApiProperty({
    type: 'boolean',
  })
  isActive!: boolean;
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
