'use server';

import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { PostCreateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-message';
import { makeSlugFromTitle } from '@/utils/make-slug-from-title';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';

type CreatePostActionResult = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  prevState: CreatePostActionResult,
  formData: FormData,
): Promise<CreatePostActionResult> {
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

  const formDataObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(formDataObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialPublicPost(formDataObj),
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidV4(),
    slug: makeSlugFromTitle(validPostData.title),
  };

  try {
    await postRepository.createPost(newPost);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        formState: newPost,
        errors: [error.message],
      };
    }

    return {
      formState: newPost,
      errors: ['Erro desconhecido'],
    };
  }

  revalidateTag('posts');

  redirect(`/admin/post/${newPost.id}?created=1`);
}
