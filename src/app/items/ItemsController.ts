import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Query,
  SerializeOptions,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getFindManyOptions } from 'src/query/getFindManyOptions';
import { Item } from 'src/types/item/Item';
import { Like } from 'typeorm';

import { ItemListQuery } from './dto/ItemListQuery';
import { ItemtListResponse } from './dto/ItemListResponse';
import { ItemsService } from './ItemsService';

@ApiTags('Элементы')
@Controller('')
export class ItemsController {
  private readonly logger = new Logger(ItemsController.name);

  @Inject()
  private readonly itemsService: ItemsService;

  @Get('/')
  @ApiOperation({ summary: 'Список элементов!' })
  @ApiResponse({ status: HttpStatus.OK, type: ItemtListResponse })
  @SerializeOptions({ type: ItemtListResponse })
  async getList(@Query() query: ItemListQuery): Promise<ItemtListResponse> {
    const findOptions = getFindManyOptions<Item, ItemListQuery>({
      query,
      initWhere: query.query && {
        label: Like(`%${query.query}%`),
      },
    });

    const items = await this.itemsService.findAndCount({
      ...findOptions,
    });

    return this.getItemResponseMapper(items);
  }

  private getItemResponseMapper: (data: {
    items: Item[];
    count: number;
  }) => ItemtListResponse = (data) => {
    return {
      ...data,
      items: data.items.map((item) => ({ label: item.label, value: item.id })),
    };
  };
}
