import { Housing } from './housing.enum.js';
import { Coords } from './coords.type.js';

export type Offer = {
  title: string;
  description: string;
  date: string,
  city: string;
  preview: string;
  photos: string[];
  isPremium: boolean;
  isFavourite: boolean;
  rating: number;
  housingType: Housing;
  roomCount: number;
  guestsCount: number;
  rentPrice: number;
  conveniences: string[];
  author: string;
  commentsCount: number;
  coordinates: Coords;
}
