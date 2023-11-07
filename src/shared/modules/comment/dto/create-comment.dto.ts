import { IsString, Length, Min, Max, IsInt } from 'class-validator'; //IsMongoId,
import { CreateCommentValidationMessages } from './create-comment.messages.js';
import {
  MIN_TEXT_LENGTH,
  MAX_TEXT_LENGTH,
  MIN_RATE,
  MAX_RATE
} from './constant.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentValidationMessages.text.invalidFormat })
  @Length(MIN_TEXT_LENGTH, MAX_TEXT_LENGTH, {message: CreateCommentValidationMessages.text.lengthField})
  public text: string;

  @IsInt({message: CreateCommentValidationMessages.rating.invalidFormat})
  @Min(MIN_RATE,{message: CreateCommentValidationMessages.rating.minValue})
  @Max(MAX_RATE,{message: CreateCommentValidationMessages.rating.maxValue})
  public rating: number;

  // @IsMongoId({ message: CreateCommentValidationMessages.offerId.invalidFormat })
  public offerId: string;

  //@IsMongoId({ message: CreateCommentValidationMessages.userId.invalidFormat })
  public author: string;
}
