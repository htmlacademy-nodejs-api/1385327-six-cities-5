import { IsEmail, IsString } from 'class-validator';
import { CreateLoginUserValidationMessage } from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, { message: CreateLoginUserValidationMessage.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateLoginUserValidationMessage.password.invalidFormat })
  public password: string;
}
