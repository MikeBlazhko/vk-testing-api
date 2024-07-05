import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ItemResponse {
  @ApiProperty()
  @Expose()
  label: string;

  @ApiProperty()
  @Expose()
  value: number;
}
