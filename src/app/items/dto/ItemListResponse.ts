import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { ItemResponse } from './ItemResponse';

export class ItemtListResponse {
  @ApiProperty({ type: ItemResponse, isArray: true })
  @Expose()
  @Type(() => ItemResponse)
  items: ItemResponse[];

  @ApiProperty()
  @Expose()
  count: number;
}
