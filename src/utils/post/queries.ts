import { postRepository } from '@/repositories/post';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const getAllPublishedPostsCached = cache(async () => {
  const posts = await postRepository.findAllPublished();
  return posts;
});

export const getPostByIdCached = cache(async (id: string) => {
  const post = await postRepository.findById(id);
  return post;
});

export const getPostBySlugCached = cache(async (slug: string) => {
  const post = await postRepository.findBySlug(slug).catch(() => undefined);

  if(!post) notFound();
  return post;
});
