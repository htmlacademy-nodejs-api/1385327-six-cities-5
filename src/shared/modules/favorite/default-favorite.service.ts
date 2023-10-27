import { DocumentType, types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { inject, injectable } from 'inversify';
import { FavoriteEntity } from './favorite.entity.js';
import { FavoriteService } from './favorite-service.interface.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>
  ) {}

  public async findByUserId(userId: string): Promise<DocumentType<FavoriteEntity>[]> {
    return await this.favoriteModel
      .find({ userId })
      .exec();
  }

}
