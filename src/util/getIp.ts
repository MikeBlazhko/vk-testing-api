import { Request } from 'express';

export function getIp(req: Request): string {
  const xForwardedFor = Array.isArray(req.headers['x-forwarded-for'])
    ? req.headers['x-forwarded-for'][0]
    : req.headers['x-forwarded-for'];

  const remoteIp =
    xForwardedFor || (req.socket && req.socket.remoteAddress) || req.ip || '';

  return remoteIp;
}
