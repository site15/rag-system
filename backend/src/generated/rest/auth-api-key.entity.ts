import { ApiProperty } from '@nestjs/swagger';
import { AuthUser } from './auth-user.entity';

export class AuthApiKey {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  userId!: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  apiKey!: string | null;
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
  @ApiProperty({
    type: () => AuthUser,
    required: false,
  })
  AuthUser?: AuthUser;
}
