import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { FindOptionsOrder } from 'typeorm';

import { FilterOrderMeta } from '../FilterOrderMeta';
import { FILTER_ORDER_META } from './consts';

export const FilterOrder = <TEntity extends object>(options?: {
  default?: FindOptionsOrder<TEntity>;
  allowFields?: string[];
  transform?: (field: string, direction: 'asc' | 'desc') => Record<string, any>;
}) => {
  return (target: unknown, propertyKey: string) => {
    const meta: FilterOrderMeta<object> = {
      default: options?.default || {},
      propertyKey,
      allowFields: options?.allowFields,
      transform: options?.transform,
    };

    Reflect.defineMetadata(FILTER_ORDER_META, meta, target.constructor);

    let fieldsEnum;

    if (options?.allowFields?.length) {
      fieldsEnum = [
        ...options.allowFields.map((item) => `-${item}`),
        ...options.allowFields.map((item) => `+${item}`),
      ];
    }

    ApiPropertyOptional({
      description: 'Сортировка',
      isArray: true,
      enum: fieldsEnum,
    })(target, propertyKey);
    IsOptional()(target, propertyKey);
    IsString({ each: true })(target, propertyKey);
    Matches(/^([+-])([A-z.]+)$/i, { each: true })(target, propertyKey);

    if (options?.allowFields?.length) {
      IsEnum(fieldsEnum)(target, propertyKey);
    }
  };
};
