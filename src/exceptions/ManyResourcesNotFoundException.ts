import { NotFoundException } from '@nestjs/common';
import { capitalize } from 'lodash';
import { plural } from 'pluralize';

export class ManyResourcesNotFoundException extends NotFoundException {
  constructor(resourceName: string, resourceIds: number[]) {
    super(
      `${capitalize(plural(resourceName))} with ids ${resourceIds.join(
        ', ',
      )} do not exist`,
      `MANY_${plural(resourceName).toUpperCase()}_NOT_FOUND_ERROR`,
    );
  }
}
