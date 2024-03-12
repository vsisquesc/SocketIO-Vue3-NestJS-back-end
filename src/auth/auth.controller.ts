import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersGateway } from 'src/users/users.gateway';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersGateway: UsersGateway,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    const _this = this;
    return this.authService.signIn(signInDto.email).then(function (res) {
      _this.usersGateway.server.emit('newUser', signInDto.email);
      return res;
    });
  }
}
