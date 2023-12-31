import { Expose } from 'class-transformer';

export class UserRdo {

  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public avatar: string;

  @Expose()
  public isProType: boolean;
}
