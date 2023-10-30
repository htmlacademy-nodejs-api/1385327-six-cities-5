import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
import { DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  private favorites = [
    {
      $lookup: {
        from: 'favorites',
        let: { offerId: '$_id', userId: 'userId' },
        pipeline: [ { $match: { $expr: { $and: [
          { $eq: ['$$offerId', '$$offerId'] },
          { $eq: [ '$userId', '$$userId' ] }
        ] } } } ],
        as: 'favorites',
      },
    },
    { $addFields: { isFavorite: { $toBool: { $size: '$favorites' } } } },
    { $unset: 'favorites' }
  ];

  private comments = [
    {
      $lookup: {
        from: 'comments',
        let: { offerId: '$_id' },
        pipeline: [ { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } } ],
        as: 'comments',
      },
    },
    {
      $addFields: {
        rating: { $round: [{ $avg: '$comments.rating' }, 1]},
        commentsCount: { $size: '$comments' }
      },
    },
    { $unset: 'comments' }
  ];

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  // public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
  //   return this.offerModel
  //     .findById(offerId)
  //     .populate(['author'])
  //     .exec();
  // }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .aggregate([
        {
          $match: {
            $expr: {
              $eq: ['$_id', { $toObjectId: offerId }],
            },
          },
        },
        ...this.comments,
        ...this.favorites
      ])
      //.populate(['author'])
      .exec()
      .then(([result]) => result ?? null);
  }

  // public async find(): Promise<DocumentType<OfferEntity>[]> {
  //   return this.offerModel
  //     .find()
  //     .populate(['author'])
  //     .exec();
  // }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .aggregate([
        ...this.comments,
        ...this.favorites,
        { $sort: { offerCount: SortType.Down } },
        { $limit: limit },
      ])
      //.populate(['author']) и куда его теперь?
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['author'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  // Счетчик коментов мож потом понадобиться куда-то принцип взять
  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async findNew(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(count)
      .populate(['author'])
      .exec();
  }

  public async findDiscussed(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ commentCount: SortType.Down })
      .limit(count)
      .populate(['author'])
      .exec();
  }

  public async findPremiumByCityName(city: string): Promise<DocumentType<OfferEntity>[] | null> {
    return await this.offerModel
      .find({ isPremium: true, city })
      .sort({ createdAt: SortType.Down })
      .limit(DEFAULT_PREMIUM_OFFER_COUNT)
      .exec();
  }

}
