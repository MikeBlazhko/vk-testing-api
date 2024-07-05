import { Reflector } from '@nestjs/core';

import { DEFAULT_QUERY_LIMIT, FILTER_TAKE_META } from './decorators/consts';
import { FilterTakeMeta } from './FilterTakeMeta';

export function parseTake<TQuery extends object>(
  reflector: Reflector,
  query: TQuery,
): number {
  const meta: FilterTakeMeta = reflector.get(
    FILTER_TAKE_META,
    query.constructor,
  );

  if (meta) {
    return query[meta.propertyKey] ?? meta.default;
  }

  return DEFAULT_QUERY_LIMIT;
}
