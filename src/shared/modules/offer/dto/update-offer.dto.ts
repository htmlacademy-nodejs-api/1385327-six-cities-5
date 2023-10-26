import { IsOptional, Length, IsString, IsDateString, IsEnum, ArrayMinSize, ArrayMaxSize, IsBoolean, Min, Max, IsInt, IsArray } from 'class-validator';
import { City, Housing, Feature } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsString({message: CreateOfferValidationMessage.title.invalidFormat})
  @Length(10, 100, { message: CreateOfferValidationMessage.title.length })
  public title?: string;

  @IsOptional()
  @IsString({message: CreateOfferValidationMessage.title.invalidFormat})
  @Length(20, 1024, { message: CreateOfferValidationMessage.title.length })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate?: Date;

  @IsOptional()
  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city?: City;

  @IsOptional()
  @IsString({message: CreateOfferValidationMessage.preview.invalidFormat})
  public preview?: string;

  @IsOptional()
  @IsArray({message: CreateOfferValidationMessage.photos.invalidFormat})
  @ArrayMinSize(6, {message: CreateOfferValidationMessage.photos.invalidCount})
  @ArrayMaxSize(6, {message: CreateOfferValidationMessage.photos.invalidCount})
  @IsString({each: true, message: CreateOfferValidationMessage.photos.invalidValue})
  public photos?: string[];

  @IsOptional()
  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium?: boolean;

  // public isFavorite?: boolean;
  // public rating: number;

  @IsOptional()
  @IsEnum(Housing, { message: CreateOfferValidationMessage.housingType.invalid })
  public housingType?: Housing;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.roomCount.invalidFormat })
  @Min(1, {message: CreateOfferValidationMessage.roomCount.minValue})
  @Max(8, {message: CreateOfferValidationMessage.roomCount.maxValue})
  public roomCount?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.guestCount.invalidFormat })
  @Min(1, {message: CreateOfferValidationMessage.guestCount.minValue})
  @Max(10, {message: CreateOfferValidationMessage.guestCount.maxValue})
  public guestCount?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.rentPrice.invalidFormat })
  @Min(100, {message: CreateOfferValidationMessage.rentPrice.minValue})
  @Max(100000, {message: CreateOfferValidationMessage.rentPrice.maxValue})
  public rentPrice?: number;

  @IsOptional()
  @IsArray({message: CreateOfferValidationMessage.features.invalidFormat})
  public features?: Feature[];

  // @IsOptional()
  // public commentsCount?: number;

  @IsOptional()
  @IsArray({message: CreateOfferValidationMessage.location.invalidFormat})
  @ArrayMaxSize(2, {message: CreateOfferValidationMessage.location.length})
  @ArrayMinSize(2, {message: CreateOfferValidationMessage.location.length})
  @IsString({each: true, message: CreateOfferValidationMessage.location.invalidValue})
  public location?: [string, string];
  // public author: string;
}
