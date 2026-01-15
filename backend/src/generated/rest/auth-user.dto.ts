import { Prisma } from '../prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  anonymousId!: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  supabaseUserId!: string | null;
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  supabaseUserData!: Prisma.JsonValue | null;
  @ApiProperty({
    type: 'boolean',
    nullable: true,
  })
  isActive!: boolean | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt!: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt!: Date;
}
