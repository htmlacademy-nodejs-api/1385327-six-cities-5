import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { City, Feature, Housing } from '../../types/index.js';

import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
  options: {
    allowMixed: 0
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  //1
  @prop({
    required: true,
    default: '',
    trim: true
  })
  public title!: string;

  //2
  @prop()
  public description!: string;

  //3
  @prop()
  public postDate!: Date;

  //4
  @prop({
    city: () => String,
    enum: City
  })
  public city!: City;

  //5
  @prop()
  public preview!: string;

  //6
  @prop()
  public photos!: string[];

  //7
  @prop()
  public isPremium!: boolean;

  //8
  @prop()
  public isFavorite!: boolean;

  //9
  @prop()
  public rating!: number;

  //10
  @prop({
    housingType: () => String,
    enum: Housing
  })
  public housingType!: Housing;

  //11
  @prop()
  public roomCount!: number;

  //12
  @prop()
  public guestCount!: number;

  //13
  @prop()
  public rentPrice!: number;

  //14
  @prop()
  public features!: Feature[];

  //15
  @prop()
  public commentsCount!: number;

  //16
  @prop()
  public location!: [string, string];

  //17
  @prop({
    ref: UserEntity,
    required: true
  })
  public author!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
