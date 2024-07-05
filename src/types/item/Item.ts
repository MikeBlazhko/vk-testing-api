import { Column, Entity } from 'typeorm';

import { BaseModel } from '../BaseModel';
@Entity('items')
export class Item extends BaseModel {
  @Column()
  label: string;
}
