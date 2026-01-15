import { ApiProperty } from '@nestjs/swagger';

export class ChatDialogDto {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  title!: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  summary!: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  consecutiveFailures!: number;
  @ApiProperty({
    type: 'boolean',
  })
  isFailed!: boolean;
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
