import PinoPretty, { PrettyOptions } from 'pino-pretty';

import { sqlPrettifier } from './prettifiers/sqlPrettifier';

export default (options: PrettyOptions) =>
  PinoPretty({
    ...options,
    customPrettifiers: {
      sql: sqlPrettifier,
    },
  });
