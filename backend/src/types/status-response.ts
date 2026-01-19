import { ApiProperty } from '@nestjs/swagger';

export class StatusResponse {
  @ApiProperty({ type: 'string' })
  message!: string;
}
