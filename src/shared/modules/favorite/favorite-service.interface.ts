//import { Types } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { FavoriteEntity } from './favorite.entity.js';
//import { OfferEntity } from '../offer/index.js';
import { CreateFavoriteDto } from './dto/create-favorite.dto.js';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto.js';

// import { OfferEntity } from '../offer/offer.entity.js';

export interface FavoriteService {

  //find(): Promise<DocumentType<FavoriteEntity>[]>;
  findByUserId(userId: string): Promise<DocumentType<FavoriteEntity>[] | null>;
  //findByUserId(userId: Types.ObjectId): Promise<DocumentType<FavoriteEntity>[]>;
  //findByUserId(userId: string): Promise<DocumentType<OfferEntity>[] | null>
  findByUserOfferId(userId: string, offerId: string): Promise<DocumentType<FavoriteEntity>[]>;


  // createFavorite(dto: CreateFavoriteDto): Promise<DocumentType<FavoriteEntity>>;
  // deleteFavorite(dto: DeleteFavoriteDto): Promise<void>;

  createOrDelete(dto: CreateFavoriteDto | DeleteFavoriteDto): Promise<DocumentType<FavoriteEntity> | null>;
}

