import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string): Promise<any> {
    const res = await this.usersService.login(email);
    if (!res) {
      throw new UnauthorizedException('Already loggedIn');
    }
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload = { sub: email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
