import {
  ClassSerializerContextOptions,
  ClassSerializerInterceptor,
  PlainLiteralObject,
} from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';

export class ClassSerializerInterceptorFix extends ClassSerializerInterceptor {
  transformToPlain(
    plainOrClass: any,
    options: ClassSerializerContextOptions,
  ): PlainLiteralObject {
    if (!plainOrClass) {
      return plainOrClass;
    }
    if (!options.type) {
      return instanceToPlain(plainOrClass, options);
    }
    if (plainOrClass instanceof options.type) {
      return instanceToPlain(plainOrClass, options);
    }

    const instance = plainToInstance(options.type, plainOrClass, options);
    const plain = instanceToPlain(instance, options);

    return plain;
  }
}
