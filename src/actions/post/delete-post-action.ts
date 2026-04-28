'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { postRepository } from '@/repositories/post';
import { revalidatePath, revalidateTag } from 'next/cache';


export async function deletePostAction(id: string) {
    const isAuthenticated = await verifyLoginSession();

      if (!isAuthenticated) {
    return {
      error: 'Faça login novamente',
    };
  }

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
