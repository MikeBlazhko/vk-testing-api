import { FindOptionsWhere } from 'typeorm';

import { BaseModel } from '../types/BaseModel';

export interface GetFindManyOptionsParams<
  TEntity extends BaseModel,
  TQuery extends object,
> {
  query: TQuery;
  initWhere?: FindOptionsWhere<TEntity>;
  initRelations?: string[];
}
