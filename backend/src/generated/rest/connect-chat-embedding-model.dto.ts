import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ChatEmbeddingModelUqDimensionUniqueInputDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  @IsNotEmpty()
  @IsInt()
  dimension!: number;
}

@ApiExtraModels(ChatEmbeddingModelUqDimensionUniqueInputDto)
export class ConnectChatEmbeddingModelDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
  })
  @IsOptional()
  @IsInt()
  dimension?: number;
  @ApiProperty({
    type: ChatEmbeddingModelUqDimensionUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ChatEmbeddingModelUqDimensionUniqueInputDto)
  uqDimension?: ChatEmbeddingModelUqDimensionUniqueInputDto;
}
