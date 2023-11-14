import mongoose from 'mongoose';

export const aggregateComments = [
  {
    $lookup: {
      from: 'comments',
      let: { offerId: '$_id' },
      pipeline: [ { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } } ],
      as: 'comments',
    },
  },
  {
    $addFields: {
      rating: { $round: [{ $avg: '$comments.rating' }, 1]},
      commentsCount: { $size: '$comments' }
    },
  },
  { $unset: 'comments' }
];

export const aggregateFavorite = (userId: string) => ([
  {
    $lookup: {
      from: 'favorites',
      let: { offerId: '$_id' },
      pipeline: [ { $match: { $expr: { $and: [
        { $eq: ['$offerId', '$$offerId'] },
        { $eq: [ new mongoose.Types.ObjectId(userId), '$userId' ] }
      ] } } } ],
      as: 'favorites',
    },
  },
  { $addFields: { isFavorite: { $toBool: { $size: '$favorites' } } } },
  { $unset: 'favorites' }
]);
