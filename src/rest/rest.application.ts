import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Logger } from '../shared/libs/logger/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { Controller } from '../shared/libs/rest/index.js';
// import { OfferService } from '../shared/modules/offer/offer-service.interface.js';
// import { UserModel } from '../shared/modules/user/index.js';

@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.OfferController) private readonly offerController: Controller,
    // @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    this.server = express();
  }

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async _initControllers() {
    this.server.use('/offers', this.offerController.router);
  }

  public async init() {
    // console.log(process.env);
    this.logger.info('Application initialization');
    // this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this._initDb();

    this.logger.info('Init database completed');

    this.logger.info('Init controllers');
    await this._initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Try to init server...');
    await this._initServer();
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);

    // const result = await this.offerService.findById('652fa3d32b729346360f5304');
    // const result = await this.offerService.findPremiumByCityName('Cologne');
    // console.log(result);

  }
}
