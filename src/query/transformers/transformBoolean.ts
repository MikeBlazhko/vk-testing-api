import { TransformFnParams } from 'class-transformer';

import { isTrueString } from '../../util/isTrueString';

export function transformBoolean(params: TransformFnParams): any {
  return typeof params.value !== 'undefined' && isTrueString(params.value);
}
