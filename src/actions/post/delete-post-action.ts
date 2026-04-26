'use server';

import { postRepository } from '@/repositories/post';
import { revalidatePath, revalidateTag } from 'next/cache';


export async function deletePostAction(id: string) {
  // TODO falta a verificação de login

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }

  let post;
  try {
    post = await postRepository.deletePost(id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    return {
      error: 'Erro desconhecido',
    };
  }

  //revalidando o cache
  revalidatePath('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    error: '',
  };
}
