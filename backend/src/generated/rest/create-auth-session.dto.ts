import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class CreateAuthSessionDto {
  @ApiProperty({
    type: 'boolean',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean | null;
}
