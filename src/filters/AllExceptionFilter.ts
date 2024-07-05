import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { EntityPropertyNotFoundError } from 'typeorm';

import { entityPropertyNotFoundError } from './transformers/entityPropertyNotFoundError';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(originalError: Error, host: ArgumentsHost): void {
    let error = originalError;

    if (error instanceof EntityPropertyNotFoundError) {
      error = entityPropertyNotFoundError(error);
    }

    return super.catch(error, host);
  }
}
