import { ApiProperty } from '@nestjs/swagger';

export class ChatLlmRequestDto {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  request!: string;
  @ApiProperty({
    type: 'string',
  })
  response!: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  requestLength!: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  responseLength!: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  executionTimeMs!: number;
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
    type: 'boolean',
  })
  isSuccess!: boolean;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  errorMessage!: string | null;
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
