import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../models/dto';
import { InsertResult } from 'typeorm';
import { User } from 'src/db/models';

@Injectable()
export class CreateUserPipe implements PipeTransform<User> {
  constructor(private readonly usersService: UserService) {}

  async transform(user: CreateUserDto): Promise<InsertResult> {
    try {
      return await this.usersService.createUser(user);
    } catch (error) {
      throw new BadRequestException(`Duplicate id ${user.id}`);
    }
  }
}
