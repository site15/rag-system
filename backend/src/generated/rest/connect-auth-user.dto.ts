import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AuthUserUqSupabaseUserIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  supabaseUserId!: string;
}

@ApiExtraModels(AuthUserUqSupabaseUserIdUniqueInputDto)
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
    type: AuthUserUqSupabaseUserIdUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AuthUserUqSupabaseUserIdUniqueInputDto)
  uqSupabaseUserId?: AuthUserUqSupabaseUserIdUniqueInputDto;
}
