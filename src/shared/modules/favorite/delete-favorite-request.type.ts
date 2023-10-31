import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto.js';

export type DeleteFavoriteRequest = Request<RequestParams, RequestBody, DeleteFavoriteDto>;
