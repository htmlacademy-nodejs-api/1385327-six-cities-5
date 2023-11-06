import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { Logger } from '../../libs/logger/index.js';
import { UserService } from './user-service.interface.js';
import { Component } from '../../types/index.js';

import { UserEntity } from './user.entity.js';

import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { DEFAULT_AVATAR_FILE_NAME } from './user.constant.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  // Получить список пользователей --------------------------------------------------------------------------------------------- delete ?
  public async find(): Promise<DocumentType<UserEntity>[]> {
    return this.userModel.find().exec();
  }

  // Создать нового пользователя
  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {

    const user = new UserEntity({ ...dto, avatar: DEFAULT_AVATAR_FILE_NAME });
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);

    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  // Найти user по email
  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  // наличие email в базе
  public async existsWithEmail(email: string): Promise<boolean> {
    return await this.userModel.findOne({email}) !== null;
  }

  // Найти user по Id
  public async findById(id: Types.ObjectId): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(id);
  }

  // Обновить user по Id (avatar)
  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(userId, dto, { new: true }).exec();
  }

  // найти или создать ---------------------------------------------------------------------------------------- используется в cli - import
  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

}
