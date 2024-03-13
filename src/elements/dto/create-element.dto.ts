import { IsNotEmpty, IsString } from 'class-validator';

export class CreateElementDto {
  @IsNotEmpty({ message: 'content must be added' })
  @IsString()
  content: string;
  @IsNotEmpty({ message: 'sender must be specified' })
  @IsString()
  sender: string;
}
