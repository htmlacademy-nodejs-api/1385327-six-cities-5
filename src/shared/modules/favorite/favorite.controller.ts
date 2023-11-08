import { injectable, inject } from 'inversify';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
// import mongoose from 'mongoose';
// import { DocumentType } from '@typegoose/typegoose';

import {
  BaseController,
  //ValidateObjectIdMiddleware,
  //DocumentExistsMiddleware,
  ValidateDtoMiddleware,
  PrivateRouteMiddleware,
  //ValidateStatusMiddleware
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';

import { FavoriteService } from './favorite-service.interface.js';
// import { FavoriteEntity } from './favorite.entity.js';
// import { OfferService } from '../offer/index.js';
// import { OfferEntity } from '../offer/index.js';

import { HttpMethod } from '../../libs/rest/types/http-method.enum.js';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { fillDTO } from '../../helpers/common.js';

import {  DeleteFavoriteRequest } from './types/favorite-request.type.js'; //, IndexFavoriteRequest, CreateFavoriteRequest,
import { ParamOfferId } from '../offer/index.js';

import { CreateFavoriteDto } from './dto/create-favorite.dto.js';//, DeleteFavoriteDto
import { FavoriteRdo } from './rdo/favorite.rdo.js';

//import { OfferRdo } from '../offer/index.js';

@injectable()
export class FavoriteController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.FavoriteService) private readonly favoriteService: FavoriteService,
    //@inject(Component.OfferService) private readonly offerService: OfferService,
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
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateFavoriteDto)
      ],
    });
    this.addRoute({
      path: '/:userId/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware()
      ],
    });

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

  public async index({ tokenPayload }: Request, res: Response): Promise<void> {
    const userId = await this.favoriteService.findByUserId(tokenPayload.id);

    this.ok(res, fillDTO(FavoriteRdo, userId));
  }

  // public async index({ tokenPayload }: Request, res: Response): Promise<void> {
  //   const userId = await this.favoriteService.findByUserId(tokenPayload.id);

  //   this.ok(res, fillDTO(OfferRdo, userId));
  // }

  // private async create({body, params, tokenPayload}: CreateFavoriteRequest, res: Response): Promise<void> {
  //   const favorite = await this.favoriteService.createFavorite({...body, offerId: params.offerId, userId: tokenPayload.id});

  //   this.created(res, fillDTO(FavoriteRdo, favorite));
  // }
  private async create({body, params, tokenPayload}: Request<ParamOfferId>, res: Response): Promise<void> {
    const favorite = await this.favoriteService.createFavorite({...body, offerId: params.offerId, userId: tokenPayload.id});

    this.created(res, fillDTO(FavoriteRdo, favorite));
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
