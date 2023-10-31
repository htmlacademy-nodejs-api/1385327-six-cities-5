import { DocumentType } from '@typegoose/typegoose';
import { FavoriteEntity } from './favorite.entity.js';
import { CreateFavoriteDto } from './dto/create-favorite.dto.js';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto.js';

export interface FavoriteService {

  findByUserId(userId: string): Promise<DocumentType<FavoriteEntity>[]>
  createFavorite(dto: CreateFavoriteDto): Promise<DocumentType<FavoriteEntity>>
  deleteFavorite(dto: DeleteFavoriteDto): Promise<void>
}

