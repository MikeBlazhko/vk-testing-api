import { BadRequestException, HttpException } from '@nestjs/common';
import { EntityPropertyNotFoundError } from 'typeorm';

export function entityPropertyNotFoundError(
  error: EntityPropertyNotFoundError,
): HttpException {
  const parts = /Property "(?<field>[A-z.0-9]+)" was not found/i.exec(
    error.message,
  );

  return new BadRequestException(`Поле ${parts?.groups?.field} не найдено`);
}
