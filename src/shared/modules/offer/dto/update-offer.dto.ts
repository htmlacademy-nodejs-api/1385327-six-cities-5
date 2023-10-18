import { City, Housing } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: City;
  public preview?: string;
  public photos?: string[];
  public isPremium?: boolean;
  // public isFavorite?: boolean;
  // public rating: number;
  public housingType?: Housing;
  public roomCount?: number;
  public guestCount?: number;
  public rentPrice?: number;
  public features?: string[];
  public commentsCount?: number;
  public location?: [string, string];
  // public author: string;
}
