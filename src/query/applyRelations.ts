import { uniq } from 'lodash';
import {
  FindOptionsRelationByString,
  FindOptionsRelations,
  SelectQueryBuilder,
} from 'typeorm';

export function applyRelations<Entity>(
  queryBuilder: SelectQueryBuilder<Entity>,
  relations: FindOptionsRelations<Entity> | FindOptionsRelationByString,
) {
  if (Array.isArray(relations)) {
    const rules = uniq(relations)
      .sort()
      .map((relation) => `${queryBuilder.alias}.${relation}`.split('.'))
      .map((parts) => {
        const prop = parts.pop();
        const prevAlias = parts.join('_');

        return {
          field: `${prevAlias}.${prop}`,
          alias: [...parts, prop].join('_'),
        };
      });

    rules.forEach((item) =>
      queryBuilder.leftJoinAndSelect(item.field, item.alias),
    );
  }
}
