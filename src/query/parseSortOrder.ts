import { Reflector } from '@nestjs/core';
import { FindOptionsOrder } from 'typeorm';

import { BaseModel } from '../types/BaseModel';
import { FILTER_ORDER_META } from './decorators/consts';
import { FilterOrderMeta } from './FilterOrderMeta';

const sortRegexp = /^([+-])?([A-z.]+)$/i;
const sortDirections = {
  '+': 'asc',
  '-': 'desc',
};

export function parseSortOrder<
  TEntity extends BaseModel,
  TQuery extends object,
>(reflector: Reflector, query: TQuery): FindOptionsOrder<TEntity> {
  const meta: FilterOrderMeta<TEntity> = reflector.get(
    FILTER_ORDER_META,
    query.constructor,
  );

  if (meta) {
    const orderPropertyValue = query[meta.propertyKey] ?? 0;

    const value = (
      Array.isArray(orderPropertyValue)
        ? orderPropertyValue
        : typeof orderPropertyValue === 'string'
        ? [orderPropertyValue]
        : []
    ).filter(Boolean);

    if (value.length === 0) {
      value.push(meta.default);
    }

    return value
      .map((item) => sortRegexp.exec(item))
      .filter(Boolean)
      .map(([, direction, field]) => {
        if (meta.allowFields?.length && !meta.allowFields.includes(field)) {
          return {};
        }

        if (meta.transform) {
          const res = meta.transform(field, sortDirections[direction || '+']);

          if (res) {
            return res;
          }
        }

        return field.split('.').reduce((acc, part, idx, parts) => {
          acc[part] =
            idx + 1 === parts.length ? sortDirections[direction || '+'] : {};
          return acc;
        }, {});
      })
      .reduce((acc, item) => ({ ...acc, ...item }), {});
  }

  return {};
}
