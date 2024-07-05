import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule as PinoLoggerModule, Params } from 'nestjs-pino';
import * as uuid from 'uuid';

import { AppConfig } from '../config/AppConfig';
import { reqSerializer } from './serializers/reqSerializer';
import { resSerializer } from './serializers/resSerializer';

export const AppLoggerModule = PinoLoggerModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService<AppConfig>): Params => ({
    pinoHttp: {
      level: configService.get('log.level', { infer: true }),
      serializers: {
        req: reqSerializer,
        res: resSerializer,
      },
      genReqId: () => uuid.v4(),
      transport: configService.get('log.pretty', { infer: true })
        ? {
            target: __dirname + '/PinoPretty',
          }
        : undefined,
    },
  }),
});
