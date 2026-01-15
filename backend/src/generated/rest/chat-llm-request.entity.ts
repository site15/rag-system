import { Prisma } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { ChatDialog } from './chat-dialog.entity';
import { ChatMessage } from './chat-message.entity';
import { ChatLlmModel } from './chat-llm-model.entity';

export class ChatLlmRequest {
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
    type: 'string',
    format: 'Decimal.js',
    nullable: true,
  })
  temperature!: Prisma.Decimal | null;
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
    nullable: true,
  })
  dialogId!: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  historyId!: string | null;
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
    type: () => ChatDialog,
    required: false,
    nullable: true,
  })
  dialog?: ChatDialog | null;
  @ApiProperty({
    type: () => ChatMessage,
    required: false,
    nullable: true,
  })
  history?: ChatMessage | null;
  @ApiProperty({
    type: () => ChatLlmModel,
    isArray: true,
    required: false,
  })
  ChatLlmModel?: ChatLlmModel[];
}
