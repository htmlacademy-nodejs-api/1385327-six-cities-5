import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { RequestBody, RequestParams } from '../../../libs/rest/index.js';
import { CreateOfferDto } from '../dto/create-offer.dto.js';
import { UpdateOfferDto } from '../dto/update-offer.dto.js';
import { OfferRdo } from '../rdo/offer.rdo.js';

export interface FindQuery { size?: string }
export type ParamOfferId = { offerId: string } | ParamsDictionary;
export type ShowOfferRequest = Request<ParamOfferId, OfferRdo, UpdateOfferDto>
export type CreateOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;
export type UpdateOfferRequest = Request<ParamOfferId, OfferRdo, UpdateOfferDto>
//export type DeleteOfferRequest = Request<ParamOfferId | ParamsDictionary>
export type FindRequest = Request<RequestParams, RequestBody, CreateOfferDto, FindQuery>;
export type ParamCityName = { city: string } | ParamsDictionary;
