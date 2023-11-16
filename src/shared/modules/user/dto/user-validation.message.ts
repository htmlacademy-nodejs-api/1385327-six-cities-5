import {
  UserNameLength,
  PasswordLength
} from './constant.js';

export const UserValidationMessage = {
  name: {
    invalidFormat: 'name must be string',
    lengthField: `name length must be into range ${UserNameLength.Min} - ${UserNameLength.Max}`,
  },
  email: {
    invalidFormat: 'email must be a valid address',
  },
  avatar: {
    invalidFormat: 'avatar must be string',
    invalidType: 'avatar must be jpg or png format',
  },
  isProType: {
    invalidFormat: 'isProType must be a boolean',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: `password must be into range ${PasswordLength.Min} - ${PasswordLength.Max}`,
  },
} as const;
