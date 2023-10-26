import { IsEmail, IsString, Length, IsBoolean, Matches } from 'class-validator';
import { CreateUserValidationMessages } from './create-user.messages.js';

export class CreateUserDto {
  @IsString({ message: CreateUserValidationMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserValidationMessages.name.lengthField })
  public name: string;

  @IsEmail({}, { message: CreateUserValidationMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateUserValidationMessages.avatar.invalidFormat })
  @Matches(/.+\.(jpg|png)$/, {message: CreateUserValidationMessages.avatar.invalidType})
  public avatar: string;

  @IsBoolean({message: CreateUserValidationMessages.isProType.invalidFormat})
  public isProType: boolean;

  @IsString({ message: CreateUserValidationMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserValidationMessages.password.lengthField })
  public password: string;
}
