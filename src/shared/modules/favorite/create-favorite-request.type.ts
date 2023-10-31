import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
//import { CreateFavoriteDto } from './dto/create-favorite.dto.js';
import { OfferRdo } from '../offer/index.js';

export type IndexFavoriteRequest = Request<RequestParams, OfferRdo, RequestBody, { userId?: string }>
//export type CreateFavoriteRequest = Request<RequestParams, RequestBody, CreateFavoriteDto>;
export type CreateFavoriteRequest = Request<RequestParams, OfferRdo, {offerId: string; userId: string }>
