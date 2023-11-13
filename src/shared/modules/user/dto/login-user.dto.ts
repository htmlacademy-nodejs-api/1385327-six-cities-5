import { IsEmail, IsString } from 'class-validator';
import { UserValidationMessage } from './user-validation.message.js';

export class LoginUserDto {
  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email: string;

  @IsString({ message: UserValidationMessage.password.invalidFormat })
  public password: string;
}
