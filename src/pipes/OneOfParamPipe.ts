import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class OneOfParamPipe implements PipeTransform {
  constructor(private pipes: PipeTransform[]) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    let error;

    for (const pipe of this.pipes) {
      try {
        const result = await pipe.transform(value, metadata);

        return result;
      } catch (err) {
        error = err;
      }
    }

    if (error) {
      throw error;
    }

    return value;
  }
}
