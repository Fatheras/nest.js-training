import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../../db/models';

@Injectable()
export class GetUserByIdPipe implements PipeTransform<number> {
  constructor(private readonly usersService: UserService) {}

  async transform(id: number): Promise<User> {
    return await this.usersService.getUserById(id);
  }
}
