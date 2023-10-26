import { Length, IsString, IsDateString, IsEnum, ArrayMinSize, ArrayMaxSize, IsBoolean, Min, Max, IsInt, IsArray, IsMongoId } from 'class-validator';
import { City, Feature, Housing } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @IsString({message: CreateOfferValidationMessage.title.invalidFormat})
  @Length(10, 100, { message: CreateOfferValidationMessage.title.length })
  public title: string;

  @IsString({message: CreateOfferValidationMessage.title.invalidFormat})
  @Length(20, 1024, { message: CreateOfferValidationMessage.title.length })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city: City;

  @IsString({message: CreateOfferValidationMessage.preview.invalidFormat})
  public preview: string;

  @IsArray({message: CreateOfferValidationMessage.photos.invalidFormat})
  @ArrayMinSize(6, {message: CreateOfferValidationMessage.photos.invalidCount})
  @ArrayMaxSize(6, {message: CreateOfferValidationMessage.photos.invalidCount})
  @IsString({each: true, message: CreateOfferValidationMessage.photos.invalidValue})
  public photos: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  //public isFavorite: boolean;

  //public rating: number;

  @IsEnum(Housing, { message: CreateOfferValidationMessage.housingType.invalid })
  public housingType: Housing;

  @IsInt({ message: CreateOfferValidationMessage.roomCount.invalidFormat })
  @Min(1, {message: CreateOfferValidationMessage.roomCount.minValue})
  @Max(8, {message: CreateOfferValidationMessage.roomCount.maxValue})
  public roomCount: number;

  @IsInt({ message: CreateOfferValidationMessage.guestCount.invalidFormat })
  @Min(1, {message: CreateOfferValidationMessage.guestCount.minValue})
  @Max(10, {message: CreateOfferValidationMessage.guestCount.maxValue})
  public guestCount: number;

  @IsInt({ message: CreateOfferValidationMessage.rentPrice.invalidFormat })
  @Min(100, {message: CreateOfferValidationMessage.rentPrice.minValue})
  @Max(100000, {message: CreateOfferValidationMessage.rentPrice.maxValue})
  public rentPrice: number;

  @IsArray({message: CreateOfferValidationMessage.features.invalidFormat})
  public features: Feature[];

  public commentsCount: number;

  @IsArray({message: CreateOfferValidationMessage.location.invalidFormat})
  @ArrayMaxSize(2, {message: CreateOfferValidationMessage.location.length})
  @ArrayMinSize(2, {message: CreateOfferValidationMessage.location.length})
  @IsString({each: true, message: CreateOfferValidationMessage.location.invalidValue})
  public location: [string, string];

  @IsMongoId({ message: CreateOfferValidationMessage.author.invalidId })
  public author: string;
}
