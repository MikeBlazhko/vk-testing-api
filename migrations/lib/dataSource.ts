import { join, resolve } from 'path';
import { DataSource } from 'typeorm';

import { CustomNamingStrategy } from '../../src/db/CustomNamingStrategy';
import { entities } from '../../src/types/entities';
import { getConfig } from './getConfig';

const config = getConfig();

export const dataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  database: config.db.name,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  namingStrategy: new CustomNamingStrategy(),
  logging: true,
  synchronize: false,
  entities,
  migrations: [join(resolve(__dirname, '..'), '*{.ts,.js}')],
});
