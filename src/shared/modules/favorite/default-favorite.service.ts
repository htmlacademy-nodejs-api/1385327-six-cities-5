import { types } from '@typegoose/typegoose'; // DocumentType,
//import mongoose from 'mongoose';
import { injectable, inject } from 'inversify';
import { CreateFavoriteDto, DeleteFavoriteDto, FavoriteEntity, FavoriteService } from './index.js';
import { Component } from '../../types/component.enum.js';
//import { OfferEntity } from '../offer/offer.entity.js';
//import { Types } from 'mongoose';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>
  ) {}

  public async findByUserId(userId: string) {
    return await this.favoriteModel
      .find({ userId })
      .exec();
  }

  public async createFavorite({ userId, offerId }: CreateFavoriteDto) {
    let favorite = await this.favoriteModel.findOne({ userId: userId, offerId: offerId });

    if (!favorite) {
      favorite = await this.favoriteModel.create({ userId: userId, offerId: offerId });
    }

    return favorite;
  }

  public async deleteFavorite({ userId, offerId }: DeleteFavoriteDto) {
    await this.favoriteModel.findOneAndRemove({ userId: userId, offerId: offerId });
  }
}
