import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { City, Housing } from '../../types/index.js';

import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {

  @prop({ trim: true, required: true })
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop({
    city: () => String,
    enum: City
  })
  public city!: City;

  @prop()
  public preview!: string;

  @prop()
  public photos!: string[];


  @prop()
  public isPremium!: boolean;

  @prop()
  public isFavorite!: boolean;


  @prop()
  public rating!: number;

  @prop({
    housingType: () => String,
    enum: Housing
  })
  public housingType!: Housing;

  @prop()
  public roomCount!: number;

  @prop()
  public guestCount!: number;

  @prop()
  public rentPrice!: number;

  // features: Feature[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public author!: Ref<UserEntity>;

  @prop({default: 0})
  public commentsCount!: number;

  // location: Coords;
}

export const OfferModel = getModelForClass(OfferEntity);
