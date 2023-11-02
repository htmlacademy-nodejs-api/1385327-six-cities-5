import { IsEmail, IsString, Length, IsBoolean } from 'class-validator'; //, Matches
import { CreateUserValidationMessages } from './create-user.messages.js';
import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  // IS_JPG_OR_PNG,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH
} from './constant.js';

export class CreateUserDto {
  @IsString({ message: CreateUserValidationMessages.name.invalidFormat })
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH, { message: CreateUserValidationMessages.name.lengthField })
  public name: string;

  @IsEmail({}, { message: CreateUserValidationMessages.email.invalidFormat })
  public email: string;

  // @IsString({ message: CreateUserValidationMessages.avatar.invalidFormat })
  // @Matches(IS_JPG_OR_PNG, {message: CreateUserValidationMessages.avatar.invalidType})
  // public avatar: string;

  @IsBoolean({message: CreateUserValidationMessages.isProType.invalidFormat})
  public isProType: boolean;

  @IsString({ message: CreateUserValidationMessages.password.invalidFormat })
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, { message: CreateUserValidationMessages.password.lengthField })
  public password: string;
}
