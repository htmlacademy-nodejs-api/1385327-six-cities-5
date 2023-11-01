import { injectable, inject } from 'inversify';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  BaseController,
  //ValidateObjectIdMiddleware,
  //DocumentExistsMiddleware,
  ValidateDtoMiddleware,
  PrivateRouteMiddleware,
  //ValidateStatusMiddleware
} from '../../libs/rest/index.js'; //, ValidateObjectIdMiddleware, DocumentExistsMiddleware
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';

import { FavoriteService } from './favorite-service.interface.js';
// import { OfferService } from '../offer/index.js';

import { HttpMethod } from '../../libs/rest/types/http-method.enum.js';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { fillDTO } from '../../helpers/common.js';

import { CreateFavoriteRequest, DeleteFavoriteRequest } from './types/favorite-request.type.js'; //, IndexFavoriteRequest

import { CreateFavoriteDto } from './dto/create-favorite.dto.js';//, DeleteFavoriteDto
import { FavoriteRdo } from './rdo/favorite.rdo.js';

import { OfferRdo } from '../offer/index.js';

@injectable()
export class FavoriteController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.FavoriteService) private readonly favoriteService: FavoriteService,
    // @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoriteController');

    this.addRoute({
      path: '/:userId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware()
      ],
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateFavoriteDto)
      ],
    });
    this.addRoute({ path: '/:userId/:offerId', method: HttpMethod.Delete, handler: this.delete });

    // this.addRoute({
    //   path: '/',
    //   method: HttpMethod.Get,
    //   handler: this.index,
    //   middlewares: [
    //     new PrivateRouteMiddleware()]
    // });
    // this.addRoute({
    //   path: '/:offerId/:status',
    //   method: HttpMethod.Post,
    //   handler: this.update,
    //   middlewares: [
    //     new PrivateRouteMiddleware(),
    //     new ValidateObjectIdMiddleware('offerId'),
    //     new ValidateStatusMiddleware('status'),
    //     new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
    //   ]
    // });
  }

  // public async index({ tokenPayload }: Request, res: Response): Promise<void> {
  //   const offers = await this.favoriteService.findFavorites(tokenPayload.id);
  //   const responseData = fillDTO(OfferRdo, offers);
  //   this.ok(res, responseData);
  // }

  public async index(req: Request, res: Response): Promise<void> {
    const userId = req.tokenPayload.id;
    const offers = await this.favoriteService.findByUserId(userId);

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  // public async update({ tokenPayload, params }: Request, res: Response): Promise<void> {
  //   const { offerId, status } = params;
  //   const offer = await this.favoriteService.addOrRemoveOfferFavoriteStatus(tokenPayload.id, offerId, status);
  //   const responseData = fillDTO(OfferRdo, offer);
  //   this.ok(res, responseData);
  // }

  private async create(req: CreateFavoriteRequest, res: Response) {
    const favorite = await this.favoriteService.createFavorite(req.body);

    this.ok(res, fillDTO(FavoriteRdo, favorite));
  }

  private async delete(req: DeleteFavoriteRequest, res: Response) {
    const { userId, offerId } = req.params;

    if (!offerId || !userId) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Invalid params');
    }

    await this.favoriteService.deleteFavorite({ userId, offerId });

    this.noContent(res, '');
  }
}
