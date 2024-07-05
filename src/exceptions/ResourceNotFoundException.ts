import { NotFoundException } from '@nestjs/common';
import { capitalize } from 'lodash';
import { singular } from 'pluralize';

export class ResourceNotFoundException extends NotFoundException {
  constructor(resourceName: string) {
    super(
      `${capitalize(singular(resourceName))} does not exist`,
      `${singular(resourceName).toUpperCase()}_NOT_FOUND_ERROR`,
    );
  }
}
