import ms from 'ms';

import { AppConfig } from './AppConfig';
import { Environment } from './Environment';

export function loadConfig(): AppConfig {
  const env = process.env as unknown as Environment;

  return {
    port: parseInt(env.PORT, 10),

    swagger: {
      mount: env.SWAGGER_MOUNT,
      apiUrls: [env.API_DOMAIN],
      description: '',
    },

    db: {
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      name: env.DB_NAME,
    },

    log: {
      level: env.LOG_LEVEL,
      pretty: env.LOG_PRETTY === '1',
      db: env.LOG_DB,
    },

    s3: {
      accessKey: env.STORAGE_S3_KEY,
      bucket: env.STORAGE_S3_BUCKET,
      endpoint: env.STORAGE_S3_ENDPOINT,
      maxAge: ms(env.STORAGE_S3_MAX_AGE as string),
      pathPrefix: env.STORAGE_S3_PATH_PREFIX,
      region: env.STORAGE_S3_REGION,
      secret: env.STORAGE_S3_SECRET,
    },

    cors: {
      origins: (env.CORS_ORIGINS || '').split(',').filter(Boolean),
    },

    app: {
      codeLength: parseInt(env.APP_CODE_LENGTH, 10),
      codeMaxTries: parseInt(env.APP_CODE_MAX_TRIES, 10),
      replaceResult: ['yes', 'true', '1'].includes(env.APP_REPLACE_RESULT),
    },

    dadata: {
      token: env.DADATA_TOKEN,
    },
  };
}
