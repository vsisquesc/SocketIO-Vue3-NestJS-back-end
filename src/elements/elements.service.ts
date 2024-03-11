import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { Element } from './entities/element.entity';

@Injectable()
export class ElementsService {
  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
  ) {}

  async create(createElementDto: CreateElementDto): Promise<Element> {
    const el = this.elementRepository.create(createElementDto);
    return await this.elementRepository.save(el);
  }

  async findAll(): Promise<Element[]> {
    return await this.elementRepository.find();
  }

  async update(
    id: number,
    updateElementDto: UpdateElementDto,
  ): Promise<Element> {
    const el = await this.elementRepository.findOne({ where: { id: id } });
    if (!el) {
      throw new NotFoundException(`Element with ID ${id} not found`);
    }
    Object.assign(el, updateElementDto);
    return await this.elementRepository.save(el);
  }

  async remove(id: number) {
    const status = await this.elementRepository.delete(id);
    if (status.affected === 0) {
      throw new NotFoundException(`Element with ID ${id} not found`);
    }
    return { message: 'Element successfully deleted' };
  }
}
