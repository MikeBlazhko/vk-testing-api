import { BadRequestException } from '@nestjs/common';
import { capitalize } from 'lodash';
import { plural, singular } from 'pluralize';

export class ResourceIdNotProvidedException extends BadRequestException {
  constructor(resourceName: string) {
    super(
      `${capitalize(singular(resourceName))} id is not provided`,
      `${plural(resourceName).toUpperCase()}_ID_NOT_PROVIDED_ERROR`,
    );
  }
}
