import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Req, UseGuards } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class UsersGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly usersService: UsersService) {}

  @SubscribeMessage('CurrentUsers')
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(AuthGuard)
  @SubscribeMessage('userLogout')
  async remove(@Req() req) {
    const email = req.user.sub;
    return this.usersService.logout(email).then((res) => {
      if (res) {
        this.server.emit('userDisconected', email);
      }
      return res;
    });
  }
}
