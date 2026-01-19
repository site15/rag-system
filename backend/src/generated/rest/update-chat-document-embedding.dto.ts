import { Prisma } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateChatDocumentEmbeddingDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  graphContent?: string | null;
  @ApiProperty({
    type: () => Object,
    required: false,
    nullable: true,
  })
  @IsOptional()
  metadata?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  contentHash?: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  provider?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  model?: string | null;
}
