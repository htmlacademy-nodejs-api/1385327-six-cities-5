import { inject, injectable } from 'inversify';
import { types, DocumentType } from '@typegoose/typegoose';
import { Logger } from '../../libs/logger/index.js';

import { Component } from '../../types/index.js';
import { aggregateFavorite } from './favorite.aggregate.js';
import { aggregateComments } from './favorite.aggregate.js';

import { FavoriteService } from './favorite-service.interface.js';
import { FavoriteEntity } from './favorite.entity.js';
import { CreateFavoriteDto } from './dto/create-favorite.dto.js';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto.js';

import { OfferEntity } from '../offer/offer.entity.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async findByUserId(userId: string): Promise<DocumentType<OfferEntity>[]> {

    return await this.offerModel
      .aggregate([
        ...aggregateComments,
        ...aggregateFavorite(userId),
        { $match: { $expr: { $eq: [ '$isFavorite', true ] } } },
      ])
      .exec();
  }

  public async createOrDelete(dto: CreateFavoriteDto | DeleteFavoriteDto): Promise<DocumentType<FavoriteEntity> | null> {
    const isExistFavoriteEntity = await this.favoriteModel.exists(dto) !== null;

    if (isExistFavoriteEntity) {
      await this.favoriteModel.findOneAndDelete(dto).exec();
      this.logger.info(`Offer: ${dto.offerId} removed from favorites`);

      return null;
    } else {
      this.logger.info(`Offer: ${dto.offerId} added to favorites`);

      return await this.favoriteModel.create(dto);
    }
  }

  public async exists(dto: CreateFavoriteDto) {
    const existing = await this.favoriteModel.findOne(dto);

    return Boolean(existing);
  }

  public async deleteByOfferId(offerId: string): Promise<void> {
    await this.favoriteModel
      .deleteMany({ offerId: offerId })
      .exec();
  }

}
