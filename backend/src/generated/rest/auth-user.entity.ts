import { Prisma } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { AuthApiKey } from './auth-api-key.entity';
import { AuthSession } from './auth-session.entity';
import { ChatDialog } from './chat-dialog.entity';
import { ChatMessage } from './chat-message.entity';

export class AuthUser {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  anonymousId!: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  supabaseUserId!: string | null;
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  supabaseUserData!: Prisma.JsonValue | null;
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
    type: () => AuthApiKey,
    isArray: true,
    required: false,
  })
  AuthApiKey?: AuthApiKey[];
  @ApiProperty({
    type: () => AuthSession,
    isArray: true,
    required: false,
  })
  AuthSession?: AuthSession[];
  @ApiProperty({
    type: () => ChatDialog,
    isArray: true,
    required: false,
  })
  ChatDialog?: ChatDialog[];
  @ApiProperty({
    type: () => ChatMessage,
    isArray: true,
    required: false,
  })
  ChatMessage?: ChatMessage[];
}
