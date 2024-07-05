import { ForbiddenException } from '@nestjs/common';
import { CustomOrigin } from '@nestjs/common/interfaces/external/cors-options.interface';

export function createCorsMatcher(
  cors: string[],
  additional: RegExp[],
): CustomOrigin | boolean {
  const matchers = [...cors, ...additional];

  if (matchers.length === 0) {
    return false;
  }

  return function (origin, cb) {
    if (
      matchers.some((matcher) =>
        matcher instanceof RegExp
          ? matcher.test(origin)
          : `${origin}` === `${matcher}`,
      )
    ) {
      console.log('MATCHED', origin);
      cb(null, origin);
    } else {
      console.log('NOT MATCHED', origin);
      cb(new ForbiddenException('Not allowed by CORS'));
    }
  };
}
