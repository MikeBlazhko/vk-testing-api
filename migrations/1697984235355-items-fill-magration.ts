import { MigrationInterface, QueryRunner } from 'typeorm';

import cities from './data/cities.json';

export class ItemsFillMagration1697984235355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { items } = cities;
    for (let i = 0; i < items.length; i += 1) {
      await queryRunner.query(`insert into items(label) values($1)`, [
        items[i],
      ]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('delete from items');
  }
}
