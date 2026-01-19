import { ApiProperty } from '@nestjs/swagger';

export class ChatLlmModel {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  provider!: string;
  @ApiProperty({
    type: 'string',
  })
  model!: string;
  @ApiProperty({
    type: 'number',
    format: 'float',
    nullable: true,
  })
  temperature!: number | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  chunkSize!: number | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  startTime!: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  endTime!: Date | null;
  @ApiProperty({
    type: 'string',
  })
  status!: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  lastRequestId!: string | null;
  @ApiProperty({
    type: 'boolean',
    nullable: true,
  })
  isActive!: boolean | null;
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
