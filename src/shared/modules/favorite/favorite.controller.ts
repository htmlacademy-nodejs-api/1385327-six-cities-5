import { injectable, inject } from 'inversify';
import { Response, Request } from 'express';


import {
  BaseController,
  //ValidateObjectIdMiddleware,
  //DocumentExistsMiddleware,
  //ValidateDtoMiddleware,
  PrivateRouteMiddleware,
  //ValidateStatusMiddleware
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';

import { FavoriteService } from './favorite-service.interface.js';

import { HttpMethod } from '../../libs/rest/types/http-method.enum.js';
import { fillDTO } from '../../helpers/common.js';

import { FavoriteRdo } from './rdo/favorite.rdo.js';
import { CreateOrDeleteRequest } from './index.js';

import { OfferRdo } from '../offer/index.js';

@injectable()
export class FavoriteController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.FavoriteService) private readonly favoriteService: FavoriteService,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoriteController');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware()
      ],
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        // new ValidateObjectIdMiddleware('offerId'),
        // new ValidateStatusMiddleware('status'),
        // new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  // public async index({ tokenPayload }: Request, res: Response): Promise<void> {
  //   console.log('token----index', tokenPayload.id);
  //   const favorites = await this.favoriteService.findByUserId(tokenPayload.id);
  //   console.log('favorites-----------index', favorites);
  //   this.ok(res, fillDTO(FavoriteRdo, favorites));
  // }

  public async index({ tokenPayload }: Request, res: Response): Promise<void> {
    const favorites = await this.favoriteService.findByUserId(tokenPayload.id);

    this.ok(res, fillDTO(OfferRdo, favorites));
  }

  private async update({ tokenPayload, body }: CreateOrDeleteRequest, res: Response) {
    const favoriteDto = {
      offerId: body.offerId,
      userId: tokenPayload.id,
    };

    const result = await this.favoriteService.createOrDelete(favoriteDto);

    if (result === null) {
      this.noContent(res, {});
    } else {
      this.created(res, fillDTO(FavoriteRdo, result));
    }
  }

}
