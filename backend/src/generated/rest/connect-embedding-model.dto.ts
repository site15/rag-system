import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class EmbeddingModelDimensionUniqueInputDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  @IsNotEmpty()
  @IsInt()
  dimension!: number;
}

@ApiExtraModels(EmbeddingModelDimensionUniqueInputDto)
export class ConnectEmbeddingModelDto {
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
    type: EmbeddingModelDimensionUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => EmbeddingModelDimensionUniqueInputDto)
  dimension?: EmbeddingModelDimensionUniqueInputDto;
}
