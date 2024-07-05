import { FindOptionsOrder } from 'typeorm';

import { BaseModel } from '../types/BaseModel';

export function hasSortOrder<TEntity extends BaseModel>(
  order: FindOptionsOrder<TEntity>,
): boolean {
  return Object.keys(order).length > 0;
}
