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

export class ChatLlmModelUqConfigUniqueInputDto {
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
    format: 'float',
  })
  @IsNotEmpty()
  @IsDecimal()
  temperature!: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  @IsNotEmpty()
  @IsInt()
  chunkSize!: number;
}

@ApiExtraModels(ChatLlmModelUqConfigUniqueInputDto)
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
  lastRequestId?: string;
  @ApiProperty({
    type: ChatLlmModelUqConfigUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ChatLlmModelUqConfigUniqueInputDto)
  uqConfig?: ChatLlmModelUqConfigUniqueInputDto;
}
