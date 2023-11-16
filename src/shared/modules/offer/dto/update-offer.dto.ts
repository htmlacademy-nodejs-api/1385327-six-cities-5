import { IsOptional, Length, IsString, IsDateString, IsEnum, ArrayMinSize, ArrayMaxSize, IsBoolean, Min, Max, IsInt, IsArray } from 'class-validator';
import { City, Housing, Feature } from '../../../types/index.js';
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

export class UpdateOfferDto {
  @IsOptional()
  @IsString({message: OfferValidationMessage.title.invalidFormat})
  @Length(TitleLength.Min, TitleLength.Max, { message: OfferValidationMessage.title.length })
  public title?: string;

  @IsOptional()
  @IsString({message: OfferValidationMessage.title.invalidFormat})
  @Length(DescriptionLength.Min, DescriptionLength.Max, { message: OfferValidationMessage.title.length })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: OfferValidationMessage.postDate.invalidFormat })
  public postDate?: Date;

  @IsOptional()
  @IsEnum(City, { message: OfferValidationMessage.city.invalid })
  public city?: City;

  @IsOptional()
  @IsString({message: OfferValidationMessage.preview.invalidFormat})
  public preview?: string;

  @IsOptional()
  @IsArray({message: OfferValidationMessage.photos.invalidFormat})
  @ArrayMinSize(IMAGES_COUNT, {message: OfferValidationMessage.photos.invalidCount})
  @ArrayMaxSize(IMAGES_COUNT, {message: OfferValidationMessage.photos.invalidCount})
  @IsString({each: true, message: OfferValidationMessage.photos.invalidValue})
  public photos?: string[];

  @IsOptional()
  @IsBoolean({message: OfferValidationMessage.isPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(Housing, { message: OfferValidationMessage.housingType.invalid })
  public housingType?: Housing;

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.roomCount.invalidFormat })
  @Min(RoomCount.Min, {message: OfferValidationMessage.roomCount.minValue})
  @Max(RoomCount.Max, {message: OfferValidationMessage.roomCount.maxValue})
  public roomCount?: number;

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.guestCount.invalidFormat })
  @Min(GuestCount.Min, {message: OfferValidationMessage.guestCount.minValue})
  @Max(GuestCount.Max, {message: OfferValidationMessage.guestCount.maxValue})
  public guestCount?: number;

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.rentPrice.invalidFormat })
  @Min(PriceValue.Min, {message: OfferValidationMessage.rentPrice.minValue})
  @Max(PriceValue.Max, {message: OfferValidationMessage.rentPrice.maxValue})
  public rentPrice?: number;

  @IsOptional()
  @IsArray({message: OfferValidationMessage.features.invalidFormat})
  public features?: Feature[];

  @IsOptional()
  @IsArray({message: OfferValidationMessage.location.invalidFormat})
  @ArrayMaxSize(COORDS_LENGTH, {message: OfferValidationMessage.location.length})
  @ArrayMinSize(COORDS_LENGTH, {message: OfferValidationMessage.location.length})
  @IsString({each: true, message: OfferValidationMessage.location.invalidValue})
  public location?: [string, string];
}
