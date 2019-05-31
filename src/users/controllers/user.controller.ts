import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ParseIntPipe,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../../db/models';
import { CreateUserDto, UpdateUserDto } from '../models/dto';
import { DeleteResult, UpdateResult, InsertResult } from 'typeorm';
import { DeleteUserByIdPipe, GetUserByIdPipe } from '../pipes';
import { GreaterThanZeroPipe } from '../../shared/pipes';
import * as _ from 'lodash';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UsePipes()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UsePipes(ParseIntPipe, GreaterThanZeroPipe)
  getUser(@Param('id', GetUserByIdPipe) user: User): User {
    if (user) {
      return user;
    }
    throw new NotFoundException('User is not found');
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    const insertResult: InsertResult = await this.userService.createUser(
      createUserDto,
    );
    if (_.get(insertResult, 'raw.affectedRows')) {
      return 'User was successfully created';
    }
    throw new InternalServerErrorException('User has not been created');
  }

  @Put()
  async putUser(@Body() updateUserDto: UpdateUserDto): Promise<string> {
    const updateResult: UpdateResult = await this.userService.updateUser(
      updateUserDto,
    );
    if (_.get(updateResult, 'raw.affectedRows')) {
      return 'User was successfully updated';
    }
    throw new InternalServerErrorException('User has not been created');
  }

  @Delete(':id')
  @UsePipes(ParseIntPipe, GreaterThanZeroPipe)
  deleteUser(
    @Param('id', DeleteUserByIdPipe) deleteResult: DeleteResult,
  ): string {
    if (deleteResult.affected) {
      return 'User was successfully deleted';
    }
    throw new NotFoundException('User is not found');
  }
}
