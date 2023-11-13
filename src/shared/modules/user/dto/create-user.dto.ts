import { IsEmail, IsString, Length, IsBoolean, Matches } from 'class-validator';
import { UserValidationMessage } from './user-validation.message.js';
import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  IS_JPG_OR_PNG,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH
} from './constant.js';

export class CreateUserDto {
  @IsString({ message: UserValidationMessage.name.invalidFormat })
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH, { message: UserValidationMessage.name.lengthField })
  public name: string;

  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email: string;

  @IsString({ message: UserValidationMessage.avatar.invalidFormat })
  @Matches(IS_JPG_OR_PNG, {message: UserValidationMessage.avatar.invalidType})
  public avatar: string;

  @IsBoolean({message: UserValidationMessage.isProType.invalidFormat})
  public isProType: boolean;

  @IsString({ message: UserValidationMessage.password.invalidFormat })
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, { message: UserValidationMessage.password.lengthField })
  public password: string;
}
