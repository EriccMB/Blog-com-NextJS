'use server';

import {
  makePartialPublicPost,
  makePublicPostFromDB,
  PublicPost,
} from '@/dto/post/dto';
import { PostUpdateSchema } from '@/lib/post/validations';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-message';
import { makeRandomString } from '@/utils/make-random-string';
import { revalidateTag } from 'next/cache';

type UpdatePostActionResult = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  prevState: UpdatePostActionResult,
  formData: FormData,
): Promise<UpdatePostActionResult> {
  // TODO verificar se o usuario esta logado


  const makeResult = ({ formState = prevState.formState, errors = [''] }) => ({
    formState,
    errors,
  });

  if (!(formData instanceof FormData)) {
    return makeResult({
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    });
  }

  const id = formData.get('id')?.toString() || '';

  if (!id || typeof id !== 'string') {
    return makeResult({
      formState: prevState.formState,
      errors: ['ID inválido'],
    });
  }

  const formDataObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostUpdateSchema.safeParse(formDataObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialPublicPost(formDataObj),
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost = {
    ...validPostData,
  };

  let post;
  try {
    post = await postRepository.updatePost(id, newPost);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataObj),
        errors: [error.message],
      };
    }

    return {
      formState: makePartialPublicPost(formDataObj),
      errors: ['Erro desconhecido'],
    };
  }

  revalidateTag('posts');
  revalidateTag(`/post/${post.slug}`);

  return {
    formState: makePublicPostFromDB(post),
    errors: [],
    success: makeRandomString(),
  };
}
