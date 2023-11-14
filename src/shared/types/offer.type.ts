import { User} from './user.type.js';
import { City } from './city.enum.js';
import { Housing } from './housing.enum.js';
import { Feature } from './feature.enum.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  preview: string;
  photos: string[];
  isPremium: boolean;
  housingType: Housing;
  roomCount: number;
  guestCount: number;
  rentPrice: number;
  features: Feature[];
  location: [string, string];

  author: User;
}
