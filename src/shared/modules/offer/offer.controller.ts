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
  UploadFileMiddleware
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';

import { OfferService } from './offer-service.interface.js';

import { fillDTO } from '../../helpers/index.js';

import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OfferRdo } from './rdo/offer.rdo.js';

import { ParamOfferId } from './types/param-offerid.type.js';
import { CreateOfferRequest } from './types/create-offer-request.type.js';

import { CommentService } from '../comment/index.js'; //, CommentRdo
import { ParamCityName } from './types/param-cityname.type.js';

import { Config, RestSchema } from '../../libs/config/index.js';
import { UploadPreviewRdo } from './rdo/upload-preview.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
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
        new ValidateDtoMiddleware(CreateOfferDto)
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
      handler: this.findPremiumByCityName
    });
    this.addRoute({
      path: '/:offerId/preview',
      method: HttpMethod.Post,
      handler: this.uploadPreview,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find(60);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  // public async index({ query, tokenPayload }: Request, res: Response): Promise<void> {
  //   const userId = tokenPayload?.id;

  //   console.log(userId);
  //   const result = await this.offerService.find(Number(query), userId);

  //   this.ok(res,fillDTO(OfferRdo, result));
  // }

  public async create({body, tokenPayload}: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create({ ...body, author: tokenPayload.id});
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async update({ params, tokenPayload, body }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const { offerId } = params;
    const currentOffer = await this.offerService.findById(offerId);

    if (currentOffer && currentOffer.author._id.toString() !== tokenPayload.id) {
      throw new HttpError(
        StatusCodes.METHOD_NOT_ALLOWED,
        'Only the author has the right to change the offer',
        'OfferController'
      );
    }

    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async delete({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const currentOffer = await this.offerService.findById(offerId);

    if (currentOffer && currentOffer.author._id.toString() !== tokenPayload.id) {
      throw new HttpError(
        StatusCodes.METHOD_NOT_ALLOWED,
        'Only the author has the right to delete the offer',
        'OfferController'
      );
    }

    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);// favorite!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    this.noContent(res, offer);
  }

  public async findPremiumByCityName({ params }: Request<ParamCityName>, res: Response): Promise<void> {
    const { city } = params;

    if (!city) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. City not found in query parameters',
        'OfferController'
      );
    }

    const premiumOffers = await this.offerService.findPremiumByCityName(city);

    if (!premiumOffers) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Premium offers not found',
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, premiumOffers));
  }

  public async uploadPreview({ params, file } : Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    const updateDto = { preview: file?.filename };

    await this.offerService.updateById(offerId, updateDto);

    this.created(res, fillDTO(UploadPreviewRdo, updateDto));
  }
}
