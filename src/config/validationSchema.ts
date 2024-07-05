import * as Joi from 'joi';

import { Environment } from './Environment';

export const validationSchema = Joi.object<Environment, true>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),

  PORT: Joi.number().default(3000),
  SWAGGER_MOUNT: Joi.string().default(null),

  API_DOMAIN: Joi.string().default('/'),

  LOG_LEVEL: Joi.string().default('error'),
  LOG_PRETTY: Joi.number().default(0),
  LOG_DB: Joi.string().valid('all', '').default(''),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  STORAGE_S3_BUCKET: Joi.string().required(),
  STORAGE_S3_ENDPOINT: Joi.string().required(),
  STORAGE_S3_KEY: Joi.string().required(),
  STORAGE_S3_MAX_AGE: Joi.string().default('1d'),
  STORAGE_S3_PATH_PREFIX: Joi.string().default(''),
  STORAGE_S3_REGION: Joi.string().default(''),
  STORAGE_S3_SECRET: Joi.string().required(),

  CORS_ORIGINS: Joi.string(),

  APP_CODE_LENGTH: Joi.number().default(5),
  APP_CODE_MAX_TRIES: Joi.number().default(5),
  APP_REPLACE_RESULT: Joi.string().default('yes'),

  DADATA_TOKEN: Joi.string().required(),
});
