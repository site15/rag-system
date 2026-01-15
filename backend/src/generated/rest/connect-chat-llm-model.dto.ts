import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '../prisma/client';

export class ChatLlmModelProviderModelTemperatureChunkSizeUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  provider!: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  model!: string;
  @ApiProperty({
    type: 'string',
    format: 'Decimal.js',
  })
  @IsNotEmpty()
  @IsDecimal()
  temperature!: Prisma.Decimal;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  @IsNotEmpty()
  @IsInt()
  chunkSize!: number;
}

@ApiExtraModels(ChatLlmModelProviderModelTemperatureChunkSizeUniqueInputDto)
export class ConnectChatLlmModelDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  requestId?: string;
  @ApiProperty({
    type: ChatLlmModelProviderModelTemperatureChunkSizeUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ChatLlmModelProviderModelTemperatureChunkSizeUniqueInputDto)
  provider_model_temperature_chunkSize?: ChatLlmModelProviderModelTemperatureChunkSizeUniqueInputDto;
}
