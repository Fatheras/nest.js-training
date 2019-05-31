import { PipeTransform, Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { DeleteResult } from 'typeorm';

@Injectable()
export class DeleteUserByIdPipe implements PipeTransform<number> {
  constructor(private readonly usersService: UserService) {}

  async transform(id: number): Promise<DeleteResult> {
    return await this.usersService.deleteUser(id);
  }
}
