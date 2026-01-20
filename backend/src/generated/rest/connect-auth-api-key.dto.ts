import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AuthApiKeyUqApiKeyUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  apiKey!: string;
}

@ApiExtraModels(AuthApiKeyUqApiKeyUniqueInputDto)
export class ConnectAuthApiKeyDto {
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
  apiKey?: string;
  @ApiProperty({
    type: AuthApiKeyUqApiKeyUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AuthApiKeyUqApiKeyUniqueInputDto)
  uqApiKey?: AuthApiKeyUqApiKeyUniqueInputDto;
}
