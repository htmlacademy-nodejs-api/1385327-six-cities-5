import { Offer, City, Housing, Feature } from '../types/index.js';

export function createOffer(offerDate: string): Offer {
  const [
    title, description, createdDate, city, preview, photos, isPremium, housingType, roomCount, guestCount, rentPrice, features, location, name, email, avatar, isProType
  ] = offerDate.replace('\n', '').split('\t'); //isFavorite, rating, commentsCount

  return {
    title,
    description,
    postDate: new Date(createdDate),
    city: (city as City),
    preview,
    photos: photos.split(';'),
    isPremium: isPremium === 'true',
    // isFavorite: isFavorite === 'true',
    // rating: JSON.parse(rating),
    housingType: (housingType as Housing),
    roomCount: Number(roomCount),
    guestCount: Number(guestCount),
    rentPrice: Number(rentPrice),
    features: (features.split(';') as Feature[]),
    //commentsCount: Number(commentsCount),
    location: [
      (location.split(';')[0]),
      (location.split(';')[1])
    ],
    author: {
      name,
      email,
      avatar,
      isProType: isProType === 'true'
    },
  };
}
