import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { FilterOrder } from '../../../query/decorators/FilterOrder';
import { FilterSkip } from '../../../query/decorators/FilterSkip';
import { FilterTake } from '../../../query/decorators/FilterTake';

export class ItemListQuery {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  query: string;

  @FilterTake()
  take: number;

  @FilterSkip()
  skip: number;

  @FilterOrder()
  order: string[];
}
