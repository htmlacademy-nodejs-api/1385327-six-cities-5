import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, Housing } from '../../types/index.js';

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
      .map(([title, description, date, city, preview, photos, isPremium, isFavourite, rating, housingType, roomCount, guestsCount, rentPrice,conveniences, author, commentsCount, location]) => ({
        title,
        description,
        date,
        city,
        preview,
        photos: photos.split(';'),
        isPremium: JSON.parse(isPremium),
        isFavourite: JSON.parse(isFavourite),
        rating: JSON.parse(rating),
        housingType: Housing[housingType as 'Apartment' | 'House' | 'Room' | 'Hotel'],
        roomCount: Number(roomCount),
        guestsCount: Number(guestsCount),
        rentPrice: Number(rentPrice),
        conveniences: conveniences.split(';'),
        author,
        commentsCount: Number(commentsCount),
        location: location.split(';').map((item) => Number(item)) as Offer['location'],
      }));
  }
}
