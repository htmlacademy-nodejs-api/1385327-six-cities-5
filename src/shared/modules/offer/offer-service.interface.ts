import { DocumentType } from '@typegoose/typegoose';
import { DocumentExists } from '../../libs/rest/index.js';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  find(count: number): Promise<DocumentType<OfferEntity>[]>;
  //findByUserId(userId: string): Promise<DocumentType<OfferEntity>[]>;

  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;

  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  exists(documentId: string): Promise<boolean>;

  findPremiumByCityName(city: string): Promise<DocumentType<OfferEntity>[] | null>;
}
