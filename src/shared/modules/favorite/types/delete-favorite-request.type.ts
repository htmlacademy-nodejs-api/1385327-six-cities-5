import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../libs/rest/index.js';
//import { DeleteFavoriteDto } from '../dto/delete-favorite.dto.js';

export type DeleteFavoriteRequest = Request<RequestParams & {userId?: string, offerId?: string; }, Record<string, never>, RequestBody>
