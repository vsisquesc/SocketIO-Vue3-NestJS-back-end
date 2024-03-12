import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string): Promise<any> {
    const users = (await this.usersService.findAll()).map((el) => el.email);
    const res = await this.usersService.login(email);
    if (!res) {
      throw new UnauthorizedException('Already loggedIn');
    }
    await this.emailService.send(email, users);
    const payload = { sub: email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
