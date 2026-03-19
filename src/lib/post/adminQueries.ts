import { postRepository } from '@/repositories/post';
import { cache } from 'react';

export const getPostByIdAdmin = cache(async (id: string) => {
  return postRepository.findById(id);
});

export const getAllPostsAdmin = cache(async () => {
  return postRepository.findAll();
});
