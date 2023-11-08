import { Expose } from 'class-transformer'; //, Transform

export class FavoriteRdo {
  @Expose()
  public userId: string;

  @Expose()
  public offerId: string;
}
