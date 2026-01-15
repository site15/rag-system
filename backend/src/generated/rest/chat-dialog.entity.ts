import { ApiProperty } from '@nestjs/swagger';
import { AuthUser } from './auth-user.entity';
import { ChatMessage } from './chat-message.entity';
import { ChatLlmRequest } from './chat-llm-request.entity';

export class ChatDialog {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  userId!: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  title!: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  summary!: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  consecutiveFailures!: number;
  @ApiProperty({
    type: 'boolean',
  })
  isFailed!: boolean;
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
    type: () => AuthUser,
    required: false,
  })
  AuthUser?: AuthUser;
  @ApiProperty({
    type: () => ChatMessage,
    isArray: true,
    required: false,
  })
  ChatMessage?: ChatMessage[];
  @ApiProperty({
    type: () => ChatLlmRequest,
    isArray: true,
    required: false,
  })
  ChatLlmRequest?: ChatLlmRequest[];
}
