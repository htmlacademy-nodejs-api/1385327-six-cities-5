import {
  MIN_TEXT_LENGTH,
  MAX_TEXT_LENGTH,
  MIN_RATE,
  MAX_RATE
} from './constant.js';

export const CreateCommentValidationMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: `length must be into range ${MIN_TEXT_LENGTH} - ${MAX_TEXT_LENGTH}`,
  },
  rating: {
    invalidFormat: 'rate must be an integer',
    minValue: `minimum rating is ${MIN_RATE}`,
    maxValue: `maximum rating is ${MAX_RATE}`,
  },

} as const;
