import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { FilterRelationMeta } from '../FilterRelationMeta';
import { FILTER_RELATIONS_META } from './consts';

export function FilterRelation(options?: {
  default?: string[];
  initial?: string[];
  fields?: string[];
}): PropertyDecorator {
  return (target: unknown, propertyKey: string) => {
    const meta: FilterRelationMeta = {
      default: options?.default ?? [],
      initial: options?.initial ?? [],
      fields: options?.fields ?? [],
      propertyKey,
    };

    Reflect.defineMetadata(FILTER_RELATIONS_META, meta, target.constructor);

    ApiPropertyOptional({ description: '', isArray: true })(
      target,
      propertyKey,
    );
    Transform(({ value }) =>
      typeof value !== 'undefined'
        ? Array.isArray(value)
          ? value
          : [value]
        : undefined,
    )(target, propertyKey);
    IsOptional()(target, propertyKey);
    IsArray()(target, propertyKey);
    IsString({ each: true })(target, propertyKey);
  };
}
