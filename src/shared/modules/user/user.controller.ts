import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import {
  BaseController,
  HttpMethod,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
  UploadFileMiddleware,
  PrivateRouteMiddleware,
  PublicRouteMiddleware,
  UserWithEmailExistsMiddleware,
} from '../../libs/rest/index.js';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';

import { UserService } from './user-service.interface.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { AuthService } from '../auth/index.js';

import { fillDTO } from '../../helpers/common.js';

import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { UserRdo } from './rdo/user.rdo.js';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';
import { UploadUserAvatarRdo } from './rdo/upload-user-avatar.rdo.js';
import { CreateUserRequest, LoginUserRequest } from './types/user-request.type.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PublicRouteMiddleware(),
        new UserWithEmailExistsMiddleware(this.userService, 'User'),
        new ValidateDtoMiddleware(CreateUserDto)
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [
        new ValidateDtoMiddleware(LoginUserDto)
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY_PATH'), 'avatar'),
      ]
    });
  }

  // создание нового пользователя
  public async create({ body }: CreateUserRequest, res: Response,): Promise<void> {
    const result = await this.userService.create(body, this.configService.get('SALT'));

    this.created(res, fillDTO(UserRdo, result));
  }

  // авторизация
  public async login({ body }: LoginUserRequest, res: Response,): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, user);

    this.ok(res, Object.assign(responseData, { token }));
  }

  // Проверка токена
  public async checkAuthenticate({ tokenPayload }: Request, res: Response): Promise<void> {
    const userId = new mongoose.Types.ObjectId(tokenPayload.id);
    const user = await this.userService.findById(userId);

    this.ok(res, fillDTO(UserRdo, user));
  }

  // Загрузка аватарки
  public async uploadAvatar({ params, file, tokenPayload }: Request, res: Response) {
    const id = tokenPayload.id;
    const { userId } = params;
    const uploadFile = { avatar: file?.filename };

    if (id !== userId) {
      throw new HttpError(StatusCodes.METHOD_NOT_ALLOWED, 'Only the author has the right to change avatar');
    }
    await this.userService.updateById(userId, uploadFile);

    this.created(res, fillDTO(UploadUserAvatarRdo, { filepath: uploadFile.avatar }));
  }

}
