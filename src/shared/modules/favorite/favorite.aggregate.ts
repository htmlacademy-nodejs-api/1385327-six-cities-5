import mongoose from 'mongoose';
//import { Types } from 'mongoose';

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
      rating: { $avg: '$comments.rating' },
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
        { $eq: ['$$offerId', '$$offerId'] },
        { $eq: [ new mongoose.Types.ObjectId(userId), '$userId' ] }
      ] } } } ],
      as: 'favorites',
    },
  },
  { $addFields: { isFavorite: { $toBool: { $size: '$favorites' } } } },
  { $unset: 'favorites' }
]);


export const aggregateOffer = ([
  {
    $lookup: {
      from: 'offers',
      let: { offerId: '$offerId' },
      pipeline: [ { $match: { $expr: { $eq: [ '$_id', '$$offerId' ] }, } }, ],
      as: 'offers',
    },
  },
  { $project: { title: 1, postDate: 1, city: 1, preview: 1, isPremium: 1, isFavorite: 1, rating: 1, housingType: 1, rentPrice: 1, commentsCount: 1 } },
]);

// export const findByUserId = (userId: Types.ObjectId) => ({
//   $match: { $expr: { $eq: [userId, '$userId'] } } });
