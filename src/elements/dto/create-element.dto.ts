// create-Menu.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateElementDto {
  @IsNotEmpty({ message: 'content must be added' })
  @IsString()
  content: string;
}
