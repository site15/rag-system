import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsOptional } from 'class-validator';

export class CreateChatMessageDocumentEmbeddingDto {
  @ApiProperty({
    type: 'string',
    format: 'float',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDecimal()
  relevanceScore?: number | null;
}
