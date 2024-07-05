import * as dotenv from 'dotenv';
import { merge } from 'lodash';

import { AppConfig } from '../../src/config/AppConfig';
import { loadConfig } from '../../src/config/loadConfig';
import { validationSchema } from '../../src/config/validationSchema';

let appConfig: AppConfig;

export function getConfig() {
  if (appConfig) {
    return appConfig;
  }

  dotenv.config();

  const { error, value } = validationSchema.validate(process.env, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  process.env = merge(process.env, value);

  appConfig = loadConfig();

  return appConfig;
}
