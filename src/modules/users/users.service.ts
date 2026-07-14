import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcryptjs';
import { categories } from '../../constants/categories';
import { UsersRepository } from '../../shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {

    const { name, email, password } = createUserDto;

    const emailTaken = await this.usersRepository.findUnique({
      where: {
        email: email,
      }
    })

    if (emailTaken) {
      throw new ConflictException('Email already taken');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepository.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: categories
          }
        }
      }
    })
    return {
      name: user.name,
      email: user.email,
    }; 
  }

}
