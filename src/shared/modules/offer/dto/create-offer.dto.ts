import { Length, IsString, IsDateString, IsEnum, ArrayMinSize, ArrayMaxSize, IsBoolean, Min, Max, IsInt, IsArray } from 'class-validator';
import { City, Feature, Housing } from '../../../types/index.js';
import { OfferValidationMessage } from './offer-validation.message.js';
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
  @IsString({message: OfferValidationMessage.title.invalidFormat})
  @Length(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, { message: OfferValidationMessage.title.length })
  public title: string;

  @IsString({message: OfferValidationMessage.title.invalidFormat})
  @Length(MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH, { message: OfferValidationMessage.title.length })
  public description: string;

  @IsDateString({}, { message: OfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(City, { message: OfferValidationMessage.city.invalid })
  public city: City;

  @IsString({message: OfferValidationMessage.preview.invalidFormat})
  public preview: string;

  @IsArray({message: OfferValidationMessage.photos.invalidFormat})
  @ArrayMinSize(MIN_IMAGES_COUNT, {message: OfferValidationMessage.photos.invalidCount})
  @ArrayMaxSize(MAX_IMAGES_COUNT, {message: OfferValidationMessage.photos.invalidCount})
  @IsString({each: true, message: OfferValidationMessage.photos.invalidValue})
  public photos: string[];

  @IsBoolean({message: OfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  @IsEnum(Housing, { message: OfferValidationMessage.housingType.invalid })
  public housingType: Housing;

  @IsInt({ message: OfferValidationMessage.roomCount.invalidFormat })
  @Min(MIN_ROOM_COUNT, {message: OfferValidationMessage.roomCount.minValue})
  @Max(MAX_ROOM_COUNT, {message: OfferValidationMessage.roomCount.maxValue})
  public roomCount: number;

  @IsInt({ message: OfferValidationMessage.guestCount.invalidFormat })
  @Min(MIN_GUEST_COUNT, {message: OfferValidationMessage.guestCount.minValue})
  @Max(MAX_GUEST_COUNT, {message: OfferValidationMessage.guestCount.maxValue})
  public guestCount: number;

  @IsInt({ message: OfferValidationMessage.rentPrice.invalidFormat })
  @Min(MIN_PRICE, {message: OfferValidationMessage.rentPrice.minValue})
  @Max(MAX_PRICE, {message: OfferValidationMessage.rentPrice.maxValue})
  public rentPrice: number;

  @IsArray({message: OfferValidationMessage.features.invalidFormat})
  public features: Feature[];

  @IsArray({message: OfferValidationMessage.location.invalidFormat})
  @ArrayMaxSize(MIN_COORDS_LENGTH, {message: OfferValidationMessage.location.length})
  @ArrayMinSize(MAX_COORDS_LENGTH, {message: OfferValidationMessage.location.length})
  @IsString({each: true, message: OfferValidationMessage.location.invalidValue})
  public location: [string, string];

  public author: string;
}
