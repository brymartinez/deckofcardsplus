import { IsOptional, IsBoolean, IsArray, Validate } from 'class-validator';
import { CardValidator } from 'src/validator/card-validator';

export class CreateDeckDTO {
  @IsOptional()
  @IsBoolean()
  isShuffled?: boolean = true;
  @IsOptional()
  @IsArray()
  @Validate(CardValidator, {
    each: true,
    message: "cards must be a valid card format. e.g. 'AS' for ACE of SPADES",
  })
  cards?: string[];
}
