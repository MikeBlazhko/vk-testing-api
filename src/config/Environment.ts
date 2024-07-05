export interface Environment {
  NODE_ENV: any;

  PORT: any;

  SWAGGER_MOUNT: any;

  API_DOMAIN: any;

  LOG_LEVEL: any;
  LOG_PRETTY: any;
  LOG_DB: any;

  DB_HOST: any;
  DB_PORT: any;
  DB_USER: any;
  DB_PASSWORD: any;
  DB_NAME: any;

  STORAGE_S3_BUCKET: any;
  STORAGE_S3_ENDPOINT: any;
  STORAGE_S3_KEY: any;
  STORAGE_S3_MAX_AGE: any;
  STORAGE_S3_PATH_PREFIX: any;
  STORAGE_S3_REGION: any;
  STORAGE_S3_SECRET: any;

  CORS_ORIGINS: any;

  APP_CODE_LENGTH: any;
  APP_CODE_MAX_TRIES: any;
  APP_REPLACE_RESULT: any;

  DADATA_TOKEN: any;
}
