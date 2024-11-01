import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {

  constructor(private readonly usersService: UsersService) {}

  // async getHello() {
  //   return this.usersService.findAll();
  // }
}
