import { Request } from 'express';
import { omit } from 'lodash';

export function resSerializer(req: Request): Record<string, any> {
  return omit(req, 'headers');
}
