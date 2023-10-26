export const CreateCommentValidationMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: 'length must be into range 5 - 2024',
  },
  rating: {
    invalidFormat: 'rate must be an integer',
    minValue: 'minimum rating is 1',
    maxValue: 'maximum rating is 5',
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id',
  },
  userId: {
    invalidFormat: 'userId field must be a valid id',
  },
} as const;
