import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../libs/rest/index.js';
//import { OfferRdo } from '../../offer/index.js';
import { CreateFavoriteDto } from '../dto/create-favorite.dto.js';

//export type IndexFavoriteRequest = Request<RequestParams, OfferRdo, RequestBody, { userId?: string }>
//export type CreateFavoriteRequest = Request<RequestParams, OfferRdo, { userId: string; offerId: string }>
//export type DeleteFavoriteRequest = Request<RequestParams & {userId?: string, offerId?: string; }, Record<string, never>, RequestBody>
export type CreateOrDeleteRequest = Request<RequestParams, RequestBody, CreateFavoriteDto>;
