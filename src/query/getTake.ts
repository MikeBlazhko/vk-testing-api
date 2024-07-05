import { Reflector } from '@nestjs/core';

import { parseTake } from './parseTake';

export function getTake<TQuery extends object>(query: TQuery): number {
  const reflector = new Reflector();

  return parseTake(reflector, query);
}
