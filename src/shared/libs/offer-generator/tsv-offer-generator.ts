import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, City, Housing } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import {
  WeekDay,
  RoomCount,
  GuestCount,
  PriceValue,
  LOCATION
} from './constants.js';


export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {

    const title = getRandomItem<string>(this.mockData.title);
    const description = getRandomItem<string>(this.mockData.description);
    const postDate = dayjs().subtract(generateRandomValue(WeekDay.First, WeekDay.Last), 'day').toISOString();
    const city = getRandomItem(this.mockData.city) as keyof typeof City;
    const preview = getRandomItem<string>(this.mockData.preview);
    const photos = getRandomItem<string>(this.mockData.photos);
    const isPremium = Boolean(generateRandomValue(0, 1));

    const housingType = getRandomItem(this.mockData.housingType) as keyof typeof Housing;
    const roomCount = generateRandomValue(RoomCount.Min, RoomCount.Max).toString();
    const guestCount = generateRandomValue(GuestCount.Min, GuestCount.Max).toString();
    const rentPrice = generateRandomValue(PriceValue.Min, PriceValue.Max).toString();
    const features = getRandomItems<string>(this.mockData.features).join(';');

    const location = `${LOCATION[city].longitude};${LOCATION[city].latitude}`;
    // author
    const name = getRandomItem<string>(this.mockData.name);
    const email = getRandomItem<string>(this.mockData.email);
    const avatar = getRandomItem<string>(this.mockData.avatar);
    const isProType = Boolean(generateRandomValue(0, 1));

    return [
      title, description, postDate, city, preview, photos, isPremium, housingType, roomCount, guestCount, rentPrice, features, location, name, email, avatar, isProType
    ].join('\t');
  }
}
