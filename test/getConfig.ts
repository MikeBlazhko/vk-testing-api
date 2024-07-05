import { merge } from 'lodash';
import * as dotenv from 'dotenv';

import { AppConfig } from '../src/config/AppConfig';
import { validationSchema } from '../src/config/validationSchema';
import { loadConfig } from '../src/config/loadConfig';

export function getConfig(): AppConfig {
  dotenv.config();

  const { error, value } = validationSchema.validate(process.env, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  process.env = merge(process.env, value);

  return loadConfig();
}
