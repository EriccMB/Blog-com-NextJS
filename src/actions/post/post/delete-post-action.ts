'use server';

import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { postRepository } from '@/repositories/post';
import { asyncDelay } from '@/utils/async-delay';
import { eq } from 'drizzle-orm';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  // falta a verificação de login

  //tirar isso depois
  await asyncDelay(1000);

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }

  const post = await postRepository.findById(id).catch(() => undefined);

  if (!post) {
    return {
      error: 'Post não existe',
    };
  }

  // será mudado para postRespository
  await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

  //revalidando o cache
  // revalidatePath('posts');
  // revalidateTag(`post-${post.slug}`);

  return {
    error: '',
  };
}
