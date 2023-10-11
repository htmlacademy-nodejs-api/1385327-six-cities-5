import { City, Housing, User } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: City;
  public preview: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public housingType: Housing;
  public roomCount: number;
  public guestCount: number;
  public rentPrice: number;
  // features: Feature[];
  public author: User;
  public commentsCount: number;
  // location: Coords;

  public userId: string;
}
