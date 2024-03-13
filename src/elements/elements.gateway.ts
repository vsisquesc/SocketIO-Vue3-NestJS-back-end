import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ElementsService } from './elements.service';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from 'src/auth/auth.guard';
import { Req, UseGuards } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ElementsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly elementsService: ElementsService) {}
  @UseGuards(AuthGuard)
  @SubscribeMessage('createElement')
  async create(@MessageBody() createElementDto: CreateElementDto, @Req() req) {
    const user = req.user.sub;
    createElementDto.sender = user;
    const el = await this.elementsService.create(createElementDto);
    this.server.emit('newElement', el);
    return el;
  }
  @SubscribeMessage('findAllElements')
  findAll() {
    return this.elementsService.findAll();
  }
  @UseGuards(AuthGuard)
  @SubscribeMessage('updateElement')
  async update(@MessageBody() updateElementDto: UpdateElementDto) {
    const el = await this.elementsService.update(
      updateElementDto.id,
      updateElementDto,
    );
    this.server.emit('updatedElement', el);
    return el;
  }
  @UseGuards(AuthGuard)
  @SubscribeMessage('removeElement')
  async remove(@MessageBody() id: number) {
    const el = await this.elementsService.remove(id);
    this.server.emit('removedElement', id);
    return el;
  }
}
