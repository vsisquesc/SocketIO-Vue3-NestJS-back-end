import { Module } from '@nestjs/common';
import { ElementsService } from './elements.service';
import { ElementsGateway } from './elements.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from './entities/element.entity';
import { ElementsController } from './elements.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Element])],
  providers: [ElementsGateway, ElementsService],
  controllers: [ElementsController],
})
export class ElementsModule {}
