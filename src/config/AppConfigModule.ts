require('dotenv/config');

import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { loadConfig } from './loadConfig';
import { validationSchema } from './validationSchema';

export const AppConfigModule = NestConfigModule.forRoot({
  isGlobal: true,
  load: [loadConfig],
  validationSchema,
  ignoreEnvFile: true,
});
