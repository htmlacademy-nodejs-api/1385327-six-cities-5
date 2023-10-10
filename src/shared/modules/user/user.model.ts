import { Schema, Document, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document { //фиксируем даты создания и сохранения
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [1, 'Min length for name is 1'],
    maxLength: [15, 'Max length for name is 15'],
  },
  email: {
    type: String,
    unique: true, //уникальное значение
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'], //в продокшене не использовать
    require: true,
  },
  avatar: String,
  type: String,
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);
