import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseService<Entity> {
  constructor(protected readonly repository: Repository<Entity>) {}

  protected getEntityName(): string {
    return this.repository.metadata.tableName;
  }

  protected getExceptionCode(name: string): string {
    return `${this.getEntityName()}_${name}`.toUpperCase();
  }

  async findOne(
    where: FindOptionsWhere<Entity>,
    relations?: string[],
  ): Promise<Entity> {
    const item = await this.repository.findOne({
      where,
      relations,
    });

    return item;
  }

  async findOneStrict(
    where: FindOptionsWhere<Entity>,
    relations?: string[],
  ): Promise<Entity> {
    const item = await this.repository.findOne({
      where,
      relations,
    });

    if (!item) {
      throw this.NotFound();
    }

    return item;
  }

  NotFound() {
    return new NotFoundException(this.getExceptionCode('NOT_FOUND'));
  }

  async findAndCount(
    options: FindManyOptions<Entity>,
  ): Promise<{ items: Entity[]; count: number }> {
    const [items, count] = await this.repository.findAndCount(options);

    return {
      items,
      count,
    };
  }

  async count(options: FindManyOptions<Entity>): Promise<number> {
    return this.repository.count(options);
  }

  async find(options: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(options);
  }

  async findManyByIdsStrict(ids: number[]): Promise<Entity[]> {
    if (ids.length === 0) {
      return [];
    }

    const results = await this.repository.find({
      where: { id: In(ids) } as any,
    });

    if (ids.length !== results.length) {
      throw new NotFoundException(this.getExceptionCode('NOT_FOUND'));
    }

    return results;
  }

  async create(data: DeepPartial<Entity>): Promise<Entity> {
    const item = this.repository.merge(this.repository.create(), data);

    return this.repository.save(item);
  }

  async update(entityId: number, data: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save({
      ...data,
      id: entityId,
    });
  }

  async updateMany(
    query: FindOptionsWhere<Entity>,
    data: QueryDeepPartialEntity<Entity>,
  ): Promise<void> {
    await this.repository.update(query, data);
  }

  async delete(entity: Entity): Promise<void> {
    await this.repository.remove(entity);
  }
}
