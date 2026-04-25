'use server';

import { PublicPost } from '@/dto/post/dto';

type CreatePostActionResult = {
  formState: PublicPost;
  errors: string[];
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
    return makeResult({ errors: ['Dados inválidos'] });
  }


  const formDataObj = Object.fromEntries(formData.entries());

  console.log(formDataObj)

  return {
    formState: prevState.formState,
    errors: [],
  };
}
