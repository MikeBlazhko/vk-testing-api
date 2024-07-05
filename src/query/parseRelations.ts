import { Reflector } from '@nestjs/core';
import { uniq } from 'lodash';

import { FILTER_RELATIONS_META } from './decorators/consts';
import { FilterRelationMeta } from './FilterRelationMeta';

export function parseRelations<TQuery extends object>(
  reflector: Reflector,
  query: TQuery,
  initRelations: string[],
): string[] {
  const meta: FilterRelationMeta = reflector.get(
    FILTER_RELATIONS_META,
    query.constructor,
  );

  let relations: string[];

  if (meta) {
    const relationPropertyValue = query[meta.propertyKey];

    relations = Array.isArray(relationPropertyValue)
      ? relationPropertyValue
      : typeof relationPropertyValue === 'string'
      ? [relationPropertyValue]
      : [];
  } else {
    relations = initRelations || [];
  }

  return uniq(relations).sort();
}
