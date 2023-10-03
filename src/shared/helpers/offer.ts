import { Offer, City, Housing, Feature } from '../types/index.js';

export function createOffer(offerDate: string): Offer {
  const [
    title, description, createdDate, city, preview, photos, isPremium, isFavorite, rating, housingType, roomCount, guestCount, rentPrice, features, author, commentsCount, location
  ] = offerDate.replace('\n', '').split('\t');

  return {
    title,
    description,
    postDate: new Date(createdDate),
    city: (city as City),
    preview,
    photos: photos.split(';'),
    isPremium: JSON.parse(isPremium),
    isFavorite: JSON.parse(isFavorite),
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
  };
}
