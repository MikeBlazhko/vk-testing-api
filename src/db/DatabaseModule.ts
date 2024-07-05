import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';

import { AppConfig } from '../config/AppConfig';
import { entities } from '../types/entities';
import { CustomNamingStrategy } from './CustomNamingStrategy';
import { TypeOrmPinoLogger } from './TypeormPinoLogger';

export const DatabaseModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService, PinoLogger],
  useFactory: (
    configService: ConfigService<AppConfig>,
    logger: PinoLogger,
  ) => ({
    type: 'postgres',
    host: configService.get('db.host', { infer: true }),
    port: configService.get('db.port', { infer: true }),
    username: configService.get('db.user', { infer: true }),
    password: configService.get('db.password', { infer: true }),
    database: configService.get('db.name', { infer: true }),
    synchronize: false,
    entities,
    namingStrategy: new CustomNamingStrategy(),
    logging: configService.get('log.db', { infer: true }),
    logger: new TypeOrmPinoLogger(
      logger,
      configService.get('log.db', { infer: true }),
    ),
  }),
});
