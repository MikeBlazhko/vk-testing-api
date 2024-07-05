import { TransformFunc } from './TransformFunc';

export type FilterColumnMeta = {
  propertyKey: string;
  transform?: TransformFunc;
  default?: any;
}[];
