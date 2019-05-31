import { Injectable } from '@nestjs/common';
import { User } from '../../db/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, InsertResult } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../models/dto';
import { throwError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
    // const users: Promise<User[]> = this.userRepository.find();
    // return {users, kek: 'kek'};
  }

  getUserById(id: number): Promise<User> {
    if (!Number.isInteger(id) && id < 1) {
      return;
    }
    return this.userRepository.findOne(id);
  }

  createUser(user: CreateUserDto): Promise<InsertResult> {
    if (!(user instanceof CreateUserDto)) {
      return;
    }
    return this.userRepository.insert(user);
  }

  updateUser(user: UpdateUserDto): Promise<UpdateResult> {
    if (!user || !user.id) {
      return;
    }
    return this.userRepository.update(user.id, user);
  }

  deleteUser(id: number): Promise<DeleteResult> {
    if (!Number.isInteger(id) && id < 1) {
      return;
    }
    return this.userRepository.delete(id);
    // return deletedUser
    //   ? 'User was successfully removed'
    //   : 'Something went wrong';
  }
}
