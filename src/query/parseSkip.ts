import { Reflector } from '@nestjs/core';

import { FILTER_SKIP_META } from './decorators/consts';
import { FilterSkipMeta } from './FilterSkipMeta';

export function parseSkip<TQuery extends object>(
  reflector: Reflector,
  query: TQuery,
): number {
  const meta: FilterSkipMeta = reflector.get(
    FILTER_SKIP_META,
    query.constructor,
  );

  if (meta) {
    return query[meta.propertyKey] ?? 0;
  }

  return 0;
}
