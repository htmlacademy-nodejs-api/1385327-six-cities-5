import { inject, injectable } from 'inversify';
import { types } from '@typegoose/typegoose'; // DocumentType,
//import { Logger } from '../../libs/logger/index.js';

import { Component } from '../../types/index.js';//SortType

import { FavoriteService } from './favorite-service.interface.js';
import { FavoriteEntity } from './favorite.entity.js';
import { CreateFavoriteDto } from './dto/create-favorite.dto.js';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto.js';

// import { OfferEntity } from '../offer/offer.entity.js';
// import { UserEntity } from '../user/user.entity.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>,
    // @inject(Component.Logger) private readonly logger: Logger,
    // @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    // @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
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
  // public async findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]> {
  //   const { favoriteOffers} = await this.userModel
  //     .findById(userId)
  //     .sort({ postDate: SortType.Down })
  //     .exec() as UserEntity;
  //   return this.offerModel.find({ '_id': { $in: favoriteOffers } });
  // }

  // public async addOrRemoveOfferFavoriteStatus(userId: string, offerId: string, status: string) {
  //   const isSetStatus = status === '1';
  //   await this.userModel
  //     .updateOne(
  //       { _id: userId },
  //       { [`$${ isSetStatus ? 'push' : 'pull' }`]: { favoriteOffers: offerId } })
  //     .exec();

  //   this.logger.info(`${ isSetStatus ? 'Add' : 'Remove' } offer id '${ offerId }'
  //     ${ isSetStatus ? 'in' : 'from' } favorites of user = '${ userId }'`);
  //   return this
  //     .offerModel
  //     .findById(offerId)
  //     .populate([ 'userId' ])
  //     .exec();
  // }
}
