import { DocumentType } from '@typegoose/typegoose';
import { FavoriteEntity } from './favorite.entity.js';
//import { CreateFavoriteDto } from './dto/create-favorite.dto.js';

//import { Types } from 'mongoose';


export interface FavoriteService {
  // find(): Promise<DocumentType<FavoriteEntity>[]>;
  findByUserId(userId: string): Promise<DocumentType<FavoriteEntity>[]>;
  //createOrDelete(dto: CreateFavoriteDto | DeleteFavoriteDto): Promise<DocumentType<FavoriteEntity> | null>;

  // create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  // findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  // deleteByOfferId(offerId: string): Promise<number | null>;
}
