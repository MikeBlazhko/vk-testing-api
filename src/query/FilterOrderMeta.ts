import { FindOptionsOrder } from 'typeorm';

export interface FilterOrderMeta<TEntity extends object> {
  default: FindOptionsOrder<TEntity>;
  allowFields: string[];
  transform: (field: string, direction: 'asc' | 'desc') => Record<string, any>;
  propertyKey: string;
}
