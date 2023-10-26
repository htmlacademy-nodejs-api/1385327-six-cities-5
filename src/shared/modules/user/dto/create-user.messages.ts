export const CreateUserValidationMessages = {
  name: {
    invalidFormat: 'name must be string',
    lengthField: 'name length must be into range 1 - 15',
  },
  email: {
    invalidFormat: 'email must be a valid address'
  },
  avatar: {
    invalidFormat: 'avatar is required',
    invalidType: 'avatar must be jpg or png format',
  },
  isProType: {
    invalidFormat: 'isProType must be a boolean',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'password must be into range 6 - 12'
  },
} as const;
