import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppConfigModule } from '../config/AppConfigModule';
import { DatabaseModule } from '../db/DatabaseModule';
import { AllExceptionsFilter } from '../filters/AllExceptionFilter';
import { AppLoggerModule } from '../logger/AppLoggerModule';
import { ItemsModule } from './items/ItemsModule';

@Module({
  imports: [
    AppConfigModule,
    AppLoggerModule,
    DatabaseModule,
    ThrottlerModule.forRoot({
      ttl: 2,
      limit: 1,
    }),
    ItemsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
