import { Reflector } from '@nestjs/core';
import { FindOptionsOrder } from 'typeorm';

import { BaseModel } from '../types/BaseModel';
import { parseSortOrder } from './parseSortOrder';

export function getSortOrder<TEntity extends BaseModel, TQuery extends object>(
  query: TQuery,
): FindOptionsOrder<TEntity> {
  const reflector = new Reflector();

  return parseSortOrder(reflector, query);
}
