import { injectable, inject } from 'inversify';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController, ValidateDtoMiddleware, PrivateRouteMiddleware } from '../../libs/rest/index.js'; //, ValidateObjectIdMiddleware, DocumentExistsMiddleware
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { HttpMethod } from '../../libs/rest/types/http-method.enum.js';
import { fillDTO } from '../../helpers/common.js';
import { FavoriteService } from './favorite-service.interface.js';
import { CreateFavoriteRequest, DeleteFavoriteRequest } from './favorite-request.type.js'; //, IndexFavoriteRequest
import { OfferRdo } from '../offer/index.js';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { FavoriteRdo } from './rdo/favorite.rdo.js';
import { CreateFavoriteDto } from './index.js';//, DeleteFavoriteDto

@injectable()
export class FavoriteController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.FavoriteService) private readonly favoriteService: FavoriteService,
    //@inject(Component.UserService) private readonly userService: UserService

  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    //this.addRoute({ path: '/:userId', method: HttpMethod.Get, handler: this.index });
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
    //   path: '/:userId/:offerId',
    //   method: HttpMethod.Delete,
    //   handler: this.delete,
    //   middlewares: [
    //     new ValidateDtoMiddleware(DeleteFavoriteDto)
    //   ]
    // });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const userId = req.tokenPayload.id;
    const offers = await this.favoriteService.findByUserId(userId);

    this.ok(res, fillDTO(OfferRdo, offers));
  }

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

    this.noContent(res, '');// второй параметр требует
  }
}
