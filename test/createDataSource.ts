import { DataSource } from 'typeorm';

import { AppConfig } from '../src/config/AppConfig';
import { CustomNamingStrategy } from '../src/db/CustomNamingStrategy';

export function createDataSource(config: AppConfig['db']) {
  const dataSource = new DataSource({
    type: 'postgres',
    host: config.host,
    database: config.name,
    port: config.port,
    username: config.user,
    password: config.password,
    namingStrategy: new CustomNamingStrategy(),
    entities: ['./src/types/**/**{.ts,.js}'],
    logging: true,
    synchronize: false,
    migrations: ['./migrations/*.ts'],
  });

  return dataSource;
}
