import { Middleware } from './middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
//import { UserExists } from '../types/user-exists.interface.js';
import mongoose from 'mongoose';

export class UserExistsMiddleware implements Middleware {
  // constructor(
  //   private readonly service: UserExists,
  //   private readonly entityName: string,
  //   private readonly paramName: string,
  // ) {}

  public async execute({params, body }: Request, _res: Response, next: NextFunction): Promise<void> {
    //const userId = params[this.paramName];
    const userId = new mongoose.Types.ObjectId(params.id);
    const id = body.id;


    if (userId !== id) {
    //if (! await this.service.exists(userId)) {
      throw new HttpError(
        StatusCodes.METHOD_NOT_ALLOWED,
        //`${this.entityName} not allow.`,
        'UserExistsMiddleware',
        'Пользователь не имеет доступ к изменению данного ресурса'
      );
    }

    next();
  }
}
