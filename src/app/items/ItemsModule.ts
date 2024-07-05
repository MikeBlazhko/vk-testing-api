import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/types/item/Item';

import { ItemsController } from './ItemsController';
import { ItemsService } from './ItemsService';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [],
})
export class ItemsModule {}
