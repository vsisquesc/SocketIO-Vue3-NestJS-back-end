import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-element.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async login(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user != undefined) {
      throw new UnauthorizedException(
        `Existing user with email: ${createUserDto.email}`,
      );
    }

    const u = this.userRepository.create(createUserDto);
    return await this.userRepository.save(u);
  }

  async logout(email: string) {
    const status = await this.userRepository.delete(email);
    if (status.affected === 0) {
      throw new NotFoundException(`User with Email ${email} not found`);
    }
    return { message: 'User successfully deleted' };
  }
}
