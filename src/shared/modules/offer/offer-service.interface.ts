import { DocumentType } from '@typegoose/typegoose';
import { DocumentExists } from '../../libs/rest/index.js';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { FindQuery } from './index.js';

export interface OfferService extends DocumentExists {
  find(query: FindQuery, userId?: string): Promise<Array<DocumentType<OfferEntity>>>;
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;

  findById(offerId: OfferEntity['id'], userId?: string): Promise<DocumentType<OfferEntity> | null>
  updateById(offerId: OfferEntity['id'], dto: UpdateOfferDto): Promise<DocumentType<OfferEntity>>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCityName(city: string, userId?: string): Promise<DocumentType<OfferEntity>[] | null>;
  exists(documentId: string): Promise<boolean>;
}
