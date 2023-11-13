import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  BaseController,
  HttpMethod,
  HttpError,
  ValidateObjectIdMiddleware,
  ValidateDtoMiddleware,
  DocumentExistsMiddleware,
  PrivateRouteMiddleware,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';

import { OfferService } from './offer-service.interface.js';
import { FavoriteService } from '../favorite/index.js';
import { CommentService } from '../comment/index.js';

import { fillDTO } from '../../helpers/index.js';
import { City } from '../../types/index.js';

import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { ShortOfferRdo } from './rdo/short-offer.rdo.js';
import {
  FindRequest,
  ShowOfferRequest,
  CreateOfferRequest,
  UpdateOfferRequest,
  ParamOfferId,
  ParamCityName,
} from './types/offer-request.types.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.FavoriteService) private readonly favoriteService: FavoriteService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:city/premium',
      method: HttpMethod.Get,
      handler: this.findPremiumByCityName,
    });
  }

  // Список предложений
  public async index({query, tokenPayload}: FindRequest, res: Response): Promise<void> {
    const userId = tokenPayload?.id;
    const count = query;

    const offers = await this.offerService.find(count, userId);

    this.ok(res, fillDTO(ShortOfferRdo, offers));
  }

  // Создание предложения
  public async create({body, tokenPayload}: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create({ ...body, author: tokenPayload.id});
    const offer = await this.offerService.findById(result.id);

    this.created(res, fillDTO(OfferRdo, offer));
  }

  // Показ конкретного предложения
  public async show({params, tokenPayload}: ShowOfferRequest, res: Response) {
    const { offerId } = params;
    const userId = tokenPayload?.id;

    const offer = await this.offerService.findById(offerId, userId);

    return this.ok(res, fillDTO(OfferRdo, offer));
  }

  // Обновление конкретного предложения
  public async update({ params, tokenPayload, body }: UpdateOfferRequest, res: Response) {
    const { offerId } = params;
    const userId = tokenPayload.id;

    const currentOffer = await this.offerService.findById(offerId);

    if (currentOffer && currentOffer.author._id.toString() !== userId) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Only the author has the right to change the offer',
        'OfferController'
      );
    }

    const updatedOffer = await this.offerService.updateById(offerId, body);
    const isFavorite = await this.favoriteService.exists({ userId, offerId });

    this.ok(res, fillDTO(OfferRdo, { ...updatedOffer.toObject(), isFavorite }));
  }

  // Удаление конкретного предложения
  public async delete({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const userId = tokenPayload.id;

    const currentOffer = await this.offerService.findById(offerId);

    if (currentOffer && currentOffer.author._id.toString() !== userId) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Only the author has the right to delete the offer',
        'OfferController'
      );
    }

    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);
    await this.favoriteService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  // Список премиальных предложений для города
  public async findPremiumByCityName({ params, tokenPayload }: Request<ParamCityName>, res: Response): Promise<void> {
    const { city } = params;

    const cityName = Object.entries(City).find(([value]) => value === city);

    const userId = tokenPayload?.id;

    if (!cityName) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. City not specified.',
        'OfferController'
      );
    }

    const premiumOffers = await this.offerService.findPremiumByCityName(city, userId);

    if (premiumOffers?.length === 0) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Premium offers for ${city} not found`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(ShortOfferRdo, premiumOffers));
  }

}
