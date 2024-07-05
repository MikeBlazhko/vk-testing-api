export interface AppConfig {
  port: number;

  swagger: {
    mount: string;
    apiUrls: string[];
    description: string;
  };

  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };

  log: {
    level: string;
    pretty: boolean;
    db: boolean;
  };

  s3: {
    accessKey: string;
    bucket: string;
    endpoint: string;
    maxAge: number;
    pathPrefix: string;
    region: string;
    secret: string;
  };

  cors: {
    origins: string[];
  };

  app: {
    codeLength: number;
    codeMaxTries: number;
    replaceResult: boolean;
  };

  dadata: {
    token: string;
  };
}
