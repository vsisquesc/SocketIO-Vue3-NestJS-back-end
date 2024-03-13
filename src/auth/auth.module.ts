import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { QUEUE_NAME, jwtConstants } from './constants';
import { UsersGateway } from 'src/users/users.gateway';
import { BullModule } from '@nestjs/bullmq';
import { AuthQueueProcessor } from './auth-queue.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAME,
    }),
    EmailModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, UsersGateway, AuthQueueProcessor],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
