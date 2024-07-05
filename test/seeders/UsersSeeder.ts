import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { User } from '../../src/types/user/User';

export default class UsersSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('Seed users');

    const usersFactory = factoryManager.get(User);

    await usersFactory.saveMany(50, {});
  }
}
