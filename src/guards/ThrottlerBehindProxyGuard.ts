import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

import { getIp } from '../util/getIp';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): string {
    const throttlerIp = getIp(req as Request);

    console.log('throttlerIp', throttlerIp);

    return throttlerIp;
  }
}
