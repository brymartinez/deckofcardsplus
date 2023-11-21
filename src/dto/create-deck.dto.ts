import { IsOptional, IsBoolean } from 'class-validator';

export class CreateDeckDTO {
  @IsOptional()
  @IsBoolean()
  isShuffled: boolean = true;
}
