import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

import { FilterSkipMeta } from '../FilterSkipMeta';
import { FILTER_SKIP_META } from './consts';

export const FilterSkip = () => {
  return (target: unknown, propertyKey: string) => {
    const meta: FilterSkipMeta = {
      propertyKey,
    };

    Reflect.defineMetadata(FILTER_SKIP_META, meta, target.constructor);

    ApiPropertyOptional({
      default: 0,
      minimum: 0,
      type: 'int',
    })(target, propertyKey);
    IsInt()(target, propertyKey);
    Min(0)(target, propertyKey);
    IsOptional()(target, propertyKey);
  };
};
