import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async login(email, password) {
    try {
      const validUser = await this.userRepository.findOneBy({ email: email, password: password });
      if(validUser) throw new HttpException('User not valid', HttpStatus.FORBIDDEN);
      return {
        message: 'Welcome',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();
      return {
        users,
        message: 'Users retrieve successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  async findOne(userId: number) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      return {
        user,
        message: 'User retrieve successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // create() {
  //   this.userRepository.save({
  //     name: 'Leo',
  //     email: 'leo@email.com',
  //   });
  // }

  update(){

  }

  delete() {

  }
}
