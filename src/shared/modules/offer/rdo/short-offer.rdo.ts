import { Expose, Transform } from 'class-transformer';
import { City, Housing } from '../../../types/index.js';

export class ShortOfferRdo {
  @Expose()
  @Transform((query) => query.obj['_id'])
  public id: string;

  //1
  @Expose()
  public title: string;

  //3
  @Expose()
  public postDate: Date;

  //4
  @Expose()
  public city: City;

  //5
  @Expose()
  public preview: string;

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

  //13
  @Expose()
  public rentPrice: number;

  //15
  @Expose()
  public commentsCount: number;

}
