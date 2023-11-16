import {
  TitleLength,
  DescriptionLength,
  IMAGES_COUNT,
  RoomCount,
  GuestCount,
  PriceValue,
  COORDS_LENGTH
} from './constant.js';

export const OfferValidationMessage = {
  title: {
    invalidFormat: 'title must be string',
    length: `title length must be into range ${TitleLength.Min} - ${TitleLength.Max}`,
  },
  description: {
    invalidFormat: 'description must be string',
    length: `description length must be into range ${DescriptionLength.Min} - ${DescriptionLength.Max}`,
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
    invalidCount: `images array length must be ${IMAGES_COUNT}`,
    invalidValue: 'images must be string',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  housingType: {
    invalid: 'houseType must be a houseTypeEnum',
  },
  roomCount: {
    invalidFormat: 'room must be an integer',
    minValue: `minimum room is ${RoomCount.Min}`,
    maxValue: `maximum room is ${RoomCount.Max}`,
  },
  guestCount: {
    invalidFormat: 'guest must be an integer',
    minValue: `minimum guest is ${GuestCount.Min}`,
    maxValue: `maximum guest is ${GuestCount.Max}`,
  },
  rentPrice: {
    invalidFormat: 'price must be an integer',
    minValue: `minimum price is ${PriceValue.Min}`,
    maxValue: `maximum price is ${PriceValue.Max}`,
  },
  features: {
    invalidFormat: 'field categories must be an array',
  },
  location: {
    invalidFormat: 'coords must be a array',
    length: `coords array length must be ${COORDS_LENGTH}`,
    invalidValue: 'coords must be string',
  },
  author: {
    invalidId: 'userId field must be a valid id',
  },
} as const;
