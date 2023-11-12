import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { Logger } from '../../libs/logger/index.js';
import { OfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { FindQuery } from './types/offer-request.types.js';

import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';
import { aggregateComments, aggregateDefaultFavorite, aggregateFavorite } from './offer.aggregate.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  // Создать новое предложение
  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);

    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  // Найти offer по id ------------------------------------------------------------------------------------- ()
  // public async findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null> {
  //   //const aggregate = userId ? [...aggregateComments, ...aggregateFavorite(userId), ...aggregateAuthor] : [...aggregateComments, ...aggregateDefaultFavorite, ...aggregateAuthor];
  //   const aggregate = userId ? [...aggregateComments, ...aggregateAuthor] : [...aggregateComments, ...aggregateAuthor];
  //   return this.offerModel
  //     .aggregate([
  //       { $match: { $expr: { $eq: ['$_id', { $toObjectId: offerId }], }, }, },
  //       ...aggregate
  //     ])
  //     .exec()
  //     .then(([result]) => result ?? null);
  // }
  public async findById(offerId: string) {
    return await this.offerModel.findById(offerId).populate('author');
  }

  // Найти все предложения ------------------------------------------------------------------------------------- ()
  public async find(query: FindQuery, userId?: string): Promise<DocumentType<OfferEntity>[]> {
    const limit = Number(query.size ?? DEFAULT_OFFER_COUNT);
    const aggregate = userId ? [...aggregateComments, ...aggregateFavorite(userId)] : [...aggregateComments, ...aggregateDefaultFavorite];

    return this.offerModel
      .aggregate([
        ...aggregate,
        { $project: { title: 1, postDate: 1, city: 1, preview: 1, isPremium: 1, isFavorite: 1, rating: 1, housingType: 1, rentPrice: 1, commentsCount: 1 } },
        { $sort: { createdAt: SortType.Down } },
        { $limit: limit },
      ])
      .exec();
  }

  // Обновить по id ------------------------------------------------------------------------------------- ()
  public async updateById(offerId: OfferEntity['id'], dto: UpdateOfferDto) {
    const result = await this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['author']) as DocumentType<OfferEntity>;

    this.logger.info(`Offer: ${offerId} update`);

    return result;
  }

  // Удалить по id ------------------------------------------------------------------------------------- ()
  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const result = this.offerModel
      .findByIdAndDelete(offerId)
      .exec();

    this.logger.info(`Offer: ${offerId} delete`);

    return result;
  }

  //  ------------------------------------------------------------------------------------- ()
  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  // Счетчик комментариев ------------------------------------------------------------------------------------- ()
  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  // Найти премиальные предложения для города ----------------------------------------------------------------- ()
  public async findPremiumByCityName(city: string, userId: string): Promise<DocumentType<OfferEntity>[] | null> {
    const aggregate = userId ? [...aggregateComments, ...aggregateFavorite(userId)] : [...aggregateComments, ...aggregateDefaultFavorite];

    return await this.offerModel
      .aggregate([
        ...aggregate,
        { $match: { $expr: { $and: [
          { $eq: [ '$city', city ] },
          { $eq: [ '$isPremium', true ] }
        ] } } },
        { $project: { title: 1, postDate: 1, city: 1, preview: 1, isPremium: 1, isFavorite: 1, rating: 1, housingType: 1, rentPrice: 1, commentsCount: 1 } },
        { $sort: { createdAt: SortType.Down } },
        { $limit: DEFAULT_PREMIUM_OFFER_COUNT },
      ])
      .exec();
  }

}
