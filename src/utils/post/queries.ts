import { postRepository } from '@/repositories/post';
import { cache } from 'react';

export const getAllPublishedPosts = cache(async () => {
  const posts = await postRepository.findAllPublished();
  return posts;
});

export const getPostById = async (id: string) => {
  const post = await postRepository.findById(id);
  return post;
};
