import { Test, TestingModule } from '@nestjs/testing';
import { ElementsGateway } from './elements.gateway';
import { ElementsService } from './elements.service';

describe('ElementsGateway', () => {
  let gateway: ElementsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElementsGateway, ElementsService],
    }).compile();

    gateway = module.get<ElementsGateway>(ElementsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
