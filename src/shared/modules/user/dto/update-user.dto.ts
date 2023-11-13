import { IsString, Length, Matches } from 'class-validator';
import { UserValidationMessage } from './user-validation.message.js';
import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  IS_JPG_OR_PNG,
} from './constant.js';

export class UpdateUserDto {

  @IsString({ message: UserValidationMessage.name.invalidFormat })
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH, { message: UserValidationMessage.name.lengthField })
  public name?: string;

  @IsString({ message: UserValidationMessage.avatar.invalidFormat })
  @Matches(IS_JPG_OR_PNG, {message: UserValidationMessage.avatar.invalidType})
  public avatar?: string;
}
