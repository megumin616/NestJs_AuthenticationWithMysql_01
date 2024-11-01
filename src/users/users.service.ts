import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {

  private readonly users: User[] = [
    {
      id: 1,
      name: 'Ton',
      username: 'toncom',
      password: '123123'
    },
    {
      id: 2,
      name: 'gumin',
      username: 'gumin',
      password: '123123'
    },
  ];


  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  // async findAll() {
  //   return this.users.find(user => user.username);
  // }


}
