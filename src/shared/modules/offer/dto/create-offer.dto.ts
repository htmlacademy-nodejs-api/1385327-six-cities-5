import { Length, IsString, IsDateString, IsEnum, ArrayMinSize, ArrayMaxSize, IsBoolean, Min, Max, IsInt, IsArray } from 'class-validator';
import { City, Feature, Housing } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MIN_IMAGES_COUNT,
  MAX_IMAGES_COUNT,
  MIN_ROOM_COUNT,
  MAX_ROOM_COUNT,
  MIN_GUEST_COUNT,
  MAX_GUEST_COUNT,
  MIN_PRICE,
  MAX_PRICE,
  MIN_COORDS_LENGTH,
  MAX_COORDS_LENGTH
} from './constant.js';

export class CreateOfferDto {
  @IsString({message: CreateOfferValidationMessage.title.invalidFormat})
  @Length(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, { message: CreateOfferValidationMessage.title.length })
  public title: string;

  @IsString({message: CreateOfferValidationMessage.title.invalidFormat})
  @Length(MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH, { message: CreateOfferValidationMessage.title.length })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city: City;

  @IsString({message: CreateOfferValidationMessage.preview.invalidFormat})
  public preview: string;

  @IsArray({message: CreateOfferValidationMessage.photos.invalidFormat})
  @ArrayMinSize(MIN_IMAGES_COUNT, {message: CreateOfferValidationMessage.photos.invalidCount})
  @ArrayMaxSize(MAX_IMAGES_COUNT, {message: CreateOfferValidationMessage.photos.invalidCount})
  @IsString({each: true, message: CreateOfferValidationMessage.photos.invalidValue})
  public photos: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  //public isFavorite: boolean;
  //public rating: number;

  @IsEnum(Housing, { message: CreateOfferValidationMessage.housingType.invalid })
  public housingType: Housing;

  @IsInt({ message: CreateOfferValidationMessage.roomCount.invalidFormat })
  @Min(MIN_ROOM_COUNT, {message: CreateOfferValidationMessage.roomCount.minValue})
  @Max(MAX_ROOM_COUNT, {message: CreateOfferValidationMessage.roomCount.maxValue})
  public roomCount: number;

  @IsInt({ message: CreateOfferValidationMessage.guestCount.invalidFormat })
  @Min(MIN_GUEST_COUNT, {message: CreateOfferValidationMessage.guestCount.minValue})
  @Max(MAX_GUEST_COUNT, {message: CreateOfferValidationMessage.guestCount.maxValue})
  public guestCount: number;

  @IsInt({ message: CreateOfferValidationMessage.rentPrice.invalidFormat })
  @Min(MIN_PRICE, {message: CreateOfferValidationMessage.rentPrice.minValue})
  @Max(MAX_PRICE, {message: CreateOfferValidationMessage.rentPrice.maxValue})
  public rentPrice: number;

  @IsArray({message: CreateOfferValidationMessage.features.invalidFormat})
  public features: Feature[];

  //public commentsCount: number;

  @IsArray({message: CreateOfferValidationMessage.location.invalidFormat})
  @ArrayMaxSize(MIN_COORDS_LENGTH, {message: CreateOfferValidationMessage.location.length})
  @ArrayMinSize(MAX_COORDS_LENGTH, {message: CreateOfferValidationMessage.location.length})
  @IsString({each: true, message: CreateOfferValidationMessage.location.invalidValue})
  public location: [string, string];

  //@IsMongoId({ message: CreateOfferValidationMessage.author.invalidId })
  public author: string;
}
