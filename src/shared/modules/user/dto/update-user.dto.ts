import { IsString, Length, Matches } from 'class-validator';
import { CreateUserValidationMessages } from './create-user.messages.js';
import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  IS_JPG_OR_PNG,
} from './constant.js';

export class UpdateUserDto {

  @IsString({ message: CreateUserValidationMessages.name.invalidFormat })
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH, { message: CreateUserValidationMessages.name.lengthField })
  public name?: string;

  @IsString({ message: CreateUserValidationMessages.avatar.invalidFormat })
  @Matches(IS_JPG_OR_PNG, {message: CreateUserValidationMessages.avatar.invalidType})
  public avatar?: string;
}
