import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, City, Housing, Feature } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, city, preview, photos, isPremium, isFavourite, rating, housingType, roomCount, guestCount, rentPrice, features, author, commentsCount, location]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        city: (city as City),
        preview,
        photos: photos.split(';'),
        isPremium: JSON.parse(isPremium),
        isFavourite: JSON.parse(isFavourite),
        rating: JSON.parse(rating),
        housingType: (housingType as Housing),
        roomCount: Number(roomCount),
        guestCount: Number(guestCount),
        rentPrice: Number(rentPrice),
        features: (features.split(';') as Feature[]),
        author,
        commentsCount: Number(commentsCount),
        location: {
          longitude: Number.parseFloat(location.split(';')[0]),
          latitude: Number.parseFloat(location.split(';')[1])
        }
      }));
  }
}
