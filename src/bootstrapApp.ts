import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app/AppModule';
import { AppConfig } from './config/AppConfig';
import { ClassSerializerInterceptorFix } from './interceptors/ClassSerializerInterceptorFix';
import { configureSwagger } from './swagger/configureSwagger';

export async function bootstrapApp() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: false, //process.env.NODE_ENV === 'production',
  });

  const configService = app.get(ConfigService<AppConfig>);
  const logger = app.get(Logger);
  const port = configService.get('port');

  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptorFix(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );

  const origins = configService.get('cors.origins', { infer: true });

  if (!origins.includes('*')) {
    app.enableCors({
      origin: '*',
      optionsSuccessStatus: 200,
    });
  }

  app.use(helmet());

  configureSwagger(app, configService.get('swagger', { infer: true }));

  await app.listen(port);

  logger.log(`Server has been started at ${port}`, bootstrapApp.name);
}

bootstrapApp().catch((e) => {
  console.log(e);
  process.exit(1);
});
