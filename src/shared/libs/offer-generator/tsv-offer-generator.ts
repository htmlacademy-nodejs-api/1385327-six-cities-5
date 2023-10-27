import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, City, Housing } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

// const MIN_RATING = 1;
// const MAX_RATING = 5;

const MIN_ROOM_COUNT = 1;
const MAX_ROOM_COUNT = 8;

const MIN_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const LOCATION = {
  'Paris': {
    'latitude': 48.85661,
    'longitude': 2.351499
  },
  'Cologne': {
    'latitude': 50.938361,
    'longitude': 6.959974
  },
  'Brussels': {
    'latitude': 50.846557,
    'longitude': 4.351697
  },
  'Amsterdam': {
    'latitude': 52.370216,
    'longitude': 4.895168
  },
  'Hamburg': {
    'latitude': 53.550341,
    'longitude': 10.000654
  },
  'Dusseldorf': {
    'latitude': 51.225402,
    'longitude': 6.776314
  }
};

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {

    const title = getRandomItem<string>(this.mockData.title);
    const description = getRandomItem<string>(this.mockData.description);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem(this.mockData.city) as keyof typeof City;
    const preview = getRandomItem<string>(this.mockData.preview);
    const photos = getRandomItem<string>(this.mockData.photos);
    const isPremium = Boolean(generateRandomValue(0, 1));
    //const isFavorite = Boolean(generateRandomValue(0, 1));
    //const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const housingType = getRandomItem(this.mockData.housingType) as keyof typeof Housing;
    const roomCount = generateRandomValue(MIN_ROOM_COUNT, MAX_ROOM_COUNT).toString();
    const guestCount = generateRandomValue(MIN_GUEST_COUNT, MAX_GUEST_COUNT).toString();
    const rentPrice = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const features = getRandomItems<string>(this.mockData.features).join(';');
    const commentsCount = generateRandomValue(1, 10).toString();
    const location = `${LOCATION[city].longitude};${LOCATION[city].latitude}`;
    // author
    const name = getRandomItem<string>(this.mockData.name);
    const email = getRandomItem<string>(this.mockData.email);
    const avatar = getRandomItem<string>(this.mockData.avatar);
    const isProType = Boolean(generateRandomValue(0, 1));

    return [
      title, description, postDate, city, preview, photos, isPremium, housingType, roomCount, guestCount, rentPrice, features, commentsCount, location, name, email, avatar, isProType,
    ].join('\t');//isFavorite, rating,
  }
}
