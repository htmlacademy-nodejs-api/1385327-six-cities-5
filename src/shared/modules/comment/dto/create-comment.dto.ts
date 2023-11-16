import { IsString, Length, Min, Max, IsInt } from 'class-validator';
import { CreateCommentValidationMessages } from './create-comment.messages.js';
import {
  TextLength,
  RatingValue
} from './constant.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentValidationMessages.text.invalidFormat })
  @Length(TextLength.Min, TextLength.Max, {message: CreateCommentValidationMessages.text.lengthField})
  public text: string;

  @IsInt({message: CreateCommentValidationMessages.rating.invalidFormat})
  @Min(RatingValue.Min,{message: CreateCommentValidationMessages.rating.minValue})
  @Max(RatingValue.Max,{message: CreateCommentValidationMessages.rating.maxValue})
  public rating: number;

  public offerId: string;

  public author: string;
}
