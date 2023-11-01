import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MIN_IMAGES_COUNT,
  MIN_ROOM_COUNT,
  MAX_ROOM_COUNT,
  MIN_GUEST_COUNT,
  MAX_GUEST_COUNT,
  MIN_PRICE,
  MAX_PRICE,
  MIN_COORDS_LENGTH
} from './constant.js';

export const CreateOfferValidationMessage = {
  title: {
    invalidFormat: 'title must be string',
    length: `title length must be into range ${MIN_TITLE_LENGTH} - ${MAX_TITLE_LENGTH}`,
  },
  description: {
    invalidFormat: 'description must be string',
    length: `description length must be into range ${MIN_DESCRIPTION_LENGTH} - ${MAX_DESCRIPTION_LENGTH}`,
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
    invalidCount: `images array length must be ${MIN_IMAGES_COUNT}`,
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
    minValue: `minimum room is ${MIN_ROOM_COUNT}`,
    maxValue: `maximum room is ${MAX_ROOM_COUNT}`,
  },
  guestCount: {
    invalidFormat: 'guest must be an integer',
    minValue: `minimum guest is ${MIN_GUEST_COUNT}`,
    maxValue: `maximum guest is ${MAX_GUEST_COUNT}`,
  },
  rentPrice: {
    invalidFormat: 'price must be an integer',
    minValue: `minimum price is ${MIN_PRICE}`,
    maxValue: `maximum price is ${MAX_PRICE}`,
  },
  features: {
    invalidFormat: 'field categories must be an array',
  },
  //commentsCount: {},
  location: {
    invalidFormat: 'coords must be a array',
    length: `coords array length must be ${MIN_COORDS_LENGTH}`,
    invalidValue: 'coords must be string',
  },
  author: {
    invalidId: 'userId field must be a valid id',
  },
} as const;
