import {
  TextLength,
  RatingValue
} from './constant.js';

export const CreateCommentValidationMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: `length must be into range ${TextLength.Min} - ${TextLength.Max}`,
  },
  rating: {
    invalidFormat: 'rate must be an integer',
    minValue: `minimum rating is ${RatingValue.Min}`,
    maxValue: `maximum rating is ${RatingValue.Max}`,
  },

} as const;
