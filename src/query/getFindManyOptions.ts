import { Reflector } from '@nestjs/core';
import { merge } from 'lodash';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import { BaseModel } from '../types/BaseModel';
import { FILTER_COLUMN_META } from './decorators/consts';
import { FilterColumnMeta } from './FilterColumnMeta';
import { GetFindManyOptionsParams } from './GetFindManyOptionsParams';
import { parseRelations } from './parseRelations';
import { parseSkip } from './parseSkip';
import { parseSortOrder } from './parseSortOrder';
import { parseTake } from './parseTake';

function getWhere<TEntity extends BaseModel, TQuery extends object>(
  reflector: Reflector,
  params: GetFindManyOptionsParams<TEntity, TQuery>,
): FindOptionsWhere<TEntity> {
  const meta: FilterColumnMeta = reflector.get(
    FILTER_COLUMN_META,
    params.query.constructor,
  );

  let where: FindOptionsWhere<TEntity> = {};

  if (meta) {
    where = meta
      .map((field) => [
        typeof field.default !== 'undefined'
          ? typeof params.query[field.propertyKey] === 'undefined'
            ? field.default
            : params.query[field.propertyKey]
          : params.query[field.propertyKey],
        field.propertyKey,
        field,
      ])
      .filter(([value]) => typeof value !== 'undefined')
      .reduce(
        (acc, [value, key, field]) =>
          merge(
            acc,
            field.transform
              ? field.transform(value)
              : { [key]: value },
          ),
        {},
      );
  }

  if (params.initWhere) {
    where = merge(where, params.initWhere);
  }

  return where;
}

export function getFindManyOptions<
  TEntity extends BaseModel,
  TQuery extends object,
>(params: GetFindManyOptionsParams<TEntity, TQuery>): FindManyOptions<TEntity> {
  const reflector = new Reflector();

  const options: FindManyOptions<TEntity> = {
    relations: parseRelations(reflector, params.query, params.initRelations),
    take: parseTake(reflector, params.query),
    skip: parseSkip(reflector, params.query),
    order: parseSortOrder(reflector, params.query),
    where: getWhere(reflector, params),
  };

  console.log('getFindManyOptions', JSON.stringify(options, null, 2));

  return options;
}
