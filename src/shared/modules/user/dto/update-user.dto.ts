import { IsString, Length, Matches } from 'class-validator';
import { UserValidationMessage } from './user-validation.message.js';
import {
  UserNameLength,
  IS_JPG_OR_PNG,
} from './constant.js';

export class UpdateUserDto {

  @IsString({ message: UserValidationMessage.name.invalidFormat })
  @Length(UserNameLength.Min, UserNameLength.Max, { message: UserValidationMessage.name.lengthField })
  public name?: string;

  @IsString({ message: UserValidationMessage.avatar.invalidFormat })
  @Matches(IS_JPG_OR_PNG, {message: UserValidationMessage.avatar.invalidType})
  public avatar?: string;
}
