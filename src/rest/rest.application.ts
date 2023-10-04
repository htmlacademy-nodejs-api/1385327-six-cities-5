import { Logger } from '../shared/libs/logger/index.js';
import { Config } from '../shared/libs/config/index.js';

export class RestApplication {

  constructor(
    private readonly logger: Logger,
    private readonly config: Config,
  ) {}

  public async init() {
    // console.log(process.env);
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);// для демонстрации
  }
}
