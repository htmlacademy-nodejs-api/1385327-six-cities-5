import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose'; //, Ref
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

  @prop({trim: true, required: true})
  public description!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({
    city: () => String,
    enum: City
  })
  public city!: City;

  @prop({required: true})
  public preview!: string;

  @prop({required: true})
  public photos!: string[];


  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})
  public isFavorite!: boolean;


  @prop({required: true})
  public rating!: number;

  @prop({
    housingType: () => String,
    enum: Housing
  })
  public housingType!: Housing;

  @prop({required: true})
  public roomCount!: number;

  @prop({required: true})
  public guestCount!: number;

  @prop({required: true})
  public rentPrice!: number;

  // features: Feature[];
  @prop({required: true})
  public features!: string[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public author!: Ref<UserEntity>;
  // @prop({required: true})
  // public author!: User;

  @prop({default: 0})
  public commentsCount!: number;

  // location: Coords;
  @prop({required: true})
  public location!: string[];
}

export const OfferModel = getModelForClass(OfferEntity);
