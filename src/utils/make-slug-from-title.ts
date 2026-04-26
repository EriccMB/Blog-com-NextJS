import slugify from 'slugify';
import { makeRandomString } from './make-random-string';

export const makeSlugFromTitle = (title: string) => {
  const slug = slugify(title, {
    lower: true,
    trim: true,
    strict: true,
  });
  // GARANTE QUE A SLUG SERÁ ÚNICA
  return `${slug}-${makeRandomString()}` ;
};
