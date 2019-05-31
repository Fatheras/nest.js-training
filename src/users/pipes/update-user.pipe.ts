import {
  PipeTransform,
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../models/dto';
import { UpdateResult } from 'typeorm';
import { User } from 'src/db/models';
import { validate } from 'class-validator';

@Injectable()
export class UpdateUserPipe implements PipeTransform<User> {
  constructor(private readonly usersService: UserService) {}

  async transform(user: UpdateUserDto): Promise<UpdateResult> {
    try {
      return await this.usersService.updateUser(user);
    } catch (error) {
      throw new BadRequestException(
        'You must provide an identifier to update the user.',
      );
    }
  }
}
