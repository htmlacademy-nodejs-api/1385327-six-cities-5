import { Expose, Transform } from 'class-transformer';

export class FavoriteRdo {

  @Expose()
  @Transform((query) => query.obj['offerId'])
  public offerId: string;
}
