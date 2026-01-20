import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateAuthApiKeyDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  apiKey?: string | null;
  @ApiProperty({
    type: 'boolean',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean | null;
}
