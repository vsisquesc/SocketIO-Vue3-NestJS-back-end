import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersGateway } from './users.gateway';

@Module({
  providers: [UsersService, UsersGateway],
  exports: [UsersService],
})
export class UsersModule {}
