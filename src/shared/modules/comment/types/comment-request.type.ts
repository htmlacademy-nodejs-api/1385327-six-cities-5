import { Request } from 'express';
import { RequestBody } from '../../../libs/rest/index.js'; //, RequestParams
import { CreateCommentDto } from '../dto/create-comment.dto.js';
import { ParamsDictionary } from 'express-serve-static-core';

export type ParamOfferId = { offerId: string } | ParamsDictionary;
export type CreateCommentRequest = Request<ParamOfferId, RequestBody, CreateCommentDto>;

//export type UpdateOfferRequest = Request<ParamOfferId | ParamsDictionary, OfferRdo, UpdateOfferDto>
