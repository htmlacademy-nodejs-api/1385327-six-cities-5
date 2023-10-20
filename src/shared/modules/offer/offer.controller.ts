import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
// import { CreateOfferDto } from './dto/create-offer.dto.js';
// import { StatusCodes } from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(_req: Request, _res: Response): Promise<void> {
  }

  // public async create(
  //   { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
  //   res: Response
  // ): Promise<void> {

  //   const existCategory = await this.offerService.findByTitle(body.title);

  //   if (existCategory) {
  //     const existCategoryError = new Error(`Category with name «${body.title}» exists.`);
  //     this.send(res,
  //       StatusCodes.UNPROCESSABLE_ENTITY,
  //       { error: existCategoryError.message }
  //     );

  //     return this.logger.error(existCategoryError.message, existCategoryError);
  //   }

  //   const result = await this.offerService.create(body);
  //   this.created(res, fillDTO(OfferRdo, result));
  // }
}