import { Prisma } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsOptional } from 'class-validator';

export class UpdateChatMessageDocumentEmbeddingDto {
  @ApiProperty({
    type: 'string',
    format: 'Decimal.js',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDecimal()
  relevanceScore?: Prisma.Decimal | null;
}
