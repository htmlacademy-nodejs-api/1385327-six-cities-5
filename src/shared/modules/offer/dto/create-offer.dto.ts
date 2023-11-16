import { Length, IsString, IsDateString, IsEnum, ArrayMinSize, ArrayMaxSize, IsBoolean, Min, Max, IsInt, IsArray } from 'class-validator';
import { City, Feature, Housing } from '../../../types/index.js';
import { OfferValidationMessage } from './offer-validation.message.js';
import {
  TitleLength,
  DescriptionLength,
  IMAGES_COUNT,
  RoomCount,
  GuestCount,
  PriceValue,
  COORDS_LENGTH
} from './constant.js';

export class CreateOfferDto {
  @IsString({message: OfferValidationMessage.title.invalidFormat})
  @Length(TitleLength.Min, TitleLength.Max, { message: OfferValidationMessage.title.length })
  public title: string;

  @IsString({message: OfferValidationMessage.title.invalidFormat})
  @Length(DescriptionLength.Min, DescriptionLength.Max, { message: OfferValidationMessage.title.length })
  public description: string;

  @IsDateString({}, { message: OfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(City, { message: OfferValidationMessage.city.invalid })
  public city: City;

  @IsString({message: OfferValidationMessage.preview.invalidFormat})
  public preview: string;

  @IsArray({message: OfferValidationMessage.photos.invalidFormat})
  @ArrayMinSize(IMAGES_COUNT, {message: OfferValidationMessage.photos.invalidCount})
  @ArrayMaxSize(IMAGES_COUNT, {message: OfferValidationMessage.photos.invalidCount})
  @IsString({each: true, message: OfferValidationMessage.photos.invalidValue})
  public photos: string[];

  @IsBoolean({message: OfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  @IsEnum(Housing, { message: OfferValidationMessage.housingType.invalid })
  public housingType: Housing;

  @IsInt({ message: OfferValidationMessage.roomCount.invalidFormat })
  @Min(RoomCount.Min, {message: OfferValidationMessage.roomCount.minValue})
  @Max(RoomCount.Max, {message: OfferValidationMessage.roomCount.maxValue})
  public roomCount: number;

  @IsInt({ message: OfferValidationMessage.guestCount.invalidFormat })
  @Min(GuestCount.Min, {message: OfferValidationMessage.guestCount.minValue})
  @Max(GuestCount.Max, {message: OfferValidationMessage.guestCount.maxValue})
  public guestCount: number;

  @IsInt({ message: OfferValidationMessage.rentPrice.invalidFormat })
  @Min(PriceValue.Min, {message: OfferValidationMessage.rentPrice.minValue})
  @Max(PriceValue.Max, {message: OfferValidationMessage.rentPrice.maxValue})
  public rentPrice: number;

  @IsArray({message: OfferValidationMessage.features.invalidFormat})
  public features: Feature[];

  @IsArray({message: OfferValidationMessage.location.invalidFormat})
  @ArrayMaxSize(COORDS_LENGTH, {message: OfferValidationMessage.location.length})
  @ArrayMinSize(COORDS_LENGTH, {message: OfferValidationMessage.location.length})
  @IsString({each: true, message: OfferValidationMessage.location.invalidValue})
  public location: [string, string];

  public author: string;
}
