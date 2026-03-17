import { postRepository } from '@/repositories/post';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const getAllPublishedPostsCached = unstable_cache(
  cache(async () => {
    return await postRepository.findAllPublic();
  }),
  ['posts'],
  {
    tags: ['posts'],
  },
);

export const getPostByIdCached = cache(async (id: string) => {
  const post = await postRepository.findById(id);
  return post;
});

export const getPostBySlugCached = (slug: string) =>
  unstable_cache(
    cache(async (slug: string) => {
      const post = await postRepository
        .findBySlugPublic(slug)
        .catch(() => undefined);

      if (!post) notFound();
      return post;
    }),
    ['posts'],
    {
      tags: [`post-${slug}`],
    },
  )(slug);
