export const CreateOfferValidationMessage = {
  title: {
    invalidFormat: 'title must be string',
    length: 'title length must be into range 10 - 100',
  },
  description: {
    invalidFormat: 'description must be string',
    length: 'description length must be into range 20 - 1024',
  },
  postDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  city: {
    invalid: 'city must be one of City (Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf)',
  },
  preview: {
    invalidFormat: 'preview must be string',
  },
  photos: {
    invalidFormat: 'images must be array',
    invalidCount: 'images array length must be 6',
    invalidValue: 'images must be string',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  //isFavorite: {},
  //rating: { },
  housingType: {
    invalid: 'houseType must be a houseTypeEnum',
  },
  roomCount: {
    invalidFormat: 'room must be an integer',
    minValue: 'minimum room is 1',
    maxValue: 'maximum room is 8',
  },
  guestCount: {
    invalidFormat: 'guest must be an integer',
    minValue: 'minimum guest is 1',
    maxValue: 'maximum guest is 10',
  },
  rentPrice: {
    invalidFormat: 'price must be an integer',
    minValue: 'minimum price is 100',
    maxValue: 'maximum price is 100 000',
  },
  features: {
    invalidFormat: 'field categories must be an array',
  },
  //commentsCount: {},
  location: {
    invalidFormat: 'coords must be a array',
    length: 'coords array length must be 2',
    invalidValue: 'coords must be string',
  },
  author: {
    invalidId: 'userId field must be a valid id',
  },
} as const;
