import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH
} from './constant.js';

export const CreateUserValidationMessages = {
  name: {
    invalidFormat: 'name must be string',
    lengthField: `name length must be into range ${MIN_NAME_LENGTH} - ${MAX_NAME_LENGTH}`,
  },
  email: {
    invalidFormat: 'email must be a valid address',
  },
  // avatar: {
  //   invalidFormat: 'avatar must be string',
  //   invalidType: 'avatar must be jpg or png format',
  // },
  isProType: {
    invalidFormat: 'isProType must be a boolean',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: `password must be into range ${MIN_PASSWORD_LENGTH} - ${MAX_PASSWORD_LENGTH}`,
  },
} as const;
