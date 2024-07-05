import { applyDecorators } from '@nestjs/common';
import { IsInt, Min, ValidationOptions } from 'class-validator';

export const IsIdentity = (validationOptions?: ValidationOptions) =>
  applyDecorators(IsInt(validationOptions), Min(1, validationOptions));
