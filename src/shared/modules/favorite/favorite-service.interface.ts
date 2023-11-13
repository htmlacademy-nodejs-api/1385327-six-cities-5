import { DocumentType } from '@typegoose/typegoose';
import { FavoriteEntity } from './favorite.entity.js';
import { CreateFavoriteDto } from './dto/create-favorite.dto.js';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto.js';

import { OfferEntity } from '../offer/offer.entity.js';

export interface FavoriteService {
  findByUserId(userId: string): Promise<DocumentType<OfferEntity>[]>;

  createOrDelete(dto: CreateFavoriteDto | DeleteFavoriteDto): Promise<DocumentType<FavoriteEntity> | null>;
  exists(dto: CreateFavoriteDto): Promise<boolean>;

  deleteByOfferId(offerId: string): Promise<void>;
}

