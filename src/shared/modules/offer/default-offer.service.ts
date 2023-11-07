import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { Logger } from '../../libs/logger/index.js';
import { OfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';


import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';
import { aggregateComments, aggregateDefaultFavorite, aggregateFavorite, aggregateAuthor } from './offer.aggregate.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null> {
    const aggregate = userId ? [...aggregateComments, ...aggregateFavorite(userId), ...aggregateAuthor] : [...aggregateComments, ...aggregateDefaultFavorite, ...aggregateAuthor];
    return this.offerModel
      .aggregate([
        { $match: { $expr: { $eq: ['$_id', { $toObjectId: offerId }], }, }, },
        ...aggregate
      ])
      .exec()
      .then(([result]) => result ?? null);
  }

  public async find(count?: number, userId?: string): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    const aggregate = userId ? [...aggregateComments, ...aggregateFavorite(userId)] : [...aggregateComments, ...aggregateDefaultFavorite];
    return this.offerModel
      .aggregate([
        ...aggregate,
        { $project: { title: 1, postDate: 1, city: 1, preview: 1, isPremium: 1, isFavorite: 1, rating: 1, houseType: 1, price: 1, commentCount: 1 } },
        { $sort: { createdAt: SortType.Down } },
        { $limit: limit },
      ])
      .exec();
  }

  // public async findByUserId(
  //   userId: string,
  //   count?: number
  // ): Promise<DocumentType<OfferEntity>[]> {
  //   const limit = count ?? DEFAULT_OFFER_COUNT;
  //   return this.offerModel
  //     .aggregate([
  //       ...this.comments,
  //       ...this.favorites,
  //       { $limit: limit },
  //       { $sort: { createdAt: SortType.Down } },
  //     ])
  //     .exec();
  // }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['author'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  // Счетчик коментов
  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async findPremiumByCityName(city: string): Promise<DocumentType<OfferEntity>[] | null> {
    return await this.offerModel
      .find({ isPremium: true, city })
      .sort({ createdAt: SortType.Down })
      .limit(DEFAULT_PREMIUM_OFFER_COUNT)
      .exec();
  }

}
