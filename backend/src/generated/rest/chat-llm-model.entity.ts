import { Prisma } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { ChatLlmRequest } from './chat-llm-request.entity';

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
    type: 'string',
    format: 'Decimal.js',
    nullable: true,
  })
  temperature!: Prisma.Decimal | null;
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
  requestId!: string | null;
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
  @ApiProperty({
    type: () => ChatLlmRequest,
    required: false,
    nullable: true,
  })
  chatLlmRequest?: ChatLlmRequest | null;
}
