import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { FilterTakeMeta } from '../FilterTakeMeta';
import {
  DEFAULT_QUERY_LIMIT,
  FILTER_TAKE_META,
  MAX_QUERY_LIMIT,
} from './consts';

export const FilterTake = (options?: { max?: number; default?: number }) => {
  return (target: unknown, propertyKey: string) => {
    const meta: FilterTakeMeta = {
      max: options?.max ?? MAX_QUERY_LIMIT,
      default: options?.default ?? DEFAULT_QUERY_LIMIT,
      propertyKey,
    };

    Reflect.defineMetadata(FILTER_TAKE_META, meta, target.constructor);

    ApiPropertyOptional({
      minimum: 0,
      maximum: meta.max,
      default: meta.default,
    })(target, propertyKey);
    IsOptional()(target, propertyKey);
    IsInt()(target, propertyKey);
    Min(0)(target, propertyKey);
    Max(meta.max)(target, propertyKey);
  };
};
