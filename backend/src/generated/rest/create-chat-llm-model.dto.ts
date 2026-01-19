import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateChatLlmModelDto {
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
    type: 'number',
    format: 'float',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  temperature?: number | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  chunkSize?: number | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    default: new Date().toISOString(),
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  startTime?: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  endTime?: Date | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  lastRequestId?: string | null;
  @ApiProperty({
    type: 'boolean',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean | null;
}
