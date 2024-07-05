import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/types/item/Item';
import { Repository } from 'typeorm';

import { BaseService } from '../../types/BaseService';

@Injectable()
export class ItemsService extends BaseService<Item> {
  constructor(
    @InjectRepository(Item)
    repository: Repository<Item>,
  ) {
    super(repository);
  }
}
