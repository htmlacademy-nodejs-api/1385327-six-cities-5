import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';//, Request
//import { StatusCodes } from 'http-status-codes';

import {
  BaseController,
  //HttpError,
  HttpMethod,
  ValidateDtoMiddleware,
  //ValidateObjectIdMiddleware,
  DocumentExistsMiddleware,
  PrivateRouteMiddleware
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';

import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';

import { fillDTO } from '../../helpers/index.js';

import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentRdo } from './rdo/comment.rdo.js';
//import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { ParamOfferId } from '../offer/index.js';


@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
    // this.addRoute({
    //   path: '/:id',
    //   method: HttpMethod.Get,
    //   handler: this.findById,
    //   middlewares: [new ValidateObjectIdMiddleware('id')]
    // });
    //   this.addRoute({
    //   path: '/:offerId',
    //   method: HttpMethod.Get,
    //   handler: this.getComments,
    //   middlewares: [
    //     new ValidateObjectIdMiddleware('offerId'),
    //     new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
    //   ]
    // });
  }

  // public async create( { body, tokenPayload }: CreateCommentRequest, res: Response ): Promise<void> {
  //   console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  //   const comment = await this.commentService.create({ ...body, userId: tokenPayload.id });

  //   await this.offerService.incCommentCount(body.offerId);

  //   this.created(res, fillDTO(CommentRdo, comment));
  // }
  public async create({ body, params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const comment = await this.commentService.create({ ...body, offerId: params.offerId, author: tokenPayload.id });
    await this.offerService.incCommentCount(body.offerId);//params

    this.created(res, fillDTO(CommentRdo, comment));
  }

  //   public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
  //   console.log('@@@@@@@@@@@@@@@@@@@@---', params.offerId);
  //   const comments = await this.commentService.findByOfferId(params.offerId);

  //   this.ok(res, fillDTO(CommentRdo, comments));
  // }
}
