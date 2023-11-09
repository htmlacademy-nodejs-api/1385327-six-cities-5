import { inject, injectable } from 'inversify';
import { types, DocumentType } from '@typegoose/typegoose'; // DocumentType,
import { Logger } from '../../libs/logger/index.js';
//import { Types } from 'mongoose';
//import mongoose from 'mongoose';

import { Component } from '../../types/index.js';//SortType
import { aggregateFavorite } from './favorite.aggregate.js';
import { aggregateComments } from './favorite.aggregate.js';
import { aggregateOffer } from './favorite.aggregate.js';
//import { aggregateAuthor } from './favorite.aggregate.js';

import { FavoriteService } from './favorite-service.interface.js';
import { FavoriteEntity } from './favorite.entity.js';
import { CreateFavoriteDto } from './dto/create-favorite.dto.js';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto.js';

import { OfferEntity } from '../offer/offer.entity.js';
// import { UserEntity } from '../user/user.entity.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    // @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  // { $match: { $expr: { $eq: [userId, '$userId'] } } },

  // public async findByUserId(userId: string): Promise<DocumentType<FavoriteEntity>[]> {
  //   return await this.favoriteModel
  //     .aggregate([
  //       ...aggregateOffer,
  //       ...aggregateFavorite(userId),
  //       ...aggregateComments,
  //       { $project: { title: 1, postDate: 1, city: 1, preview: 1, isPremium: 1, isFavorite: 1, rating: 1, housingType: 1, rentPrice: 1, commentsCount: 1 } },
  //     ])
  //     .exec();
  // }

  public async findByUserId(userId: string): Promise<DocumentType<OfferEntity>[]> {

    return await this.offerModel
      .aggregate([
        ...aggregateOffer,
        ...aggregateFavorite(userId),
        ...aggregateComments,
        //{ $project: { title: 1, postDate: 1, city: 1, preview: 1, isPremium: 1, isFavorite: 1, rating: 1, housingType: 1, rentPrice: 1, commentsCount: 1 } },

      ])
      .exec();
  }

  // public async findByUserOfferId(userId: string, offerId: string): Promise<DocumentType<FavoriteEntity>[]> {
  //   return await this.favoriteModel
  //     .find({ userId, offerId })
  //     .exec();
  // }

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

}
