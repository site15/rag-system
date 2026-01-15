import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AuthUserSupabaseUserIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  supabaseUserId!: string;
}

@ApiExtraModels(AuthUserSupabaseUserIdUniqueInputDto)
export class ConnectAuthUserDto {
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
  supabaseUserId?: string;
  @ApiProperty({
    type: AuthUserSupabaseUserIdUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AuthUserSupabaseUserIdUniqueInputDto)
  supabaseUserId?: AuthUserSupabaseUserIdUniqueInputDto;
}
