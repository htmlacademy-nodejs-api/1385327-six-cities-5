import { IsEmail, IsString, Length, IsBoolean, Matches } from 'class-validator';
import { UserValidationMessage } from './user-validation.message.js';
import {
  UserNameLength,
  IS_JPG_OR_PNG,
  PasswordLength
} from './constant.js';

export class CreateUserDto {
  @IsString({ message: UserValidationMessage.name.invalidFormat })
  @Length(UserNameLength.Min, UserNameLength.Max, { message: UserValidationMessage.name.lengthField })
  public name: string;

  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email: string;

  @IsString({ message: UserValidationMessage.avatar.invalidFormat })
  @Matches(IS_JPG_OR_PNG, {message: UserValidationMessage.avatar.invalidType})
  public avatar: string;

  @IsBoolean({message: UserValidationMessage.isProType.invalidFormat})
  public isProType: boolean;

  @IsString({ message: UserValidationMessage.password.invalidFormat })
  @Length(PasswordLength.Min, PasswordLength.Max, { message: UserValidationMessage.password.lengthField })
  public password: string;
}
