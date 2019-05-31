import {
  Injectable,
  PipeTransform,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class GreaterThanZeroPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    if (+value > 0) {
      return +value;
    } else {
      throw new BadRequestException(
        'Validation failed (Number must be greater than or equal to one)',
      );
    }
  }
}
