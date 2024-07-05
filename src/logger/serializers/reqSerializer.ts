import { Request } from 'express';
import { omit } from 'lodash';

export function reqSerializer(req: Request): Record<string, any> {
  return omit(req, 'headers');
}
