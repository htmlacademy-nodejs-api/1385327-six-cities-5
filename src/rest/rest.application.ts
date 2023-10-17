import { inject, injectable } from 'inversify';
import { Logger } from '../shared/libs/logger/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
// import { OfferService } from '../shared/modules/offer/offer-service.interface.js';
// import { UserModel } from '../shared/modules/user/index.js';

@injectable()
export class RestApplication {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    // @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {}

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

  public async init() {
    // console.log(process.env);
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);// для демонстрации

    this.logger.info('Init database...');
    await this._initDb();

    // const user = await UserModel.create({
    //   email: 'test@email.local',
    //   avatar: 'keks.jpg',
    //   name: 'Keks',
    //   type: 'Unknown'
    //  });
    //  console.log(user);

    this.logger.info('Init database completed');

    // const result = await this.offerService.findById('6527c2e71befd93c6cc52954');
    // console.log(result);
  }
}
