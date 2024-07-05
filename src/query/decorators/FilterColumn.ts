import { Transform } from 'class-transformer';

import { isTrueString } from '../../util/isTrueString';
import { FilterColumnMeta } from '../FilterColumnMeta';
import { TransformFunc } from '../TransformFunc';
import { FILTER_COLUMN_META } from './consts';

export function FilterColumn(options?: {
  transform?: TransformFunc;
  default?: any;
  type?: string;
}): PropertyDecorator {
  return (target: unknown, propertyKey: string) => {
    const filterColumnMeta: FilterColumnMeta =
      Reflect.getMetadata(FILTER_COLUMN_META, target.constructor) || [];

    filterColumnMeta.push({
      propertyKey,
      transform: options?.transform,
      default: options?.default,
    });

    Reflect.defineMetadata(
      FILTER_COLUMN_META,
      filterColumnMeta,
      target.constructor,
    );

    if (options?.type === 'boolean') {
      Transform(
        (params) =>
          typeof params.value !== 'undefined' && isTrueString(params.value),
      )(target, propertyKey);
    }
  };
}
