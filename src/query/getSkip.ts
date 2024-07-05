import { Reflector } from '@nestjs/core';

import { parseSkip } from './parseSkip';

export function getSkip<TQuery extends object>(query: TQuery): number {
  const reflector = new Reflector();

  return parseSkip(reflector, query);
}
