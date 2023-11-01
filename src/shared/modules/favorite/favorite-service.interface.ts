import { DocumentType } from '@typegoose/typegoose';
import { FavoriteEntity } from './favorite.entity.js';
//import { OfferEntity } from '../offer/index.js';
import { CreateFavoriteDto } from './dto/create-favorite.dto.js';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto.js';

// import { OfferEntity } from '../offer/offer.entity.js';

export interface FavoriteService {

  findByUserId(userId: string): Promise<DocumentType<FavoriteEntity>[] | null>
  //findByUserId(userId: string): Promise<DocumentType<OfferEntity>[] | null>
  createFavorite(dto: CreateFavoriteDto): Promise<DocumentType<FavoriteEntity>>
  deleteFavorite(dto: DeleteFavoriteDto): Promise<void>

  // findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;
  // addOrRemoveOfferFavoriteStatus(userId: string, offerId: string, status: string): Promise<DocumentType<OfferEntity> | null>;
}

