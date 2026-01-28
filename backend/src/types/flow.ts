///////////

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { FindManyArgs, FindManyResponseMeta } from '../services/prisma.service';

export class Constant {
  @ApiProperty({ type: 'string', required: true })
  @IsDefined()
  @IsString()
  key!: string;

  @ApiProperty({ type: 'string', required: true })
  @IsDefined()
  @IsString()
  constant!: string;
}

export class SendMessageFlowArgs {
  @ApiProperty({ type: 'string', required: true })
  @IsDefined()
  @IsString()
  message!: string;

  @ApiPropertyOptional({ type: 'string', required: false, nullable: true })
  @IsOptional()
  @IsString()
  dialogId?: string;

  @ApiPropertyOptional({ type: 'string', required: false, nullable: true })
  @IsOptional()
  provider?: string;

  @ApiPropertyOptional({ type: 'string', required: false, nullable: true })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({ type: 'number', required: false, nullable: true })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  temperature?: number;

  @ApiPropertyOptional({
    type: () => [Constant],
    required: false,
    nullable: true,
  })
  @IsOptional()
  @Type(() => Constant)
  constants?: Constant[];
}

///////////

export class DialogFlowArgs extends FindManyArgs {
  @ApiProperty({ type: 'string' })
  @IsDefined()
  dialogId!: string;

  @ApiPropertyOptional({
    type: 'boolean',
    nullable: true,
  })
  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' || value === 'false' ? value === 'true' : false,
  )
  showPrompts?: boolean | null;
}

export class DialogFlowResponseMeta extends FindManyResponseMeta {}

export class DialogMessagePrompt {
  @ApiProperty({
    type: 'string',
  })
  @IsDefined()
  prompt!: string;

  @ApiProperty({
    type: 'string',
  })
  @IsDefined()
  result!: string;

  @ApiProperty({ type: 'number' })
  @IsDefined()
  @Type(() => Number)
  duration!: number;

  @ApiProperty({ type: 'string' })
  @IsString()
  info!: string;
}

export class DialogMessage {
  @ApiProperty({
    type: 'string',
  })
  @IsDefined()
  id!: string;

  @ApiProperty({
    type: 'string',
  })
  @IsDefined()
  question!: string;

  @ApiProperty({
    type: 'string',
  })
  @IsDefined()
  answer!: string;

  @ApiProperty({
    type: 'boolean',
  })
  @IsDefined()
  isProcessing!: boolean;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  @IsDefined()
  questionReceivedAt!: Date | null;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  @IsDefined()
  answerSentAt!: Date | null;

  @ApiProperty({ type: 'string' })
  @IsString()
  dialogId!: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  info?: string;

  @ApiProperty({ type: () => [DialogMessagePrompt] })
  @IsDefined()
  prompts?: DialogMessagePrompt[];
}

export class DialogFlowResponse {
  @ApiProperty({ type: () => [DialogMessage] })
  @IsDefined()
  items!: DialogMessage[];

  @ApiProperty({ type: () => DialogFlowResponseMeta })
  @IsDefined()
  meta!: DialogFlowResponseMeta;
}

///////////

export class GetMessageTraceArgs {
  @ApiProperty({ type: 'string', required: true })
  @IsDefined()
  @IsString()
  messageId!: string;
}

export class GetMessageTraceResponse {
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  @IsDefined()
  messageId!: string | null;

  @ApiProperty({
    type: 'object',
    nullable: true,
    description: 'Trace data for the message',
    additionalProperties: true,
  })
  @IsDefined()
  trace!: any | null;
}

///////////

export class CancelMessageArgs {
  @ApiProperty({ type: 'string', required: true })
  @IsDefined()
  @IsString()
  messageId!: string;
}

///////////
