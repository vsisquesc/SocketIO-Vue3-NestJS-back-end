import { PartialType } from '@nestjs/mapped-types';
import { CreateElementDto } from './create-element.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateElementDto extends PartialType(CreateElementDto) {
  @IsNotEmpty({ message: 'Must Provide Id' })
  @IsNumber()
  id: number;
}
