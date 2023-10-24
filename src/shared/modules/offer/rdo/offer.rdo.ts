import { Expose, Type } from 'class-transformer';
import { City, Feature, Housing } from '../../../types/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public id: string;

  //1
  @Expose()
  public title: string;

  //2
  @Expose()
  public description: string;

  //3
  @Expose()
  public postDate: Date;

  //4
  @Expose()
  public city: City;

  //5
  @Expose()
  public preview: string;

  //6
  @Expose()
  public photos: string[];

  //7
  @Expose()
  public isPremium: boolean;

  //8
  @Expose()
  public isFavorite: boolean;

  //9
  @Expose()
  public rating: number;

  //10
  @Expose()
  public housingType: Housing;

  //11
  @Expose()
  public roomCount: number;

  //12
  @Expose()
  public guestCount: number;

  //13
  @Expose()
  public rentPrice: number;

  //14
  @Expose()
  //
  public features: Feature[];

  //15
  @Expose()
  public commentsCount: number;

  //16
  @Expose()
  public location: [string, string];

  //17
  @Expose({name: 'author'})
  @Type(() => UserRdo)
  public author: UserRdo;
}
