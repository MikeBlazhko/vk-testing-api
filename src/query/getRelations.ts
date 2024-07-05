import { Reflector } from '@nestjs/core';

import { parseRelations } from './parseRelations';

export function getRelations<TQuery extends object>(
  query: TQuery,
  initRelations: string[],
): string[] {
  const reflector = new Reflector();

  return parseRelations(reflector, query, initRelations);
}
