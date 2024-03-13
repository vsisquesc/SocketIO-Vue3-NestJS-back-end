import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { InjectQueue } from '@nestjs/bullmq';
import { QUEUE_NAME, TASK_NAME } from './constants';
import { Queue } from 'bullmq';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private emailService: EmailService,
    private jwtService: JwtService,
    @InjectQueue(QUEUE_NAME) private taskQueue: Queue,
  ) {}
  async signIn(email: string): Promise<any> {
    const users = (await this.usersService.findAll()).map((el) => el.email);
    const res = await this.usersService.login(email);
    if (!res) {
      throw new UnauthorizedException('Already loggedIn');
    }

    if (users.length > 0) {
      await this.taskQueue.add(TASK_NAME, {
        newUser: email,
        sendTo: users,
      });
    }

    const payload = { sub: email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
